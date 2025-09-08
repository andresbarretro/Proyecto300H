import Productos from "../models/Productos.js";

export const getProductoPorNombre = async (req, res) =>{
    try{
        const ProductoBuscado = req.params.nombre.toLowerCase();

    const producto = await Produ.findOne({
        nombre: new RegExp (`^${ProductoBuscado}$`, `i`)
    });
    if (!producto) return res.status(404).json({ error: "Producto no encontrado"});
    return res.json(producto);
    } catch (error){
        console.error(error);
        return res.status(500)({ error: "Error interno en el servidor"});
    }
}

export const crearProducto = async (req,res) =>{
    try{
        const nuevoProducto = req.body;

        if(!nuevoProducto.nombre || !nuevoProducto.categoria){
            return res.status(200).json({error: "Faltan campos por llenar, por favor verificalos"})
        
        }
        const Exite = await Productos.findOne({ nombre: new RegExp(`^${nuevoProducto.nombre}$`, `i`)});
            if(Existe) return res.status(400).json({ mensaje: "esta tratando de Crear un Producto que ya se encuentra en su Stock"});


       await Productos.insertOne(nuevoProducto);
       return res.status(201).json({mensaje: "Producto agragado a tu Inventario"});     
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: "error interno del servidor"})
    }
};
