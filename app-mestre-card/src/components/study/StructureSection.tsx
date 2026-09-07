import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';

interface StructureSectionProps {
  card: MestreCardData;
}

export const StructureSection = ({ card }: StructureSectionProps) => {
  const structure = card.sec03_structure;

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

  return (
    <section id="sec-03" className="mb-12 scroll-mt-44">
      <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <span className="text-blue-500">03.</span> MOTOR ESTRUTURAL
      </h2>

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
                  content: structure.causalChain.causes
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
                  content: structure.causalChain.agents
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
                  content: structure.causalChain.mechanisms
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
                  content: structure.causalChain.consequences
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
                  content: structure.causalChain.unfoldings || 
                    structure.causalChain.developments || 
                    structure.causalChain.desdobramentos || 
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
                      // O último passo ganha destaque visual expandido se for ímpar na última linha
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
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
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
          <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
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
            <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6">
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
    </section>
  );
};
