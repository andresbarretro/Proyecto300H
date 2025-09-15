import express from "express";
import UserServicios from "../models/UserServicios.js";
import {getproductoPorNombre, crearProducto} from "../controller/Usuarios.controller.js"

const router = express.Router();

router.get("/", async (req,res)=>{
    const UserServicios = await UserServicios.find();
    return res.json(productos);
});

router.get("/:nombreServicio", getUsuarioPorNombre);
router.post("/", crearUsuario);
router.put("/:nombre", actualizarUsuario);
router.delete("/:nombre", eliminarUsuario);


export default router;
