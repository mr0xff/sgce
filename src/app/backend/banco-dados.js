"use server";

import { connect, connection } from "mongoose";
import { cookies } from "next/headers";
import { hash, verify } from "argon2";

//modelos para interagir com o banco de dados
import loginModelo from "@/app/backend/esquemas/usuarios";
import conviteModelo from "@/app/backend/esquemas/convite";
import convidadoModelo from "@/app/backend/esquemas/convidado";
import configModelo from "@/app/backend/esquemas/config";
import { geraToken } from "@/app/backend/web-token";
import { redirect } from "next/navigation";
import { enviarEmail } from "@/app/utilitarios/accoes";

connect(process.env.ENDERECO_DB)
.then(async ()=>{
  const usuario = await loginModelo.findOne({usuario: 'admin'});
  const configServidorEmail = await pegarConfiguracao();

  if(!usuario){
    const senha = await hash('admin');
    const configUsuario = await loginModelo({
      usuario: "admin",
      senha,
    });

    await configUsuario.save();
  }

  if(!configServidorEmail){
    const configPadrao = await configModelo({
      srv_email: 'hostname.ou.ip_do_servidor',
      srv_senha: 'definir sua senha',
      srv_usuario: 'nome@host.com'
    });
    
    await configPadrao.save();
  }
})
.catch((err)=>{
  console.log('[ERRO] Falha no banco de dados: ', err.message);
})

export async function autenticacao(prev, dadosFormulario){
  const usuario = dadosFormulario.get('usuario');
  const senha = dadosFormulario.get('senha');

  try{

    const resultado = await loginModelo.findOne({usuario});

    if(!resultado){
      return {
        mensagem: "Nome ou senha inválido!",
        estado: false,
      }
    }
    
    const senhaValida = await verify(resultado.senha, senha);
    
    if (senhaValida){
      const { _id } = resultado;
      const tokenUsuario = await geraToken(_id.toString());
      
      cookies().set('auth', tokenUsuario);
  
      return {
        mensagem: "sucesso!",
        estado: true,
      }
    }else
    return {
      mensagem: "Nome ou senha inválido!",
      estado: false,
    }
  }catch(err){

    return {
      mensagem: "Falha no banco de dados!",
      estado: false
    };
  }

}

export async function criarConvite(prev, conviteFormualrio){
  const tema = conviteFormualrio.get('tema');
  const local = conviteFormualrio.get('local');
  const data = conviteFormualrio.get('data');

  if(tema && local && data){

    const resultado = await conviteModelo({
      tema,
      local,
      data
    });

    try{
      await resultado.save();
      return {
        mensagem: 'Convite criado!',
        estado: true
      } 
    }catch(err){
      return {
        mensagem: "Convite existente!",
        estado: false
      }
    }

  }else{
    return{
      mensagem: 'Preencha todos os campos!',
      estado: false
    }
  }
}

export async function listarConvites(filtro, buscar){
  if(!filtro || !buscar)
    return await conviteModelo.find();
  const resultado = await conviteModelo.find(buscar).select(filtro);
  return resultado;
  
}

export async function pegarConvite(filtro){
  return await conviteModelo.findOne(filtro);
}

export async function criarConvidado(prev, convidadoFormulario){
  const nome = convidadoFormulario.get('nome');
  const email = convidadoFormulario.get('email');
  const convite = convidadoFormulario.get('convite');

  if(nome && email && convite){
    const resultado = await convidadoModelo({
      nome, 
      email,
      convite
    });
    let mensagem;

    try{
      await resultado.save();
      mensagem = {
        mensagem: "Convidado criado com sucesso!",
        estado: true
      }
    }catch(err){
      mensagem = {
        mensagem: "Convidado existente!",
        estado: false
      }
    }

    return mensagem;
    
  }else{
    return {
      mensagem: "Preencha todos os campos!",
      estado: false
    }
  }
}

export async function pegarConvidado(filtro){
  const resultado = await convidadoModelo.findOne(filtro);
  return resultado;
}

export async function listarConvidados(filtro){
  const resultado = await convidadoModelo.find(filtro);
  return resultado;
}

export async function apagarConvite(conviteForm){
  const idConvite = conviteForm.get('id');

  await conviteModelo.deleteOne({_id: idConvite});
  await convidadoModelo.deleteMany({convite: idConvite});

  redirect('/gestao');
}

