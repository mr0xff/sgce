"use client";

import { useFormState } from 'react-dom'; 
import { autenticacao } from "./backend/banco-dados";
import { redirect } from 'next/navigation';

const estadoInicial = {
  mensagem: "",
};

export default function Page(){
  const [ estado, acaoForm ] = useFormState(autenticacao,estadoInicial);
  
  if (estado?.estado)
    redirect('/gestao');

  return(
    <main className="container mx-auto flex flex-col items-center h-screen justify-center">

      <h2 className="text-5xl text-center">SGCE</h2>
      <h2 className="w-5/6 md:w-96 md:mb-8 text-lg text-center">Sistema de Gestão do Convite Electrónico</h2>

      <form className="space-y-3 w-5/6 md:w-96" action={acaoForm}>

        <h2 className="hidden md:block text-xl text-center">Painel Administrativo</h2>

        <div>
          <input 
            type="text"
            placeholder="nome de usuario" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="usuario"
            required
          />
        </div>

        <div>
          <input 
            type="password"
            placeholder="senha" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="senha"
            required
          />
        </div>

        <div>
          <button className="flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Entrar</button>
        </div>

        <div className='flex justify-center'>
        <p className='bg-red-500 text-white px-3 text-center'>{estado.mensagem}</p>
        </div>
      </form>
    </main>
  );
}