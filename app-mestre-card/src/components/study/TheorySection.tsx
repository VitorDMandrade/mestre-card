import { useState, useMemo, useRef, useEffect } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { useReading } from '../../context/ReadingContext';
import { useGame } from '../../context/GameContext';
import { addXP } from '../../lib/xp-engine';
import {
  parseBlockForDecoder,
  extractDistractorPool,
  getRandomGlyph,
  type DecoderSlot,
  type DecodedBlock
} from '../../lib/decoder-engine';
import {
  playDecoderChirpSound,
  playDecodedSuccessSound,
  playDecoderErrorSound
} from '../../lib/audio';

interface TheorySectionProps {
  card: MestreCardData;
  textSize?: 'sm' | 'md' | 'lg';
}

const useSafeGame = () => {
  try {
    return useGame();
  } catch {
    return null;
  }
};

export const TheorySection = ({ card, textSize = 'md' }: TheorySectionProps) => {
  const [activeRoute, setActiveRoute] = useState<string>(card.sec02_theory.triagePatterns[0]?.id || 'route-a');
  const [activeBlockTab, setActiveBlockTab] = useState<number | 'all'>('all');
  const { setSearchTerm } = useReading();
  const gameCtx = useSafeGame();

  // Estados do Protocolo Decoder (Fase 2)
  const [isDecoderMode, setIsDecoderMode] = useState<boolean>(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [activeBlockNumForSlot, setActiveBlockNumForSlot] = useState<number | null>(null);
  const [decryptedSlotsMap, setDecryptedSlotsMap] = useState<Record<string, boolean>>({});
  const [animatingSlot, setAnimatingSlot] = useState<{ slotId: string; glyphs: string; isMath: boolean } | null>(null);
  const [completedBlocks, setCompletedBlocks] = useState<Record<number, boolean>>({});
  const [wrongSlotAttempt, setWrongSlotAttempt] = useState<string | null>(null);
  const descrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (descrambleIntervalRef.current) {
        clearInterval(descrambleIntervalRef.current);
      }
    };
  }, []);

  const activePattern = card.sec02_theory.triagePatterns.find(p => p.id === activeRoute);

  const textScaleClass = {
    sm: 'text-xs md:text-sm',
    md: 'text-sm md:text-base',
    lg: 'text-base md:text-lg'
  }[textSize || 'md'];

  // Pool inteligente de distratores e blocos decodificados pré-processados
  const distractorPool = useMemo(() => extractDistractorPool(card), [card]);

  const parsedBlocksMap = useMemo(() => {
    const map = new Map<number, DecodedBlock>();
    card.sec02_theory.blocks.forEach(b => {
      map.set(b.number, parseBlockForDecoder(b.content, distractorPool));
    });
    return map;
  }, [card, distractorPool]);

  // Contadores globais de slots do card
  const totalSlotsCount = useMemo(() => {
    let count = 0;
    parsedBlocksMap.forEach(pb => {
      count += pb.slots.length;
    });
    return count;
  }, [parsedBlocksMap]);

  const totalDecryptedCount = useMemo(() => {
    let count = 0;
    Object.keys(decryptedSlotsMap).forEach(k => {
      if (decryptedSlotsMap[k]) count++;
    });
    return count;
  }, [decryptedSlotsMap]);

  // Derivação autônoma das premissas de Ancoragem Rápida
  const quickAnchors: string[] = card.sec02_theory.quickAnchoring || 
    (card.sec02_theory.blocks || []).slice(0, 3).map(b => {
      if (b.highlight) {
        return `**${b.title}**: ${b.highlight}`;
      }
      const firstSentence = b.content.split(/\. |\.\n/)[0]?.trim();
      return `**${b.title}**: ${firstSentence ? firstSentence + '.' : b.content}`;
    });

  // Extração de Conceitos Centrais para a esteira de tags clicáveis
  const nuclearConcepts: Array<{ label: string; blockNumber: number }> = [];
  (card.sec02_theory.blocks || []).forEach(b => {
    if (b.highlight) {
      const rawTags = b.highlight.split(/\s*\/\/\s*|\s*\/\s*/);
      rawTags.forEach(t => {
        const clean = t.replace(/\*\*/g, '').trim();
        if (clean && clean.length > 2 && clean.length < 32) {
          if (!nuclearConcepts.some(c => c.label.toLowerCase() === clean.toLowerCase())) {
            nuclearConcepts.push({ label: clean, blockNumber: b.number });
          }
        }
      });
    }
  });

  const handleConceptClick = (label: string, blockNumber: number) => {
    setSearchTerm(label);
    if (activeBlockTab !== 'all') {
      setActiveBlockTab(blockNumber);
    }
    setTimeout(() => {
      const el = document.getElementById(`block-${blockNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Handler de seleção de ficha de desclassificação
  const handleOptionSelect = (slot: DecoderSlot, chosenOption: string, blockNumber: number) => {
    if (animatingSlot) return;

    if (chosenOption === slot.correctWord) {
      playDecoderChirpSound();
      playDecodedSuccessSound();

      const startTime = Date.now();
      const duration = 300;
      const intervalMs = 35;

      if (descrambleIntervalRef.current) {
        clearInterval(descrambleIntervalRef.current);
      }

      descrambleIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
          if (descrambleIntervalRef.current) {
            clearInterval(descrambleIntervalRef.current);
            descrambleIntervalRef.current = null;
          }
          setAnimatingSlot(null);

          // Registra slot como descriptografado
          setDecryptedSlotsMap(prev => {
            const next = { ...prev, [slot.id]: true };

            // Verifica se completou 100% dos slots deste bloco
            const pb = parsedBlocksMap.get(blockNumber);
            if (pb && pb.slots.length > 0) {
              const allDecrypted = pb.slots.every(s => s.id === slot.id || next[s.id]);
              if (allDecrypted && !completedBlocks[blockNumber]) {
                setCompletedBlocks(c => ({ ...c, [blockNumber]: true }));
                addXP(100);
                gameCtx?.fireXpToast(100);
                gameCtx?.refreshProfile();
                gameCtx?.triggerFlash('hit');
                playDecodedSuccessSound();
              }
            }
            return next;
          });

          setSelectedSlotId(null);
          setActiveBlockNumForSlot(null);

          // Recompensa individual do slot (+25 XP)
          addXP(25);
          gameCtx?.fireXpToast(25);
          gameCtx?.refreshProfile();
        } else {
          let glyphStr: string;
          if (slot.isMath) {
            glyphStr = `[ ⟳ ${Array.from({ length: 6 }, () => getRandomGlyph()).join('')} ]`;
          } else {
            glyphStr = Array.from({ length: Math.max(4, slot.correctWord.length) }, () => getRandomGlyph()).join('');
          }
          setAnimatingSlot({
            slotId: slot.id,
            glyphs: glyphStr,
            isMath: slot.isMath
          });
        }
      }, intervalMs);
    } else {
      // Opção incorreta
      playDecoderErrorSound();
      gameCtx?.triggerFlash('miss');
      setWrongSlotAttempt(slot.id);
      setTimeout(() => {
        setWrongSlotAttempt(prev => (prev === slot.id ? null : prev));
      }, 600);
    }
  };

  // Renderizador do nó de cada slot dentro do fluxo de texto
  const renderSlotToken = (token: string, blockNumber: number) => {
    const pb = parsedBlocksMap.get(blockNumber);
    if (!pb) return <span className="font-mono text-amber-400">{token}</span>;

    const slot = pb.slots.find(s => s.token === token);
    if (!slot) return <span className="font-mono text-amber-400">{token}</span>;

    // 1. Já Descriptografado
    if (decryptedSlotsMap[slot.id]) {
      return (
        <span
          key={slot.id}
          className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)] notranslate mx-1 align-middle"
          translate="no"
        >
          <span className="text-[10px] text-cyan-400 mr-1 select-none">🔓</span>
          {slot.isMath ? <MathRenderer content={slot.correctWord} /> : slot.correctWord}
        </span>
      );
    }

    // 2. Em animação de Descramble (Anti-CLS com font-mono e largura mínima estrita)
    if (animatingSlot?.slotId === slot.id) {
      return (
        <span
          key={slot.id}
          className="descramble-active notranslate mx-1 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400"
          translate="no"
          style={{ minWidth: `${Math.max(8, slot.correctWord.length * 0.95)}ch` }}
        >
          {animatingSlot.glyphs}
        </span>
      );
    }

    // 3. Tarja Censurada
    const isSelected = selectedSlotId === slot.id;
    const isWrong = wrongSlotAttempt === slot.id;

    return (
      <button
        key={slot.id}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          playDecoderChirpSound();
          if (isSelected) {
            setSelectedSlotId(null);
            setActiveBlockNumForSlot(null);
          } else {
            setSelectedSlotId(slot.id);
            setActiveBlockNumForSlot(blockNumber);
          }
        }}
        className={`censor-bar notranslate ${isSelected ? 'censor-bar-active' : ''} ${isWrong ? '!border-red-500 !text-red-400 animate-shake' : ''}`}
        translate="no"
        style={{ minWidth: `${Math.max(8, slot.correctWord.length * 0.95)}ch` }}
        title="Clique para desclassificar esta lacuna"
      >
        <span className="text-[10px] text-amber-400 mr-1.5">🔒</span>
        <span className="tracking-widest font-black text-xs">
          █ CENSURADO #{slot.id.replace('slot-', '')} █
        </span>
      </button>
    );
  };

  // Renderizador da Bandeja Tática de Fichas
  const renderBlockOptionTray = (blockNumber: number) => {
    if (!isDecoderMode || activeBlockNumForSlot !== blockNumber || !selectedSlotId) return null;

    const pb = parsedBlocksMap.get(blockNumber);
    if (!pb) return null;

    const activeSlot = pb.slots.find(s => s.id === selectedSlotId);
    if (!activeSlot || decryptedSlotsMap[activeSlot.id]) return null;

    return (
      <div className="mt-5 p-4 bg-slate-950/95 border-2 border-amber-500/50 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.2)] animate-fade-in relative z-20">
        <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono text-xs font-black animate-pulse flex items-center gap-1.5">
              <span>⚡</span> BANDEJA DE DESCLASSIFICAÇÃO
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Selecione o termo autêntico para liberar a lacuna <strong className="text-amber-300">#{activeSlot.id.replace('slot-', '')}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedSlotId(null);
              setActiveBlockNumForSlot(null);
            }}
            className="text-slate-400 hover:text-slate-200 text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer"
          >
            ✕ Fechar
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {activeSlot.options.map((opt, optIdx) => (
            <button
              key={optIdx}
              type="button"
              disabled={animatingSlot !== null}
              onClick={() => handleOptionSelect(activeSlot, opt, blockNumber)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-950/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <span className="text-slate-500 text-[10px]">[{optIdx + 1}]</span>
              <span>{opt.includes('$') ? <MathRenderer content={opt} /> : opt}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Carimbo Militar de Doutrina Homologada
  const renderBlockStamp = (blockNumber: number) => {
    if (!isDecoderMode) return null;
    const pb = parsedBlocksMap.get(blockNumber);
    if (!pb || pb.slots.length === 0) return null;

    const isComplete = pb.slots.every(s => decryptedSlotsMap[s.id]);
    if (!isComplete) return null;

    return (
      <div className="mt-5 p-3.5 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between flex-wrap gap-3 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="doctrine-homologated-stamp px-3 py-1.5 text-xs rounded shadow-lg">
            ★ DOUTRINA HOMOLOGADA ★
          </div>
          <span className="text-xs font-mono text-emerald-300 font-medium">
            100% das lacunas desclassificadas com sucesso (+100 XP)
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider uppercase font-bold">
          STATUS: ACESSO TOTAL // NÍVEL MESTRE
        </span>
      </div>
    );
  };

  const currentFocusedBlock = typeof activeBlockTab === 'number'
    ? card.sec02_theory.blocks.find(b => b.number === activeBlockTab) || card.sec02_theory.blocks[0]
    : null;

  return (
    <>
      {/* SEC 01 - Header TRI & Eixos */}
      <section id="sec-01" className="mb-12 scroll-mt-24">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-500/50 px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span className="text-blue-400 font-bold font-mono text-sm">INCIDÊNCIA TRI:</span>
            <span className="text-white font-black uppercase tracking-widest">{card.sec01_header.triWeight}</span>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {card.sec01_header.skills.map(skill => (
              <div key={skill.id} className="bg-slate-800 border border-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 group relative cursor-help">
                <span className="text-emerald-400 font-bold font-mono text-sm">{skill.id}</span>
                <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 bg-slate-900 border border-slate-700 p-2 text-xs text-gray-300 rounded shadow-xl z-10">
                  {skill.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {card.sec01_header.thematicAxes.map((axis, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold font-mono text-sm border border-blue-500/20 flex-shrink-0">
                E{i+1}
              </div>
              <span className="text-gray-300 text-sm font-medium leading-tight">{axis}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEC 02 - Dossiê & Árvore de Triagem */}
      <section id="sec-02" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">02.</span> DOSSIÊ TEÓRICO
            </h2>

            {/* Comutador Tático: Leitura Canônica vs. Protocolo Decoder */}
            <button
              type="button"
              onClick={() => {
                setIsDecoderMode(prev => {
                  const next = !prev;
                  if (next) playDecoderChirpSound();
                  return next;
                });
                setSelectedSlotId(null);
                setActiveBlockNumForSlot(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                isDecoderMode
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
              title="Alternar entre modo convencional de leitura e treino ativo com tarjas de censura"
            >
              {isDecoderMode ? (
                <>
                  <span className="text-emerald-400 animate-pulse">🕵️</span>
                  <span>Protocolo Decoder</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-900/90 text-[10px] text-emerald-200 font-bold border border-emerald-500/40">
                    {totalDecryptedCount}/{totalSlotsCount}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-blue-400">📖</span>
                  <span>Leitura Canônica</span>
                </>
              )}
            </button>
          </div>

          {/* Seletor de Modo de Leitura: Todos os Blocos vs. Foco em 1 Bloco */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveBlockTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBlockTab === 'all'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📖 Todos ({card.sec02_theory.blocks.length})
            </button>
            {card.sec02_theory.blocks.map((b) => (
              <button
                key={b.number}
                onClick={() => setActiveBlockTab(b.number)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeBlockTab === b.number
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Focar no Bloco 0${b.number}: ${b.title}`}
              >
                0{b.number}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de Conceitos Centrais Clicáveis (Tags de Salto Rápido) */}
        {nuclearConcepts.length > 0 && (
          <div className="mb-6 p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-2 overflow-x-auto hide-scrollbar">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <span>🏷️</span> <span className="hidden sm:inline">Conceitos Centrais:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {nuclearConcepts.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleConceptClick(c.label, c.blockNumber)}
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800/80 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 transition-all shrink-0 cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-sm"
                  title={`Localizar "${c.label}" no Bloco 0${c.blockNumber}`}
                >
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Box Tático de Ancoragem Rápida (15s) */}
        {quickAnchors.length > 0 && (
          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-3.5 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-cyan-400 text-sm animate-pulse">⚡</span>
              <h3 className="font-mono text-xs font-black tracking-wider text-cyan-400 uppercase">
                ANCORAGEM RÁPIDA (15s) // PREMISSAS INEGOCIÁVEIS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickAnchors.slice(0, 3).map((anchor, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-cyan-500/15">
                  <span className="text-cyan-400 font-mono text-xs font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                  <div className="text-xs text-slate-300 leading-relaxed font-medium">
                    <MathRenderer content={anchor} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODO 1: Foco em Bloco Único (Split-View / Dossier Hero Layout) */}
        {currentFocusedBlock && (
          <div id={`block-${currentFocusedBlock.number}`} className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl shadow-cyan-950/20 mb-10 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Coluna Principal: Largura Áurea com max-w-prose para evitar fadiga ocular */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-blue-900/40 border border-blue-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                    Bloco 0{currentFocusedBlock.number}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    de 0{card.sec02_theory.blocks.length}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  {currentFocusedBlock.title}
                </h3>
                <div className={`max-w-prose leading-relaxed text-slate-200 space-y-4 ${textScaleClass}`}>
                  {isDecoderMode ? (
                    <div className="decoder-terminal-active p-5 rounded-2xl border border-emerald-500/40 relative overflow-hidden my-2">
                      <MathRenderer
                        content={parsedBlocksMap.get(currentFocusedBlock.number)?.templateText || currentFocusedBlock.content}
                        textClassName={textScaleClass}
                        renderSlot={(token) => renderSlotToken(token, currentFocusedBlock.number)}
                      />
                    </div>
                  ) : (
                    <MathRenderer content={currentFocusedBlock.content} textClassName={textScaleClass} />
                  )}
                  {renderBlockOptionTray(currentFocusedBlock.number)}
                  {renderBlockStamp(currentFocusedBlock.number)}
                </div>
              </div>

              {/* Coluna Lateral Tática: Resumos e Destaques */}
              <div className="lg:col-span-4 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                  <span className="text-sm">🎯</span>
                  <h4 className="text-xs font-mono font-black text-slate-300 uppercase tracking-wider">
                    Painel Tático do Bloco
                  </h4>
                </div>

                {currentFocusedBlock.highlight && (
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                      Palavras-Chave de Prova:
                    </span>
                    {isDecoderMode ? (
                      <span className="text-xs font-mono text-amber-400/80 bg-slate-950/80 px-2.5 py-1 rounded border border-amber-500/30 inline-block">
                        🔒 METADADOS RETIDOS EM TREINO DECODER
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {currentFocusedBlock.highlight.split(/\s*\/\/\s*|\s*\/\s*/).map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold shadow-sm">
                            {tag.replace(/\*\*/g, '').trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-slate-400 leading-relaxed">
                  <span className="font-bold text-blue-300 block mb-1">💡 Dica Cognitiva:</span>
                  Palavras em <strong className="text-cyan-300">ciano</strong> indicam conceitos nucleares e <strong className="text-amber-300">âmbar</strong> marcam datas/períodos temporais.
                </div>
              </div>
            </div>

            {/* Barra de Paginação Inferior */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <button
                disabled={currentFocusedBlock.number <= 1}
                onClick={() => setActiveBlockTab(currentFocusedBlock.number - 1)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>←</span> <span>Bloco Anterior</span>
              </button>

              <button
                onClick={() => setActiveBlockTab('all')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                Ver Todos os Blocos Juntos
              </button>

              <button
                disabled={currentFocusedBlock.number >= card.sec02_theory.blocks.length}
                onClick={() => setActiveBlockTab(currentFocusedBlock.number + 1)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <span>Próximo Bloco</span> <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* MODO 2: Exibição Completa de Todos os Blocos */}
        {activeBlockTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {card.sec02_theory.blocks.map((block) => (
              <div 
                key={block.number} 
                id={`block-${block.number}`}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-600 transition-colors scroll-mt-28"
              >
                <div className="absolute top-0 right-0 bg-blue-900/20 text-blue-500/30 font-black text-6xl -mt-4 -mr-2 select-none pointer-events-none group-hover:text-blue-500/40 transition-colors">
                  {String(block.number).padStart(2, '0')}
                </div>
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <h3 className="text-lg font-bold text-blue-400">{block.title}</h3>
                  <button
                    onClick={() => setActiveBlockTab(block.number)}
                    className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 px-2 py-0.5 rounded transition-colors cursor-pointer"
                    title="Focar apenas neste bloco"
                  >
                    Focar 🔍
                  </button>
                </div>
                <div className={`max-w-prose leading-relaxed text-gray-300 relative z-10 space-y-3 ${textScaleClass}`}>
                  {isDecoderMode ? (
                    <div className="decoder-terminal-active p-4 rounded-xl border border-emerald-500/40 relative overflow-hidden my-2">
                      <MathRenderer
                        content={parsedBlocksMap.get(block.number)?.templateText || block.content}
                        textClassName={textScaleClass}
                        renderSlot={(token) => renderSlotToken(token, block.number)}
                      />
                    </div>
                  ) : (
                    <MathRenderer content={block.content} textClassName={textScaleClass} />
                  )}
                  {renderBlockOptionTray(block.number)}
                  {renderBlockStamp(block.number)}
                </div>
                {block.highlight && (
                  <div className="mt-4 p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl relative z-10 flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-mono uppercase font-black text-cyan-400 tracking-wider">
                      DESTAQUE:
                    </span>
                    {isDecoderMode ? (
                      <span className="text-xs font-mono text-amber-400/80 bg-slate-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                        🔒 METADADOS RETIDOS EM TREINO DECODER
                      </span>
                    ) : (
                      block.highlight.split(/\s*\/\/\s*|\s*\/\s*/).map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-blue-900/40 border border-blue-500/30 text-cyan-200 text-xs font-mono font-semibold">
                          {tag.replace(/\*\*/g, '').trim()}
                        </span>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Árvore de Triagem */}
        {card.sec02_theory.triagePatterns.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="bg-slate-950 border-b border-slate-800 p-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-emerald-500">⚡</span> ÁRVORE DE TRIAGEM TÁTICA
              </h3>
            </div>
            
            <div className="flex border-b border-slate-800 bg-slate-900/50">
              {card.sec02_theory.triagePatterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => setActiveRoute(pattern.id)}
                  className={`flex-1 py-4 px-2 text-center font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                    activeRoute === pattern.id 
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
                      : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>

            {activePattern && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="text-xs font-black text-amber-500 mb-2 uppercase tracking-widest">Sinal de Reconhecimento</div>
                  <div className="text-gray-200 font-medium">
                    <MathRenderer content={activePattern.trigger15s} />
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-5 border border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                  <div className="text-xs font-black text-emerald-500 mb-2 uppercase tracking-widest">Algoritmo (Passo a Passo)</div>
                  <ul className="space-y-2">
                    {activePattern.algorithm.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <span className="text-emerald-600 font-mono font-bold">{i+1}.</span>
                        <span><MathRenderer content={step} /></span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-5 border border-red-900/30">
                  <div className="text-xs font-black text-red-400 mb-2 uppercase tracking-widest">Distratores Clássicos</div>
                  <div className="text-gray-300 text-sm">
                    <MathRenderer content={activePattern.distractors} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
