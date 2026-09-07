import { useState } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { playSound } from '../../lib/audio';

interface RadarSectionProps {
  card: MestreCardData;
  soundEnabled: boolean;
}

export const RadarSection = ({ card, soundEnabled }: RadarSectionProps) => {
  const [revealedTriggers, setRevealedTriggers] = useState<Set<number>>(new Set());

  // Estado das barras de expansão (sanfona tática)
  // Deixamos a primeira expandida por padrão e as outras colapsadas para evitar poluição visual
  const [expandedSections, setExpandedSections] = useState<{
    mnemonics: boolean;
    blindSpots: boolean;
    triggerWords: boolean;
  }>({
    mnemonics: true,
    blindSpots: false,
    triggerWords: false,
  });

  const toggleSection = (section: 'mnemonics' | 'blindSpots' | 'triggerWords') => {
    if (soundEnabled) {
      playSound(true);
    }
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    if (soundEnabled) playSound(true);
    setExpandedSections({ mnemonics: true, blindSpots: true, triggerWords: true });
  };

  const collapseAll = () => {
    if (soundEnabled) playSound(false);
    setExpandedSections({ mnemonics: false, blindSpots: false, triggerWords: false });
  };

  const handleRevealTrigger = (index: number) => {
    if (!revealedTriggers.has(index)) {
      setRevealedTriggers(new Set([...revealedTriggers, index]));
      if (soundEnabled) {
        playSound(true);
      }
    }
  };

  const radar = card.sec04_radar;

  // Renderizador limpo de regras mnemônicas (sem ** nem // soltos)
  const renderMnemonicRule = (rule: string) => {
    if (!rule) return null;

    const items = rule
      .split(/\s*\/\/\s*|\n+/)
      .map(s => s.trim())
      .filter(Boolean);

    if (items.length > 1) {
      return (
        <div className="space-y-2 mt-2">
          {items.map((item, idx) => {
            let letterBadge = '';
            const match = item.match(/^\*{0,2}([A-Z0-9À-Ú])\*{0,2}/i);
            if (match && match[1]) {
              letterBadge = match[1].toUpperCase();
            }
            const cleanText = item.replace(/\*\*/g, '').trim();

            return (
              <div 
                key={idx} 
                className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 flex items-start gap-2.5 transition-all text-xs"
              >
                {letterBadge ? (
                  <span className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono font-black flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.25)] text-xs">
                    {letterBadge}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                )}
                <div className="text-slate-200 leading-relaxed font-sans flex-1">
                  {cleanText}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return <MathRenderer content={rule.replace(/\*\*/g, '')} />;
  };

  // Renderizador limpo de pontos cegos
  const renderBlindSpotAnalysis = (analysis: string) => {
    if (!analysis) return null;

    let myth = '';
    let fact = '';

    const clean = analysis.replace(/\*\*/g, '');

    if (clean.includes('//')) {
      const parts = clean.split(/\s*\/\/\s*/);
      myth = parts[0];
      fact = parts.slice(1).join(' ');
    } else {
      const match = clean.match(/(Na verdade[,\:]?|Em contrapartida[,\:]?|A realidade [ée][,\:]?|Contudo[,\:]?)/i);
      if (match && match.index && match.index > 25) {
        myth = clean.slice(0, match.index).trim();
        fact = clean.slice(match.index).trim();
      }
    }

    if (myth && fact) {
      return (
        <div className="space-y-2.5 mt-2">
          <div className="bg-red-950/40 border-l-2 border-red-500/80 p-2.5 rounded-r-lg shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-1">
              <span>❌</span> <span>A Armadilha / O Mito da Banca:</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed font-sans">
              {myth}
            </div>
          </div>

          <div className="bg-emerald-950/30 border-l-2 border-emerald-400/80 p-2.5 rounded-r-lg shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <span>✅</span> <span>A Realidade Cobrada na Prova:</span>
            </div>
            <div className="text-xs text-slate-200 leading-relaxed font-medium font-sans">
              {fact}
            </div>
          </div>
        </div>
      );
    }

    return <p className="text-xs text-slate-300 leading-relaxed font-sans">{clean}</p>;
  };

  // Resumos para visualização compacta quando recolhido
  const mnemonicsSummary = radar.mnemonics?.map(m => m.trigger).filter(Boolean).join(' • ') || '';
  const blindSpotsSummary = radar.blindSpots?.map(s => s.title).filter(Boolean).join(' • ') || '';
  const triggerWordsCount = radar.triggerWords?.length || 0;

  return (
    <section id="sec-04" className="mb-12 scroll-mt-24">
      {/* Cabeçalho da Seção com Ações Rápidas */}
      <div className="border-b border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="text-blue-500">04.</span> RADAR DE GATILHOS
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
          >
            Expandir Todos
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
          >
            Recolher Todos
          </button>
        </div>
      </div>

      {/* PAINEL DE BARRAS DE EXPANSÃO (ACCORDION TÁTICO) */}
      <div className="space-y-4 animate-fade-in pb-8">

        {/* ------------------------------------------------------------- */}
        {/* BARRA 1: ÂNCORAS MNEMÔNICAS TRI                               */}
        {/* ------------------------------------------------------------- */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 overflow-hidden shadow-lg transition-all duration-300">
          <button
            onClick={() => toggleSection('mnemonics')}
            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 hover:bg-slate-800/60 transition-colors text-left cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-xl sm:text-2xl p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
                🧠
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white truncate">
                    ÂNCORAS MNEMÔNICAS TRI
                  </h3>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded shrink-0">
                    {radar.mnemonics.length} ÂNCORAS
                  </span>
                </div>
                {!expandedSections.mnemonics && mnemonicsSummary && (
                  <p className="text-xs font-mono text-cyan-400/80 truncate mt-0.5">
                    {mnemonicsSummary}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {expandedSections.mnemonics ? 'Recolher' : 'Expandir'}
              </span>
              <span className={`text-slate-400 transition-transform duration-300 transform ${expandedSections.mnemonics ? 'rotate-180 text-cyan-400' : ''}`}>
                ▼
              </span>
            </div>
          </button>

          {/* Gaveta de Conteúdo */}
          {expandedSections.mnemonics && (
            <div className="p-4 sm:p-6 border-t border-cyan-500/20 bg-slate-950/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {radar.mnemonics.map((mn, i) => (
                  <div 
                    key={i} 
                    className={`bg-slate-900/90 border p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] ${
                      i === 0 
                        ? 'border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.12)] bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900' 
                        : i === 1 
                          ? 'border-sky-500/60 shadow-[0_0_15px_rgba(14,165,233,0.12)] bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900' 
                          : 'border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.12)] bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                          GATILHO MNEMÔNICO 0{i+1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      </div>
                      <h4 className="text-sm font-black text-white uppercase mb-1">{mn.title}</h4>
                      <div className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 mb-2.5 font-mono tracking-wider drop-shadow-sm">
                        {mn.trigger}
                      </div>
                    </div>
                    <div className="text-gray-300 text-xs leading-relaxed border-t border-slate-800/80 pt-2.5">
                      {renderMnemonicRule(mn.rule)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BARRA 2: PONTOS CEGOS & ARMADILHAS DA BANCA (DISTRACTORS)     */}
        {/* ------------------------------------------------------------- */}
        <div className="rounded-2xl border border-red-500/40 bg-slate-900/90 overflow-hidden shadow-lg transition-all duration-300">
          <button
            onClick={() => toggleSection('blindSpots')}
            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-red-950/20 to-slate-900 hover:bg-slate-800/60 transition-colors text-left cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-xl sm:text-2xl p-2 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 shrink-0 animate-pulse">
                ⚠️
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-red-200 truncate">
                    PONTOS CEGOS & ARMADILHAS DA BANCA
                  </h3>
                  <span className="text-[10px] font-mono bg-red-950 text-red-400 border border-red-500/40 px-2 py-0.5 rounded shrink-0">
                    {radar.blindSpots.length} PONTOS CRÍTICOS
                  </span>
                </div>
                {!expandedSections.blindSpots && blindSpotsSummary && (
                  <p className="text-xs font-mono text-red-400/80 truncate mt-0.5">
                    {blindSpotsSummary}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {expandedSections.blindSpots ? 'Recolher' : 'Expandir'}
              </span>
              <span className={`text-slate-400 transition-transform duration-300 transform ${expandedSections.blindSpots ? 'rotate-180 text-red-400' : ''}`}>
                ▼
              </span>
            </div>
          </button>

          {/* Gaveta de Conteúdo */}
          {expandedSections.blindSpots && (
            <div className="p-4 sm:p-6 border-t border-red-500/20 bg-slate-950/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {radar.blindSpots.map((spot, i) => (
                  <div 
                    key={i} 
                    className="bg-red-950/20 border border-red-500/40 p-4 sm:p-5 rounded-xl relative overflow-hidden group shadow-[0_0_15px_rgba(239,68,68,0.12)] hover:border-red-500/60 transition-all"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-red-900/20 pointer-events-none"></div>
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <span className="text-sm">⚠️</span>
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-red-400">
                        {spot.title}
                      </h4>
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm leading-relaxed relative z-10">
                      {renderBlindSpotAnalysis(spot.analysis)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BARRA 3: RADAR DE PALAVRAS-GATILHO // DECODIFICAÇÃO           */}
        {/* ------------------------------------------------------------- */}
        <div className="rounded-2xl border border-blue-500/30 bg-slate-900/90 overflow-hidden shadow-lg transition-all duration-300">
          <button
            onClick={() => toggleSection('triggerWords')}
            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-blue-950/20 to-slate-900 hover:bg-slate-800/60 transition-colors text-left cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-xl sm:text-2xl p-2 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 shrink-0">
                🎯
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white truncate">
                    RADAR DE PALAVRAS-GATILHO // DECODIFICAÇÃO DE ENUNCIADO
                  </h3>
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded shrink-0">
                    {triggerWordsCount} TERMOS
                  </span>
                </div>
                {!expandedSections.triggerWords && (
                  <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                    Identifique pistas semânticas e armadilhas imediatas na leitura da questão
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {expandedSections.triggerWords ? 'Recolher' : 'Expandir'}
              </span>
              <span className={`text-slate-400 transition-transform duration-300 transform ${expandedSections.triggerWords ? 'rotate-180 text-blue-400' : ''}`}>
                ▼
              </span>
            </div>
          </button>

          {/* Gaveta de Conteúdo */}
          {expandedSections.triggerWords && (
            <div className="border-t border-blue-500/20 bg-slate-950/50">
              <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-stone-400">
                <span>Clique em qualquer linha para decodificar o contexto e a pegadinha</span>
                <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {revealedTriggers.size} / {radar.triggerWords.length} Revelados
                </span>
              </div>
              <div className="divide-y divide-slate-800/80">
                {radar.triggerWords.map((tw, i) => {
                  const isRevealed = revealedTriggers.has(i);
                  return (
                    <div 
                      key={i} 
                      className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer group flex items-start gap-4"
                      onClick={() => handleRevealTrigger(i)}
                    >
                      <div className="mt-1">
                        <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border flex items-center justify-center ${
                          isRevealed 
                            ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]' 
                            : 'bg-slate-800 border-slate-600 group-hover:border-cyan-400'
                        }`}>
                          {isRevealed && <span className="text-[9px] text-black font-black">✓</span>}
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase mb-1">Se aparecer no enunciado...</div>
                          <div className="text-blue-400 font-bold font-mono text-sm">"{tw.trigger}"</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase mb-1">O contexto exige...</div>
                          <div className={`text-slate-200 text-xs sm:text-sm leading-relaxed transition-all duration-500 font-sans ${!isRevealed ? 'blur-sm select-none opacity-40' : ''}`}>
                            {tw.context}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase mb-1">A armadilha da banca será...</div>
                          <div className={`text-red-300 text-xs sm:text-sm leading-relaxed transition-all duration-500 font-sans font-medium ${!isRevealed ? 'blur-sm select-none opacity-40' : ''}`}>
                            {tw.trap}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
