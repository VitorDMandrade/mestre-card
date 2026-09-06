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

export function sanitizeAndParseJSON(rawInput: string): unknown {
  try {
    let sanitized = rawInput.trim();
    
    // Remove markdown fences se existirem
    if (sanitized.startsWith('```')) {
      const lines = sanitized.split('\n');
      if (lines.length > 1) {
        lines.shift(); // remove primeira linha ```json
      }
      if (lines[lines.length - 1].trim().startsWith('```')) {
        lines.pop(); // remove ultima linha ```
      }
      sanitized = lines.join('\n');
    }

    // Encontra os limites do JSON (pode ser objeto ou array)
    const firstBrace = sanitized.indexOf('{');
    const firstBracket = sanitized.indexOf('[');
    const lastBrace = sanitized.lastIndexOf('}');
    const lastBracket = sanitized.lastIndexOf(']');

    const hasObject = firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace;
    const hasArray = firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket;

    if (!hasObject && !hasArray) {
      throw new Error('Nenhum objeto ou array JSON válido encontrado na entrada.');
    }

    let startIdx = -1;
    let endIdx = -1;

    if (hasObject && hasArray) {
      // Pega o que vier primeiro e terminar por último
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
    return JSON.parse(jsonStr);
  } catch (error: any) {
    throw new Error(`Falha ao decodificar JSON: ${error.message}`);
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
    sec05_lab: data.sec05_lab || {
      questions: [],
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

export function exportFullBackup(cards: MestreCardData[], history: StudySessionRecord[]): void {
  const payload: UnifiedBackupPayload = {
    schemaVersion: "1.0",
    exportedAt: Date.now(),
    cards,
    history
  };

  const dataStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `mestre-card-full-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
