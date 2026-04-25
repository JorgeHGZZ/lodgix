import jwt from "jsonwebtoken";
const JWT_SECRET= process.env.JWT_SECRET || "default";


export const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email y password requeridos"
        });
    }

    const payload = {
        email: email,
        role: "user"
    };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login exitoso",
        token: token
    });

};

export const register = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email y password requeridos"
        });
    }

    // Simulación de registro (sin base de datos)

    const payload = {
        email,
        role: "user"
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h"
    });

    res.status(201).json({
        message: "Usuario registrado correctamente",
        token
    });
};