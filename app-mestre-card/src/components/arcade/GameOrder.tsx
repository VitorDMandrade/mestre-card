import { useState, useEffect } from 'react';
import { playSound } from '../../lib/audio';

export interface OrderItem {
  id: string;
  step: string;
  explanation: string;
}

interface GameOrderProps {
  orderData: OrderItem[];
  soundEnabled: boolean;
  onDamage: (amount: number) => void;
  onComplete: (attempts: number) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const GameOrder = ({ orderData, soundEnabled, onDamage, onComplete }: GameOrderProps) => {
  const [shuffledItems, setShuffledItems] = useState<OrderItem[]>([]);
  const [assembledItems, setAssembledItems] = useState<OrderItem[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [isErrorBlink, setIsErrorBlink] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize and shuffle once on mount/data change
  useEffect(() => {
    if (orderData && orderData.length > 0) {
      setShuffledItems(shuffleArray(orderData));
      setAssembledItems([]);
      setAttempts(1);
    }
  }, [orderData]);

  const handleItemClick = (item: OrderItem) => {
    if (isFinished || isErrorBlink) return;

    // Check if this is the correct next step
    // The expected next item is orderData[assembledItems.length]
    const expectedItem = orderData[assembledItems.length];

    if (item.id === expectedItem.id) {
      // Correct!
      playSound(true, soundEnabled);
      const newAssembled = [...assembledItems, item];
      setAssembledItems(newAssembled);
      setShuffledItems(prev => prev.filter(i => i.id !== item.id));

      if (newAssembled.length === orderData.length) {
        setIsFinished(true);
        onComplete(attempts);
      }
    } else {
      // Incorrect!
      playSound(false, soundEnabled);
      onDamage(20);
      setAttempts(a => a + 1);
      setIsErrorBlink(true);
      
      // Reset sequence
      setTimeout(() => {
        setAssembledItems([]);
        setShuffledItems(shuffleArray(orderData));
        setIsErrorBlink(false);
      }, 800);
    }
  };

  if (!orderData || orderData.length === 0) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 min-h-[300px] flex items-center justify-center text-slate-500 font-mono text-sm">
        [ DADOS TÁTICOS G4 INDISPONÍVEIS ]
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-5xl mb-3">🧩</div>
        <div className="text-amber-400 font-black text-xl">SEQUÊNCIA DOMINADA!</div>
        <div className="text-sm font-mono text-gray-400 mt-2">
          <span>Tentativas necessárias: </span>
          <span className="text-white font-bold">{attempts}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-950 p-5 rounded-xl border min-h-[400px] transition-colors duration-300 flex flex-col ${isErrorBlink ? 'border-red-500 bg-red-950/20' : 'border-amber-500/30'}`}>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-500/20">
          G4: Ordenação Tática
        </span>
        <span className="text-xs font-mono font-bold text-gray-400">
          Tentativa: <span className="text-white">{attempts}</span>
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Clique nos blocos abaixo na ordem exata do processo. Um clique incorreto destrói a cadeia inteira.
      </p>

      {/* Available Items */}
      <div className="flex flex-wrap gap-3 mb-8 min-h-[120px] content-start p-4 bg-slate-900/50 rounded-lg border border-slate-800">
        {shuffledItems.length === 0 && !isErrorBlink && (
          <span className="text-slate-500 text-sm italic w-full text-center py-4">Nenhum item restante.</span>
        )}
        {shuffledItems.map((item) => (
          <button
            key={`avail-${item.id}`}
            onClick={() => handleItemClick(item)}
            disabled={isErrorBlink}
            className={`px-4 py-3 bg-slate-800 hover:bg-slate-700 text-sm text-gray-200 border border-slate-700 rounded-lg shadow-sm transition-all text-left ${isErrorBlink ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-md hover:border-amber-500/50'}`}
          >
            {item.step}
          </button>
        ))}
      </div>

      {/* Assembled Sequence */}
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
        Sua Sequência ({assembledItems.length}/{orderData.length})
      </h3>
      
      <div className="flex flex-col gap-2 flex-1">
        {assembledItems.length === 0 && (
          <div className="flex-1 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 text-sm">
            Clique no primeiro elemento acima...
          </div>
        )}
        {assembledItems.map((item, index) => (
          <div 
            key={`ass-${item.id}`}
            className="w-full flex items-center gap-3 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg animate-fade-in"
          >
            <span className="w-8 h-8 rounded bg-emerald-900/60 text-emerald-400 font-black flex items-center justify-center border border-emerald-500/40 shrink-0">
              {index + 1}
            </span>
            <span className="text-emerald-100 text-sm font-medium">
              {item.step}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
