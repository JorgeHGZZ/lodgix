const JWT_SECRET = process.env.JWT_SECRET || "default";
import User from "../models/User.js";
import { generarToken } from "../utils/generarToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Name, email, password y phone requeridos"
            });
        }

        // Verificar si el usuario ya existe
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ msg: "Usuario ya existe" });
        }

        // Obtener la URL de la imagen si se subió
        const imageURL = req.file ? `/uploads/${req.file.filename}` : "";

        // Crear el usuario
        const user = await User.create({ 
            name, 
            email, 
            password, 
            phone,
            imageURL 
        });

        // Generar token (sin incluir la contraseña)
        const payload = {
            userId: user._id,
            name: user.name,
            imageURL: user.imageURL,
            role: "user"
        };

        const token = generarToken(payload);

        res.status(201).json({
            message: "Usuario registrado correctamente",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const ObtenerUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).select("name role email"); // Excluir la contraseña
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const ListUsers = async (req, res) => {
    try {
        const users = await User.find().select("name role email"); 
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message
        });
    }
};

export const ActualizarUsuario= async (req, res)=>{
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        // Verificar si el nuevo email ya está en uso por otro usuario
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }

        // Obtener la URL de la imagen si se subió
        const imageURL = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Construir objeto de actualización
        const updateData = { name, email, phone };
        if (imageURL) {
            updateData.imageURL = imageURL;
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select("name role email phone imageURL");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({message: "Usuario actualizado correctamente"});

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario",
            error: error.message
        });
    }
}

export const EliminarUsuario= async (req, res)=>{
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error.message
        });
    }
}