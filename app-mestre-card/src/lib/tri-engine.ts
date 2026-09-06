export interface TRICalculationInput {
  g1Results: { hit: boolean; difficulty: string }[];
  g3TimeSaved: number;
  g3TotalQuestions: number;
  g4TotalAttempts: number;
  g4TotalSequences: number;
  g5TotalHits: number;
  g5TotalQuestions: number;
}

export interface TRIScoreResult {
  score: number;
  verdict: string;
  penalty: number;
  axes: [number, number, number, number, number];
}

export function calculateTRIScore(params: TRICalculationInput): TRIScoreResult {
  let totalF = 0, hitsF = 0, totalM = 0, hitsM = 0, totalD = 0, hitsD = 0;

  params.g1Results.forEach(r => {
    const d = (r.difficulty || '').toLowerCase();
    if (d.includes('fácil') || d.includes('facil')) {
      totalF++;
      if (r.hit) hitsF++;
    } else if (d.includes('difícil') || d.includes('dificil')) {
      totalD++;
      if (r.hit) hitsD++;
    } else {
      totalM++;
      if (r.hit) hitsM++;
    }
  });

  const rateF = totalF > 0 ? (hitsF / totalF) : 1;
  const rateD = totalD > 0 ? (hitsD / totalD) : 0;
  
  const baseScore = 400;
  const hitScore = (hitsF * 40) + (hitsM * 60) + (hitsD * 80);
  
  let triPenalty = 0;
  if (rateD > 0 && rateF < 0.6) {
    triPenalty = 150;
  } else if (rateD > 0 && rateF < 0.8) {
    triPenalty = 75;
  }

  const timeBonus = Math.min(200, params.g3TimeSaved * 2);
  let score = Math.floor(baseScore + hitScore + timeBonus - triPenalty);
  
  if (score > 1000) score = 1000;
  if (score < 0) score = 0;

  let verdict = '';
  if (score >= 850) verdict = 'Pronto pra Prova! 🚀';
  else if (score < 750) verdict = 'Revisão Obrigatória! 📚';
  else verdict = 'Na Média! Continue Revisando. 🎯';

  // Axes calculation
  const precision = params.g1Results.length > 0 ? params.g1Results.filter(r => r.hit).length / params.g1Results.length : 0;
  const coherence = Math.max(0, 1 - (triPenalty / 150));
  const maxTimeG3 = params.g3TotalQuestions > 0 ? params.g3TotalQuestions * 15 : 15;
  const agility = Math.min(1, params.g3TimeSaved / maxTimeG3);
  const retention = params.g4TotalAttempts > 0 ? params.g4TotalSequences / params.g4TotalAttempts : 0;
  const immunity = params.g5TotalQuestions > 0 ? params.g5TotalHits / params.g5TotalQuestions : 0;

  return {
    score,
    verdict,
    penalty: triPenalty,
    axes: [precision, coherence, agility, retention, immunity]
  };
}
