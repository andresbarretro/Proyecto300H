import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Productos = mongoose.model("Productos", ProductosSchema);

export default Productos;
