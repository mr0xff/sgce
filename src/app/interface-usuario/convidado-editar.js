"use client";

import { actualizarConvidado } from "@/app/backend/banco-dados";
import { useFormState } from 'react-dom';

const mensagem = {
  mensagem: "",
  estado: false
};

export default function ConvidadoEditar({
  id,
  nome,
  email
}){
  const [ estado, accaoForm ] = useFormState(actualizarConvidado, mensagem);

  return(
    <form action={accaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <input type="hidden" value={id} name="id" />

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Nome do Convidado" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="nome"
            defaultValue={nome}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="email"
            placeholder="Email do Convidado" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="email"
            defaultValue={email}
            required
          />
        </div>

        <div className="lg:w-1/2">
          <button className=" flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Actualizar</button>
        </div>

        <div>
          <p>{estado.mensagem}</p>
        </div>
    </form>
  )
}