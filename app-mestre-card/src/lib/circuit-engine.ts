// src/lib/circuit-engine.ts

export interface CircuitNode {
  id: string;
  stageIndex: number;
  terminalLabel: string;
  stageName: string;
  badgeClass: string;
  icon: string;
  correctAnswer: string;
  options: string[];
}

export interface CircuitState {
  nodes: CircuitNode[];
  currentNodeIndex: number;
  conductionPercent: number;
  isShortCircuited: boolean;
  isCompleted: boolean;
  selectedOption: string | null;
  shortCircuitReason: string | null;
}

const DISTRACTOR_TEMPLATES = [
  'Inversão de causa e efeito: reação isolada tomada falsamente como fundamento primário.',
  'Correlação espúria externa desprovida de nexo causal mecânico com a tese.',
  'Estagnação estática do sistema sem dissipação ou transferência de carga conceitual.',
  'Gradiente inverso: atenuação de fluxo onde há indução de aceleração exponencial.',
  'Atribuição de protagonismo a agentes periféricos com anulação das forças estruturais.',
  'Confusão entre causa concomitante e determinação necessária de contorno.'
];

function extractText(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) {
    return val.map(v => (typeof v === 'string' ? v : JSON.stringify(v))).join(' • ');
  }
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return Object.values(val).join(' ');
  }
  return String(val);
}

function truncateForOption(text: string, maxLen = 140): string {
  if (!text) return '';
  const clean = text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + '...';
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * 0.6180339887) % (i + 1); // Pseudo-aleatório estável
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildCircuitNodes(card: any): CircuitNode[] {
  const structure = card?.sec03_structure || {};
  const causalChain = structure?.causalChain;

  // 1. Caso Qualitativo (Cadeia Causal clássica)
  if (causalChain) {
    const qualitativeDefs = [
      {
        label: 'TERMINAL 01: POLO GERADOR',
        name: 'Causas Materiais & Premissas',
        badgeClass: 'bg-amber-950/70 border-amber-500/50 text-amber-300',
        icon: '🏛️',
        raw: causalChain.causes
      },
      {
        label: 'TERMINAL 02: CONDUTOR ATIVO',
        name: 'Agentes & Forças Catalisadoras',
        badgeClass: 'bg-blue-950/70 border-blue-500/50 text-blue-300',
        icon: '👥',
        raw: causalChain.agents
      },
      {
        label: 'TERMINAL 03: REATOR CENTRAL',
        name: 'Mecanismos de Ação & Leis',
        badgeClass: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
        icon: '⚙️',
        raw: causalChain.mechanisms
      },
      {
        label: 'TERMINAL 04: SAÍDA DE CARGA',
        name: 'Consequências Diretas & Rupturas',
        badgeClass: 'bg-red-950/70 border-red-500/50 text-red-300',
        icon: '💥',
        raw: causalChain.consequences
      },
      {
        label: 'TERMINAL 05: REDE DISTRIBUÍDA',
        name: 'Desdobramentos Estruturais',
        badgeClass: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
        icon: '🌐',
        raw: causalChain.unfoldings || causalChain.developments || causalChain.desdobramentos
      }
    ];

    return qualitativeDefs.map((def, idx) => {
      const fullText = extractText(def.raw) || `Pilar causal da etapa ${def.name}`;
      const correct = truncateForOption(fullText);
      const distractor1 = DISTRACTOR_TEMPLATES[idx % DISTRACTOR_TEMPLATES.length];
      const distractor2 = DISTRACTOR_TEMPLATES[(idx + 2) % DISTRACTOR_TEMPLATES.length];

      return {
        id: `causal-node-${idx + 1}`,
        stageIndex: idx,
        terminalLabel: def.label,
        stageName: def.name,
        badgeClass: def.badgeClass,
        icon: def.icon,
        correctAnswer: correct,
        options: shuffleArray([correct, distractor1, distractor2])
      };
    });
  }

  // 2. Caso Quantitativo (Proporcionalidade de Fórmulas e Grandezas)
  if (Array.isArray(structure?.proportionality) && structure.proportionality.length > 0) {
    const props = structure.proportionality.slice(0, 5);
    return props.map((prop: any, idx: number) => {
      const propText = typeof prop === 'string' ? prop : (prop.rule || prop.statement || JSON.stringify(prop));
      const correct = truncateForOption(propText);
      const distractor1 = `Relação inversa: grandezas variam em razões assintóticas desbalanceadas.`;
      const distractor2 = `Invariância estática: o parâmetro não responde à variação dos fatores de contorno.`;

      const badges = [
        'bg-amber-950/70 border-amber-500/50 text-amber-300',
        'bg-blue-950/70 border-blue-500/50 text-blue-300',
        'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
        'bg-red-950/70 border-red-500/50 text-red-300',
        'bg-purple-950/70 border-purple-500/50 text-purple-300'
      ];
      const icons = ['📐', '⚡', '🔄', '⚖️', '🎯'];

      return {
        id: `prop-node-${idx + 1}`,
        stageIndex: idx,
        terminalLabel: `TERMINAL 0${idx + 1}: CALIBRAÇÃO S.I.`,
        stageName: `Relação Proporcional 0${idx + 1}`,
        badgeClass: badges[idx % badges.length],
        icon: icons[idx % icons.length],
        correctAnswer: correct,
        options: shuffleArray([correct, distractor1, distractor2])
      };
    });
  }

  // 3. Fallback genérico a partir dos eixos temáticos se o card não possuir sec03 estruturada
  const fallbackAxes = card?.sec01_header?.thematicAxes || [
    'Fundamentos Conceituais',
    'Agentes & Dinâmica',
    'Mecanismos de Operação',
    'Impactos Imediatos',
    'Desdobramentos na TRI'
  ];

  return fallbackAxes.slice(0, 5).map((axis: string, idx: number) => {
    const correct = truncateForOption(axis);
    return {
      id: `fallback-node-${idx + 1}`,
      stageIndex: idx,
      terminalLabel: `TERMINAL 0${idx + 1}: EIXO ESTRUTURAL`,
      stageName: `Eixo ${idx + 1}`,
      badgeClass: 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300',
      icon: '⚙️',
      correctAnswer: correct,
      options: shuffleArray([
        correct,
        DISTRACTOR_TEMPLATES[idx % DISTRACTOR_TEMPLATES.length],
        `Dispersão inercial: o conceito é desacoplado da matriz de competência.`
      ])
    };
  });
}
