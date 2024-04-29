"use client";

import { 
  PencilSquareIcon, 
  QrCodeIcon, 
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/solid";

import { 
  apagarConvidado,
  bloquearDesbloquearConvidado 
} from "@/app/backend/banco-dados";

import { enviarEmail } from "@/app/utilitarios/accoes";

export default function CartaoConvidado({
  _id,
  nome,
  email,
  bloqueado
}){

  return(
    <li key={_id} className='hover:shadow-md hover:bg-gray-200 bg-gray-100 px-3 py-2 rounded-md'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-lg'>Nome: {nome}</h2>
                <p>Email: {email}</p>
              </div>

              <div className='flex gap-3'>

                <a href={`/gestao/convidado/editar?id=${_id}`}>
                  <button className='flex hover:bg-white/50 gap-3 rounded-md border-2 border-black/10  font-bold px-3 py-2 text-sm'>
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                </a>

                <div>
                  <button onClick={async()=>{
                    const resultado = await bloquearDesbloquearConvidado(_id);
                    alert(resultado.mensagem);
                    window.location.reload();
                  }} className='flex hover:bg-white/50 gap-3 rounded-md border-2 border-black/10  font-bold px-3 py-2 text-sm'>
                    { bloqueado ?
                      <LockClosedIcon className="h-5 w-5" />:
                      <LockOpenIcon className="h-5 w-5" />
                    }
                  </button>
                </div>

                <div>
                  <button onClick={async()=>{
                    const desejaApagar = window.confirm("Tem certeza que deseja apagar?");
                    if (desejaApagar){
                      const retorno = await apagarConvidado(_id);
                      console.log(retorno);
                      retorno.estado && alert(retorno.mensagem);
                      window.location.reload();
                    } 
                  }} className='flex hover:bg-white/50 gap-3 rounded-md border-2 border-black/10 font-bold px-3 py-2 text-sm'>
                    
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                <a href={`/gestao/convidado?id=${_id}`}>
                  <button className='flex hover:bg-white/50 gap-3 rounded-md border-2 border-black/10 font-bold px-3 py-2 text-sm'>
                    <QrCodeIcon className="h-5 w-5" />
                  </button>
                </a>

                <div>
                    <button onClick={async()=>{
                      const resultado = await enviarEmail(_id);
                      console.log(resultado);

                    }} className='flex hover:bg-white/50 gap-3 rounded-md border-2 border-black/10 font-bold px-3 py-2 text-sm'>
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </div>
              </div>
            </div>
          </li>
  );
}