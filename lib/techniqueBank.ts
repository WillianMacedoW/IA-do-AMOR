// Dados estruturados do banco de perguntas e técnicas complementares.
// Ver retrieveExtras() em techniqueBank.ts para a lógica de busca (mesmo padrão de lib/knowledge.ts).

export type Question = { n: number; text: string; tag: string };
export type Technique = { name: string; always: boolean; keywords: string[]; text: string };

export const QUESTION_BANK_INTRO =
  'Banco de perguntas/assuntos pra puxar conversa (recurso complementar, NÃO é texto do livro), cada um marcado com o(s) desejo(s) oculto(s) que ativa (S=Segurança, C=Conexão, D=Desejo sexual, Cu=Curiosidade). Escolha a que combina com o desejo diagnosticado como fraco, adapte a redação ao tom da conversa (nunca cole genérico). Nunca apresente como "do livro". Nunca sugira pergunta de tag D "alta tensão" logo no início da conversa. Este banco é uso interno: nunca mencione "tópico X" ou "banco de perguntas" na resposta ao usuário — incorpore a pergunta escolhida direto na mensagem final, como se fosse ideia sua na hora.';

export const QUESTIONS: Question[] = [
  { n: 1, text: "O que seu nome significa?", tag: "Cu" },
  { n: 2, text: "O que você faz no seu tempo livre?", tag: "C" },
  { n: 3, text: "Quais são seus hobbies?", tag: "C" },
  { n: 4, text: "Que série assistiria o dia todo?", tag: "C" },
  { n: 5, text: "Hábito mais bizarro?", tag: "Cu" },
  { n: 6, text: "Melhor conselho dos pais?", tag: "S/C" },
  { n: 7, text: "O que te faz apaixonar à primeira vista?", tag: "D" },
  { n: 8, text: "Como alguém como você ainda é solteiro(a)?", tag: "D" },
  { n: 9, text: "Festa ou ficar em casa?", tag: "C" },
  { n: 10, text: "O que mais ama em um garoto/garota?", tag: "D" },
  { n: 11, text: "Ganhando na loteria, primeira coisa que faria?", tag: "C" },
  { n: 12, text: "Praia ou montanha?", tag: "C" },
  { n: 13, text: "Acredita em destino?", tag: "Cu/C" },
  { n: 14, text: "Tem alguma superstição?", tag: "Cu" },
  { n: 15, text: "Maior medo?", tag: "S" },
  { n: 16, text: "Coisa mais estranha da família?", tag: "Cu" },
  { n: 17, text: "Se soubesse que ia morrer em dias, qual seria sua resposta?", tag: "Cu/S" },
  { n: 18, text: "Como imagina um relacionamento perfeito?", tag: "S" },
  { n: 19, text: "Se pudesse morar em outra cidade, onde seria?", tag: "Cu" },
  { n: 20, text: "Rico ou famoso?", tag: "Cu" },
  { n: 21, text: "Como você vê a vida?", tag: "C" },
  { n: 22, text: "Sonhos e objetivos?", tag: "S" },
  { n: 23, text: "Com que idade pretende casar?", tag: "S" },
  { n: 24, text: "Já gostou de alguém do mesmo sexo?", tag: "Cu/D (delicado, só com rapport alto)" },
  { n: 25, text: "Opinião sobre relacionamento aberto?", tag: "S/Cu" },
  { n: 26, text: "Tem alguma ambição?", tag: "S" },
  { n: 27, text: "O que achou de mim quando me viu 1ª vez?", tag: "D" },
  { n: 28, text: "Fantasia sexual não realizada?", tag: "D (alta tensão, só rapport avançado)" },
  { n: 29, text: "Algo que mudaria em si e por quê?", tag: "C" },
  { n: 30, text: "Coisa mais maluca que já fez?", tag: "Cu" },
  { n: 31, text: "Como se descreveria em poucas palavras?", tag: "C" },
  { n: 32, text: "Tem planos pro futuro?", tag: "S" },
  { n: 33, text: "Numa ilha deserta, com qual atriz/ator ficaria?", tag: "D" },
  { n: 34, text: "Que personagem fictício eu pareço?", tag: "Cu/D" },
  { n: 35, text: "Se nascesse animal, o que seria?", tag: "Cu" },
  { n: 36, text: "Ambição engraçada quando criança?", tag: "C" },
  { n: 37, text: "Já recebeu elogio marcante?", tag: "D" },
  { n: 38, text: "Já teve amor impossível?", tag: "C/S" },
  { n: 39, text: "Já ensinou alguém a beijar?", tag: "D" },
  { n: 40, text: "Prefere conquistar ou ser conquistado(a)?", tag: "D" },
  { n: 41, text: "Amaria a ponto de dar a vida?", tag: "C" },
  { n: 42, text: "Lugar favorito pra estar com o parceiro?", tag: "D/C" },
  { n: 43, text: "Só de dia ou só de noite, o que escolheria?", tag: "Cu" },
  { n: 44, text: "Se ela morasse longe, você iria com ela ou desistiria?", tag: "S" },
  { n: 45, text: "Já sonhou com seu maior sonho realizado?", tag: "S" },
  { n: 46, text: "O que mais gosta na vida?", tag: "C" },
  { n: 47, text: "Que fobia tem?", tag: "S/Cu" },
  { n: 48, text: "Filme favorito, por quê?", tag: "C" },
  { n: 49, text: "Música favorita, por quê?", tag: "C" },
  { n: 50, text: "Frase de filme que te marcou?", tag: "C" },
  { n: 51, text: "Melhor lugar de férias?", tag: "C" },
  { n: 52, text: "Última vez que chorou de rir com alguém?", tag: "C" },
  { n: 53, text: "O que mais gostaria de ter na vida?", tag: "S" },
  { n: 54, text: "Sente medo quando começa a amar?", tag: "S" },
  { n: 55, text: "Topa perder batalhas pra manter a paz?", tag: "S" },
  { n: 56, text: "Último livro que leu?", tag: "C" },
  { n: 57, text: "Num dia de folga, praia ou campo?", tag: "C" },
  { n: 58, text: "Três maiores pontos fracos?", tag: "C" },
  { n: 59, text: "O que sempre ganha no aniversário?", tag: "C" },
  { n: 60, text: "Pior relacionamento que já teve?", tag: "S" },
  { n: 61, text: "Conte sobre relacionamentos passados?", tag: "S" },
  { n: 62, text: "O que aprendeu com o último relacionamento?", tag: "S" },
  { n: 63, text: "Quem realmente te conhece de verdade?", tag: "C" },
  { n: 64, text: "Se dá melhor com mãe ou pai?", tag: "C" },
  { n: 65, text: "Pior música que já ouviu?", tag: "Cu" },
  { n: 66, text: "Melhor música que já ouviu?", tag: "C" },
  { n: 67, text: "O que nunca contou pra ninguém?", tag: "Cu/C (rapport médio+)" },
  { n: 68, text: "O que queria ser quando crescer, ainda quer?", tag: "S" },
  { n: 69, text: "O que dizem sobre você?", tag: "Cu" },
  { n: 70, text: "O que gosta de fazer nos finais de semana?", tag: "C" },
  { n: 71, text: "Assunto que mais ama, por quê?", tag: "C" },
  { n: 72, text: "Melhor conselho que já recebeu?", tag: "S" },
  { n: 73, text: "Principais prioridades hoje?", tag: "S" },
  { n: 74, text: "O que gostaria de me dizer agora?", tag: "D/Cu (alta tensão)" },
  { n: 75, text: "Melhor coisa que alguém poderia dizer de você?", tag: "C" },
  { n: 76, text: "Se soubesse que ia morrer em uma semana, o que faria?", tag: "Cu" },
  { n: 77, text: "Acredita que o amor dura \"pra sempre\"?", tag: "S" },
  { n: 78, text: "O que fez nesse final de semana?", tag: "C" },
  { n: 79, text: "O que gosta de fazer depois do trabalho?", tag: "C" },
  { n: 80, text: "Algo te fez mudar?", tag: "C/S" },
  { n: 81, text: "Momento mais embaraçoso?", tag: "Cu" },
  { n: 82, text: "Lugar mais lindo que já esteve?", tag: "C" },
  { n: 83, text: "Ideia de encontro mais maluca?", tag: "Cu/D" },
  { n: 84, text: "Como definiria amor verdadeiro?", tag: "S" },
  { n: 85, text: "Gosta de conversa profunda?", tag: "C" },
  { n: 86, text: "Quem deveria dar o primeiro passo?", tag: "D/Cu" },
  { n: 87, text: "Está atraído(a) por mim como amigo ou algo mais?", tag: "D (alta tensão, só perto do fechamento)" },
  { n: 88, text: "O que mais te atrai no sexo oposto?", tag: "D" },
  { n: 89, text: "Lugar favorito pra ser beijado(a)?", tag: "D" },
  { n: 90, text: "Prefere ser chamado(a) de sexy ou de inteligente?", tag: "D/C" },
  { n: 91, text: "Maiores qualidades?", tag: "C" },
  { n: 92, text: "Mais tímido(a) ou extrovertido(a)?", tag: "C" },
  { n: 93, text: "Está procurando namorado(a)?", tag: "S/D (usar com cautela, cedo demais soa carente)" },
  { n: 94, text: "Que tal sairmos algum dia?", tag: "D (só com tensão já construída)" },
  { n: 95, text: "Melhor encontro romântico que já teve?", tag: "C/D" },
  { n: 96, text: "O que você pensa de mim?", tag: "Cu/D (alta tensão)" },
  { n: 97, text: "Prefere abraçar 5s ou beijar 1s?", tag: "D (alta tensão)" },
  { n: 98, text: "Mudaria algo em si mesmo?", tag: "C" },
  { n: 99, text: "Acha que não tem problema guardar segredo?", tag: "Cu/S" }
];

