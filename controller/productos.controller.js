import Productos from "../models/Productos.js";

export const getProductoPorNombre = async (req, res) =>{
    try{
        const ProductoBuscado = req.params.nombre.toLowerCase();

    const producto = await Productos.findOne({
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
        const Existe = await Productos.findOne({ nombre: new RegExp(`^${nuevoProducto.nombre}$`, `i`)});
            if(Existe) return res.status(400).json({ mensaje: "esta tratando de Crear un Producto que ya se encuentra en su Stock"});


       await Productos.insertOne(nuevoProducto);
       return res.status(201).json({mensaje: "Producto agragado a tu Inventario"});     
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: "error interno del servidor"})
    }
};


export const actualizarProducto = async (req, res) =>{
    try {
        const actualizar =  req.params.nombre.toLowerCase();
        const { nombre, precio, stock} = req.body;

        if ( nombre !== undefined && (typeof precio !== "number" || precio <= 0) && (typeof stock !== "number" || stock < 0)) {
            return res.status(400).json({ mensaje: "Por Favor complete los campos obligatorios. Stock y precio mayor que 0"});
        }

        const update = {};
        if (nombre) update.nombre = nombre;
        if (stock !== undefined) update.stock = stock;
        if (precio !== undefined) update.precio = precio;


        // buscar producto para actualizar 
        const producto = await Productos.findOneAndUpdate(
            { nombre: new RegExp(`^${actualizar}$`, "i") }, 
            update,
            { nuw: true}
        );

        if (!producto) return res.status(404).json({ mensaje: "Producto no existente"});
        return res.json(producto);
     }catch (err){
        return res.status(500).json({error: err.messege})
     }

};


// Borrrar usuarios 

export const eliminarProducto = async (req,res) =>{

    try{
        const nombre = req.params.nombre.toLowerCase();
        
        const eliminar = await Productos.findOneAndDelete({nombre: new RegExp(`^${nombre}$`, "i")});

        if(!eliminar) return res.status(404).json({ mensaje: "Producto no exsistente"});
        return res.status(201).json({ mensaje: "producto eliminado", nombre: eliminar});
    } catch (err){
        return res.status(500).json({ error: err.message});
    }
}