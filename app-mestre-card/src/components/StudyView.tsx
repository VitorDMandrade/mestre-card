import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { MestreCardData, StudySessionRecord } from '../types/mestre-card';
import { db } from '../lib/db';

import { StudyHUD, type StudyStage } from './study/StudyHUD';
import { TheorySection } from './study/TheorySection';
import { StructureSection } from './study/StructureSection';
import { RadarSection } from './study/RadarSection';
import { LabSection } from './study/LabSection';
import { RecallSection } from './study/RecallSection';
import { ArcadeEngine } from './arcade/ArcadeEngine';
import { ParticlesBurst } from './arcade/ParticlesBurst';
import { ErrorBoundary } from './ErrorBoundary';
import { ReadingProvider } from '../context/ReadingContext';
import { GameProvider, useGame } from '../context/GameContext';
import { XpToast } from './study/XpToast';

// Inner component that uses GameContext (must be inside GameProvider)
const ScreenFlashOverlay: FC = () => {
  const { screenFlash } = useGame();
  if (!screenFlash) return null;
  return (
    <div
      className={`fixed inset-0 z-[9995] pointer-events-none ${screenFlash === 'hit' ? 'screen-flash-hit' : 'screen-flash-miss'}`}
      aria-hidden="true"
    />
  );
};

interface StudyViewProps {
  card: MestreCardData;
  onBack: () => void;
  queueInfo?: { current: number; total: number; hasNext: boolean } | null;
  onNextQueueItem?: () => void;
  onOpenAcervoModal?: (query?: string, banca?: string) => void;
  onOpenConstellation?: () => void;
}

