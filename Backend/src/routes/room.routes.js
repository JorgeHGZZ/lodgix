import express from "express";
import { createRoom, getRooms, getRoomByFloor, getRoomById, updateRoom, deleteRoom } from "../controllers/rooms.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Rutas para habitaciones
router.post("/", verifyToken, createRoom);
router.get("/", verifyToken, getRooms);
router.get("/:floor", verifyToken, getRoomByFloor);
router.get("/:id", verifyToken, getRoomById);
router.put("/:id", verifyToken, updateRoom);
router.delete("/:id", verifyToken, deleteRoom);

export default router;