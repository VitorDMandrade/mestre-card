import { useState } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';

interface TheorySectionProps {
  card: MestreCardData;
}

export const TheorySection = ({ card }: TheorySectionProps) => {
  const [activeRoute, setActiveRoute] = useState<string>(card.sec02_theory.triagePatterns[0]?.id || 'route-a');

  const activePattern = card.sec02_theory.triagePatterns.find(p => p.id === activeRoute);

  return (
    <>
      {/* SEC 01 - Header TRI & Eixos */}
      <section id="sec-01" className="mb-12 scroll-mt-24">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-500/50 px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span className="text-blue-400 font-bold font-mono text-sm">INCIDÊNCIA TRI:</span>
            <span className="text-white font-black uppercase tracking-widest">{card.sec01_header.triWeight}</span>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {card.sec01_header.skills.map(skill => (
              <div key={skill.id} className="bg-slate-800 border border-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 group relative cursor-help">
                <span className="text-emerald-400 font-bold font-mono text-sm">{skill.id}</span>
                <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 bg-slate-900 border border-slate-700 p-2 text-xs text-gray-300 rounded shadow-xl z-10">
                  {skill.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {card.sec01_header.thematicAxes.map((axis, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold font-mono text-sm border border-blue-500/20 flex-shrink-0">
                E{i+1}
              </div>
              <span className="text-gray-300 text-sm font-medium leading-tight">{axis}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEC 02 - Dossiê & Árvore de Triagem */}
      <section id="sec-02" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
          <span className="text-blue-500">02.</span> DOSSIÊ TEÓRICO
        </h2>

        {/* Blocos de Dossiê */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {card.sec02_theory.blocks.map((block) => (
            <div key={block.number} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
              <div className="absolute top-0 right-0 bg-blue-900/20 text-blue-500/30 font-black text-6xl -mt-4 -mr-2 select-none pointer-events-none group-hover:text-blue-500/40 transition-colors">
                {String(block.number).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-3 relative z-10">{block.title}</h3>
              <div className="text-gray-300 leading-relaxed text-sm md:text-base relative z-10">
                <MathRenderer content={block.content} />
              </div>
              {block.highlight && (
                <div className="mt-4 p-3 bg-blue-950/40 border-l-2 border-blue-500 text-blue-200 text-sm font-mono relative z-10">
                  <MathRenderer content={block.highlight} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Árvore de Triagem */}
        {card.sec02_theory.triagePatterns.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-950 border-b border-slate-800 p-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-emerald-500">⚡</span> ÁRVORE DE TRIAGEM TÁTICA
              </h3>
            </div>
            
            <div className="flex border-b border-slate-800 bg-slate-900/50">
              {card.sec02_theory.triagePatterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => setActiveRoute(pattern.id)}
                  className={`flex-1 py-4 px-2 text-center font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${
                    activeRoute === pattern.id 
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
                      : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>

            {activePattern && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="text-xs font-black text-amber-500 mb-2 uppercase tracking-widest">Sinal de Reconhecimento</div>
                  <div className="text-gray-200 font-medium">
                    <MathRenderer content={activePattern.trigger15s} />
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-5 border border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                  <div className="text-xs font-black text-emerald-500 mb-2 uppercase tracking-widest">Algoritmo (Passo a Passo)</div>
                  <ul className="space-y-2">
                    {activePattern.algorithm.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <span className="text-emerald-600 font-mono font-bold">{i+1}.</span>
                        <span><MathRenderer content={step} /></span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-5 border border-red-900/30">
                  <div className="text-xs font-black text-red-400 mb-2 uppercase tracking-widest">Distratores Clássicos</div>
                  <div className="text-gray-300 text-sm">
                    <MathRenderer content={activePattern.distractors} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
