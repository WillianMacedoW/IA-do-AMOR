import { readFileSync } from "fs";
import path from "path";

let cachedChunks: string[] | null = null;

/** Divide a base de conhecimento (texto integral do livro) em blocos por página/capítulo. */
function loadChunks(): string[] {
  if (cachedChunks) return cachedChunks;
  const filePath = path.join(process.cwd(), "data", "knowledge.md");
  const raw = readFileSync(filePath, "utf-8");
  cachedChunks = raw
    .split(/\n{2,}/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
  return cachedChunks;
}

// Trechos de fundamentação teórica que ficam sempre presentes, pois qualquer
// diagnóstico depende deles (tese central + os 4 desejos ocultos).
const CORE_MARKERS = [
  "atração não é uma escolha",
  "desejo oculto",
  "desejos ocultos",
  "cortina de fumaça",
  "núcleo accumbens",
];

const STOPWORDS = new Set([
  "que", "com", "uma", "para", "como", "mais", "isso", "ela", "ele", "voce",
  "seu", "sua", "dos", "das", "por", "mas", "tem", "era", "foi", "ser", "esta",
  "de", "da", "do", "em", "um", "uns", "umas", "na", "no", "se", "ao", "aos",
  "the", "and", "you", "she", "her", "him", "his",
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Seleciona, a partir do texto integral do livro (nunca resumido), os trechos
 * originais mais relevantes para a pergunta atual, dentro de um orçamento de
 * tokens. Sempre inclui o núcleo teórico (tese central + desejos ocultos).
 */
export function retrieveRelevantKnowledge(
  query: string,
  tokenBudget = 1900
): string {
  const chunks = loadChunks();
  const included = new Set<number>();
  const orderedSelected: { idx: number; chunk: string }[] = [];
  let used = 0;

  const tryAdd = (idx: number) => {
    if (included.has(idx)) return;
    const cost = estimateTokens(chunks[idx]);
    if (used + cost > tokenBudget) return;
    included.add(idx);
    orderedSelected.push({ idx, chunk: chunks[idx] });
    used += cost;
  };

  // 1. núcleo teórico sempre presente
  chunks.forEach((chunk, idx) => {
    const lower = normalize(chunk);
    if (CORE_MARKERS.some((m) => lower.includes(normalize(m)))) tryAdd(idx);
  });

  // 2. trechos relevantes para a pergunta específica, por relevância léxica
  const queryTerms = tokenize(query);
  const scored = chunks
    .map((chunk, idx) => {
      if (included.has(idx)) return { idx, score: -1 };
      const chunkTerms = new Set(tokenize(chunk));
      let score = 0;
      for (const t of queryTerms) if (chunkTerms.has(t)) score += 1;
      return { idx, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const s of scored) {
    if (used >= tokenBudget) break;
    tryAdd(s.idx);
  }

  orderedSelected.sort((a, b) => a.idx - b.idx);
  return orderedSelected.map((s) => s.chunk).join("\n\n");
}
