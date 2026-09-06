import type { MestreCardData, StudySessionRecord } from '../types/mestre-card';

export interface UnifiedBackupPayload {
  schemaVersion: "1.0";
  exportedAt: number;
  cards: MestreCardData[];
  history: StudySessionRecord[];
}

export type ParsedImport = 
  | { type: 'backup'; data: UnifiedBackupPayload }
  | { type: 'single_card'; data: MestreCardData };

/**
 * Limpa e repara anomalias comuns geradas por LLMs em payloads JSON:
 * 1. Comentários C/JS
 * 2. Vírgulas residuais (trailing commas antes de } ou ])
 * 3. Contrabarras de KaTeX/LaTeX não escapadas (\Delta, \frac -> \\Delta, \\frac)
 * 4. Vírgulas ausentes entre pares de propriedades consecutivas
 */
export function repairJSONString(str: string): string {
  let output = str;

  // 1. Remove comentários multi-linha e linha única fora de strings
  output = output.replace(/\/\*[\s\S]*?\*\//g, '');
  output = output.replace(/^\s*\/\/.*$/gm, '');

  // 2. Remove vírgulas residuais (trailing commas) antes de fechar chaves ou colchetes
  output = output.replace(/,\s*([}\]])/g, '$1');

  // 3. Normaliza contrabarras de fórmulas KaTeX que não sejam escapes JSON válidos
  // No JSON, apenas \", \\, \/, \b, \f, \n, \r, \t, \uXXXX são válidos.
  output = output.replace(/\\([^"\\\/bfnrtu]|u(?![\da-fA-F]{4}))/g, '\\\\$1');

  // 4. Repara vírgulas esquecidas entre propriedades em linhas separadas
  // Ex: "title": "X"\n  "content": "Y" -> "title": "X",\n  "content": "Y"
  output = output.replace(/("|\d+|true|false|null|\]|\})\s*\n\s*("|\{)/g, '$1,\n$2');

  // 5. Remove novamente vírgulas antes de fechar estruturas que possam ter surgido
  output = output.replace(/,\s*([}\]])/g, '$1');

  return output;
}

/**
 * Varredura profunda caractere a caractere para reparar:
 * - Quebras de linha reais e tabs crus dentro de strings literais
 * - Aspas duplas internas não escapadas dentro de valores de propriedades
 */
export function deepRepairJSON(input: string): string {
  let repaired = '';
  let inString = false;
  let isEscaped = false;
  let isValue = false; // Indica se estamos dentro do valor de uma propriedade (após :)

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inString) {
      if (isEscaped) {
        repaired += char;
        isEscaped = false;
        continue;
      }

      if (char === '\\') {
        repaired += char;
        isEscaped = true;
        continue;
      }

      if (char === '\n') {
        repaired += '\\n';
        continue;
      }

      if (char === '\r') {
        continue; // Ignora retorno de carro dentro de strings
      }

      if (char === '\t') {
        repaired += '\\t';
        continue;
      }

      if (char === '"') {
        // Checa se é realmente o fechamento da string ou uma aspas interna não-escapada
        const remaining = input.substring(i + 1);
        const matchNext = remaining.match(/^\s*(,|:|}|\]|\n|\r)/);
        
        if (isValue && !matchNext) {
          // Não é seguido por pontuação JSON estrutural: é uma aspas interna do texto!
          repaired += '\\"';
          continue;
        } else {
          // Fechamento legítimo da string
          inString = false;
          repaired += char;
          continue;
        }
      }

      repaired += char;
    } else {
      // Fora de string
      if (char === '"') {
        inString = true;
        isEscaped = false;
        repaired += char;
      } else {
        if (char === ':') isValue = true;
        else if (char === ',' || char === '{' || char === '[') isValue = false;
        repaired += char;
      }
    }
  }

  return repairJSONString(repaired);
}

/**
 * Formata um snippet diagnóstico destacando a linha e coluna do erro sintático
 */
