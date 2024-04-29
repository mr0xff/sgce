import FormularioConvite from "../../interface-usuario/formulario-convite";
import FormularioConvidado from "../../interface-usuario/formulario-convidado";
import MenuCadastro from "../../interface-usuario/menu-cadastro";

export default function Page({searchParams}){
  
  const { tipo } = searchParams; 

  return(
    <main className="container mx-auto">

      <div className="mt-3">
        <MenuCadastro />
      </div>

      { tipo === 'convite' && <FormularioConvite />}

      { tipo === 'convidado' && <FormularioConvidado />}
      
    </main>
  );
}