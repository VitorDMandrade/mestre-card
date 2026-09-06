import type { MestreCardData } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';

interface RecallSectionProps {
  card: MestreCardData;
}

export const RecallSection = ({ card }: RecallSectionProps) => {
  const flashcards = card.sec06_recall;

  if (!flashcards || flashcards.length === 0) return null;

  return (
    <section id="sec-06" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-black text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <span className="text-blue-500">06.</span> RECALL MATRIX
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((fc, i) => (
          <details 
            key={fc.id || i} 
            className="group bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-blue-500/30 transition-colors [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="p-5 cursor-pointer relative list-none flex flex-col gap-3 min-h-[120px]">
              <div className="flex justify-between items-start gap-2">
                <span className="bg-slate-800 text-xs font-bold text-gray-400 px-2 py-1 rounded border border-slate-700">
                  {fc.tag || 'GERAL'}
                </span>
                <span className="text-blue-500 transition-transform duration-300 group-open:rotate-180">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
              <div className="text-gray-200 font-medium text-sm leading-relaxed flex-1">
                <MathRenderer content={fc.front} />
              </div>
            </summary>
            
            <div className="p-5 border-t border-slate-700/50 bg-slate-800/30 text-emerald-300 text-sm leading-relaxed font-medium">
              <MathRenderer content={fc.back} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
