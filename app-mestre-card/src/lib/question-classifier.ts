// src/lib/question-classifier.ts
// Motor inteligente de classificação e identificação de conteúdo para conexão com o acervo de provas

export interface ContentClassification {
  discipline: 'quimica' | 'biologia' | 'fisica' | 'matematica' | 'humanas' | 'linguagens' | 'geral';
  disciplineLabel: string;
  primaryTopic: string;
  keywordsFound: string[];
  confidence: number; // 0 a 100%
  suggestedBancas: string[];
  matchedPdfs: string[];
}

interface DisciplineDefinition {
  id: ContentClassification['discipline'];
  label: string;
  keywords: Array<{ word: string; topic: string; weight: number }>;
  bancasPreferidas: string[];
  pdfMappings: Record<string, string[]>;
}

const DISCIPLINES: DisciplineDefinition[] = [
  {
    id: 'quimica',
    label: 'Química',
    keywords: [
      { word: 'termoquímica', topic: 'Termoquímica', weight: 10 },
      { word: 'entalpia', topic: 'Termoquímica', weight: 10 },
      { word: 'lei de hess', topic: 'Termoquímica', weight: 10 },
      { word: 'calor de formação', topic: 'Termoquímica', weight: 9 },
      { word: 'calor de combustão', topic: 'Termoquímica', weight: 9 },
      { word: 'exotérmica', topic: 'Termoquímica', weight: 8 },
      { word: 'endotérmica', topic: 'Termoquímica', weight: 8 },
      { word: 'eletroquímica', topic: 'Eletroquímica', weight: 10 },
      { word: 'eletrólise', topic: 'Eletroquímica', weight: 10 },
      { word: 'potencial de redução', topic: 'Eletroquímica', weight: 9 },
      { word: 'ânodo', topic: 'Eletroquímica', weight: 8 },
      { word: 'cátodo', topic: 'Eletroquímica', weight: 8 },
      { word: 'estequiometria', topic: 'Estequiometria', weight: 10 },
      { word: 'pureza', topic: 'Estequiometria', weight: 7 },
      { word: 'rendimento', topic: 'Estequiometria', weight: 7 },
      { word: 'soluções', topic: 'Soluções', weight: 8 },
      { word: 'concentração molar', topic: 'Soluções', weight: 9 },
      { word: 'equilíbrio químico', topic: 'Equilíbrio Químico', weight: 10 },
      { word: 'ph', topic: 'Equilíbrio Químico', weight: 8 },
      { word: 'le chatelier', topic: 'Equilíbrio Químico', weight: 9 },
      { word: 'química orgânica', topic: 'Química Orgânica', weight: 9 },
      { word: 'isomeria', topic: 'Isomeria', weight: 9 },
      { word: 'funções orgânicas', topic: 'Funções Orgânicas', weight: 9 }
    ],
    bancasPreferidas: ['Albert Einstein Medicina', 'UNESP', 'FUVEST', 'ENEM'],
    pdfMappings: {
      'Termoquímica': ['TERMOQUÍMICA.pdf', 'RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO-QUÍMICA.pdf'],
      'Eletroquímica': ['ELETROQUÍMICA E ELETRÓLISE.pdf', 'eletroquimica.pdf'],
      'Estequiometria': ['ESTEQUIOMETRIA COMPLETA - ANOTAÇÕES.pdf', 'ESTEQUIOMETRIA E FATORES DE CORREÇÃO.pdf'],
      'Química Orgânica': ['QUÍMICA ORGÂNICA - PARTE 1.pdf', 'REVISÃO QUÍMICA ORGÂNICA.pdf']
    }
  },
  {
    id: 'biologia',
    label: 'Biologia',
    keywords: [
      { word: 'citologia', topic: 'Citologia', weight: 10 },
      { word: 'mitocôndria', topic: 'Citologia', weight: 9 },
      { word: 'membrana plasmática', topic: 'Citologia', weight: 9 },
      { word: 'genética', topic: 'Genética', weight: 10 },
      { word: 'mendel', topic: 'Genética', weight: 10 },
      { word: 'alelos', topic: 'Genética', weight: 8 },
      { word: 'herança', topic: 'Genética', weight: 8 },
      { word: 'fisiologia', topic: 'Fisiologia Humana', weight: 10 },
      { word: 'homeostase', topic: 'Fisiologia Humana', weight: 9 },
      { word: 'sistema nervoso', topic: 'Fisiologia Humana', weight: 9 },
      { word: 'sinapse', topic: 'Fisiologia Humana', weight: 9 },
      { word: 'hormônio', topic: 'Fisiologia Humana', weight: 8 },
      { word: 'ecologia', topic: 'Ecologia', weight: 10 },
      { word: 'biomassa', topic: 'Ecologia', weight: 8 },
      { word: 'cadeia alimentar', topic: 'Ecologia', weight: 8 },
      { word: 'evolução', topic: 'Evolução', weight: 10 },
      { word: 'seleção natural', topic: 'Evolução', weight: 10 },
      { word: 'síntese proteica', topic: 'Bioquímica', weight: 10 },
      { word: 'dna', topic: 'Bioquímica', weight: 9 },
      { word: 'rna', topic: 'Bioquímica', weight: 9 }
    ],
    bancasPreferidas: ['Albert Einstein Medicina', 'UNICAMP', 'ENEM', 'UNESP'],
    pdfMappings: {
      'Genética': ['genetica-01-introducao.pdf', '1o-lei-de-mendel.pdf'],
      'Fisiologia Humana': ['FISIOLOGIA HUMANA 01.pdf', 'sistema-nervoso.pdf'],
      'Citologia': ['organelas-celulares.pdf', 'ciclo-celular-e-divisoes.pdf'],
      'Ecologia': ['ECOLOGIA I.pdf', 'ECOLOGIA II.pdf']
    }
  },
  {
    id: 'fisica',
    label: 'Física',
    keywords: [
      { word: 'cinemática', topic: 'Mecânica', weight: 10 },
      { word: 'newton', topic: 'Dinâmica', weight: 10 },
      { word: 'velocidade', topic: 'Mecânica', weight: 6 },
      { word: 'aceleração', topic: 'Mecânica', weight: 7 },
      { word: 'energia cinética', topic: 'Energia e Trabalho', weight: 9 },
      { word: 'calorimetria', topic: 'Termologia', weight: 10 },
      { word: 'óptica', topic: 'Óptica', weight: 10 },
      { word: 'eletrodinâmica', topic: 'Eletricidade', weight: 10 },
      { word: 'resistor', topic: 'Eletricidade', weight: 9 },
      { word: 'ohm', topic: 'Eletricidade', weight: 9 },
      { word: 'ondulatória', topic: 'Ondas', weight: 10 }
    ],
    bancasPreferidas: ['FUVEST', 'ITA', 'UNESP', 'ENEM'],
    pdfMappings: {}
  },
  {
    id: 'matematica',
    label: 'Matemática',
    keywords: [
      { word: 'função', topic: 'Funções', weight: 7 },
      { word: 'logaritmo', topic: 'Logaritmos', weight: 10 },
      { word: 'trigonometria', topic: 'Trigonometria', weight: 10 },
      { word: 'geometria espacial', topic: 'Geometria', weight: 10 },
      { word: 'probabilidade', topic: 'Probabilidade', weight: 10 },
      { word: 'combinatória', topic: 'Análise Combinatória', weight: 10 }
    ],
    bancasPreferidas: ['FUVEST', 'UNICAMP', 'ENEM'],
    pdfMappings: {}
  }
];

