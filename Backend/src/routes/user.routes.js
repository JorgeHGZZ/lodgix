import { Router } from "express";
import { register, ListUsers, ObtenerUsuarioPorEmail, ActualizarUsuario, EliminarUsuario} from "../controllers/user.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";


const router = Router();

router.post("/register", upload.single("image"), register);
router.get("/list", ListUsers);
router.get("/email/:email", ObtenerUsuarioPorEmail);
router.put("/update/:id", upload.single("image"), ActualizarUsuario);
router.delete("/delete/:id", EliminarUsuario);

export default router;