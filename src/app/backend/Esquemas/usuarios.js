import { Schema, model } from "mongoose";

const Esquema = new Schema({
  usuario: String,
  senha: String
});

let loginModelo

try{
  loginModelo = model('Usuarios');
}catch(err){
  loginModelo = model('Usuarios', Esquema);
}

export default loginModelo;