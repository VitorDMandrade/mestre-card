// src/lib/boss-engine.ts
// Motor lógico de combate em turnos da Via 3 - Coliseu das Bancas (Seção 05 - Lab)

export interface CombatLogEntry {
  id: string;
  type: 'system' | 'player' | 'boss' | 'crit';
  text: string;
}

export interface BossIdentity {
  id: string;
  name: string;
  title: string;
  badge: string;
  bancaCatalogName: string;
  icon: string;
  avatarUrl: string;
  biasDescription: string;
  taunts: string[];
}

export const BOSS_IDENTITIES: Record<string, BossIdentity> = {
  einstein: {
    id: 'einstein',
    name: 'Auditoria Médica Albert Einstein',
    title: 'Comissão Avaliadora de Medicina de Precisão',
    badge: 'MEDICINA EINSTEIN',
    bancaCatalogName: 'Albert Einstein',
    icon: '🩺',
    avatarUrl: './assets/boss/einstein_crest.jpg',
    biasDescription: 'Foco em fisiologia celular, bioquímica clínica e precisão diagnóstica de elite.',
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
    badge: 'ENEM // INEP',
    bancaCatalogName: 'ENEM',
    icon: '🌐',
    avatarUrl: './assets/boss/enem_crest.jpg',
    biasDescription: 'Foco na Matriz de Habilidades TRI, gráficos complexos e contextualização sociocientífica.',
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
    bancaCatalogName: 'UNESP',
    icon: '🏛️',
    avatarUrl: './assets/boss/unesp_crest.jpg',
    biasDescription: 'Foco em dedução analítica passo a passo, rigor conceitual e clareza de 2ª fase.',
    taunts: [
      '“A dedução analítica falhou na premissa intermediária. Sem pontos na 2ª fase!”',
      '“Inversão clássica de causa e consequência. O gabarito oficial é inflexível.”',
      '“A assertiva violou o rigor conceitual exigido no edital paulista.”',
      '“Sua fundamentação teórica ruiu diante dos fatos experimentais!”'
    ]
  },
  uerj: {
    id: 'uerj',
    name: 'Comissão Qualificadora UERJ',
    title: 'Departamento de Seleção Acadêmica UERJ',
    badge: 'UERJ QUALIFICAÇÃO',
    bancaCatalogName: 'UERJ',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em interdisciplinaridade, análise crítica de fenômenos e raciocínio qualitativo denso.',
    taunts: [
      '“Sua interpretação histórica e científica ignorou a condição de contorno da UERJ.”',
      '“No Exame de Qualificação, a coerência textual e causal é imperativa.”',
      '“Conceito superficial. A prova da UERJ exige articulação entre teoria e prática.”'
    ]
  },
  uece: {
    id: 'uece',
    name: 'Comissão Estadual UECE',
    title: 'Conselho de Ciências Biológicas e Exatas UECE',
    badge: 'UECE MEDICINA',
    bancaCatalogName: 'UECE',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em cobrança conteudista cirúrgica, nomenclatura oficial e especificidade taxonômica.',
    taunts: [
      '“A UECE não aceita generalizações. A nomenclatura exata foi violada!”',
      '“Erro no detalhamento estrutural. O edital da UECE exige rigor absoluto!”',
      '“Assertiva incorreta segundo a bibliografia formal do vestibular cearense.”'
    ]
  },
  ufg: {
    id: 'ufg',
    name: 'Comitê Central UFG',
    title: 'Centro de Seleção Universidade Federal de Goiás',
    badge: 'UFG FEDERAL',
    bancaCatalogName: 'UFG',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em resolução estruturada de problemas e aplicação direta de leis fundamentais.',
    taunts: [
      '“A modelagem teórica falhou. O padrão de resposta da Federal de Goiás foi descumprido.”',
      '“Desenvolvimento incompleto. Na UFG, cada etapa analítica deve ser justificada.”',
      '“Cálculo dimensional incorreto para os padrões do vestibular federal.”'
    ]
  },
  uema: {
    id: 'uema',
    name: 'Conselho PAES UEMA',
    title: 'Processo Seletivo de Medicina do Maranhão',
    badge: 'UEMA MEDICINA',
    bancaCatalogName: 'UEMA',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em questões abrangentes de alto impacto conteudista e interpretação biomédica.',
    taunts: [
      '“O crivo do PAES UEMA exige domínio da biologia e química em nível superior.”',
      '“Premissa invalidada. O padrão de correção médico do Maranhão reprovou sua tese.”'
    ]
  },
  uft: {
    id: 'uft',
    name: 'Comissão UFT / EXATO',
    title: 'Universidade Federal do Tocantins & Turma Exato',
    badge: 'UFT MEDICINA',
    bancaCatalogName: 'UFT / EXATO',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em enunciados densos, resolução de alta complexidade e critérios Exato.',
    taunts: [
      '“A UFT pune quem ignora a microfísica e a bioquímica do enunciado.”',
      '“Na prova do Exato/UFT, esse distrator é a armadilha mais letal da folha.”'
    ]
  },
  unirg: {
    id: 'unirg',
    name: 'Auditoria UNIRG Medicina',
    title: 'Conselho Examinador de Gurupi e Paraíso',
    badge: 'UNIRG MEDICINA',
    bancaCatalogName: 'UNIRG',
    icon: '🩺',
    avatarUrl: './assets/boss/einstein_crest.jpg',
    biasDescription: 'Foco em vestibulares médicos tradicionais com ênfase em fisiopatologia e química.',
    taunts: [
      '“A banca da UNIRG identificou erro na via metabólica. Tese indeferida!”',
      '“Na disputa por vagas de medicina em Gurupi, essa falha custa a vaga.”'
    ]
  },
  unirv: {
    id: 'unirv',
    name: 'Comissão UNIRV Medicina',
    title: 'Vestibular de Medicina Rio Verde e Goiânia',
    badge: 'UNIRV MEDICINA',
    bancaCatalogName: 'UNIRV',
    icon: '🩺',
    avatarUrl: './assets/boss/einstein_crest.jpg',
    biasDescription: 'Foco em enunciados sintéticos de alta especificidade diagnóstica.',
    taunts: [
      '“A UNIRV não perdoa hesitação conceitual. Alternativa incorreta!”',
      '“Assertiva refutada pelo gabarito oficial da comissão médica de Rio Verde.”'
    ]
  },
  unitins: {
    id: 'unitins',
    name: 'Banca Estadual UNITINS',
    title: 'Universidade Estadual do Tocantins',
    badge: 'UNITINS VESTIBULAR',
    bancaCatalogName: 'UNITINS',
    icon: '🏛️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco em conceitos formais e raciocínio indutivo em ciências da natureza.',
    taunts: [
      '“A dedução não atende ao edital da UNITINS. Revisão indeferida.”'
    ]
  },
  cadernos: {
    id: 'cadernos',
    name: 'Poliedro & Ferretto Cadernos',
    title: 'Compilado Temático de Exercícios Avançados',
    badge: 'CADERNOS TEMÁTICOS',
    bancaCatalogName: 'Outras',
    icon: '📚',
    avatarUrl: './assets/boss/shield_icon.jpg',
    biasDescription: 'Foco em desmonte de distratores, volume de treinamento e consolidação tática.',
    taunts: [
      '“Você caiu na clássica pegadinha dos cadernos temáticos de elite.”',
      '“Esse distrator foi concebido exatamente para flagrar alunos desatentos.”'
    ]
  },
  standard: {
    id: 'standard',
    name: 'O Examinador Implacável',
    title: 'Juiz Supremo do Gabarito e Auditoria Epistêmica',
    badge: 'BANCA EXAMINADORA',
    bancaCatalogName: 'todas',
    icon: '⚖️',
    avatarUrl: './assets/boss/examiner_avatar.jpg',
    biasDescription: 'Foco na integridade teórica do card e confronto direto de teses.',
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
