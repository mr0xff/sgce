"use server";
import { pegarConvidado, pegarConvite } from "@/app/backend/banco-dados";
import QRCodePagina from "@/app/interface-usuario/qr-code";
import { formatoDeData } from "@/app/utilitarios/ferramentas";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default async function Page({searchParams}){

  const { id } = searchParams;

  const convidado = await pegarConvidado({_id: id});
  const convite = await pegarConvite({_id: convidado.convite});

  return(
    <main className="container mx-auto">
      
      <nav className="mt-3 bg-indigo-500 text-white px-3 py-2 rounded-md">
      
         <div className="flex items-center gap-3">
          <a href={`/gestao/convite?id=${convite?._id}`}>
            <ChevronLeftIcon className="h-5 w-5" />
          </a>
          <h2 className="text-xl font-medium">Dados do convidado</h2>
        </div>
         
      </nav>
  
      <div className="mt-3">
        <p>Nome: {convidado?.nome}</p>
        <p>Nome: {convidado?.email}</p>
        <p>Evento: {convite?.tema}</p>
        <p>Local: {convite?.local}</p>
        <p>Data: {formatoDeData(convite?.data)}</p>
        <p>Hora: {convite?.data.getHours()}h e {convite?.data.getMinutes()}min</p>
      </div>

      <QRCodePagina
        id={convidado?._id.toString()}
        email={convidado?.email}
        evento={convite?.tema}
        local={convite?.local}
        nome={convidado?.nome}
      />
    </main>
  )
}