export const StudyView: FC<StudyViewProps> = ({ card, onBack, queueInfo, onNextQueueItem, onOpenAcervoModal, onOpenConstellation }) => {
  const [bestSession, setBestSession] = useState<StudySessionRecord | null>(null);
  
  // Lifted States
  const [hp, setHp] = useState(100);
  const [isHardcore, setIsHardcore] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');

  const loadTelemetry = async () => {
    try {
      const history = await db.getHistoryByCard(card.id);
      if (history.length > 0) {
        const maxScoreRecord = history.reduce((prev, curr) => (prev.score > curr.score ? prev : curr));
        setBestSession(maxScoreRecord);
      } else {
        setBestSession(null);
      }
    } catch (err) {
      console.error('Failed to load telemetry', err);
    }
  };

  useEffect(() => {
    loadTelemetry();
  }, [card.id]);

  const toggleHardcore = () => {
    setIsHardcore(!isHardcore);
    setHp(100);
  };

  const handleDamage = (amount: number) => {
    if (!isHardcore) return;
    setHp(prev => {
      const next = Math.max(0, prev - amount);
      if (next <= 0) {
        setTimeout(() => {
          alert("⚠️ COLAPSO DO SISTEMA! Seu HP zerou no Modo Sobrevivência. Recalibre a teoria e tente novamente.");
          setHp(100);
        }, 100);
        return 0;
      }
      return next;
    });
  };

  const [isZenMode, setIsZenMode] = useState(false);
  const [isOledMode, setIsOledMode] = useState(false);
  const [activeStage, setActiveStage] = useState<StudyStage>('teoria');

  const handleSelectStage = (stage: StudyStage) => {
    setActiveStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GameProvider>
      <ReadingProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isOledMode ? 'oled-mode bg-black' : 'bg-[#050810]'}`}>
        {/* Header Fixo Global de Navegação (Retornar) */}
        <div className={`border-b border-slate-800 p-4 flex items-center justify-between z-50 relative ${isOledMode ? 'bg-black' : 'bg-[#0a0f18]'}`}>
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm">
                <span className="text-base text-cyan-400">←</span> RETORNAR AO QG
              </button>
              <div className="h-6 w-px bg-slate-800"></div>
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                {card.topic}
              </span>
              <h1 className="text-lg font-bold text-white hidden md:block">
                {card.title}
              </h1>
            </div>

            {queueInfo && onNextQueueItem && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold hidden sm:inline">FILA TÁTICA:</span>
                <button
                  onClick={onNextQueueItem}
                  className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500 text-red-300 hover:bg-red-900 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{queueInfo.hasNext ? 'PRÓXIMO ALVO' : 'CONCLUIR FILA'}</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* HUD Tático (Fixo no topo da área de estudo com navegação de estágios) */}
        <StudyHUD 
          hp={hp}
          isHardcore={isHardcore}
          onToggleHardcore={toggleHardcore}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          bestScore={bestSession}
          queueInfo={queueInfo}
          onNextQueueItem={onNextQueueItem}
          textSize={textSize}
          onTextSizeChange={setTextSize}
          isZenMode={isZenMode}
          onToggleZenMode={() => setIsZenMode(!isZenMode)}
          isOledMode={isOledMode}
          onToggleOledMode={() => setIsOledMode(!isOledMode)}
          onOpenAcervoModal={onOpenAcervoModal ? () => onOpenAcervoModal(card.topic) : undefined}
          onOpenConstellation={onOpenConstellation}
          activeStage={activeStage}
          onSelectStage={handleSelectStage}
        />

        <div className={`max-w-6xl mx-auto px-4 pb-24 space-y-10 transition-all duration-300 study-font-${textSize} ${isZenMode ? 'zen-focus-active' : ''}`}>
          
          {/* ESTÁGIO 1: Teoria & Estrutura */}
          {(activeStage === 'teoria' || activeStage === 'todos') && (
            <div className="space-y-12 animate-fade-in">
              <ErrorBoundary fallbackTitle="Erro na Seção de Teoria">
                <TheorySection card={card} textSize={textSize} />
              </ErrorBoundary>
              
              <ErrorBoundary fallbackTitle="Erro na Seção de Estrutura">
                <StructureSection card={card} soundEnabled={soundEnabled} />
              </ErrorBoundary>

              {activeStage === 'teoria' && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl">
                      📘
                    </div>
                    <div>
                      <p className="text-white font-bold font-mono text-xs uppercase tracking-wider">Etapa 01 Concluída</p>
                      <p className="text-slate-400 text-xs font-sans">Fundamentação teórica e câmara de fórmulas assimiladas.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectStage('radar')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-98"
                  >
                    <span>AVANÇAR PARA RADAR DE PROVA</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ESTÁGIO 2: Radar de Prova (Macetes & Armadilhas) */}
          {(activeStage === 'radar' || activeStage === 'todos') && (
            <div className="space-y-12 animate-fade-in">
              <ErrorBoundary fallbackTitle="Erro na Seção de Radar">
                <RadarSection card={card} soundEnabled={soundEnabled} onOpenAcervoModal={onOpenAcervoModal} />
              </ErrorBoundary>

              {activeStage === 'radar' && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <button
                    onClick={() => handleSelectStage('teoria')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <span>←</span>
                    <span>VOLTAR: TEORIA</span>
                  </button>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-bold font-mono text-xs uppercase tracking-wider">Etapa 02 Concluída</p>
                    <p className="text-slate-400 text-xs font-sans">Mnemônicos e pontos cegos mapeados.</p>
                  </div>
                  <button
                    onClick={() => handleSelectStage('combate')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-mono text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-98"
                  >
                    <span>AVANÇAR PARA COMBATE & PROVAS</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ESTÁGIO 3: Arena de Combate & Provas Oficiais */}
          {(activeStage === 'combate' || activeStage === 'todos') && (
            <div className="space-y-12 animate-fade-in">
              <ErrorBoundary fallbackTitle="Erro no Laboratório Tático">
                <LabSection 
                  cardId={card.id}
                  cardTitle={card.title}
                  card={card}
                  questions={card.sec05_lab?.questions || []}
                  hardcoreQuestions={card.sec05_lab?.hardcoreQuestions}
                  bossFight={card.sec05_lab?.bossFight}
                  isHardcore={isHardcore}
                  soundEnabled={soundEnabled}
                  onApplyDamage={handleDamage}
                  onOpenAcervoModal={onOpenAcervoModal}
                />
              </ErrorBoundary>

              {activeStage === 'combate' && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-rose-950/40 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <button
                    onClick={() => handleSelectStage('radar')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <span>←</span>
                    <span>VOLTAR: RADAR</span>
                  </button>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-bold font-mono text-xs uppercase tracking-wider">Etapa 03 Concluída</p>
                    <p className="text-slate-400 text-xs font-sans">Batalha de bancas e questões resolvidas.</p>
                  </div>
                  <button
                    onClick={() => handleSelectStage('arcade')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-98"
                  >
                    <span>AVANÇAR PARA FIXAÇÃO & ARCADE</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ESTÁGIO 4: Fixação & Arcade Revisional */}
          {(activeStage === 'arcade' || activeStage === 'todos') && (
            <div className="space-y-12 animate-fade-in">
              <ErrorBoundary fallbackTitle="Erro na Matriz de Recall">
                <RecallSection card={card} />
              </ErrorBoundary>

              <ErrorBoundary fallbackTitle="Erro no Arcade Revisional">
                <ArcadeEngine 
                  card={card} 
                  onSessionSaved={loadTelemetry}
                  isHardcore={isHardcore}
                  hp={hp}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => setSoundEnabled(!soundEnabled)}
                  onToggleHardcore={toggleHardcore}
                  onApplyDamage={handleDamage}
                />
              </ErrorBoundary>

              {activeStage === 'arcade' && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <button
                    onClick={() => handleSelectStage('combate')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <span>←</span>
                    <span>VOLTAR: COMBATE</span>
                  </button>
                  <div className="text-center sm:text-left">
                    <p className="text-emerald-400 font-bold font-mono text-xs uppercase tracking-wider">🎉 Dossiê 100% Finalizado!</p>
                    <p className="text-slate-300 text-xs font-sans">Você completou todas as 4 etapas deste card de elite.</p>
                  </div>
                  <button
                    onClick={onBack}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-98"
                  >
                    <span>🏆 CONCLUIR E RETORNAR AO QG</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      </ReadingProvider>
      {/* Global game engine overlays */}
      <ScreenFlashOverlay />
      <ParticlesBurst />
      <XpToast />
    </GameProvider>
  );
};
