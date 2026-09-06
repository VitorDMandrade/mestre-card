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
    <section id="sec-03" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <span className="text-blue-500">03.</span> MOTOR ESTRUTURAL
      </h2>

      {structure.type === 'qualitative' && (
        <div className="space-y-6">
          {/* Stepper Tático Conectado (Cadeia Causal 01 a 05) */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-cyan-400">🔗</span> STEPPER CAUSAL TÁTICO
              </h3>
              <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-500/30">
                01 ➔ 05 FLUXO CONECTADO
              </span>
            </div>

            {/* Layout Híbrido: Mobile Vertical com Linha / Desktop Horizontal com Setas Conectoras */}
            {(() => {
              const steps = [
                {
                  num: '01',
                  title: 'Causas Materiais',
                  badgeClass: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
                  titleClass: 'text-amber-400',
                  content: structure.causalChain.causes
                },
                {
                  num: '02',
                  title: 'Agentes Históricos',
                  badgeClass: 'bg-blue-950/60 border-blue-500/40 text-blue-300',
                  titleClass: 'text-blue-400',
                  content: structure.causalChain.agents
                },
                {
                  num: '03',
                  title: 'Mecanismos de Ação',
                  badgeClass: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
                  titleClass: 'text-emerald-400',
                  content: structure.causalChain.mechanisms
                },
                {
                  num: '04',
                  title: 'Consequências Diretas',
                  badgeClass: 'bg-red-950/60 border-red-500/40 text-red-300',
                  titleClass: 'text-red-400',
                  content: structure.causalChain.consequences
                },
                {
                  num: '05',
                  title: 'Desdobramentos',
                  badgeClass: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
                  titleClass: 'text-purple-400',
                  content: structure.causalChain.unfoldings || 
                    structure.causalChain.developments || 
                    structure.causalChain.desdobramentos || 
                    'Impactos estruturais de longo prazo e desdobramentos críticos articulados aos nós anteriores.'
                }
              ];

              return (
                <div className="relative border-l-2 border-cyan-500/30 pl-4 space-y-4 md:border-l-0 md:pl-0 md:space-y-0 md:flex md:items-stretch md:gap-2">
                  {steps.map((step, idx) => (
                    <div key={step.num} className="contents md:flex md:flex-1 md:items-stretch">
                      {/* Card do Passo */}
                      <div className="w-full bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] relative group">
                        <div>
                          {/* Cabeçalho do Nó */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className={`px-2 py-0.5 rounded font-mono text-xs font-black border ${step.badgeClass}`}>
                              NÓ {step.num}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"></div>
                          </div>
                          
                          <h4 className={`text-xs font-black uppercase tracking-wider mb-2 ${step.titleClass}`}>
                            {step.num}. {step.title}
                          </h4>

                          <div className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            <MathRenderer content={step.content} />
                          </div>
                        </div>
                      </div>

                      {/* Seta Conectora Tática no Desktop */}
                      {idx < steps.length - 1 && (
                        <div className="hidden md:flex items-center justify-center text-cyan-400/70 font-mono text-base select-none shrink-0 px-1">
                          <span className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">➔</span>
                        </div>
                      )}
                    </div>
                  ))}
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
                      <td className="p-4 text-sm text-gray-500 hidden md:table-cell"><MathRenderer content={v.conversions} /></td>
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
