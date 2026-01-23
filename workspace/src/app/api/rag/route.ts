import { NextRequest, NextResponse } from "next/server";

import fetch from "node-fetch";
import * as pdfjsLib from "pdfjs-dist";


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Lista padrão de URLs institucionais e PDFs da Expocaccer
const DEFAULT_RAG_URLS = [
  // Site institucional
  "https://expocacer.com.br/",
  // Documentos PDF
  "https://expocaccer.com.br/wp-content/uploads/2023/04/Cartilha-Safra-2023-Digital-Expocaccer_otimizado.pdf",
  "https://expocaccer.com.br/wp-content/uploads/2021/06/Cartilha-Safra-DIGITAL.pdf",
  "https://expocaccer.com.br/wp-content/uploads/2025/10/Relatorio-Administracao-2020-adm.pdf",
  "https://expocaccer.com.br/wp-content/uploads/2025/10/Relatorio-Administracao-2021-adm.pdf",
  // Páginas de conteúdo
  "https://expocaccer.com.br/cooperativa-de-cafe-disponibiliza-cartilha-de-safra-para-os-produtores-do-cerrado-mineiro/",
  "https://expocaccer.com.br/expocaccer-disponibiliza-cartilha-de-safra-para-os-cafeicultores/",
  "https://expocaccer.com.br/expocaccer-lanca-tutorial-para-acesso-ao-portal-do-cooperado/",
  "https://expocaccer.com.br/expocaccer-revela-avancos-em-sustentabilidade-em-relatorio-de-2022/"
];

// Função para extrair texto de PDF
async function extractPdfText(url: string): Promise<string> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }
  return text;
}

// Função para extrair texto de página web
async function extractHtmlText(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();
  // Remove scripts, styles, menus, footers, etc.
  const main = html.replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "");
  const text = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  return text;
}

// Divide texto em chunks de até 1500 caracteres
function chunkText(text: string, size = 1500): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

// Busca trechos relevantes (simples: palavra-chave)
function findRelevantChunks(chunks: string[], question: string): string[] {
  const q = question.toLowerCase();
  return chunks.filter(chunk => chunk.toLowerCase().includes(q)).slice(0, 3);
}

export async function POST(req: NextRequest) {

  const { question, urls } = await req.json();
  if (!question) {
    return NextResponse.json({ error: "Pergunta é obrigatória." }, { status: 400 });
  }
  // Se não vier URLs, usa a lista padrão
  const urlsToUse = Array.isArray(urls) && urls.length > 0 ? urls : DEFAULT_RAG_URLS;

  let allChunks: { url: string, chunk: string }[] = [];
  for (const url of urlsToUse) {
    try {
      let text = "";
      if (url.endsWith(".pdf")) {
        text = await extractPdfText(url);
      } else {
        text = await extractHtmlText(url);
      }
      const chunks = chunkText(text);
      allChunks.push(...chunks.map(chunk => ({ url, chunk })));
    } catch (e) {
      console.error(`Erro ao processar ${url}:`, e);
    }
  }

  if (allChunks.length === 0) {
    return NextResponse.json({ answer: "Não foi possível extrair texto dos documentos. Tente novamente." }, { status: 400 });
  }

  // Busca chunks relevantes
  const relevant = findRelevantChunks(allChunks.map(c => c.chunk), question);
  const context = relevant.map((chunk, i) => `Trecho ${i+1}: ${chunk}`).join("\n\n");

  // Monta prompt
  const prompt = `Você é um assistente RAG para documentos públicos e PDFs. Responda à pergunta do usuário com base nos trechos abaixo, citando a fonte (URL) de onde veio a informação.\n\nPergunta: ${question}\n\nTrechos:\n${context}\n\nResposta:`;

  // Valida chave OpenAI
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Chave OpenAI não configurada. Configure OPENAI_API_KEY no .env.local" }, { status: 500 });
  }

  // Chama OpenAI
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.2
    })
  });

  if (!openaiRes.ok) {
    const errorData = await openaiRes.json() as any;
    return NextResponse.json({ error: `Erro na OpenAI: ${errorData.error?.message || "Erro desconhecido"}` }, { status: openaiRes.status });
  }

  const openaiData = (await openaiRes.json()) as any;
  const answer = openaiData.choices?.[0]?.message?.content || "Não foi possível obter resposta.";

  return NextResponse.json({ answer });
}
