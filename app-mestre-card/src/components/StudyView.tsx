import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { MestreCardData } from '../types/mestre-card';
import { MathRenderer } from './MathRenderer';
import { ArcadeEngine } from './arcade/ArcadeEngine';
interface StudyViewProps {
  card: MestreCardData;
  onBack: () => void;
}

export const StudyView: FC<StudyViewProps> = ({ card, onBack }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col pb-8">
      
      {/* Header Fixo */}
      <div className="sticky top-0 z-50 bg-[#0a0f18]/90 backdrop-blur-md border-b border-slate-800/80 p-4 mb-8 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white font-mono text-sm tracking-widest transition-colors flex items-center gap-2">
            <span className="text-xl">←</span> RETORNAR AO QG
          </button>
          <div className="h-6 w-px bg-slate-800"></div>
          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold tracking-wider">
            {card.topic}
          </span>
          <h2 className="text-lg font-bold text-white hidden md:block">
            {card.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 font-mono hidden sm:block">TEMPO DE OPERAÇÃO</span>
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-emerald-400 font-mono font-bold glow-emerald">
            {formatTime(seconds)}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 px-4 md:px-8">
        
        {/* Sumário Lateral */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28 glass-card p-5 rounded-2xl border border-slate-700/50">
            <h3 className="text-xs font-mono font-bold text-slate-500 mb-4 tracking-widest uppercase">Índice Tático</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <button onClick={() => scrollTo('theory')} className="text-slate-300 hover:text-cyan-400 transition-colors w-full text-left">
                  1. Módulos Teóricos
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('lab')} className="text-slate-300 hover:text-amber-400 transition-colors w-full text-left">
                  2. Laboratório Prático
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('arcade')} className="text-slate-300 hover:text-red-400 transition-colors w-full text-left">
                  3. Pentágono Revisional
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Coluna Principal */}
        <div className="flex-1 max-w-3xl space-y-12">
          
          {/* Teoria */}
          <section id="theory" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/30">1</span>
              <h3 className="text-xl font-bold text-white">Módulos Teóricos</h3>
            </div>
            
            <div className="space-y-6">
              {(card.sec02_theory?.blocks || []).map((block, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl border border-slate-700/50">
                  <h4 className="text-md font-bold text-cyan-400 mb-4 border-b border-slate-800 pb-2">{block.title}</h4>
                  <MathRenderer content={block.content} />
                </div>
              ))}
            </div>
          </section>

          {/* Laboratório */}
          <section id="lab" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">2</span>
              <h3 className="text-xl font-bold text-white">Laboratório Prático</h3>
            </div>

            <div className="grid gap-4">
              {(card.sec05_lab?.questions || []).map((item, index) => (
                <div key={index} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 border-l-4 border-l-amber-500">
                  <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block mb-2">QUESTÃO {index + 1}</span>
                  <MathRenderer content={item.enunciado} />
                  <div className="mt-4 space-y-2">
                    {item.options.map((opt, oIdx) => (
                      <div key={oIdx} className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 flex gap-3">
                        <span className="font-bold text-amber-500">{opt.letter}</span>
                        <div className="flex-1"><MathRenderer content={opt.text} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Arcade Engine */}
          <div id="arcade" className="pb-20">
            <ArcadeEngine card={card} />
          </div>

        </div>
      </div>
    </div>
  );
};
