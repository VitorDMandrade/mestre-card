import { useEffect, useState } from 'react';
import { db } from './lib/db';
import type { MestreCardData } from './types/mestre-card';
import { sanitizeAndParseJSON, validateImportPayload, exportFullBackup } from './lib/importer';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import { ErrorBoundary } from './components/ErrorBoundary';
import 'katex/dist/katex.min.css';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'study'>('dashboard');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
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
      </div>
    </ErrorBoundary>
  );
}

export default App;
