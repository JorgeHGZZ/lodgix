import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Debug: ver qué llega al servidor
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use("/api/auth", authRoutes);

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error(err));

// Ruta test
app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});


export default app;
