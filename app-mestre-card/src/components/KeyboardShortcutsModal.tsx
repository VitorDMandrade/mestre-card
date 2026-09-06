import React, { useEffect } from 'react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      keys: [',', '.'],
      label: 'Navegação de Abas do Arcade',
      desc: 'Alterna instantaneamente entre G1 a G5 sem precisar tocar no mouse.'
    },
    {
      keys: ['1', '2', '3', '4'],
      label: 'Seleção de Alternativas',
      desc: 'Seleciona as opções A, B, C ou D no Laboratório Prático e Boss Fight.'
    },
    {
      keys: ['V', 'F'],
      label: 'Julgamento Rápido TRI',
      desc: 'Responde Verdadeiro ou Falso imediatamente no G3: Pressão TRI.'
    },
    {
      keys: ['Espaço'],
      label: 'Avançar / Confirmar',
      desc: 'Avança para a próxima questão ou fecha pareceres de feedback.'
    },
    {
      keys: ['?'],
      label: 'Guia de Controles',
      desc: 'Abre e fecha este painel tático de comandos.'
    },
    {
      keys: ['Esc'],
      label: 'Fechar Janelas',
      desc: 'Fecha modais e terminais ativos na tela.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-lg">⌨️</span>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Comandos & Atalhos Táticos</h3>
              <p className="text-xs font-mono text-slate-400">Controles rápidos para hiper-revisão</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 transition-colors font-mono text-sm"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {shortcuts.map((sc, i) => (
            <div 
              key={i} 
              className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-200">{sc.label}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{sc.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {sc.keys.map((k, j) => (
                  <kbd 
                    key={j}
                    className="min-w-[28px] h-7 px-2 rounded-md bg-slate-800 border border-slate-600 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shadow-inner shadow-black/40"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-lg shadow-cyan-600/20"
          >
            Entendido (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