export const TECHNIQUES: Technique[] = [
  { name: "Esperança + Incerteza (filtro obrigatório pra toda recomendação)", always: true, keywords: [], text: "**Esperança + Incerteza (filtro obrigatório pra toda recomendação)**: obsessão só ocorre quando os dois sentimentos coexistem no cérebro dela ao mesmo tempo — Esperança (de que algo bom pode acontecer com você) e Incerteza (de que não é garantido). Antes de fechar qualquer recomendação ou mensagem, cheque: ela elimina a esperança (rejeição fria, indiferença total, fechar a porta) ou elimina a incerteza (disponibilidade total, previsibilidade, entregar tudo de uma vez)? Se sim, ajuste — o alvo é sempre manter as duas presentes ao mesmo tempo. Não cite \"esperança e incerteza\" como termo técnico pro usuário na resposta; use isso só como critério interno de checagem." },
  { name: "Quem fala menos domina a conversa", always: true, keywords: [], text: "**Quem fala menos domina a conversa**: princípio geral — evite se explicar demais, contar tudo sobre si de uma vez ou preencher silêncio com informação sobre você. Falar menos que ela mantém o mistério e obriga ela a se abrir mais pra \"decifrar\" você, o que reforça Curiosidade. Vale como lente pra qualquer recomendação: se a sugestão for \"conte X sobre você\", prefira uma versão mais curta/enxuta." },
  { name: "Checklist do Homem Dominante", always: false, keywords: ["ansioso","ansiedade","medo de perder","carente","dependente","celular","inseguro","insegura","desesperado","necessitado","checando","olhando o tempo todo"], text: "**Checklist do Homem Dominante** (10 traços, complementa o Cap. 8 do livro): 1) focado nas próprias metas; 2) não liga de perder ela — não demonstra ansiedade/dependência do resultado; 3) tem opiniões próprias, discorda quando necessário; 4) tem hobbies e vida própria fora dela; 5) tem seu próprio ciclo social/rotina, não gira em torno da agenda dela; 6) sabe falar não; 7) tem limites claros; 8) aceita a possibilidade real dela ir embora, sem tentar prender à força; 9) se respeita — não se anula nem se diminui pra agradar; 10) não aceita qualquer coisa (desrespeito, deixar no vácuo repetidamente, ser tratado como opção) sem se posicionar. Use como diagnóstico do comportamento DELE (não só da mensagem pra ela): se o relato do usuário mostrar ansiedade, dependência emocional do resultado, dificuldade de dizer não, ou tolerância a desrespeito, identifique qual desses 10 pontos está sendo violado e oriente a correção nisso antes ou junto da mensagem sugerida." },
  { name: "Lei da Reciprocidade", always: false, keywords: ["sumiu","sumir","distanciou","afastou","nao responde","não responde","esfriou","esfriando","reciprocidade","esforço","some","sumido","vacuo","vácuo"], text: "**Lei da Reciprocidade**: espelhe o nível de esforço dela, nunca dê mais atenção do que quem não está fazendo o mesmo por você. Regras práticas: 1) se ela distanciou 1x, você distancia proporcionalmente mais (não igual — mais); 2) se ela não faz questão de você (não puxa assunto, não demonstra interesse em te ver/falar), você também não faz questão dela; 3) se ela não para de fazer algo que incomoda (ex: sumir, deixar no vácuo, cancelar plano), você também não interrompe sua própria rotina/vida por causa disso — não persegue, não cobra, não muda seu comportamento pra compensar o dela. Use isso pra diagnosticar quando o usuário está investindo desproporcionalmente mais que ela, e oriente a reduzir o esforço dele até igualar (ou superar levemente) o dela." },
  { name: "Gerar emoção > tratar bem", always: false, keywords: ["elogiar","elogio","tratar bem","ser legal","gentil","simpatico","simpático","agradar","princesa","porta do carro","presente"], text: "**Gerar emoção > tratar bem**: comportamentos de \"tratar bem\" sozinhos (elogiar, elogiar o corpo/jeito, abrir porta do carro, tratar como princesa, comentar em todo story, falar o que ela quer ouvir, dizer que ela é única) não geram obsessão — são o padrão \"bonzinho\" do Cap. 8, ela esquece porque não ativa emoção forte, só validação morna. O que fixa você na memória dela é gerar emoção — e emoção não precisa ser positiva pra funcionar: alegria, tristeza, raiva, medo, surpresa todas geram lembrança e vínculo, o cérebro não filtra \"boa\" ou \"ruim\", só registra intensidade. Isso NÃO é licença pra ser cruel, insultar ou magoar de verdade — o guardrail ético continua valendo. A \"emoção\" aqui vem de tensão, imprevisibilidade, humor provocador, quebra de padrão e mistério (ex: ela ficar levemente incerta ou \"irritada\" com uma provocação leve/brincalhona) — nunca de humilhação real ou maldade genuína. Use este princípio pra evitar recomendar excesso de elogio/agrado como solução, mas sempre dentro do guardrail ético." },
  { name: "Convite à prova de erros", always: false, keywords: ["convidar","chamar pra sair","encontro","marcar","marcar um encontro","rejeicao","rejeição","medo de recusar","sair com ela","convite"], text: "**Convite à prova de erros**: técnica de convite hipotético, pra reduzir o risco de rejeição direta. Passo 1 — colete informação sobre o que ela gosta de fazer (pergunta casual). Passo 2 — transforme isso num convite formulado como hipótese, não como pedido real, com uma cena concreta de 2 elementos. Exemplo de estrutura: \"como seria ir numa cachoeira, fazer uma carne e dar um mergulho, como seria isso pra você?\". Por vir como \"como seria\" (hipotético) em vez de \"vamos\" (convite real), se ela reagir mal ou disser que não curte, ele não perde a pose — nunca chegou a convidar de fato, só testou o terreno. Se ela reagir bem, aí sim parte pro convite real." }
];

