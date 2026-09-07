import type { MestreCardData } from '../types/mestre-card';

export interface DecoderSlot {
  id: string;
  token: string;       // ex: "{{SLOT_0}}"
  correctWord: string; // Termo limpo
  isMath: boolean;     // Se é fórmula matemática KaTeX (ex: $...$)
  options: string[];   // Termo correto + 2 a 3 distratores embaralhados
  isDecrypted: boolean;
}

export interface DecodedBlock {
  originalText: string;
  templateText: string;
  slots: DecoderSlot[];
}

export const GLYPH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getRandomGlyph(): string {
  return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
}

/**
 * Recruta distratores contextuais e inteligentes a partir de todo o card
 */
export function extractDistractorPool(card: MestreCardData, currentBlockNumber?: number): string[] {
  const pool: string[] = [];

  // 1. Trigger Words da Seção 04
  if (card.sec04_radar?.triggerWords) {
    card.sec04_radar.triggerWords.forEach(tw => {
      if (tw.trigger && tw.trigger.length >= 3 && tw.trigger.length <= 45) {
        pool.push(tw.trigger.replace(/[*_~`]/g, '').trim());
      }
      if (tw.trap && tw.trap.length >= 3 && tw.trap.length <= 45) {
        pool.push(tw.trap.replace(/[*_~`]/g, '').trim());
      }
    });
  }

  // 2. Pontos Cegos / Distratores de Banca
  if (card.sec04_radar?.blindSpots) {
    card.sec04_radar.blindSpots.forEach(bs => {
      if (bs.title && bs.title.length >= 3 && bs.title.length <= 45) {
        pool.push(bs.title.replace(/[*_~`]/g, '').trim());
      }
    });
  }

  // 3. Highlights e conceitos de outros blocos teóricos
  if (card.sec02_theory?.blocks) {
    card.sec02_theory.blocks.forEach(b => {
      if (b.number !== currentBlockNumber) {
        if (b.title) pool.push(b.title.trim());
        if (b.highlight) {
          b.highlight.split(/\s*\/\/\s*|\s*\/\s*/).forEach(h => {
            const clean = h.replace(/[*_~`]/g, '').trim();
            if (clean && clean.length >= 3 && clean.length <= 45) pool.push(clean);
          });
        }
      }
    });
  }

  // 4. Eixos Temáticos
  if (card.sec01_header?.thematicAxes) {
    card.sec01_header.thematicAxes.forEach(ax => {
      if (ax && ax.length >= 3 && ax.length <= 35) pool.push(ax.trim());
    });
  }

  // Filtra duplicatas, stopwords e termos nulos
  return Array.from(new Set(pool.filter(p => p && p.length >= 3)));
}

/**
 * Parser de blocos teóricos para o Protocolo Decoder.
 * Identifica termos em **negrito**, protege KaTeX contra descramble destrutivo,
 * e gera slots com distratores de alta relevância contextual.
 */
