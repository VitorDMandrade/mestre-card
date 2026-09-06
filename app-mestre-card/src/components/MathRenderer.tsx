import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { useReading } from '../context/ReadingContext';

interface MathRendererProps {
  content: string;
  className?: string;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const TAG_REGEX = /(\*\*[\s\S]*?\*\*|==[\s\S]*?==|!![\s\S]*?!!)/g;
const ENTITY_REGEX = /(\b\d{1,2}º?\s+[Ss]éculo|\b[Ss]éculo\s+[IVXLCDM]+|\b(?:1[4-9]\d{2}|20\d{2})(?:[–\-–](?:1[4-9]\d{2}|20\d{2}))?\b|\b\d+[\.,]?\d*\s*%|\b(?:jamais|nunca|exclusivamente|unicamente|não confundir)\b)/gi;

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const { isBionic, searchTerm, semanticColors } = useReading();

  // Helper para renderizar folhas de texto (aplicando Spotlight Search e Bionic Reading)
  const renderLeafText = (text: string, keyPrefix: string, allowBionic: boolean = true): React.ReactNode => {
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
          return renderLeafText(part, `${keyPrefix}-sleaf-${sIdx}`, allowBionic);
        });
      }
    }

    // Se Bionic Reading estiver ativo e permitido nesta folha
    if (isBionic && allowBionic) {
      const tokens = text.split(/(\s+)/);
      return tokens.map((token, tIdx) => {
        if (/^\s+$/.test(token) || token.length <= 1) {
          return <span key={`${keyPrefix}-bio-${tIdx}`}>{token}</span>;
        }
        // Fixação sacádica otimizada (1 letra para 2-3, 2 para 4-5, 3 para 6-9, 4 para 10+)
        const fixLen = token.length <= 3 ? 1 : token.length <= 5 ? 2 : token.length <= 9 ? 3 : 4;
        const head = token.slice(0, fixLen);
        const tail = token.slice(fixLen);

        return (
          <span key={`${keyPrefix}-bio-${tIdx}`} className="inline">
            <strong className="font-extrabold text-slate-100 tracking-normal">{head}</strong>
            <span className="text-slate-300/85">{tail}</span>
          </span>
        );
      });
    }

    return <span key={keyPrefix}>{text}</span>;
  };

  // Helper para renderizar segmentos simples de texto com auto-detecção de entidades
  const renderPlainWithEntities = (plainText: string, segKey: string): React.ReactNode => {
    if (!semanticColors) {
      return renderLeafText(plainText, segKey, true);
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
              className="text-amber-300 font-semibold bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/25 font-mono text-[0.93em] mx-0.5 shadow-sm inline-block"
            >
              {renderLeafText(part, `${subKey}-leaf`, false)}
            </span>
          );
        }
        // Se for porcentagem
        if (/%/.test(part)) {
          return (
            <span
              key={subKey}
              className="text-emerald-300 font-mono font-bold bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20 mx-0.5 inline-block"
            >
              {renderLeafText(part, `${subKey}-leaf`, false)}
            </span>
          );
        }
        // Se for palavra de armadilha / alerta
        return (
          <span
            key={subKey}
            className="text-rose-400 font-bold underline decoration-rose-500/60 decoration-wavy mx-0.5 inline-block"
          >
            {renderLeafText(part, `${subKey}-leaf`, false)}
          </span>
        );
      }

      return renderLeafText(part, subKey, true);
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
          <p key={index} className="text-slate-300 leading-relaxed text-sm">
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

                    // Tag 1: Conceito Chave (**texto**)
                    if (segment.startsWith('**') && segment.endsWith('**') && segment.length >= 4) {
                      const inner = segment.slice(2, -2);
                      return (
                        <strong key={tagKey} className="text-cyan-300 font-bold tracking-tight mx-0.5">
                          {renderLeafText(inner, `${tagKey}-inner`, false)}
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
                          {renderLeafText(inner, `${tagKey}-inner`, false)}
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
                          {renderLeafText(inner, `${tagKey}-inner`, false)}
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
