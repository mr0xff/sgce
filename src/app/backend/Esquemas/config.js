import { Schema, model } from 'mongoose';

const schema = new Schema({
  srv_email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  srv_usuario: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  srv_senha: {
    type: String,
    required: true,
    unique: true
  },
  srv_port: {
    type: Number,
    default: 465
  }
});


let configModelo;

try{
  configModelo = model('srv_email_config');
}catch(err){
  try{
    configModelo = model('srv_email_config', schema);
  }catch(err){
    configModelo = model('srv_email_config');
  }
}

export default configModelo;
