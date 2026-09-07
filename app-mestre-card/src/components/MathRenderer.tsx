import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { useReading } from '../context/ReadingContext';

interface MathRendererProps {
  content: string;
  className?: string;
  textClassName?: string;
  renderSlot?: (token: string) => React.ReactNode;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const TAG_REGEX = /(\{\{SLOT_\d+\}\}|\*\*[\s\S]*?\*\*|==[\s\S]*?==|!![\s\S]*?!!)/g;
const ENTITY_REGEX = /(\b\d{1,2}º?\s+[Ss]éculo|\b[Ss]éculo\s+[IVXLCDM]+|\b(?:1[4-9]\d{2}|20\d{2})(?:[–\-–](?:1[4-9]\d{2}|20\d{2}))?\b|\b\d+[\.,]?\d*\s*%|\b(?:jamais|nunca|exclusivamente|unicamente|não confundir)\b)/gi;

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', textClassName, renderSlot }) => {
  if (!content) return null;

  const { searchTerm, semanticColors } = useReading();

  // Helper para renderizar folhas de texto (aplicando Spotlight Search)
  const renderLeafText = (text: string, keyPrefix: string): React.ReactNode => {
    if (!text) return null;

    const trimmedSearch = searchTerm ? searchTerm.trim() : '';

    // Se houver termo de busca com pelo menos 2 caracteres, aplica o Spotlight Search
    if (trimmedSearch.length >= 2) {
      const searchRegex = new RegExp(`(${escapeRegExp(trimmedSearch)})`, 'gi');
      const searchParts = text.split(searchRegex);

      if (searchParts.length > 1) {
        return searchParts.map((part, sIdx) => {
          if (part.toLowerCase() === trimmedSearch.toLowerCase()) {
            return (
              <mark
                key={`${keyPrefix}-spot-${sIdx}`}
                className="bg-yellow-400 text-black font-extrabold px-1.5 py-0.5 rounded shadow-[0_0_12px_rgba(250,204,21,0.95)] border border-yellow-300 inline-block animate-pulse mx-0.5"
              >
                {part}
              </mark>
            );
          }
          return renderLeafText(part, `${keyPrefix}-sleaf-${sIdx}`);
        });
      }
    }

    return <span key={keyPrefix}>{text}</span>;
  };

  // Helper para renderizar segmentos simples de texto com auto-detecção de entidades
  const renderPlainWithEntities = (plainText: string, segKey: string): React.ReactNode => {
    if (!semanticColors) {
      return renderLeafText(plainText, segKey);
    }

    const isEntityMatch = (str: string) => {
      const re = new RegExp(ENTITY_REGEX.source, 'i');
      return re.test(str);
    };

    const entityParts = plainText.split(ENTITY_REGEX);

    return entityParts.map((part, eIdx) => {
      const subKey = `${segKey}-ent-${eIdx}`;

      if (isEntityMatch(part)) {
        // Se for data ou século
        if (/\d{4}|[Ss]éculo/.test(part)) {
          return (
            <span
              key={subKey}
              className="text-amber-300 font-semibold bg-amber-500/15 px-1 py-0.5 rounded border border-amber-500/30 font-mono text-[0.93em] mx-0.5 shadow-sm inline-block"
            >
              {renderLeafText(part, `${subKey}-leaf`)}
            </span>
          );
        }
        // Se for porcentagem
        if (/%/.test(part)) {
          return (
            <span
              key={subKey}
              className="text-emerald-300 font-mono font-bold bg-emerald-500/15 px-1 py-0.5 rounded border border-emerald-500/30 mx-0.5 inline-block"
            >
              {renderLeafText(part, `${subKey}-leaf`)}
            </span>
          );
        }
        // Se for palavra de armadilha / alerta
        return (
          <span
            key={subKey}
            className="text-rose-400 font-bold underline decoration-rose-500/60 decoration-wavy mx-0.5 inline-block"
          >
            {renderLeafText(part, `${subKey}-leaf`)}
          </span>
        );
      }

      return renderLeafText(part, subKey);
    });
  };

