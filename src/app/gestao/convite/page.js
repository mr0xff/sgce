import { 
  TrashIcon, 
  PencilSquareIcon, 
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

import { 
  pegarConvite, 
  listarConvidados, 
  apagarConvite,
  enviarConviteParaTodos
} from '@/app/backend/banco-dados';

import { formatoDeData } from '@/app/utilitarios/ferramentas';
import CartaoConvidado from '@/app/interface-usuario/cartao-convidado';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page({searchParams}){
  const { id } = searchParams;
  const convite = await pegarConvite({_id: id});
  const convidados = await listarConvidados({convite: id});
  const data = convite? await formatoDeData(convite?.data) : null;

  if (!convite){
    redirect('/gestao?convite=inexistente');
  }
  
  return(
    <main className="container mx-auto">
     
      <div className="relative min-h-28 space-y-3 rounded-md bg-indigo-500 text-white px-3 py-2 mt-3">
        
        <div className="flex items-center gap-3">
          <Link href="/gestao">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-medium">Detalhes do Convite</h2>
        </div>

        <div className="font-medium text-lg md:text-3xl">{convite?"Tema: "+convite.tema:"Convite apagado"}</div>
        
        <div className='border-l-2 ml-2 pl-3'>
          <p>{convite && `Local: ${convite.local}`}</p>
          <p>{convite && `Data: ${data}`}</p>
          <p>{convite && `Hora: ${convite.data.getHours()}h e ${convite.data.getMinutes()}min`}</p>
        </div>
        
        <div className="absolute top-0 right-3 space-y-3 w-3/2">

          <Link href={`/gestao/convite/editar?id=${id}`}>
            <div className='hidden md:block md:w-full'>
              <button type="submit" className='flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
                Editar
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>

            <button  className='md:hidden flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          </Link>

          <form action={apagarConvite}>
            <input type="hidden" name="id" value={id} />

            <div className='hidden md:block w-full'>
              <button type="submit" className='flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
                Apagar
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <button  className='md:hidden flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
              <TrashIcon className="h-5 w-5" />
            </button>
          </form>

          <form action={enviarConviteParaTodos}>
            <input type="hidden" name="id" value={id} />

            <div className='hidden md:block w-full'>
              <button type="submit" className='flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
                Enviar para Todos
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>

            <button  className='md:hidden flex justify-between hover:bg-white/25 gap-3 rounded-md border-2 border-white/50 font-bold px-3 py-2 text-sm w-full'>
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>

        </div>
      </div>

      <div className="border-b-2 mt-8">
        <h2 className="text-black/50 font-medium text-sm">Lista de Convidados</h2>
      </div>
      
      <div>
        <ul className="mx-3 md:mx-auto space-y-3 mt-3">
          {convidados.length == 0 && <p>Sem convidados associado</p>}

          {convidados.length > 0 && 
            convidados.map(({
              nome, 
              _id, 
              email,
              bloqueado,
              usado
              })=><CartaoConvidado
                    key={_id} 
                    _id={_id.toString()} 
                    nome={nome} 
                    email={email} 
                    bloqueado={bloqueado}
                    usado={usado}
                  />
            )}
        </ul> 
      </div> 
    </main>
  );
}