const STOPWORDS = new Set([
  "que", "com", "uma", "para", "como", "mais", "isso", "ela", "ele", "voce",
  "seu", "sua", "dos", "das", "por", "mas", "tem", "era", "foi", "ser", "esta",
  "de", "da", "do", "em", "um", "uns", "umas", "na", "no", "se", "ao", "aos",
  "eu", "meu", "minha", "the", "and", "you", "she", "her", "him", "his",
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
 * Busca léxica sobre o banco de perguntas/técnicas, no mesmo espírito de
 * retrieveRelevantKnowledge (lib/knowledge.ts): inclui sempre os itens
 * baratos e universais, e escolhe o resto por relevância à pergunta atual,
 * dentro de um orçamento de tokens — em vez de mandar tudo sempre.
 */
export function retrieveExtras(
  query: string,
  techniqueBudget = 700,
  questionBudget = 700
): string {
  const queryTerms = new Set(tokenize(query));

  // técnicas: sempre inclui as universais + as que baterem por keyword
  const techParts: string[] = [];
  let techUsed = 0;
  TECHNIQUES.filter((t) => t.always).forEach((t) => {
    techParts.push(t.text);
    techUsed += estimateTokens(t.text);
  });
  const scoredTech = TECHNIQUES.filter((t) => !t.always)
    .map((t) => {
      const kws = t.keywords.map((k) => normalize(k));
      const hay = normalize(query);
      const score = kws.filter((k) => hay.includes(k)).length;
      return { t, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  for (const s of scoredTech) {
    const cost = estimateTokens(s.t.text);
    if (techUsed + cost > techniqueBudget) continue;
    techParts.push(s.t.text);
    techUsed += cost;
  }

  // perguntas: pontua por overlap léxico com a query; se nada bater bem,
  // cai num conjunto fixo balanceado (algumas de cada desejo) como fallback
  const scoredQ = QUESTIONS.map((q) => {
    const qTerms = tokenize(q.text + " " + q.tag);
    let score = 0;
    for (const t of queryTerms) if (qTerms.includes(t)) score += 1;
    return { q, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const FALLBACK_NUMS = new Set([2, 15, 22, 44, 68, 82, 8, 27, 89, 94, 1, 30, 69, 96]);
  const qPool = scoredQ.length > 0 ? scoredQ.map((s) => s.q) : QUESTIONS.filter((q) => FALLBACK_NUMS.has(q.n));

  const qParts: string[] = [];
  let qUsed = 0;
  for (const q of qPool) {
    const line = `${q.n}. ${q.text} — ${q.tag}`;
    const cost = estimateTokens(line);
    if (qUsed + cost > questionBudget) break;
    qParts.push(line);
    qUsed += cost;
  }

  return [
    "## Banco de perguntas e técnicas complementares (recurso à parte — não é texto do livro)",
    QUESTION_BANK_INTRO,
    qParts.join(" | "),
    ...techParts,
  ].join("\n\n");
}
