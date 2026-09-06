// src/components/arcade/ParticlesBurst.tsx
// Lightweight pure CSS/JS particle burst — no external library
import { useGame } from '../../context/GameContext';

const PARTICLE_CHARS = ['✦', '◆', '⬟', '★', '◉', '✸', '◈'];
const COLORS = [
  'text-cyan-400', 'text-amber-400', 'text-emerald-400',
  'text-sky-300', 'text-rose-400', 'text-purple-400',
];

export const ParticlesBurst = () => {
  const { particles } = useGame();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => {
        const char = PARTICLE_CHARS[i % PARTICLE_CHARS.length];
        const color = COLORS[i % COLORS.length];
        const angle = (i / 10) * 360;
        const distance = 40 + Math.random() * 40;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance - 30;
        const scale = 0.7 + Math.random() * 0.8;
        return (
          <span
            key={p.id}
            className={`absolute text-sm font-bold ${color} particle-pop`}
            style={{
              left: p.x,
              top: p.y,
              '--dx': `${dx}px`,
              '--dy': `${dy}px`,
              '--scale': scale,
              animationDelay: `${i * 25}ms`,
            } as React.CSSProperties}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
