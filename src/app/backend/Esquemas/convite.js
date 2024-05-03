import { Schema, model } from 'mongoose';

const conviteEsquema = new Schema({
  tema: {
    type: String,
    unique: true
  },
  local: String,
  data: Date
});


let conviteModelo;

try{
  conviteModelo = model('Convites');
}catch(err){
  try{
    conviteModelo = model('Convites', conviteEsquema);
  }catch(err){
    conviteModelo = model('Convites');
  }
}

export default conviteModelo;