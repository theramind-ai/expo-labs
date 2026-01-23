
# Assistente RAG para Documentos Públicos (Expocaccer)

Este projeto é um app web de RAG (Retrieval-Augmented Generation) que responde perguntas com base em documentos públicos (PDFs e páginas web) da Expocaccer.

## Como usar

1. **Configure sua chave da OpenAI**
	- Crie um arquivo `.env.local` na raiz do projeto com:
	  ```env
	  OPENAI_API_KEY=sua-chave-aqui
	  ```
2. **Rode o projeto localmente**
	```bash
	npm install
	npm run dev
	```
3. **Acesse** [http://localhost:3000](http://localhost:3000) e use o formulário para:
	- Digitar sua pergunta
	- Colar uma ou mais URLs (PDF ou HTML, uma por linha)

## Exemplos de links para testar

Site institucional
• https://expocacer.com.br/

Documentos PDF
• https://expocaccer.com.br/wp-content/uploads/2023/04/Cartilha-Safra-2023-Digital-Expocaccer_otimizado.pdf
• https://expocaccer.com.br/wp-content/uploads/2021/06/Cartilha-Safra-DIGITAL.pdf
• https://expocaccer.com.br/wp-content/uploads/2025/10/Relatorio-Administracao-2020-adm.pdf
• https://expocaccer.com.br/wp-content/uploads/2025/10/Relatorio-Administracao-2021-adm.pdf

Páginas de conteúdo
• https://expocaccer.com.br/cooperativa-de-cafe-disponibiliza-cartilha-de-safra-para-os-produtores-do-cerrado-mineiro/
• https://expocaccer.com.br/expocaccer-disponibiliza-cartilha-de-safra-para-os-cafeicultores/
• https://expocaccer.com.br/expocaccer-lanca-tutorial-para-acesso-ao-portal-do-cooperado/
• https://expocaccer.com.br/expocaccer-revela-avancos-em-sustentabilidade-em-relatorio-de-2022/

## Observações
- Não compartilhe sua chave da OpenAI publicamente.
- O sistema faz extração sob demanda dos documentos enviados.
- Para produção, recomenda-se indexação periódica dos documentos.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/route.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).
