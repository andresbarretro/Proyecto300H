import mongoose from "mongoose";
const {Schema} = mongoose;

const ClientesSchema = new Schema({
    nombre: {type:String, required:true},
    edad: {type:Number, required:true, min:0 },
    rol:{type: String, enum:['admin','staff','user'],default:'user'}, 
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    rol: {type:String, required:true}


}, {timestamps: true});

const UserClientes = mongoose.model("UserClientes", ClientesSchema,"Clientes");

export default UserClientes;