function formatJSONErrorDiagnostic(jsonText: string, errorMsg: string): string {
  // Extrai linha e coluna se existirem no erro V8/SpiderMonkey
  const lineColMatch = errorMsg.match(/line\s+(\d+)\s+column\s+(\d+)|linha\s+(\d+)\s+coluna\s+(\d+)/i);
  let lineNum = 0;
  let colNum = 0;

  if (lineColMatch) {
    lineNum = parseInt(lineColMatch[1] || lineColMatch[3], 10);
    colNum = parseInt(lineColMatch[2] || lineColMatch[4], 10);
  } else {
    const posMatch = errorMsg.match(/position\s+(\d+)|posição\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1] || posMatch[2], 10);
      const sub = jsonText.substring(0, pos);
      const lines = sub.split('\n');
      lineNum = lines.length;
      colNum = lines[lines.length - 1].length + 1;
    }
  }

  if (lineNum > 0) {
    const allLines = jsonText.split('\n');
    const start = Math.max(0, lineNum - 3);
    const end = Math.min(allLines.length, lineNum + 2);
    
    let snippet = `[DIAGNÓSTICO TÁTICO NO PONTO DE ERRO - LINHA ${lineNum}, COLUNA ${colNum}]:\n`;
    for (let l = start; l < end; l++) {
      const isErrorLine = l + 1 === lineNum;
      const prefix = isErrorLine ? '➔ ' : '  ';
      snippet += `${prefix}${String(l + 1).padStart(4, ' ')} | ${allLines[l]}\n`;
      if (isErrorLine && colNum > 0) {
        snippet += `         | ${' '.repeat(Math.max(0, colNum - 1))}^\n`;
      }
    }
    snippet += `\n[SOLUÇÃO]: O modelo inseriu aspas sem escape (\\"), uma vírgula a mais ou omitiu uma vírgula na linha anterior.`;
    return snippet;
  }

  return `[DICA TÁTICA]: Verifique se há aspas internas não escapadas ou caracteres de controle no JSON gerado.`;
}

export function sanitizeAndParseJSON(rawInput: string): unknown {
  if (!rawInput || typeof rawInput !== 'string') {
    throw new Error('Entrada de dados vazia ou inválida.');
  }

  let sanitized = rawInput.trim();
  
  // Remove markdown fences se existirem (```json e ```)
  sanitized = sanitized.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  // Encontra os limites externos do JSON (objeto {} ou array [])
  const firstBrace = sanitized.indexOf('{');
  const firstBracket = sanitized.indexOf('[');
  const lastBrace = sanitized.lastIndexOf('}');
  const lastBracket = sanitized.lastIndexOf(']');

  const hasObject = firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace;
  const hasArray = firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket;

  if (!hasObject && !hasArray) {
    throw new Error('Nenhum objeto {...} ou array [...] JSON válido encontrado no texto enviado.');
  }

  let startIdx = 0;
  let endIdx = sanitized.length - 1;

  if (hasObject && hasArray) {
    startIdx = Math.min(firstBrace, firstBracket);
    endIdx = Math.max(lastBrace, lastBracket);
  } else if (hasObject) {
    startIdx = firstBrace;
    endIdx = lastBrace;
  } else {
    startIdx = firstBracket;
    endIdx = lastBracket;
  }

  const jsonStr = sanitized.substring(startIdx, endIdx + 1);

  // Nível 1: Tentativa Direta Pura
  try {
    return JSON.parse(jsonStr);
  } catch (err1: any) {
    // Nível 2: Auto-Reparação Padrão (vírgulas residuais, contrabarras KaTeX e comentários)
    try {
      const repaired = repairJSONString(jsonStr);
      return JSON.parse(repaired);
    } catch (err2: any) {
      // Nível 3: Auto-Reparação Profunda (varredura de aspas internas e quebras de linha em strings)
      try {
        const deepRepaired = deepRepairJSON(jsonStr);
        return JSON.parse(deepRepaired);
      } catch (err3: any) {
        const originalMsg = err1?.message || err2?.message || err3?.message;
        const diagnostic = formatJSONErrorDiagnostic(jsonStr, originalMsg);
        throw new Error(`Falha ao decodificar JSON: ${originalMsg}\n\n${diagnostic}`);
      }
    }
  }
}