export function parseBlockForDecoder(text: string, poolDistractors: string[] = []): DecodedBlock {
  if (!text) {
    return { originalText: '', templateText: '', slots: [] };
  }

  const slots: DecoderSlot[] = [];
  let slotIndex = 0;

  // 1. Tenta identificar tags explícitas **termo**
  const regex = /\*\*(.*?)\*\*/g;
  const matches = Array.from(text.matchAll(regex));

  if (matches.length > 0) {
    const templateText = text.replace(regex, (_match, captured) => {
      const rawTerm = (captured || '').trim();
      if (rawTerm.length < 2) return _match;

      const isMath = rawTerm.includes('$');
      const cleanWord = rawTerm;
      const slotId = `slot-${slotIndex}`;
      const token = `{{SLOT_${slotIndex}}}`;

      // Seleciona 2 a 3 distratores inteligentes que não sejam idênticos à palavra correta
      const availableDistractors = poolDistractors.filter(d => 
        d.toLowerCase() !== cleanWord.toLowerCase() && 
        !cleanWord.toLowerCase().includes(d.toLowerCase()) &&
        !d.toLowerCase().includes(cleanWord.toLowerCase())
      );

      // Embaralhamento determinístico de distratores baseado no slotIndex
      const shuffledPool = [...availableDistractors].sort((a, b) => {
        const hashA = (a.charCodeAt(0) * 31 + slotIndex * 7) % 100;
        const hashB = (b.charCodeAt(0) * 31 + slotIndex * 7) % 100;
        return hashA - hashB;
      });

      const selectedDistractors = shuffledPool.slice(0, 3);

      // Se tiver poucos distratores disponíveis no pool, complementa com alternativas genéricas elegantes
      const fallbacks = ['Premissa Canônica', 'Distrator TRI', 'Correlação Direta', 'Fundamento Analítico'];
      while (selectedDistractors.length < 2) {
        const fb = fallbacks[selectedDistractors.length % fallbacks.length];
        if (!selectedDistractors.includes(fb) && fb !== cleanWord) {
          selectedDistractors.push(fb);
        }
      }

      // Embaralha as opções incluindo o termo correto
      const allOptions = [cleanWord, ...selectedDistractors].sort((a, b) => {
        const valA = (a.length * 13 + slotIndex * 17) % 97;
        const valB = (b.length * 13 + slotIndex * 17) % 97;
        return valA - valB;
      });

      slots.push({
        id: slotId,
        token,
        correctWord: cleanWord,
        isMath,
        options: allOptions,
        isDecrypted: false
      });

      slotIndex++;
      return token;
    });

    return {
      originalText: text,
      templateText,
      slots
    };
  }

  // 2. FALLBACK INTELIGENTE (se o bloco não tiver tags **...** explícitas):
  // Procura termos do pool de distratores ou palavras conceituais-chave no texto
  const matchedFromPool: string[] = [];
  const sortedPool = [...poolDistractors].sort((a, b) => b.length - a.length);
  for (const term of sortedPool) {
    if (term.length >= 4 && text.toLowerCase().includes(term.toLowerCase())) {
      // Evita sobreposições
      if (!matchedFromPool.some(m => m.toLowerCase().includes(term.toLowerCase()) || term.toLowerCase().includes(m.toLowerCase()))) {
        matchedFromPool.push(term);
        if (matchedFromPool.length >= 3) break;
      }
    }
  }

  // Se ainda não encontrou 2 termos, extrai substantivos/adjetivos conceituais (>= 6 letras) fora de fórmulas KaTeX
  if (matchedFromPool.length < 2) {
    const textWithoutMath = text.replace(/\$[\s\S]*?\$/g, ' ');
    const words = textWithoutMath.match(/\b[A-Za-zÀ-ÿ]{6,}\b/g) || [];
    const stopWords = new Set(['quando', 'enquanto', 'processo', 'depende', 'mensura', 'durante', 'apenas', 'sempre', 'porque', 'contra']);
    for (const w of words) {
      if (!stopWords.has(w.toLowerCase()) && !matchedFromPool.some(m => m.toLowerCase() === w.toLowerCase())) {
        matchedFromPool.push(w);
        if (matchedFromPool.length >= 3) break;
      }
    }
  }

  // Aplica a substituição dos termos encontrados por {{SLOT_N}}
  let currentTemplate = text;
  matchedFromPool.forEach(term => {
    const termRegex = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');
    const match = currentTemplate.match(termRegex);
    if (match) {
      const cleanWord = match[0];
      const isMath = cleanWord.includes('$');
      const slotId = `slot-${slotIndex}`;
      const token = `{{SLOT_${slotIndex}}}`;

      const availableDistractors = poolDistractors.filter(d => 
        d.toLowerCase() !== cleanWord.toLowerCase() && 
        !cleanWord.toLowerCase().includes(d.toLowerCase()) &&
        !d.toLowerCase().includes(cleanWord.toLowerCase())
      );

      const shuffledPool = [...availableDistractors].sort((a, b) => {
        const hashA = (a.charCodeAt(0) * 31 + slotIndex * 7) % 100;
        const hashB = (b.charCodeAt(0) * 31 + slotIndex * 7) % 100;
        return hashA - hashB;
      });

      const selectedDistractors = shuffledPool.slice(0, 3);
      const fallbacks = ['Premissa Canônica', 'Distrator TRI', 'Correlação Direta', 'Fundamento Analítico'];
      while (selectedDistractors.length < 2) {
        const fb = fallbacks[selectedDistractors.length % fallbacks.length];
        if (!selectedDistractors.includes(fb) && fb !== cleanWord) {
          selectedDistractors.push(fb);
        }
      }

      const allOptions = [cleanWord, ...selectedDistractors].sort((a, b) => {
        const valA = (a.length * 13 + slotIndex * 17) % 97;
        const valB = (b.length * 13 + slotIndex * 17) % 97;
        return valA - valB;
      });

      slots.push({
        id: slotId,
        token,
        correctWord: cleanWord,
        isMath,
        options: allOptions,
        isDecrypted: false
      });

      currentTemplate = currentTemplate.replace(termRegex, token);
      slotIndex++;
    }
  });

  return {
    originalText: text,
    templateText: currentTemplate,
    slots
  };
}
