import { Schema, model } from 'mongoose';

const convidadoEsquema = new Schema({
  nome: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  convite: Schema.Types.ObjectId,
  bloqueado: {
    type: Boolean,
    default: false
  },
  usado: {
    type: Boolean,
    default: false
  }
}, { timestamps: {createdAt: true}});

let convidadoModelo;

try{
  convidadoModelo = model('Convidados');
}catch(err){
  try{
    convidadoModelo = model('Convidados', convidadoEsquema);
  }catch(err){
    convidadoModelo = model('Convidados');
  }
}

export default convidadoModelo;