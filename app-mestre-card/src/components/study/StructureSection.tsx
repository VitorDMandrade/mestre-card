import React, { useState, useMemo } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { buildCircuitNodes, type CircuitNode } from '../../lib/circuit-engine';
import {
  playCircuitConnectSound,
  playCircuitShortSound,
  playReactorOverdriveSound
} from '../../lib/audio';
import { addXP } from '../../lib/xp-engine';
import { useGame } from '../../context/GameContext';

interface StructureSectionProps {
  card: MestreCardData;
  soundEnabled?: boolean;
  onRewardXp?: (amount: number, label: string) => void;
}

const useSafeGame = () => {
  try {
    return useGame();
  } catch {
    return null;
  }
};

export const StructureSection: React.FC<StructureSectionProps> = ({
  card,
  soundEnabled = true,
  onRewardXp
}) => {
  const structure = card.sec03_structure;
  const gameCtx = useSafeGame();

  const [activeMode, setActiveMode] = useState<'canonical' | 'reactor'>('canonical');
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(0);
  const [isShortCircuited, setIsShortCircuited] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [xpAwarded, setXpAwarded] = useState<boolean>(false);

  const nodes = useMemo(() => buildCircuitNodes(card), [card]);
  const totalNodes = nodes.length || 5;
  const conductionPercent = Math.min(100, Math.round((currentNodeIndex / totalNodes) * 100));

  if (!structure) return null;

  if (!structure.type) {
    const s = structure as any;
    if ('formulaChamber' in s || 'variables' in s) {
      // @ts-ignore
      structure.type = 'quantitative';
    } else if ('causalChain' in s || 'comparisonTable' in s) {
      // @ts-ignore
      structure.type = 'qualitative';
    }
  }

  const handleConnect = (option: string, node: CircuitNode) => {
    if (isShortCircuited || completed) return;

    if (option === node.correctAnswer) {
      playCircuitConnectSound(soundEnabled);
      const nextIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextIndex);

      if (nextIndex >= totalNodes) {
        setCompleted(true);
        playReactorOverdriveSound(soundEnabled);
        if (!xpAwarded) {
          setXpAwarded(true);
          const xpRes = addXP(150);
          try {
            gameCtx?.fireXpToast(150, xpRes.leveledUp ? xpRes.newLevelName : undefined);
            gameCtx?.refreshProfile();
          } catch {}
          if (onRewardXp) {
            onRewardXp(150, '★ CIRCUITO CAUSAL ESTABILIZADO (100 KV) ★');
          }
        }
      }
    } else {
      setIsShortCircuited(true);
      setLastError('Curto-circuito por inversão de causa-efeito detectado no terminal.');
      playCircuitShortSound(soundEnabled);
    }
  };

  const handleResetBreaker = () => {
    setIsShortCircuited(false);
    setLastError(null);
    playCircuitConnectSound(soundEnabled);
  };

  const handleRestartReactor = () => {
    setCurrentNodeIndex(0);
    setIsShortCircuited(false);
    setCompleted(false);
    setLastError(null);
    playCircuitConnectSound(soundEnabled);
  };

  return (
    <section id="sec-03" className="mb-12 scroll-mt-44">
      {/* Cabeçalho da Seção com Comutador Canônico / Reator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            SEÇÃO 03 // MOTOR ESTRUTURAL
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mt-0.5">
            <span className="text-blue-500">03.</span> MOTOR ESTRUTURAL
            {completed && (
              <span className="text-xs px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                ⚡ CIRCUITO 100% KV
              </span>
            )}
          </h2>
        </div>

        {/* Toggle Tático de Alta Visibilidade */}
        <div className="flex p-1.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveMode('canonical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
              activeMode === 'canonical'
                ? 'bg-slate-800 text-white shadow-md border border-slate-600/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 Matriz Canônica
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('reactor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeMode === 'reactor'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_18px_rgba(0,245,255,0.35)]'
                : 'text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950/30'
            }`}
          >
            <span>⚡ Reator Causal</span>
            <span className="text-[10px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-sm">
              +150 XP
            </span>
          </button>
        </div>
      </div>

      {/* RENDERIZAÇÃO CANÔNICA (Preservação 100% Integral) */}
      {activeMode === 'canonical' && (
        <>
          {structure.type === 'qualitative' && (
            <div className="space-y-6">
              {/* Stepper Tático Conectado (Cadeia Causal 01 a 05) */}
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 text-lg">🔗</span>
                      <h3 className="text-lg font-black text-white tracking-tight">
                        MATRIZ CAUSAL TÁTICA // ENCADINHAMENTO ESTRUTURAL
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Mecanismos causais integrados de 01 a 05 sem colapso de contexto.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30 self-start sm:self-auto">
                    01 ➔ 05 FLUXO CONECTADO
                  </span>
                </div>

                {(() => {
                  const steps = [
                    {
                      num: '01',
                      icon: '🏛️',
                      title: 'Causas Materiais',
                      subtitle: 'Origens & Pressões Estruturais',
                      badgeClass: 'bg-amber-950/70 border-amber-500/50 text-amber-300',
                      borderHover: 'hover:border-amber-500/50',
                      titleClass: 'text-amber-400',
                      glow: 'rgba(245, 158, 11, 0.15)',
                      nextTarget: '02. Agentes Históricos',
                      content: structure.causalChain?.causes
                    },
                    {
                      num: '02',
                      icon: '👥',
                      title: 'Agentes Históricos',
                      subtitle: 'Grupos, Nações & Classes de Poder',
                      badgeClass: 'bg-blue-950/70 border-blue-500/50 text-blue-300',
                      borderHover: 'hover:border-blue-500/50',
                      titleClass: 'text-blue-400',
                      glow: 'rgba(59, 130, 246, 0.15)',
                      nextTarget: '03. Mecanismos de Ação',
                      content: structure.causalChain?.agents
                    },
                    {
                      num: '03',
                      icon: '⚙️',
                      title: 'Mecanismos de Ação',
                      subtitle: 'Leis, Guerras & Tratados Operacionais',
                      badgeClass: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
                      borderHover: 'hover:border-emerald-500/50',
                      titleClass: 'text-emerald-400',
                      glow: 'rgba(16, 185, 129, 0.15)',
                      nextTarget: '04. Consequências Diretas',
                      content: structure.causalChain?.mechanisms
                    },
                    {
                      num: '04',
                      icon: '💥',
                      title: 'Consequências Diretas',
                      subtitle: 'Rupturas & Impactos Imediatos',
                      badgeClass: 'bg-red-950/70 border-red-500/50 text-red-300',
                      borderHover: 'hover:border-red-500/50',
                      titleClass: 'text-red-400',
                      glow: 'rgba(239, 68, 68, 0.15)',
                      nextTarget: '05. Desdobramentos',
                      content: structure.causalChain?.consequences
                    },
                    {
                      num: '05',
                      icon: '🌐',
                      title: 'Desdobramentos',
                      subtitle: 'Efeitos Estruturais de Longo Prazo',
                      badgeClass: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
                      borderHover: 'hover:border-purple-500/50',
                      titleClass: 'text-purple-400',
                      glow: 'rgba(168, 85, 247, 0.15)',
                      nextTarget: 'Consolidação Plena na TRI',
                      content: structure.causalChain?.unfoldings || 
                        structure.causalChain?.developments || 
                        structure.causalChain?.desdobramentos || 
                        'Impactos estruturais de longo prazo e desdobramentos críticos articulados aos nós anteriores.'
                    }
                  ];

                  return (
                    <div className="space-y-6">
                      {/* Trilha de Conexão Rápida no Topo (Pipeline Progressivo) */}
                      <div className="hidden lg:grid grid-cols-5 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
                        {steps.map((step, idx) => (
                          <div key={step.num} className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${step.badgeClass}`}>
                              {step.num}
                            </span>
                            <span className="text-slate-300 truncate font-semibold">
                              {step.title}
                            </span>
                            {idx < steps.length - 1 && (
                              <span className="text-slate-600 ml-auto mr-1">➔</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Grade Espaçosa de Cartões Causais (Zero Amontoamento) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {steps.map((step, idx) => {
                          const isLast = idx === steps.length - 1;
                          return (
                            <div 
                              key={step.num}
                              className={`bg-slate-950/80 border border-slate-800/90 ${step.borderHover} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl relative group ${
                                isLast ? 'md:col-span-2 lg:col-span-2' : ''
                              }`}
                            >
                              <div>
                                {/* Header do Card */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{step.icon}</span>
                                    <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-black border ${step.badgeClass}`}>
                                      NÓ {step.num}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                                    ETAPA {idx + 1}/5
                                  </span>
                                </div>

                                <h4 className={`text-sm font-black uppercase tracking-wide mb-1 ${step.titleClass}`}>
                                  {step.num}. {step.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 font-mono mb-3.5">
                                  {step.subtitle}
                                </p>

                                <div className="text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-3.5 font-sans">
                                  <MathRenderer content={step.content} />
                                </div>
                              </div>

                              {/* Rodapé Tático de Conexão Causal */}
                              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                                <span>Fluxo de Causa:</span>
                                <span className="text-cyan-400/80 font-bold flex items-center gap-1">
                                  <span>➔</span>
                                  <span>{step.nextTarget}</span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Tabela Comparativa */}
              {structure.comparisonTable && (
                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-slate-950 p-4 border-b border-slate-800">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <span className="text-purple-500">⚖️</span> QUADRO COMPARATIVO TÁTICO
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-700">
                          {structure.comparisonTable.header.map((th, i) => (
                            <th key={i} className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {structure.comparisonTable.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className={`p-4 text-sm ${j === 0 ? 'font-bold text-gray-200' : 'text-gray-400'}`}>
                                <MathRenderer content={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {structure.type === 'quantitative' && (
            <div className="space-y-6">
              {/* Formula Chamber */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {structure.formulaChamber.map((formula, i) => (
                  <div key={i} className="bg-slate-900/80 border border-blue-900/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <h3 className="text-blue-400 font-bold mb-4 uppercase tracking-wider text-sm">{formula.title}</h3>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center mb-4 overflow-x-auto">
                      <div className="text-xl md:text-2xl text-white py-2">
                        <MathRenderer content={`$$${formula.latex}$$`} />
                      </div>
                    </div>
                    {formula.notes && (
                      <div className="text-gray-400 text-sm">
                        <MathRenderer content={formula.notes} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Variáveis */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-slate-950 p-4 border-b border-slate-800">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span className="text-amber-500">📐</span> DISSECAÇÃO ANATÔMICA (S.I.)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-700">
                        <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider w-24">Variável</th>
                        <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Significado</th>
                        <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider w-32">Unidade S.I.</th>
                        <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider hidden md:table-cell">Conversões</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {structure.variables.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 text-center border-r border-slate-800">
                            <div className="bg-slate-950 px-2 py-1 rounded inline-block">
                              <MathRenderer content={`$${v.symbol}$`} />
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-300 font-medium">{v.meaning}</td>
                          <td className="p-4 text-sm text-emerald-400 font-mono font-bold"><MathRenderer content={`$${v.siUnit}$`} /></td>
                          <td className="p-4 text-sm text-slate-300 hidden md:table-cell"><MathRenderer content={v.conversions} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Proporcionalidade */}
              {structure.proportionality.length > 0 && (
                <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <span>🔄</span> ANÁLISE DE PROPORCIONALIDADE
                  </h3>
                  <ul className="space-y-3">
                    {structure.proportionality.map((prop, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                        <span className="text-purple-500 mt-0.5">▪</span>
                        <span><MathRenderer content={prop} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* RENDERIZAÇÃO DO REATOR DE ALTA TENSÃO (VIA 2 GAMIFICADA) */}
      {activeMode === 'reactor' && (
        <div 
          className="relative rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-6 backdrop-blur-xl overflow-hidden shadow-2xl space-y-6"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 245, 255, 0.08), transparent 70%), url(/reactor/reactor_bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Painel Tático de Voltagem & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-[inset_0_0_30px_rgba(0,245,255,0.08)] backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Status de Carga</span>
                <span className="text-xs font-mono text-slate-400">Meta: 100 KV</span>
              </div>
              <div className="text-3xl font-black font-mono text-cyan-300 mt-0.5 tracking-tight flex items-baseline gap-1">
                <span>{conductionPercent}</span>
                <span className="text-base text-cyan-400 font-bold">KV</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full mt-2.5 overflow-hidden border border-slate-700/80">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-500 shadow-[0_0_12px_#00f5ff]"
                  style={{ width: `${conductionPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Estabilidade do Circuito</span>
              <div className="flex items-center gap-2 mt-1.5">
                <div className={`w-3.5 h-3.5 rounded-full ${
                  isShortCircuited 
                    ? 'bg-red-500 animate-ping' 
                    : completed 
                    ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' 
                    : 'bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]'
                }`} />
                <span className={`text-xs font-mono font-bold tracking-wide ${
                  isShortCircuited ? 'text-red-400' : completed ? 'text-emerald-300' : 'text-cyan-300'
                }`}>
                  {isShortCircuited ? 'DISJUNTOR DESARMADO' : completed ? 'CIRCUITO SUPERESTÁVEL (100 KV)' : 'ENERGIZANDO BANCADA'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {completed ? 'Carga total transferida sem perda.' : isShortCircuited ? 'Falha térmica por polaridade incorreta.' : `Etapa ${Math.min(currentNodeIndex + 1, totalNodes)} de ${totalNodes}`}
              </div>
            </div>

            <div className="flex items-center justify-end">
              {isShortCircuited ? (
                <button
                  type="button"
                  onClick={handleResetBreaker}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/60 text-xs font-mono font-black tracking-wider transition-all shadow-[0_0_15px_rgba(255,42,85,0.3)] hover:scale-105"
                >
                  ⚡ REARMAR DISJUNTOR
                </button>
              ) : completed ? (
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs font-mono text-emerald-300 font-bold border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                    ★ REATOR EM OVERDRIVE (+150 XP) ★
                  </div>
                  <button
                    type="button"
                    onClick={handleRestartReactor}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-200 underline"
                  >
                    Recalibrar Circuito ↺
                  </button>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">Terminal Ativo:</span>
                  <span className="text-sm font-mono text-cyan-300 font-bold">
                    #{currentNodeIndex + 1} de {totalNodes}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Alerta de Curto-Circuito (Faísca & Disjuntor Desarmado) */}
          {isShortCircuited && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/80 short-circuit-active flex items-start gap-3 shadow-[0_0_25px_rgba(255,42,85,0.25)]">
              <div className="p-2 rounded-lg bg-red-500/20 text-red-400 font-bold text-base">⚠️</div>
              <div className="text-xs text-red-200 leading-relaxed font-mono">
                <strong className="text-red-400 block mb-0.5">DISPARO DE PROTEÇÃO TÉRMICA:</strong>
                {lastError || 'Curto-circuito detectado na conexão de polaridade.'} Incompatibilidade com o encadeamento causal do card. Clique em <strong>REARMAR DISJUNTOR</strong> para retomar a condução.
              </div>
            </div>
          )}

          {/* Diagrama de Terminais e Cabos de Alta Tensão */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {nodes.map((node, idx) => {
              const isEnergized = idx < currentNodeIndex;
              const isCurrent = idx === currentNodeIndex && !completed;
              return (
                <div
                  key={node.id}
                  className={`p-3.5 rounded-xl border text-center transition-all relative overflow-hidden ${
                    isEnergized
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                      : isCurrent
                      ? 'bg-slate-900 border-amber-400/80 shadow-[0_0_15px_rgba(255,184,0,0.2)]'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-tight mb-1">
                    <span>POLO 0{idx + 1}</span>
                    <span>{node.icon}</span>
                  </div>
                  <div className={`text-xs font-black truncate mt-1 ${
                    isEnergized ? 'text-cyan-300' : isCurrent ? 'text-amber-300' : 'text-slate-400'
                  }`}>
                    {node.stageName}
                  </div>
                  <div className="mt-2.5 text-[10px] font-mono font-bold tracking-tight">
                    {isEnergized ? (
                      <span className="text-emerald-400 flex items-center justify-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
                        CONDUZINDO
                      </span>
                    ) : isCurrent ? (
                      <span className="text-amber-400 flex items-center justify-center gap-1 animate-pulse">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]"></span>
                        AGUARDANDO POLO
                      </span>
                    ) : (
                      <span className="text-slate-500">⚪ DESCONECTADO</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fichas de Conexão Causal (Opções para o nó ativo) */}
          {!completed && !isShortCircuited && nodes[currentNodeIndex] && (
            <div className="space-y-3 p-5 rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-lg backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                  <span>🔌</span> SELECIONE O CONECTOR VÁLIDO PARA FECHAR O CIRCUITO:
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Terminal #{currentNodeIndex + 1}: <strong className="text-slate-200">{nodes[currentNodeIndex].stageName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {nodes[currentNodeIndex].options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleConnect(option, nodes[currentNodeIndex])}
                    className="p-3.5 text-left rounded-xl bg-slate-950/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/60 text-xs text-slate-300 hover:text-cyan-200 transition-all font-mono leading-relaxed group shadow-sm hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] flex items-start gap-3"
                  >
                    <span className="text-cyan-400 font-bold group-hover:scale-125 transition-transform mt-0.5">
                      ⏚
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card de Conclusão / Overdrive Triunfal */}
          {completed && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-emerald-950/60 border border-cyan-400/60 shadow-[0_0_30px_rgba(0,245,255,0.2)] text-center space-y-3 backdrop-blur-lg">
              <div className="text-4xl animate-bounce">⚡</div>
              <h3 className="text-xl font-black text-white tracking-tight">
                CIRCUITO CAUSAL TOTALMENTE ESTABILIZADO (100 KV)
              </h3>
              <p className="text-xs font-mono text-cyan-300 max-w-xl mx-auto leading-relaxed">
                Todos os 5 polos estruturais da matéria foram acoplados com nexo causal perfeito.
                O Reator de Alta Tensão gerou sobrecarga triunfal e creditou <strong>+150 XP</strong> no seu perfil de comando.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRestartReactor}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)]"
                >
                  RECALIBRAR CIRCUITO
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
