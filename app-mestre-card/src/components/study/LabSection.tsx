import { useState, useEffect } from 'react';
import type { LabQuestion, BossFight } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { playSound, playDamageSound, playVictorySound } from '../../lib/audio';

interface LabSectionProps {
  questions: LabQuestion[];
  hardcoreQuestions?: LabQuestion[];
  bossFight: BossFight;
  isHardcore: boolean;
  soundEnabled: boolean;
  onApplyDamage: (amount: number) => void;
}

export const LabSection = ({ questions, hardcoreQuestions, bossFight, isHardcore, soundEnabled, onApplyDamage }: LabSectionProps) => {
  const [answeredQs, setAnsweredQs] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const hasHardcore = Array.isArray(hardcoreQuestions) && hardcoreQuestions.length > 0;
  const [selectedTab, setSelectedTab] = useState<'standard' | 'hardcore'>(isHardcore && hasHardcore ? 'hardcore' : 'standard');

  // Synchronize tab when isHardcore toggles in StudyHUD
  useEffect(() => {
    if (isHardcore && hasHardcore) {
      setSelectedTab('hardcore');
    } else if (!isHardcore) {
      setSelectedTab('standard');
    }
  }, [isHardcore, hasHardcore]);

  const activeQuestions = selectedTab === 'hardcore' && hasHardcore ? hardcoreQuestions : questions;
  const isViewingHardcore = selectedTab === 'hardcore' && hasHardcore;
  
  const handleAnswer = (questionId: string, letter: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    if (answeredQs[questionId]) return; // Already answered
    
    setAnsweredQs(prev => ({ ...prev, [questionId]: letter }));
    
    if (isCorrect) {
      if (questionId === 'boss') {
        playVictorySound(soundEnabled);
      } else {
        playSound(true, soundEnabled);
      }
    } else {
      if (isHardcore) {
        playDamageSound(soundEnabled);
        onApplyDamage(20);
      } else {
        playSound(false, soundEnabled);
      }
    }
  };

  return (
    <section id="sec-05" className="mb-12 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="text-blue-500">05.</span> LABORATÓRIO PRÁTICO
        </h2>

        {hasHardcore && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTab('standard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                !isViewingHardcore
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Padrão ({questions.length})
            </button>
            <button
              onClick={() => setSelectedTab('hardcore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
                isViewingHardcore
                  ? 'bg-red-600/20 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>⚡</span>
              <span>Hardcore 2ª Fase ({hardcoreQuestions?.length || 0})</span>
            </button>
          </div>
        )}
      </div>

      {/* Hardcore Active Notice Banner */}
      {isHardcore && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[10px] font-extrabold tracking-wider border border-red-500/40">
                  MODO HARDCORE ATIVO
                </span>
                <span className="text-white text-xs sm:text-sm font-bold">
                  {isViewingHardcore ? 'BATERIA 2ª FASE (FUVEST / UNICAMP)' : 'PENALIDADE REAL DE DANO ATIVA'}
                </span>
              </div>
              <p className="text-xs text-red-300/80 font-mono mt-0.5">
                {isViewingHardcore
                  ? 'Questões conteudistas de alto rigor analítico. Cada erro drena 20 HP do HUD.'
                  : 'Modo Hardcore habilitado: cada erro drena 20 HP da sua barra de integridade.'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-red-400 bg-red-950/60 px-2.5 py-1 rounded border border-red-800/40">
            DANO: -20 HP / ERRO
          </span>
        </div>
      )}

      <div className="space-y-8">
        {activeQuestions.map((q, i) => {
          const answeredLetter = answeredQs[q.id];
          const isAnswered = !!answeredLetter;

          return (
            <div key={q.id} className={`bg-slate-900 border rounded-2xl p-6 transition-all ${
              isViewingHardcore 
                ? 'border-red-900/60 hover:border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.08)]' 
                : 'border-slate-700/80 hover:border-slate-600'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`font-bold font-mono px-3 py-1 rounded text-sm border ${
                    isViewingHardcore
                      ? 'bg-red-900/40 text-red-400 border-red-500/40'
                      : 'bg-blue-900/30 text-blue-400 border-blue-500/20'
                  }`}>
                    Q{String(i+1).padStart(2, '0')}{isViewingHardcore ? ' HC' : ''}
                  </div>
                  <div className={`text-sm font-medium ${isViewingHardcore ? 'text-red-300/90' : 'text-slate-400'}`}>
                    {isViewingHardcore ? '⚡ 2ª Fase / Aprofundamento' : 'Treinamento Padrão'}
                  </div>
                </div>
                {isAnswered && (
                  <span className="text-xs font-mono text-slate-400">
                    {answeredLetter === q.options.find(o => o.isCorrect)?.letter 
                      ? <span className="text-emerald-400 font-bold">✓ ACERTOU</span> 
                      : <span className="text-red-400 font-bold">✗ ERROU</span>}
                  </span>
                )}
              </div>
              
              <div className="text-gray-200 mb-6 text-sm leading-relaxed">
                <MathRenderer content={q.enunciado} />
              </div>

              <div className="space-y-3 mb-6">
                {q.options.map(opt => {
                  const isSelected = answeredLetter === opt.letter;
                  let btnClass = "border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 text-gray-300";
                  
                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.01]";
                    } else if (isSelected && !opt.isCorrect) {
                      btnClass = "border-red-500 bg-red-950/40 text-red-300 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                    } else {
                      btnClass = "border-slate-800 opacity-40 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={opt.letter}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(q.id, opt.letter, opt.isCorrect)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${btnClass}`}
                    >
                      <div className="flex items-center gap-2 font-bold font-mono mt-0.5 flex-shrink-0">
                        <span>{opt.letter})</span>
                        {isAnswered && opt.isCorrect && <span className="text-emerald-400 text-xs">✓</span>}
                        {isAnswered && isSelected && !opt.isCorrect && <span className="text-red-400 text-xs">✗</span>}
                      </div>
                      <span className="text-sm leading-relaxed"><MathRenderer content={opt.text} /></span>
                    </button>
                  );
                })}
              </div>

              <details open={isAnswered} className="group bg-slate-950 rounded-xl border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-4 cursor-pointer font-bold text-slate-400 flex items-center justify-between select-none hover:text-white transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="text-blue-500">🔬</span> PARECER TÉCNICO
                  </span>
                  <span className="text-slate-600 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-slate-800 bg-slate-900/50 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-emerald-500 mb-2 uppercase tracking-widest flex items-center gap-1.5">
                      <span>✓</span> Veredito
                    </h4>
                    <div className="text-sm text-gray-300"><MathRenderer content={q.resolution.technicalVerdict} /></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-500 mb-2 uppercase tracking-widest flex items-center gap-1.5">
                      <span>⚠️</span> Análise de Distratores
                    </h4>
                    <div className="text-sm text-gray-300"><MathRenderer content={q.resolution.distractorAnalysis} /></div>
                  </div>
                </div>
              </details>
            </div>
          );
        })}

        {/* Boss Fight */}
        {bossFight && (
          <div className="bg-slate-900/90 border-2 border-red-900/60 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_35px_rgba(220,38,38,0.15)] transition-all">
            <div className="absolute top-0 right-0 bg-red-900/20 text-red-500/15 font-black text-8xl -mt-6 -mr-2 select-none pointer-events-none">
              BOSS
            </div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-red-900/40 text-red-400 font-bold font-mono px-3 py-1 rounded border border-red-500/40 text-sm animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  BOSS FIGHT
                </div>
                <div className="text-red-400 font-bold text-lg">{bossFight.title}</div>
              </div>
              {answeredQs['boss'] && (
                <span className="text-xs font-mono">
                  {answeredQs['boss'] === bossFight.options.find(o => o.isCorrect)?.letter 
                    ? <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">🏆 BOSS DERROTADO</span> 
                    : <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-bold">💀 DANO CRÍTICO</span>}
                </span>
              )}
            </div>
            
            <div className="text-gray-200 mb-6 text-sm leading-relaxed relative z-10">
              <MathRenderer content={bossFight.context} />
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              {bossFight.options.map(opt => {
                const isAnswered = !!answeredQs['boss'];
                const isSelected = answeredQs['boss'] === opt.letter;
                let btnClass = "border-slate-700/80 hover:border-red-500/50 hover:bg-slate-800 text-gray-300";
                
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]";
                  } else if (isSelected && !opt.isCorrect) {
                    btnClass = "border-red-500 bg-red-950/40 text-red-300 animate-shake shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                  } else {
                    btnClass = "border-slate-800 opacity-40 text-slate-500";
                  }
                }

                return (
                  <button
                    key={opt.letter}
                    disabled={isAnswered}
                    onClick={() => handleAnswer('boss', opt.letter, opt.isCorrect)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${btnClass}`}
                  >
                    <div className="flex items-center gap-2 font-bold font-mono mt-0.5 flex-shrink-0">
                      <span>{opt.letter})</span>
                      {isAnswered && opt.isCorrect && <span className="text-emerald-400 text-xs">✓</span>}
                      {isAnswered && isSelected && !opt.isCorrect && <span className="text-red-400 text-xs">✗</span>}
                    </div>
                    <span className="text-sm leading-relaxed"><MathRenderer content={opt.text} /></span>
                  </button>
                );
              })}
            </div>

            <details open={!!answeredQs['boss']} className="group bg-slate-950 rounded-xl border border-red-900/50 overflow-hidden relative z-10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="p-4 cursor-pointer font-bold text-red-400 flex items-center justify-between select-none hover:text-red-300 transition-colors">
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



