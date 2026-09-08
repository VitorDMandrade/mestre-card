// src/lib/constellation-engine.ts
import { ACERVO_CATALOG, type AcervoItem } from '../data/acervo-catalog';
import type { MestreCardData } from '../types/mestre-card';

export type NodeType = 'discipline' | 'card' | 'axis' | 'banca' | 'acervo';

export interface ConstellationNode {
  id: string;
  label: string;
  sublabel?: string;
  type: NodeType;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  z: number; // Profundidade cósmica para paralaxe (-100 a 100)
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  icon: string;
  orbitParentId?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  metadata: {
    cardId?: string;
    discipline?: string;
    score?: number;
    banca?: string;
    acervoItem?: AcervoItem;
    summary?: string;
    thematicAxes?: string[];
    skillsCount?: number;
    examCount?: number;
  };
}

export interface ConstellationEdge {
  id: string;
  source: string;
  target: string;
  color: string;
  width: number;
  pulseSpeed: number;
  strength: number;
}

export interface StarParticle {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

export interface ConstellationGraph {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  stars: StarParticle[];
}

export const DISCIPLINE_COLORS: Record<string, { main: string; glow: string; icon: string }> = {
  quimica: { main: '#00f5ff', glow: 'rgba(0, 245, 255, 0.45)', icon: '⚗️' },
  biologia: { main: '#10b981', glow: 'rgba(16, 185, 129, 0.45)', icon: '🧬' },
  fisica: { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.45)', icon: '⚡' },
  matematica: { main: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.45)', icon: '📐' },
  humanas: { main: '#f43f5e', glow: 'rgba(244, 63, 94, 0.45)', icon: '🏛️' },
  linguagens: { main: '#ec4899', glow: 'rgba(236, 72, 153, 0.45)', icon: '📚' },
  geral: { main: '#06b6d4', glow: 'rgba(6, 182, 212, 0.45)', icon: '🌐' }
};

export const BANCA_METADATA: Record<string, { name: string; color: string; icon: string; bias: string }> = {
  'Albert Einstein': { name: 'Albert Einstein', color: '#00e5ff', icon: '🩺', bias: 'Rigor Biocientífico e Farmacologia' },
  'ENEM': { name: 'ENEM / INEP', color: '#3b82f6', icon: '🌐', bias: 'Matriz TRI e Interpretação Sociotécnica' },
  'UNESP': { name: 'VUNESP / UNESP', color: '#ef4444', icon: '🏛️', bias: 'Clareza Conceitual e Proposições Diretas' },
  'UERJ': { name: 'UERJ', color: '#f59e0b', icon: '🏛️', bias: 'Abordagem Cidadã e Leitura Intertextual' },
  'UECE': { name: 'UECE', color: '#8b5cf6', icon: '🏛️', bias: 'Profundidade Taxonômica e Botânica' },
  'UFG': { name: 'UFG Federal', color: '#10b981', icon: '🏛️', bias: 'Rigor Físico-Matemático e Exatidão' },
  'UEMA': { name: 'UEMA', color: '#f97316', icon: '🏛️', bias: 'Regionalismo e Fisiologia Comparada' },
  'UNIRG': { name: 'UNIRG Medicina', color: '#06b6d4', icon: '🩺', bias: 'Clínica Médica e Anatomia Aplicada' },
  'UNIRV': { name: 'UNIRV Medicina', color: '#14b8a6', icon: '🩺', bias: 'Fisiopatologia e Biofísica Médica' }
};

/** Normaliza strings para correspondência semântica */
function norm(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/** Gera a poeira estelar de fundo */
export function generateStarfield(count = 350, width = 3000, height = 2000): StarParticle[] {
  const stars: StarParticle[] = [];
  const starColors = ['#ffffff', '#bae6fd', '#fed7aa', '#ddd6fe', '#fbcfe8'];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: (Math.random() - 0.5) * 400,
      radius: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 1.8 + 0.6,
      phase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    });
  }
  return stars;
}

