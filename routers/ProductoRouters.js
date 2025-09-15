import express from "express";
import Productos from "../models/Productos.js";
import {getProductoPorNombre, crearProducto, actualizarProducto, eliminarProducto} from "../controller/productos.controller.js"

const router = express.Router();

router.get("/", async (req,res)=>{
    const productos = await Productos.find();
    return res.json(productos);
});

router.get("/:nombre", getProductoPorNombre);
router.post("/", crearProducto);
router.put("/:nombre", actualizarProducto);
router.delete("/:nombre", eliminarProducto);    


export default router;


