import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { db } from './lib/db';
import { MestreCardData } from './types/mestre-card';

function App() {
  const [storageStatus, setStorageStatus] = useState<string>('OFFLINE');

  useEffect(() => {
    const testDB = async () => {
      try {
        await db.setSetting('test_ready', true);
        const mockCard: MestreCardData = {
          id: 'test-card-1',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          title: 'Teste IndexedDB',
          theme: 'Testes',
          skills: [],
          theoryBlocks: [],
          labItems: [],
          arcadeGameState: {
            questionsData: [],
            matchData: [],
            tfData: [],
            orderData: [],
            oddData: []
          }
        };
        await db.saveCard(mockCard);
        
        const retrieved = await db.getCard('test-card-1');
        if (retrieved && retrieved.id === 'test-card-1') {
          setStorageStatus('ONLINE');
        } else {
          setStorageStatus('ERROR');
        }
      } catch (e) {
        console.error('Falha no IndexedDB:', e);
        setStorageStatus('ERROR');
      }
    };
    testDB();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="glass-card max-w-2xl w-full p-8 rounded-2xl border border-slate-700/50">
        
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold tracking-widest glow-cyan">
            SYS.INIT // MESTRE CARD V16
          </span>
          <span className={`px-2.5 py-1 rounded border font-mono text-xs font-bold tracking-widest ${storageStatus === 'ONLINE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 glow-emerald' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            [STORAGE_STATUS: {storageStatus}]
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight ml-auto">
            Ambiente Tático HUD
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-slate-300 leading-relaxed text-sm">
            O ambiente HUD Militar V16 foi inicializado com sucesso. O motor de renderização matemática segura está ativo. O banco de dados nativo está {storageStatus === 'ONLINE' ? 'operacional' : 'falhando'}.
          </p>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 glow-amber">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Teste de Calibração KaTeX
              </h2>
            </div>
            
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-2">Renderização Inline (React-KaTeX):</p>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 inline-block">
                <span className="text-lg text-emerald-300 font-mono">
                  <InlineMath math="E = mc^2" />
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-slate-400 text-xs mb-2">Renderização Bloco (React-KaTeX):</p>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <BlockMath math="\int_{a}^{b} x^2 dx" />
              </div>
            </div>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-bold text-sm font-mono shadow-lg shadow-sky-500/20 transition-all">
            INICIAR SEQUÊNCIA ➔
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
