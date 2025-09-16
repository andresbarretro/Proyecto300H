import mongoose from "mongoose";
const {Schema} = mongoose;

const ServiciosSchema = new Schema({
    nombreServicio:{ type: String, required: true, trim: true }, 
    descripcion:{type:Number, required:true, min:0 },
    rol:{type: String,required:true,enum:['admin','staff','user'],default:'user'}, 
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},



}, {timestamps: true});

const UserServicios = mongoose.model("UserServicios", ServiciosSchema,"Servicios");

export default UserEmpresas;