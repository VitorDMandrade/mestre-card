import { useState } from 'react';
import type { LabQuestion, BossFight } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { playSound } from '../../lib/audio';

interface LabSectionProps {
  questions: LabQuestion[];
  bossFight: BossFight;
  isHardcore: boolean;
  soundEnabled: boolean;
  onApplyDamage: (amount: number) => void;
}

export const LabSection = ({ questions, bossFight, isHardcore, soundEnabled, onApplyDamage }: LabSectionProps) => {
  const [answeredQs, setAnsweredQs] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  
  const handleAnswer = (questionId: string, letter: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    if (answeredQs[questionId]) return; // Already answered
    
    setAnsweredQs(prev => ({ ...prev, [questionId]: letter }));
    
    if (soundEnabled) {
      playSound(isCorrect);
    }
    
    if (!isCorrect && isHardcore) {
      onApplyDamage(20);
    }
  };

  return (
    <section id="sec-05" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <span className="text-blue-500">05.</span> LABORATÓRIO PRÁTICO
      </h2>

      <div className="space-y-8">
        {questions.map((q, i) => {
          const answeredLetter = answeredQs[q.id];
          const isAnswered = !!answeredLetter;

          return (
            <div key={q.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-900/30 text-blue-400 font-bold font-mono px-3 py-1 rounded border border-blue-500/20 text-sm">
                  Q{String(i+1).padStart(2, '0')}
                </div>
                <div className="text-slate-400 text-sm">Treinamento Padrão</div>
              </div>
              
              <div className="text-gray-200 mb-6 text-sm leading-relaxed">
                <MathRenderer content={q.enunciado} />
              </div>

              <div className="space-y-3 mb-6">
                {q.options.map(opt => {
                  const isSelected = answeredLetter === opt.letter;
                  let btnClass = "border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-gray-300";
                  
                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnClass = "border-emerald-500 bg-emerald-900/20 text-emerald-300";
                    } else if (isSelected && !opt.isCorrect) {
                      btnClass = "border-red-500 bg-red-900/20 text-red-300";
                    } else {
                      btnClass = "border-slate-800 opacity-50 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={opt.letter}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(q.id, opt.letter, opt.isCorrect)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${btnClass}`}
                    >
                      <span className="font-bold font-mono mt-0.5">{opt.letter})</span>
                      <span className="text-sm"><MathRenderer content={opt.text} /></span>
                    </button>
                  );
                })}
              </div>

              <details open={isAnswered} className="group bg-slate-950 rounded-xl border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-4 cursor-pointer font-bold text-slate-400 flex items-center justify-between select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-blue-500">🔬</span> PARECER TÉCNICO
                  </span>
                  <span className="text-slate-600 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-slate-800 bg-slate-900/50 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-emerald-500 mb-2 uppercase tracking-widest">Veredito</h4>
                    <div className="text-sm text-gray-300"><MathRenderer content={q.resolution.technicalVerdict} /></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-500 mb-2 uppercase tracking-widest">Análise de Distratores</h4>
                    <div className="text-sm text-gray-300"><MathRenderer content={q.resolution.distractorAnalysis} /></div>
                  </div>
                </div>
              </details>
            </div>
          );
        })}

        {/* Boss Fight */}
        {bossFight && (
          <div className="bg-slate-900/90 border-2 border-red-900/50 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)]">
            <div className="absolute top-0 right-0 bg-red-900/30 text-red-500/20 font-black text-8xl -mt-6 -mr-2 select-none pointer-events-none">
              BOSS
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-red-900/30 text-red-400 font-bold font-mono px-3 py-1 rounded border border-red-500/30 text-sm animate-pulse">
                BOSS FIGHT
              </div>
              <div className="text-red-400 font-bold text-lg">{bossFight.title}</div>
            </div>
            
            <div className="text-gray-200 mb-6 text-sm leading-relaxed relative z-10">
              <MathRenderer content={bossFight.context} />
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              {bossFight.options.map(opt => {
                const isAnswered = !!answeredQs['boss'];
                const isSelected = answeredQs['boss'] === opt.letter;
                let btnClass = "border-slate-700 hover:border-red-500/50 hover:bg-slate-800 text-gray-300";
                
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnClass = "border-emerald-500 bg-emerald-900/20 text-emerald-300";
                  } else if (isSelected && !opt.isCorrect) {
                    btnClass = "border-red-500 bg-red-900/20 text-red-300";
                  } else {
                    btnClass = "border-slate-800 opacity-50 text-slate-500";
                  }
                }

                return (
                  <button
                    key={opt.letter}
                    disabled={isAnswered}
                    onClick={() => handleAnswer('boss', opt.letter, opt.isCorrect)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${btnClass}`}
                  >
                    <span className="font-bold font-mono mt-0.5">{opt.letter})</span>
                    <span className="text-sm"><MathRenderer content={opt.text} /></span>
                  </button>
                );
              })}
            </div>

            <details open={!!answeredQs['boss']} className="group bg-slate-950 rounded-xl border border-red-900/50 overflow-hidden relative z-10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="p-4 cursor-pointer font-bold text-red-400 flex items-center justify-between select-none">
                <span className="flex items-center gap-2">
                  <span className="text-red-500">⚔️</span> RESOLUÇÃO DO BOSS
                </span>
                <span className="text-red-600 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-5 border-t border-red-900/30 bg-slate-900/80">
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"><MathRenderer content={bossFight.stepByStepResolution} /></div>
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  );
};
