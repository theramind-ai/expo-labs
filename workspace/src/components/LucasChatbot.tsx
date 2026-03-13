"use client";

import React, { useState, useRef, useEffect } from "react";

export default function LucasChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState("");
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
        setMessages((prev) => [...prev, { type: "user", content: question }]);
        setQuestion("");

        try {
            // NOTE: We do not pass customUrls here anymore, 
            // relying entirely on the default embedded logic of the app.
            const res = await fetch("/api/rag", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question,
                    customUrls: [],
                }),
            });
            const data = await res.json();

            if (data.error) {
                setMessages((prev) => [...prev, { type: "assistant", content: `Erro: ${data.error}` }]);
            } else {
                setMessages((prev) => [...prev, { type: "assistant", content: data.answer }]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { type: "assistant", content: "Erro ao conectar ao servidor. Tente novamente." },
            ]);
        }
        setLoading(false);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#27753f",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    zIndex: 9999,
                    transition: "transform 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.backgroundColor = "#1e5e32";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "#27753f";
                }}
            >
                {isOpen ? "✕" : "🤖"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        right: "24px",
                        width: "350px",
                        height: "500px",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 9998,
                        border: "1px solid #e2e8f0",
                    }}
                >
                    {/* Main Header */}
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "#27753f",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#4ade80",
                            }}
                        />
                        Lucas - Seu Assistente CerradoHub
                    </div>

                    {/* Messages Area */}
                    <div
                        style={{
                            flex: 1,
                            padding: "16px",
                            overflowY: "auto",
                            backgroundColor: "#f8fafc",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                    >
                        {messages.length === 0 ? (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#64748b",
                                    fontSize: "14px",
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                }}
                            >
                                Olá! Sou o Lucas, o assistente virtual do CerradoHub. Como posso ajudar com nossos cursos, consultorias ou gamificação hoje?
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div
                                    key={i}
                                    style={{
                                        alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                                        backgroundColor: msg.type === "user" ? "#27753f" : "#e2e8f0",
                                        color: msg.type === "user" ? "white" : "#1e293b",
                                        padding: "10px 14px",
                                        borderRadius: "12px",
                                        borderBottomRightRadius: msg.type === "user" ? "4px" : "12px",
                                        borderBottomLeftRadius: msg.type === "assistant" ? "4px" : "12px",
                                        maxWidth: "85%",
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        wordWrap: "break-word",
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    {msg.content}
                                </div>
                            ))
                        )}
                        {loading && (
                            <div
                                style={{
                                    alignSelf: "flex-start",
                                    backgroundColor: "#e2e8f0",
                                    padding: "10px 14px",
                                    borderRadius: "12px",
                                    display: "flex",
                                    gap: "4px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: "#94a3b8",
                                        borderRadius: "50%",
                                        animation: "bounce 1.4s infinite ease-in-out both",
                                    }}
                                />
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: "#94a3b8",
                                        borderRadius: "50%",
                                        animation: "bounce 1.4s infinite ease-in-out both",
                                        animationDelay: "0.2s",
                                    }}
                                />
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: "#94a3b8",
                                        borderRadius: "50%",
                                        animation: "bounce 1.4s infinite ease-in-out both",
                                        animationDelay: "0.4s",
                                    }}
                                />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div
                        style={{
                            padding: "12px",
                            backgroundColor: "white",
                            borderTop: "1px solid #e2e8f0",
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Pergunte ao Lucas..."
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: "10px 12px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "20px",
                                    outline: "none",
                                    fontSize: "14px",
                                }}
                            />
                            <button
                                type="submit"
                                disabled={loading || !question.trim()}
                                style={{
                                    backgroundColor: loading || !question.trim() ? "#cbd5e1" : "#27753f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: loading || !question.trim() ? "not-allowed" : "pointer",
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
        </>
    );
}
