import express from "express";
import {crearReserva, updateReservationStatus } from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, crearReserva);
router.patch("/:id/status", verifyToken, updateReservationStatus);

export default router;