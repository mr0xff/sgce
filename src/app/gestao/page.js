import { cookies } from "next/headers";

import CartaoConvite from "@/app/interface-usuario/cartao-convite";
import Menu from "@/app/interface-usuario/menu";

import { 
  listarConvites, 
  listarConvidados 
} from "@/app/backend/banco-dados";

export default async function Page(){

  const cookie = cookies().getAll(); 

  const convites = await listarConvites();

  return(
    <main className="container mx-auto">
      
      <div className="mt-3">
        <Menu />
      </div>

      <div className="border-b-2 mt-8 mx-3 md:mx-auto">
        <h2 className="text-black/50 font-medium text-sm">Lista de Convites</h2>
      </div>
      
      {convites.length > 0 ? convites.map(async ({_id, tema})=>{
        const convidados = await listarConvidados({convite:_id});
        return <CartaoConvite
          key={_id}
          titulo={tema}
          convidados={convidados.length}
          id={_id}
        />
      }
      ):<div className="mx-3 md:mx-auto">Sem convites cadastrados</div>}
    </main>
  );
}