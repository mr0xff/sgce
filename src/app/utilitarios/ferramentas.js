"use server";

export async function codificador(dados){
  const codificado = JSON.stringify(dados);
  return codificado;
}

export async function decodificador(dados){
  console.log(dados.toString());
}

export async function formatoDeData(data){
  const configuracoes = {
    year: 'numeric',
    day: 'numeric',
    month: 'long'
  }
  return data.toLocaleString('pt', configuracoes);
}