export function validateMestreCard(data: any): MestreCardData {
  if (!data || typeof data !== 'object') {
    throw new Error('O JSON principal não é um objeto válido.');
  }

  if (!data.title || typeof data.title !== 'string') {
    throw new Error('O campo "title" é obrigatório e deve ser string.');
  }

  const topic = typeof data.topic === 'string' ? data.topic : (data.theme || 'Sem Tópico');

  const card: MestreCardData = {
    id: data.id || crypto.randomUUID(),
    createdAt: data.createdAt || Date.now(),
    updatedAt: Date.now(),
    title: data.title,
    topic: topic,
    sec01_header: data.sec01_header || {
      triWeight: 'Média',
      skills: [],
      thematicAxes: []
    },
    sec02_theory: data.sec02_theory || {
      blocks: [],
      triagePatterns: []
    },
    sec03_structure: data.sec03_structure || {
      type: 'qualitative',
      causalChain: { causes: '', agents: '', mechanisms: '', consequences: '' },
      comparisonTable: { header: [], rows: [] }
    },
    sec04_radar: data.sec04_radar || {
      mnemonics: [],
      blindSpots: [],
      triggerWords: []
    },
    sec05_lab: data.sec05_lab ? {
      questions: data.sec05_lab.questions || [],
      hardcoreQuestions: data.sec05_lab.hardcoreQuestions || [],
      bossFight: data.sec05_lab.bossFight || { title: '', context: '', options: [], stepByStepResolution: '' }
    } : {
      questions: [],
      hardcoreQuestions: [],
      bossFight: { title: '', context: '', options: [], stepByStepResolution: '' }
    },
    sec06_recall: data.sec06_recall || [],
    sec07_arcade: data.sec07_arcade || {
      questionsData: [],
      matchData: [],
      tfData: [],
      orderData: [],
      oddData: []
    }
  };

  return card;
}

export function validateImportPayload(rawObj: any): ParsedImport {
  if (rawObj && rawObj.schemaVersion === "1.0" && Array.isArray(rawObj.cards) && Array.isArray(rawObj.history)) {
    return {
      type: 'backup',
      data: rawObj as UnifiedBackupPayload
    };
  }
  
  return {
    type: 'single_card',
    data: validateMestreCard(rawObj)
  };
}

function triggerDownload(filename: string, jsonString: string): void {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportFullBackup(cards: MestreCardData[], history: StudySessionRecord[]): void {
  const payload: UnifiedBackupPayload = {
    schemaVersion: "1.0",
    exportedAt: Date.now(),
    cards,
    history
  };

  const dataStr = JSON.stringify(payload, null, 2);
  const dateStr = new Date().toISOString().split('T')[0];
  triggerDownload(`mestre-card-full-backup-${dateStr}.json`, dataStr);
}

export function exportSingleCardJSON(card: MestreCardData): void {
  const slug = (card.title || 'card')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 40) || 'card';

  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `card-${slug}-${dateStr}.json`;
  const dataStr = JSON.stringify(card, null, 2);
  triggerDownload(filename, dataStr);
}

export function exportFilteredBackup(cards: MestreCardData[], allHistory: StudySessionRecord[], categoryLabel: string): void {
  const cardIds = new Set(cards.map(c => c.id));
  const filteredHistory = allHistory.filter(h => cardIds.has(h.cardId));

  const payload: UnifiedBackupPayload = {
    schemaVersion: "1.0",
    exportedAt: Date.now(),
    cards,
    history: filteredHistory
  };

  const slug = (categoryLabel || 'selecao')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'selecao';

  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `mestre-card-${slug}-backup-${dateStr}.json`;
  const dataStr = JSON.stringify(payload, null, 2);
  triggerDownload(filename, dataStr);
}

export function parseBackupFile(file: File): Promise<ParsedImport> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('Nenhum arquivo fornecido.'));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text || typeof text !== 'string') {
          throw new Error('Conteúdo do arquivo está vazio ou ilegível.');
        }
        const rawObj = sanitizeAndParseJSON(text);
        const parsed = validateImportPayload(rawObj);
        resolve(parsed);
      } catch (err: any) {
        reject(new Error(`Falha ao decodificar [${file.name}]: ${err.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Erro de leitura do arquivo [${file.name}]: ${reader.error?.message || 'Falha de I/O'}`));
    };

    reader.readAsText(file, 'utf-8');
  });
}


