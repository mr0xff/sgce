"use client";

import { useFormState } from 'react-dom';
import { configurarServidorEmail } from "@/app/backend/banco-dados";

const mensagem = {
  mensagem: "",
  estado: false
};

export default function FormularioEmail({config_email}){
  const [ estado, accaoForm ] = useFormState(configurarServidorEmail, mensagem);

  return(
    <form action={accaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <h2 className="text-xl text-center">Configuração do Servidor de Email</h2>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Hostname ou IP do servidor" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="srv_email"
            defaultValue={config_email?.srv_email}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="email"
            placeholder="Email do usuario" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="srv_usuario"
            defaultValue={config_email?.srv_usuario}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="senha do usuario" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="srv_senha"
            defaultValue={config_email?.srv_senha}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="number"
            placeholder="porta do servidor" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="srv_port"
            defaultValue={config_email?.srv_port}
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