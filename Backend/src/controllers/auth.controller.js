import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generarToken } from "../utils/validarToken.js";
const JWT_SECRET = process.env.JWT_SECRET || "default";


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email y password requeridos"
        });
    }

    // Simulación de búsqueda de usuario 
    const user = await User.findOne({ email }).select("+password");
    console.log("Usuario encontrado:", user);
    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Contraseña incorrecta"
        });
    }

    const payload = {
        userId: user._id,
        userName: user.name,
        imageURL: user.imageURL,
        email: email,
        role: "user"
    };

    const token = generarToken(payload);

    res.status(200).json({
        message: "Login exitoso",
        token: token
    });

};

