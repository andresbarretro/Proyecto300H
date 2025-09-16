import express from "express";
import UserEmpresas from "../models/UserEmpresas.js";
import { getUsuarioPorNombre, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controller/Usuarios.controller.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const empresas = await UserEmpresas.find();
    return res.json(clientes);
});

router.get("/:nombreEmpresa", getUsuarioPorNombre);
router.post("/", crearUsuario);
router.put("/:nombre", actualizarUsuario);
router.delete("/:nombre", eliminarUsuario);


export default router;