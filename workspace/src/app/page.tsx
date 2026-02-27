"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [urls, setUrls] = useState("");
  const [messages, setMessages] = useState<{ type: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { type: "user", content: question }]);
    setQuestion("");

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          customUrls: urls.split("\n").map(u => u.trim()).filter(Boolean)
        })
      });
      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { type: "assistant", content: `Erro: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { type: "assistant", content: data.answer }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { type: "assistant", content: "Erro ao conectar ao servidor. Tente novamente." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #d4e4d4",
        padding: "16px 20px",
        backgroundColor: "#ffffff"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src="/logo-floema.svg"
            alt="Floema Logo"
            style={{ height: "40px", borderRadius: "4px" }}
          />
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#2d5016", margin: 0 }}>
              RAG - Floema
            </h1>
            <p style={{ fontSize: "14px", color: "#4a7c2e", margin: "4px 0 0 0" }}>
              Inteligência Artificial para Soluções Agrícolas e Fertilizantes
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 0", backgroundColor: "#ffffff" }}>
        {messages.length === 0 ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            textAlign: "center",
            padding: "20px"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
            <h2 style={{ fontSize: "28px", fontWeight: "600", color: "#2d5016", marginBottom: "8px" }}>
              Bem-vindo ao Assistente Floema
            </h2>
            <p style={{ fontSize: "16px", color: "#4a7c2e", marginBottom: "32px" }}>
              Faça uma pergunta sobre as soluções da Floema em fertilizantes e nutrição vegetal
            </p>

            {/* Perguntas Sugeridas */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "12px",
              maxWidth: "500px",
              marginBottom: "32px"
            }}>
              {[
                "O que é a Floema e qual seu propósito na agricultura?",
                "Quais são as principais linhas de fertilizantes da Floema?",
                "Como os fertilizantes foliares da Floema melhoram a produtividade?",
                "Quais soluções orgânicas e minerais a Floema oferece?",
                "Como entrar em contato com a equipe da Floema para assistência técnica?"
              ].map((pergunta, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuestion(pergunta);
                    setTimeout(() => {
                      const form = document.querySelector("form");
                      if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));
                    }, 100);
                  }}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#f0f7e8",
                    border: "1px solid #d4e4d4",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#2d5016",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                    fontFamily: "inherit"
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e8f5d9";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#4a7c2e";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f0f7e8";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#d4e4d4";
                  }}
                >
                  {pergunta}
                </button>
              ))}
            </div>

            {/* Features */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
              maxWidth: "600px"
            }}>
              <div style={{
                padding: "12px 16px",
                backgroundColor: "#f0f7e8",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#2d5016",
                fontWeight: "500"
              }}>
                📚 Busca em documentos
              </div>
              <div style={{
                padding: "12px 16px",
                backgroundColor: "#f0f7e8",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#2d5016",
                fontWeight: "500"
              }}>
                ⚡ Respostas rápidas
              </div>
              <div style={{
                padding: "12px 16px",
                backgroundColor: "#f0f7e8",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#2d5016",
                fontWeight: "500"
              }}>
                📍 Cita fontes
              </div>
              <div style={{
                padding: "12px 16px",
                backgroundColor: "#f0f7e8",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#2d5016",
                fontWeight: "500"
              }}>
                🤖 IA avançada
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: "900px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: "12px",
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                paddingLeft: "20px",
                paddingRight: "20px"
              }}>
                <div style={{
                  maxWidth: "600px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: msg.type === "user" ? "#4a7c2e" : "#f0f7e8",
                  color: msg.type === "user" ? "#ffffff" : "#2d5016",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word"
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginTop: "12px"
              }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "#f7f7f7",
                  color: "#000000"
                }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#999999",
                      animation: "bounce 1.4s infinite"
                    }}></div>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#999999",
                      animation: "bounce 1.4s infinite",
                      animationDelay: "0.2s"
                    }}></div>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#999999",
                      animation: "bounce 1.4s infinite",
                      animationDelay: "0.4s"
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        borderTop: "1px solid #d4e4d4",
        padding: "16px 20px",
        backgroundColor: "#ffffff"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Faça sua pergunta..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #d4e4d4",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                backgroundColor: loading ? "#f0f7e8" : "#ffffff",
                color: "#2d5016"
              }}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              style={{
                padding: "12px 24px",
                backgroundColor: loading || !question.trim() ? "#cccccc" : "#4a7c2e",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading || !question.trim() ? "not-allowed" : "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={e => {
                if (!loading && question.trim()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3d6324";
                }
              }}
              onMouseLeave={e => {
                if (!loading && question.trim()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4a7c2e";
                }
              }}
            >
              Enviar
            </button>
          </form>

          {/* Settings Textarea */}
          <div style={{ marginTop: "12px" }}>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "600",
              color: "#4a7c2e",
              marginBottom: "6px",
              textTransform: "uppercase"
            }}>
              URLs dos documentos (opcional - deixe vazio para usar padrão)
            </label>
            <textarea
              value={urls}
              onChange={e => setUrls(e.target.value)}
              placeholder="Cole URLs aqui, uma por linha"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #d4e4d4",
                borderRadius: "8px",
                fontSize: "13px",
                fontFamily: "monospace",
                minHeight: "60px",
                resize: "vertical",
                outline: "none",
                color: "#2d5016",
                backgroundColor: "#ffffff"
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        input:focus, textarea:focus {
          border-color: #4a7c2e !important;
          box-shadow: 0 0 0 3px rgba(74, 124, 46, 0.1);
        }
      `}</style>
    </div>
  );
}
