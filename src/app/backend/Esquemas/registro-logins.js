import { Schema, model } from "mongoose";

const schema = new Schema({
  usuario_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token_usuario: {
    type: String,
    required: true,
  }
}, { 
  collection: 'registros_login.js',
  timestamps: {
    createdAt: true,
  }
});

let registrosLoginModelo;

try{
  registrosLoginModelo = model('Registros');
}catch(err){
  registrosLoginModelo = model('Registros', schema);
}

export default registrosLoginModelo;