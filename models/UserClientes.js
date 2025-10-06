import mongoose from "mongoose";
const {Schema} = mongoose;

const ClientesSchema = new Schema({
    nombre: {type:String, required:true},
    nombreKey: { type: String, index: true }, // clave de búsqueda normalizada
    edad: {type:Number, required:true, min:0 },
    role:{type: String, enum:['admin','staff','user'],default:'user'}, 
    email: {type:String, required:true, unique:true, lowercase: true, trim: true },
    
    password:{type:String, required:true}


}, {timestamps: true});

ClientesSchema.pre('save', async function(next) {
  // hash password si cambió
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // calcula nombreKey si cambió nombre
  if (this.isModified('nombre')) {
    this.nombreKey = normalizeKey(this.nombre);
  }
  next();
});

ClientesSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', ClientesSchema);