import UserClientes from '../models/UserClientes.js';
import { signJwt } from '../lib/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, role, edad } = req.body;
    const exists = await UserClientes.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });
    const user = await UserClientes.create({ nombre, email, password, role, edad });
    const token = signJwt({ id: user._id.toString(), email: user.email, role: user.role });
    res.status(201).json({ token });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserClientes.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const token = signJwt({ id: user._id.toString(), email: user.email, role: user.role });
    res.json({ token });
  } catch (e) { next(e); }
};