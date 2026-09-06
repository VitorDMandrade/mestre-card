import { useEffect, useState } from 'react';
import { db } from './lib/db';
import type { MestreCardData } from './types/mestre-card';
import { sanitizeAndParseJSON, validateImportPayload, exportFullBackup, parseBackupFile } from './lib/importer';
import type { ParsedImport } from './lib/importer';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import 'katex/dist/katex.min.css';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'study'>('dashboard');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  const [cards, setCards] = useState<MestreCardData[]>([]);
  const [historyMap, setHistoryMap] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadCards = async () => {
    try {
      const allCards = await db.getAllCards();
      const allHistory = await db.getAllHistory();
      
      const newHistoryMap: Record<string, number> = {};
      for (const session of allHistory) {
        if (!newHistoryMap[session.cardId] || session.score > newHistoryMap[session.cardId]) {
          newHistoryMap[session.cardId] = session.score;
        }
      }

      setCards(allCards);
      setHistoryMap(newHistoryMap);
      setIsLoaded(true);
    } catch (e) {
      console.error('Falha ao carregar dados do IndexedDB', e);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // Global listener for shortcut modal (?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const processImportParsed = async (parsed: ParsedImport) => {
    if (parsed.type === 'backup') {
      const res = await db.smartMergeData(parsed.data.cards, parsed.data.history);
      await loadCards();
      showToast(
        `⚡ Sincronização concluída: +${res.addedCards} novos, ${res.updatedCards} atualizados, ${res.addedSessions} sessões TRI integradas (${res.skippedCards} locais preservados).`,
        'success'
      );
    } else {
      const res = await db.smartMergeData([parsed.data], []);
      await loadCards();
      if (res.addedCards > 0) {
        showToast(`✓ Card adicionado com sucesso: [${parsed.data.title}]`, 'success');
      } else if (res.updatedCards > 0) {
        showToast(`✓ Card atualizado para versão mais recente: [${parsed.data.title}]`, 'success');
      } else {
        showToast(`ℹ️ Card [${parsed.data.title}] já possui versão igual ou mais recente no banco.`, 'info');
      }
    }
  };

  const handleImportCard = async (jsonStr: string) => {
    try {
      const rawObj = sanitizeAndParseJSON(jsonStr);
      const parsed = validateImportPayload(rawObj);
      await processImportParsed(parsed);
    } catch (err: any) {
      console.error(err);
      showToast(`FALHA DE INGESTÃO: ${err.message}`, 'error');
    }
  };

  const handleImportFile = async (file: File) => {
    try {
      const parsed = await parseBackupFile(file);
      await processImportParsed(parsed);
    } catch (err: any) {
      console.error(err);
      showToast(`FALHA NO ARQUIVO [${file.name}]: ${err.message}`, 'error');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (confirm('Deletar este card permanentemente?')) {
      try {
        await db.deleteCard(id);
        await loadCards();
      } catch (err) {
        console.error('Falha ao deletar', err);
      }
    }
  };

  const handleExportBackup = async () => {
    try {
      const allCards = await db.getAllCards();
      const allHistory = await db.getAllHistory();
      exportFullBackup(allCards, allHistory);
    } catch (err) {
      console.error('Falha ao exportar backup', err);
      alert('Erro ao exportar backup.');
    }
  };

  const handleSelectCard = (id: string) => {
    setActiveCardId(id);
    setCurrentView('study');
  };

  const handleBackToDashboard = () => {
    setActiveCardId(null);
    setCurrentView('dashboard');
    loadCards(); // refresh history if they played
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <span className="text-cyan-400 font-mono glow-cyan animate-pulse">INICIALIZANDO BANCO DE DADOS...</span>
      </div>
    );
  }

  const activeCard = activeCardId ? cards.find(c => c.id === activeCardId) : null;

  return (
    <ErrorBoundary fallbackTitle="Falha de Execução no MestreCard">
      <div className="min-h-screen py-8">
        {/* Tactical Toast Notification */}
        {toast && (
          <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-fade-in font-mono text-xs ${
            toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/80 text-red-200 shadow-red-900/30'
              : toast.type === 'info'
              ? 'bg-slate-900/95 border-cyan-500/60 text-cyan-300 shadow-cyan-900/30'
              : 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200 shadow-emerald-900/30'
          }`}>
            <div className="flex items-center gap-2.5">
              <span className="text-base">{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '🚀'}</span>
              <span className="font-semibold leading-relaxed">{toast.message}</span>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white text-sm px-2 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Fechar"
            >
              ✕
            </button>
          </div>
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            cards={cards}
            historyMap={historyMap}
            onSelectCard={handleSelectCard}
            onDeleteCard={handleDeleteCard}
            onImportCard={handleImportCard}
            onImportFile={handleImportFile}
            onExportBackup={handleExportBackup}
          />
        )}
        
        {currentView === 'study' && activeCard && (
          <StudyView 
            card={activeCard}
            onBack={handleBackToDashboard}
          />
        )}

        {/* Floating Keyboard Shortcuts Trigger */}
        <button
          onClick={() => setIsShortcutsOpen(true)}
          aria-label="Atalhos do Teclado"
          className="fixed bottom-6 left-6 z-40 px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 shadow-lg backdrop-blur-md transition-all text-xs font-mono flex items-center gap-2 group"
        >
          <span>⌨️</span>
          <span className="hidden sm:inline">Atalhos</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-cyan-400 font-bold">?</kbd>
        </button>

        <KeyboardShortcutsModal 
          isOpen={isShortcutsOpen} 
          onClose={() => setIsShortcutsOpen(false)} 
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

