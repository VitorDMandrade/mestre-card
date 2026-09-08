// src/components/acervo/AcervoModal.tsx
// Biblioteca Geral do Acervo de Provas e Cadernos Oficiais (598 Arquivos)
import React, { useState, useMemo, useEffect } from 'react';
import { searchAcervo, getAcervoStats } from '../../lib/acervo-matcher';
import { playAcervoOpenSound } from '../../lib/audio';
import type { AcervoItem } from '../../data/acervo-catalog';

interface AcervoModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled?: boolean;
  initialQuery?: string;
  initialBanca?: string;
}

const POPULAR_BANCAS = [
  'todas',
  'Albert Einstein',
  'ENEM',
  'UNESP',
  'UERJ',
  'UECE',
  'UFG',
  'UEMA',
  'UNIRG',
  'UNIRV'
];

const DISCIPLINES = [
  { id: 'todas', label: 'Todas Matérias' },
  { id: 'quimica', label: '⚗️ Química' },
  { id: 'biologia', label: '🧬 Biologia' },
  { id: 'fisica', label: '⚡ Física' },
  { id: 'matematica', label: '📐 Matemática' },
  { id: 'humanas', label: '🌍 Humanas' }
];

const CATEGORIES = [
  { id: 'todas', label: 'Todos os Tipos' },
  { id: 'caderno_exercicios', label: '📚 Cadernos & Listas' },
  { id: 'gabarito_comentado', label: '✅ Gabaritos Comentados' },
  { id: 'prova_oficial', label: '🏛️ Provas na Íntegra' },
  { id: 'anotacoes_teoria', label: '📝 Anotações & Resumos' },
  { id: 'aulao', label: '🎯 Aulões & Monitorias' }
];

export const AcervoModal: React.FC<AcervoModalProps> = ({
  isOpen,
  onClose,
  soundEnabled = true,
  initialQuery = '',
  initialBanca = 'todas'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedBanca, setSelectedBanca] = useState(initialBanca);
  const [selectedDiscipline, setSelectedDiscipline] = useState('todas');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [displayLimit, setDisplayLimit] = useState(24);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stats = useMemo(() => getAcervoStats(), []);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      if (initialBanca) setSelectedBanca(initialBanca);
      setDisplayLimit(24);
    }
  }, [isOpen, initialQuery, initialBanca]);

  // Tecla ESC fecha o modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Resultados filtrados
  const filteredItems = useMemo(() => {
    return searchAcervo(query, selectedBanca, selectedDiscipline, selectedCategory);
  }, [query, selectedBanca, selectedDiscipline, selectedCategory]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, displayLimit);
  }, [filteredItems, displayLimit]);

  if (!isOpen) return null;

  const handleCopyLink = (item: AcervoItem) => {
    navigator.clipboard.writeText(item.githubUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBancaBadgeStyle = (banca: string) => {
    switch (banca) {
      case 'Albert Einstein':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
      case 'ENEM':
        return 'bg-blue-950/80 border-blue-500/50 text-blue-300';
      case 'UNESP':
        return 'bg-purple-950/80 border-purple-500/50 text-purple-300';
      case 'UERJ':
      case 'UECE':
        return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
      default:
        return 'bg-slate-900 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden font-mono">
        
        {/* CABEÇALHO TÁTICO */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900/60 to-slate-950 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/50 relative shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.35)] bg-slate-900 flex items-center justify-center">
                <img
                  src="./assets/dossier_icon.jpg"
                  alt="Acervo"
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xl select-none">🏛️</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                BIBLIOTECA DO ACERVO OFICIAL
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                {stats.totalFiles} ARQUIVOS OFICIAIS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Provas de Medicina, Gabaritos Comentados linha a linha e Cadernos Temáticos integrados ao MestreCard.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500/60 hover:bg-red-950/40 text-slate-400 hover:text-red-400 flex items-center justify-center text-lg transition-all cursor-pointer flex-shrink-0"
            title="Fechar biblioteca (Esc)"
          >
            ✕
          </button>
        </div>

        {/* BARRA DE FILTROS & BUSCA EM TEMPO REAL */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 space-y-3">
          {/* Input de Busca */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setDisplayLimit(24);
              }}
              placeholder="Pesquisar por assunto (ex: Termoquímica, Genética, Einstein 2024, Eletroquímica, UNESP)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1"
                title="Limpar pesquisa"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros em Chips */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center justify-between text-xs">
            {/* Bancas */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1 flex-shrink-0">
                BANCA:
              </span>
              {POPULAR_BANCAS.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setSelectedBanca(b);
                    setDisplayLimit(24);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex-shrink-0 ${
                    selectedBanca === b
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {b === 'todas' ? 'Todas' : b}
                </button>
              ))}
            </div>

            {/* Disciplinas */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1 flex-shrink-0">
                MATÉRIA:
              </span>
              {DISCIPLINES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDiscipline(d.id);
                    setDisplayLimit(24);
                  }}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex-shrink-0 ${
                    selectedDiscipline === d.id
                      ? 'bg-purple-950 text-purple-300 border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categorias (Tipos de Material) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1 flex-shrink-0">
              TIPO:
            </span>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setDisplayLimit(24);
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex-shrink-0 ${
                  selectedCategory === c.id
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-500 hover:text-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTAGEM DE ARQUIVOS (CORPO COM SCROLL) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
            <span>
              Exibindo <b className="text-white">{visibleItems.length}</b> de <b className="text-cyan-400">{filteredItems.length}</b> materiais encontrados
            </span>
            {filteredItems.length > visibleItems.length && (
              <span className="text-[11px] text-slate-500">
                (Role até o final para carregar mais)
              </span>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="text-4xl">📂</div>
              <h4 className="text-base font-bold text-slate-300">Nenhum material encontrado</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Tente ajustar os termos de busca ou selecione "Todas" nas bancas e matérias para navegar pelo acervo completo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getBancaBadgeStyle(item.banca)}`}>
                        {item.banca !== 'Outras' ? `🏛️ ${item.banca}` : `📖 ${item.discipline.toUpperCase()}`}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.year && (
                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                            {item.year}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">
                          {item.sizeFormatted}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2" title={item.filename}>
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {item.category === 'prova_oficial'
                          ? 'Prova na Íntegra'
                          : item.category === 'gabarito_comentado'
                          ? 'Gabarito Comentado'
                          : item.category === 'caderno_exercicios'
                          ? 'Caderno Temático'
                          : item.category === 'anotacoes_teoria'
                          ? 'Resumo de Teoria'
                          : 'Aulão/Simulado'}
                      </span>
                      {item.topics.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-amber-300/80">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyLink(item)}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-950 border border-slate-800 transition-all cursor-pointer"
                      title="Copiar link do GitHub"
                    >
                      {copiedId === item.id ? '✓ Copiado!' : '📋 Copiar Link'}
                    </button>

                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAcervoOpenSound(soundEnabled)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>📖 Abrir no GitHub</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botão Carregar Mais */}
          {filteredItems.length > visibleItems.length && (
            <div className="text-center pt-4 pb-2">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 24)}
                className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              >
                Carregar mais materiais ({filteredItems.length - visibleItems.length} restantes)
              </button>
            </div>
          )}
        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>
            💡 <b>Dica</b>: Os PDFs abrem em nova aba com o leitor CDN nativo do GitHub para manter a fluidez a 60 FPS no MestreCard.
          </span>
          <span className="font-mono text-cyan-400/80">
            MestreCard v16 • Acervo Oficial 2026
          </span>
        </div>
      </div>
    </div>
  );
};
