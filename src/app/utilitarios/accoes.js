'use server';

import { redirect } from "next/navigation";

import { createTransport } from 'nodemailer';
import convidadoModelo from "../backend/esquemas/convidado";
import conviteModelo from "../backend/esquemas/convite";
import { formatoDeData } from "./ferramentas";
import { pegarConfiguracao } from "@/app/backend/banco-dados";
import Qrcode from "qrcode";
import { cookies } from "next/headers";


export async function apagarToken(){
  console.log('delte');
  cookies().delete('auth');
}

export async function criarQrCode(dadosFormulario){
  
  const id = dadosFormulario.get('id');
  const nome = dadosFormulario.get('nome');
  const email = dadosFormulario.get('email');

  redirect(`/gestao/convidado?id=${id}&nome=${nome}&email=${email}`);
}

export async function enviarEmail(id){
  try{
    const convidado = await convidadoModelo.findOne({_id: id});
    const convite = await conviteModelo.findOne({_id: convidado.convite });
    const config = await pegarConfiguracao();

    const codigoQR = await Qrcode.toDataURL(JSON.stringify({
      id: convidado._id.toString(),
      nome: convidado.nome,
      email: convidado.email,
      convite: convite.tema,
      software: "sgce v1.0"
    }));

    const transport = createTransport({
      host: config.srv_email,
      port: config.srv_port,
      auth: {
        user: config.srv_usuario,
        pass: config.srv_senha,
      }
    });

    const mailOptions = {
      from: config?.srv_usuario,
      to: convidado.email,
      subject: `Convite para ${convite.tema}`,
      attachments: [
        {  
          path: codigoQR,
          filename: "convite-qrcode.png"
        }
      ],
      html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Convite para o Evento</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  text-align: center;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s;
              }
              .btn:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>${convite.tema}</h1>
              <p>Olá Sr(a).${convidado.nome}, Você está convidado para o nosso evento especial!</p>
              <p>Data: ${await formatoDeData(convite.data)}</p>
              <p>Horário: ${convite.data.getHours()}h e ${convite.data.getMinutes()}min</p>
              <p>Local: ${convite.local}</p>
              <p>Anexamos a baixo o seu convite electronico que vai apresentar no local do evento.</p>
          </div>
      </body>
      </html>
      `,
    };

    transport.verify(function(error, success) {
      if (error) {
        console.log("erro na conexão com o servidor de email", error.message);
      } else {
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`falha no envido do email, ${convidado.email}`);
            console.log(`motivo: ${error.message}, ${error.code}`);
          } else {
            console.log(`convite enviado para ${convidado.email}`);
          }
        });
      }
    });

    return {
      mensagem: "Convite enviado com sucesso!",
      estado: true,
    }
  }catch(err){
    return {
      mensagem: "falha no envio do convite",
      estado: false
    }
  }
}