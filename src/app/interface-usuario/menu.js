"use client";

import { eliminarToken } from "../backend/web-token";
import { useFormState } from 'react-dom';
import { redirect } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/solid";

const retorno = false;

export default function Menu(){
  const [estado, acaoForm ] = useFormState(eliminarToken, retorno);

  if(estado)
    redirect('/');

  return(
    <nav className="relative bg-indigo-500 text-white px-3 py-2 rounded-md">
      <h2 className="text-xl font-medium">Painel Admin</h2>

      <ul className="list-disc mt-3 ml-10">
        <li className="hover:underline hover:font-bold">
          <a href="/gestao/cadastro?tipo=convite">Cadastro</a>
        </li>

        <li className="hover:underline hover:font-bold">
          <a href="/gestao/configuracao">Configurações</a>
        </li>

        {/* <li className="hover:underline hover:font-bold">
          <a href="/gestao/autenticacao">Autenticação</a>
        </li> */}
      </ul>

      <form action={acaoForm} className="absolute top-5 right-5">
        <button type="submit" className='flex bg-white/20 hover:bg-white/50 gap-3 rounded-md border-2 border-black/10 font-bold px-3 py-2 text-sm'>
          <PowerIcon className="h-5 w-5" />
        </button>
      </form>
    </nav>
  );
}