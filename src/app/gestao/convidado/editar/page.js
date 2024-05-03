import ConvidadoEditar from "@/app/interface-usuario/convidado-editar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { pegarConvidado } from "@/app/backend/banco-dados";

export default async function Page({searchParams}){
  const { id } = searchParams;
  const convidado = await pegarConvidado({_id: id});
  
  return(
    <main className="container mx-auto">
        <div className="relative min-h-14 space-y-3 rounded-md bg-indigo-500 text-white px-3 py-2 mt-3">
        
        <div className="flex items-center gap-3">
          <a href={`/gestao/convite?id=${convidado?.convite}`}>
            <ChevronLeftIcon className="h-5 w-5" />
          </a>
          <h2 className="text-xl font-medium">Editar Convidado</h2>
        </div>
       
      </div>

      <ConvidadoEditar 
        id={id} 
        nome={convidado?.nome} 
        email={convidado?.email} 
      />
    </main>
  );
}