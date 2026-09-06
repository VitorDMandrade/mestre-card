import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { MestreCardData, StudySessionRecord } from '../types/mestre-card';
import { db } from '../lib/db';

import { StudyHUD } from './study/StudyHUD';
import { TheorySection } from './study/TheorySection';
import { StructureSection } from './study/StructureSection';
import { RadarSection } from './study/RadarSection';
import { LabSection } from './study/LabSection';
import { RecallSection } from './study/RecallSection';
import { ArcadeEngine } from './arcade/ArcadeEngine';
import { ErrorBoundary } from './ErrorBoundary';

interface StudyViewProps {
  card: MestreCardData;
  onBack: () => void;
  queueInfo?: { current: number; total: number; hasNext: boolean } | null;
  onNextQueueItem?: () => void;
}

export const StudyView: FC<StudyViewProps> = ({ card, onBack, queueInfo, onNextQueueItem }) => {
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

  return (
    <div className="min-h-screen bg-[#050810]">
      {/* Header Fixo Global de Navegação (Retornar) */}
      <div className="bg-[#0a0f18] border-b border-slate-800 p-4 flex items-center justify-between z-50 relative">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-white font-mono text-sm tracking-widest transition-colors flex items-center gap-2 cursor-pointer">
              <span className="text-xl">←</span> RETORNAR AO QG
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

      {/* HUD Tático (Fixo no topo da área de estudo) */}
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
        theoryBlocks={card.sec02_theory?.blocks}
      />

      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-12">
        <ErrorBoundary fallbackTitle="Erro na Seção de Teoria">
          <TheorySection card={card} textSize={textSize} />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackTitle="Erro na Seção de Estrutura">
          <StructureSection card={card} />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackTitle="Erro na Seção de Radar">
          <RadarSection card={card} soundEnabled={soundEnabled} />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackTitle="Erro no Laboratório Tático">
          <LabSection 
            questions={card.sec05_lab?.questions || []}
            hardcoreQuestions={card.sec05_lab?.hardcoreQuestions}
            bossFight={card.sec05_lab?.bossFight}
            isHardcore={isHardcore}
            soundEnabled={soundEnabled}
            onApplyDamage={handleDamage}
          />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackTitle="Erro na Matriz de Recall">
          <RecallSection card={card} />
        </ErrorBoundary>

        {/* Arcade Sub-engine */}
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
      </div>
    </div>
  );
};
