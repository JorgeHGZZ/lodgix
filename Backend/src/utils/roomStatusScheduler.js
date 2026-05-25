import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";
import CleanService from "../models/CleanService.js";
import Maintenance from "../models/Maintenance.js";

const getNow = () => {
    const now = new Date();
    now.setMilliseconds(0);
    return now;
};

const isActivePeriod = (startDate, endDate, now) => {
    return startDate <= now && endDate >= now;
};

const getRoomStatusForNow = async (roomId, now) => {
    const activeMaintenance = await Maintenance.findOne({
        roomId,
        status: { $in: ["Programada", "En-Progreso"] },
        startDate: { $lte: now },
        endDate: { $gte: now }
    });

    if (activeMaintenance) {
        return "Mantenimiento";
    }

    const activeCleaning = await CleanService.findOne({
        roomId,
        status: { $in: ["Programada", "En-Progreso"] },
        startDate: { $lte: now },
        endDate: { $gte: now }
    });

    if (activeCleaning) {
        return "Limpieza";
    }

    const activeReservation = await Reservation.findOne({
        roomId,
        status: "confirmed",
        checkIn: { $lte: now },
        checkOut: { $gt: now }
    });

    if (activeReservation) {
        return "Ocupada";
    }

    return "Disponible";
};

export const syncRoomStatuses = async () => {
    try {
        const now = getNow();
        const rooms = await Room.find();

        await Promise.all(
            rooms.map(async (room) => {
                const newStatus = await getRoomStatusForNow(room._id, now);
                if (room.status !== newStatus) {
                    await Room.updateOne({ _id: room._id }, { status: newStatus });
                }
            })
        );
    } catch (error) {
        console.error("Error sincronizando estados de habitaciones:", error.message);
    }
};

export const startRoomStatusScheduler = (intervalMs = 60 * 1000) => {
    syncRoomStatuses();
    setInterval(syncRoomStatuses, intervalMs);
};
