import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = "C:/Users/Willian Macedo/Downloads/Guia_Instinto_Primitivo.txt";
const OUT_DIR = path.join(__dirname, "..", "data");
const OUT = path.join(OUT_DIR, "knowledge.md");

const raw = readFileSync(SRC, "utf-8");
const lines = raw.split(/\r?\n/);

const pageBreakRe = /^Página\s+\d+\s+de\s+\d+$/i;
const dividerRe = /^=+$/;
const chapterRe = /^Cap[ií]tulo\s*#?\s*\d+/i;

const pages = [];
let currentWords = [];

const flush = () => {
  if (currentWords.length) {
    let text = currentWords.join(" ");
    text = text.replace(/\s+/g, " ").trim();
    // fix spacing around punctuation glued by line joins
    text = text.replace(/\s+([.,;:!?”"])/g, "$1");
    if (text) pages.push(text);
    currentWords = [];
  }
};

for (const rawLine of lines) {
  const line = rawLine.replace(/^\s*\d+\t/, "").trim();
  if (line === "" || dividerRe.test(line)) continue;
  if (pageBreakRe.test(line)) {
    flush();
    continue;
  }
  if (chapterRe.test(line)) {
    flush();
    pages.push(`\n## ${line}\n`);
    continue;
  }
  currentWords.push(line);
}
flush();

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, pages.join("\n\n") + "\n", "utf-8");

console.log(`Gerado ${OUT} com ${pages.length} blocos de página/capítulo.`);