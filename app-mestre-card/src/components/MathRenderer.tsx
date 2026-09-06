import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

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
              return <span key={pIndex} className="whitespace-pre-wrap">{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
};

// ErrorBoundary local para evitar que falha no KaTeX crashe a view
class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
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
