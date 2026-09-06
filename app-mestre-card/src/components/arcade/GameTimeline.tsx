import { useState, useEffect } from 'react';
import { playSound } from '../../lib/audio';

export interface ArcadeQuestion {
  question: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil' | string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

interface GameTimelineProps {
  questions: ArcadeQuestion[];
  soundEnabled: boolean;
  onDamage: (amount: number) => void;
  onComplete: (results: { hit: boolean; difficulty: string }[]) => void;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const GameTimeline = ({ questions, soundEnabled, onDamage, onComplete }: GameTimelineProps) => {
  const [step, setStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState<{ hit: boolean; difficulty: string }[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<ArcadeQuestion['options']>([]);
  const [answeredIdx, setAnsweredIdx] = useState<number | null>(null);
  const [punishTime, setPunishTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const nextQuestion = () => {
    setAnsweredIdx(null);
    setPunishTime(null);
    if (step + 1 >= questions.length) {
      setIsFinished(true);
      onComplete(results);
    } else {
      setStep(s => s + 1);
    }
  };

  useEffect(() => {
    if (questions.length > 0 && step < questions.length) {
      const q = questions[step];
      const opts = Array.isArray(q?.options) ? q.options : [];
      setShuffledOptions(shuffleArray(opts));
      setAnsweredIdx(null);
    }
  }, [step, questions]);

  // Lockout timer
  useEffect(() => {
    if (punishTime === null) return;
    if (punishTime <= 0) {
      nextQuestion();
      return;
    }
    const timer = setTimeout(() => {
      setPunishTime(punishTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [punishTime]);

  // Global keydown for Space when next is available
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        if (punishTime !== null || answeredIdx !== null) {
          e.preventDefault();
          nextQuestion();
        }
      }

      if (e.key >= '1' && e.key <= '4' && answeredIdx === null && punishTime === null && !isFinished) {
        const idx = parseInt(e.key) - 1;
        if (idx < shuffledOptions.length) {
          handleOptionClick(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answeredIdx, punishTime, isFinished, shuffledOptions.length, step, questions.length, results]);

  if (questions.length === 0) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-blue-500/30 min-h-[300px] flex items-center justify-center text-slate-500 font-mono text-sm">
        [ CARREGANDO DADOS TÁTICOS... ]
      </div>
    );
  }

  if (isFinished || step >= questions.length) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-blue-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-5xl mb-3">🏆</div>
        <div className="text-emerald-400 font-black text-xl">DOMINADO!</div>
      </div>
    );
  }

  const currentQ = questions[step] || { question: '', difficulty: 'Média', options: [] };
  const progress = (step / questions.length) * 100;

  const handleOptionClick = (idx: number) => {
    if (answeredIdx !== null || punishTime !== null) return;
    
    const opt = shuffledOptions[idx];
    setAnsweredIdx(idx);
    
    const newResults = [...results, { hit: opt.isCorrect, difficulty: currentQ.difficulty }];
    setResults(newResults);

    playSound(opt.isCorrect, soundEnabled);

    if (opt.isCorrect) {
      setStreak(s => s + 1);
    } else {
      setStreak(Math.max(0, streak - 2));
      onDamage(20);
      setPunishTime(10);
    }
  };

  return (
    <div className="bg-slate-950 p-5 rounded-xl border border-blue-500/30 min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-500/20">
          🔥 Combo: {streak}
        </span>
      </div>
      
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {punishTime !== null ? (
        <div className="mt-4 p-4 bg-red-900/40 border border-red-500 rounded-lg text-center animate-pulse">
          <p className="text-red-300 font-bold mb-2">Atenção! Você errou e o sistema travou.</p>
          <p className="text-sm text-gray-300 mb-4">
            Liberando em <span className="text-xl font-mono text-white">{punishTime}s</span>
          </p>
          <button 
            onClick={() => { setPunishTime(null); nextQuestion(); }}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold text-xs transition-colors"
          >
            Continuar Agora (Espaço) ➔
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
              Questão {step + 1}/{questions.length}
            </span>
            <span className="text-xs font-bold text-gray-500 border border-gray-700 px-2 rounded uppercase">
              {currentQ.difficulty || 'Média'}
            </span>
          </div>
          
          <h3 className="text-lg text-white font-bold mb-4">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = answeredIdx === idx;
              const isAnswered = answeredIdx !== null;
              
              let btnClass = 'w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-200 border border-slate-700 transition-colors flex items-center';
              let badgeClass = 'mr-3 font-bold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/20';

              if (isAnswered) {
                if (isSelected) {
                  if (opt.isCorrect) {
                    btnClass = 'w-full text-left p-3 rounded-lg text-sm transition-colors flex items-center bg-emerald-900/60 text-emerald-300 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                    badgeClass = 'mr-3 font-bold text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/50';
                  } else {
                    btnClass = 'w-full text-left p-3 rounded-lg text-sm transition-colors flex items-center bg-red-900/60 text-red-300 border-2 border-red-500';
                    badgeClass = 'mr-3 font-bold text-red-400 bg-red-900/50 px-2 py-0.5 rounded border border-red-500/50';
                  }
                } else {
                  btnClass = 'w-full text-left p-3 bg-slate-800/50 rounded-lg text-sm text-gray-500 border border-slate-700/50 transition-colors flex items-center opacity-50 cursor-not-allowed';
                  badgeClass = 'mr-3 font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700';
                }
              }

              return (
                <div key={idx} className="flex flex-col gap-2">
                  <button 
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx)}
                    className={btnClass}
                  >
                    <span className={badgeClass}>{idx + 1}</span>
                    <span>{opt.text}</span>
                  </button>
                  
                  {isSelected && (
                    <div className={`p-3 text-sm rounded-lg font-bold ${opt.isCorrect ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30' : 'bg-red-900/40 text-red-300 border border-red-500/30'}`}>
                      {opt.isCorrect ? '✅ ' : '❌ '}{opt.feedback}
                      {opt.isCorrect && (
                        <button 
                          onClick={() => nextQuestion()}
                          className="block mt-3 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-white text-xs transition-colors"
                        >
                          Avançar ➔ (Espaço)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
