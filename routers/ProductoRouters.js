import express from "express";
import Productos from "../models/Productos.js";
import {getproductoPorNombre, crearProducto} from "../controller/Usuarios.controller.js"

const router = express.Router();

router.get("/", async (req,res)=>{
    const productos = await Productos.find();
    return res.json(productos);
});

router.get("/:nombre", getproductoPorNombre);
router.post("/", crearProducto);
router.put("/:nombre", actualizarUsuario);
router.delete("/:nombre", eliminarUsuario);


export default router;


