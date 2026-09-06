// src/lib/xp-engine.ts
// Sistema de XP e Progresso persistente via localStorage

export type LevelName =
  | 'Recruta'
  | 'Agente'
  | 'Analista'
  | 'Operativo'
  | 'Estrategista'
  | 'Mestre';

export interface BadgeDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PlayerProfile {
  xp: number;
  level: number;
  levelName: LevelName;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  xpProgress: number; // 0–1 float
  badges: string[]; // badge IDs earned
  totalSessions: number;
  bestScore: number;
}

export interface XPResult {
  xpAdded: number;
  leveledUp: boolean;
  newLevel: number;
  newLevelName: LevelName;
  badgesEarned: BadgeDefinition[];
}

// ─── Level Thresholds ─────────────────────────────────────────────────────
const LEVELS: { name: LevelName; xpRequired: number }[] = [
  { name: 'Recruta',     xpRequired: 0    },
  { name: 'Agente',      xpRequired: 300  },
  { name: 'Analista',    xpRequired: 800  },
  { name: 'Operativo',   xpRequired: 1600 },
  { name: 'Estrategista',xpRequired: 2800 },
  { name: 'Mestre',      xpRequired: 5000 },
];

// ─── Badge Definitions ─────────────────────────────────────────────────────
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: 'first_blood',  name: 'Primeiro Sangue', icon: '🩸', description: 'Complete sua primeira sessão de arcade.' },
  { id: 'sniper',       name: 'Sniper',          icon: '🎯', description: '5 acertos consecutivos em qualquer game.' },
  { id: 'unstoppable',  name: 'Imparável',       icon: '💥', description: 'Alcance combo x10 ou mais.' },
  { id: 'speedster',    name: 'Velocista',       icon: '⚡', description: 'Complete G3 em menos de 3s por questão em média.' },
  { id: 'wall',         name: 'Muralha',         icon: '🧱', description: 'Termine uma sessão hardcore sem levar dano.' },
  { id: 'perfectionist',name: 'Perfeccionista',  icon: '💎', description: 'Score TRI 900 ou acima.' },
  { id: 'veteran',      name: 'Veterano',        icon: '🏅', description: 'Complete 10 sessões de arcade.' },
  { id: 'master_rank',  name: 'Posto de Mestre', icon: '👑', description: 'Alcance o nível Mestre.' },
];

// ─── Storage key ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'mestrecard_player_profile_v2';

function getLevelForXP(xp: number): { level: number; name: LevelName; xpForCurrent: number; xpForNext: number } {
  let levelIdx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      levelIdx = i;
      break;
    }
  }
  const xpForCurrent = LEVELS[levelIdx].xpRequired;
  const xpForNext = LEVELS[levelIdx + 1]?.xpRequired ?? LEVELS[levelIdx].xpRequired + 1;
  return {
    level: levelIdx + 1,
    name: LEVELS[levelIdx].name,
    xpForCurrent,
    xpForNext,
  };
}

export function getPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      const { level, name, xpForCurrent, xpForNext } = getLevelForXP(stored.xp ?? 0);
      const range = xpForNext - xpForCurrent;
      const progress = range > 0 ? Math.min(1, (stored.xp - xpForCurrent) / range) : 1;
      return {
        xp: stored.xp ?? 0,
        level,
        levelName: name,
        xpForCurrentLevel: xpForCurrent,
        xpForNextLevel: xpForNext,
        xpProgress: progress,
        badges: stored.badges ?? [],
        totalSessions: stored.totalSessions ?? 0,
        bestScore: stored.bestScore ?? 0,
      };
    }
  } catch (_) {/* ignore */}

  return {
    xp: 0, level: 1, levelName: 'Recruta',
    xpForCurrentLevel: 0, xpForNextLevel: 300, xpProgress: 0,
    badges: [], totalSessions: 0, bestScore: 0,
  };
}

export function addXP(
  amount: number,
  sessionScore?: number,
  opts?: {
    comboMax?: number;
    g3SpeedPerQ?: number; // seconds
    hardcoreNoDamage?: boolean;
    sessionErrors?: number;
  }
): XPResult {
  const profile = getPlayerProfile();
  const oldLevel = profile.level;
  const newXP = profile.xp + amount;
  const newTotalSessions = profile.totalSessions + 1;
  const newBestScore = Math.max(profile.bestScore, sessionScore ?? 0);

  const { level, name } = getLevelForXP(newXP);

  // Badge evaluation
  const existingBadges = new Set(profile.badges);
  const earned: BadgeDefinition[] = [];

  function tryEarnBadge(id: string) {
    if (!existingBadges.has(id)) {
      const def = BADGE_DEFINITIONS.find(b => b.id === id);
      if (def) {
        existingBadges.add(id);
        earned.push(def);
      }
    }
  }

  if (newTotalSessions >= 1) tryEarnBadge('first_blood');
  if ((opts?.comboMax ?? 0) >= 5) tryEarnBadge('sniper');
  if ((opts?.comboMax ?? 0) >= 10) tryEarnBadge('unstoppable');
  if ((opts?.g3SpeedPerQ ?? Infinity) < 3) tryEarnBadge('speedster');
  if (opts?.hardcoreNoDamage) tryEarnBadge('wall');
  if ((sessionScore ?? 0) >= 900) tryEarnBadge('perfectionist');
  if (newTotalSessions >= 10) tryEarnBadge('veteran');
  if (level >= 6) tryEarnBadge('master_rank');

  // Persist
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: newXP,
      badges: Array.from(existingBadges),
      totalSessions: newTotalSessions,
      bestScore: newBestScore,
    }));
  } catch (_) {/* ignore */}

  return {
    xpAdded: amount,
    leveledUp: level > oldLevel,
    newLevel: level,
    newLevelName: name,
    badgesEarned: earned,
  };
}

export function calculateSessionXP(params: {
  score: number;
  comboMax: number;
  sessionErrors: number;
  gamesCompleted: number;
}): number {
  const { score, comboMax, sessionErrors, gamesCompleted } = params;
  let xp = 0;

  // Base XP por score
  xp += Math.round(score * 0.12);

  // Bônus por games completados
  xp += gamesCompleted * 15;

  // Bônus por combo alto
  if (comboMax >= 3) xp += 10;
  if (comboMax >= 5) xp += 20;
  if (comboMax >= 10) xp += 50;

  // Penalidade por erros
  xp = Math.max(10, xp - sessionErrors * 3);

  return xp;
}

export function getLevelColor(levelName: LevelName): string {
  const map: Record<LevelName, string> = {
    'Recruta':      'text-slate-400',
    'Agente':       'text-cyan-400',
    'Analista':     'text-sky-300',
    'Operativo':    'text-amber-400',
    'Estrategista': 'text-rose-400',
    'Mestre':       'text-purple-400',
  };
  return map[levelName] ?? 'text-cyan-400';
}

export function getLevelGlowClass(levelName: LevelName): string {
  const map: Record<LevelName, string> = {
    'Recruta':      'shadow-slate-500/20',
    'Agente':       'shadow-cyan-500/30',
    'Analista':     'shadow-sky-400/30',
    'Operativo':    'shadow-amber-500/30',
    'Estrategista': 'shadow-rose-500/30',
    'Mestre':       'shadow-purple-500/40',
  };
  return map[levelName] ?? 'shadow-cyan-500/20';
}
