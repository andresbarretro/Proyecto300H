import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routers/auth.Routes.js";
//
 import ClientesRouters from "./routers/ClientesRouters.js";
// import  EmpresasRouters from "./routers/EmpresasRouters.js";
import  ProductoRouters  from "./routers/ProductoRouters.js";
// import ServiciosRouters from "./routers/ServiciosRouters.js";
// import vendedorRouters from "./routers/vendedorRouters.js";

mongoose.connect("mongodb://localhost:27017/Eltodero")
.then(() => {  console.log("Conectado a la base de datos");})
.catch((error) => {console.error("Error al conectar a la base de datos:", error);});

const app = express(); // Crear la instancia de Express

const PORT = 4200; // Crear el puerto 

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json()); // Middleware para parsear JSON

app.use('/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 })); // Limitar a 20 intentos cada 15 minutos

app.use('/auth', authRoutes);
app.use("/Clientes", ClientesRouters);
app.use("/productos", ProductoRouters);


// inicial el Servidor 
app.listen(PORT, () => {
  console.log(`Servidor escuchando http://localhost:${PORT}`);
});

