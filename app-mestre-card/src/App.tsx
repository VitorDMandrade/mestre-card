import React, { useEffect, useState } from 'react';
import { db } from './lib/db';
import { MestreCardData } from './types/mestre-card';
import { sanitizeAndParseJSON, validateMestreCard, exportAllCardsAsJSON } from './lib/importer';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import 'katex/dist/katex.min.css';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'study'>('dashboard');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  const [cards, setCards] = useState<MestreCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadCards = async () => {
    try {
      const all = await db.getAllCards();
      setCards(all);
      setIsLoaded(true);
    } catch (e) {
      console.error('Falha ao carregar cards do IndexedDB', e);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleImportCard = async (jsonStr: string) => {
    try {
      const rawObj = sanitizeAndParseJSON(jsonStr);
      const validCard = validateMestreCard(rawObj);
      await db.saveCard(validCard);
      await loadCards();
      alert(`CARD INJETADO COM SUCESSO: [${validCard.title}]`);
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

  const handleExportBackup = () => {
    exportAllCardsAsJSON(cards);
  };

  const handleSelectCard = (id: string) => {
    setActiveCardId(id);
    setCurrentView('study');
  };

  const handleBackToDashboard = () => {
    setActiveCardId(null);
    setCurrentView('dashboard');
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
    <div className="min-h-screen py-8">
      {currentView === 'dashboard' && (
        <Dashboard 
          cards={cards}
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
  );
}

export default App;
