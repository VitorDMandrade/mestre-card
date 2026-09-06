import { useState, useMemo } from 'react';
import type { MestreCardData } from '../types/mestre-card';

interface DashboardProps {
  cards: MestreCardData[];
  historyMap: Record<string, number>;
  onSelectCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onImportCard: (jsonStr: string) => void;
  onExportBackup: () => void;
}

export type SubjectCategory = 'TODOS' | 'BIOLOGIA' | 'QUÍMICA' | 'FÍSICA' | 'MATEMÁTICA' | 'HUMANAS' | 'LINGUAGENS' | 'OUTROS';

export const CATEGORIES: { id: SubjectCategory; label: string; icon: string }[] = [
  { id: 'TODOS', label: 'Todos', icon: '🌐' },
  { id: 'BIOLOGIA', label: 'Biologia', icon: '🧬' },
  { id: 'QUÍMICA', label: 'Química', icon: '⚗️' },
  { id: 'FÍSICA', label: 'Física', icon: '⚡' },
  { id: 'MATEMÁTICA', label: 'Matemática', icon: '📐' },
  { id: 'HUMANAS', label: 'Humanas', icon: '🏛️' },
  { id: 'LINGUAGENS', label: 'Linguagens', icon: '📚' },
  { id: 'OUTROS', label: 'Outros', icon: '📁' }
];

export function resolveCategory(topic: string = '', title: string = ''): SubjectCategory {
  const norm = `${topic} ${title}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/biolog|genet|ecolog|citolog|fisiolog|botan|zoolog|dna|rna|celul|evolu|imuno|virus|bacteri/.test(norm)) return 'BIOLOGIA';
  if (/quimic|estequiomet|organica|inorganica|termoquim|eletroquim|soluco|tabela period|atomo|acido|base|cinetica quimica|equilibrio/.test(norm)) return 'QUÍMICA';
  if (/fisic|cinematica|dinamica|termodinam|optica|ondulatoria|eletromagnet|gravita|mecanica|vetor|energia|potencia|circuito/.test(norm)) return 'FÍSICA';
  if (/matemat|geometr|trigonometr|algebra|combinator|probabil|funcao|estatist|logarit|matriz|progressao|financeira/.test(norm)) return 'MATEMÁTICA';
  if (/histor|geograf|filosof|sociolog|polit|geopolit|brasil|idade media|guerra|cidadania|revolucao|imperio|ditadura|antiga|moderna/.test(norm)) return 'HUMANAS';
  if (/portugues|literatur|gramatic|linguagem|redacao|ingles|espanhol|texto|sintaxe|morfologia|generos textuais/.test(norm)) return 'LINGUAGENS';
  return 'OUTROS';
}

export const Dashboard: React.FC<DashboardProps> = ({ cards, historyMap, onSelectCard, onDeleteCard, onImportCard, onExportBackup }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  const uniqueTopics = new Set(cards.map(c => c.topic)).size;

  const handleImport = () => {
    onImportCard(jsonInput);
    setJsonInput('');
    setIsTerminalOpen(false);
  };

  // Dynamic counter for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<SubjectCategory, number> = {
      TODOS: cards.length,
      BIOLOGIA: 0,
      QUÍMICA: 0,
      FÍSICA: 0,
      MATEMÁTICA: 0,
      HUMANAS: 0,
      LINGUAGENS: 0,
      OUTROS: 0
    };
    for (const card of cards) {
      const cat = resolveCategory(card.topic, card.title);
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [cards]);

  // Filtered cards by Category & Search query
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      if (selectedCategory !== 'TODOS') {
        const cat = resolveCategory(card.topic, card.title);
        if (cat !== selectedCategory) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const titleNorm = (card.title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const topicNorm = (card.topic || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const axesNorm = (card.sec01_header?.thematicAxes || []).join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!titleNorm.includes(q) && !topicNorm.includes(q) && !axesNorm.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [cards, selectedCategory, searchQuery]);

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

      {/* Search & Subject Category Filter HUD */}
      <div className="glass-card p-4 rounded-2xl border border-slate-700/50 flex flex-col gap-4">
        {/* Top bar: Search input + Results counter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, matéria ou eixos táticos..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-800"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>EXIBINDO:</span>
            <span className="text-cyan-400 font-bold glow-cyan">{filteredCards.length}</span>
            <span>DE</span>
            <span className="text-slate-300 font-bold">{cards.length} DOSSIÊS</span>
          </div>
        </div>

        {/* Category Tabs with dynamic counters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            // Only show OUTROS if it actually has items or is selected
            if (cat.id === 'OUTROS' && count === 0 && !isSelected) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isSelected 
                    ? 'bg-cyan-500/30 text-cyan-200' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Tático */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-700/50 rounded-2xl">
            [ NENHUM DADO TÁTICO ENCONTRADO NO BANCO ]
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-700/50 rounded-2xl bg-slate-950/40 p-6 flex flex-col items-center justify-center gap-3">
            <div className="text-3xl">🎯</div>
            <p className="text-slate-400 font-mono text-sm">
              [ NENHUM CARD ENCONTRADO PARA ESTA BUSCA OU CATEGORIA ]
            </p>
            <button
              onClick={() => { setSelectedCategory('TODOS'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold transition-colors"
            >
              LIMPAR FILTROS
            </button>
          </div>
        ) : (
          filteredCards.map(card => {
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
                    <p className="text-sm font-bold text-slate-300">
                      {(card.sec05_lab?.questions?.length || 0) + (card.sec05_lab?.hardcoreQuestions?.length ? ` (+${card.sec05_lab.hardcoreQuestions.length} HC)` : '')}
                    </p>
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
