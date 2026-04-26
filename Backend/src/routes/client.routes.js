import express from 'express';
import { crearClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/client.controller.js';

const router = express.Router();

router.post("/", crearClient);
router.get("/", getClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
export default router;

