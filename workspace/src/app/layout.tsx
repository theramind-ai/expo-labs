import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAG - Grupo Setta",
  description: "Assistente RAG para consulta de informações e documentos do Grupo Setta.",
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
