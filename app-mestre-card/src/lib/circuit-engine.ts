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
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildCircuitNodes(card: any, _roundSeed?: number): CircuitNode[] {
  const structure = card?.sec03_structure || {};
  const causalChain = structure?.causalChain;

  // 1. Caso Qualitativo (Cadeia Causal clássica de 5 etapas)
  if (causalChain && (causalChain.causes || causalChain.agents || causalChain.mechanisms)) {
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

  // 2. Caso Quantitativo / Híbrido: constrói SEMPRE 5 terminais interligados
  const candidateNodes: { label: string; name: string; icon: string; badge: string; correct: string }[] = [];

  // Terminal 01: Função de Estado Primária (FormulaChamber)
  if (Array.isArray(structure?.formulaChamber) && structure.formulaChamber.length > 0) {
    const f0 = structure.formulaChamber[0];
    candidateNodes.push({
      label: 'TERMINAL 01: POLO GERADOR',
      name: f0.title || 'Função de Estado Primária',
      icon: '🏛️',
      badge: 'bg-amber-950/70 border-amber-500/50 text-amber-300',
      correct: truncateForOption(f0.notes || `${f0.title}: Lei fundamental que rege o balanço do sistema.`)
    });
  }

  // Terminal 02: Dissecação Anatômica S.I. (Variables)
  if (Array.isArray(structure?.variables) && structure.variables.length > 0) {
    const v0 = structure.variables[0];
    candidateNodes.push({
      label: 'TERMINAL 02: CONDUTOR ATIVO',
      name: `Dissecação S.I. (${v0.symbol || 'Grandeza'})`,
      icon: '📐',
      badge: 'bg-blue-950/70 border-blue-500/50 text-blue-300',
      correct: truncateForOption(`${v0.meaning || 'Grandeza'}: expressa em ${v0.siUnit || 'S.I.'}${v0.conversions ? ` (${v0.conversions})` : ''}`)
    });
  }

  // Terminais de Proporcionalidade
  if (Array.isArray(structure?.proportionality) && structure.proportionality.length > 0) {
    structure.proportionality.forEach((prop: any, pIdx: number) => {
      const propText = typeof prop === 'string' ? prop : (prop.rule || prop.statement || JSON.stringify(prop));
      candidateNodes.push({
        label: `TERMINAL 0${candidateNodes.length + 1}: CALIBRAÇÃO DINÂMICA`,
        name: `Proporcionalidade 0${pIdx + 1}`,
        icon: '🔄',
        badge: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
        correct: truncateForOption(propText)
      });
    });
  }

  // Terminal de Mecanismo Secundário se houver 2ª fórmula
  if (Array.isArray(structure?.formulaChamber) && structure.formulaChamber.length > 1 && candidateNodes.length < 5) {
    const f1 = structure.formulaChamber[1];
    candidateNodes.push({
      label: `TERMINAL 0${candidateNodes.length + 1}: SAÍDA DE CARGA`,
      name: f1.title || 'Mecanismo Secundário',
      icon: '⚙️',
      badge: 'bg-red-950/70 border-red-500/50 text-red-300',
      correct: truncateForOption(f1.notes || `${f1.title}: Rege a conversão e quebra/formação das ligações.`)
    });
  }

  // Preenche até 5 com eixos temáticos se necessário
  const thematicAxes = card?.sec01_header?.thematicAxes || [
    'Conservação de Carga & Balanço Energético',
    'Convergência Estequiométrica na TRI',
    'Estabilidade do Produto Reacional'
  ];

  let axIdx = 0;
  while (candidateNodes.length < 5) {
    const axis = thematicAxes[axIdx % thematicAxes.length];
    candidateNodes.push({
      label: `TERMINAL 0${candidateNodes.length + 1}: REDE DISTRIBUÍDA`,
      name: `Acoplamento TRI 0${candidateNodes.length + 1}`,
      icon: '🌐',
      badge: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
      correct: truncateForOption(`Princípio de nexo causal: ${axis}`)
    });
    axIdx++;
  }

  return candidateNodes.slice(0, 5).map((node, idx) => {
    const distractor1 = DISTRACTOR_TEMPLATES[idx % DISTRACTOR_TEMPLATES.length];
    const distractor2 = `Inversão de grandezas: gradiente de fluxo opera em sentido oposto às leis do equilíbrio.`;
    return {
      id: `prop-node-${idx + 1}`,
      stageIndex: idx,
      terminalLabel: node.label,
      stageName: node.name,
      badgeClass: node.badge,
      icon: node.icon,
      correctAnswer: node.correct,
      options: shuffleArray([node.correct, distractor1, distractor2])
    };
  });
}
