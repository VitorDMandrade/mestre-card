// src/lib/boss-engine.ts
// Motor lógico de combate em turnos da Via 3 - Boss Fight Roguelike (Seção 05 - Lab)

export interface CombatLogEntry {
  id: string;
  type: 'system' | 'player' | 'boss' | 'crit';
  text: string;
}

export interface BossCombatState {
  bossHp: number;
  maxBossHp: number;
  playerHp: number;
  maxPlayerHp: number;
  actionPoints: number; // Máximo 3 PA
  maxActionPoints: number;
  eliminatedDistractors: string[]; // Texto ou identificador das alternativas vaporizadas
  combatLog: CombatLogEntry[];
  isVictory: boolean;
  isDefeat: boolean;
  turnCount: number;
  oracleHintUsed: boolean;
  bossRageLevel: number; // Incrementa a cada erro do candidato
}

export function initBossCombat(): BossCombatState {
  return {
    bossHp: 1000,
    maxBossHp: 1000,
    playerHp: 100,
    maxPlayerHp: 100,
    actionPoints: 3,
    maxActionPoints: 3,
    eliminatedDistractors: [],
    combatLog: [
      {
        id: `init-${Date.now()}`,
        type: 'system',
        text: '⚔️ ARENA DO CENÁCULO: O Examinador Implacável conjurou a Barreira de Sofismas. Execute o Golpe de Tese!'
      }
    ],
    isVictory: false,
    isDefeat: false,
    turnCount: 1,
    oracleHintUsed: false,
    bossRageLevel: 0
  };
}

export const EXAMINER_TAUNTS: string[] = [
  'Sua tese ruiu diante do princípio da conservação!',
  'Premissa falaciosa detectada. Sofra o rigor do edital!',
  'Você confunde correlação com causalidade, candidato!',
  'Essa resposta não resiste a uma análise de primeira ordem!',
  'O rigor metodológico da banca aniquilou seu argumento!',
  'Sofisma primário! O edital não tolera imprecisões conceituais!',
  'Sua assertiva desconsiderou as condições de contorno do sistema!'
];
