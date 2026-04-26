import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    try {
        const body = req.body || {};
        const { number, description, price, capacity, category } = body;

        if (!number || !description || !price || !capacity || !category) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        // Verificar si la habitación ya existe
        const exist = await Room.findOne({ number });
        if (exist) {
            return res.status(400).json({ message: "La habitación ya existe" });
        }

        const room = await Room.create({
            number,
            description,
            price,
            capacity,
            category,
            available: true
        });

        res.status(201).json({
            message: "Habitación creada correctamente",
            room
        });
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener habitaciones",
            error: error.message
        });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const updateRoom = async (req, res)=>{

    console.log("Actualizando habitación con ID:", req.params.id);
    console.log("Datos recibidos:", req.body);
    try {
        const { id } = req.params;
        const { number, description, price, capacity, category, available} = req.body;

        // Verificar si el nuevo número ya está en uso por otra habitación
        if (number) {
            const existingRoom = await Room.findOne({ number, _id: { $ne: id } });
            if (existingRoom) {
                return res.status(400).json({ message: "El número de habitación ya está en uso" });
            }
        }

        // Construir objeto de actualización
        const updateData = { number, description, price, capacity, category, available };

        const room = await Room.findByIdAndUpdate(id, updateData, { new: true }).select("number description price capacity category available");
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        res.status(200).json({message: "Habitación actualizada correctamente"});

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar habitación",
            error: error.message
        });
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.status(200).json({ message: "Habitación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar habitación",
            error: error.message
        });
    }
};