  // Quebra o texto por blocos matemáticos $$...$$
  const blocks = content.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, index) => {
        if (block.startsWith('$$') && block.endsWith('$$')) {
          const math = block.slice(2, -2);
          return (
            <div key={index} className="overflow-x-auto my-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <ErrorBoundary fallback={<span className="text-red-400 font-mono text-sm">{block}</span>}>
                <BlockMath math={math} />
              </ErrorBoundary>
            </div>
          );
        }

        // Processa inline math $...$ dentro do bloco de texto
        const inlineParts = block.split(/(\$[\s\S]*?\$)/g);

        return (
          <p key={index} className={`${textClassName || 'text-slate-300 text-sm'} leading-relaxed`}>
            {inlineParts.map((part, pIndex) => {
              if (part.startsWith('$') && part.endsWith('$')) {
                const math = part.slice(1, -1);
                return (
                  <ErrorBoundary key={pIndex} fallback={<span className="text-red-400 font-mono">{part}</span>}>
                    <span className="text-emerald-300 mx-1">
                      <InlineMath math={math} />
                    </span>
                  </ErrorBoundary>
                );
              }

              // Limpeza de barras duplas residuais
              const cleanPart = part.replace(/\s*\/\/\s*/g, ' • ');

              // Segmentação por tags semânticas (**negrito**, ==highlight==, !!alerta!!)
              const tagSegments = cleanPart.split(TAG_REGEX);

              return (
                <span key={pIndex} className="whitespace-pre-wrap">
                  {tagSegments.map((segment, sIndex) => {
                    const tagKey = `p-${pIndex}-s-${sIndex}`;

                    // Tag 0: Slot do Protocolo Decoder ({{SLOT_N}})
                    if (segment.startsWith('{{SLOT_') && segment.endsWith('}}')) {
                      if (renderSlot) {
                        return (
                          <React.Fragment key={tagKey}>
                            {renderSlot(segment)}
                          </React.Fragment>
                        );
                      }
                      return <span key={tagKey} className="font-mono text-amber-400 font-bold">{segment}</span>;
                    }

                    // Tag 1: Conceito Chave (**texto**)
                    if (segment.startsWith('**') && segment.endsWith('**') && segment.length >= 4) {
                      const inner = segment.slice(2, -2);
                      const isPaperTheme = textClassName?.includes('text-zinc-950') || textClassName?.includes('text-stone-900');
                      return (
                        <strong 
                          key={tagKey} 
                          className={isPaperTheme 
                            ? "text-amber-950 font-black tracking-tight mx-0.5 underline decoration-amber-800/60" 
                            : "text-cyan-300 font-bold tracking-tight mx-0.5 underline decoration-cyan-500/40"
                          }
                        >
                          {renderLeafText(inner, `${tagKey}-inner`)}
                        </strong>
                      );
                    }

                    // Tag 2: Marcação Tática (==texto==)
                    if (segment.startsWith('==') && segment.endsWith('==') && segment.length >= 4) {
                      const inner = segment.slice(2, -2);
                      return (
                        <mark
                          key={tagKey}
                          className="bg-amber-400/20 text-amber-200 border-b-2 border-amber-400/60 px-1 py-0.5 rounded font-semibold mx-0.5 inline-block"
                        >
                          {renderLeafText(inner, `${tagKey}-inner`)}
                        </mark>
                      );
                    }

                    // Tag 3: Alerta de Pegadinha (!!texto!!)
                    if (segment.startsWith('!!') && segment.endsWith('!!') && segment.length >= 4) {
                      const inner = segment.slice(2, -2);
                      return (
                        <span
                          key={tagKey}
                          className="bg-rose-500/15 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-1 mx-0.5 shadow-sm"
                        >
                          <span className="text-xs">⚠️</span>
                          {renderLeafText(inner, `${tagKey}-inner`)}
                        </span>
                      );
                    }

                    // Texto Comum com Auto-detecção de Entidades e Bionic Reading
                    return renderPlainWithEntities(segment, tagKey);
                  })}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

// ErrorBoundary local para evitar que falha no KaTeX crashe a view
class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
