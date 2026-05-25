import express from "express";
import {crearReserva, updateReservationStatus, BuscarResrvacionPOrCliente, updateReservation } from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, crearReserva);
router.patch("/:id/status", verifyToken, updateReservationStatus);
router.get("/search", verifyToken, BuscarResrvacionPOrCliente);
router.put("/:id", verifyToken, updateReservation);


export default router;