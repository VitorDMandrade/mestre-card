import { useEffect, useState } from 'react';
import { db } from './lib/db';
import type { MestreCardData } from './types/mestre-card';
import { sanitizeAndParseJSON, validateImportPayload, exportFullBackup } from './lib/importer';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import 'katex/dist/katex.min.css';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'study'>('dashboard');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  
  const [cards, setCards] = useState<MestreCardData[]>([]);
  const [historyMap, setHistoryMap] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleImportCard = async (jsonStr: string) => {
    try {
      const rawObj = sanitizeAndParseJSON(jsonStr);
      const parsed = validateImportPayload(rawObj);

      if (parsed.type === 'backup') {
        await db.bulkImportData(parsed.data.cards, parsed.data.history);
        await loadCards();
        alert(`BACKUP RESTAURADO COM SUCESSO: ${parsed.data.cards.length} cards e ${parsed.data.history.length} sessões.`);
      } else {
        await db.saveCard(parsed.data);
        await loadCards();
        alert(`CARD INJETADO COM SUCESSO: [${parsed.data.title}]`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`FALHA DE INGESTÃO: ${err.message}`);
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
        {currentView === 'dashboard' && (
          <Dashboard 
            cards={cards}
            historyMap={historyMap}
            onSelectCard={handleSelectCard}
            onDeleteCard={handleDeleteCard}
            onImportCard={handleImportCard}
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

