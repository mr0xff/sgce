import { exec } from 'child_process';
import { pegarConvidado } from "@/app/backend/banco-dados";
import convidadoModelo from "@/app/backend/esquemas/convidado";


export async function POST(request){
  try{
    
  const data = new URL(request.url);
  const id = data.searchParams.get('id');
 
  const convidado = await pegarConvidado({_id: id});
  
  if(!convidado)
    throw new Error("usuario inexistente!");
  
  if(convidado.bloqueado)
    return Response.json({
      mensagem: "convidado foi bloqueado pelo administrador",
      estado: false
    });

  if (convidado.usado)
    return Response.json({
      mensagem: "convite já foi usado",
      estado: false,
    });
  // actualizar o campo usado
  exec(`${process.cwd()}/arduino.sh`, (err)=>{
    if(err){
      console.log(err);
      return;
    }
    console.log('Catraca aberta');
  }); 

  await convidadoModelo.updateOne({_id: convidado._id}, {
    usado: true,
  });

  return Response.json({
    mensagem: "convidado autorizado!",
    estado: true,
  });

  }catch(err){
    return Response.json({
      mensagem: "falha",
      estado: false,
    });
  }
}
