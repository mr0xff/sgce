import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarToken } from "@/app/backend/web-token";

export async function middleware(request) {
  if(cookies().has('auth')){
    const token = cookies().get('auth').value;

    const eValido = await verificarToken(token);

    if(!eValido){
      return NextResponse.redirect(new URL('/?se=1', request.url)) // ss = sem expirada
    }

    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/?ss=1', request.url)) // ss = sem sessão
}
 
export const config = {
  matcher: '/gestao/:path*',
}