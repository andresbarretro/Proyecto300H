import express from "express";
import UserClientes from "../models/UserClientes.js";
import { getUsuarioPorNombre, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controller/Usuarios.controller.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const clientes = await UserClientes.find();
    return res.json(clientes);
});

router.get("/:nombre", getUsuarioPorNombre);
router.post("/", crearUsuario);
router.put("/:nombre", actualizarUsuario);
router.delete("/:nombre", eliminarUsuario);


export default router;
