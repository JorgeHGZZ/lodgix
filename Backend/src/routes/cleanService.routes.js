import Router from 'express';
import {createCleanService, getCleanService} from "../controllers/cleanservice.controller.js";

const router = Router();


router.get("/", getCleanService);
router.post("/", createCleanService);

export default router