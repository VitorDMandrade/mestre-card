import { ACERVO_CATALOG } from '../data/acervo-catalog';
import type { AcervoItem } from '../data/acervo-catalog';
import type { MestreCardData } from '../types/mestre-card';

export interface MatchedAcervoResult {
  item: AcervoItem;
  score: number;
  matchReason: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Vincula automaticamente qualquer MestreCard aos materiais mais relevantes do acervo de 587 PDFs
 */
export function matchAcervoToCard(card: Partial<MestreCardData> | any, limit = 6): MatchedAcervoResult[] {
  if (!card) return [];

  // Coleta abrangente de tokens do card
  const theoryWords = (card.sec02_theory?.blocks || [])
    .map((b: any) => `${b.title} ${b.content.slice(0, 100)}`)
    .join(' ');

  const rawTokens = [
    card.topic || '',
    card.title || '',
    ...(card.sec01_header?.thematicAxes || []),
    ...(card.sec04_radar?.triggerWords?.map((tw: any) => tw.trigger) || []),
    theoryWords
  ].join(' ');

  const normTokens = normalize(rawTokens)
    .split(/[\s,/:;.\-—()\[\]{}"]+/)
    .filter((t) => t.length >= 4);

  // Removendo stopwords comuns
  const stopwords = new Set(['sobre', 'entre', 'quais', 'desta', 'deste', 'quando', 'como', 'para', 'pela', 'pelo', 'onde', 'qual', 'cada', 'mais', 'menos', 'seja', 'forma', 'estudo']);
  const meaningfulTokens = Array.from(new Set(normTokens.filter(t => !stopwords.has(t))));

  const results: MatchedAcervoResult[] = [];

  for (const item of ACERVO_CATALOG) {
    let score = 0;
    const reasons: string[] = [];

    const normFilename = normalize(item.filename);
    const normTitle = normalize(item.title);

    // 1. Correspondência direta em tópicos anotados (+45 pts)
    for (const topic of item.topics) {
      const normTopic = normalize(topic);
      if (meaningfulTokens.some((t) => normTopic.includes(t) || t.includes(normTopic))) {
        score += 45;
        reasons.push(`Tópico [${topic}]`);
        break;
      }
    }

    // 2. Correspondência no nome do arquivo e título (+15 pts por termo)
    let tokenMatches = 0;
    for (const token of meaningfulTokens) {
      if (normFilename.includes(token) || normTitle.includes(token)) {
        score += 15;
        tokenMatches++;
        if (tokenMatches >= 3) break;
      }
    }

    if (tokenMatches > 0) {
      reasons.push(`${tokenMatches} termo(s) chave`);
    }

    // 3. Correspondência de Disciplina (+20 pts)
    const cardDiscGuess = normalize(card.topic || '' + ' ' + card.title || '');
    if (cardDiscGuess.includes(item.discipline)) {
      score += 20;
    }

    // 4. Bônus para Bancas de Elite (+25 pts se for Einstein, ENEM ou UNESP)
    if (item.banca === 'Albert Einstein') {
      score += 25;
      if (reasons.length < 2) reasons.push('Banca Einstein Medicina');
    } else if (item.banca === 'UNESP' || item.banca === 'ENEM') {
      score += 20;
      if (reasons.length < 2) reasons.push(`Banca Oficial ${item.banca}`);
    }

    // 5. Bônus de Categoria com alto valor didático (+30 pts para caderno temático ou gabarito comentado)
    if (item.category === 'caderno_exercicios') {
      score += 30;
      if (reasons.length < 2) reasons.push('Caderno Temático');
    } else if (item.category === 'gabarito_comentado') {
      score += 25;
      if (reasons.length < 2) reasons.push('Gabarito Comentado');
    }

    if (score >= 45) {
      results.push({
        item,
        score,
        matchReason: reasons.slice(0, 2).join(' • ') || 'Relevância Temática'
      });
    }
  }

  // Ordena por maior pontuação e trunca no limite solicitado
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Busca flexível e instantânea para a Biblioteca Global do Acervo
 */
export function searchAcervo(
  query = '',
  filterBanca = 'todas',
  filterDiscipline = 'todas',
  filterCategory = 'todas'
): AcervoItem[] {
  const normQuery = normalize(query);
  const queryTokens = normQuery ? normQuery.split(/\s+/).filter(t => t.length > 1) : [];

  return ACERVO_CATALOG.filter((item) => {
    // Filtro por Banca
    if (filterBanca !== 'todas' && item.banca !== filterBanca) {
      return false;
    }

    // Filtro por Disciplina
    if (filterDiscipline !== 'todas' && item.discipline !== filterDiscipline) {
      return false;
    }

    // Filtro por Categoria
    if (filterCategory !== 'todas' && item.category !== filterCategory) {
      return false;
    }

    // Sem query de texto, passa tudo que satisfez os filtros
    if (queryTokens.length === 0) return true;

    const searchableText = normalize(`${item.title} ${item.filename} ${item.banca} ${item.discipline} ${item.topics.join(' ')} ${item.year || ''}`);
    return queryTokens.every(token => searchableText.includes(token));
  });
}

/**
 * Retorna as estatísticas agregadas do acervo
 */
export function getAcervoStats() {
  const totalFiles = ACERVO_CATALOG.length;
  const bancas = new Set(ACERVO_CATALOG.map(i => i.banca).filter(b => b !== 'Outras'));
  const cadernosExercicios = ACERVO_CATALOG.filter(i => i.category === 'caderno_exercicios').length;
  const gabaritos = ACERVO_CATALOG.filter(i => i.category === 'gabarito_comentado').length;
  const provasOficiais = ACERVO_CATALOG.filter(i => i.category === 'prova_oficial').length;

  return {
    totalFiles,
    totalBancas: bancas.size,
    cadernosExercicios,
    gabaritos,
    provasOficiais
  };
}

/**
 * Retorna a contagem de itens por banca no catálogo
 */
export function getAcervoBancaCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of ACERVO_CATALOG) {
    const key = item.banca || 'Outras';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

/**
 * Retorna as provas e gabaritos de uma banca específica, com ordenação por relevância temática se fornecido tópico
 */
export function getAcervoForBanca(bancaName: string, topic?: string, limit = 24): AcervoItem[] {
  if (!bancaName || bancaName === 'todas' || bancaName === 'standard') {
    if (topic) {
      return matchAcervoToCard({ topic }, limit).map(r => r.item);
    }
    return ACERVO_CATALOG.slice(0, limit);
  }

  const normBanca = normalize(bancaName);
  let filtered = ACERVO_CATALOG.filter(item => {
    const normItemBanca = normalize(item.banca || '');
    return normItemBanca.includes(normBanca) || normBanca.includes(normItemBanca);
  });

  if (filtered.length === 0) {
    // Se for 'cadernos', busca por caderno_exercicios
    if (normBanca.includes('caderno') || normBanca.includes('poliedro') || normBanca.includes('ferretto')) {
      filtered = ACERVO_CATALOG.filter(item => item.category === 'caderno_exercicios');
    } else {
      filtered = ACERVO_CATALOG.slice(0, limit);
    }
  }

  if (topic) {
    const normTopic = normalize(topic);
    const tokens = normTopic.split(/\s+/).filter(t => t.length > 2);
    filtered.sort((a, b) => {
      const aTitle = normalize(a.title + ' ' + a.topics.join(' '));
      const bTitle = normalize(b.title + ' ' + b.topics.join(' '));
      const aMatches = tokens.filter(t => aTitle.includes(t)).length;
      const bMatches = tokens.filter(t => bTitle.includes(t)).length;
      return bMatches - aMatches;
    });
  }

  return filtered.slice(0, limit);
}
