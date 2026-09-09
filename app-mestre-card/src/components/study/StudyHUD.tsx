import { useEffect, useState } from 'react';
import type { StudySessionRecord } from '../../types/mestre-card';
import { playClickSound } from '../../lib/audio';
import { useReading } from '../../context/ReadingContext';
import { useGame } from '../../context/GameContext';
import { getLevelColor, getLevelGlowClass } from '../../lib/xp-engine';

export function sanitizeForSpeech(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(/\$\$[\s\S]*?\$\$/g, ' fórmula matemática ')
    .replace(/\$([^\$]+)\$/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/•/g, '')
    .replace(/➔/g, ' levando a ')
    .replace(/❌/g, ' erro: ')
    .replace(/✅/g, ' correto: ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type StudyStage = 'teoria' | 'radar' | 'combate' | 'arcade' | 'todos';

interface StudyHUDProps {
  hp: number;
  isHardcore: boolean;
  onToggleHardcore: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bestScore: StudySessionRecord | null;
  queueInfo?: { current: number; total: number; hasNext: boolean } | null;
  onNextQueueItem?: () => void;
  textSize?: 'sm' | 'md' | 'lg';
  onTextSizeChange?: (size: 'sm' | 'md' | 'lg') => void;
  isZenMode?: boolean;
  onToggleZenMode?: () => void;
  isOledMode?: boolean;
  onToggleOledMode?: () => void;
  onOpenAcervoModal?: () => void;
  onOpenConstellation?: () => void;
  activeStage?: StudyStage;
  onSelectStage?: (stage: StudyStage) => void;
}

export const StudyHUD = ({ 
  hp, 
  isHardcore, 
  onToggleHardcore,
  soundEnabled,
  onToggleSound,
  bestScore,
  queueInfo,
  onNextQueueItem,
  textSize = 'md',
  onTextSizeChange,
  isZenMode = false,
  onToggleZenMode,
  isOledMode = false,
  onToggleOledMode,
  onOpenAcervoModal,
  onOpenConstellation,
  activeStage = 'teoria',
  onSelectStage
}: StudyHUDProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState('sec-01');
  const { searchTerm, setSearchTerm, clearSearch } = useReading();

  // Scroll Progress Bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for real-time ScrollSpy across sections
  useEffect(() => {
    const sectionIds = ['sec-01', 'sec-03', 'sec-04', 'sec-05', 'sec-06', 'sec-arcade'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio or top crossing
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by proximity to top of viewport
          const best = visibleEntries.reduce((prev, curr) => 
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveHash(best.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: [0.1, 0.3, 0.6]
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    playClickSound(soundEnabled);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveHash(id);
    }
  };

  const scrollToTop = () => {
    playClickSound(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveHash('sec-01');
  };

  const { combo, playerProfile } = useGame();
  const { xp, levelName, xpForCurrentLevel, xpForNextLevel, xpProgress } = playerProfile;
  const xpRange = xpForNextLevel - xpForCurrentLevel;
  const isNearNextLevel = xpProgress >= 0.8;
  const levelColorClass = getLevelColor(levelName);
  const glowClass = getLevelGlowClass(levelName);

  return (
    <>
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 mb-8 pt-4 pb-0 shadow-lg safe-top">
        <div className="max-w-6xl mx-auto px-4">

          {/* ─── XP Bar Row ─────────────────────────────── */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {/* Level Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-black font-mono tracking-wider ${levelColorClass} ${glowClass} border-current/30 bg-slate-900 neon-pulse`}>
              <span>⭐</span>
              <span>{levelName}</span>
            </div>

            {/* XP Progress Bar */}
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className={`h-full bg-gradient-to-r from-cyan-500 to-blue-500 xp-bar-fill ${isNearNextLevel ? 'xp-near-full' : ''}`}
                  style={{ width: `${Math.round(xpProgress * 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                {xp - xpForCurrentLevel}/{xpRange > 0 ? xpRange : '∞'} XP
              </span>
            </div>

            {/* Combo Counter (when active) */}
            {combo >= 2 && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black font-mono combo-enter ${
                combo >= 10
                  ? 'bg-rose-950/80 border border-rose-400 text-rose-300 combo-pulse shadow-[0_0_12px_rgba(251,113,133,0.4)]'
                  : combo >= 5
                  ? 'bg-amber-950/80 border border-amber-400 text-amber-300 combo-pulse shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'bg-cyan-950/80 border border-cyan-500 text-cyan-300'
              }`}>
                <span>{combo >= 10 ? '🔥' : combo >= 5 ? '💥' : '⚡'}</span>
                <span>x{combo} COMBO</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              {queueInfo ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/70 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse">
                  <span className="text-xs font-mono font-black tracking-wider">
                    🎯 ALVO {queueInfo.current}/{queueInfo.total}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Sessão Ativa</span>
                </div>
              )}
              
              {bestScore && (
                <div className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-500/30 px-3 py-1.5 rounded-full">
                  <span className="text-xs font-mono text-indigo-300">🏆 Recorde:</span>
                  <span className="text-xs font-black text-indigo-400">{bestScore.score} pts</span>
                </div>
              )}

              {queueInfo && onNextQueueItem && (
                <button
                  onClick={onNextQueueItem}
                  className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500 text-red-300 hover:bg-red-900 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                  title="Avançar para o próximo alvo da fila de repescagem"
                >
                  <span>{queueInfo.hasNext ? 'PRÓXIMO ALVO' : 'CONCLUIR FILA'}</span>
                  <span>➔</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Controle de Escala Tipográfica Militar */}
              {onTextSizeChange && (
                <div 
                  className="flex items-center bg-slate-900 border border-slate-700/80 rounded p-0.5 gap-0.5 notranslate" 
                  title="Escala Tipográfica de Leitura"
                  translate="no"
                >
                  <button
                    onClick={() => onTextSizeChange('sm')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer notranslate ${
                      textSize === 'sm'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Compacta (sm)"
                    translate="no"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => onTextSizeChange('md')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer notranslate ${
                      textSize === 'md'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Padrão (md)"
                    translate="no"
                  >
                    A
                  </button>
                  <button
                    onClick={() => onTextSizeChange('lg')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer notranslate ${
                      textSize === 'lg'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Ampliada (lg)"
                    translate="no"
                  >
                    A+
                  </button>
                </div>
              )}

              {/* Controles de Conforto Visual: Foco Zen & Modo OLED & Leitura Biônica */}
              <div className="flex items-center gap-1">
                {onToggleZenMode && (
                  <button
                    onClick={onToggleZenMode}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isZenMode
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white'
                    }`}
                    title="Modo Foco Zen: Dimeriza visualmente seções periféricas ao ler"
                  >
                    <span>👁️</span>
                    <span className="hidden sm:inline">Zen</span>
                  </button>
                )}

                {onToggleOledMode && (
                  <button
                    onClick={onToggleOledMode}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isOledMode
                        ? 'bg-black border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900 border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white'
                    }`}
                    title="Modo Noite OLED: Preto puro 100% para ambientes com pouca luz"
                  >
                    <span>🌙</span>
                    <span className="hidden sm:inline">OLED</span>
                  </button>
                )}

                {onOpenAcervoModal && (
                  <button
                    onClick={onOpenAcervoModal}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border bg-slate-900 border-slate-700 hover:border-cyan-400 text-cyan-300 hover:text-white"
                    title="Abrir Biblioteca Completa do Acervo Oficial (598 PDFs)"
                  >
                    <span>🏛️</span>
                    <span className="hidden sm:inline">Acervo</span>
                  </button>
                )}

                {onOpenConstellation && (
                  <button
                    onClick={onOpenConstellation}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border bg-slate-900 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white shadow-[0_0_8px_rgba(0,245,255,0.2)]"
                    title="Abrir Constelação Neural 3D centrada neste Card"
                  >
                    <span>🌌</span>
                    <span className="hidden sm:inline">Grafo</span>
                  </button>
                )}
              </div>

              {/* Localizador Tático In-Page */}
              <div className="relative flex items-center" title="Localizador Tático: Destaque imediato do termo em todo o card">
                <span className="absolute left-2.5 text-xs text-slate-400 pointer-events-none">🔍</span>
                <input
                  type="text"
                  placeholder="Localizar termo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-full pl-7 pr-7 py-1 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 w-28 sm:w-36 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Limpar busca"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button 
                onClick={() => {
                  playClickSound(soundEnabled);
                  onToggleSound();
                }}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-colors border cursor-pointer ${soundEnabled ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40 shadow-sm' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'}`}
              >
                {soundEnabled ? '🔊 Som Ativo' : '🔇 Mudo'}
              </button>

              <button 
                onClick={() => {
                  playClickSound(soundEnabled);
                  onToggleHardcore();
                }}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isHardcore 
                    ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                <span>{isHardcore ? '🔥' : '🛡️'}</span>
                <span>{isHardcore ? 'Hardcore' : 'Normal'}</span>
              </button>

              {isHardcore && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-xs font-mono">
                  <span className="text-red-400 font-bold">HP:</span>
                  <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-red-900/60">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300" 
                      style={{ width: `${hp}%` }}
                    />
                  </div>
                  <span className="text-white font-bold w-6">{hp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navegação Tática: 4 Estágios Focados vs. Modo Contínuo */}
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2 hide-scrollbar">
            <div className="flex items-center gap-1.5 flex-nowrap">
              {[
                { id: 'teoria', label: '01. Teoria & Estrutura', icon: '📘' },
                { id: 'radar', label: '02. Radar de Prova', icon: '🎯' },
                { id: 'combate', label: '03. Combate & Provas', icon: '⚔️' },
                { id: 'arcade', label: '04. Fixação & Arcade', icon: '🕹️' }
              ].map(stage => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      playClickSound(soundEnabled);
                      if (onSelectStage) {
                        onSelectStage(stage.id as StudyStage);
                      } else {
                        scrollTo(stage.id === 'teoria' ? 'sec-01' : stage.id === 'radar' ? 'sec-04' : stage.id === 'combate' ? 'sec-05' : 'sec-arcade');
                      }
                    }}
                    className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 rounded-lg border cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'border-cyan-400 text-cyan-300 bg-cyan-950/70 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                        : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <span>{stage.icon}</span>
                    <span>{stage.label}</span>
                  </button>
                );
              })}
            </div>

            {onSelectStage && (
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  onSelectStage(activeStage === 'todos' ? 'teoria' : 'todos');
                }}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeStage === 'todos'
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
                title={activeStage === 'todos' ? 'Retornar ao modo focado em 4 estágios' : 'Exibir todas as 6 seções em uma única página longa'}
              >
                <span>{activeStage === 'todos' ? '🎯 Modo Focado' : '📜 Ver Tudo'}</span>
              </button>
            )}
          </div>

          {/* Sub-âncoras de Seções com ScrollSpy (Apenas no Modo Contínuo) */}
          {activeStage === 'todos' && (
            <div className="flex overflow-x-auto gap-1 pt-1 pb-1.5 hide-scrollbar border-t border-slate-800/60">
              {[
                { id: 'sec-01', label: '01. Teoria' },
                { id: 'sec-03', label: '03. Estrutura' },
                { id: 'sec-04', label: '04. Radar' },
                { id: 'sec-05', label: '05. Laboratório' },
                { id: 'sec-06', label: '06. Recall' },
                { id: 'sec-arcade', label: '07. Arcade' }
              ].map(anchor => (
                <button
                  key={anchor.id}
                  onClick={() => scrollTo(anchor.id)}
                  className={`whitespace-nowrap px-2.5 py-0.5 text-[11px] font-mono transition-all rounded cursor-pointer ${
                    activeHash === anchor.id
                      ? 'text-cyan-300 bg-cyan-950/60 font-bold border-b border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {anchor.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="h-0.5 bg-slate-800 w-full absolute bottom-0 left-0">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {scrollProgress > 30 && (
        <button
          onClick={scrollToTop}
          aria-label="Retornar ao Topo"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-cyan-950 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 shadow-xl shadow-cyan-950/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

