import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { MestreCardData, StudySessionRecord } from '../types/mestre-card';
import { db } from '../lib/db';

interface DashboardProps {
  cards: MestreCardData[];
  historyMap: Record<string, number>;
  allHistory?: StudySessionRecord[];
  onSelectCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onImportCard: (jsonStr: string) => void | Promise<void>;
  onImportFile?: (file: File) => void | Promise<void>;
  onExportBackup: () => void;
  onExportSingleCard?: (card: MestreCardData) => void;
  onExportFiltered?: (cards: MestreCardData[], categoryLabel: string) => void;
  onStartQueue?: (cardIds: string[]) => void;
  onOpenAcervoModal?: (query?: string, banca?: string) => void;
  onOpenConstellation?: () => void;
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

export const Dashboard: React.FC<DashboardProps> = ({ 
  cards, 
  historyMap, 
  allHistory = [],
  onSelectCard, 
  onDeleteCard, 
  onImportCard, 
  onImportFile, 
  onExportBackup,
  onExportSingleCard,
  onExportFiltered,
  onStartQueue,
  onOpenAcervoModal,
  onOpenConstellation
}) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('TODOS');
  const [triFilter, setTriFilter] = useState<'all' | 'critical' | 'average' | 'mastered' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Error Notebook state
  const [isGlobalErrorModalOpen, setIsGlobalErrorModalOpen] = useState(false);
  const [revealedErrorIdxs, setRevealedErrorIdxs] = useState<Set<number>>(new Set());
  const [isHistoryCleared, setIsHistoryCleared] = useState(false);
  const [dismissedHashes, setDismissedHashes] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('mestre_dismissed_error_hashes');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Live History Sync directly from IndexedDB
  const [liveHistory, setLiveHistory] = useState<StudySessionRecord[]>(allHistory);

