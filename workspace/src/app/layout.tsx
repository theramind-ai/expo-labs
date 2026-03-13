import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CerradoHub",
  description: "CerradoHub - Soluções inteligentes de Engenharia e Gestão Ambiental, Cursos e Inovação.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
