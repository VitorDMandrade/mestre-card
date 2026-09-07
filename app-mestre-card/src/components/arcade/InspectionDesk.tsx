import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { MestreCardData, InspectionCase, InspectionVerdict } from '../../types/mestre-card';
import { generateInspectionCases } from '../../lib/inspection-engine';
import { MathRenderer } from '../MathRenderer';
import { useGame } from '../../context/GameContext';
import { addXP } from '../../lib/xp-engine';
import { 
  playStampApprovedSound, 
  playStampDeniedSound, 
  playPaperSlideSound, 
  playTeletypeWarningSound, 
  playShutterSound,
  playClickSound 
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

  // Estatísticas do turno de inspeção
  const [shiftStats, setShiftStats] = useState({
    totalProcessed: 0,
    correctVerdicts: 0,
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

    if (currentIndex + 1 >= cases.length) {
      // Turno concluído
      setShiftStats(prev => ({ ...prev, isShiftComplete: true }));
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

  // Atalhos de teclado (A = Aprovar, D = Denegar, M = Manual)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'a' || e.key === 'A' || e.key === '1') {
        e.preventDefault();
        handleVerdict('APPROVED');
      } else if (e.key === 'd' || e.key === 'D' || e.key === '2') {
        e.preventDefault();
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleVerdict, citation.isOpen, soundEnabled]);

  // Reinicia o turno com casos reembaralhados
  const handleRestartShift = () => {
    setCurrentIndex(0);
    setStampStatus('none');
    setCitation({ isOpen: false, title: '', message: '' });
    setShiftStats({
      totalProcessed: 0,
      correctVerdicts: 0,
      fraudsIntercepted: 0,
      citationsReceived: 0,
      xpEarned: 0,
      isShiftComplete: false
    });
    playShutterSound(soundEnabled);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#3d2b1f]/80 bg-[#120f0d] text-[#d6c7b2] shadow-2xl font-serif select-none">
      
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

              {/* TESE SUBMETIDA PARA AUDITORIA */}
              <div className="space-y-3 my-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6450] font-bold block border-b border-[#5c4a3b]/20 pb-1">
                  ▶ TESE SUBMETIDA PELO POSTULANTE (AUDITAR CONTRADIÇÕES):
                </span>
                <div className="p-4 rounded bg-[#f7f2e7] border border-[#c4b59f] shadow-inner text-sm font-serif leading-relaxed text-[#1e1711] italic">
                  <MathRenderer content={currentCase.thesisStatement} />
                </div>
              </div>

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
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                  style={{ transform: `rotate(${stampAngle}deg)` }}
                >
                  <div className="border-4 border-red-700 text-red-800 font-mono font-black text-2xl sm:text-3xl px-6 py-2 tracking-widest uppercase rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/10 backdrop-blur-[1px] animate-stamp-impact">
                    ⛔ DENEGADO // ANOMALIA DETECTADA ⛔
                  </div>
                </div>
              )}
            </div>

            {/* A GAVETA DE CARIMBOS MECÂNICOS (Stamp Controls) */}
            <div className="mt-4 p-4 rounded-xl bg-[#1c1612] border-2 border-[#423122] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="text-xs font-mono space-y-0.5 text-stone-400">
                <span className="text-amber-500 font-bold text-[11px] block uppercase">
                  MESA DE DESPACHO DISCIPLINAR:
                </span>
                <span>Analise o texto contra as diretrizes oficiais. Aplique o carimbo correspondente.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Carimbo Verde: HOMOLOGAR */}
                <button
                  onClick={() => handleVerdict('APPROVED')}
                  disabled={stampStatus !== 'none' || citation.isOpen}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-lg bg-gradient-to-b from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-emerald-500/80 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span className="text-base group-hover:rotate-12 transition-transform">🟩</span>
                  <div className="text-left">
                    <span className="block leading-tight">HOMOLOGAR</span>
                    <span className="text-[9px] opacity-75 block">[Tecla A / 1]</span>
                  </div>
                </button>

                {/* Carimbo Vermelho: DENEGAR */}
                <button
                  onClick={() => handleVerdict('DENIED')}
                  disabled={stampStatus !== 'none' || citation.isOpen}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-lg bg-gradient-to-b from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-red-500/80 shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span className="text-base group-hover:-rotate-12 transition-transform">🟥</span>
                  <div className="text-left">
                    <span className="block leading-tight">DENEGAR (FRAUDE)</span>
                    <span className="text-[9px] opacity-75 block">[Tecla D / 2]</span>
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
                    <div className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider pb-1 border-b border-[#423122]">
                      REGULAMENTO OFICIAL // {card.title}
                    </div>
                    {card.sec02_theory?.blocks?.map((block, bIdx) => (
                      <div key={bIdx} className="p-3 rounded bg-[#100d0a] border border-[#382b1f] space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                          <span>ARTIGO {block.number || bIdx + 1}</span>
                          <span>{block.title}</span>
                        </div>
                        <div className="text-stone-300 text-xs font-sans">
                          <MathRenderer content={block.content} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {rulebookTab === 'traps' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider pb-1 border-b border-[#423122]">
                      BOLETIM DE ANOMALIAS E FALÁCIAS CONHECIDAS (BLIND SPOTS)
                    </div>
                    {card.sec04_radar?.blindSpots?.length ? (
                      card.sec04_radar.blindSpots.map((spot, sIdx) => (
                        <div key={sIdx} className="p-3 rounded bg-red-950/20 border border-red-900/40 space-y-1 font-sans">
                          <span className="text-[11px] font-mono font-bold text-red-300 block">
                            ⛔ {spot.title}
                          </span>
                          <p className="text-stone-300 text-xs">
                            {spot.analysis}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-500 font-mono text-xs">Nenhum ponto cego registrado no boletim.</p>
                    )}
                  </div>
                )}

                {rulebookTab === 'mnemonics' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider pb-1 border-b border-[#423122]">
                      CÓDIGOS MNEMÔNICOS OFICIAIS
                    </div>
                    {card.sec04_radar?.mnemonics?.length ? (
                      card.sec04_radar.mnemonics.map((mnem, mIdx) => (
                        <div key={mIdx} className="p-3 rounded bg-cyan-950/20 border border-cyan-900/40 space-y-1 font-mono text-xs">
                          <span className="font-bold text-cyan-300 block">
                            ⚡ {mnem.title || mnem.trigger}
                          </span>
                          <p className="text-stone-300 font-sans">{mnem.rule}</p>
                        </div>
                      ))
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
    </div>
  );
};
