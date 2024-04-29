"use client";

import Qrcode from "qrcode";
import { useState } from "react";
import Image from "next/image";

export default function QRCodePagina({
  id,
  nome,
  email,
  local,
  evento,
}){

  const [ codigoQr, setCodigoQr ] = useState("");
  const [ qrCodeTerminado, setQrCodeTerminado ] = useState(false);

  Qrcode.toDataURL(JSON.stringify({ 
    id, 
    nome, 
    email,
    convite: evento,
    local,
    software: 'convite-elect v1.0'
  }))
  .then(setCodigoQr)
  .finally(()=>setQrCodeTerminado(true));

  return(
    <main>
      <div className="mt-3">
        <h2 className="text-xl">Codigo QR Privado do Convidado!</h2>
        
         { qrCodeTerminado && <Image 
            src={codigoQr} 
            width={300} 
            height={50}
            alt="codigo qr" 
          />}
      </div>
    </main>
  );
}