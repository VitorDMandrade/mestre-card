import { useState } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { playSound } from '../../lib/audio';

interface RadarSectionProps {
  card: MestreCardData;
  soundEnabled: boolean;
}

export const RadarSection = ({ card, soundEnabled }: RadarSectionProps) => {
  const [revealedTriggers, setRevealedTriggers] = useState<Set<number>>(new Set());

  const handleRevealTrigger = (index: number) => {
    if (!revealedTriggers.has(index)) {
      setRevealedTriggers(new Set([...revealedTriggers, index]));
      if (soundEnabled) {
        playSound(true); // Toca som de acerto/reveal
      }
    }
  };

  const radar = card.sec04_radar;

  return (
    <section id="sec-04" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <span className="text-blue-500">04.</span> RADAR DE GATILHOS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Mnemônicos */}
        <div className="space-y-4">
          {radar.mnemonics.map((mn, i) => (
            <div key={i} className={`bg-slate-900 border p-5 rounded-2xl ${
              i === 0 ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' :
              i === 1 ? 'border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]' :
              'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
            }`}>
              <h4 className="text-sm font-black text-white uppercase mb-1">{mn.title}</h4>
              <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 font-mono">
                {mn.trigger}
              </div>
              <div className="text-gray-400 text-sm"><MathRenderer content={mn.rule} /></div>
            </div>
          ))}
        </div>

        {/* Pontos Cegos TRI */}
        <div className="space-y-4">
          {radar.blindSpots.map((spot, i) => (
            <div key={i} className={`bg-slate-900/80 border p-5 rounded-2xl relative overflow-hidden group ${
              i === 0 ? 'border-red-900/60' : 'border-amber-900/60'
            }`}>
              <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${
                i === 0 ? 'bg-red-900/20' : 'bg-amber-900/20'
              }`}></div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span className="text-xl">⚠️</span>
                <h4 className={`text-sm font-black uppercase ${i === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                  {spot.title}
                </h4>
              </div>
              <div className="text-gray-300 text-sm relative z-10">
                <MathRenderer content={spot.analysis} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Words com Blur Interativo */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-blue-500">🎯</span> DECODIFICAÇÃO DE ENUNCIADO
          </h3>
          <span className="text-xs font-mono text-slate-500">Toque para revelar</span>
        </div>
        <div className="divide-y divide-slate-800">
          {radar.triggerWords.map((tw, i) => {
            const isRevealed = revealedTriggers.has(i);
            return (
              <div 
                key={i} 
                className="p-4 hover:bg-slate-800/50 transition-colors cursor-pointer group flex items-start gap-4"
                onClick={() => handleRevealTrigger(i)}
              >
                <div className="mt-1">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isRevealed 
                      ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' 
                      : 'bg-slate-700'
                  }`}></div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Se aparecer...</div>
                    <div className="text-blue-400 font-bold font-mono">"{tw.trigger}"</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">O contexto exige...</div>
                    <div className={`text-gray-300 text-sm transition-all duration-500 ${!isRevealed ? 'blur-sm select-none opacity-50' : ''}`}>
                      {tw.context}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">A pegadinha será...</div>
                    <div className={`text-red-400 text-sm transition-all duration-500 ${!isRevealed ? 'blur-sm select-none opacity-50' : ''}`}>
                      {tw.trap}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
