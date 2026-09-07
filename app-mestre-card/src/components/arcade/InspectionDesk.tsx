import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { MestreCardData, InspectionCase, InspectionVerdict, InterrogationDialog } from '../../types/mestre-card';
import { generateInspectionCases } from '../../lib/inspection-engine';
import { MathRenderer } from '../MathRenderer';
import { DailyShiftModal } from './DailyShiftModal';
import { useGame } from '../../context/GameContext';
import { addXP } from '../../lib/xp-engine';
import { 
  playStampApprovedSound, 
  playStampDeniedSound, 
  playPaperSlideSound, 
  playTeletypeWarningSound, 
  playShutterSound,
  playClickSound,
  toggleAmbientRadio,
  playEvidenceLockSound
} from '../../lib/audio';

interface InspectionDeskProps {
  card: MestreCardData;
  soundEnabled?: boolean;
  onClose?: () => void;
  onApplyDamage?: (amount: number) => void;
}

export const InspectionDesk: React.FC<InspectionDeskProps> = ({
  card,
  soundEnabled = true,
  onClose,
  onApplyDamage
}) => {
  const { addCombo, resetCombo, fireParticles, triggerFlash, fireXpToast, refreshProfile } = useGame();

  // Casos de inspeção gerados a partir do card
  const cases: InspectionCase[] = useMemo(() => {
    return generateInspectionCases(card);
  }, [card]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stampStatus, setStampStatus] = useState<'none' | 'stamping_approved' | 'stamping_denied' | 'stamped_approved' | 'stamped_denied'>('none');
  const [stampAngle, setStampAngle] = useState(0);
  const [citation, setCitation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    reason?: string;
  }>({ isOpen: false, title: '', message: '' });

  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [rulebookTab, setRulebookTab] = useState<'theory' | 'traps' | 'mnemonics'>('theory');

  // Estado de clique físico mecânico sincronizado ao teclado
  const [isAPressed, setIsAPressed] = useState(false);
  const [isDPressed, setIsDPressed] = useState(false);

  // Modo de Investigação & Confronto Dialético (Fase 2A)
  const [isInvestigationMode, setIsInvestigationMode] = useState(false);
  const [activeInterrogation, setActiveInterrogation] = useState<InterrogationDialog | null>(null);
  const [isDailyShiftModalOpen, setIsDailyShiftModalOpen] = useState(false);

  // Rádio do Posto & Pareamento de Evidências (Fase 2B)
  const [isRadioOn, setIsRadioOn] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(false);
  const [selectedSuspiciousTerm, setSelectedSuspiciousTerm] = useState<string | null>(null);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [isEvidenceMatched, setIsEvidenceMatched] = useState(false);
  const [mismatchWarning, setMismatchWarning] = useState<string | null>(null);
  const [appliedDenialReason, setAppliedDenialReason] = useState<string | null>(null);

  // Desliga o rádio analógico automaticamente ao fechar o componente
  useEffect(() => {
    return () => {
      toggleAmbientRadio(false);
    };
  }, []);

  // Helper para limpar e estruturar mnemônicos sem asteriscos crus (**) ou barras (//)
  const renderRulebookMnemonic = (rule: string) => {
    if (!rule) return null;
    const items = rule.split(/\s*\/\/\s*|\n+/).map(s => s.trim()).filter(Boolean);
    if (items.length > 1) {
      return (
        <div className="space-y-1.5 mt-2">
          {items.map((item, idx) => {
            let badge = '';
            const match = item.match(/^\*{0,2}([A-Z0-9À-Ú])\*{0,2}/i);
            if (match && match[1]) {
              badge = match[1].toUpperCase();
            }
            const cleanText = item.replace(/\*\*/g, '').trim();

            return (
              <div key={idx} className="p-2 rounded bg-cyan-950/40 border border-cyan-800/40 flex items-start gap-2 text-xs font-sans">
                {badge ? (
                  <span className="w-5 h-5 rounded bg-cyan-400 text-black font-mono font-black flex items-center justify-center shrink-0 text-xs shadow-sm">
                    {badge}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                )}
                <span className="text-stone-200 font-medium leading-relaxed flex-1">{cleanText}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return <MathRenderer content={rule.replace(/\*\*/g, '')} />;
  };

  // Helper para limpar e estruturar pontos cegos sem barras (//) ou asteriscos (**)
  const renderRulebookBlindSpot = (analysis: string) => {
    if (!analysis) return null;
    const clean = analysis.replace(/\*\*/g, '');
    if (clean.includes('//')) {
      const parts = clean.split(/\s*\/\/\s*/);
      return (
        <div className="space-y-1.5 mt-1.5 text-xs font-sans">
          <div className="bg-red-950/60 border-l-2 border-red-500 p-2.5 rounded-r text-red-200">
            <span className="font-bold block text-[10px] uppercase text-red-400 font-mono mb-0.5">❌ A ARMADILHA / MITO:</span>
            {parts[0]}
          </div>
          {parts[1] && (
            <div className="bg-emerald-950/50 border-l-2 border-emerald-400 p-2.5 rounded-r text-emerald-200">
              <span className="font-bold block text-[10px] uppercase text-emerald-400 font-mono mb-0.5">✅ A REALIDADE COBRADA:</span>
              {parts.slice(1).join(' ')}
            </div>
          )}
        </div>
      );
    }
    return <p className="text-stone-300 text-xs font-sans">{clean}</p>;
  };

  // Estatísticas do turno de inspeção
  const [shiftStats, setShiftStats] = useState({
    totalProcessed: 0,
    correctVerdicts: 0,
    correctApprovals: 0,
    correctDenials: 0,
    fraudsIntercepted: 0,
    citationsReceived: 0,
    xpEarned: 0,
    isShiftComplete: false
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentCase = cases[currentIndex] || cases[0];

  // Inicia o turno tocando som de papel e abertura do guichê
  useEffect(() => {
    playShutterSound(soundEnabled);
    const timer = setTimeout(() => {
      playPaperSlideSound(soundEnabled);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentIndex, soundEnabled]);

  // Aponta discrepância no documento (só opera se Modo Investigar estiver ativado)
  const handleInspectDiscrepancy = useCallback(() => {
    if (!isInvestigationMode) {
      setMismatchWarning('ℹ️ ATIVE O [🔍 MODO INVESTIGAR] NO CABEÇALHO PARA APONTAR DISCREPÂNCIAS');
      playTeletypeWarningSound(soundEnabled);
      setTimeout(() => setMismatchWarning(null), 3000);
      return;
    }

    setSelectedClaim(prev => !prev);
    playClickSound(soundEnabled);
    setIsRulebookOpen(true); // Abre o manual de imediato para permitir o confronto
  }, [isInvestigationMode, soundEnabled]);

  // Isola um termo ou palavra suspeita específica (Fase 2B Refinada)
  const handleSelectSuspiciousTerm = useCallback((term: string) => {
    if (!isInvestigationMode) {
      setMismatchWarning('ℹ️ ATIVE O [🔍 MODO INVESTIGAR] NO CABEÇALHO PARA APONTAR DISCREPÂNCIAS');
      playTeletypeWarningSound(soundEnabled);
      setTimeout(() => setMismatchWarning(null), 3000);
      return;
    }

    setSelectedClaim(true);
    setSelectedSuspiciousTerm(prev => prev === term ? null : term);
    setIsRulebookOpen(true);
    playClickSound(soundEnabled);
    setMismatchWarning(null);
  }, [isInvestigationMode, soundEnabled]);

  // Seleciona uma regra do manual para confrontar a alegação selecionada (Fase 2B)
  const handleSelectRule = useCallback((ruleId: string, ruleTitle: string, ruleContent?: string) => {
    if (!selectedClaim) {
      setMismatchWarning('⚠️ SELECIONE PRIMEIRO A TESE OU TERMO SUSPEITO NO DOSSIÊ PARA CONFRONTAR');
      playTeletypeWarningSound(soundEnabled);
      setTimeout(() => setMismatchWarning(null), 3000);
      return;
    }

    playClickSound(soundEnabled);

    // Confere correspondência por ID estrito ou por palavras-chave conceituais
    const termLower = (selectedSuspiciousTerm || currentCase.contradictionTrigger || '').toLowerCase();
    const titleLower = (ruleTitle || '').toLowerCase();
    const contentLower = (ruleContent || '').toLowerCase();

    const hasKeywordMatch = termLower.length >= 3 && (
      titleLower.includes(termLower) ||
      contentLower.includes(termLower) ||
      (termLower.includes('endot') && (contentLower.includes('endot') || titleLower.includes('entalp') || contentLower.includes('exot'))) ||
      (termLower.includes('exot') && (contentLower.includes('exot') || titleLower.includes('entalp') || contentLower.includes('endot'))) ||
      (termLower.includes('hess') && (contentLower.includes('hess') || titleLower.includes('hess')))
    );

    const isTargetMatch = currentCase.isFraudulent && (
      ruleId === currentCase.targetRuleId ||
      hasKeywordMatch ||
      (!currentCase.targetRuleId && (ruleId === 'rule-trap-0' || ruleId === 'rule-theory-0'))
    );

    if (isTargetMatch) {
      playEvidenceLockSound(soundEnabled);
      setIsEvidenceMatched(true);
      setSelectedRuleId(ruleId);
      setMismatchWarning(null);

      // Bônus de 100 XP por evidência fundamentada
      addXP(100);
      fireXpToast(100, "AUDITORIA FUNDAMENTADA");
      refreshProfile();
      fireParticles(window.innerWidth / 2, window.innerHeight / 2);

      // Dispara em tempo real a resposta fundamentada do confronto sobre o termo
      const postulantExcuse = currentCase.interrogation?.postulantExcuse ||
        `"Inspetor de turno, aleguei '${selectedSuspiciousTerm || currentCase.contradictionTrigger || 'essa premissa'}' com base na interpretação comum dos fatos! Por que isso seria irregular?"`;
      
      const inspectorVerdict = currentCase.interrogation?.inspectorVerdict ||
        (currentCase.isFraudulent 
          ? `Negativo. O termo '${selectedSuspiciousTerm || currentCase.contradictionTrigger || 'alegado'}' contraria formalmente as diretrizes do Ministério (${ruleTitle}): ${currentCase.fraudReason || 'Inconsistência formal detectada perante o regulamento.'}`
          : `Conforme. O termo '${selectedSuspiciousTerm || 'alegado'}' está alinhado às diretrizes oficiais homologadas.`);

      setActiveInterrogation({
        postulantExcuse,
        inspectorVerdict
      });
    } else {
      playTeletypeWarningSound(soundEnabled);
      setMismatchWarning(`⚠️ DIRETRIZ INCOMPATÍVEL COM ESTA ALEGAÇÃO (${ruleTitle})`);
      setTimeout(() => setMismatchWarning(null), 3500);
    }
  }, [selectedClaim, currentCase, selectedSuspiciousTerm, soundEnabled, fireXpToast, refreshProfile, fireParticles]);

  // Executa o veredito (Aprovar ou Denegar)
  const handleVerdict = useCallback((verdict: InspectionVerdict) => {
    if (stampStatus !== 'none' || isTransitioning || shiftStats.isShiftComplete) return;

    // Ângulo aleatório de carimbo (-4deg a +4deg) para realismo mecânico
    const angle = (Math.random() * 8) - 4;
    setStampAngle(angle);

    const isFraud = currentCase.isFraudulent;
    const isCorrect = (verdict === 'APPROVED' && !isFraud) || (verdict === 'DENIED' && isFraud);

    // Feedback sonoro e de carimbo imediato
    if (verdict === 'APPROVED') {
      setStampStatus('stamped_approved');
      playStampApprovedSound(soundEnabled);
    } else {
      setStampStatus('stamped_denied');
      playStampDeniedSound(soundEnabled);
      setAppliedDenialReason(currentCase.denialReason || 'VIOLAÇÃO CONCEITUAL FORMAL');
    }

    if (isCorrect) {
      // ACERTO: Bônus de XP, combo e partículas
      const xpGained = isFraud ? 150 : 120;
      const xpRes = addXP(xpGained);
      fireXpToast(xpGained, xpRes.leveledUp ? xpRes.newLevelName : undefined);
      refreshProfile();

      addCombo();
      fireParticles(window.innerWidth / 2, window.innerHeight / 2);
      triggerFlash('hit');

      setShiftStats(prev => ({
        ...prev,
        totalProcessed: prev.totalProcessed + 1,
        correctVerdicts: prev.correctVerdicts + 1,
        correctApprovals: !isFraud ? prev.correctApprovals + 1 : prev.correctApprovals,
        correctDenials: isFraud ? prev.correctDenials + 1 : prev.correctDenials,
        fraudsIntercepted: isFraud ? prev.fraudsIntercepted + 1 : prev.fraudsIntercepted,
        xpEarned: prev.xpEarned + xpGained
      }));

      // Aguarda o carimbo e desliza para o próximo após 1.5s
      setTimeout(() => {
        advanceToNextCase();
      }, 1600);

    } else {
      // ERRO: Multa de infração M.O.A., som de teletipo e dano
      resetCombo();
      triggerFlash('miss');
      playTeletypeWarningSound(soundEnabled);
      if (onApplyDamage) onApplyDamage(20);

      const citationMsg = isFraud
        ? 'Você HOMOLOGOU um documento com erro conceitual flagrante!'
        : 'Você DENEGOU uma tese científica legítima e canônica!';

      const reason = currentCase.fraudReason || currentCase.relevantRuleSnippet || 'Contradição com as diretrizes oficiais do Ministério.';

      setCitation({
        isOpen: true,
        title: 'NOTIFICAÇÃO DE INFRAÇÃO DISCIPLINAR #MKA',
        message: citationMsg,
        reason: reason
      });

      setShiftStats(prev => ({
        ...prev,
        totalProcessed: prev.totalProcessed + 1,
        citationsReceived: prev.citationsReceived + 1
      }));
    }
  }, [currentCase, stampStatus, isTransitioning, shiftStats.isShiftComplete, soundEnabled, addCombo, resetCombo, fireParticles, triggerFlash, fireXpToast, refreshProfile, onApplyDamage]);

  // Avança para o próximo caso
  const advanceToNextCase = () => {
    setCitation({ isOpen: false, title: '', message: '' });
    setStampStatus('none');
    setActiveInterrogation(null);
    setSelectedClaim(false);
    setSelectedSuspiciousTerm(null);
    setSelectedRuleId(null);
    setIsEvidenceMatched(false);
    setMismatchWarning(null);
    setAppliedDenialReason(null);

    if (currentIndex + 1 >= cases.length) {
      // Turno concluído
      setShiftStats(prev => ({ ...prev, isShiftComplete: true }));
      setIsDailyShiftModalOpen(true);
      playShutterSound(soundEnabled);
    } else {
      setIsTransitioning(true);
      playPaperSlideSound(soundEnabled);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
        playShutterSound(soundEnabled);
      }, 350);
    }
  };

  // Atalhos de teclado (A = Aprovar, D = Denegar, M = Manual) com física mecânica
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'a' || e.key === 'A' || e.key === '1') {
        e.preventDefault();
        setIsAPressed(true);
        handleVerdict('APPROVED');
      } else if (e.key === 'd' || e.key === 'D' || e.key === '2') {
        e.preventDefault();
        setIsDPressed(true);
        handleVerdict('DENIED');
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsRulebookOpen(prev => !prev);
        playClickSound(soundEnabled);
      } else if (e.key === ' ' && citation.isOpen) {
        e.preventDefault();
        advanceToNextCase();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A' || e.key === '1') {
        setIsAPressed(false);
      } else if (e.key === 'd' || e.key === 'D' || e.key === '2') {
        setIsDPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleVerdict, citation.isOpen, soundEnabled]);

  // Reinicia o turno com casos reembaralhados
  const handleRestartShift = () => {
    setCurrentIndex(0);
    setStampStatus('none');
    setActiveInterrogation(null);
    setIsDailyShiftModalOpen(false);
    setSelectedClaim(false);
    setSelectedRuleId(null);
    setIsEvidenceMatched(false);
    setMismatchWarning(null);
    setAppliedDenialReason(null);
    setCitation({ isOpen: false, title: '', message: '' });
    setShiftStats({
      totalProcessed: 0,
      correctVerdicts: 0,
      correctApprovals: 0,
      correctDenials: 0,
      fraudsIntercepted: 0,
      citationsReceived: 0,
      xpEarned: 0,
      isShiftComplete: false
    });
    playShutterSound(soundEnabled);
  };

  return (
    <div className="desk-surface relative w-full rounded-2xl overflow-hidden border-2 border-[#3d2b1f]/80 text-[#d6c7b2] shadow-2xl font-serif select-none">
      
      {/* Luz ambiente de mesa vintage / luminária de gabinete */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.12)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      {/* Top Header: Brasão do Ministério & Indicadores de Turno */}
      <div className="relative z-10 bg-[#1c1713] border-b border-[#3d2b1f] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-500/40 overflow-hidden bg-black/50 p-0.5 flex-shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <img 
              src="./inspection/ministry-seal.jpg" 
              alt="MKA Seal" 
              className="w-full h-full object-cover rounded-full filter contrast-125"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                MINISTÉRIO DA VALIDAÇÃO ACADÊMICA (MKA)
              </span>
              <span className="px-1.5 py-0.2 bg-amber-950/80 border border-amber-600/40 text-amber-300 font-mono text-[9px] rounded uppercase font-bold">
                POSTO DE FRONTEIRA
              </span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              AUDITORIA COGNITIVA // {card.topic}
            </h2>
          </div>
        </div>

        {/* Contadores e Ações Rápidas */}
        <div className="flex items-center gap-3">
          <div className="bg-[#120e0b] border border-[#3d2b1f] px-3 py-1 rounded font-mono text-xs flex items-center gap-3">
            <span className="text-stone-400">EXPEDIENTE:</span>
            <span className="text-amber-400 font-bold">
              {currentIndex + 1} / {cases.length}
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-emerald-400 font-bold">
              🛡️ {shiftStats.correctVerdicts} OK
            </span>
            {shiftStats.citationsReceived > 0 && (
              <span className="text-red-400 font-bold animate-pulse">
                ⚠️ {shiftStats.citationsReceived} MULTAS
              </span>
            )}
          </div>

          {/* BOTÃO RÁDIO DO POSTO (Fase 2B) */}
          <button
            onClick={() => {
              const next = !isRadioOn;
              setIsRadioOn(next);
              toggleAmbientRadio(next);
              playClickSound(soundEnabled);
            }}
            className={`px-2.5 py-1.5 rounded font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isRadioOn 
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-[#241c16] border-[#4a3525] text-stone-400 hover:text-stone-200'
            }`}
            title="Alternar Rádio Ambiente Analógico do Posto (Web Audio + Streaming)"
          >
            <span className={`w-2 h-2 rounded-full ${isRadioOn ? 'bg-emerald-400 animate-pulse' : 'bg-stone-600'}`} />
            <span>📻 RÁDIO: {isRadioOn ? 'ON' : 'OFF'}</span>
          </button>

          {/* BOTÃO MODO INVESTIGAR (Fase 2A - Apontamento de Discrepância) */}
          <button
            onClick={() => {
              setIsInvestigationMode(prev => !prev);
              playClickSound(soundEnabled);
            }}
            className={`px-3 py-1.5 rounded font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isInvestigationMode 
                ? 'bg-amber-900/80 border-amber-500 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)] ring-2 ring-amber-500/50'
                : 'bg-[#241c16] border-[#4a3525] text-stone-300 hover:border-amber-600 hover:text-white'
            }`}
            title="Ativar Modo de Investigação de Discrepâncias e Interrogatório"
          >
            <span>🔍</span>
            <span>MODO INVESTIGAR</span>
            {isInvestigationMode && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-black text-[9px] rounded font-black uppercase">
                ATIVO
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setIsRulebookOpen(prev => !prev);
              playClickSound(soundEnabled);
            }}
            className={`px-3 py-1.5 rounded font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isRulebookOpen 
                ? 'bg-amber-900/60 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-[#241c16] border-[#4a3525] text-stone-300 hover:border-amber-600 hover:text-white'
            }`}
            title="Pressione [M] para abrir o Manual Oficial"
          >
            <span>📖</span>
            <span>MANUAL OFICIAL</span>
            <span className="text-[10px] opacity-60 font-sans">[M]</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#241c16] border border-[#4a3525] text-stone-400 hover:text-white hover:border-stone-500 text-xs transition-colors cursor-pointer"
              title="Voltar ao Arcade"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* TELA DE EXPEDIENTE CONCLUÍDO (Shift Report) */}
      {shiftStats.isShiftComplete ? (
        <div className="p-8 max-w-2xl mx-auto my-8 bg-[#1f1813] border-2 border-amber-600/50 rounded-xl shadow-2xl text-center space-y-6 animate-fade-in relative">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-amber-500/60 overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <img src="./inspection/ministry-seal.jpg" alt="MKA" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold">
              RELATÓRIO DE FECHAMENTO DE EXPEDIENTE
            </span>
            <h3 className="text-2xl font-bold text-white font-mono">
              AUDITORIA DO POSTO CONCLUÍDA
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              PROTOCOLO: MKA-EXP-{Date.now().toString().slice(-6)} // DEPARTAMENTO DE {card.topic}
            </p>
          </div>

          {/* Métricas do Turno */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-3 rounded bg-black/40 border border-[#3d2b1f]">
              <p className="text-[10px] text-stone-400">PROCESSADOS</p>
              <p className="text-xl font-bold text-white">{shiftStats.totalProcessed}</p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#3d2b1f]">
              <p className="text-[10px] text-stone-400">PRECISÃO</p>
              <p className="text-xl font-bold text-emerald-400">
                {shiftStats.totalProcessed > 0 
                  ? Math.round((shiftStats.correctVerdicts / shiftStats.totalProcessed) * 100) 
                  : 0}%
              </p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#3d2b1f]">
              <p className="text-[10px] text-stone-400">FRAUDES BARRADAS</p>
              <p className="text-xl font-bold text-amber-400">{shiftStats.fraudsIntercepted}</p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#3d2b1f]">
              <p className="text-[10px] text-stone-400">XP TOTAL</p>
              <p className="text-xl font-bold text-cyan-400">+{shiftStats.xpEarned}</p>
            </div>
          </div>

          {/* Veredito da Corregedoria */}
          <div className="p-4 rounded bg-[#16110d] border border-[#4a3525] text-left font-mono text-xs text-stone-300 space-y-1">
            <span className="text-amber-400 font-bold">PARECER DO COMISSÁRIO-CHEFE:</span>
            <p>
              {shiftStats.citationsReceived === 0 
                ? '★ RENDIMENTO EXEMPLAR: Nenhuma contradição escapou ao seu escrutínio. O Ministério homologa seu padrão de rigor com louvor militar.'
                : shiftStats.citationsReceived <= 2
                ? 'DESPACHO HOMOLOGADO: Desempenho aceitável com falhas pontuais. Recomenda-se reexaminar o Manual Oficial antes do próximo plantão.'
                : '⚠️ ADVERTÊNCIA FORMAL: Múltiplas falácias e distratores foram homologados indevidamente. O posto exige reciclagem teórica urgente.'}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleRestartShift}
              className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
            >
              🔄 INICIAR NOVO TURNO DE AUDITORIA
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-[#2a2018] hover:bg-[#382b20] text-stone-300 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                RETORNAR AO QG
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ÁREA PRINCIPAL DA MESA DO INSPETOR */
        <div className="relative p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">

          {/* NOTIFICAÇÃO DE INFRAÇÃO M.O.A. (Drop-down de teletipo quando erra) */}
          {citation.isOpen && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl animate-bounce-short">
              <div className="bg-[#1f0e0e] border-2 border-red-600 p-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.5)] font-mono space-y-2 text-xs text-red-200">
                <div className="flex items-center justify-between border-b border-red-800 pb-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <span className="text-base">⚠️</span>
                    <span>{citation.title}</span>
                  </div>
                  <span className="text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-700 text-red-300">
                    PENALIDADE: -20 HP
                  </span>
                </div>
                <p className="font-bold text-white text-sm">
                  {citation.message}
                </p>
                {citation.reason && (
                  <div className="p-2.5 rounded bg-black/60 border border-red-900/80 text-stone-300 space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">MOTIVO OFICIAL DA ANOMALIA:</span>
                    <p className="text-xs">{citation.reason}</p>
                  </div>
                )}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={advanceToNextCase}
                    className="px-4 py-1.5 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-xs tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow"
                  >
                    <span>CIENTE // PRÓXIMO CASO</span>
                    <span className="text-[10px] opacity-75">[Espaço]</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LADO ESQUERDO: O DOSSIÊ SUBMETIDO (A Folha do Postulante) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`relative p-6 rounded-lg transition-transform duration-300 ${
              isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
            } bg-[#ece2cd] text-[#2c221a] shadow-xl border-2 border-[#b5a38a] relative overflow-hidden`}
            style={{
              backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)'
            }}>
              
              {/* Grampo metálico no canto superior esquerdo */}
              <div className="absolute top-2 left-4 w-6 h-1.5 bg-[#8a8a8a] border border-[#555] rounded-sm shadow-sm rotate-[-12deg] z-20"></div>

              {/* Cabeçalho do Formulário Oficial */}
              <div className="flex items-start justify-between border-b-2 border-[#5c4a3b]/40 pb-4 mb-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#6e5845] font-bold">
                    <span>MKA PROTOCOLO:</span>
                    <span className="bg-[#dfd3bc] px-1.5 py-0.5 rounded border border-[#b5a38a] text-black">
                      {currentCase.fileNumber}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight uppercase font-mono text-[#1a140e]">
                    PARECER TÉCNICO DE HOMOLOGAÇÃO
                  </h3>
                  <p className="text-[11px] font-mono text-[#5c4a3b]">
                    POSTULANTE: <strong className="text-black">{currentCase.applicantName}</strong> ({currentCase.applicantTitle})
                  </p>
                  <p className="text-[10px] font-mono text-[#7a6450]">
                    LOTAÇÃO: {currentCase.department}
                  </p>
                </div>

                {/* Foto 3x4 do Postulante com Grampo e Carimbo de Registro */}
                <div className="relative flex-shrink-0 w-24 h-28 border-2 border-[#5c4a3b] bg-black p-0.5 shadow-md rotate-[1deg]">
                  <div className="absolute -top-1.5 left-2 w-5 h-1 bg-[#888] rounded-sm z-20 rotate-[5deg] shadow"></div>
                  <img 
                    src={currentCase.applicantPhoto} 
                    alt={currentCase.applicantName}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center font-mono text-stone-300 py-0.5">
                    {currentCase.fileNumber.split('-')[2] || 'REG-SSP'}
                  </div>
                </div>
              </div>

              {/* TESE SUBMETIDA PARA AUDITORIA (Alto Contraste Estilo Dossiê Oficial Datilografado) */}
              {/* TESE SUBMETIDA PARA AUDITORIA (Alto Contraste Estilo Dossiê Oficial Datilografado) */}
              <div className="space-y-3 my-4">
                <div className="flex items-center justify-between border-b border-[#5c4a3b]/20 pb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5c4a3b] font-bold flex items-center gap-1.5">
                    <span>▶</span>
                    <span>TESE SUBMETIDA PELO POSTULANTE:</span>
                  </span>
                  {selectedClaim ? (
                    <span className="text-[10px] font-mono text-amber-900 bg-amber-300 px-2 py-0.5 rounded border border-amber-600 font-black animate-pulse flex items-center gap-1 shadow-sm">
                      <span>📌</span> EVIDÊNCIA 01: {selectedSuspiciousTerm ? `"${selectedSuspiciousTerm}"` : 'ALEGAÇÃO SELECIONADA'}
                    </span>
                  ) : isInvestigationMode ? (
                    <span className="text-[10px] font-mono text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded border border-amber-500 font-bold animate-pulse flex items-center gap-1">
                      <span>🔍</span> MODO INVESTIGAR ATIVO: SELECIONE O TERMO
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded border border-stone-300 font-bold flex items-center gap-1">
                      <span>📄</span> DOSSIÊ EM LEITURA REGULAR
                    </span>
                  )}
                </div>

                {/* ALERTA DE INCOMPATIBILIDADE TEMPORÁRIO */}
                {mismatchWarning && (
                  <div className="p-2 rounded bg-red-950/90 border-2 border-red-500 text-red-200 text-xs font-mono font-bold animate-bounce-short text-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    {mismatchWarning}
                  </div>
                )}

                <div 
                  onClick={handleInspectDiscrepancy}
                  className={`p-4 rounded-md bg-white/95 border-2 transition-all relative ${
                    isInvestigationMode ? 'cursor-pointer' : 'cursor-default'
                  } ${
                    selectedClaim 
                      ? 'border-amber-500 bg-amber-50/95 ring-4 ring-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : isInvestigationMode 
                      ? 'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.35)] hover:bg-amber-50/90 ring-2 ring-amber-500/40' 
                      : 'border-[#8c7864] shadow-sm hover:border-stone-500'
                  }`}
                  title={isInvestigationMode ? "Clique para isolar esta alegação contra o Manual Oficial" : "Ative o [Modo Investigar] para apontar discrepâncias"}
                >
                  {isInvestigationMode && (
                    <div className="absolute top-2 right-2 bg-amber-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <span>⚡</span> {selectedClaim ? 'CONFRONTAR COM MANUAL' : 'APONTAR DISCREPÂNCIA'}
                    </div>
                  )}

                  <div className="text-zinc-950 font-mono font-bold text-sm leading-relaxed">
                    <MathRenderer 
                      content={currentCase.thesisStatement} 
                      textClassName="text-zinc-950 font-bold font-mono text-sm leading-relaxed" 
                    />
                  </div>

                  {/* CHIPS DE TERMOS SUSPEITOS CLICÁVEIS (Fase 2B Refinada) */}
                  {isInvestigationMode && (
                    <div className="mt-3 pt-2 border-t border-amber-300/80 space-y-1.5">
                      <div className="text-[10px] font-mono text-amber-950 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <span>⚠️</span> TERMOS IDENTIFICADOS PARA CONFRONTO:
                        </span>
                        {selectedSuspiciousTerm && (
                          <span className="text-amber-800 text-[9px] font-black">
                            [ EVIDÊNCIA ISOLADA ]
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {((currentCase.suspiciousTerms && currentCase.suspiciousTerms.length > 0)
                          ? currentCase.suspiciousTerms 
                          : [currentCase.contradictionTrigger].filter(Boolean)
                        ).map((term, tIdx) => {
                          const isTermSelected = selectedSuspiciousTerm === term;
                          return (
                            <button
                              key={tIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectSuspiciousTerm(term!);
                              }}
                              className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isTermSelected
                                  ? 'bg-amber-600 text-white shadow-[0_0_12px_rgba(217,119,6,0.6)] ring-2 ring-amber-400 scale-105'
                                  : 'bg-amber-100 text-amber-950 border border-amber-500/60 hover:bg-amber-200'
                              }`}
                              title="Clique para isolar este termo como evidência de confronto"
                            >
                              <span>{isTermSelected ? '📌' : '🔍'}</span>
                              <span>"{term}"</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FITA DE EVIDÊNCIA VINCULADA AO MANUAL (Fase 2B) */}
              {isEvidenceMatched && (
                <div className="evidence-matched-strip p-3 rounded-lg my-2.5 flex items-center justify-between text-xs font-bold font-mono animate-fade-in shadow-md">
                  <div className="flex items-center gap-2 text-amber-900">
                    <span className="text-base">⚡</span>
                    <span className="tracking-wide">CONTRADIÇÃO COMPROVADA // VINCULADA AO MANUAL</span>
                  </div>
                  <span className="text-[10px] bg-amber-900 text-amber-100 px-2 py-0.5 rounded uppercase font-black tracking-widest shadow-sm flex items-center gap-1">
                    {selectedSuspiciousTerm && <span>"{selectedSuspiciousTerm}" ➔</span>}
                    <span>{selectedRuleId || currentCase.targetRuleId || 'DIRETRIZ RECONHECIDA'}</span>
                  </span>
                </div>
              )}

              {/* FITA DE INTERROGATÓRIO E CONFRONTO DIALÉTICO (Fase 2A) */}
              {activeInterrogation && (
                <div className="my-3 p-3.5 rounded-lg bg-[#140f0c] border-2 border-amber-600/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] font-mono space-y-3 animate-fade-in relative z-20">
                  {/* Cabeçalho da fita */}
                  <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1.5 text-[10px]">
                    <div className="flex items-center gap-2 text-amber-400 font-bold tracking-wider">
                      <span className="animate-pulse">🔴</span>
                      <span>TELE-TIPO MKA // CONFRONTO DE EVIDÊNCIA EM TEMPO REAL</span>
                    </div>
                    <button
                      onClick={() => setActiveInterrogation(null)}
                      className="text-stone-400 hover:text-white px-1.5 py-0.5 rounded bg-[#241c16] border border-[#4a3525] text-[9px] cursor-pointer"
                    >
                      ✕ DISPENSAR
                    </button>
                  </div>

                  {/* Diálogo em dois tempos */}
                  <div className="space-y-2.5 text-xs">
                    {/* Postulante */}
                    <div className="flex items-start gap-2.5 bg-[#1e1712] p-2 rounded border border-[#423122]">
                      <div className="w-8 h-8 rounded border border-stone-600 overflow-hidden flex-shrink-0 bg-black">
                        <img 
                          src={currentCase.applicantPhoto} 
                          alt="Postulante" 
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span className="text-[10px] text-stone-400 font-bold block">
                          POSTULANTE ({currentCase.applicantName}):
                        </span>
                        <p className="text-amber-100 italic leading-relaxed">
                          "{activeInterrogation.postulantExcuse}"
                        </p>
                      </div>
                    </div>

                    {/* Inspetor / Auditor */}
                    <div className="flex items-start gap-2.5 bg-[#17120e] p-2 rounded border border-amber-900/50">
                      <div className="w-8 h-8 rounded border border-amber-600/60 overflow-hidden flex-shrink-0 bg-black flex items-center justify-center">
                        <img 
                          src="./inspection/ministry-seal.jpg" 
                          alt="MKA Seal" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span className="text-[10px] text-amber-400 font-bold block flex items-center gap-1.5">
                          <span>INSPEÇÃO MKA // PARECER TÉCNICO:</span>
                          <span className={`px-1 rounded text-[9px] font-bold ${currentCase.isFraudulent ? 'bg-red-900/80 text-red-200' : 'bg-emerald-900/80 text-emerald-200'}`}>
                            {currentCase.isFraudulent ? 'INCONSISTÊNCIA CONFIRMADA' : 'CONFORME'}
                          </span>
                        </span>
                        <div className="text-stone-200 font-sans leading-relaxed">
                          <MathRenderer content={activeInterrogation.inspectorVerdict} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orientação tática da mesa */}
                  <div className="text-[10px] text-stone-400 border-t border-[#3d2b1f] pt-1.5 flex items-center justify-between">
                    <span className="text-amber-500 font-bold">
                      {currentCase.isFraudulent 
                        ? '🚨 RECOMENDAÇÃO: APLIQUE CARIMBO DENEGADO (FRAUDE)'
                        : '✅ RECOMENDAÇÃO: APLIQUE CARIMBO HOMÓLOGO'}
                    </span>
                    <span className="text-[9px] text-stone-500">PROCESSO Nº {currentCase.fileNumber}</span>
                  </div>
                </div>
              )}

              {/* Chips de Conceitos Declarados */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#5c4a3b]/30 text-[10px] font-mono">
                <span className="text-[#7a6450] font-bold">TERMOS VINCULADOS:</span>
                {currentCase.claimedConcepts.map((concept, cIdx) => (
                  <span key={cIdx} className="px-2 py-0.5 rounded bg-[#dfd3bc] text-[#3d2f23] border border-[#b5a38a] font-bold">
                    #{concept}
                  </span>
                ))}
                <span className="ml-auto px-2 py-0.5 rounded bg-[#3d2f23] text-amber-200 font-bold">
                  {currentCase.difficulty}
                </span>
              </div>

              {/* CARIMBOS FÍSICOS SOBRE O PAPEL (Efeito Tinta Desgastada com Rotação) */}
              {stampStatus.includes('stamped_approved') && (
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                  style={{ transform: `rotate(${stampAngle}deg)` }}
                >
                  <div className="border-4 border-emerald-700 text-emerald-800 font-mono font-black text-2xl sm:text-3xl px-6 py-2 tracking-widest uppercase rounded shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10 backdrop-blur-[1px] animate-stamp-impact">
                    ★ HOMOLOGADO // CONFORME ★
                  </div>
                </div>
              )}

              {stampStatus.includes('stamped_denied') && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                  style={{ transform: `rotate(${stampAngle}deg)` }}
                >
                  <div className="border-4 border-red-700 text-red-800 font-mono font-black text-2xl sm:text-3xl px-6 py-2 tracking-widest uppercase rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/10 backdrop-blur-[1px] animate-stamp-impact">
                    ⛔ DENEGADO // ANOMALIA DETECTADA ⛔
                  </div>
                  {appliedDenialReason && (
                    <div className="stamp-reason px-5 py-2 mt-3 rounded font-mono font-black text-xs sm:text-sm tracking-widest text-center shadow-lg animate-stamp-impact">
                      ★ MOTIVO: {appliedDenialReason} ★
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* A GAVETA DE CARIMBOS MECÂNICOS (Stamp Controls - Botoeiras Híbridas 3D) */}
            <div className="mt-4 p-4 rounded-xl bg-[#1c1612] border-2 border-[#423122] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="text-xs font-mono space-y-0.5 text-stone-400">
                <span className="text-amber-500 font-bold text-[11px] block uppercase">
                  MESA DE DESPACHO DISCIPLINAR:
                </span>
                <span>Analise o texto contra as diretrizes oficiais. Aplique a decisão correspondente.</span>
              </div>

              <div className="stamp-chassis flex items-center gap-4 w-full sm:w-auto justify-end">
                {/* BOTOEIRA HOMÓLOGO */}
                <button
                  onClick={() => handleVerdict('APPROVED')}
                  disabled={stampStatus !== 'none' || citation.isOpen}
                  className={`btn-inspector-hybrid btn-hybrid-homologo group ${isAPressed ? 'pressed' : ''} ${
                    activeInterrogation && !currentCase.isFraudulent 
                      ? 'ring-4 ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse' 
                      : ''
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                  title="Aprovar documento em conformidade (Tecla A / 1)"
                >
                  <div className="pilot-lamp-housing">
                    <div className="pilot-lamp-lens pilot-lens-green group-hover:brightness-125 transition-all" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      HOMÓLOGO
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-emerald-200/90 font-bold">
                      [TECLA A / 1]
                    </div>
                  </div>
                </button>

                {/* BOTOEIRA DENEGAR */}
                <button
                  onClick={() => handleVerdict('DENIED')}
                  disabled={stampStatus !== 'none' || citation.isOpen}
                  className={`btn-inspector-hybrid btn-hybrid-denegar group ${isDPressed ? 'pressed' : ''} ${
                    activeInterrogation && currentCase.isFraudulent 
                      ? 'ring-4 ring-red-500 shadow-[0_0_25px_rgba(239,68,68,0.9)] animate-pulse' 
                      : ''
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                  title="Denegar documento fraudulento (Tecla D / 2)"
                >
                  <div className="pilot-lamp-housing">
                    <div className="pilot-lamp-lens pilot-lens-red group-hover:brightness-125 transition-all" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      DENEGAR (FRAUDE)
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-red-200/90 font-bold">
                      [TECLA D / 2]
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: O MANUAL DE DIRETRIZES DO MINISTÉRIO (Rulebook) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-lg bg-[#18130f] border-2 border-[#423122] flex flex-col overflow-hidden shadow-xl">
              
              {/* Abas do Manual */}
              <div className="bg-[#241c16] border-b border-[#423122] p-2 flex items-center gap-1 text-[11px] font-mono">
                <button
                  onClick={() => { setRulebookTab('theory'); playClickSound(soundEnabled); }}
                  className={`flex-1 py-1.5 px-2 rounded font-bold transition-colors cursor-pointer text-center ${
                    rulebookTab === 'theory' 
                      ? 'bg-[#3b2b1e] text-amber-300 border border-amber-600/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  📖 Leis Teóricas
                </button>
                <button
                  onClick={() => { setRulebookTab('traps'); playClickSound(soundEnabled); }}
                  className={`flex-1 py-1.5 px-2 rounded font-bold transition-colors cursor-pointer text-center ${
                    rulebookTab === 'traps' 
                      ? 'bg-[#3b2b1e] text-red-300 border border-red-600/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  ⚠️ Distratores
                </button>
                <button
                  onClick={() => { setRulebookTab('mnemonics'); playClickSound(soundEnabled); }}
                  className={`flex-1 py-1.5 px-2 rounded font-bold transition-colors cursor-pointer text-center ${
                    rulebookTab === 'mnemonics' 
                      ? 'bg-[#3b2b1e] text-cyan-300 border border-cyan-600/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  ⚡ Mnemônicos
                </button>
              </div>

              {/* Conteúdo do Manual com Rolagem */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-serif text-xs leading-relaxed max-h-[500px] scrollbar-thin">
                {rulebookTab === 'theory' && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider pb-1 border-b border-[#423122] flex items-center justify-between">
                      <span>REGULAMENTO OFICIAL // {card.title}</span>
                      {selectedClaim && (
                        <span className="text-[9px] text-amber-400 font-normal animate-pulse">
                          Clique em um artigo para confrontar
                        </span>
                      )}
                    </div>
                    {card.sec02_theory?.blocks?.map((block, bIdx) => {
                      const ruleId = `rule-theory-${bIdx}`;
                      const isMatched = isEvidenceMatched && (selectedRuleId === ruleId || currentCase.targetRuleId === ruleId);
                      return (
                        <div
                          key={bIdx}
                          onClick={() => handleSelectRule(ruleId, block.title || `Artigo ${block.number || bIdx + 1}`, block.content)}
                          className={`p-3 rounded border transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : selectedClaim
                              ? 'bg-[#100d0a] border-amber-600/70 hover:border-amber-400 hover:bg-amber-950/30 hover:scale-[1.01]'
                              : 'bg-[#100d0a] border-[#382b1f] hover:border-[#604934]'
                          } space-y-1`}
                          title={selectedClaim ? "Confrontar este artigo contra a alegação" : undefined}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                            <span>ARTIGO {block.number || bIdx + 1}</span>
                            <div className="flex items-center gap-2">
                              <span>{block.title}</span>
                              {isMatched ? (
                                <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest shadow">
                                  ⚡ VINCULADO
                                </span>
                              ) : selectedClaim ? (
                                <span className="bg-amber-800/80 text-amber-200 text-[8px] px-1.5 py-0.5 rounded font-bold border border-amber-600/50">
                                  [ CONFRONTAR ]
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="text-stone-300 text-xs font-sans">
                            <MathRenderer content={block.content} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {rulebookTab === 'traps' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider pb-1 border-b border-[#423122] flex items-center justify-between">
                      <span>BOLETIM DE ANOMALIAS E FALÁCIAS (BLIND SPOTS)</span>
                      {selectedClaim && (
                        <span className="text-[9px] text-red-300 font-normal animate-pulse">
                          Clique em uma armadilha para confrontar
                        </span>
                      )}
                    </div>
                    {card.sec04_radar?.blindSpots?.length ? (
                      card.sec04_radar.blindSpots.map((spot, sIdx) => {
                        const ruleId = `rule-trap-${sIdx}`;
                        const isMatched = isEvidenceMatched && (selectedRuleId === ruleId || currentCase.targetRuleId === ruleId);
                        return (
                          <div
                            key={sIdx}
                            onClick={() => handleSelectRule(ruleId, spot.title, spot.analysis)}
                            className={`p-3 rounded border transition-all cursor-pointer ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : selectedClaim
                                ? 'bg-red-950/30 border-red-600/70 hover:border-red-400 hover:bg-red-900/30 hover:scale-[1.01]'
                                : 'bg-red-950/20 border-red-900/40 hover:border-red-700/60'
                            } space-y-1 font-sans`}
                            title={selectedClaim ? "Confrontar este distrator contra a alegação" : undefined}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono font-bold text-red-300 block">
                                ⛔ {spot.title}
                              </span>
                              {isMatched ? (
                                <span className="bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-black tracking-widest shadow">
                                  ⚡ VINCULADO
                                </span>
                              ) : selectedClaim ? (
                                <span className="bg-amber-800/80 text-amber-200 text-[8px] font-mono px-1.5 py-0.5 rounded font-bold border border-amber-600/50">
                                  [ CONFRONTAR ]
                                </span>
                              ) : null}
                            </div>
                            {renderRulebookBlindSpot(spot.analysis)}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-stone-500 font-mono text-xs">Nenhum ponto cego registrado no boletim.</p>
                    )}
                  </div>
                )}

                {rulebookTab === 'mnemonics' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider pb-1 border-b border-[#423122] flex items-center justify-between">
                      <span>CÓDIGOS MNEMÔNICOS OFICIAIS</span>
                      {selectedClaim && (
                        <span className="text-[9px] text-cyan-300 font-normal animate-pulse">
                          Clique em um mnemônico para confrontar
                        </span>
                      )}
                    </div>
                    {card.sec04_radar?.mnemonics?.length ? (
                      card.sec04_radar.mnemonics.map((mnem, mIdx) => {
                        const ruleId = `rule-mnem-${mIdx}`;
                        const isMatched = isEvidenceMatched && (selectedRuleId === ruleId || currentCase.targetRuleId === ruleId);
                        return (
                          <div
                            key={mIdx}
                            onClick={() => handleSelectRule(ruleId, mnem.title || mnem.trigger)}
                            className={`p-3 rounded border transition-all cursor-pointer ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : selectedClaim
                                ? 'bg-cyan-950/30 border-cyan-600/70 hover:border-cyan-400 hover:bg-cyan-900/30 hover:scale-[1.01]'
                                : 'bg-cyan-950/20 border-cyan-900/40 hover:border-cyan-700/60'
                            } space-y-1 font-mono text-xs`}
                            title={selectedClaim ? "Confrontar este código contra a alegação" : undefined}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-cyan-300 block">
                                ⚡ {mnem.title || mnem.trigger}
                              </span>
                              {isMatched ? (
                                <span className="bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-black tracking-widest shadow">
                                  ⚡ VINCULADO
                                </span>
                              ) : selectedClaim ? (
                                <span className="bg-amber-800/80 text-amber-200 text-[8px] font-mono px-1.5 py-0.5 rounded font-bold border border-amber-600/50">
                                  [ CONFRONTAR ]
                                </span>
                              ) : null}
                            </div>
                            {renderRulebookMnemonic(mnem.rule)}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-stone-500 font-mono text-xs">Nenhum mnemônico canônico catalogado.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Rodapé do Manual */}
              <div className="bg-[#1c1612] border-t border-[#423122] p-2 text-[10px] font-mono text-stone-500 text-center">
                MANUAL MKA • USO EXCLUSIVO DO INSPETOR DE TURNO • LEI 4.112/88
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOLETIM DIÁRIO DE FECHAMENTO DE TURNO (Fase 2A - DailyShiftModal) */}
      <DailyShiftModal
        isOpen={isDailyShiftModalOpen}
        onClose={() => setIsDailyShiftModalOpen(false)}
        onRestartShift={handleRestartShift}
        onExitToArcade={onClose || (() => {})}
        topic={card.topic || card.title}
        stats={shiftStats}
      />
    </div>
  );
};
