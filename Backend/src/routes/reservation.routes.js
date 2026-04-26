import express from "express";
import {crearReserva, updateReservationStatus } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", crearReserva);
router.patch("/:id/status", updateReservationStatus);

export default router;