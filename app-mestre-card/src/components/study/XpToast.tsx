// src/components/study/XpToast.tsx
// Floating XP toast that rises and fades
import { useGame } from '../../context/GameContext';

export const XpToast = () => {
  const { xpToasts } = useGame();

  return (
    <div className="pointer-events-none fixed right-6 bottom-20 z-[9998] flex flex-col-reverse gap-2 items-end" aria-live="polite">
      {xpToasts.map(toast => (
        <div
          key={toast.id}
          className="xp-toast flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border font-mono text-xs font-black shadow-lg"
          style={{
            borderColor: toast.levelUp ? '#a855f7' : '#22d3ee',
            color: toast.levelUp ? '#c084fc' : '#22d3ee',
            boxShadow: toast.levelUp
              ? '0 0 16px rgba(168,85,247,0.4)'
              : '0 0 12px rgba(34,211,238,0.3)',
          }}
        >
          <span>{toast.levelUp ? '🎉' : '⭐'}</span>
          <span>+{toast.amount} XP</span>
          {toast.levelUp && (
            <span className="text-purple-300 ml-1">→ {toast.levelUp}!</span>
          )}
        </div>
      ))}
    </div>
  );
};
