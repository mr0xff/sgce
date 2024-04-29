import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarToken } from "./app/backend/web-token";

export function middleware(request) {
  if(cookies().has('auth')){
    const token = cookies().get('auth').value;

    verificarToken(token);

    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/gestao/:path*',
}