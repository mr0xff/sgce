"use client";

import React,{ useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { criarConvite } from '../backend/banco-dados';

const mensagem= {
  mensagem: "",
  estado: false
}

export default function FormularioConvite(){
  const [ estado, acaoForm ] = useFormState(criarConvite, mensagem);
  const [ estadoMensagem, setEstadoMensagem ] = useState(false);

  useEffect(()=>{
    setEstadoMensagem(true);
    setTimeout(()=>{
      setEstadoMensagem(false);
    }, 3000);
  }, [estado]);

  return(
    <form action={acaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <h2 className="text-xl text-center">Cadastro de Convite</h2>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Tema do Convite" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="tema"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Local do Evento" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="local"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="datetime-local"
            placeholder="Data do Evento" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="data"
            required
          />
        </div>

        <div className="lg:w-1/2">
          <button className="flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Cadastrar</button>
        </div>

       { estado.mensagem && estadoMensagem &&
       <div>
          <p>{estado.mensagem}</p>
        </div>}
    </form>
  )
}