import { MestreCardData } from '../types/mestre-card';

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

    // Procura o primeiro { e o ultimo }
    const firstBrace = sanitized.indexOf('{');
    const lastBrace = sanitized.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1 || firstBrace > lastBrace) {
      throw new Error('Nenhum objeto JSON válido encontrado na entrada.');
    }

    const jsonStr = sanitized.substring(firstBrace, lastBrace + 1);
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

  // topic no schema costuma vir, senao default
  const topic = typeof data.topic === 'string' ? data.topic : (data.theme || 'Sem Tópico');

  const card: MestreCardData = {
    id: data.id || crypto.randomUUID(),
    createdAt: data.createdAt || Date.now(),
    updatedAt: Date.now(),
    title: data.title,
    theme: topic, // Mapeando theme como topic/theme
    skills: Array.isArray(data.skills) ? data.skills : [],
    theoryBlocks: Array.isArray(data.theoryBlocks) ? data.theoryBlocks : [],
    labItems: Array.isArray(data.labItems) ? data.labItems : [],
    arcadeGameState: data.arcadeGameState || {
      questionsData: [],
      matchData: [],
      tfData: [],
      orderData: [],
      oddData: []
    }
  };

  return card;
}

export function exportAllCardsAsJSON(cards: MestreCardData[]): void {
  const dataStr = JSON.stringify(cards, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `mestre-cards-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
