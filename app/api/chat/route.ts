import { buildSystemPrompt } from "@/lib/systemPrompt";

export const runtime = "nodejs";

const GROQ_VISION_MODEL = "qwen/qwen3.6-27b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

type ClientImage = {
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  data: string; // base64, sem o prefixo data:...
};

type ClientMessage = {
  role: "user" | "assistant";
  text: string;
  images?: ClientImage[];
};

type GroqTextPart = { type: "text"; text: string };
type GroqImagePart = { type: "image_url"; image_url: { url: string } };
type GroqContentPart = GroqTextPart | GroqImagePart;

type GroqMessage =
  | { role: "system"; content: string }
  | { role: "assistant"; content: string }
  | { role: "user"; content: string | GroqContentPart[] };

function toGroqMessages(messages: ClientMessage[]): GroqMessage[] {
  const lastIndex = messages.length - 1;

  return messages.map((m, i) => {
    if (m.role === "assistant") {
      return { role: "assistant", content: m.text };
    }

    // Imagens custam muitos tokens no modelo com visão; para não pagar esse
    // custo de novo a cada turno, só reenviamos a imagem da mensagem mais
    // recente. Turnos antigos com print viram só texto (com um aviso).
    const images = i === lastIndex ? m.images ?? [] : [];
    const hadOlderImage = i !== lastIndex && (m.images?.length ?? 0) > 0;

    if (images.length === 0) {
      const text = hadOlderImage
        ? `${m.text} [print anexado nesta mensagem, já fora do contexto atual]`.trim()
        : m.text || "(mensagem vazia)";
      return { role: "user", content: text };
    }

    const content: GroqContentPart[] = images.map((img) => ({
      type: "image_url",
      image_url: { url: `data:${img.mediaType};base64,${img.data}` },
    }));
    content.push({ type: "text", text: m.text || "(sem texto, ver imagem)" });

    return { role: "user", content };
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY não configurada no .env.local" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const messages: ClientMessage[] = body.messages ?? [];

  if (!messages.length) {
    return Response.json({ error: "Nenhuma mensagem enviada" }, { status: 400 });
  }

  // A conta free da Groq tem um limite de tokens/minuto apertado para o
  // modelo com visão, então mantemos só o histórico recente na requisição.
  const MAX_HISTORY_MESSAGES = 6;
  const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);

  // últimas mensagens do usuário guiam a busca por trechos relevantes do livro
  const retrievalQuery = recentMessages
    .filter((m) => m.role === "user")
    .map((m) => m.text)
    .join(" ");

  const groqMessages: GroqMessage[] = [
    { role: "system", content: buildSystemPrompt(retrievalQuery) },
    ...toGroqMessages(recentMessages),
  ];

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_VISION_MODEL,
        messages: groqMessages,
        max_tokens: 260,
        reasoning_effort: "none",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const message = data?.error?.message || `Erro Groq (HTTP ${res.status})`;
      return Response.json({ error: message }, { status: 500 });
    }

    const rawText: string = data?.choices?.[0]?.message?.content ?? "";
    // salvaguardas: remove bloco de raciocínio que ainda vaze via <think> e
    // qualquer caractere fora do alfabeto latino (o modelo às vezes vaza
    // caracteres de outro idioma/alfabeto — chinês, japonês, coreano, cirílico,
    // grego, árabe, hebraico, devanágari, tailandês — por bug de tokenização)
    const text = rawText
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/[一-鿿぀-ヿ가-힯Ͱ-ϿЀ-ӿ֐-׿؀-ۿऀ-ॿ฀-๿]/g, "")
      .replace(/[ \t]{2,}/g, " ")
      .trim();
    return Response.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return Response.json({ error: message }, { status: 500 });
  }
}