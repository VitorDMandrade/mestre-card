// src/components/arcade/ScoreScreen.tsx
// Cinematic Score Screen with odometer animation, XP rewards, and badge reveals
import { useEffect, useState, useRef } from 'react';
import type { TRIScoreResult } from '../../lib/tri-engine';
import type { SessionErrorLog } from './ArcadeEngine';
import { RadarChart } from './RadarChart';
import { getLevelColor, type LevelName } from '../../lib/xp-engine';
import type { XPResult } from '../../lib/xp-engine';

interface ScoreScreenProps {
  triResult: TRIScoreResult;
  sessionErrors: SessionErrorLog[];
  xpResult: XPResult | null;
  onClose: () => void;
}

function useOdometer(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    setValue(0);
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

function getVerdictStyle(score: number) {
  if (score >= 900) return { color: 'text-purple-300', glow: 'drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]' };
  if (score >= 750) return { color: 'text-cyan-300', glow: 'drop-shadow-[0_0_16px_rgba(34,211,238,0.6)]' };
  if (score >= 600) return { color: 'text-amber-300', glow: 'drop-shadow-[0_0_14px_rgba(251,191,36,0.5)]' };
  if (score >= 400) return { color: 'text-rose-300', glow: 'drop-shadow-[0_0_12px_rgba(251,113,133,0.5)]' };
  return { color: 'text-slate-400', glow: '' };
}

export const ScoreScreen = ({ triResult, sessionErrors, xpResult, onClose }: ScoreScreenProps) => {
  const animatedScore = useOdometer(triResult.score, 1600);
  const [showContent, setShowContent] = useState(false);
  const verdictStyle = getVerdictStyle(triResult.score);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleCopyResult = () => {
    const axes = triResult.axes;
    const text = [
      `🎯 MestreCard — Relatório de Combate`,
      `📊 Score TRI: ${triResult.score}/1000`,
      `⚔️ Veredicto: ${triResult.verdict}`,
      ``,
      `Eixo I (Precisão): ${axes[0]}%`,
      `Eixo II (Coerência): ${axes[1]}%`,
      `Eixo III (Velocidade): ${axes[2]}%`,
      `Eixo IV (Adaptação): ${axes[3]}%`,
      `Eixo V (Imunidade): ${axes[4]}%`,
      xpResult ? `⭐ XP Ganho: +${xpResult.xpAdded} XP` : '',
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text).catch(() => {});
  };

  const earnedBadges = xpResult?.badgesEarned ?? [];

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 score-screen-overlay">
      {/* Animated BG */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />
      <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl border-2 overflow-hidden shadow-2xl transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ borderColor: triResult.score >= 900 ? '#a855f7' : '#38bdf8', boxShadow: `0 0 60px -10px ${triResult.score >= 900 ? 'rgba(168,85,247,0.35)' : 'rgba(56,189,248,0.25)'}` }}
      >
        {/* Header scanline stripe */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase">
            ◉ Relatório de Combate — MestreCard
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="bg-slate-950/95 px-6 pt-6 pb-5 max-h-[80vh] overflow-y-auto">
          {/* Score Odometer */}
          <div className="text-center mb-4">
            <div className="text-[10px] font-mono text-slate-400 font-bold tracking-[0.2em] uppercase mb-1">Score TRI Final</div>
            <div
              className={`text-7xl font-black tracking-tighter tabular-nums ${verdictStyle.color} ${verdictStyle.glow}`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {animatedScore}
            </div>
            <div className={`text-lg font-bold mt-2 ${verdictStyle.color} opacity-80`}>
              {triResult.verdict}
            </div>
          </div>

          {/* TRI Penalty Warning */}
          {triResult.penalty > 0 && (
            <div className="mb-4 text-xs text-red-400 font-bold border border-red-500/30 bg-red-900/20 p-3 rounded-lg font-mono text-center">
              ⚠️ Penalidade TRI Detectada: -{triResult.penalty}pts por inconsistência
            </div>
          )}

          {/* Radar Chart */}
          <div className="flex justify-center mb-4">
            <RadarChart values={triResult.axes} size={230} />
          </div>

          {/* XP Reward Block */}
          {xpResult && (
            <div className={`mb-4 p-3 rounded-xl border text-center ${xpResult.leveledUp ? 'bg-purple-950/40 border-purple-500/50' : 'bg-cyan-950/30 border-cyan-500/30'}`}>
              <div className={`text-xl font-black font-mono ${xpResult.leveledUp ? 'text-purple-300' : 'text-cyan-300'}`}>
                +{xpResult.xpAdded} XP
              </div>
              {xpResult.leveledUp && (
                <div className="mt-1 text-sm font-bold text-purple-200">
                  🎉 LEVEL UP! → <span className={getLevelColor(xpResult.newLevelName as LevelName)}>{xpResult.newLevelName}</span>
                </div>
              )}
            </div>
          )}

          {/* Badges Earned */}
          {earnedBadges.length > 0 && (
            <div className="mb-4 space-y-1.5">
              <div className="text-[10px] font-mono text-amber-500/80 tracking-widest uppercase text-center mb-2">
                ✨ Conquistas Desbloqueadas
              </div>
              {earnedBadges.map(badge => (
                <div key={badge.id} className="flex items-center gap-2.5 bg-amber-950/30 border border-amber-500/30 rounded-lg px-3 py-2">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-amber-300">{badge.name}</div>
                    <div className="text-[11px] text-slate-400">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Log (collapsible) */}
          {sessionErrors.length > 0 ? (
            <details className="mb-4 border border-red-500/30 bg-red-950/20 rounded-xl p-3 space-y-2">
              <summary className="cursor-pointer text-xs font-mono font-bold text-red-400 hover:text-red-300 transition-colors select-none flex items-center justify-between">
                <span>🚨 Caderno de Erros ({sessionErrors.length} falhas)</span>
                <span className="text-[10px] text-red-400/70">EXPANDIR ▼</span>
              </summary>
              <div className="mt-2 space-y-2 max-h-44 overflow-y-auto pr-1">
                {sessionErrors.map((err, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-red-900/40 space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                        {err.game === 'G1' ? 'G1: Morte Súbita' : err.game === 'G3' ? 'G3: Pressão TRI' : 'G5: O Infiltrado'}
                      </span>
                      <span>#{idx + 1}</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs font-semibold">{err.prompt}</p>
                    <div className="text-[11px] bg-red-950/40 border-l-2 border-red-500 pl-2 py-0.5 text-red-300">
                      <span className="font-bold text-red-400">Sua Escolha: </span>{err.userWrongAnswer}
                    </div>
                    <div className="text-[11px] bg-emerald-950/30 border-l-2 border-emerald-500 pl-2 py-0.5 text-emerald-300">
                      <span className="font-bold text-emerald-400">Correção: </span>{err.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-2">
              <span>🛡️</span><span>SESSÃO IMPECÁVEL — ZERO ERROS</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-black text-sm font-mono uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              ✓ Fechar
            </button>
            <button
              onClick={handleCopyResult}
              title="Copiar resultado"
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-sm transition-all cursor-pointer"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
