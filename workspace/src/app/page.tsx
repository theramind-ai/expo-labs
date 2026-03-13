"use client";

import React from "react";
import LucasChatbot from "../components/LucasChatbot";

export default function Home() {
  const links = [
    {
      title: "Cerrado Cursos",
      desc: "Nossa plataforma gamificada de ensino.",
      url: "https://cerradocursos.com/",
      color: "#27753f",
    },
    {
      title: "O Desafio da Gestão",
      desc: "Modernize o aprendizado e otimize o trabalho docente.",
      url: "https://cerradocursos.com/#card-97llmllwg67bfqu",
      color: "#01cb72",
    },
    {
      title: "Nossas Soluções",
      desc: "Conheça todas as nossas soluções educacionais.",
      url: "https://cerradocursos.com/#card-4a1tyastlzr3j4n",
      color: "#27753f",
    },
    {
      title: "Cerrado Engenharia",
      desc: "Soluções inteligentes de engenharia e gestão ambiental.",
      url: "https://cerradoeng.com/",
      color: "#04004f",
    },
    {
      title: "Rodrigo Machado Consultoria",
      desc: "Especialista em estudos ambientais e projetos técnicos.",
      url: "https://rodrigo-machado.com/",
      color: "#304254",
    },
  ];

  const apps = [
    { name: "História Primeira República", url: "https://cerradoeng.com/games-hist-primeira-republica" },
    { name: "Gestão Ambiental", url: "https://cerradoeng.com/gestaoambiental" },
    { name: "Códon", url: "https://cerradoeng.com/codon" },
    { name: "Divisão Celular", url: "https://cerradoeng.com/divisaocelular" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      {/* Header / Hero */}
      <header
        style={{
          background: "linear-gradient(135deg, #04004f 0%, #27753f 100%)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
          borderRadius: "0 0 40px 40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "800", marginBottom: "20px", letterSpacing: "-1px" }}>
            CerradoHub
          </h1>
          <p style={{ fontSize: "20px", opacity: 0.9, lineHeight: "1.6", fontWeight: "300" }}>
            Sua referência em <strong>Inovação Educacional</strong> e <strong>Gestão Ambiental</strong>.
            Transformamos desafios complexos em soluções ágeis e engajadoras.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "-40px auto 60px", padding: "0 20px" }}>

        {/* Hub de Links - Central de Acessos */}
        <section
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            marginBottom: "40px",
            border: "1px solid rgba(255,255,255,0.4)"
          }}
        >
          <h2 style={{ fontSize: "32px", color: "#04004f", textAlign: "center", marginBottom: "32px", fontWeight: "700" }}>
            Central de Acessos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "24px",
                  borderRadius: "16px",
                  backgroundColor: link.color,
                  color: "white",
                  textDecoration: "none",
                  transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{link.title}</h3>
                <p style={{ fontSize: "14px", opacity: 0.9, lineHeight: "1.4" }}>{link.desc}</p>
                <div style={{
                  position: "absolute",
                  right: "-10px",
                  bottom: "-10px",
                  opacity: 0.1,
                  fontSize: "80px"
                }}>
                  ↗
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Cursos & Apps and Consultoria Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" }}>

          {/* Cursos e Jogos Educacionais */}
          <section
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ fontSize: "32px" }}>🎮</span>
              <h2 style={{ fontSize: "28px", color: "#27753f", fontWeight: "700", margin: 0 }}>Cursos & Apps</h2>
            </div>
            <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6" }}>
              Modernize o aprendizado com gamificação de elite. Conheça nossos simuladores e quizzes que engajam e mensuram a evolução do aluno baseado na BNCC.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {apps.map((app, i) => (
                <a
                  key={i}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "16px 20px",
                    backgroundColor: "#f0f7e8",
                    color: "#27753f",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e8f5d9"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f0f7e8"}
                >
                  {app.name}
                  <span>➔</span>
                </a>
              ))}
            </div>
          </section>

          {/* Engenharia e Consultoria */}
          <section
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ fontSize: "32px" }}>🍃</span>
              <h2 style={{ fontSize: "28px", color: "#04004f", fontWeight: "700", margin: 0 }}>Consultoria</h2>
            </div>
            <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6" }}>
              A Cerrado Engenharia e Consultoria Ambiental entrega soluções inteligentes de engenharia civil e gestão ambiental.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "20px", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "#04004f", marginBottom: "8px", fontWeight: "700" }}>Engenharia e Construção</h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  Com Letícia Carvalho Valério. Planejamento, gerenciamento de obras civis e industriais com foco em otimização de custos e prazos.
                </p>
              </div>

              <div style={{ padding: "20px", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "#04004f", marginBottom: "8px", fontWeight: "700" }}>Gestão Ambiental</h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  Com Rodrigo Machado. Licenciamento, georreferenciamento, inventários florestais e operação de drones para alta precisão.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px 20px", color: "#64748b", borderTop: "1px solid #e2e8f0" }}>
        <p>© 2026 CerradoHub. Todos os direitos reservados.</p>
        <p style={{ fontSize: "14px", marginTop: "8px" }}>Converse com o Lucas no canto inferior direito para saber mais!</p>
      </footer>

      {/* Embedded Lucas Chatbot */}
      <LucasChatbot />
    </div>
  );
}
