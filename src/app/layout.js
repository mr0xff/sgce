import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "SGCE | Convite Electrónico",
  description: "Sistema de Gestão de Convite Electrónico",
};

export default function RootLayout({children}) {
  return (
    <html lang="pt">
      <body className={font.className}>{children}</body>
    </html>
  );
}
