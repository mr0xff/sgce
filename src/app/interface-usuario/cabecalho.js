import clsx from "clsx";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Cabecalho({titulo, submenus, voltar}){
  
  return(
    <nav className="relative bg-indigo-500 text-white px-3 py-2 rounded-md">
      
      <div className="flex items-center gap-3">
        <Link href={voltar}>
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h2 className="text-xl font-medium">{titulo}</h2>
      </div>

     {submenus && <ul className="list-disc mt-3 ml-10">
        {submenus.map(({href, nome}, index)=>(
          <li key={index} className={clsx({
            "hover:underline hover:font-bold": true, 
            })}>
             <Link href={href}>{nome}</Link>
          </li>
        ))}
      </ul>}
    </nav>
  );
}