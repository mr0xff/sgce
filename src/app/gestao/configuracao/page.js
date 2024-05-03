import Cabecalho from "@/app/interface-usuario/cabecalho";
import FormularioConfiguracao from "@/app/interface-usuario/formulario-configuracao";
import FormularioEmail from "@/app/interface-usuario/formulario-email";
import { pegarConfiguracao } from "@/app/backend/banco-dados";

export default async function Page(){
  const { 
    srv_email,
    srv_usuario,
    srv_senha,
    srv_port
  } = await pegarConfiguracao();
  
  const srvEmailDados = {
    srv_email,
    srv_senha,
    srv_usuario,
    srv_port
  };

  return(
    <main className="container mx-auto">

      <div className="mt-3">
        <Cabecalho
          titulo="Configuração"
          voltar="/gestao"
        />
      </div>
      
      <FormularioConfiguracao />
      <FormularioEmail 
        config_email={srvEmailDados}
      />
    </main>
  );
}