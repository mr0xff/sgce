"use client";
import React,{ useState,useEffect } from "react";
import { criarConvidado, listarConvites } from "../backend/banco-dados";
import { useFormState } from 'react-dom';

const mensagem = {
  mensagem: "",
  estado: false
};

export default function FormularioConvidado(){
  const [ estado, accaoForm ] = useFormState(criarConvidado, mensagem);
  const [ convites, setConvites ] = useState([]);
  const [ estadoMensagem, setEstadoMensagem ] = useState(false); 
  
  const bustarConvites = async ()=>{
    const resultado = await listarConvites({tema: 1});
    setConvites(resultado);
  }

  useEffect(()=>{
    setEstadoMensagem(true);
    setTimeout(()=>{
      setEstadoMensagem(false);
    }, 3000);
  }, [estado]);

  return(
    <form action={accaoForm} className="lg:flex lg:flex-col lg:items-center space-y-3 mt-3 border-2 border-indigo-100 p-3 rounded-md">

        <h2 className="text-xl text-center">Cadastro de Convidado</h2>

        <div className="w-full lg:w-1/2">
          <input 
            type="text"
            placeholder="Nome do Convidado" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="nome"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <input 
            type="email"
            placeholder="Email do Convidado" 
            className="bg-gray-100 p-2 w-full focus:outline-none focus:border-b-2 focus:border-indigo-500"
            name="email"
            required
          />
        </div>

        <div className="w-full lg:w-1/2">
          <select className="px-3 py-2" name="convite" required onClick={bustarConvites}>
            <option value="">Selecione o Evento</option>
            {convites.map((item)=>(
              <option key={item._id} value={item._id}>{item.tema}</option>
            ))}
          </select>
        </div>

        <div className="lg:w-1/2">
          <button className=" flex w-full font-medium bg-indigo-500 text-white p-2 justify-center">Cadastrar</button>
        </div>
      { estado.mensagem && estadoMensagem &&
        <div>
          <p>{estado.mensagem}</p>
        </div>
      }
    </form>
  )
}