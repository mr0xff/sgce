"use client";

import { useFormState } from 'react-dom';
import { actualizarSenhaAdmin } from "@/app/backend/banco-dados";

const mensagem = {
  texto: "",
  estado: false
};

export default function FormularioConfiguracao(){
  const [ estado, accaoForm ] = useFormState(actualizarSenhaAdmin, mensagem);

  return(
    <form action={accaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <h2 className="text-xl text-center">Actualizar senha do Admin</h2>

        <div className="w-full lg:w-1/2">
          <input 
            type="password"
            placeholder="Senha Actual" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="actual"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="password"
            placeholder="Nova Senha" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="nova"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="password"
            placeholder="Confirmar Nova Senha" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="confirmacao"
            required
          />
        </div>

        <div className="lg:w-1/2">
          <button 
          type="submit" 
          className=" flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Actualizar</button>
        </div>

        <div>
          <p>{estado.mensagem}</p>
        </div>
    </form>
  )
}