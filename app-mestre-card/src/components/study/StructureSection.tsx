import React, { useState, useMemo } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { buildCircuitNodes, type CircuitNode } from '../../lib/circuit-engine';
import {
  playCircuitConnectSound,
  playCircuitShortSound,
  playReactorOverdriveSound,
  playBreakerResetSound
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
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [roundKey, setRoundKey] = useState<number>(0);

  const nodes = useMemo(() => buildCircuitNodes(card, roundKey), [card, roundKey]);
  const totalNodes = nodes.length || 5;
  const conductionPercent = Math.min(100, Math.round((currentNodeIndex / totalNodes) * 100));

  // Cálculo do ângulo do ponteiro do voltímetro (-90 graus em 0 KV até +90 graus em 100 KV)
  const needleAngle = (conductionPercent / 100) * 180 - 90;

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

  const handleConnect = (option: string, node: CircuitNode, event?: React.MouseEvent) => {
    if (isShortCircuited || completed) return;

    if (option === node.correctAnswer) {
      playCircuitConnectSound(soundEnabled);
      try {
        gameCtx?.triggerFlash('hit');
        if (event) {
          gameCtx?.fireParticles(event.clientX, event.clientY);
        }
      } catch {}

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
      try {
        gameCtx?.triggerFlash('miss');
      } catch {}
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 400);
    }
  };

  const handleResetBreaker = () => {
    setIsShortCircuited(false);
    setLastError(null);
    playBreakerResetSound(soundEnabled);
  };

  const handleRestartReactor = () => {
    setCurrentNodeIndex(0);
    setIsShortCircuited(false);
    setCompleted(false);
    setLastError(null);
    setRoundKey(k => k + 1);
    playBreakerResetSound(soundEnabled);
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
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-mono font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)] animate-pulse">
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
            onClick={() => {
              setActiveMode('reactor');
              if (completed) {
                setRoundKey(k => k + 1);
              }
            }}
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

      {/* RENDERIZAÇÃO DO REATOR DE ALTA TENSÃO (VIA 2 GAMIFICADA INDUSTRIAL 3D) */}
      {activeMode === 'reactor' && (
        <div 
          className={`relative rounded-3xl bg-slate-950/95 border border-cyan-500/40 p-6 md:p-8 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-7 ${shakeScreen ? 'screen-shake-short' : ''}`}
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 10%, rgba(0, 245, 255, 0.12), transparent 75%), radial-gradient(circle at 80% 80%, rgba(255, 184, 0, 0.05), transparent 60%), url(\'./reactor/reactor_bg.jpg\')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* PAINEL TÁTICO PRINCIPAL: VOLTÍMETRO CIRCULAR + BARRAMENTO + DISJUNTOR 3D */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
            
            {/* 1. GALVANÔMETRO / VOLTÍMETRO ANALÓGICO SVG COM PONTEIRO FÍSICO (4 colunas) */}
            <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                VOLTÍMETRO DE CARGA S.I.
              </div>
              <div className="absolute top-2 right-3 text-[9px] font-mono text-cyan-400/80 font-black">
                100 KV MAX
              </div>

              {/* Dial SVG */}
              <div className="relative w-48 h-28 mt-4 flex items-center justify-center">
                <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                  {/* Arco de fundo */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Arco iluminado proporcional */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#voltageGradient)"
                    strokeWidth="14"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (conductionPercent / 100) * 251}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                    filter="drop-shadow(0 0 6px #00f5ff)"
                  />
                  {/* Gradiente */}
                  <defs>
                    <linearGradient id="voltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f5ff" />
                      <stop offset="70%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>

                  {/* Marcas de graduação (ticks) */}
                  {[0, 25, 50, 75, 100].map((val, i) => {
                    const angle = (i * 45 - 90) * (Math.PI / 180);
                    const x1 = 100 + 70 * Math.cos(angle);
                    const y1 = 100 + 70 * Math.sin(angle);
                    const x2 = 100 + 85 * Math.cos(angle);
                    const y2 = 100 + 85 * Math.sin(angle);
                    return (
                      <line
                        key={val}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#64748b"
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* Ponteiro Físico */}
                  <g
                    style={{
                      transform: `rotate(${needleAngle}deg)`,
                      transformOrigin: '100px 100px',
                      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="24"
                      stroke={isShortCircuited ? '#ff2a55' : '#00f5ff'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter={isShortCircuited ? 'drop-shadow(0 0 8px #ff2a55)' : 'drop-shadow(0 0 6px #00f5ff)'}
                    />
                    <circle cx="100" cy="100" r="8" fill="#334155" stroke="#00f5ff" strokeWidth="2" />
                    <circle cx="100" cy="100" r="3" fill="#ffffff" />
                  </g>
                </svg>
              </div>

              {/* Mostrador Digital LED */}
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`font-mono text-3xl font-black tracking-tight ${
                  isShortCircuited ? 'text-red-400 animate-pulse' : completed ? 'text-emerald-300' : 'text-cyan-300'
                }`}>
                  {conductionPercent}
                </span>
                <span className="font-mono text-xs font-bold text-cyan-400">KV LOAD</span>
              </div>
            </div>

            {/* 2. STATUS DO BARRAMENTO & ESTABILIDADE DO CIRCUITO (5 colunas) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  <span>ESTADO DA SUBESTAÇÃO</span>
                  <span className="text-cyan-400 font-bold">ETAPA {Math.min(currentNodeIndex + 1, totalNodes)} / {totalNodes}</span>
                </div>

                {/* Status Principal */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    isShortCircuited 
                      ? 'bg-red-500 shadow-[0_0_15px_#ff2a55] animate-ping' 
                      : completed 
                      ? 'bg-emerald-400 shadow-[0_0_15px_#34d399]' 
                      : 'bg-cyan-400 shadow-[0_0_12px_#00f5ff] animate-pulse'
                  }`} />
                  <div>
                    <div className={`text-xs font-mono font-black tracking-wide ${
                      isShortCircuited ? 'text-red-400' : completed ? 'text-emerald-300' : 'text-cyan-300'
                    }`}>
                      {isShortCircuited ? 'DISJUNTOR DESARMADO // CURTO TÉRMICO' : completed ? 'REATOR ESTABILIZADO EM SOBRECARGA 100%' : 'ENERGIZANDO BANCADA DE POLOS'}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {isShortCircuited
                        ? 'Sobrecarga por inversão de polaridade. Bancada protegida.'
                        : completed
                        ? 'Convergência perfeita: +150 XP creditados na sessão.'
                        : `Aguardando acoplamento do conector para o Polo 0${currentNodeIndex + 1}.`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra de Condução Dinâmica */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Condução Térmica & Elétrica:</span>
                  <span className="text-cyan-300 font-bold">{conductionPercent}% Concluído</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700/80 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_12px_#00f5ff]"
                    style={{ width: `${conductionPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 3. ALAVANCA MECÂNICA 3D DE DISJUNTOR INDUSTRIAL BIPOLAR (3 colunas) */}
            <div className="lg:col-span-3 p-4 rounded-xl breaker-housing-3d flex flex-col items-center justify-between text-center relative overflow-hidden">
              {/* Faixas de perigo superior e inferior */}
              <div className={`w-full h-1.5 ${isShortCircuited ? 'hazard-stripes-danger' : 'hazard-stripes-amber'} opacity-75`} />

              <div className="w-full flex items-center justify-between px-1 text-[9px] font-mono text-slate-400 uppercase font-black tracking-widest my-1">
                <span>DISJUNTOR</span>
                <span className={isShortCircuited ? 'text-red-400 animate-pulse' : 'text-cyan-400'}>
                  {isShortCircuited ? 'DESARMADO' : 'ARMADO'}
                </span>
              </div>

              {/* A Alavanca Física 3D Interativa */}
              <div 
                onClick={isShortCircuited ? handleResetBreaker : undefined}
                className={`w-20 h-28 my-1 rounded-xl bg-slate-950 border-2 border-slate-700 flex flex-col items-center justify-between p-2 shadow-2xl relative cursor-pointer group select-none transition-all ${
                  isShortCircuited ? 'hover:border-red-400 hover:scale-105' : 'cursor-default'
                }`}
                title={isShortCircuited ? 'Clique para puxar a alavanca e rearmar o circuito' : 'Disjuntor operacional'}
              >
                {/* Slot da alavanca */}
                <div className="w-4 h-full bg-slate-900 rounded-full border border-slate-800 relative flex flex-col justify-between items-center py-1">
                  {/* Parafusos */}
                  <span className="text-[7px] text-slate-600">●</span>
                  <span className="text-[7px] text-slate-600">●</span>

                  {/* A Manopla da Alavanca */}
                  <div
                    className={`w-12 h-9 rounded-lg border-2 breaker-lever-arm flex items-center justify-center shadow-2xl ${
                      isShortCircuited
                        ? 'tripped bg-gradient-to-b from-red-600 to-red-950 border-red-400 text-white font-mono text-[9px] font-black'
                        : 'armed bg-gradient-to-b from-slate-600 to-slate-800 border-cyan-400/80 text-cyan-300 font-mono text-[9px] font-bold'
                    }`}
                  >
                    {isShortCircuited ? 'OFF ⚡' : 'ON 🟢'}
                  </div>
                </div>
              </div>

              {/* Botão de Rearme Rápido */}
              {isShortCircuited ? (
                <button
                  type="button"
                  onClick={handleResetBreaker}
                  className="w-full py-1.5 px-2 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-200 border border-red-500/60 font-mono font-black text-[10px] tracking-wider transition-all animate-pulse shadow-[0_0_15px_rgba(255,42,85,0.4)]"
                >
                  ⚡ REARMAR AGORA
                </button>
              ) : (
                <span className="text-[10px] font-mono text-slate-500">
                  Proteção Térmica Ativa
                </span>
              )}

              <div className={`w-full h-1.5 ${isShortCircuited ? 'hazard-stripes-danger' : 'hazard-stripes-amber'} opacity-75 mt-1`} />
            </div>
          </div>

          {/* ALERTA VISCERAL DE CURTO-CIRCUITO / DISPARO TÉRMICO */}
          {isShortCircuited && (
            <div className="p-5 rounded-2xl bg-red-950/70 border-2 border-red-500 short-circuit-active shadow-[0_0_35px_rgba(255,42,85,0.35)] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-500/30 border border-red-500/60 text-red-300 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-mono font-black text-red-400 uppercase tracking-wide">
                    DISPARO DE PROTEÇÃO TÉRMICA // ARCO VOLTAICO INTERROMPIDO
                  </h4>
                  <p className="text-xs text-red-200 font-mono leading-relaxed mt-0.5">
                    {lastError || 'Inversão causal ou correlação espúria detectada.'} A corrente foi cessada para proteger os dados. Puxe a alavanca do disjuntor para restabelecer o circuito.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetBreaker}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs tracking-wider transition-all shadow-lg hover:scale-105 flex-shrink-0"
              >
                ⚡ PUXAR ALAVANCA E REARMAR
              </button>
            </div>
          )}

          {/* BARRAMENTO DE ALTA TENSÃO (5 TERMINAIS INTERLIGADOS EM LINHA) */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
              <span className="flex items-center gap-2 text-cyan-400 font-bold">
                <span>🔌</span> BARRAMENTO DE ALTA TENSÃO (POLOS 01 A 05):
              </span>
              <span>Conexão em Série Estrita</span>
            </div>

            {/* Linha de Conduíte Elétrico SVG */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 relative z-10">
                {nodes.map((node, idx) => {
                  const isEnergized = idx < currentNodeIndex;
                  const isCurrent = idx === currentNodeIndex && !completed;
                  return (
                    <div
                      key={node.id}
                      className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                        isEnergized
                          ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.25)]'
                          : isCurrent
                          ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_20px_rgba(255,184,0,0.25)] ring-2 ring-amber-400/40'
                          : 'bg-slate-950/70 border-slate-800/80 opacity-60'
                      }`}
                    >
                      {/* Efeito de parafuso nos cantos */}
                      <span className="absolute top-1.5 left-2 text-[8px] text-slate-600">✦</span>
                      <span className="absolute top-1.5 right-2 text-[8px] text-slate-600">✦</span>

                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-tight mt-1 mb-1.5">
                          <span className="font-bold">{node.terminalLabel.split(':')[0]}</span>
                          <span className="text-base">{node.icon}</span>
                        </div>
                        <h4 className={`text-xs font-black leading-snug line-clamp-2 ${
                          isEnergized ? 'text-cyan-300' : isCurrent ? 'text-amber-300' : 'text-slate-400'
                        }`}>
                          {node.stageName}
                        </h4>
                      </div>

                      {/* Status do Polo */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono font-bold">
                        {isEnergized ? (
                          <div className="text-emerald-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                            CONDUZINDO
                          </div>
                        ) : isCurrent ? (
                          <div className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
                            AGUARDANDO PLUG
                          </div>
                        ) : (
                          <div className="text-slate-500 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                            DESCONECTADO
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BANCADA DE PATCH // CONECTORES TÁTEIS DISPONÍVEIS */}
          {!completed && !isShortCircuited && nodes[currentNodeIndex] && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                  <span>⚡</span> BANCADA DE PATCH // CONECTORES DE FECHAMENTO CAUSAL:
                </span>
                <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/40">
                  Target: {nodes[currentNodeIndex].stageName}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1">
                {nodes[currentNodeIndex].options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={(e) => handleConnect(option, nodes[currentNodeIndex], e)}
                    className="p-4 text-left rounded-xl plug-card-tactile border border-slate-700/80 text-xs text-slate-200 hover:text-white font-mono leading-relaxed group flex items-start gap-4 cursor-pointer"
                  >
                    {/* Cabeça do Plug Industrial */}
                    <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 border border-slate-600 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-all flex-shrink-0 shadow-md">
                      <span className="text-base font-black">🔌</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                        <span>CONECTOR TÁTICO #{oIdx + 1}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400/80">ISOLAMENTO 100 KV</span>
                      </div>
                      <div className="text-xs text-slate-300 group-hover:text-cyan-200 transition-colors font-sans font-medium">
                        {option}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CÂMARA DE SOBRECARGA / REATOR EM 100% OVERDRIVE */}
          {completed && (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-emerald-950/80 border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,245,255,0.3)] text-center space-y-4 backdrop-blur-2xl relative overflow-hidden">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center text-3xl shadow-[0_0_25px_#00f5ff] animate-bounce">
                ⚡
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                REATOR CAUSAL TOTALMENTE ESTABILIZADO (100 KV OVERDRIVE)
              </h3>
              <p className="text-sm font-mono text-cyan-200 max-w-2xl mx-auto leading-relaxed">
                Todos os 5 polos estruturais foram acoplados sem nenhuma perda térmica ou erro de polaridade.
                O reator atingiu sobrecarga harmônica e creditou <strong>+150 XP</strong> de elite na sua conta de comando.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleRestartReactor}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-xs tracking-wider transition-all shadow-[0_0_25px_rgba(0,245,255,0.5)] hover:scale-105"
                >
                  RECALIBRAR CIRCUITO (NOVO CICLO)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('canonical')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono font-bold text-xs tracking-wider transition-all"
                >
                  RETORNAR À MATRIZ CANÔNICA
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
