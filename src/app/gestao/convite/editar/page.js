import ConviteEditar from "@/app/interface-usuario/convite-editar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { pegarConvite } from "@/app/backend/banco-dados";

export default async function Page({searchParams}){
  const { id } = searchParams;
  const convite = await pegarConvite({_id: id});
  
  return(
    <main className="container mx-auto">
        <div className="relative min-h-14 space-y-3 rounded-md bg-indigo-500 text-white px-3 py-2 mt-3">
        
        <div className="flex items-center gap-3">
          <a href={`/gestao/convite?id=${id}`}>
            <ChevronLeftIcon className="h-5 w-5" />
          </a>
          <h2 className="text-xl font-medium">Editar Convite</h2>
        </div>
       
      </div>

      <ConviteEditar 
        idConvite={id} 
        nome={convite?.tema} 
        local={convite?.local} 
        data={convite?.data}
      />
    </main>
  );
}