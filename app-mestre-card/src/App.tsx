import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { db } from './lib/db';
import { MestreCardData } from './types/mestre-card';
import { sanitizeAndParseJSON, validateMestreCard } from './lib/importer';

function App() {
  const [storageStatus, setStorageStatus] = useState<string>('CHECKING');
  const [jsonInput, setJsonInput] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  const [cards, setCards] = useState<MestreCardData[]>([]);

  const loadCards = async () => {
    try {
      const all = await db.getAllCards();
      setCards(all);
      setStorageStatus('ONLINE');
    } catch (e) {
      console.error('Falha ao carregar cards', e);
      setStorageStatus('ERROR');
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleProcessJSON = async () => {
    setAlert({ type: null, msg: '' });
    if (!jsonInput.trim()) {
      setAlert({ type: 'error', msg: 'Terminal vazio. Cole o JSON antes de processar.' });
      return;
    }

    try {
      const rawObj = sanitizeAndParseJSON(jsonInput);
      const validCard = validateMestreCard(rawObj);
      
      await db.saveCard(validCard);
      
      setAlert({ type: 'success', msg: `CARD INJETADO COM SUCESSO: [${validCard.title}]` });
      setJsonInput(''); // Limpa o terminal
      loadCards(); // Atualiza a lista
    } catch (err: any) {
      console.error(err);
      setAlert({ type: 'error', msg: `FALHA DE INGESTÃO: ${err.message}` });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await db.deleteCard(id);
      loadCards();
    } catch (err) {
      console.error('Falha ao deletar', err);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Esquerda: Ingestão */}
      <div className="glass-card flex-1 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
        
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold tracking-widest glow-cyan">
            TERMINAL // INGESTÃO
          </span>
          <span className={`px-2.5 py-1 rounded border font-mono text-xs font-bold tracking-widest ml-auto ${storageStatus === 'ONLINE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 glow-emerald' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            [DB: {storageStatus}]
          </span>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            Cole abaixo o payload JSON gerado pelo Gemini. O sistema irá sanitizar delimitadores Markdown automaticamente.
          </p>
          
          <textarea 
            className="flex-1 w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400/90 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none"
            placeholder="{\n  \"title\": \"Exemplo...\",\n  ...\n}"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />

          {alert.type && (
            <div className={`p-4 rounded-xl text-sm font-mono font-bold border ${alert.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 glow-emerald'}`}>
              {alert.msg}
            </div>
          )}

          <button 
            onClick={handleProcessJSON}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-bold text-sm font-mono shadow-lg shadow-sky-500/20 transition-all uppercase tracking-widest">
            [PROCESSAR E ARMAZENAR NO BANCO]
          </button>
        </div>
      </div>

      {/* Direita: Inventário */}
      <div className="glass-card flex-1 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold tracking-widest glow-amber">
            DATA BANK // INVENTÁRIO ({cards.length})
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {cards.length === 0 ? (
            <p className="text-slate-500 text-sm italic text-center mt-10 font-mono">
              [ NENHUM CARD ARMAZENADO ]
            </p>
          ) : (
            cards.map(card => (
              <div key={card.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center group hover:border-slate-600 transition-colors">
                <div>
                  <h3 className="text-white font-bold text-sm">{card.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 font-mono">{card.theme}</p>
                </div>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors opacity-0 group-hover:opacity-100">
                  EXCLUIR
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