  const fetchHistory = useCallback(async () => {
    try {
      const records = await db.getAllHistory();
      setLiveHistory(records);
    } catch (e) {
      console.error('Falha ao sincronizar histórico no Dashboard:', e);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, allHistory]);

  const getErrorHash = (err: { cardId?: string; prompt: string; game: string }) => 
    `${err.cardId || ''}:${err.game}:${err.prompt}`;

  // Extract all historical errors from liveHistory or allHistory
  const historicErrors = useMemo(() => {
    if (isHistoryCleared) return [];
    const sourceHistory = liveHistory.length > 0 ? liveHistory : allHistory;
    if (!sourceHistory || sourceHistory.length === 0) return [];

    const errors: Array<{
      game: 'G1' | 'G3' | 'G5' | 'Lab' | 'Lab-Hardcore' | 'Lab-Boss' | string;
      prompt: string;
      userWrongAnswer: string;
      explanation: string;
      cardId?: string;
      cardTitle?: string;
      timestamp?: number;
    }> = [];
    
    for (const session of sourceHistory) {
      if (session.details?.sessionErrors && Array.isArray(session.details.sessionErrors)) {
        for (const err of session.details.sessionErrors) {
          errors.push({
            ...err,
            cardId: err.cardId || session.cardId,
            timestamp: err.timestamp || session.timestamp
          });
        }
      }
    }

    // Sort by most recent first
    errors.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    // Deduplicate by signature to avoid spamming the same failure
    const seen = new Set<string>();
    const deduplicated: typeof errors = [];
    for (const err of errors) {
      const key = `${err.cardId || ''}:${err.game}:${err.prompt}:${err.userWrongAnswer}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(err);
      }
    }
    return deduplicated;
  }, [liveHistory, allHistory, isHistoryCleared]);

  const activeHistoricErrors = useMemo(() => {
    return historicErrors.filter(err => !dismissedHashes.has(getErrorHash(err)));
  }, [historicErrors, dismissedHashes]);

  // Se todos os erros foram marcados como revisados em localStorage, exibe historicErrors para nunca deixar vazio sem motivo
  const displayErrors = useMemo(() => {
    if (activeHistoricErrors.length > 0) return activeHistoricErrors;
    return historicErrors;
  }, [activeHistoricErrors, historicErrors]);

  const handleDismissSingleError = (err: typeof historicErrors[0]) => {
    const hash = getErrorHash(err);
    setDismissedHashes(prev => {
      const next = new Set(prev);
      next.add(hash);
      try {
        localStorage.setItem('mestre_dismissed_error_hashes', JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleRestoreDismissedErrors = () => {
    setDismissedHashes(new Set());
    try {
      localStorage.removeItem('mestre_dismissed_error_hashes');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAllErrors = async () => {
    try {
      await db.clearAllHistoricErrors();
      setIsHistoryCleared(true);
      setLiveHistory([]);
      setDismissedHashes(new Set());
      try {
        localStorage.removeItem('mestre_dismissed_error_hashes');
      } catch (e) {
        console.error(e);
      }
      await fetchHistory();
    } catch (err) {
      console.error('Falha ao limpar erros no DB:', err);
    }
  };

  const toggleRevealError = (idx: number) => {
    setRevealedErrorIdxs(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const uniqueTopics = new Set(cards.map(c => c.topic)).size;

  const handleImport = async () => {
    if (!jsonInput.trim()) return;
    await onImportCard(jsonInput);
    setJsonInput('');
    setIsTerminalOpen(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingFile(true);
      if (onImportFile) {
        await onImportFile(file);
      }
      setIsTerminalOpen(false);
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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

  // Dynamic counter for TRI status
  const triCounts = useMemo(() => {
    const counts = {
      all: cards.length,
      critical: 0,
      average: 0,
      mastered: 0,
      pending: 0
    };
    for (const card of cards) {
      const score = historyMap[card.id];
      if (score === undefined || score === null) {
        counts.pending++;
      } else if (score < 600) {
        counts.critical++;
      } else if (score < 800) {
        counts.average++;
      } else {
        counts.mastered++;
      }
    }
    return counts;
  }, [cards, historyMap]);

  // Filtered cards by Category, TRI Range & Search query
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // 1. Categoria
      if (selectedCategory !== 'TODOS') {
        const cat = resolveCategory(card.topic, card.title);
        if (cat !== selectedCategory) return false;
      }

      // 2. Faixa TRI
      if (triFilter !== 'all') {
        const score = historyMap[card.id];
        if (triFilter === 'pending') {
          if (score !== undefined && score !== null) return false;
        } else if (triFilter === 'critical') {
          if (score === undefined || score === null || score >= 600) return false;
        } else if (triFilter === 'average') {
          if (score === undefined || score === null || score < 600 || score >= 800) return false;
        } else if (triFilter === 'mastered') {
          if (score === undefined || score === null || score < 800) return false;
        }
      }

      // 3. Termo de busca
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
  }, [cards, selectedCategory, triFilter, searchQuery, historyMap]);

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
            <p className="text-xs text-slate-400 font-mono font-bold mb-1">TOTAL CARDS</p>
            <p className="text-xl font-bold text-cyan-400 glow-cyan">{cards.length}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <p className="text-xs text-slate-400 font-mono font-bold mb-1">TÓPICOS</p>
            <p className="text-xl font-bold text-amber-400 glow-amber">{uniqueTopics}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button 
            onClick={() => setIsGlobalErrorModalOpen(true)}
            className={historicErrors.length > 0 
              ? "bg-red-500/15 hover:bg-red-500/25 border border-red-500/60 text-red-300 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse hover:animate-none cursor-pointer"
              : "bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
            }
            title="Abrir Caderno de Erros Global de sessões anteriores">
            <span>{historicErrors.length > 0 ? '🚨' : '🛡️'}</span>
            <span>{historicErrors.length > 0 ? `REPESCAGEM: ${historicErrors.length} ${historicErrors.length === 1 ? 'ERRO' : 'ERROS'}` : 'CADERNO DE ERROS (0)'}</span>
          </button>

          <button 
            onClick={() => onOpenAcervoModal ? onOpenAcervoModal() : null}
            className="bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/50 text-purple-300 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.2)] cursor-pointer"
            title="Abrir Biblioteca Completa do Acervo Oficial (598 PDFs de provas e cadernos)">
            <span>🏛️</span>
            <span>ACERVO OFICIAL (598)</span>
          </button>

          <button 
            onClick={() => onOpenConstellation ? onOpenConstellation() : null}
            className="bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/50 text-cyan-300 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,245,255,0.2)] cursor-pointer"
            title="Abrir Constelação Neural 3D e Grafo Interativo de Conexões">
            <span>🌌</span>
            <span>CONSTELAÇÃO NEURAL</span>
          </button>

          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors uppercase tracking-widest">
            {isTerminalOpen ? 'FECHAR TERMINAL' : 'INGESTÃO JSON'}
          </button>
          {selectedCategory !== 'TODOS' ? (
            <div className="flex gap-2">
              <button 
                onClick={() => onExportFiltered ? onExportFiltered(filteredCards, selectedCategory) : onExportBackup()}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center gap-1.5"
                title={`Exportar backup dos ${filteredCards.length} cards de ${selectedCategory}`}>
                <span>💾</span>
                <span>EXPORTAR {selectedCategory} ({filteredCards.length})</span>
              </button>
              <button 
                onClick={onExportBackup}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-2.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors uppercase"
                title="Exportar backup completo de todos os cards">
                GERAL
              </button>
            </div>
          ) : (
            <button 
              onClick={onExportBackup}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors uppercase tracking-widest flex items-center gap-1.5">
              <span>💾</span>
              <span>EXPORTAR BACKUP GERAL</span>
            </button>
          )}
        </div>
      </div>

      {/* Banner Tático de Vulnerabilidade Cognitiva / Caderno de Erros Ativo */}
      {historicErrors.length > 0 && (
        <div className="p-4 rounded-2xl border border-red-500/50 bg-gradient-to-r from-red-950/40 via-slate-900/90 to-amber-950/30 shadow-[0_0_25px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-xl shrink-0 animate-pulse">
              🚨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white font-mono tracking-tight uppercase">
                  Caderno de Erros Ativo // Fila de Repescagem
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-[10px] font-bold">
                  {historicErrors.length} {historicErrors.length === 1 ? 'FALHA' : 'FALHAS'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">
                Foram registradas falhas conceituais no Laboratório e Arcade. Realize o auto-teste de repescagem para fixar as lacunas antes do simulado.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={() => setIsGlobalErrorModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>🎯</span>
              <span>RETESTAR FALHAS AGORA</span>
            </button>
          </div>
        </div>
      )}

      {/* Terminal Retrátil de Ingestão & Sincronização */}
      {isTerminalOpen && (
        <div className="glass-card p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 animate-fade-in space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">TERMINAL ATIVO</span>
              <p className="text-white text-sm font-bold font-mono">INGESTÃO & SINCRONIZAÇÃO TÁTICA</p>
            </div>
            <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
              SMART MERGE ATIVO // NÃO-DESTRUTIVO
            </span>
          </div>

          {/* Opção 1 (Primária / Mobile): Upload Direto de Arquivo .JSON */}
          <div className="p-5 rounded-xl bg-slate-900/90 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400/70 transition-all flex flex-col items-center justify-center text-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              accept=".json,application/json" 
              onChange={handleFileSelect} 
              className="hidden" 
            />
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
              📁
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Upload Direto de Arquivo de Backup (.JSON)
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1 max-w-md">
                Solução nativa para mobile e backups completos. Sem risco de travamento ou truncamento de área de transferência.
              </p>
            </div>
            <button
              disabled={isProcessingFile}
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono shadow-lg shadow-cyan-500/25 transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingFile ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>PROCESSANDO ARQUIVO...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span>SUBIR ARQUIVO (.JSON)</span>
                </>
              )}
            </button>
          </div>

          {/* Opção 2 (Secundária): Colar Payload Manualmente */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="h-px flex-1 bg-slate-800"></span>
              <span>OU COLE O TEXTO/JSON MANUALMENTE</span>
              <span className="h-px flex-1 bg-slate-800"></span>
            </div>
            <textarea 
              className="w-full h-28 bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400/90 focus:outline-none focus:border-cyan-500/50 resize-none"
              placeholder={'{\n  "title": "Nova Matéria..."\n}'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <button 
              onClick={handleImport}
              disabled={!jsonInput.trim()}
              className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-cyan-300 border border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs font-mono transition-colors tracking-widest uppercase">
              PROCESSAR TEXTO COLADO
            </button>
          </div>
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
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900 border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isSelected 
                    ? 'bg-cyan-500/30 text-cyan-200' 
                    : 'bg-slate-800 text-slate-300 border border-slate-700/80'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TRI Vulnerability & Status Micro-chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 scrollbar-thin">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider pl-1 hidden sm:inline font-bold">
            STATUS TRI:
          </span>
          {[
            { id: 'all', label: 'Todos', count: triCounts.all, color: 'slate' },
            { id: 'critical', label: '🚨 Críticos (<600)', count: triCounts.critical, color: 'red' },
            { id: 'average', label: '🎯 Na Média (600-799)', count: triCounts.average, color: 'amber' },
            { id: 'mastered', label: '⚡ Dominados (≥800)', count: triCounts.mastered, color: 'emerald' },
            { id: 'pending', label: '⏳ Pendentes', count: triCounts.pending, color: 'slate' },
          ].map(chip => {
            const isSelected = triFilter === chip.id;
            let activeStyle = '';
            let inactiveStyle = '';

            if (chip.color === 'red') {
              activeStyle = 'bg-red-950/70 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]';
              inactiveStyle = 'text-red-300 border-red-900/60 hover:border-red-500/60 hover:text-red-200';
            } else if (chip.color === 'amber') {
              activeStyle = 'bg-amber-950/70 text-amber-300 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
              inactiveStyle = 'text-amber-300 border-amber-900/60 hover:border-amber-500/60 hover:text-amber-200';
            } else if (chip.color === 'emerald') {
              activeStyle = 'bg-emerald-950/70 text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
              inactiveStyle = 'text-emerald-300 border-emerald-900/60 hover:border-emerald-500/60 hover:text-emerald-200';
            } else {
              activeStyle = 'bg-slate-800 text-slate-200 border-slate-600 shadow-sm';
              inactiveStyle = 'text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white';
            }

            return (
              <button
                key={chip.id}
                onClick={() => setTriFilter(chip.id as any)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected ? activeStyle : inactiveStyle
                } bg-slate-900/60`}
              >
                <span>{chip.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isSelected ? 'bg-white/10' : 'bg-slate-800 text-slate-300 border border-slate-700/70'
                }`}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fila de Combate Prioritário */}
      {onStartQueue && filteredCards.length > 0 && (triFilter === 'critical' || triFilter === 'pending') && (
        <div className="flex justify-center -my-2 animate-fade-in">
          <button
            onClick={() => onStartQueue(filteredCards.map(c => c.id))}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer border border-red-400/40 hover:scale-[1.02] active:scale-98"
          >
            <span>⚡</span>
            <span>INICIAR FILA DE REPESCAGEM ({filteredCards.length} ALVOS)</span>
            <span>➔</span>
          </button>
        </div>
      )}

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
              [ NENHUM CARD ENCONTRADO PARA ESTA BUSCA OU FILTRO ]
            </p>
            <button
              onClick={() => { setSelectedCategory('TODOS'); setSearchQuery(''); setTriFilter('all'); }}
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
                    <p className="text-[10px] text-slate-400 font-mono font-bold">TEORIA</p>
                    <p className="text-sm font-bold text-slate-300">{card.sec02_theory?.blocks?.length || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-mono font-bold">LAB</p>
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
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs font-semibold shadow-sm">
                      TRI: PENDENTE
                    </span>
                  )}
                </div>

              <div className="mt-auto flex gap-2 items-center">
                <button 
                  onClick={() => onSelectCard(card.id)}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-3 py-2 rounded-lg font-bold text-xs font-mono shadow-lg shadow-sky-500/20 transition-all">
                  INICIAR ESTUDO
                </button>
                {onExportSingleCard && (
                  <button 
                    onClick={() => onExportSingleCard(card)}
                    title="Exportar este card avulso (.JSON)"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-600 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:bg-slate-800 transition-all font-mono text-xs flex items-center justify-center shadow-sm">
                    📥
                  </button>
                )}
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

      {/* Modal Militar: Caderno de Erros Global (Modo Repescagem Tática) */}
      {isGlobalErrorModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-red-500/80 p-6 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <div className="flex justify-between items-start border-b border-red-500/30 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[10px] font-bold border border-red-500/40">
                    REPESCAGEM GLOBAL
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight">
                    🚨 CADERNO DE ERROS HISTÓRICOS
                  </h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Revisão ativa das {displayErrors.length} {displayErrors.length === 1 ? 'falha cognitiva registrada' : 'falhas cognitivas registradas'} em combate.
                </p>
              </div>
              <button
                onClick={() => setIsGlobalErrorModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-sm"
                title="Fechar modal"
              >
                ✕
              </button>
            </div>

            {/* Ações Rápidas do Modal */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">
                {displayErrors.length} {displayErrors.length === 1 ? 'falha disponível' : 'falhas disponíveis'} para retestagem
              </span>
              <div className="flex flex-wrap gap-2">
                {dismissedHashes.size > 0 && (
                  <button
                    onClick={handleRestoreDismissedErrors}
                    className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/50 hover:bg-cyan-900 text-cyan-300 text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                    title="Restaurar falhas marcadas como revisadas de volta para a fila ativa"
                  >
                    <span>🔄</span>
                    <span>Restaurar Fila</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    if (revealedErrorIdxs.size === displayErrors.length) {
                      setRevealedErrorIdxs(new Set());
                    } else {
                      setRevealedErrorIdxs(new Set(displayErrors.map((_, i) => i)));
                    }
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
                >
                  {revealedErrorIdxs.size === displayErrors.length ? '🙈 Ocultar Gabaritos' : '👁️ Revelar Todos'}
                </button>
                <button
                  onClick={handleClearAllErrors}
                  className="px-2.5 py-1 rounded bg-red-950/60 border border-red-800/50 hover:bg-red-900 text-red-300 text-[11px] transition-colors cursor-pointer"
                  title="Marcar todas as falhas como revisadas e limpar permanentemente do banco"
                >
                  🧹 Limpar Fila
                </button>
              </div>
            </div>

            {/* Lista de Falhas com Auto-teste */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {displayErrors.length === 0 ? (
                <div className="py-12 text-center text-emerald-400 font-mono text-sm space-y-2">
                  <div className="text-4xl">🛡️</div>
                  <p className="font-bold">TODAS AS FALHAS FORAM REVISADAS OU NENHUM ERRO REGISTRADO!</p>
                  <p className="text-xs text-slate-500">Mantenha a consistência em combate.</p>
                </div>
              ) : (
                displayErrors.map((err, idx) => {
                  const isRevealed = revealedErrorIdxs.has(idx);
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-red-900/50 space-y-2.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                            {err.game === 'G1' 
                              ? 'G1: MORTE SÚBITA' 
                              : err.game === 'G3' 
                              ? 'G3: PRESSÃO TRI' 
                              : err.game === 'G5' 
                              ? 'G5: O INFILTRADO' 
                              : err.game.startsWith('Lab') 
                              ? `LAB PRÁTICO (${err.game})` 
                              : err.game}
                          </span>
                          {err.cardTitle && (
                            <span className="text-slate-300 font-semibold truncate max-w-[200px]">
                              [{err.cardTitle}]
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDismissSingleError(err)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-mono cursor-pointer transition-colors shadow-sm"
                        >
                          ✓ Marcar Revisado
                        </button>
                      </div>

                      <p className="text-slate-100 font-sans text-xs font-semibold leading-relaxed">
                        {err.prompt}
                      </p>

                      <div className="p-2 rounded bg-red-950/40 border-l-2 border-l-red-500 text-red-300 text-[11px]">
                        <span className="font-bold text-red-400">Sua Escolha Anterior: </span>
                        <span>{err.userWrongAnswer}</span>
                      </div>

                      {isRevealed ? (
                        <div className="p-2.5 rounded bg-emerald-950/30 border-l-2 border-l-emerald-500 text-emerald-300 text-[11px] animate-fade-in space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-400">Correção Tática / Gabarito:</span>
                            <button
                              onClick={() => toggleRevealError(idx)}
                              className="text-[10px] text-emerald-400/70 hover:text-emerald-300 underline cursor-pointer"
                            >
                              Ocultar
                            </button>
                          </div>
                          <p className="leading-relaxed">{err.explanation}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleRevealError(idx)}
                          className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-700 text-slate-400 hover:text-cyan-300 text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>👁️</span>
                          <span>Auto-Teste: Revelar Gabarito Tático</span>
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsGlobalErrorModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
