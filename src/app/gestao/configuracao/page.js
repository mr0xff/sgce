import Cabecalho from "@/app/interface-usuario/cabecalho";
import FormularioConfiguracao from "@/app/interface-usuario/formulario-configuracao";

export default function Page(){
  return(
    <main className="container mx-auto">

      <div className="mt-3">
        <Cabecalho
          titulo="Configuração"
          voltar="/gestao"
        />
      </div>
      
      <FormularioConfiguracao />
    </main>
  );
}