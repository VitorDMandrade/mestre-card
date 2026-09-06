import { useEffect, useState } from 'react';
import type { StudySessionRecord } from '../../types/mestre-card';

interface StudyHUDProps {
  hp: number;
  isHardcore: boolean;
  onToggleHardcore: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bestScore: StudySessionRecord | null;
}

export const StudyHUD = ({ 
  hp, 
  isHardcore, 
  onToggleHardcore,
  soundEnabled,
  onToggleSound,
  bestScore
}: StudyHUDProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveHash(id);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 mb-8 pt-4 pb-0 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Sessão Ativa</span>
            </div>
            
            {bestScore && (
              <div className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-500/30 px-3 py-1.5 rounded-full">
                <span className="text-xs font-mono text-indigo-300">🏆 Recorde:</span>
                <span className="text-xs font-black text-indigo-400">{bestScore.score} pts</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${soundEnabled ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
            >
              {soundEnabled ? '🔊 Som Ativo' : '🔇 Mudo'}
            </button>

            <button 
              onClick={onToggleHardcore}
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

        {/* Navegação Rápida (Âncoras) */}
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
              className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-t-lg border-b-2 ${
                activeHash === anchor.id || (!activeHash && anchor.id === 'sec-01')
                  ? 'border-blue-500 text-blue-400 bg-blue-900/20'
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
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
          className="h-full bg-blue-500 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};
