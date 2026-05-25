import Reservation from "../models/Reservation.js";
import Client from "../models/Client.js";
import Room from "../models/Room.js";
import { parseDateRangeStrings, buildOverlapQuery } from "../utils/validarOverlaping.js";

export const crearReserva = async (req, res) => {
    try {
        const { clientId, roomId, checkIn, checkOut, guests } = req.body;
        if (!clientId || !roomId || !checkIn || !checkOut || !guests) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        let checkInDate, checkOutDate;
        try {
            ({ startDate: checkInDate, endDate: checkOutDate } = parseDateRangeStrings(checkIn, checkOut));
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            return res.status(400).json({ message: "No puedes reservar en fechas pasadas" });
        }

        const existClient = await Client.findById(clientId);
        if (!existClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const existRoom = await Room.findById(roomId);
        if (!existRoom) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        if (guests > existRoom.capacity) {
            return res.status(400).json({
                message: "El número de huéspedes excede la capacidad"
            });
        }

        const overlappingReservations = await Reservation.findOne({
            roomId,
            status: { $in: ['pending', 'confirmed'] },
            ...buildOverlapQuery('checkIn', 'checkOut', checkInDate, checkOutDate)
        });

        const overlappingCleanService = await CleanService.findOne({
            roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate)
        });

        const overlappingMaintenance = await Maintenance.findOne({
            roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate)
        });

        if (overlappingCleanService) {
            return res.status(400).json({ message: "Ya hay un servicio de limpieza programado para estas fechas" });
        }
        if (overlappingMaintenance) {
            return res.status(400).json({ message: "Ya hay un mantenimiento programado para estas fechas" });
        }
        if (overlappingReservations) {
            return res.status(400).json({ message: "Ya hay una reserva para esta habitación en estas fechas" });
        }

        const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
        const total = days * existRoom.price;

        const reservation = await Reservation.create({
            clientId,
            roomId,
            checkIn,
            checkOut,
            guests,
            total
        });

        res.status(201).json({
            message: "Reserva creada correctamente",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear reserva",
            error: error.message
        });
    }
};

export const updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ['pending', 'confirmed', 'cancelled', 'completed'];

        if (!status || !validStatus.includes(status)) {
            return res.status(400).json({
                message: "Estado inválido"
            });
        }

        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({
                message: "Reserva no encontrada"
            });
        }

        //Reglas de negocio
        if (reservation.status === 'cancelled') {
            return res.status(400).json({
                message: "No puedes modificar una reserva cancelada"
            });
        }

        if (reservation.status === 'completed') {
            return res.status(400).json({
                message: "No puedes modificar una reserva completada"
            });
        }

        // Evitar cambios sin sentido
        if (reservation.status === status) {
            return res.status(400).json({
                message: "La reserva ya tiene ese estado"
            });
        }

        // Flujo lógico de estados 
        const allowedTransitions = {
            pending: ['confirmed', 'cancelled'],
            confirmed: ['completed', 'cancelled'],
            cancelled: [],
            completed: []
        };

        if (!allowedTransitions[reservation.status].includes(status)) {
            return res.status(400).json({
                message: `No puedes cambiar de ${reservation.status} a ${status}`
            });
        }

        reservation.status = status;
        await reservation.save();

        res.status(200).json({
            message: "Estado actualizado correctamente",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar estado",
            error: error.message
        });
    }
};