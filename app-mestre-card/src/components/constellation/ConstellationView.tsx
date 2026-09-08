// src/components/constellation/ConstellationView.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import type { MestreCardData } from '../../types/mestre-card';
import { ACERVO_CATALOG } from '../../data/acervo-catalog';
import {
  buildConstellationGraph,
  updateConstellationPhysics,
  findNodeAtPosition,
  getConnectedNodeIds,
  type ConstellationGraph,
  type ConstellationNode,
  type NodeType
} from '../../lib/constellation-engine';
import {
  playConstellationHoverSound,
  playConstellationSelectSound,
  playConstellationWarpSound,
  playConstellationDrone,
  stopConstellationDrone,
  setConstellationDroneVolume
} from '../../lib/audio';

interface ConstellationViewProps {
  cards: MestreCardData[];
  activeCardId?: string | null;
  onSelectCard: (cardId: string) => void;
  onClose: () => void;
  onOpenAcervo?: (banca?: string, query?: string) => void;
}

export const ConstellationView: React.FC<ConstellationViewProps> = ({
  cards,
  activeCardId,
  onSelectCard,
  onClose,
  onOpenAcervo
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Camera State
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 0.85 });
  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  // Interaction State
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);
  const [filterType, setFilterType] = useState<'all' | NodeType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio State
  const [isDroneOn, setIsDroneOn] = useState(false);
  const [soundFx, setSoundFx] = useState(true);
  const [droneVolume, setDroneVolume] = useState(0.35);

  // Dragging & Touch Gestures State
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const initialPinchDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(camera.zoom);

  // Graph Data
  const graphRef = useRef<ConstellationGraph>(buildConstellationGraph(cards, ACERVO_CATALOG, activeCardId));

  // Rebuild graph if cards change
  useEffect(() => {
    graphRef.current = buildConstellationGraph(cards, ACERVO_CATALOG, activeCardId);
  }, [cards, activeCardId]);

  // Center on active card if available
  useEffect(() => {
    if (activeCardId) {
      const activeNode = graphRef.current.nodes.find(n => n.metadata.cardId === activeCardId);
      if (activeNode) {
        setCamera({ x: -activeNode.x, y: -activeNode.y, zoom: 1.1 });
        setSelectedNode(activeNode);
      }
    }
  }, [activeCardId]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedNode) {
          setSelectedNode(null);
        } else {
          stopConstellationDrone();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, onClose]);

  // Cleanup drone on unmount
  useEffect(() => {
    return () => {
      stopConstellationDrone();
    };
  }, []);

  // Drone Toggle
  const toggleDrone = useCallback(() => {
    if (isDroneOn) {
      stopConstellationDrone();
      setIsDroneOn(false);
    } else {
      playConstellationDrone(droneVolume);
      setIsDroneOn(true);
    }
  }, [isDroneOn, droneVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setDroneVolume(vol);
    setConstellationDroneVolume(vol);
    if (!isDroneOn) {
      playConstellationDrone(vol);
      setIsDroneOn(true);
    }
  };

  // Connected Node IDs for Highlight
  const highlightedNodeIds = useMemo(() => {
    const target = hoveredNode || selectedNode;
    if (!target) return null;
    return getConnectedNodeIds(target.id, graphRef.current.edges);
  }, [hoveredNode, selectedNode]);

  // Search Matches
  const searchMatchedIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const matched = new Set<string>();
    for (const node of graphRef.current.nodes) {
      const label = node.label.toLowerCase();
      const sub = (node.sublabel || '').toLowerCase();
      const summary = (node.metadata.summary || '').toLowerCase();
      const banca = (node.metadata.banca || '').toLowerCase();
      if (label.includes(q) || sub.includes(q) || summary.includes(q) || banca.includes(q)) {
        matched.add(node.id);
      }
    }
    return matched;
  }, [searchQuery]);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update physics & orbits
      updateConstellationPhysics(graphRef.current, dt);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Fundo do Espaço Profundo com Gradiente Radial Cósmico
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a101d');
      bgGrad.addColorStop(0.5, '#05080f');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Câmera: Transformação de Pan & Zoom
      const { x: camX, y: camY, zoom } = cameraRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoom, zoom);
      ctx.translate(camX, camY);

      // 3. Grade Tática Circular & Radar Polar Cósmico
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.04)';
      ctx.lineWidth = 1;
      [300, 520, 880, 1200].forEach(r => {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Linhas dos quadrantes
      ctx.beginPath();
      ctx.moveTo(-1300, 0);
      ctx.lineTo(1300, 0);
      ctx.moveTo(0, -1300);
      ctx.lineTo(0, 1300);
      ctx.stroke();
      ctx.restore();

      // 4. Poeira Estelar com Efeito de Paralaxe e Cintilação
      ctx.save();
      const stars = graphRef.current.stars;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxFactor = 1 + star.z * 0.0015;
        const sx = star.x * parallaxFactor;
        const sy = star.y * parallaxFactor;
        const alpha = Math.max(
          0.1,
          Math.min(
            1,
            star.baseAlpha + Math.sin(now * 0.001 * star.twinkleSpeed + star.phase) * 0.35
          )
        );

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const timeSec = now * 0.001;
      const nodeMap = new Map(graphRef.current.nodes.map(n => [n.id, n]));

      // 5. Arestas e Feixes de Laser com Pulso de Fótons
      ctx.save();
      for (const edge of graphRef.current.edges) {
        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!src || !tgt) continue;

        // Filtro de Visibilidade por Camada
        if (filterType !== 'all') {
          if (src.type !== filterType && tgt.type !== filterType) continue;
        }

        const isEdgeHighlighted =
          highlightedNodeIds &&
          (highlightedNodeIds.has(src.id) && highlightedNodeIds.has(tgt.id));

        const isDimmed = highlightedNodeIds && !isEdgeHighlighted;

        ctx.lineWidth = isEdgeHighlighted ? edge.width * 2 : edge.width;
        ctx.strokeStyle = isEdgeHighlighted
          ? 'rgba(0, 245, 255, 0.85)'
          : isDimmed
          ? 'rgba(255, 255, 255, 0.04)'
          : edge.color;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.stroke();

        // Fóton de Laser Viajante
        if (!isDimmed) {
          const photonT = (timeSec * edge.pulseSpeed + parseInt(edge.id.slice(-2) || '1', 16) * 0.1) % 1;
          const px = src.x + (tgt.x - src.x) * photonT;
          const py = src.y + (tgt.y - src.y) * photonT;

          ctx.fillStyle = isEdgeHighlighted ? '#00f5ff' : '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, isEdgeHighlighted ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 6. Nós Estelares
      for (const node of graphRef.current.nodes) {
        // Filtro de Camadas
        if (filterType !== 'all' && node.type !== filterType && node.type !== 'discipline') {
          continue;
        }

        const isHighlighted = highlightedNodeIds?.has(node.id);
        const isDimmed = highlightedNodeIds && !isHighlighted;
        const isSearchMatch = searchMatchedIds?.has(node.id);
        const isSelected = selectedNode?.id === node.id;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.18 : 1;

        // Pulso Supernova para Busca
        if (isSearchMatch) {
          const superPulse = (timeSec * 3) % 1;
          ctx.strokeStyle = '#00f5ff';
          ctx.lineWidth = 2 * (1 - superPulse);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + superPulse * 28, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Halo de Brilho Neon
        const glowRadius = isSelected
          ? node.radius * 2.8
          : isHighlighted
          ? node.radius * 2.2
          : node.radius * 1.5;

        const radialGlow = ctx.createRadialGradient(
          node.x,
          node.y,
          node.radius * 0.2,
          node.x,
          node.y,
          glowRadius
        );
        radialGlow.addColorStop(0, node.color);
        radialGlow.addColorStop(0.4, node.glowColor);
        radialGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Corpo Central do Nó
        ctx.fillStyle = isSelected ? '#ffffff' : node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Borda Tática do Nó
        ctx.strokeStyle = isSelected ? '#00f5ff' : '#ffffff';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        // Anel de Seleção Estelar Pulsante
        if (isSelected) {
          ctx.strokeStyle = '#00f5ff';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 7 + Math.sin(timeSec * 4) * 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Ícone ou Glifo no centro
        if (node.radius >= 16) {
          ctx.font = `${Math.round(node.radius * 0.9)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.icon, node.x, node.y + 1);
        }

        // Rótulo de Texto (hierarquia visual limpa para evitar sobreposição)
        const shouldShowLabel =
          node.type === 'discipline' ||
          node.type === 'card' ||
          node.type === 'banca' ||
          isHighlighted ||
          isSearchMatch ||
          isSelected ||
          (node.type === 'axis' && zoom > 0.8) ||
          (node.type === 'acervo' && zoom > 1.25);

        if (shouldShowLabel) {
          ctx.font = node.type === 'discipline'
            ? 'bold 13px "JetBrains Mono", monospace'
            : node.type === 'card'
            ? 'bold 11px "Plus Jakarta Sans", sans-serif'
            : '10px "JetBrains Mono", monospace';

          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          // Sombra de legibilidade
          ctx.fillStyle = '#000000';
          ctx.fillText(node.label, node.x + 1, node.y + node.radius + 6);
          ctx.fillText(node.label, node.x - 1, node.y + node.radius + 6);

          ctx.fillStyle = isSelected ? '#00f5ff' : '#ffffff';
          ctx.fillText(node.label, node.x, node.y + node.radius + 5);

          if (node.sublabel && zoom > 0.8) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(node.sublabel, node.x, node.y + node.radius + 19);
          }
        }

        ctx.restore();
      }

      ctx.restore(); // Restaura Câmera
      ctx.restore(); // Restaura DPR

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [highlightedNodeIds, searchMatchedIds, selectedNode, filterType]);

  // Resize Canvas milimetricamente sincronizado com o bounding rect do DOM
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const targetW = Math.round((rect.width || window.innerWidth) * dpr);
      const targetH = Math.round((rect.height || window.innerHeight) * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Coordenadas Mouse/Touch para o Espaço Mundial Cósmico (Calibração Milimétrica)
  const screenToWorld = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const { x: camX, y: camY, zoom } = cameraRef.current;

      // Compensação exata de offset e resolução visual CSS
      const screenX = (clientX - rect.left) * (width / (rect.width || 1));
      const screenY = (clientY - rect.top) * (height / (rect.height || 1));

      const worldX = (screenX - width / 2) / zoom - camX;
      const worldY = (screenY - height / 2) / zoom - camY;
      return { x: worldX, y: worldY };
    },
    []
  );

  // Wheel listener não-passivo anexado diretamente ao elemento canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      setCamera(prev => ({
        ...prev,
        zoom: Math.max(0.25, Math.min(3.2, prev.zoom * zoomFactor))
      }));
    };

    canvas.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheelNative);
  }, []);

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Apenas botão esquerdo
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    cameraStartRef.current = { x: camera.x, y: camera.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isDraggingRef.current) {
      const dx = (e.clientX - dragStartRef.current.x) / camera.zoom;
      const dy = (e.clientY - dragStartRef.current.y) / camera.zoom;
      setCamera({
        ...camera,
        x: cameraStartRef.current.x + dx,
        y: cameraStartRef.current.y + dy
      });
      return;
    }

    // Hover Detection Calibrado
    const { x: wx, y: wy } = screenToWorld(e.clientX, e.clientY);
    const node = findNodeAtPosition(graphRef.current.nodes, wx, wy, camera.zoom);

    if (node !== hoveredNode) {
      setHoveredNode(node);
      if (node && soundFx) {
        playConstellationHoverSound(true);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const wasDraggingDistance = Math.hypot(
      e.clientX - dragStartRef.current.x,
      e.clientY - dragStartRef.current.y
    );
    isDraggingRef.current = false;

    // Se foi clique direto no nó (tolerância de até 8px de micro-movimento)
    if (wasDraggingDistance < 8) {
      const { x: wx, y: wy } = screenToWorld(e.clientX, e.clientY);
      const clicked = findNodeAtPosition(graphRef.current.nodes, wx, wy, camera.zoom);
      setSelectedNode(clicked);
      if (clicked && soundFx) {
        playConstellationSelectSound(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    setMousePos(null);
    isDraggingRef.current = false;
  };

  // Touch Handlers para Tablet e Celular (Pan 1 Dedo, Pinch-to-Zoom 2 Dedos, Tap Seleção)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      isDraggingRef.current = true;
      touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() };
      dragStartRef.current = { x: t.clientX, y: t.clientY };
      cameraStartRef.current = { x: camera.x, y: camera.y };
    } else if (e.touches.length === 2) {
      // Início de Pinch Zoom
      isDraggingRef.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      initialPinchDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      initialZoomRef.current = camera.zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistRef.current) {
      // Execução de Pinch-to-Zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const pinchScale = currentDist / initialPinchDistRef.current;
      const newZoom = Math.max(0.25, Math.min(3.2, initialZoomRef.current * pinchScale));
      setCamera(prev => ({ ...prev, zoom: newZoom }));
      return;
    }

    if (isDraggingRef.current && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = (t.clientX - dragStartRef.current.x) / camera.zoom;
      const dy = (t.clientY - dragStartRef.current.y) / camera.zoom;
      setCamera({
        ...camera,
        x: cameraStartRef.current.x + dx,
        y: cameraStartRef.current.y + dy
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      if (touchStartRef.current && isDraggingRef.current) {
        const touchDuration = Date.now() - touchStartRef.current.time;
        const moveDist = Math.hypot(
          (e.changedTouches[0]?.clientX || dragStartRef.current.x) - touchStartRef.current.x,
          (e.changedTouches[0]?.clientY || dragStartRef.current.y) - touchStartRef.current.y
        );

        // Detecção de Toque Rápido no Nó (Tap Inteligente)
        if (moveDist < 14 && touchDuration < 380) {
          const tapX = e.changedTouches[0]?.clientX || touchStartRef.current.x;
          const tapY = e.changedTouches[0]?.clientY || touchStartRef.current.y;
          const { x: wx, y: wy } = screenToWorld(tapX, tapY);
          const tappedNode = findNodeAtPosition(graphRef.current.nodes, wx, wy, camera.zoom);
          setSelectedNode(tappedNode);
          if (tappedNode && soundFx) {
            playConstellationSelectSound(true);
          }
        }
      }
      isDraggingRef.current = false;
      touchStartRef.current = null;
      initialPinchDistRef.current = null;
    } else if (e.touches.length === 1) {
      // Se soltou um dedo no pinch, continua o arrasto com o dedo remanescente
      const t = e.touches[0];
      isDraggingRef.current = true;
      dragStartRef.current = { x: t.clientX, y: t.clientY };
      cameraStartRef.current = { x: camera.x, y: camera.y };
      initialPinchDistRef.current = null;
    }
  };

  // Zoom Controls
  const handleZoomIn = () => {
    setCamera(prev => ({ ...prev, zoom: Math.min(3.2, prev.zoom * 1.25) }));
  };

  const handleZoomOut = () => {
    setCamera(prev => ({ ...prev, zoom: Math.max(0.25, prev.zoom * 0.8) }));
  };

  const handleResetCamera = () => {
    setCamera({ x: 0, y: 0, zoom: 0.85 });
    setSelectedNode(null);
  };

  const handleCenterActive = () => {
    if (activeCardId) {
      const activeNode = graphRef.current.nodes.find(n => n.metadata.cardId === activeCardId);
      if (activeNode) {
        setCamera({ x: -activeNode.x, y: -activeNode.y, zoom: 1.1 });
        setSelectedNode(activeNode);
      }
    } else {
      handleResetCamera();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020306] overflow-hidden select-none font-sans text-white">
      {/* 1. CANVAS PRINCIPAL ULTRA-CALIBRADO COM SUPORTE TOUCH */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-full block touch-none select-none ${
          hoveredNode ? 'cursor-pointer' : isDraggingRef.current ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* 2. BADGE TÁTICO FLUTUANTE DE HOVER (Feedback Imediato ao passar o mouse) */}
      {hoveredNode && !selectedNode && mousePos && (
        <div
          className="pointer-events-none fixed z-40 px-3.5 py-2 rounded-xl glass-card border shadow-2xl backdrop-blur-xl flex items-center gap-2.5 transition-all duration-75 text-xs font-mono hidden sm:flex animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${Math.min(window.innerWidth - 300, Math.max(16, mousePos.x + 16))}px`,
            top: `${Math.min(window.innerHeight - 70, Math.max(16, mousePos.y + 16))}px`,
            borderColor: `${hoveredNode.color}99`,
            boxShadow: `0 0 25px ${hoveredNode.color}33`,
            backgroundColor: 'rgba(5, 8, 15, 0.94)'
          }}>
          <span className="text-base">{hoveredNode.icon}</span>
          <div className="flex flex-col min-w-0 max-w-[240px]">
            <span className="text-white font-bold truncate text-[11px]">
              {hoveredNode.label}
            </span>
            <span
              className="text-[9px] font-extrabold uppercase tracking-widest"
              style={{ color: hoveredNode.color }}>
              {hoveredNode.type === 'card'
                ? '⭐ CARD MESTRE • CLIQUE PARA INSPECIONAR'
                : hoveredNode.type === 'banca'
                ? '🏛️ BANCA DE ELITE • VER PROVAS'
                : hoveredNode.type === 'acervo'
                ? '📄 CADERNO OFICIAL • VER PDF'
                : '🪐 NÚCLEO DISCIPLINAR'}
            </span>
          </div>
        </div>
      )}

      {/* 3. HUD SUPERIOR TÁTICO (Responsivo para Celular e Tablet) */}
      <div className="absolute top-0 left-0 right-0 p-2.5 sm:p-4 pointer-events-none flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 max-w-7xl mx-auto w-full pointer-events-auto">
          {/* Título & Botão Voltar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                stopConstellationDrone();
                onClose();
              }}
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-md cursor-pointer"
              title="Voltar ao Centro de Comando (ESC)">
              <span>←</span>
              <span>VOLTAR <span className="hidden sm:inline">[ESC]</span></span>
            </button>

            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800/80 backdrop-blur-md hidden md:flex items-center gap-2.5">
              <span className="text-cyan-400 animate-pulse text-sm">🌌</span>
              <div>
                <h1 className="text-xs font-mono font-extrabold tracking-widest text-white uppercase">
                  CONSTELAÇÃO NEURAL 3D
                </h1>
                <p className="text-[10px] font-mono text-slate-400">
                  GRAFO DE CONEXÕES & ACERVO OFICIAL (598)
                </p>
              </div>
            </div>
          </div>

          {/* Busca Supernova em Tempo Real */}
          <div className="relative flex-1 sm:flex-initial min-w-[170px] sm:min-w-[260px] max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Localizar nós..."
              className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-3 pr-7 py-1.5 sm:py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 backdrop-blur-md shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs">
                ✕
              </button>
            )}
          </div>

          {/* Controles de Áudio do Nexus (Drone & Efeitos) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/80 border border-slate-800/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shrink-0">
            <button
              onClick={toggleDrone}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isDroneOn
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
              title="Ligar/Desligar o Drone de Foco Tático (Trilha Espacial)">
              <span>{isDroneOn ? '🔊' : '🔈'}</span>
              <span className="hidden xs:inline">DRONE</span>
            </button>

            {isDroneOn && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={droneVolume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 accent-cyan-400 cursor-pointer h-1 bg-slate-800 rounded"
                title={`Volume: ${Math.round(droneVolume * 100)}%`}
              />
            )}

            <button
              onClick={() => setSoundFx(!soundFx)}
              className={`px-1.5 sm:px-2 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                soundFx ? 'text-amber-300 hover:text-amber-200' : 'text-slate-600 hover:text-slate-400'
              }`}
              title="Efeitos Sonoros de Laser e Seleção">
              {soundFx ? '🔔' : '🔕'}
            </button>
          </div>
        </div>

        {/* Barra de Filtros de Camada (Scroll Horizontal Suave em Mobile/Tablet) */}
        <div className="flex items-center sm:justify-center gap-1.5 max-w-4xl mx-auto w-full pointer-events-auto overflow-x-auto no-scrollbar py-1 px-1 flex-nowrap sm:flex-wrap">
          {[
            { id: 'all', label: 'TODOS OS NÓS', icon: '🌌' },
            { id: 'card', label: 'MESTRECARDS', icon: '⭐' },
            { id: 'banca', label: 'BANCAS DE ELITE', icon: '🏛️' },
            { id: 'acervo', label: 'PROVAS DO ACERVO', icon: '📄' },
            { id: 'discipline', label: 'NÚCLEOS MATÉRIA', icon: '🪐' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shrink-0 ${
                filterType === f.id
                  ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.25)]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}>
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. CONTROLES FLUTUANTES DE NAVEGAÇÃO (Canto Inferior Esquerdo) */}
      <div className={`absolute bottom-4 sm:bottom-5 left-3 sm:left-5 z-20 flex flex-col gap-2 transition-all ${
        selectedNode ? 'hidden sm:flex' : 'flex'
      }`}>
        <div className="glass-card p-1 sm:p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md flex flex-col gap-1 shadow-2xl">
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-cyan-300 flex items-center justify-center text-lg font-bold transition-all cursor-pointer"
            title="Aproximar Visão (Zoom In)">
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-cyan-300 flex items-center justify-center text-lg font-bold transition-all cursor-pointer"
            title="Afastar Visão (Zoom Out)">
            -
          </button>
          <div className="w-full h-px bg-slate-800 my-0.5" />
          <button
            onClick={handleResetCamera}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-300 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
            title="Resetar Visão da Galáxia">
            ⌖
          </button>
          <button
            onClick={handleCenterActive}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-cyan-400 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
            title="Centralizar no Card Ativo">
            ⭐
          </button>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 px-2.5 py-1 rounded-xl backdrop-blur-md text-[10px] font-mono text-slate-400 text-center">
          ZOOM: {Math.round(camera.zoom * 100)}%
        </div>
      </div>

      {/* 5. MINI-DOSSIÊ LATERAL / BOTTOM SHEET (Drawer Retrátil Direito no Desktop, Bottom Sheet no Mobile) */}
      {selectedNode && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-x-auto sm:top-20 sm:right-5 sm:bottom-6 sm:w-96 max-h-[78vh] sm:max-h-none glass-card rounded-2xl border border-cyan-500/40 p-4 sm:p-5 shadow-[0_0_35px_rgba(0,245,255,0.25)] backdrop-blur-xl z-30 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-right-4 duration-200">
          {/* Indicador de puxador para Mobile */}
          <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-2 sm:hidden shrink-0" />

          <div className="flex flex-col gap-3 sm:gap-4 overflow-y-auto pr-1">
            {/* Cabeçalho do Nó Selecionado */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
                  style={{
                    backgroundColor: `${selectedNode.color}15`,
                    borderColor: `${selectedNode.color}66`,
                    boxShadow: `0 0 15px ${selectedNode.color}33`
                  }}>
                  {selectedNode.icon}
                </div>
                <div className="min-w-0">
                  <span
                    className="text-[9px] sm:text-[10px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded border inline-block"
                    style={{
                      color: selectedNode.color,
                      backgroundColor: `${selectedNode.color}15`,
                      borderColor: `${selectedNode.color}44`
                    }}>
                    {selectedNode.type}
                  </span>
                  <h2 className="text-xs sm:text-sm font-extrabold text-white mt-1 leading-snug break-words">
                    {selectedNode.label}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors text-sm shrink-0"
                title="Fechar Inspeção">
                ✕
              </button>
            </div>

            {/* Subtítulo / Tag */}
            {selectedNode.sublabel && (
              <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-lg">
                {selectedNode.sublabel}
              </div>
            )}

            {/* Sumário do Nó */}
            {selectedNode.metadata.summary && (
              <div className="bg-slate-950/70 border border-slate-800 p-3 sm:p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed font-sans max-h-36 sm:max-h-48 overflow-y-auto">
                {selectedNode.metadata.summary}
              </div>
            )}

            {/* Metadados Específicos por Tipo */}
            {selectedNode.type === 'card' && selectedNode.metadata.thematicAxes && (
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Eixos Temáticos Fundamentais:
                </p>
                <div className="flex flex-col gap-1.5">
                  {selectedNode.metadata.thematicAxes.map((axis, i) => (
                    <div
                      key={i}
                      className="text-xs bg-slate-900/90 border border-slate-800 px-3 py-1.5 sm:py-2 rounded-lg text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-mono font-bold text-[10px]">
                        0{i + 1}.
                      </span>
                      <span className="text-[11px] sm:text-xs">{axis}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.type === 'banca' && (
              <div className="flex flex-col gap-2.5">
                <div className="bg-slate-900/80 border border-slate-800 p-2.5 sm:p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">PROVAS NO ACERVO:</span>
                  <span className="text-sm font-mono font-extrabold text-cyan-400">
                    {selectedNode.metadata.examCount} Cadernos
                  </span>
                </div>
                {onOpenAcervo && (
                  <button
                    onClick={() => {
                      onOpenAcervo(selectedNode.metadata.banca);
                      setSelectedNode(null);
                    }}
                    className="w-full bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/50 text-purple-300 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <span>🏛️</span>
                    <span>ABRIR PROVAS DESTA BANCA NO ACERVO</span>
                  </button>
                )}
              </div>
            )}

            {selectedNode.type === 'acervo' && selectedNode.metadata.acervoItem && (
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900/80 border border-slate-800 p-2 sm:p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">TAMANHO:</span>
                    <span className="text-slate-200 font-bold">
                      {selectedNode.metadata.acervoItem.sizeFormatted}
                    </span>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-2 sm:p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">DISCIPLINA:</span>
                    <span className="text-slate-200 font-bold uppercase truncate block">
                      {selectedNode.metadata.acervoItem.discipline}
                    </span>
                  </div>
                </div>

                <a
                  href={selectedNode.metadata.acervoItem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.25)] text-center">
                  <span>📄</span>
                  <span>VER PDF NO GITHUB CDN</span>
                </a>
              </div>
            )}
          </div>

          {/* Botão de Ação Primária para Cards */}
          {selectedNode.type === 'card' && selectedNode.metadata.cardId && (
            <div className="pt-3 border-t border-slate-800 mt-2 shrink-0">
              <button
                onClick={() => {
                  if (soundFx) playConstellationWarpSound(true);
                  stopConstellationDrone();
                  onSelectCard(selectedNode.metadata.cardId!);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-black text-xs py-2.5 sm:py-3 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider">
                <span>🚀</span>
                <span>ENTRAR NO DOSSIÊ DESTE CARD</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
