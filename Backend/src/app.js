import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import UserRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (uploads)
const uploadsPath = path.join(process.cwd(), "..", "Backend", "uploads");
console.log("Uploads path:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// Debug
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/rooms", roomRoutes);

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error(err));

// Ruta test
app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});


export default app;
