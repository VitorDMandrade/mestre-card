export interface CompetencySkill {
  id: string; // Ex: "H17"
  description: string;
}

export interface TriagePattern {
  id: 'route-a' | 'route-b' | 'route-c' | string;
  name: string;
  trigger15s: string;
  algorithm: string[];
  distractors: string;
}

export interface TheoryBlock {
  number: number;
  title: string;
  content: string; // Suporta $fórmulas$ KaTeX
  highlight?: string;
}

export interface QuantitativeStructure {
  type: 'quantitative';
  formulaChamber: { title: string; latex: string; notes?: string }[];
  variables: { symbol: string; meaning: string; siUnit: string; conversions: string }[];
  proportionality: string[];
}

export interface QualitativeStructure {
  type: 'qualitative';
  causalChain: { causes: string; agents: string; mechanisms: string; consequences: string };
  comparisonTable: { header: string[]; rows: string[][] };
}

export interface TriggerWord {
  trigger: string;
  context: string;
  trap: string;
}

export interface LabQuestion {
  id: string;
  enunciado: string;
  options: { letter: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[];
  resolution: { distractorAnalysis: string; technicalVerdict: string };
}

export interface BossFight {
  title: string;
  context: string;
  options: { letter: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[];
  stepByStepResolution: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tag: string;
}

// Pentágono Revisional (Arcade Data)
export interface ArcadeQuestionsData {
  question: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil' | string;
  options: { text: string; isCorrect: boolean; feedback: string }[];
}

export interface ArcadeMatchData {
  left: string;
  right: string;
}

export interface ArcadeTFData {
  statement: string;
  isTrue: boolean;
  feedback: string;
}

export interface ArcadeOrderData {
  title: string;
  steps: string[];
}

export interface ArcadeOddData {
  question: string;
  options: { text: string; isOdd: boolean; explanation: string }[];
}

export interface MestreCardData {
  id: string;
  topic: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  sec01_header: {
    triWeight: 'Baixa' | 'Média' | 'Alta' | 'Altíssima' | string;
    skills: CompetencySkill[];
    thematicAxes: string[];
  };
  sec02_theory: {
    blocks: TheoryBlock[];
    triagePatterns: TriagePattern[];
  };
  sec03_structure: QuantitativeStructure | QualitativeStructure;
  sec04_radar: {
    mnemonics: { title: string; trigger: string; rule: string }[];
    blindSpots: { title: string; analysis: string }[];
    triggerWords: TriggerWord[];
  };
  sec05_lab: {
    questions: LabQuestion[];
    hardcoreQuestions?: LabQuestion[];
    bossFight: BossFight;
  };
  sec06_recall: Flashcard[];
  sec07_arcade: {
    questionsData: ArcadeQuestionsData[];
    matchData: ArcadeMatchData[];
    tfData: ArcadeTFData[];
    orderData: ArcadeOrderData[];
    oddData: ArcadeOddData[];
  };
}

export interface TRIStatistics {
  accuracy: number;
  coherenceScore: number;
  speed: number;
  immunity: number;
  totalScore: number;
}

export interface StudySessionRecord {
  id: string;
  cardId: string;
  timestamp: number;
  score: number;
  stats: TRIStatistics;
  details?: {
    sessionErrors?: Array<{
      game: 'G1' | 'G3' | 'G5';
      prompt: string;
      userWrongAnswer: string;
      explanation: string;
      timestamp?: number;
      cardId?: string;
      cardTitle?: string;
    }>;
    [key: string]: any;
  };
}
