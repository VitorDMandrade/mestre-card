// src/lib/boss-engine.ts
// Motor lógico de combate em turnos da Via 3 - Coliseu das Bancas (Seção 05 - Lab)

export interface CombatLogEntry {
  id: string;
  type: 'system' | 'player' | 'boss' | 'crit';
  text: string;
}

export interface BossIdentity {
  id: 'einstein' | 'enem' | 'unesp' | 'standard';
  name: string;
  title: string;
  badge: string;
  avatarUrl: string;
  taunts: string[];
}

export const BOSS_IDENTITIES: Record<string, BossIdentity> = {
  einstein: {
    id: 'einstein',
    name: 'Auditoria Médica Albert Einstein',
    title: 'Comissão Avaliadora de Medicina de Precisão',
    badge: 'MEDICINA EINSTEIN',
    avatarUrl: './assets/boss/einstein_crest.jpg',
    taunts: [
      '“Diagnóstico causal incorreto. O rigor fisiológico não admite aproximações levianas.”',
      '“Você confundiu a via metabólica primária. Anulação clínica imediata!”',
      '“Mecanismo refutado. Na medicina de ponta, sua hipótese custaria uma vida.”',
      '“Falha no raciocínio bioquímico. A homeostase do sistema foi ignorada!”'
    ]
  },
  enem: {
    id: 'enem',
    name: 'Examinador Central do ENEM',
    title: 'Matriz de Referência e Habilidades Inep',
    badge: 'EXAME NACIONAL DO ENSINO MÉDIO',
    avatarUrl: './assets/boss/enem_crest.jpg',
    taunts: [
      '“Você caiu no distrator contextual mais manjado da prova.”',
      '“Falta de domínio da competência de ciências da natureza. A TRI reduzirá sua pontuação!”',
      '“Uma leitura apressada do gráfico induziu seu sofisma. Gabarito indeferido!”',
      '“A contextualização social não anula a lei física fundamental, candidato!”'
    ]
  },
  unesp: {
    id: 'unesp',
    name: 'Tribunal Clássico UNESP',
    title: 'Conselho Examinador Fundação Vunesp',
    badge: 'VESTIBULAR UNESP',
    avatarUrl: './assets/boss/unesp_crest.jpg',
    taunts: [
      '“A dedução analítica falhou na premissa intermediária. Sem pontos na 2ª fase!”',
      '“Inversão clássica de causa e consequência. O gabarito oficial é inflexível.”',
      '“A assertiva violou o rigor conceitual exigido no edital paulista.”',
      '“Sua fundamentação teórica ruiu diante dos fatos experimentais!”'
    ]
  },
  standard: {
    id: 'standard',
    name: 'O Examinador Implacável',
    title: 'Juiz Supremo do Gabarito e Auditoria Epistêmica',
    badge: 'BANCA EXAMINADORA',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    taunts: [
      '“Sofisma primário detectado. Sua resposta carece de sustentação mecânica.”',
      '“Contra-ataque deferido. O tribunal indefere seu argumento!”',
      '“Sua tese ruiu diante do princípio da conservação!”',
      '“Premissa falaciosa detectada. Sofra o rigor do edital!”',
      '“Você confunde correlação com causalidade, candidato!”'
    ]
  }
};

export interface BossCombatState {
  currentRoundIndex: number; // 0, 1, 2 (Fases 1, 2 e 3)
  totalRounds: number;
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
  isPhaseTransition: boolean;
  turnCount: number;
  oracleHintUsed: boolean;
  bossRageLevel: number; // Incrementa a cada erro do candidato
  selectedIdentity: BossIdentity;
}

export function initGauntletCombat(identityKey = 'standard'): BossCombatState {
  const identity = BOSS_IDENTITIES[identityKey] || BOSS_IDENTITIES.standard;
  return {
    currentRoundIndex: 0,
    totalRounds: 3,
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
        text: `⚔️ COLISEU ATIVADO: ${identity.name} assumiu a bancada. 3 Fases de Julgamento iniciadas!`
      }
    ],
    isVictory: false,
    isDefeat: false,
    isPhaseTransition: false,
    turnCount: 1,
    oracleHintUsed: false,
    bossRageLevel: 0,
    selectedIdentity: identity
  };
}

// Compatibilidade retroativa
export function initBossCombat(): BossCombatState {
  return initGauntletCombat('standard');
}

export const EXAMINER_TAUNTS: string[] = BOSS_IDENTITIES.standard.taunts;
