import { useState, useEffect, useCallback } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { GameTimeline } from './GameTimeline';
import { GameMatch } from './GameMatch';
import { GameTrueFalse } from './GameTrueFalse';
import { GameOrder } from './GameOrder';
import { GameOdd } from './GameOdd';
import { InspectionDesk } from './InspectionDesk';
import { ScoreScreen } from './ScoreScreen';
import { calculateTRIScore } from '../../lib/tri-engine';
import type { TRICalculationInput, TRIScoreResult } from '../../lib/tri-engine';
import { db } from '../../lib/db';
import { ErrorBoundary } from '../ErrorBoundary';
import { useGame } from '../../context/GameContext';
import { addXP, calculateSessionXP } from '../../lib/xp-engine';
import type { XPResult } from '../../lib/xp-engine';
import { playVictorySound } from '../../lib/audio';

interface ArcadeEngineProps {
  card: MestreCardData;
  onSessionSaved?: () => void;
  isHardcore: boolean;
  hp: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleHardcore: () => void;
  onApplyDamage: (amount: number) => void;
}

export interface SessionErrorLog {
  game: 'G1' | 'G3' | 'G5' | 'Inspection';
  prompt: string;
  userWrongAnswer: string;
  explanation: string;
}

export const ArcadeEngine = ({ 
  card, 
  onSessionSaved,
  isHardcore,
  hp,
  soundEnabled,
  onToggleSound,
  onToggleHardcore,
  onApplyDamage
}: ArcadeEngineProps) => {
  const [activeTab, setActiveTab] = useState<'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'inspection'>('g1');
  
  // Game state tracking
  const [g1Results, setG1Results] = useState<{ hit: boolean; difficulty: string }[]>([]);
  const [g3TimeSaved, setG3TimeSaved] = useState(0);
  const [g4Attempts, setG4Attempts] = useState(0);
  const [g5Hits, setG5Hits] = useState(0);

  // Session error telemetry (Caderno de Erros)
  const [sessionErrors, setSessionErrors] = useState<SessionErrorLog[]>([]);
  const [prevCardId, setPrevCardId] = useState(card.id);

  if (card.id !== prevCardId) {
    setPrevCardId(card.id);
    setSessionErrors([]);
  }

  const recordError = useCallback((error: SessionErrorLog) => {
    setSessionErrors(prev => [...prev, error]);
    // Persist immediately to IndexedDB so failures are never lost if user exits or collapses in G1
    db.recordSessionError({
      game: error.game,
      prompt: error.prompt,
      userWrongAnswer: error.userWrongAnswer,
      explanation: error.explanation,
      cardId: card.id,
      cardTitle: card.title,
      timestamp: Date.now()
    }).catch(err => {
      console.error('Falha ao registrar erro no banco imediatamente:', err);
    });
  }, [card.id, card.title]);

  const [gamesStatus, setGamesStatus] = useState({ g1: false, g2: false, g3: false, g4: false, g5: false });
  const [triResult, setTriResult] = useState<TRIScoreResult | null>(null);
  const [xpResult, setXpResult] = useState<XPResult | null>(null);

  // Game engine integrations
  const { maxComboReached, triggerFlash, fireXpToast, refreshProfile } = useGame();

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === ',' || e.key === '.') {
        const tabs = ['g1', 'g2', 'g3', 'g4', 'g5', 'inspection'] as const;
        const currentIdx = tabs.indexOf(activeTab);
        let nextIdx = e.key === '.' ? currentIdx + 1 : currentIdx - 1;
        if (nextIdx >= tabs.length) nextIdx = 0;
        if (nextIdx < 0) nextIdx = tabs.length - 1;
        setActiveTab(tabs[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);



  const handleG1Complete = useCallback((results: { hit: boolean; difficulty: string }[]) => {
    setG1Results(results);
    setGamesStatus(prev => ({ ...prev, g1: true }));
    triggerFlash('hit');
  }, [triggerFlash]);

  const handleG2Complete = useCallback(() => {
    setGamesStatus(prev => ({ ...prev, g2: true }));
    triggerFlash('hit');
  }, [triggerFlash]);

  const handleG3Complete = useCallback((timeSaved: number) => {
    setG3TimeSaved(timeSaved);
    setGamesStatus(prev => ({ ...prev, g3: true }));
    triggerFlash('hit');
  }, [triggerFlash]);

  const handleG4Complete = useCallback((attempts: number) => {
    setG4Attempts(attempts);
    setGamesStatus(prev => ({ ...prev, g4: true }));
    triggerFlash('hit');
  }, [triggerFlash]);

  const handleG5Complete = useCallback((hits: number) => {
    setG5Hits(hits);
    setGamesStatus(prev => ({ ...prev, g5: true }));
    triggerFlash('hit');
  }, [triggerFlash]);

  const calculateFinalScore = async () => {
    const input: TRICalculationInput = {
      g1Results,
      g3TimeSaved,
      g3TotalQuestions: card.sec07_arcade?.tfData?.length || 0,
      g4TotalAttempts: g4Attempts,
      g4TotalSequences: card.sec07_arcade?.orderData?.[0]?.steps.length || 0,
      g5TotalHits: g5Hits,
      g5TotalQuestions: card.sec07_arcade?.oddData?.length || 0,
    };
    const result = calculateTRIScore(input);
    setTriResult(result);

    // Save to IndexedDB
    try {
      await db.saveStudySession({
        id: crypto.randomUUID(),
        cardId: card.id,
        timestamp: Date.now(),
        score: result.score,
        stats: {
          accuracy: result.axes[0],
          coherenceScore: result.axes[1],
          speed: result.axes[2],
          immunity: result.axes[4],
          totalScore: result.score
        },
        details: {
          penalty: result.penalty,
          verdict: result.verdict,
          sessionErrors: sessionErrors.map(e => ({
            ...e,
            timestamp: Date.now(),
            cardId: card.id,
            cardTitle: card.title
          }))
        }
      });
      onSessionSaved?.();
    } catch (err) {
      console.error('Failed to save session to DB:', err);
    }

    // Award XP
    const gamesCompleted = Object.values(gamesStatus).filter(Boolean).length;
    const xpAmount = calculateSessionXP({
      score: result.score,
      comboMax: maxComboReached,
      sessionErrors: sessionErrors.length,
      gamesCompleted,
    });
    const g3TotalQ = card.sec07_arcade?.tfData?.length || 1;
    const g3AvgTime = g3TimeSaved > 0 ? (g3TimeSaved / g3TotalQ) : Infinity;
    const xp = addXP(xpAmount, result.score, {
      comboMax: maxComboReached,
      g3SpeedPerQ: g3AvgTime,
      hardcoreNoDamage: isHardcore && hp === 100,
      sessionErrors: sessionErrors.length,
    });
    setXpResult(xp);
    refreshProfile();
    fireXpToast(xpAmount, xp.leveledUp ? xp.newLevelName : undefined);
    if (result.score >= 750) playVictorySound(soundEnabled);
  };

  const { questionsData, matchData, tfData, orderData, oddData } = card.sec07_arcade || {};

  const safeMatchData = Array.isArray(matchData) ? matchData : [];
  const mappedMatchData = safeMatchData.map((m, i) => ({
    id: String(i),
    term: m.left,
    definition: m.right
  }));

  const safeOrderData = Array.isArray(orderData) ? orderData : [];
  const mappedOrderData = (safeOrderData[0]?.steps || []).map((s, i) => ({
    id: String(i),
    step: s,
    explanation: ''
  }));

  const safeOddData = Array.isArray(oddData) ? oddData : (oddData ? [oddData] : []);
  const mappedOddData = safeOddData.map((o: any) => ({
    theme: o.question,
    options: o.options
  }));

  return (
    <section id="sec-arcade" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_0_25px_-4px_rgba(56,189,248,0.25)] scroll-mt-44">
      {/* Header and Controls */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-black text-white">🕹️ Pentágono Revisional (Arcade)</h2>
        
        <div className="flex items-center gap-3 flex-wrap">
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 font-medium">
            Teclas: [,] e [.] abas, [1-5] opções, [V/F], [Espaço] Avançar
          </span>
          
          <button 
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${soundEnabled ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 shadow-sm'}`}
          >
            {soundEnabled ? '🔊 Som Ativado' : '🔇 Som Desativado'}
          </button>

          <button 
            onClick={onToggleHardcore}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              isHardcore 
                ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-slate-900/90 border-slate-700 text-slate-300 font-bold hover:border-red-500/50 hover:text-red-300 shadow-sm'
            }`}
          >
            <span>{isHardcore ? '🔥' : '🛡️'}</span>
            <span>{isHardcore ? 'Modo Sobrevivência' : 'Modo Normal'}</span>
          </button>

          {isHardcore && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-xs font-mono animate-fade-in">
              <span className="text-red-400 font-bold">HP:</span>
              <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden border border-red-900/60">
                <div 
                  className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300" 
                  style={{ width: `${hp}%` }}
                />
              </div>
              <span className="text-white font-bold">{hp}</span>
            </div>
          )}

          <button 
            onClick={calculateFinalScore}
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs font-mono shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] transition-all"
          >
            📊 Score TRI
          </button>
        </div>
      </div>

      {/* Banner Tático de Destaque: Guichê Papers, Please */}
      <div className="mb-6 p-4 rounded-xl border-2 border-amber-600/60 bg-gradient-to-r from-amber-950/40 via-stone-900/60 to-amber-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-amber-500/50 overflow-hidden bg-black/60 p-0.5 flex-shrink-0">
            <img src="./inspection/ministry-seal.jpg" alt="MKA Seal" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 font-mono text-[9px] rounded font-bold uppercase border border-amber-500/40">NOVA ENGINE</span>
              <span className="text-xs font-mono font-bold text-amber-400">MINISTÉRIO DA VALIDAÇÃO ACADÊMICA</span>
            </div>
            <h3 className="text-sm font-bold text-white font-mono tracking-wide">
              OPERAÇÃO PAPERS, PLEASE: AUDITORIA DE DOSSIÊS
            </h3>
            <p className="text-[11px] text-stone-400 font-serif">
              Examine requerimentos e teses de prova com carimbos mecânicos, manuais oficiais e citações de infração.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('inspection')}
          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-105"
        >
          <span>🛂 ASSUMIR O GUICHÊ</span>
          <span>➔</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {[
          { id: 'g1', label: '1. Morte Súbita', color: 'blue' },
          { id: 'g2', label: '2. Conexão Neural', color: 'emerald' },
          { id: 'g3', label: '3. Pressão TRI', color: 'red' },
          { id: 'g4', label: '4. Ordenação Tática', color: 'amber' },
          { id: 'g5', label: '5. O Infiltrado', color: 'purple' },
          { id: 'inspection', label: '🛂 6. Auditoria (Papers, Please)', color: 'amber' },
        ].map(t => {
          const isActive = activeTab === t.id;
          const isDone = gamesStatus[t.id as keyof typeof gamesStatus];
          return (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all border inline-flex items-center gap-1.5 ${
                isActive 
                  ? t.id === 'inspection'
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-black font-extrabold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] transform -translate-y-px'
                    : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform -translate-y-px' 
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 shadow-sm'
              }`}
            >
              <span className={isDone ? 'inline' : 'hidden'} aria-hidden="true">✅</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Viewport protegido por ErrorBoundary */}
      <ErrorBoundary fallbackTitle="Interrupção no Motor do Arcade">
        <div>
          {activeTab === 'inspection' && (
            <InspectionDesk 
              card={card}
              soundEnabled={soundEnabled}
              onApplyDamage={onApplyDamage}
              onClose={() => setActiveTab('g1')}
            />
          )}
          {activeTab === 'g1' && (
            <GameTimeline 
              questions={questionsData || []} 
              soundEnabled={soundEnabled} 
              onDamage={onApplyDamage}
              onComplete={handleG1Complete}
              onError={(err) => recordError({ game: 'G1', ...err })}
            />
          )}
          {activeTab === 'g2' && (
            <GameMatch 
              matchData={mappedMatchData} 
              soundEnabled={soundEnabled} 
              onDamage={onApplyDamage}
              onComplete={handleG2Complete}
            />
          )}
          {activeTab === 'g3' && (
            <GameTrueFalse 
              tfData={tfData || []} 
              soundEnabled={soundEnabled} 
              onDamage={onApplyDamage}
              onComplete={handleG3Complete}
              onError={(err) => recordError({ game: 'G3', ...err })}
            />
          )}
          {activeTab === 'g4' && (
            <GameOrder 
              orderData={mappedOrderData} 
              soundEnabled={soundEnabled} 
              onDamage={onApplyDamage}
              onComplete={handleG4Complete}
            />
          )}
          {activeTab === 'g5' && (
            <GameOdd 
              oddData={mappedOddData} 
              soundEnabled={soundEnabled} 
              onDamage={onApplyDamage}
              onComplete={handleG5Complete}
              onError={(err) => recordError({ game: 'G5', ...err })}
            />
          )}
        </div>
      </ErrorBoundary>

      {triResult && (
        <ScoreScreen
          triResult={triResult}
          sessionErrors={sessionErrors}
          xpResult={xpResult}
          onClose={() => { setTriResult(null); setXpResult(null); }}
        />
      )}
    </section>
  );
};
