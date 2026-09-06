export interface MestreCardData {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  theme: string;
  skills: string[];
  theoryBlocks: TheoryBlock[];
  labItems: LabItem[];
  arcadeGameState: ArcadeGameState;
}

export interface TheoryBlock {
  id: string;
  title: string;
  content: string; // Pode conter KaTeX
}

export interface LabItem {
  id: string;
  question: string; // Enunciado, pode conter KaTeX
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface ArcadeGameState {
  questionsData: {
    question: string;
    difficulty: "Fácil" | "Média" | "Difícil";
    options: { text: string; isCorrect: boolean; feedback: string }[];
  }[];
  matchData: { left: string; right: string }[];
  tfData: { statement: string; isTrue: boolean; feedback: string }[];
  orderData: { title: string; steps: string[] }[];
  oddData: {
    question: string;
    options: { text: string; isOdd: boolean; explanation: string }[];
  }[];
}

export interface TRIStatistics {
  accuracy: number;
  coherence: number;
  agility: number;
  retention: number;
  immunity: number;
  totalScore: number;
}

export interface StudySessionRecord {
  id: string;
  cardId: string;
  timestamp: number;
  score: number;
  stats: TRIStatistics;
}

