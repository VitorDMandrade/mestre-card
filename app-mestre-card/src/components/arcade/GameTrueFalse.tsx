import { useState, useEffect } from 'react';
import { playSound, playDamageSound, playClickSound } from '../../lib/audio';

export interface TrueFalseQuestion {
  statement: string;
  isTrue: boolean;
  feedback: string;
}

interface GameTrueFalseProps {
  tfData: TrueFalseQuestion[];
  soundEnabled: boolean;
  onDamage: (amount: number) => void;
  onComplete: (timeSaved: number) => void;
  onError?: (error: { prompt: string; userWrongAnswer: string; explanation: string }) => void;
}

export const GameTrueFalse = ({ tfData, soundEnabled, onDamage, onComplete, onError }: GameTrueFalseProps) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTimeSaved, setTotalTimeSaved] = useState(0);
  
  const [punishTime, setPunishTime] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null); // null = answering, true = correct, false = incorrect
  const [isFinished, setIsFinished] = useState(false);

  // Main Timer (15s)
  useEffect(() => {
    if (!hasStarted || isFinished || showFeedback !== null || punishTime !== null) return;
    
    if (timeLeft <= 0) {
      handleAnswer(null); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isFinished, showFeedback, punishTime, timeLeft]);

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

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (!hasStarted) return;

      if (e.code === 'Space') {
        if (showFeedback !== null && punishTime === null) {
          e.preventDefault();
          nextQuestion();
        }
        return;
      }

      if (showFeedback === null && punishTime === null) {
        const key = e.key.toLowerCase();
        if (key === 'v') {
          handleAnswer(true);
        } else if (key === 'f') {
          handleAnswer(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const nextQuestion = () => {
    playClickSound(soundEnabled);
    setShowFeedback(null);
    setTimeLeft(15);
    
    if (step + 1 >= tfData.length) {
      setIsFinished(true);
      onComplete(totalTimeSaved);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleAnswer = (answer: boolean | null) => {
    const currentQ = tfData[step];
    const isCorrect = answer === currentQ.isTrue;

    if (isCorrect) {
      playSound(true, soundEnabled);
      setShowFeedback(true);
      setTotalTimeSaved(prev => prev + timeLeft);
    } else {
      playDamageSound(soundEnabled);
      setShowFeedback(false);
      onDamage(20);
      onError?.({
        prompt: currentQ.statement,
        userWrongAnswer: answer === null ? 'Tempo Esgotado' : (answer ? 'Verdadeiro' : 'Falso'),
        explanation: currentQ.feedback
      });
      setPunishTime(5); // 5s lockout
    }
  };

  if (!tfData || tfData.length === 0) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-red-500/30 min-h-[300px] flex items-center justify-center text-slate-500 font-mono text-sm">
        [ DADOS TÁTICOS G3 INDISPONÍVEIS ]
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-red-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-5xl mb-3">⚡</div>
        <div className="text-red-400 font-black text-xl">PRESSÃO SOBREVIVIDA!</div>
        <div className="text-sm font-mono text-gray-400 mt-2">
          <span>Tempo Total Poupado: </span>
          <span className="text-emerald-400 font-bold">{totalTimeSaved}s</span>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-red-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <h3 className="text-red-400 font-bold text-xl mb-4">G3: Pressão TRI</h3>
        <p className="text-gray-400 text-sm mb-8 text-center max-w-sm">
          Você terá exatos 15 segundos por afirmação. Julgue rapidamente usando <kbd className="bg-slate-800 px-2 py-1 rounded font-mono">V</kbd> ou <kbd className="bg-slate-800 px-2 py-1 rounded font-mono">F</kbd>. O tempo poupado será convertido em bônus.
        </p>
        <button 
          onClick={() => {
            playClickSound(soundEnabled);
            setHasStarted(true);
          }}
          className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95"
        >
          Iniciar Pressão TRI
        </button>
      </div>
    );
  }

  const currentQ = tfData[step];
  const progressPct = (timeLeft / 15) * 100;
  const isCritical = timeLeft <= 4;

  return (
    <div className={`bg-slate-950 p-5 rounded-xl border transition-all duration-300 min-h-[300px] flex flex-col ${isCritical ? 'border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.2)]' : 'border-red-500/30'}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-md border border-red-500/20">
          Afirmação {step + 1}/{tfData.length}
        </span>
        <div className="flex items-center gap-3">
          {isCritical && (
            <span className="text-[10px] font-mono uppercase font-bold text-red-400 bg-red-950/80 border border-red-500/60 px-2 py-0.5 rounded animate-pulse">
              ⚠️ TEMPO CRÍTICO
            </span>
          )}
          <span className="text-xs font-mono font-bold text-gray-400">
            Tempo Poupado: <span className="text-emerald-400">{totalTimeSaved}s</span>
          </span>
        </div>
      </div>
      
      {/* Timer Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden border border-slate-700/50">
        <div 
          className={`h-full transition-all duration-1000 linear ${isCritical ? 'bg-gradient-to-r from-red-600 to-rose-500 animate-pulse' : 'bg-red-500'}`} 
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-xs font-mono font-bold mb-6">
        <span className="text-slate-500">GATILHO 15s</span>
        <span className={`transition-all ${isCritical ? 'text-red-400 font-black text-sm animate-pulse' : 'text-gray-400'}`}>
          {timeLeft}s
        </span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h3 className="text-xl text-white font-bold text-center px-4 leading-relaxed">
          "{currentQ.statement}"
        </h3>
      </div>

      {showFeedback === null ? (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleAnswer(true)}
            className={`p-4 bg-slate-900/90 hover:bg-emerald-950/60 rounded-xl border transition-all text-white font-bold flex flex-col items-center gap-2 group hover:scale-[1.02] active:scale-95 ${isCritical ? 'border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-700 hover:border-emerald-500/50'}`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✅</span>
            <span className="font-mono text-sm tracking-wider">VERDADEIRO (V)</span>
          </button>
          <button 
            onClick={() => handleAnswer(false)}
            className={`p-4 bg-slate-900/90 hover:bg-red-950/60 rounded-xl border transition-all text-white font-bold flex flex-col items-center gap-2 group hover:scale-[1.02] active:scale-95 ${isCritical ? 'border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-700 hover:border-red-500/50'}`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">❌</span>
            <span className="font-mono text-sm tracking-wider">FALSO (F)</span>
          </button>
        </div>
      ) : (
        <div className={`p-4 rounded-xl border ${showFeedback ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-red-900/20 border-red-500/30'}`}>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{showFeedback ? '✅' : '❌'}</span>
            <span className={`font-bold ${showFeedback ? 'text-emerald-400' : 'text-red-400'}`}>
              {showFeedback ? 'Gabarito Exato!' : (timeLeft === 0 ? 'Tempo Esgotado!' : 'Incorreto!')}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            {currentQ.feedback}
          </p>

          {punishTime !== null ? (
            <div className="bg-red-950/60 p-3 rounded border border-red-500/40 text-center animate-pulse">
              <span className="text-red-400 font-bold text-sm block mb-1">Sobrecarga Cognitiva (Lockout)</span>
              <span className="text-white font-mono">{punishTime}s restantes</span>
            </div>
          ) : (
            <button 
              onClick={nextQuestion}
              className={`w-full py-3 rounded-lg font-bold text-white text-sm transition-colors ${showFeedback ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              Avançar ➔ (Espaço)
            </button>
          )}
        </div>
      )}
    </div>
  );
};
