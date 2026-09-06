import { useState, useEffect } from 'react';
import { playSound } from '../../lib/audio';

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

interface GameMatchProps {
  matchData: MatchPair[];
  soundEnabled: boolean;
  onDamage: (amount: number) => void;
  onComplete: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const GameMatch = ({ matchData, soundEnabled, onDamage, onComplete }: GameMatchProps) => {
  const [leftCol, setLeftCol] = useState<MatchPair[]>([]);
  const [rightCol, setRightCol] = useState<MatchPair[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [errorIds, setErrorIds] = useState<[string, string] | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (matchData.length > 0) {
      setLeftCol(shuffleArray(matchData));
      setRightCol(shuffleArray(matchData));
    }
  }, [matchData]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        playSound(true, soundEnabled);
        const newMatched = new Set(matchedIds);
        newMatched.add(selectedLeft);
        setMatchedIds(newMatched);
        
        if (newMatched.size === matchData.length && matchData.length > 0) {
          setIsFinished(true);
          onComplete();
        }
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Error!
        playSound(false, soundEnabled);
        onDamage(20);
        setErrorIds([selectedLeft, selectedRight]);
        setSelectedLeft(null);
        setSelectedRight(null);
        
        setTimeout(() => {
          setErrorIds(null);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight, matchData.length, soundEnabled, onDamage, onComplete]);

  if (!matchData || matchData.length === 0) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 min-h-[300px] flex items-center justify-center text-slate-500 font-mono text-sm">
        [ DADOS TÁTICOS G2 INDISPONÍVEIS ]
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-5xl mb-3">🔗</div>
        <div className="text-emerald-400 font-black text-xl">CONEXÃO ESTABELECIDA!</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md border border-emerald-500/20">
          🔗 LIGAÇÕES: {matchedIds.size}/{matchData.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* Left Column (Terms) */}
        <div className="space-y-3">
          {leftCol.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeft === item.id;
            const isError = errorIds && errorIds[0] === item.id;

            let btnClass = "w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-200 border border-slate-700 transition-colors";
            
            if (isMatched) {
              btnClass = "w-full text-left p-3 bg-emerald-900/20 rounded-lg text-sm text-emerald-500 border border-emerald-500/20 opacity-50 cursor-default";
            } else if (isError) {
              btnClass = "w-full text-left p-3 bg-red-900/60 rounded-lg text-sm text-red-300 border border-red-500 transition-all";
            } else if (isSelected) {
              btnClass = "w-full text-left p-3 bg-emerald-900/60 rounded-lg text-sm text-emerald-300 border border-emerald-500 transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]";
            }

            return (
              <button 
                key={`L-${item.id}`}
                disabled={isMatched || errorIds !== null}
                onClick={() => setSelectedLeft(item.id)}
                className={btnClass}
              >
                {item.term}
              </button>
            );
          })}
        </div>

        {/* Right Column (Definitions) */}
        <div className="space-y-3">
          {rightCol.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedRight === item.id;
            const isError = errorIds && errorIds[1] === item.id;

            let btnClass = "w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-200 border border-slate-700 transition-colors";
            
            if (isMatched) {
              btnClass = "w-full text-left p-3 bg-emerald-900/20 rounded-lg text-sm text-emerald-500 border border-emerald-500/20 opacity-50 cursor-default";
            } else if (isError) {
              btnClass = "w-full text-left p-3 bg-red-900/60 rounded-lg text-sm text-red-300 border border-red-500 transition-all";
            } else if (isSelected) {
              btnClass = "w-full text-left p-3 bg-emerald-900/60 rounded-lg text-sm text-emerald-300 border border-emerald-500 transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]";
            }

            return (
              <button 
                key={`R-${item.id}`}
                disabled={isMatched || errorIds !== null}
                onClick={() => setSelectedRight(item.id)}
                className={btnClass}
              >
                {item.definition}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
