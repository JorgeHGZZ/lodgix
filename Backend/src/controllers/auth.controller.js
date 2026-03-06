import jwt from "jsonwebtoken";
const JWT_SECRET= process.env.JWT_SECRET || "default";

export const login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email y password requeridos"
        });
    }

    // No validamos DB 
    // Solo generamos el token

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