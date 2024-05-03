export default async function CartaoConvite({
  titulo,
  convidados,
  id
}){
  
  return(
    <a href={`/gestao/convite?id=${id}`}>
      <div className="hover:bg-gray-300 mt-3 bg-gray-200 px-3 py-4 rounded-md">
        <h2 className="text-xl">Tema: {titulo}</h2>
        <div className="text-sm">Nº de Convidados: {convidados}</div>
      </div>
    </a>
  );
}