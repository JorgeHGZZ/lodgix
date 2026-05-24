import { Router } from "express";
import { register, ListUsers, ObtenerUsuarioPorEmail, ActualizarUsuario, EliminarUsuario} from "../controllers/user.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = Router();

router.post("/register", upload.single("image"), register);
router.get("/list", verifyToken, ListUsers);
router.get("/email/:email", verifyToken, ObtenerUsuarioPorEmail);
router.put("/update/:id", verifyToken, upload.single("image"), ActualizarUsuario);
router.delete("/delete/:id", verifyToken, EliminarUsuario);

export default router;