/** Constrói o Grafo da Constelação Neural com todos os nós e arestas */
export function buildConstellationGraph(
  cards: MestreCardData[],
  acervo: AcervoItem[] = ACERVO_CATALOG,
  activeCardId?: string | null
): ConstellationGraph {
  const nodes: ConstellationNode[] = [];
  const edges: ConstellationEdge[] = [];

  // 1. NÚCLEOS DISCIPLINARES (Hubs Centrais da Galáxia)
  // Núcleo Central de Comando
  nodes.push({
    id: 'hub-nexus-core',
    label: 'NEXUS COGNITIVO // ACERVO 598',
    type: 'discipline',
    x: 0,
    y: 0,
    baseX: 0,
    baseY: 0,
    z: 20,
    vx: 0,
    vy: 0,
    radius: 38,
    color: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.65)',
    icon: '🏛️',
    metadata: {
      discipline: 'geral',
      summary: 'Núcleo de comando central do MestreCard integrando matriz de competências e o acervo oficial de 598 PDFs.'
    }
  });

  const disciplines = [
    { key: 'quimica', label: 'CIÊNCIAS QUÍMICAS', angle: -Math.PI / 2, dist: 520 },
    { key: 'biologia', label: 'BIOCIÊNCIAS & SAÚDE', angle: -Math.PI / 2 + (2 * Math.PI) / 5, dist: 520 },
    { key: 'fisica', label: 'FÍSICA & ENERGIA', angle: -Math.PI / 2 + (4 * Math.PI) / 5, dist: 520 },
    { key: 'humanas', label: 'HUMANAS & HISTÓRIA', angle: -Math.PI / 2 + (6 * Math.PI) / 5, dist: 520 },
    { key: 'matematica', label: 'MATEMÁTICA FORMAL', angle: -Math.PI / 2 + (8 * Math.PI) / 5, dist: 520 }
  ];

  disciplines.forEach(d => {
    const config = DISCIPLINE_COLORS[d.key] || DISCIPLINE_COLORS.geral;
    const x = Math.cos(d.angle) * d.dist;
    const y = Math.sin(d.angle) * d.dist;

    nodes.push({
      id: `hub-${d.key}`,
      label: d.label,
      type: 'discipline',
      x,
      y,
      baseX: x,
      baseY: y,
      z: 0,
      vx: 0,
      vy: 0,
      radius: 32,
      color: config.main,
      glowColor: config.glow,
      icon: config.icon,
      metadata: {
        discipline: d.key,
        summary: `Núcleo central de integração epistêmica em ${d.label}.`
      }
    });

    // Conecta o núcleo Nexus a cada disciplina
    edges.push({
      id: `edge-core-${d.key}`,
      source: 'hub-nexus-core',
      target: `hub-${d.key}`,
      color: 'rgba(0, 245, 255, 0.22)',
      width: 2,
      pulseSpeed: 1.2,
      strength: 0.5
    });
  });

  // 2. MESTRECARDS CADASTRADOS (Estrelas Ativas)
  cards.forEach((card, idx) => {
    const topicNorm = norm(card.topic || '');
    let discKey = 'humanas';
    if (topicNorm.includes('quimica') || topicNorm.includes('termo')) discKey = 'quimica';
    else if (topicNorm.includes('bio') || topicNorm.includes('genetica')) discKey = 'biologia';
    else if (topicNorm.includes('fisic') || topicNorm.includes('eletro') || topicNorm.includes('onda')) discKey = 'fisica';
    else if (topicNorm.includes('matemat')) discKey = 'matematica';

    const parentHub = nodes.find(n => n.id === `hub-${discKey}`) || nodes[0];
    const orbitAngle = (idx * (Math.PI * 2)) / Math.max(cards.length, 1) + 0.3;
    const orbitRadius = 190 + (idx % 3) * 45;
    const cx = parentHub.baseX + Math.cos(orbitAngle) * orbitRadius;
    const cy = parentHub.baseY + Math.sin(orbitAngle) * orbitRadius;

    const isActive = card.id === activeCardId;
    const cardColor = isActive ? '#00f5ff' : '#38bdf8';

    const cardNode: ConstellationNode = {
      id: `card-${card.id}`,
      label: card.title || card.topic || 'Card Mestre',
      sublabel: card.sec01_header?.triWeight ? `TRI: ${card.sec01_header.triWeight}` : undefined,
      type: 'card',
      x: cx,
      y: cy,
      baseX: cx,
      baseY: cy,
      z: 15,
      vx: 0,
      vy: 0,
      radius: isActive ? 28 : 22,
      color: cardColor,
      glowColor: isActive ? 'rgba(0, 245, 255, 0.7)' : 'rgba(56, 189, 248, 0.4)',
      icon: '⭐',
      orbitParentId: parentHub.id,
      orbitRadius,
      orbitSpeed: 0.0003 + (idx % 2) * 0.0002,
      orbitAngle,
      metadata: {
        cardId: card.id,
        discipline: discKey,
        thematicAxes: card.sec01_header?.thematicAxes || [],
        skillsCount: card.sec01_header?.skills?.length || 0,
        summary: card.sec02_theory?.blocks?.[0]?.content?.slice(0, 160) || card.title
      }
    };
    nodes.push(cardNode);

    // Feixe do Hub para o Card
    edges.push({
      id: `edge-hub-${card.id}`,
      source: parentHub.id,
      target: cardNode.id,
      color: 'rgba(56, 189, 248, 0.35)',
      width: 2,
      pulseSpeed: 1.5,
      strength: 0.8
    });

    // 3. EIXOS TEMÁTICOS DO CARD (Satélites de Tese)
    const axes = card.sec01_header?.thematicAxes || [];
    axes.slice(0, 4).forEach((axis, aIdx) => {
      const axisAngle = (aIdx * (Math.PI * 2)) / Math.max(axes.length, 1);
      const axisDist = 75;
      const ax = cardNode.baseX + Math.cos(axisAngle) * axisDist;
      const ay = cardNode.baseY + Math.sin(axisAngle) * axisDist;

      const axisNode: ConstellationNode = {
        id: `axis-${card.id}-${aIdx}`,
        label: axis.length > 30 ? axis.slice(0, 28) + '...' : axis,
        type: 'axis',
        x: ax,
        y: ay,
        baseX: ax,
        baseY: ay,
        z: 8,
        vx: 0,
        vy: 0,
        radius: 11,
        color: '#a78bfa',
        glowColor: 'rgba(167, 139, 250, 0.4)',
        icon: '✨',
        orbitParentId: cardNode.id,
        orbitRadius: axisDist,
        orbitSpeed: 0.0008 + aIdx * 0.0003,
        orbitAngle: axisAngle,
        metadata: {
          cardId: card.id,
          summary: `Eixo Estrutural 0${aIdx + 1}: ${axis}`
        }
      };
      nodes.push(axisNode);

      edges.push({
        id: `edge-card-axis-${card.id}-${aIdx}`,
        source: cardNode.id,
        target: axisNode.id,
        color: 'rgba(167, 139, 250, 0.3)',
        width: 1,
        pulseSpeed: 2.0,
        strength: 0.4
      });
    });
  });

  // 4. BANCAS EXAMINADORAS DE ELITE (Estações Orbitais no anel externo)
  const bancaKeys = Object.keys(BANCA_METADATA);
  const outerRingRadius = 880;

  bancaKeys.forEach((bKey, bIdx) => {
    const meta = BANCA_METADATA[bKey];
    const angle = (bIdx * (Math.PI * 2)) / bancaKeys.length - Math.PI / 4;
    const bx = Math.cos(angle) * outerRingRadius;
    const by = Math.sin(angle) * outerRingRadius;

    // Contagem real de provas deste vestibular no acervo
    const examsCount = acervo.filter(item => norm(item.banca).includes(norm(bKey))).length;

    const bancaNode: ConstellationNode = {
      id: `banca-${norm(bKey)}`,
      label: meta.name,
      sublabel: `${examsCount} Provas Oficiais`,
      type: 'banca',
      x: bx,
      y: by,
      baseX: bx,
      baseY: by,
      z: 5,
      vx: 0,
      vy: 0,
      radius: 26,
      color: meta.color,
      glowColor: `${meta.color}55`,
      icon: meta.icon,
      metadata: {
        banca: meta.name,
        examCount: examsCount,
        summary: `Conselho Examinador de Elite // ${meta.bias}. Acervo oficial com ${examsCount} cadernos e gabaritos indexados.`
      }
    };
    nodes.push(bancaNode);

    // Conecta bancas aos cards cadastrados
    cards.forEach(card => {
      edges.push({
        id: `edge-card-banca-${card.id}-${norm(bKey)}`,
        source: `card-${card.id}`,
        target: bancaNode.id,
        color: 'rgba(255, 255, 255, 0.08)',
        width: 1,
        pulseSpeed: 0.8,
        strength: 0.2
      });
    });
  });

  // 5. SATÉLITES DO ACERVO (Amostra Selecionada de Elite dos 598 PDFs)
  const featuredAcervo = acervo
    .filter(item => item.category === 'prova_oficial' || item.category === 'gabarito_comentado')
    .slice(0, 36);

  featuredAcervo.forEach((item, aIdx) => {
    const matchingBancaNode = nodes.find(
      n => n.type === 'banca' && norm(item.banca).includes(norm(n.metadata.banca || ''))
    );
    const matchingDiscNode = nodes.find(
      n => n.type === 'discipline' && n.metadata.discipline === item.discipline
    );
    const parent = matchingBancaNode || matchingDiscNode || nodes.find(n => n.id === 'hub-nexus-core') || nodes[0];
    const acAngle = (aIdx * (Math.PI * 2)) / 12;
    const acDist = 85 + (aIdx % 3) * 35;
    const ax = parent.baseX + Math.cos(acAngle) * acDist;
    const ay = parent.baseY + Math.sin(acAngle) * acDist;

    const isComentado = item.category === 'gabarito_comentado';
    const acColor = isComentado ? '#10b981' : '#38bdf8';

    const acNode: ConstellationNode = {
      id: `acervo-${item.id}`,
      label: item.title.length > 26 ? item.title.slice(0, 24) + '...' : item.title,
      sublabel: `${item.year || 'Oficial'} • ${item.sizeFormatted}`,
      type: 'acervo',
      x: ax,
      y: ay,
      baseX: ax,
      baseY: ay,
      z: -10,
      vx: 0,
      vy: 0,
      radius: 9,
      color: acColor,
      glowColor: `${acColor}44`,
      icon: isComentado ? '✅' : '📄',
      orbitParentId: parent.id,
      orbitRadius: acDist,
      orbitSpeed: 0.0005 + (aIdx % 4) * 0.0002,
      orbitAngle: acAngle,
      metadata: {
        banca: item.banca,
        acervoItem: item,
        summary: `Documento Oficial: ${item.title} (${item.sizeFormatted}). Categoria: ${item.category}.`
      }
    };
    nodes.push(acNode);

    edges.push({
      id: `edge-banca-acervo-${item.id}`,
      source: parent.id,
      target: acNode.id,
      color: 'rgba(255, 255, 255, 0.15)',
      width: 0.8,
      pulseSpeed: 1.2,
      strength: 0.2
    });
  });

  const stars = generateStarfield(350, 3200, 2400);

  return { nodes, edges, stars };
}

