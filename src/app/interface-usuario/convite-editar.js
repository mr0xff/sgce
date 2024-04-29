"use client";

import { useFormState } from 'react-dom';
import { actualizarConvite } from '../backend/banco-dados';

const mensagem= {
  texto: "",
  estado: false
}

export default function ConviteEditar({
  idConvite,
  nome,
  local,
  data
}){
  const [ estado, acaoForm ] = useFormState(actualizarConvite, mensagem);

  return(
    <form action={acaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <h2 className="text-xl text-center">Edição do Convite</h2>
        <input type="hidden" name="idConvite" value={idConvite} />

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Tema do Convite" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="tema"
            defaultValue={nome}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Local do Evento" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="local"
            defaultValue={local}
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <p className='text-sm'>
            Data: {data.toISOString().split('T')[0]} <span> </span>
            Hora: {data.toISOString().split('T')[1].split('.')[0]}
          </p>
          <input 
            type="datetime-local"
            placeholder="Data do Evento" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="data"
            required
          />
        </div>

        <div className="lg:w-1/2">
          <button className="flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Actualizar</button>
        </div>

        <div className="bg-green-500 text-white px-2">
          <p>{estado.mensagem}</p>
        </div>
    </form>
  )
}