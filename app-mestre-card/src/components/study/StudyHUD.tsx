import { useEffect, useState, useRef } from 'react';
import type { StudySessionRecord, TheoryBlock } from '../../types/mestre-card';
import { playClickSound } from '../../lib/audio';

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
  theoryBlocks?: TheoryBlock[];
  isZenMode?: boolean;
  onToggleZenMode?: () => void;
  isOledMode?: boolean;
  onToggleOledMode?: () => void;
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
  theoryBlocks,
  isZenMode = false,
  onToggleZenMode,
  isOledMode = false,
  onToggleOledMode
}: StudyHUDProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState('sec-01');
  const [speechState, setSpeechState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Strict cleanup of SpeechSynthesis on unmount or card changes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        utteranceRef.current = null;
      }
    };
  }, [theoryBlocks]);

  const handlePlaySpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('A síntese de voz (Web Speech API) não está disponível neste navegador.');
      return;
    }

    if (speechState === 'playing') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
      return;
    }

    if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('playing');
      return;
    }

    // speechState === 'idle'
    window.speechSynthesis.cancel();

    const blocks = theoryBlocks || [];
    if (blocks.length === 0) {
      alert('Nenhum bloco de teoria disponível para leitura.');
      return;
    }

    const rawScript = blocks
      .map(b => `Bloco ${b.number}: ${b.title}. ${b.content}. ${b.highlight ? 'Destaque tático: ' + b.highlight + '.' : ''}`)
      .join(' ');

    const cleanScript = sanitizeForSpeech(rawScript);
    const utterance = new SpeechSynthesisUtterance(cleanScript);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeechState('playing');
    };
    utterance.onend = () => {
      setSpeechState('idle');
      utteranceRef.current = null;
    };
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event/interruption:', e);
      setSpeechState('idle');
      utteranceRef.current = null;
    };
    utterance.onpause = () => {
      setSpeechState('paused');
    };
    utterance.onresume = () => {
      setSpeechState('playing');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeechState('playing');
  };

  const handleStopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
    setSpeechState('idle');
  };

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

  return (
    <>
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 mb-8 pt-4 pb-0 shadow-lg safe-top">
        <div className="max-w-6xl mx-auto px-4">
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
              {/* Narração Nativa por Voz (Web Speech API) */}
              <div className="flex items-center gap-1">
                {speechState === 'idle' && (
                  <button 
                    onClick={handlePlaySpeech}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    title="Ouvir Dossiê Teórico sintetizado por voz nativa"
                  >
                    <span>🎧</span>
                    <span className="hidden sm:inline">Ouvir Dossiê</span>
                    <span className="sm:hidden">Ouvir</span>
                  </button>
                )}

                {speechState === 'playing' && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePlaySpeech}
                      className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] animate-pulse cursor-pointer"
                      title="Pausar leitura"
                    >
                      <span>⏸️</span>
                      <span className="hidden sm:inline">Pausar</span>
                    </button>
                    <button 
                      onClick={handleStopSpeech}
                      className="px-2 py-1 rounded bg-red-950/80 border border-red-500/60 text-red-300 hover:bg-red-900 text-xs font-mono font-bold transition-all cursor-pointer"
                      title="Interromper leitura"
                    >
                      <span>⏹️</span>
                    </button>
                  </div>
                )}

                {speechState === 'paused' && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePlaySpeech}
                      className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Retomar leitura"
                    >
                      <span>▶️</span>
                      <span className="hidden sm:inline">Retomar</span>
                    </button>
                    <button 
                      onClick={handleStopSpeech}
                      className="px-2 py-1 rounded bg-red-950/80 border border-red-500/60 text-red-300 hover:bg-red-900 text-xs font-mono font-bold transition-all cursor-pointer"
                      title="Interromper leitura"
                    >
                      <span>⏹️</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Controle de Escala Tipográfica Militar */}
              {onTextSizeChange && (
                <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded p-0.5 gap-0.5" title="Escala Tipográfica de Leitura">
                  <button
                    onClick={() => onTextSizeChange('sm')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer ${
                      textSize === 'sm'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Compacta (sm)"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => onTextSizeChange('md')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer ${
                      textSize === 'md'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Padrão (md)"
                  >
                    A
                  </button>
                  <button
                    onClick={() => onTextSizeChange('lg')}
                    className={`font-mono text-xs px-2 py-0.5 rounded transition-all cursor-pointer ${
                      textSize === 'lg'
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300'
                    }`}
                    title="Fonte Ampliada (lg)"
                  >
                    A+
                  </button>
                </div>
              )}

              {/* Controles de Conforto Visual: Foco Zen & Modo OLED */}
              <div className="flex items-center gap-1">
                {onToggleZenMode && (
                  <button
                    onClick={onToggleZenMode}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isZenMode
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200'
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
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isOledMode
                        ? 'bg-black border border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Modo Noite OLED: Preto puro 100% para ambientes com pouca luz"
                  >
                    <span>🌙</span>
                    <span className="hidden sm:inline">OLED</span>
                  </button>
                )}
              </div>

              <button 
                onClick={() => {
                  playClickSound(soundEnabled);
                  onToggleSound();
                }}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${soundEnabled ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
              >
                {soundEnabled ? '🔊 Som Ativo' : '🔇 Mudo'}
              </button>

              <button 
                onClick={() => {
                  playClickSound(soundEnabled);
                  onToggleHardcore();
                }}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-all flex items-center gap-2 ${
                  isHardcore 
                    ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-slate-900/90 border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-300'
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

          {/* Navegação Rápida com ScrollSpy */}
          <div className="flex overflow-x-auto gap-1 pb-2 hide-scrollbar">
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
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-t-lg border-b-2 ${
                  activeHash === anchor.id
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40 shadow-[0_2px_10px_rgba(34,211,238,0.15)]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {anchor.label}
              </button>
            ))}
          </div>
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

