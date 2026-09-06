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

      {/* Bento Grid Assimétrico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Coluna de Destaque (2 colunas no desktop): Mnemônicos Agrupados & Acrônimos Dissecados */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">💡</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">
                MNEMÔNICOS & ÂNCORAS COGNITIVAS
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
              {radar.mnemonics.length} ÂNCORAS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {radar.mnemonics.map((mn, i) => (
              <div 
                key={i} 
                className={`bg-slate-900/90 border p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] ${
                  i === 0 
                    ? 'border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.12)] bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900' 
                    : i === 1 
                      ? 'border-sky-500/60 shadow-[0_0_15px_rgba(14,165,233,0.12)] bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900' 
                      : 'border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.12)] bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      GATILHO MNEMÔNICO 0{i+1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  </div>
                  <h4 className="text-sm font-black text-white uppercase mb-2">{mn.title}</h4>
                  <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 mb-3 font-mono tracking-wider drop-shadow-sm">
                    {mn.trigger}
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-2.5">
                  <MathRenderer content={mn.rule} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de Perigo (1 coluna no desktop): Os 2 Pontos Cegos TRI em containers avermelhados */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center justify-between gap-2 bg-red-950/40 border border-red-500/40 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-mono text-sm animate-pulse">⚠️</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-red-300 font-mono">
                PONTOS CEGOS TRI
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-red-950 text-red-400 border border-red-500/40 px-2 py-0.5 rounded">
              ALTA ATENÇÃO
            </span>
          </div>

          <div className="space-y-3">
            {radar.blindSpots.map((spot, i) => (
              <div 
                key={i} 
                className="bg-red-950/20 border border-red-500/40 p-4 rounded-xl relative overflow-hidden group shadow-[0_0_15px_rgba(239,68,68,0.12)] hover:border-red-500/60 transition-all"
              >
                <div className="absolute top-0 right-0 w-12 h-12 rounded-bl-full bg-red-900/20 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <span className="text-sm">⚠️</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-red-400">
                    {spot.title}
                  </h4>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm leading-relaxed relative z-10">
                  <MathRenderer content={spot.analysis} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base Tática (largura total: md:col-span-3): Radar de Palavras-Gatilho */}
        <div className="md:col-span-3 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg mt-2">
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
              <span className="text-blue-500">🎯</span> RADAR DE PALAVRAS-GATILHO // DECODIFICAÇÃO DE ENUNCIADO
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded">
              Toque para decodificar
            </span>
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
      </div>
    </section>
  );
};