/**
 * Analisa qualquer texto, enunciado ou card e retorna o diagnóstico taxonômico
 */
export function classifyContent(text: string, title = ''): ContentClassification {
  const normalized = (title + ' ' + text).toLowerCase();
  
  let bestDiscipline: DisciplineDefinition = DISCIPLINES[0];
  let maxScore = 0;
  let detectedKeywords: string[] = [];
  let detectedTopic = 'Geral';

  for (const disc of DISCIPLINES) {
    let score = 0;
    const currentKeywords: string[] = [];
    const topicScores: Record<string, number> = {};

    for (const kw of disc.keywords) {
      if (normalized.includes(kw.word)) {
        score += kw.weight;
        currentKeywords.push(kw.word);
        topicScores[kw.topic] = (topicScores[kw.topic] || 0) + kw.weight;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestDiscipline = disc;
      detectedKeywords = currentKeywords;

      // Encontrar tópico com maior pontuação
      let maxTopicScore = 0;
      for (const [top, tScore] of Object.entries(topicScores)) {
        if (tScore > maxTopicScore) {
          maxTopicScore = tScore;
          detectedTopic = top;
        }
      }
    }
  }

  const confidence = Math.min(99, Math.max(35, maxScore * 3));
  const matchedPdfs = bestDiscipline.pdfMappings[detectedTopic] || [];

  return {
    discipline: bestDiscipline.id,
    disciplineLabel: bestDiscipline.label,
    primaryTopic: detectedTopic,
    keywordsFound: detectedKeywords.slice(0, 5),
    confidence,
    suggestedBancas: bestDiscipline.bancasPreferidas,
    matchedPdfs
  };
}
