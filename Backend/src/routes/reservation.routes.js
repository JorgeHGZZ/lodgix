import express from "express";
import {crearReserva, updateReservationStatus, BuscarResrvacionPOrCliente, updateReservation, getReservationsByRoom } from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, crearReserva);
router.get("/room/:roomId", verifyToken, getReservationsByRoom);
router.get("/search", verifyToken, BuscarResrvacionPOrCliente);
router.put("/:id", verifyToken, updateReservation);
router.patch("/:id/status", verifyToken, updateReservationStatus);


export default router;