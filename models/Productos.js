import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  rol:{type: String, enum:['admin','staff','user'],default:'user'}, 
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Productos = mongoose.model("Productos", ProductosSchema, "productos");

export default Productos;
