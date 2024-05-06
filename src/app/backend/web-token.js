"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const chaveSecreta = new TextEncoder().encode(process.env.JWT_CHAVE_SECRETA);
const algoritmo = "HS256";

// inicia a sessão do administrador
export const geraToken = (idUsuario)=>{
  try{
    const token = 
    new SignJWT({idUsuario})
    .setProtectedHeader({ alg: algoritmo })
    .setExpirationTime(process.env.JWT_TEMPO_VALIDADE_SESSAO)
    .sign(chaveSecreta)

    return token;
  }catch(err){
    return false;
  }
}

export const verificarToken = async (tokenUsuario)=>{
  try{
    const dadosDecodificado = await jwtVerify(tokenUsuario, chaveSecreta);
    return dadosDecodificado;
  }catch(err){
    return false;
  }
}

// terminar a sesão do administrador 
export const eliminarToken = async ()=>{
  try{
    cookies().delete('auth');
    return true;
  }catch(err){
    console.log(err.message);
    return false;
  }
}