import { useState, useEffect } from 'react';
import { playSound } from '../../lib/audio';

export interface OddOption {
  text: string;
  isOdd: boolean;
  explanation: string;
}

export interface OddQuestion {
  theme: string;
  options: OddOption[];
}

interface GameOddProps {
  oddData: OddQuestion[];
  soundEnabled: boolean;
  onDamage: (amount: number) => void;
  onComplete: (hits: number) => void;
}

export const GameOdd = ({ oddData, soundEnabled, onDamage, onComplete }: GameOddProps) => {
  const [step, setStep] = useState(0);
  const [hits, setHits] = useState(0);
  
  const [answeredIdx, setAnsweredIdx] = useState<number | null>(null);
  const [punishTime, setPunishTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Lockout timer (5s)
  useEffect(() => {
    if (punishTime === null) return;
    
    if (punishTime <= 0) {
      setPunishTime(null);
      return;
    }

    const timer = setInterval(() => {
      setPunishTime(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [punishTime]);

  // Keyboard listeners for 1-4 and Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        if (answeredIdx !== null && punishTime === null) {
          e.preventDefault();
          nextQuestion();
        }
        return;
      }

      if (answeredIdx === null && punishTime === null && !isFinished) {
        if (e.key >= '1' && e.key <= '4') {
          const idx = parseInt(e.key) - 1;
          const currentQ = oddData[step];
          if (currentQ && idx < currentQ.options.length) {
            handleOptionClick(idx);
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const nextQuestion = () => {
    setAnsweredIdx(null);
    setPunishTime(null);
    
    if (step + 1 >= oddData.length) {
      setIsFinished(true);
      onComplete(hits);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (answeredIdx !== null || punishTime !== null) return;
    setAnsweredIdx(idx);

    const currentQ = oddData[step];
    const opt = currentQ.options[idx];

    if (opt.isOdd) {
      playSound(true, soundEnabled);
      setHits(h => h + 1);
    } else {
      playSound(false, soundEnabled);
      onDamage(20);
      setPunishTime(5);
    }
  };

  if (!oddData || oddData.length === 0) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-purple-500/30 min-h-[300px] flex items-center justify-center text-slate-500 font-mono text-sm">
        [ DADOS TÁTICOS G5 INDISPONÍVEIS ]
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-purple-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-5xl mb-3">🕵️</div>
        <div className="text-purple-400 font-black text-xl">INFILTRAÇÃO CONTIDA!</div>
        <div className="text-sm font-mono text-gray-400 mt-2">
          Intrusos Detectados: <span className="text-emerald-400 font-bold">{hits}/{oddData.length}</span>
        </div>
      </div>
    );
  }

  const currentQ = oddData[step];

  return (
    <div className="bg-slate-950 p-5 rounded-xl border border-purple-500/30 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-md border border-purple-500/20">
          G5: O Infiltrado
        </span>
        <span className="text-xs font-mono font-bold text-gray-400">
          Alvo {step + 1}/{oddData.length}
        </span>
      </div>

      <div className="bg-slate-900 border-l-4 border-l-purple-500 p-4 rounded-r-lg mb-6 shadow-sm">
        <h3 className="text-sm text-purple-400 font-bold uppercase tracking-wider mb-1">Contexto</h3>
        <p className="text-white text-lg">{currentQ.theme}</p>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          const isSelected = answeredIdx === idx;
          const isAnswered = answeredIdx !== null;
          const isTrueOdd = opt.isOdd;
          
          let btnClass = 'w-full text-left p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-200 border border-slate-700 transition-colors flex items-center group';
          let badgeClass = 'mr-3 font-bold text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20 group-hover:bg-purple-500/20';

          if (isAnswered) {
            if (isSelected) {
              if (isTrueOdd) {
                // Correct hit!
                btnClass = 'w-full text-left p-4 rounded-lg text-sm transition-colors flex items-center bg-emerald-900/40 text-emerald-300 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
                badgeClass = 'mr-3 font-bold text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/50';
              } else {
                // Incorrect hit (clicked a valid one)
                btnClass = 'w-full text-left p-4 rounded-lg text-sm transition-colors flex items-center bg-red-900/40 text-red-300 border border-red-500';
                badgeClass = 'mr-3 font-bold text-red-400 bg-red-900/50 px-2 py-0.5 rounded border border-red-500/50';
              }
            } else if (isTrueOdd) {
              // Not selected, but was the true odd one (show to user)
              btnClass = 'w-full text-left p-4 rounded-lg text-sm transition-colors flex items-center bg-emerald-900/20 text-emerald-400 border border-emerald-500/50 animate-pulse';
              badgeClass = 'mr-3 font-bold text-emerald-500 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/40';
            } else {
              // Not selected, regular item
              btnClass = 'w-full text-left p-4 bg-slate-800/50 rounded-lg text-sm text-gray-500 border border-slate-700/50 transition-colors flex items-center opacity-40 cursor-not-allowed';
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
              
              {isAnswered && (isSelected || isTrueOdd) && (
                <div className={`p-3 text-sm rounded-lg font-medium ml-10 border-l-2 ${isTrueOdd ? 'border-emerald-500 text-emerald-200/80 bg-emerald-950/20' : 'border-red-500 text-red-200/80 bg-red-950/20'}`}>
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {answeredIdx !== null && (
        <div className="mt-6 flex justify-end">
          {punishTime !== null ? (
            <div className="bg-red-950/60 px-4 py-2 rounded border border-red-500/40 animate-pulse flex items-center gap-2">
              <span className="text-red-400 font-bold text-xs uppercase">Analisando erro...</span>
              <span className="text-white font-mono">{punishTime}s</span>
            </div>
          ) : (
            <button 
              onClick={nextQuestion}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-purple-500/20"
            >
              Avançar ➔ (Espaço)
            </button>
          )}
        </div>
      )}
    </div>
  );
};
