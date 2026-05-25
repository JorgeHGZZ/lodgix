import Maintenance from "../models/Maintenance.js";
import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";

export const createMaintenance = async (req, res) => {
    try {
        const { roomId, startDate, endDate, priority, description } = req.body;
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
            return res.status(400).json({ message: "Fechas inválidas" });
        }

        //Validar que la habitación exista
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" })
        }
        //Validar que no haya mantenimientos programados para las mismas fechas
        const overlappingMaintenance = await Maintenance.findOne({
            roomId,
            $or: [
                { startDate: { $lte: parsedEndDate, $gte: parsedStartDate } },
                { endDate: { $lte: parsedEndDate, $gte: parsedStartDate } },
                { startDate: { $lte: parsedStartDate }, endDate: { $gte: parsedEndDate } }
            ],
            isCanceled: false
        });

        //Validar que no haya reservas para la habitación en las mismas fechas
        const overlappingReservations = await Reservation.findOne({
            room: roomId,
            $or: [
                { checkIn: { $lte: parsedEndDate, $gte: parsedStartDate } },
                { checkOut: { $lte: parsedEndDate, $gte: parsedStartDate } },
                { checkIn: { $lte: parsedStartDate }, checkOut: { $gte: parsedEndDate } }
            ],
            status: { $in: ['Programada', 'Confirmada'] }
        });

        if (overlappingMaintenance) {
            return res.status(400).json({ message: "Ya hay un mantenimiento programado para estas fechas" })
        }
        if (overlappingReservations) {
            return res.status(400).json({ message: "Ya hay una reserva para esta habitación en estas fechas" })
        }

        const maintenance = new Maintenance({
            roomId,
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
            startDate: new Date(m.startDate).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }),
            endDate: new Date(m.endDate).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
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