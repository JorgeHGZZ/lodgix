import CleanService from "../models/CleanService.js";
import Room from "../models/Room.js";
import Maintenance from "../models/Maintenance.js";
import Reservation from "../models/Reservation.js";
import { parseDateRangeStrings, buildOverlapQuery } from "../utils/validarOverlaping.js";


export const createCleanService = async (req, res) => {
    try {
        const { roomId, startDate, description } = req.body;
        if (!roomId || !startDate) {
            return res.status(400).json({ message: "roomId y startDate son requeridos" });
        }
        const initialStartDate = new Date(startDate);
        const endDate = new Date(initialStartDate.getTime() + 60 * 60 * 1000); // Duración de 1 hora

        let parsedStartDate, parsedEndDate;
        try {
            ({ startDate: parsedStartDate, endDate: parsedEndDate } = parseDateRangeStrings(initialStartDate, endDate));
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" })
        }

        const overlappingCleanService = await CleanService.findOne({
            roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate)
        });

        const overlappingMaintenance = await Maintenance.findOne({
            roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate)
        });

        const overlappingReservations = await Reservation.findOne({
            room: roomId,
            ...buildOverlapQuery('checkIn', 'checkOut', parsedStartDate, parsedEndDate)
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

        const cleanService = await CleanService.create({
            roomId,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            description
        });
        res.status(201).json(cleanService);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el servicio de limpieza" });
    }
}


export const getCleanService = async (req, res) => {
    try {
        const service = await CleanService.find()
            .populate("roomId", "number");

        const formattedServices = service.map(s => ({
            id: s._id,
            room: s.roomId?.number,
            startDate: new Date(s.startDate).toLocaleString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }),
            endDate: new Date(s.endDate).toLocaleString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }),
            priority: s.priority,
            description: s.description,
            status: s.status,
            isCanceled: s.isCanceled
        }));

        res.status(200).json(formattedServices);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el servicio de limpieza" });
    }
}