/** Atualiza a física e as órbitas dinâmicas a 60 FPS */
export function updateConstellationPhysics(graph: ConstellationGraph, dt: number) {
  const nodeMap = new Map(graph.nodes.map(n => [n.id, n]));

  for (const node of graph.nodes) {
    if (node.orbitParentId && node.orbitRadius && node.orbitSpeed && node.orbitAngle !== undefined) {
      const parent = nodeMap.get(node.orbitParentId);
      if (parent) {
        node.orbitAngle += node.orbitSpeed * dt * 60;
        node.x = parent.x + Math.cos(node.orbitAngle) * node.orbitRadius;
        node.y = parent.y + Math.sin(node.orbitAngle) * node.orbitRadius;
      }
    } else if (node.type === 'discipline' && node.baseX !== 0) {
      // Leve flutuação cósmica nos hubs
      node.x = node.baseX + Math.sin(Date.now() * 0.0006) * 8;
      node.y = node.baseY + Math.cos(Date.now() * 0.0006) * 8;
    }
  }
}

/** Detecta o nó sob a coordenada do mouse/toque (Screen to World) com calibração milimétrica */
export function findNodeAtPosition(
  nodes: ConstellationNode[],
  worldX: number,
  worldY: number,
  zoom: number
): ConstellationNode | null {
  // Ordena prioritariamente por profundidade Z, depois por nós ativos/maiores
  const sorted = [...nodes].sort((a, b) => b.z - a.z || b.radius - a.radius);

  for (const node of sorted) {
    // Raio calibrado milimetricamente para cliques de mouse e toques touch em mobile/tablet
    const hitRadius = Math.max(node.radius + 16, 32 / zoom);
    const dx = worldX - node.x;
    const dy = worldY - node.y;

    // 1. Acerto direto no corpo circular do nó (com padding de facilitação em 360°)
    if (dx * dx + dy * dy <= hitRadius * hitRadius) {
      return node;
    }

    // 2. Acerto na aura superior / topo do nó (para quem posiciona o mouse logo acima do ícone)
    const topPadding = Math.max(16, 24 / zoom);
    if (Math.abs(dx) <= hitRadius && worldY >= node.y - node.radius - topPadding && worldY <= node.y) {
      return node;
    }

    // 3. Acerto no rótulo de texto posicionado abaixo do nó
    // O texto fica logo abaixo do nó (+5px) e se estende verticalmente
    const labelHalfWidth = Math.max(node.radius + 45, 65 / zoom);
    const labelTop = node.y + node.radius - 8; // leve sobreposição para não ter ponto cego
    const labelBottom = node.y + node.radius + (38 / zoom);
    if (Math.abs(dx) <= labelHalfWidth && worldY >= labelTop && worldY <= labelBottom) {
      return node;
    }
  }
  return null;
}

/** Retorna conjunto de IDs conectados a um determinado nó */
export function getConnectedNodeIds(nodeId: string, edges: ConstellationEdge[]): Set<string> {
  const connected = new Set<string>([nodeId]);
  for (const edge of edges) {
    if (edge.source === nodeId) connected.add(edge.target);
    if (edge.target === nodeId) connected.add(edge.source);
  }
  return connected;
}
