import UserClientes from "../models/UserClientes.js";

// Obtener un usuario por nombre
export const getUsuarioPorNombre = async (req, res) => {
    try{  const nombreBuscado = req.params.nombre.toLowerCase();

  const usuario = await User.findOne({ nombre: new RegExp(`^${nombreBuscado}$`, 'i') });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req,res) => {
    try{ const nuevoUsuario = req.body;

            if(!nuevoUsuario.nombre || !nuevoUsuario.edad){
                return res.status (400).json({mensaje: "Faltan algunos campos, por favor verifica"});
            }
            const Existe = await UserClientes.findOne({ nombre: new RegExp(`^${nuevoUsuario.nombre}$`, 'i') });
                if(Existe) return res.status(400).json({ mensaje: "Esta tratando de crear un Usuario Existente"});

                // nuevoUsuario.id = UserClientes.length ? UserClientes[ UserClientes.length -1].id +1 : 1;
                await UserClientes.insertOne(nuevoUsuario);
                return res.status(201).json({mensaje: "Usuario Creado con Exito", nuevoUsuario});
     } catch (error){
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
     }
};

/** PUT /usuarios/:nombre */
export const actualizarUsuario = async (req, res) => {
  try {
    const actual = req.params.nombre.toLowerCase();
    const { nombre, edad } = req.body;

    // Validaciones
    if (edad !== undefined && (typeof edad !== 'number' || edad <= 0)) {
      return res.status(400).json({ mensaje: 'Edad inválida: debe ser número > 0' });
    }

    // Construir objeto de actualización
    const update = {};
    if (nombre) update.nombre = nombre;
    if (edad !== undefined) update.edad = edad;

    // Buscar y actualizar
    const usuario = await UserClientes.findOneAndUpdate(
      { nombre: new RegExp(`^${actual}$`, 'i') }, // filtro
      update,
      { new: true } // devuelve el doc actualizado
    );

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    return res.json(usuario);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/** DELETE /usuarios/:nombre */
export const eliminarUsuario = async (req, res) => {
  try {
    const nombre = req.params.nombre.toLowerCase();


    const eliminado = await UserClientes.findOneAndDelete({ nombre: new RegExp(`^${nombre}$`, 'i') });

    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no existe' });
    return res.json({ mensaje: 'Usuario eliminado', usuario: eliminado });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
