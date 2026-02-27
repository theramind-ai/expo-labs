import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAG - Floema",
  description: "Assistente RAG para consulta de informações e documentos da Floema - Soluções em Fertilizantes e Nutrição Vegetal.",
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