export async function apagarConvidado(id){
  const resultdo = await convidadoModelo.deleteOne({_id: id})
  
  if(resultdo.deletedCount)
    return {
      mensagem: "convidao apagado com sucesso!",
      estado: true,
    }
  else
    return {
      mensagem: "Não foi apagdo nada!",
      estado: false
   }
}

export async function bloquearDesbloquearConvidado(id){
  const convidado = await convidadoModelo.findOne({_id: id}).select({bloqueado: 1});

  if(convidado){
    const convidadoAtualizado = 
    await convidadoModelo.updateOne(
      {_id: convidado._id},
      { bloqueado: !convidado.bloqueado }
    );

    if(convidadoAtualizado.modifiedCount)
      return{
        mensagem: !convidado.bloqueado?"Desbloqueado!":"Bloqueado",
        estado: true
      }
    else
      return {
        mensagem: "Erro na solicitação do cliente",
        estado: false
      }
  }
} 

export async function actualizarConvite(prev, actualizarForm){
  const idConvite = actualizarForm.get('idConvite');
  const tema = actualizarForm.get('tema');
  const local = actualizarForm.get('local');
  const data = actualizarForm.get('data');

  const anterior = await conviteModelo.findOne({_id: idConvite});

  const novo = await conviteModelo.findOneAndUpdate({
    _id: idConvite,
  },{
      tema,
      local,
      data
    }, { new: true }); 
  
  return {
    mensagem: "Evento actualizado com sucesso!",
    estado: true
  };
}

export async function actualizarConvidado(prev, actualizarForm){
  const id = actualizarForm.get('id');
  const nome = actualizarForm.get('nome');
  const email = actualizarForm.get('email');

  const convidadoAtualizado = 
  await convidadoModelo.findOneAndUpdate(
    {_id: id}, 
    { nome, email }
  );

  if(convidadoAtualizado)
    return {
      mensagem: "Informações actualizadas!",
      estado: true
    }
}

export async function actualizarSenhaAdmin(prev, actualizarForm){
  const actual = actualizarForm.get('actual');
  const nova = actualizarForm.get('nova');
  const confirmacao = actualizarForm.get('confirmacao');

  const senhaBanco = await loginModelo.findOne({usuario: "admin"}).select({senha: 1});

  // verificar se a senha actual é igual a do banco de dados
  const verificado = await verify(senhaBanco.senha, actual);

  if(verificado){
    if(nova == confirmacao){
        const novaSenhaEncriptada = await hash(nova);
        
        await loginModelo.findOneAndUpdate({usuario: 'admin'}, {senha: novaSenhaEncriptada});

        return {
        mensagem: "Senha actualizada com sucesso!",
        estado: true,
      }
    }else{
      return {
        mensagem: "As senhas são diferentes!",
        estado: false,
      }
    }
    
  }else{
    return {
      mensagem: "Senha incorrecta!",
      estado: false,
    }
  }
}

export async function configurarServidorEmail(prev, actualizarForm){
  const srv_email = actualizarForm.get('srv_email');
  const srv_port = actualizarForm.get('srv_port');
  const srv_senha = actualizarForm.get('srv_senha');
  const srv_usuario = actualizarForm.get('srv_usuario');
  
  const data = {
    srv_email,
    srv_port: srv_port ? srv_port : 465,
    srv_senha,
    srv_usuario
  };

  const criarConfiguracao = await configModelo(data);

  await configModelo.deleteMany();

  await criarConfiguracao.save();

  return {
    mensagem: 'informação guardada!',
    estado: true
  }
}

export async function pegarConfiguracao(){
  const config = await configModelo.findOne({}).select({_id: 0});
  return config;
}

export async function enviarConviteParaTodos(formulario){
  const id = formulario.get('id'); // id do convite
  const convidados = await convidadoModelo.find({convite: id});

  convidados.map(async ({_id})=>{
    await enviarEmail(_id);
  })
}
connection.on('connected', ()=>{
  console.log('[INFO] conexão com o banco de dados no', process.env.ENDERECO_DB);
});

connection.on('error', ()=>{
  console.log('[ERRO] Falha na conexão com o banco de dados no', process.env.ENDERECO_DB);
});

connection.on('disconnected', ()=>{
  console.log('[AVISO] disconectado do banco de dados no', process.env.ENDERECO_DB);
});