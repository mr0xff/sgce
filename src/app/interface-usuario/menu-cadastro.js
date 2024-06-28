'use client';

import { useSearchParams } from "next/navigation";

import clsx from "clsx";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function MenuCadastro(){

  const parametro = useSearchParams();
  
  const parametroTratado = new URLSearchParams(parametro);
  
  const tipo = parametroTratado.get('tipo');
  
  return(
    <nav className="relative bg-indigo-500 text-white px-3 py-2 rounded-md">
      
      <div className="flex items-center gap-3">
        <Link href="/gestao">
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h2 className="text-xl font-medium">Cadastro</h2>
      </div>

      <ul className="list-disc mt-3 ml-10">
        <li className={clsx({
          "hover:underline hover:font-bold": true, 
          "font-bold": tipo === 'convite',
          })}>
          <Link href="/gestao/cadastro?tipo=convite">Convites</Link>
        </li>

        <li className={clsx({
          "hover:underline hover:font-bold": true, 
          "font-bold": tipo === 'convidado',
          })}>
          <Link href="/gestao/cadastro?tipo=convidado">Convidados</Link>
        </li>
      </ul>

    </nav>
  );
}