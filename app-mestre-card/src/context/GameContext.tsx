// src/context/GameContext.tsx
import { createContext, useContext, useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import { getPlayerProfile, type PlayerProfile } from '../lib/xp-engine';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Particle {
  id: number;
  x: number;
  y: number;
}

export interface XpToastData {
  id: number;
  amount: number;
  levelUp?: string; // new level name if leveled up
}

interface GameContextValue {
  // Combo system
  combo: number;
  addCombo: () => void;
  resetCombo: () => void;
  maxComboReached: number;

  // Particles
  particles: Particle[];
  fireParticles: (x: number, y: number) => void;

  // XP Toasts
  xpToasts: XpToastData[];
  fireXpToast: (amount: number, levelUpName?: string) => void;

  // Screen flash
  screenFlash: 'hit' | 'miss' | null;
  triggerFlash: (type: 'hit' | 'miss') => void;

  // Player profile (refreshed after XP add)
  playerProfile: PlayerProfile;
  refreshProfile: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const GameContext = createContext<GameContextValue | null>(null);

let particleId = 0;
let toastId = 0;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [combo, setCombo] = useState(0);
  const [maxComboReached, setMaxComboReached] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [xpToasts, setXpToasts] = useState<XpToastData[]>([]);
  const [screenFlash, setScreenFlash] = useState<'hit' | 'miss' | null>(null);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>(() => getPlayerProfile());
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshProfile = useCallback(() => {
    setPlayerProfile(getPlayerProfile());
  }, []);

  const addCombo = useCallback(() => {
    setCombo(prev => {
      const next = prev + 1;
      setMaxComboReached(m => Math.max(m, next));
      return next;
    });
  }, []);

  const resetCombo = useCallback(() => {
    setCombo(0);
  }, []);

  const fireParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = Array.from({ length: 10 }, () => ({
      id: ++particleId,
      x,
      y,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    // auto-cleanup after animation duration
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 900);
  }, []);

  const fireXpToast = useCallback((amount: number, levelUpName?: string) => {
    const toast: XpToastData = { id: ++toastId, amount, levelUp: levelUpName };
    setXpToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setXpToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 2200);
  }, []);

  const triggerFlash = useCallback((type: 'hit' | 'miss') => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setScreenFlash(type);
    flashTimerRef.current = setTimeout(() => setScreenFlash(null), 220);
  }, []);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  return (
    <GameContext.Provider value={{
      combo, addCombo, resetCombo, maxComboReached,
      particles, fireParticles,
      xpToasts, fireXpToast,
      screenFlash, triggerFlash,
      playerProfile, refreshProfile,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
