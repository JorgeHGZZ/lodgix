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
        const subtotal = days * existRoom.price;

        const discountNumber = Number(discount) || 0;
        const advanceNumber = Number(advance) || 0;

        const total = Math.max(subtotal - discountNumber - advanceNumber, 0);

        const reservation = await Reservation.create({
            clientId,
            roomId,
            checkIn,
            checkOut,
            guests,
            days,
            subtotal,
            discount: discountNumber,
            advance: advanceNumber,
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

export const BuscarResrvacionPOrCliente = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.json([]);
        }

        const clients = await Client.find({
            name: { $regex: name, $options: "i" }
        }).select("_id");

        const clientIds = clients.map(client => client._id);

        const reservations = await Reservation.find({
            client: { $in: clientIds }
        })
        .populate("client", "name email phone")
        .populate("room", "number category price floor")
        .sort({ createdAt: -1 });

        res.json(reservations);

    } catch (error) {
        res.status(500).json({
            message: "Error al buscar reservaciones",
            error: error.message
        });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            checkIn,
            checkOut,
            guests,
            discount = 0,
            advance = 0
        } = req.body;

        const reservation = await Reservation.findById(id).populate("room");

        if (!reservation) {
            return res.status(404).json({
                message: "Reservación no encontrada"
            });
        }

        if (reservation.status === "cancelled") {
            return res.status(400).json({
                message: "No puedes modificar una reservación cancelada"
            });
        }

        if (reservation.status === "completed") {
            return res.status(400).json({
                message: "No puedes modificar una reservación con check-out realizado"
            });
        }
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate >= checkOutDate) {
            return res.status(400).json({
                message: "La fecha de salida debe ser mayor"
            });
        }

        const days =
            (checkOutDate - checkInDate) /
            (1000 * 60 * 60 * 24);

        const subtotal = days * reservation.room.price;

        const discountNumber = Number(discount) || 0;
        const advanceNumber = Number(advance) || 0;

        const total = Math.max(
            subtotal - discountNumber - advanceNumber,
            0
        );

        reservation.checkIn = checkIn;
        reservation.checkOut = checkOut;
        reservation.guests = guests;
        reservation.days = days;
        reservation.discount = discountNumber;
        reservation.advance = advanceNumber;
        reservation.subtotal = subtotal;
        reservation.total = total;

        await reservation.save();

        res.status(200).json({
            message: "Reservación actualizada correctamente",
            reservation
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar reservación",
            error: error.message
        });
    }
};

export const getReservationsByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        const reservations = await Reservation.find({
            room: roomId,
            status: { $in: ["pending", "confirmed"] }
        })
        .populate("client", "name phone email")
        .select("checkIn checkOut status");

        res.json(reservations);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener reservas de habitación",
            error: error.message
        });
    }
};