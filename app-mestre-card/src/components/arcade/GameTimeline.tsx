import { useState, useEffect } from 'react';
import { playSound } from '../../lib/audio';
import { MathRenderer } from '../MathRenderer';

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
  onError?: (error: { prompt: string; userWrongAnswer: string; explanation: string }) => void;
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

export const GameTimeline = ({ questions, soundEnabled, onDamage, onComplete, onError }: GameTimelineProps) => {
  const [step, setStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState<{ hit: boolean; difficulty: string }[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<ArcadeQuestion['options']>([]);
  const [answeredIdx, setAnsweredIdx] = useState<number | null>(null);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [selectedWrong, setSelectedWrong] = useState<{ text: string; feedback: string } | null>(null);
  const [correctOpt, setCorrectOpt] = useState<{ text: string; feedback: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const nextQuestion = () => {
    setAnsweredIdx(null);
    setLockoutTime(null);
    setSelectedWrong(null);
    setCorrectOpt(null);
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
      setSelectedWrong(null);
      setCorrectOpt(null);
    }
  }, [step, questions]);

  // Lockout timer (3s initial reading lock - NO AUTO-ADVANCE)
  useEffect(() => {
    if (lockoutTime === null || lockoutTime <= 0) return;
    const timer = setTimeout(() => {
      setLockoutTime(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearTimeout(timer);
  }, [lockoutTime]);

  // Global keydown for Space when next is available
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        if (lockoutTime !== null) {
          if (lockoutTime <= 0) {
            e.preventDefault();
            nextQuestion();
          }
        } else if (answeredIdx !== null) {
          e.preventDefault();
          nextQuestion();
        }
      }

      if (e.key >= '1' && e.key <= '4' && answeredIdx === null && lockoutTime === null && !isFinished) {
        const idx = parseInt(e.key) - 1;
        if (idx < shuffledOptions.length) {
          handleOptionClick(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answeredIdx, lockoutTime, isFinished, shuffledOptions.length, step, questions.length, results]);

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
    if (answeredIdx !== null || lockoutTime !== null) return;
    
    const opt = shuffledOptions[idx];
    setAnsweredIdx(idx);
    
    const newResults = [...results, { hit: opt.isCorrect, difficulty: currentQ.difficulty }];
    setResults(newResults);

    playSound(opt.isCorrect, soundEnabled);

    if (opt.isCorrect) {
      setStreak(s => s + 1);
    } else {
      const correct = shuffledOptions.find(o => o.isCorrect);
      setSelectedWrong({ text: opt.text, feedback: opt.feedback });
      if (correct) {
        setCorrectOpt({ text: correct.text, feedback: correct.feedback });
      }
      setStreak(Math.max(0, streak - 2));
      onDamage(20);
      onError?.({
        prompt: currentQ.question,
        userWrongAnswer: opt.text,
        explanation: opt.feedback
      });
      setLockoutTime(3);
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

      {lockoutTime !== null ? (
        <div 
          className="mt-2 p-5 bg-gradient-to-b from-red-950/80 to-slate-950/90 border-2 border-red-500/80 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.25)] space-y-4 animate-fade-in notranslate"
          translate="no"
        >
          <div className="flex justify-between items-center border-b border-red-800/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <h4 className="text-red-400 font-extrabold text-sm uppercase tracking-wider">
                  FALHA TÁTICA // MORTE SÚBITA
                </h4>
                <p className="text-[11px] text-red-300/80 font-mono">DANO RECEBIDO: -20 HP | QUEBRA DE COMBO</p>
              </div>
            </div>
            <div className="text-right notranslate" translate="no">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Status da Trava</span>
              <span className="text-sm font-black font-mono text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                {lockoutTime > 0 ? `🔒 ${lockoutTime}s` : '🔓 LIBERADO'}
              </span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Questão</span>
            <div className="text-white text-sm font-semibold">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Diagnostic Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedWrong && (
              <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1.5 uppercase font-mono">
                    <span>❌</span> O Que Você Marcou (Distrator)
                  </div>
                  <div className="text-xs text-red-200 font-medium mb-2 pl-3 border-l-2 border-red-500/40">
                    <MathRenderer content={selectedWrong.text} />
                  </div>
                </div>
                <div className="bg-red-900/30 rounded p-2.5 text-xs text-red-300 font-mono leading-relaxed mt-2 border border-red-800/40">
                  <span className="font-bold text-red-400 block mb-1">Pegadinha / Análise de Erro:</span>
                  <MathRenderer content={selectedWrong.feedback || 'Conceito incorreto ou armadilha da banca.'} />
                </div>
              </div>
            )}

            {correctOpt && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5 uppercase font-mono">
                    <span>✅</span> Gabarito Correto
                  </div>
                  <div className="text-xs text-emerald-200 font-medium mb-2 pl-3 border-l-2 border-emerald-500/40">
                    <MathRenderer content={correctOpt.text} />
                  </div>
                </div>
                <div className="bg-emerald-900/30 rounded p-2.5 text-xs text-emerald-300 font-mono leading-relaxed mt-2 border border-emerald-800/40">
                  <span className="font-bold text-emerald-400 block mb-1">Fundamentação Científica:</span>
                  <MathRenderer content={correctOpt.feedback || 'Afirmação correta de acordo com a teoria.'} />
                </div>
              </div>
            )}
          </div>

          {/* Advance Action - 100% Manual Advance */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-red-900/30 notranslate" translate="no">
            <span className="text-xs text-slate-400 font-mono">
              {lockoutTime > 0 
                ? `🔒 Leitura obrigatória: desbloqueando em ${lockoutTime}s...` 
                : '✓ Diagnóstico assimilado! Avance no seu próprio ritmo.'}
            </span>
            <button
              disabled={lockoutTime > 0}
              onClick={() => nextQuestion()}
              className={`px-5 py-2.5 rounded-lg font-bold text-xs font-mono transition-all flex items-center gap-2 ${
                lockoutTime > 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 opacity-60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 animate-pulse cursor-pointer'
              }`}
            >
              {lockoutTime > 0 ? `🔒 Leitura obrigatória (${lockoutTime}s)` : 'Continuar Agora (Espaço) ➔'}
            </button>
          </div>
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
          
          <h3 className="text-lg text-white font-bold mb-4">
            <MathRenderer content={currentQ.question} />
          </h3>
          
          <div className="space-y-3">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = answeredIdx === idx;
              const isAnswered = answeredIdx !== null;
              
              let btnClass = 'w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-200 border border-slate-700 transition-colors flex items-center cursor-pointer';
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
                    <span className="flex-1"><MathRenderer content={opt.text} /></span>
                  </button>
                  
                  {isSelected && (
                    <div className={`p-3 text-sm rounded-lg font-bold ${opt.isCorrect ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30' : 'bg-red-900/40 text-red-300 border border-red-500/30'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{opt.isCorrect ? '✅ ' : '❌ '}</span>
                        <div className="font-normal leading-relaxed">
                          <MathRenderer content={opt.feedback} />
                        </div>
                      </div>
                      {opt.isCorrect && (
                        <button 
                          onClick={() => nextQuestion()}
                          className="block mt-3 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-white text-xs transition-colors cursor-pointer"
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
