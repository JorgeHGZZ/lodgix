import {Router} from 'express';
import {createMaintenance,getMaintenances, updateMaintenanceStatus, cancelMaintenance} from "../controllers/maintenance.controller.js";



const router = Router();

router.post("/", createMaintenance);
router.get("/", getMaintenances);
router.patch("/:id", updateMaintenanceStatus);
router.post("/:id/cancel", cancelMaintenance);

export default router;