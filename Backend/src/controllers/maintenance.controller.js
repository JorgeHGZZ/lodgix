
import Room from "../models/Room.js";
import Maintenance from "../models/Maintenance.js";
import Reservation from "../models/Reservation.js";
import CleanService from "../models/CleanService.js";
import { parseDateRangeStrings, buildOverlapQuery } from "../utils/validarOverlaping.js";

export const createMaintenance = async (req, res) => {
    try {
        const { roomId, startDate, endDate, priority, description } = req.body;

        if (!roomId || !startDate || !endDate) {
            return res.status(400).json({ message: "roomId, startDate y endDate son requeridos" });
        }

        let parsedStartDate, parsedEndDate;
        try {
            ({ startDate: parsedStartDate, endDate: parsedEndDate } = parseDateRangeStrings(startDate, endDate));
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" })
        }

        const overlappingMaintenance = await Maintenance.findOne({
            room: roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate),
            isCanceled: false
        });

        const overlappingReservations = await Reservation.findOne({
            room: roomId,
            ...buildOverlapQuery('checkIn', 'checkOut', parsedStartDate, parsedEndDate),
            status: { $in: ['Programada', 'Confirmada'] }
        });

        const overlappingCleanService = await CleanService.findOne({
            room: roomId,
            ...buildOverlapQuery('startDate', 'endDate', parsedStartDate, parsedEndDate),
            status: { $in: ['Programada', 'Confirmada'] }
        });

        if (overlappingMaintenance) {
            return res.status(400).json({ message: "Ya hay un mantenimiento programado para estas fechas" })
        }
        if (overlappingReservations) {
            return res.status(400).json({ message: "Ya hay una reserva para esta habitación en estas fechas" })
        }
        if (overlappingCleanService) {
            return res.status(400).json({ message: "Ya hay un servicio de limpieza programado para esta habitación en estas fechas" })
        }

        const maintenance = new Maintenance({
            room: roomId,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            priority,
            description
        });

        await maintenance.save();
        res.status(201).json({ message: "Mantenimiento creado correctamente", maintenance })
    } catch (error) {
        res.status(500).json({ message: "Error al crear el mantenimiento", error: error.message })
    }
}

export const getMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.find()
            .populate("roomId", "number");

        const formattedMaintenances = maintenances.map(m => ({
            id: m._id,
            room: m.roomId?.number,
            startDate: new Date(m.startDate).toLocaleString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }),
            endDate: new Date(m.endDate).toLocaleString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }),
            priority: m.priority,
            description: m.description,
            status: m.status,
            isCanceled: m.isCanceled
        }));

        res.json(formattedMaintenances);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los mantenimientos",
            error: error.message
        });
    }
};

export const updateMaintenanceStatus = async (req, res) => {
    try {
        // Lógica para actualizar el estado del mantenimiento de "Programada" a "En Progreso" o "Completado"
        const { id } = req.params;
        const { status } = req.body;

        const maintenance = await Maintenance.findById(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        if (status === "En-Progreso" && maintenance.status === "Programada") {
            maintenance.status = "En-Progreso";
        } else if (status === "Completado" && maintenance.status === "En-Progreso") {
            maintenance.status = "Completado";
        }

        await maintenance.save();
        res.json({ message: "Estado del mantenimiento actualizado", maintenance });


    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado del mantenimiento", error: error.message });
    }
}


export const cancelMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await Maintenance.findById(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        maintenance.isCanceled = true;
        maintenance.status = "Cancelado";

        await maintenance.save();
        res.json({ message: "Mantenimiento cancelado", maintenance });

    } catch (error) {
        res.status(500).json({ message: "Error al cancelar el mantenimiento", error: error.message });
    }

}