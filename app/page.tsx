"use client";

import { useRef, useState } from "react";

type MediaType = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

type Attachment = {
  mediaType: MediaType;
  data: string; // base64 sem prefixo
  previewUrl: string; // data URL completa, só para exibir
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  images?: Attachment[];
};

function fileToAttachment(file: File): Promise<Attachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [, base64] = result.split(",");
      resolve({
        mediaType: (file.type || "image/png") as MediaType,
        data: base64,
        previewUrl: result,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pendingImages, setPendingImages] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const attachments = await Promise.all(
      Array.from(files).map((f) => fileToAttachment(f))
    );
    setPendingImages((prev) => [...prev, ...attachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePendingImage(index: number) {
    setPendingImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function sendMessage() {
    if (!input.trim() && pendingImages.length === 0) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: input.trim(),
      images: pendingImages,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setPendingImages([]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            text: m.text,
            images: m.images?.map(({ mediaType, data }) => ({
              mediaType,
              data,
            })),
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao chamar a IA");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.text as string },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto w-full">
      <header className="border-b border-black/10 dark:border-white/10 px-4 py-3">
        <h1 className="text-lg font-semibold">Instinto Primitivo AI</h1>
        <p className="text-sm opacity-60">
          Protótipo pessoal — respostas baseadas no método de Mari Vabo.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.length === 0 && (
          <p className="opacity-50 text-sm">
            Descreva a situação (ou mande um print da conversa) e a IA vai
            dizer qual desejo oculto está em jogo e o que fazer.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[85%] whitespace-pre-wrap text-sm ${
                m.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-black/5 dark:bg-white/10"
              }`}
            >
              {m.text}
            </div>
            {m.images && m.images.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-end">
                {m.images.map((img, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={j}
                    src={img.previewUrl}
                    alt="print enviado"
                    className="h-24 rounded-lg border border-black/10 dark:border-white/10 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && <div className="text-sm opacity-50">Analisando...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </main>

      <footer className="border-t border-black/10 dark:border-white/10 p-3 flex flex-col gap-2">
        {pendingImages.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {pendingImages.map((img, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt="print pendente"
                  className="h-16 rounded-lg border border-black/10 dark:border-white/10 object-cover"
                />
                <button
                  onClick={() => removePendingImage(i)}
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs leading-none"
                  aria-label="Remover imagem"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 h-10 w-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-lg"
            aria-label="Anexar print"
            type="button"
          >
            📎
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Descreva a situação ou cole um print..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-black/10 dark:border-white/10 bg-transparent px-4 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="shrink-0 h-10 px-4 rounded-full bg-foreground text-background text-sm font-medium disabled:opacity-40"
            type="button"
          >
            Enviar
          </button>
        </div>
      </footer>
    </div>
  );
}