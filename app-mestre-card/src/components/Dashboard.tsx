import { useState } from 'react';
import type { MestreCardData } from '../types/mestre-card';

interface DashboardProps {
  cards: MestreCardData[];
  historyMap: Record<string, number>;
  onSelectCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onImportCard: (jsonStr: string) => void;
  onExportBackup: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ cards, historyMap, onSelectCard, onDeleteCard, onImportCard, onExportBackup }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const uniqueTopics = new Set(cards.map(c => c.topic)).size;

  const handleImport = () => {
    onImportCard(jsonInput);
    setJsonInput('');
    setIsTerminalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header HUD */}
      <div className="glass-card p-6 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Centro de Comando HUD
          </h1>
          <p className="text-slate-400 text-sm font-mono mt-1">
            STATUS: <span className="text-emerald-400 glow-emerald font-bold">ONLINE</span>
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <p className="text-xs text-slate-500 font-mono mb-1">TOTAL CARDS</p>
            <p className="text-xl font-bold text-cyan-400 glow-cyan">{cards.length}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <p className="text-xs text-slate-500 font-mono mb-1">TÓPICOS</p>
            <p className="text-xl font-bold text-amber-400 glow-amber">{uniqueTopics}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors uppercase tracking-widest">
            {isTerminalOpen ? 'FECHAR TERMINAL' : 'INGESTÃO JSON'}
          </button>
          <button 
            onClick={onExportBackup}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors uppercase tracking-widest">
            EXPORTAR BACKUP
          </button>
        </div>
      </div>

      {/* Terminal Retrátil */}
      {isTerminalOpen && (
        <div className="glass-card p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
             <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">TERMINAL ATIVO</span>
             <p className="text-slate-300 text-sm font-mono">Cole o payload estruturado (Markdown suportado)</p>
          </div>
          <textarea 
            className="w-full h-40 bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400/90 focus:outline-none focus:border-cyan-500/50 resize-none mb-4"
            placeholder={'{\n  "title": "Nova Matéria..."\n}'}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button 
            onClick={handleImport}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-3 rounded-xl font-bold text-sm font-mono transition-colors tracking-widest">
            PROCESSAR E ARMAZENAR NO BANCO
          </button>
        </div>
      )}

      {/* Grid Tático */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-700/50 rounded-2xl">
            [ NENHUM DADO TÁTICO ENCONTRADO NO BANCO ]
          </div>
        ) : (
          cards.map(card => {
            const score = historyMap[card.id];
            return (
              <div key={card.id} className="glass-card p-5 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                    {card.topic}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(card.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="text-lg font-bold text-white mb-4 line-clamp-2">
                  {card.title}
                </h2>

                <div className="flex gap-4 mb-4 border-t border-b border-slate-800/50 py-3">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 font-mono">TEORIA</p>
                    <p className="text-sm font-bold text-slate-300">{card.sec02_theory?.blocks?.length || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 font-mono">LAB</p>
                    <p className="text-sm font-bold text-slate-300">{card.sec05_lab?.questions?.length || 0}</p>
                  </div>
                </div>

                <div className="mb-4">
                  {score !== undefined ? (
                    <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${
                      score >= 800 
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 glow-emerald' 
                        : score >= 600
                        ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                        : 'bg-red-950/60 border-red-500/40 text-red-400'
                    }`}>
                      TRI: {score} pts
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-mono text-xs">
                      TRI: PENDENTE
                    </span>
                  )}
                </div>

              <div className="mt-auto flex gap-2">
                <button 
                  onClick={() => onSelectCard(card.id)}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-3 py-2 rounded-lg font-bold text-xs font-mono shadow-lg shadow-sky-500/20 transition-all">
                  INICIAR ESTUDO
                </button>
                <button 
                  onClick={() => onDeleteCard(card.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-colors">
                  DELETAR
                </button>
              </div>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
};
