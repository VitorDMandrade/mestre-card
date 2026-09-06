import { useState, useEffect, useCallback } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { GameTimeline } from './GameTimeline';
import { GameMatch } from './GameMatch';
import { GameTrueFalse } from './GameTrueFalse';
import { GameOrder } from './GameOrder';
import { GameOdd } from './GameOdd';
import { RadarChart } from './RadarChart';
import { calculateTRIScore } from '../../lib/tri-engine';
import type { TRICalculationInput, TRIScoreResult } from '../../lib/tri-engine';
import { db } from '../../lib/db';
import { ErrorBoundary } from '../ErrorBoundary';

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
  game: 'G1' | 'G3' | 'G5';
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
  const [activeTab, setActiveTab] = useState<'g1' | 'g2' | 'g3' | 'g4' | 'g5'>('g1');
  
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
  }, []);

  const [gamesStatus, setGamesStatus] = useState({ g1: false, g2: false, g3: false, g4: false, g5: false });
  const [triResult, setTriResult] = useState<TRIScoreResult | null>(null);

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === ',' || e.key === '.') {
        const tabs = ['g1', 'g2', 'g3', 'g4', 'g5'] as const;
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
  }, []);

  const handleG2Complete = useCallback(() => {
    setGamesStatus(prev => ({ ...prev, g2: true }));
  }, []);

  const handleG3Complete = useCallback((timeSaved: number) => {
    setG3TimeSaved(timeSaved);
    setGamesStatus(prev => ({ ...prev, g3: true }));
  }, []);

  const handleG4Complete = useCallback((attempts: number) => {
    setG4Attempts(attempts);
    setGamesStatus(prev => ({ ...prev, g4: true }));
  }, []);

  const handleG5Complete = useCallback((hits: number) => {
    setG5Hits(hits);
    setGamesStatus(prev => ({ ...prev, g5: true }));
  }, []);

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
    <section id="sec-arcade" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_0_25px_-4px_rgba(56,189,248,0.25)] scroll-mt-20">
      {/* Header and Controls */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-black text-white">🕹️ Pentágono Revisional (Arcade)</h2>
        
        <div className="flex items-center gap-3 flex-wrap">
          <span className="hidden sm:inline-block text-xs font-mono text-gray-500">
            Teclas: [,] e [.] abas, [1-5] opções, [V/F], [Espaço] Avançar
          </span>
          
          <button 
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${soundEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}
          >
            {soundEnabled ? '🔊 Som Ativado' : '🔇 Som Desativado'}
          </button>

          <button 
            onClick={onToggleHardcore}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-all flex items-center gap-1.5 ${
              isHardcore 
                ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-slate-900/90 border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-300'
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

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {[
          { id: 'g1', label: '1. Morte Súbita', color: 'blue' },
          { id: 'g2', label: '2. Conexão Neural', color: 'emerald' },
          { id: 'g3', label: '3. Pressão TRI', color: 'red' },
          { id: 'g4', label: '4. Ordenação Tática', color: 'amber' },
          { id: 'g5', label: '5. O Infiltrado', color: 'purple' },
        ].map(t => {
          const isActive = activeTab === t.id;
          const isDone = gamesStatus[t.id as keyof typeof gamesStatus];
          return (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all border inline-flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform -translate-y-px' 
                  : 'bg-slate-800 text-gray-400 border-slate-700 hover:bg-slate-700'
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

      {/* Final Score Modal */}
      {triResult && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border-2 border-blue-500 p-6 sm:p-8 rounded-2xl text-center max-w-lg w-full shadow-[0_0_30px_rgba(59,130,246,0.3)] my-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">SCORE TRI FINAL</h2>
            <div className="text-6xl font-black text-blue-400 mb-4 tracking-tighter shadow-blue-500/20 drop-shadow-lg">
              {triResult.score}
            </div>
            
            <div className="text-xl font-bold text-gray-300 mb-4">
              {triResult.verdict}
            </div>

            {triResult.penalty > 0 && (
              <div className="text-xs text-red-400 mb-6 font-bold border border-red-500/30 bg-red-900/20 p-3 rounded-lg">
                ⚠️ ALERTA TRI: Padrão de inconsistência detectado. Penalidade: -{triResult.penalty}pts.
              </div>
            )}

            <div className="mb-6 flex justify-center">
              <RadarChart values={triResult.axes} size={280} />
            </div>

            {/* Caderno de Erros da Sessão / Repescagem Imediata */}
            {sessionErrors.length > 0 ? (
              <details className="mb-6 text-left border border-red-500/40 bg-red-950/20 rounded-xl p-3.5 space-y-3">
                <summary className="cursor-pointer text-xs font-mono font-bold text-red-400 hover:text-red-300 transition-colors select-none flex items-center justify-between">
                  <span>🚨 CADERNO DE ERROS DA SESSÃO ({sessionErrors.length} FALHAS DETECTADAS)</span>
                  <span className="text-[10px] text-red-400/80 font-mono">EXPANDIR ▼</span>
                </summary>
                <div className="mt-3 space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                  {sessionErrors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-red-900/50 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                          {err.game === 'G1' ? 'G1: MORTE SÚBITA' : err.game === 'G3' ? 'G3: PRESSÃO TRI' : 'G5: O INFILTRADO'}
                        </span>
                        <span>FALHA #{idx + 1}</span>
                      </div>
                      <p className="text-slate-200 font-sans text-xs font-semibold leading-relaxed">
                        {err.prompt}
                      </p>
                      <div className="text-[11px] bg-red-950/40 border-l-2 border-l-red-500 pl-2 py-1 text-red-300">
                        <span className="font-bold text-red-400">Sua Escolha: </span>
                        <span>{err.userWrongAnswer}</span>
                      </div>
                      <div className="text-[11px] bg-emerald-950/30 border-l-2 border-l-emerald-500 pl-2 py-1 text-emerald-300">
                        <span className="font-bold text-emerald-400">Correção Tática: </span>
                        <span>{err.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ) : (
              <div className="mb-6 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-2">
                <span>🛡️</span>
                <span>SESSÃO IMPECÁVEL // ZERO ERROS DETECTADOS</span>
              </div>
            )}

            <button 
              onClick={() => setTriResult(null)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold w-full transition-colors uppercase tracking-widest text-sm cursor-pointer"
            >
              FECHAR RELATÓRIO
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
