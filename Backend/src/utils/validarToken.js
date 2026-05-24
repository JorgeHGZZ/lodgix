import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default";

export const generarToken = (payload) => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const validarToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

