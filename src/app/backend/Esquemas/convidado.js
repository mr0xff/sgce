import { Schema, model } from 'mongoose';

const convidadoEsquema = new Schema({
  nome: {
    type: String,
    unique: true
  },
  email: String,
  convite: Schema.Types.ObjectId,
  bloqueado: {
    type: Boolean,
    default: false
  }
});


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