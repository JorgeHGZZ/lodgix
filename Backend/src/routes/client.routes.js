import express from 'express';
import { crearClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/client.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/", verifyToken, crearClient);
router.get("/", verifyToken, getClients);
router.get("/:id", verifyToken, getClientById);
router.put("/:id", verifyToken, updateClient);
router.delete("/:id", verifyToken, deleteClient);
export default router;

