import { useState, useMemo, useEffect } from 'react';
import type { LabQuestion, BossFight } from '../../types/mestre-card';
import { MathRenderer } from '../MathRenderer';
import { 
  playSound, 
  playDamageSound, 
  playVictorySound,
  playSwordSlashSound,
  playShieldBlockSound,
  playFocusOracleSound,
  playBossHitRoarSound,
  startBossBattleMusic,
  stopBossBattleMusic,
  playBossVictoryFanfareAudio
} from '../../lib/audio';
import { db } from '../../lib/db';
import { useGame } from '../../context/GameContext';
import { addXP } from '../../lib/xp-engine';
import { initBossCombat, type BossCombatState, EXAMINER_TAUNTS } from '../../lib/boss-engine';

const useSafeGame = () => {
  try {
    return useGame();
  } catch {
    return null;
  }
};

interface LabSectionProps {
  cardId?: string;
  cardTitle?: string;
  questions: LabQuestion[];
  hardcoreQuestions?: LabQuestion[];
  bossFight: BossFight;
  isHardcore: boolean;
  soundEnabled: boolean;
  onApplyDamage: (amount: number) => void;
}

export function parseDistractorAnalysis(
  analysisText: string, 
  options: LabQuestion['options']
): { success: boolean; fullText: string; items: Record<string, string> } {
  if (!analysisText || typeof analysisText !== 'string') {
    return { success: false, fullText: analysisText || '', items: {} };
  }

  const incorrectOptions = options.filter(o => !o.isCorrect);
  const incorrectLetters = incorrectOptions.map(o => o.letter.toUpperCase());

  const regex = /(?:[•\-\*]?\s*\[(?:Alternativa|Letra|Opção)?\s*([A-D])\]|(?:A\s+alternativa|Alternativa|Letra|Opção)\s+([A-D])|(?:\b|^)([A-D])\s*[\)\:\-\–])/gi;
  const matches: Array<{ letter: string; index: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(analysisText)) !== null) {
    const letter = (m[1] || m[2] || m[3]).toUpperCase();
    if (incorrectLetters.includes(letter)) {
      matches.push({ letter, index: m.index });
    }
  }

  const foundUniqueLetters = new Set(matches.map(m => m.letter));
  if (foundUniqueLetters.size < Math.min(2, incorrectLetters.length)) {
    return { success: false, fullText: analysisText, items: {} };
  }

  const items: Record<string, string> = {};
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const chunk = next 
      ? analysisText.substring(current.index, next.index).trim() 
      : analysisText.substring(current.index).trim();
    
    items[current.letter] = chunk;
  }

  return { success: true, fullText: analysisText, items };
}

export const LabSection = ({ 
  cardId, 
  cardTitle, 
  questions, 
  hardcoreQuestions, 
  bossFight, 
  isHardcore, 
  soundEnabled, 
  onApplyDamage 
}: LabSectionProps) => {
  const game = useSafeGame();
  const [mode, setMode] = useState<'proof' | 'roguelike'>('proof');
  const [answeredQs, setAnsweredQs] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const hasHardcore = Array.isArray(hardcoreQuestions) && hardcoreQuestions.length > 0;
  const [selectedTab, setSelectedTab] = useState<'standard' | 'hardcore'>(isHardcore && hasHardcore ? 'hardcore' : 'standard');
  const [prevHardcore, setPrevHardcore] = useState(isHardcore);

  // Estados da Arena Roguelike (Via 3)
  const [combat, setCombat] = useState<BossCombatState>(initBossCombat());
  const [bossShake, setBossShake] = useState(false);
  const [screenSlash, setScreenSlash] = useState(false);
  const [showOracleModal, setShowOracleModal] = useState(false);

  // Sincroniza aba hardcore quando alternada no StudyHUD
  if (isHardcore !== prevHardcore) {
    setPrevHardcore(isHardcore);
    if (isHardcore && hasHardcore) {
      setSelectedTab('hardcore');
    } else if (!isHardcore) {
      setSelectedTab('standard');
    }
  }

  const activeQuestions = selectedTab === 'hardcore' && hasHardcore ? hardcoreQuestions : questions;
  const isViewingHardcore = selectedTab === 'hardcore' && hasHardcore;

  // Normalização dos dados de desafio da banca para o Boss Fight
  const bossData = useMemo(() => {
    if (bossFight && bossFight.options && bossFight.options.length > 0) {
      const correctIdx = bossFight.options.findIndex(o => o.isCorrect);
      return {
        title: bossFight.title || 'O Examinador Implacável',
        prompt: bossFight.context || 'Identifique a tese inviolável que refuta a barreira de sofismas da banca.',
        options: bossFight.options.map(o => o.text),
        letters: bossFight.options.map(o => o.letter),
        correctIndex: correctIdx >= 0 ? correctIdx : 0,
        weaknessClue: bossFight.stepByStepResolution || 'Fraqueza detectada: A banca omite a invariância dimensional e as condições de contorno na etapa intermediária.'
      };
    }

    const fallbackQ = (hardcoreQuestions && hardcoreQuestions.length > 0 ? hardcoreQuestions[0] : questions[0]);
    if (fallbackQ && fallbackQ.options && fallbackQ.options.length > 0) {
      const correctIdx = fallbackQ.options.findIndex(o => o.isCorrect);
      return {
        title: 'Auditoria da Banca Central',
        prompt: fallbackQ.enunciado,
        options: fallbackQ.options.map(o => o.text),
        letters: fallbackQ.options.map(o => o.letter),
        correctIndex: correctIdx >= 0 ? correctIdx : 0,
        weaknessClue: fallbackQ.resolution?.technicalVerdict || 'Fraqueza detectada: A premissa central é refutada pela fundamentação axiomática da questão.'
      };
    }

    return {
      title: 'O Examinador Implacável',
      prompt: 'Confronte a banca e identifique a tese canônica inviolável.',
      options: ['Tese Axiomática Canônica', 'Falácia por Inversão Causal', 'Sofisma de Falsa Equivalência', 'Premissa Sem Nexo Físico'],
      letters: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      weaknessClue: 'A conservação de energia e simetria matemática eliminam as alternativas que introduzem variáveis espúrias.'
    };
  }, [bossFight, hardcoreQuestions, questions]);

  // Gestão contínua da trilha sonora de batalha no modo Roguelike
  useEffect(() => {
    if (mode === 'roguelike' && !combat.isVictory && !combat.isDefeat) {
      startBossBattleMusic(soundEnabled);
    } else {
      stopBossBattleMusic();
    }
    return () => {
      stopBossBattleMusic();
    };
  }, [mode, combat.isVictory, combat.isDefeat, soundEnabled]);

  // Ataque do Candidato na Arena Roguelike
  const handleAttack = (idx: number) => {
    if (combat.isVictory || combat.isDefeat) return;

    const letter = bossData.letters[idx] || String.fromCharCode(65 + idx);
    const isCorrect = idx === bossData.correctIndex;

    if (isCorrect) {
      // GOLPE CRÍTICO DE TESE
      setScreenSlash(true);
      setBossShake(true);
      playSwordSlashSound(soundEnabled);
      playBossHitRoarSound(soundEnabled);

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 40, 60]);
      }

      setTimeout(() => {
        setBossShake(false);
        setScreenSlash(false);
        playBossVictoryFanfareAudio(soundEnabled);
      }, 400);

      setCombat(prev => ({
        ...prev,
        bossHp: 0,
        isVictory: true,
        combatLog: [
          {
            id: `log-${Date.now()}`,
            type: 'crit',
            text: '★ GOLPE CRÍTICO DE TESE! O Sofisma da Banca foi reduzido a pó (1.000 Dano)!'
          },
          ...prev.combatLog
        ]
      }));

      // Recompensa real de +300 XP
      addXP(300);
      game?.fireXpToast(300, '★ EXAMINADOR DERROTADO NO ROGUELIKE (+300 XP) ★');
    } else {
      // CONTRA-ATAQUE DA BANCA
      playShieldBlockSound(soundEnabled);
      const damage = 35 + combat.bossRageLevel * 5;
      const nextHp = Math.max(0, combat.playerHp - damage);
      const taunt = EXAMINER_TAUNTS[combat.bossRageLevel % EXAMINER_TAUNTS.length];

      setBossShake(true);
      setTimeout(() => setBossShake(false), 350);

      setCombat(prev => ({
        ...prev,
        playerHp: nextHp,
        isDefeat: nextHp === 0,
        bossRageLevel: prev.bossRageLevel + 1,
        turnCount: prev.turnCount + 1,
        combatLog: [
          {
            id: `log-${Date.now()}-boss`,
            type: 'boss',
            text: `⚠️ CONTRA-ATAQUE: -${damage} HP! O Examinador brada: "${taunt}"`
          },
          {
            id: `log-${Date.now()}-player`,
            type: 'player',
            text: `Sofisma ativado na alternativa [${letter}]. A tese vacilou.`
          },
          ...prev.combatLog
        ]
      }));

      // Registro no Caderno de Erros
      if (cardId) {
        db.recordSessionError({
          cardId,
          cardTitle: cardTitle || 'Dossiê Tático',
          game: 'Lab-BossRoguelike',
          prompt: bossData.prompt,
          userWrongAnswer: `Alternativa ${letter}: ${bossData.options[idx]}`,
          explanation: bossData.weaknessClue,
          timestamp: Date.now()
        }).catch(err => console.error('Erro ao registrar falha do Boss no DB:', err));
      }
    }
  };

  // Escudo Mnemônico: Vaporiza 1 sofisma incorreto (-1 PA)
  const handleUseMnemonicShield = () => {
    if (combat.actionPoints < 1 || combat.isVictory || combat.isDefeat) return;

    const availableDistractors = bossData.options
      .map((opt, i) => ({ opt, i }))
      .filter(({ i, opt }) => i !== bossData.correctIndex && !combat.eliminatedDistractors.includes(opt));

    if (availableDistractors.length === 0) return;

    const target = availableDistractors[0];
    playShieldBlockSound(soundEnabled);

    const letter = bossData.letters[target.i] || String.fromCharCode(65 + target.i);

    setCombat(prev => ({
      ...prev,
      actionPoints: prev.actionPoints - 1,
      eliminatedDistractors: [...prev.eliminatedDistractors, target.opt],
      combatLog: [
        {
          id: `log-${Date.now()}`,
          type: 'system',
          text: `🛡️ ESCUDO MNEMÔNICO: O sofisma [${letter}] foi vaporizado do tabuleiro! (-1 PA)`
        },
        ...prev.combatLog
      ]
    }));
  };

  // Oráculo de Foco: Revela fraqueza da banca (-2 PA)
  const handleUseOracleSiphon = () => {
    if (combat.actionPoints < 2 || combat.oracleHintUsed || combat.isVictory || combat.isDefeat) return;
    playFocusOracleSound(soundEnabled);
    setShowOracleModal(true);

    setCombat(prev => ({
      ...prev,
      actionPoints: prev.actionPoints - 2,
      oracleHintUsed: true,
      combatLog: [
        {
          id: `log-${Date.now()}`,
          type: 'system',
          text: '📜 ORÁCULO REVELADO: O ponto fraco da banca foi descriptografado! (-2 PA)'
        },
        ...prev.combatLog
      ]
    }));
  };

  // Resposta do modo Prova Escrita (Canônico)
  const handleAnswer = (questionId: string, letter: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    if (answeredQs[questionId]) return;
    
    setAnsweredQs(prev => ({ ...prev, [questionId]: letter }));
    
    if (isCorrect) {
      if (questionId === 'boss') {
        playVictorySound(soundEnabled);
      } else {
        playSound(true, soundEnabled);
      }
    } else {
      if (isHardcore || isViewingHardcore) {
        playDamageSound(soundEnabled);
        onApplyDamage(20);
      } else {
        playSound(false, soundEnabled);
      }

      if (cardId) {
        let promptText = '';
        let wrongText = '';
        let explanationText = '';

        if (questionId === 'boss') {
          promptText = bossFight.context;
          const opt = bossFight.options.find(o => o.letter === letter);
          wrongText = opt ? `Alternativa ${letter}: ${opt.text}` : `Alternativa ${letter}`;
          explanationText = bossFight.stepByStepResolution;
        } else {
          const currentQ = activeQuestions.find(q => q.id === questionId);
          if (currentQ) {
            promptText = currentQ.enunciado;
            const opt = currentQ.options.find(o => o.letter === letter);
            wrongText = opt ? `Alternativa ${letter}: ${opt.text}` : `Alternativa ${letter}`;
            const parsed = parseDistractorAnalysis(currentQ.resolution.distractorAnalysis, currentQ.options);
            explanationText = parsed.items[letter] || currentQ.resolution.technicalVerdict;
          }
        }

        db.recordSessionError({
          cardId,
          cardTitle: cardTitle || 'Dossiê Tático',
          game: isViewingHardcore ? 'Lab-Hardcore' : questionId === 'boss' ? 'Lab-Boss' : 'Lab',
          prompt: promptText,
          userWrongAnswer: wrongText,
          explanation: explanationText,
          timestamp: Date.now()
        }).catch(err => console.error('Erro ao registrar falha do Lab no DB:', err));
      }
    }
  };

  return (
    <section id="sec-05" className="mb-12 scroll-mt-44 relative">
      {/* Efeito Visual de Golpe de Corte em Tela Cheia */}
      {screenSlash && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent slash-effect shadow-[0_0_60px_#00f5ff]" />
        </div>
      )}

      {/* Cabeçalho da Seção com Comutador de Modo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">SEÇÃO 05 // LABORATÓRIO TÁTICO</span>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-blue-500">05.</span> LABORATÓRIO PRÁTICO
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Comutador de Modo Canônico ⇄ Boss Fight Roguelike */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setMode('proof')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                mode === 'proof'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📝 Prova Escrita
            </button>
            <button
              onClick={() => setMode('roguelike')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                mode === 'roguelike'
                  ? 'bg-red-600/30 text-red-200 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-red-400 hover:text-red-300'
              }`}
            >
              ⚔️ Boss Fight Roguelike <span className="text-[10px] bg-red-500 text-slate-950 font-black px-1 rounded-sm">+300 XP</span>
            </button>
          </div>

          {/* Abas Padrão e Hardcore (disponíveis no modo prova escrita) */}
          {mode === 'proof' && hasHardcore && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTab('standard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                  !isViewingHardcore
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                }`}
              >
                Padrão ({questions.length})
              </button>
              <button
                onClick={() => setSelectedTab('hardcore')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isViewingHardcore
                    ? 'bg-red-600/20 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                }`}
              >
                <span>⚡</span>
                <span>Hardcore 2ª Fase ({hardcoreQuestions?.length || 0})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          MODO PROVA ESCRITA (CANÔNICO PRESERVADO 100%)
         ═════════════════════════════════════════════════════════════════════ */}
      {mode === 'proof' && (
        <>
          {/* Hardcore Active Notice Banner */}
          {isHardcore && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[10px] font-extrabold tracking-wider border border-red-500/40">
                      MODO HARDCORE ATIVO
                    </span>
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {isViewingHardcore ? 'BATERIA 2ª FASE (FUVEST / UNICAMP)' : 'PENALIDADE REAL DE DANO ATIVA'}
                    </span>
                  </div>
                  <p className="text-xs text-red-300/80 font-mono mt-0.5">
                    {isViewingHardcore
                      ? 'Questões conteudistas de alto rigor analítico. Cada erro drena 20 HP do HUD.'
                      : 'Modo Hardcore habilitado: cada erro drena 20 HP da sua barra de integridade.'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-red-400 bg-red-950/60 px-2.5 py-1 rounded border border-red-800/40">
                DANO: -20 HP / ERRO
              </span>
            </div>
          )}

          <div className="space-y-8">
            {activeQuestions.map((q, i) => {
              const answeredLetter = answeredQs[q.id];
              const isAnswered = !!answeredLetter;

              return (
                <div key={q.id} className={`rounded-2xl p-6 transition-all ${
                  isViewingHardcore 
                    ? 'border-2 border-red-500/50 bg-gradient-to-b from-red-950/20 to-slate-900 shadow-[0_0_25px_rgba(239,68,68,0.15)]' 
                    : 'bg-slate-900 border border-slate-700/80 hover:border-slate-600'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`font-bold font-mono px-3 py-1 rounded text-sm border ${
                        isViewingHardcore
                          ? 'bg-red-900/40 text-red-400 border-red-500/40'
                          : 'bg-blue-900/30 text-blue-400 border-blue-500/20'
                      }`}>
                        Q{String(i+1).padStart(2, '0')}{isViewingHardcore ? ' HC' : ''}
                      </div>
                      <div className={`text-sm font-medium ${isViewingHardcore ? 'text-red-300/90 font-mono text-xs' : 'text-slate-400'}`}>
                        {isViewingHardcore ? '⚡ 2ª Fase / Rigor Analítico' : 'Treinamento Padrão'}
                      </div>
                    </div>
                    {isAnswered && (
                      <span className="text-xs font-mono text-slate-400">
                        {answeredLetter === q.options.find(o => o.isCorrect)?.letter 
                          ? <span className="text-emerald-400 font-bold">✓ ACERTOU</span> 
                          : <span className="text-red-400 font-bold">✗ ERROU</span>}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-gray-200 mb-6 text-sm leading-relaxed">
                    <MathRenderer content={q.enunciado} />
                  </div>

                  <div className="space-y-3 mb-6">
                    {q.options.map(opt => {
                      const isSelected = answeredLetter === opt.letter;
                      let btnClass = "border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 text-gray-300";
                      
                      if (isAnswered) {
                        if (opt.isCorrect) {
                          btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.01]";
                        } else if (isSelected && !opt.isCorrect) {
                          btnClass = "border-red-500 bg-red-950/40 text-red-300 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                        } else {
                          btnClass = "border-slate-800 opacity-40 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={opt.letter}
                          disabled={isAnswered}
                          onClick={() => handleAnswer(q.id, opt.letter, opt.isCorrect)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start cursor-pointer ${btnClass}`}
                        >
                          <div className="flex items-center gap-2 font-bold font-mono mt-0.5 flex-shrink-0">
                            <span>{opt.letter})</span>
                            {isAnswered && opt.isCorrect && <span className="text-emerald-400 text-xs">✓</span>}
                            {isAnswered && isSelected && !opt.isCorrect && <span className="text-red-400 text-xs">✗</span>}
                          </div>
                          <span className="text-sm leading-relaxed"><MathRenderer content={opt.text} /></span>
                        </button>
                      );
                    })}
                  </div>

                  <details open={isAnswered} className="group bg-slate-950 rounded-xl border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="p-4 cursor-pointer font-bold text-slate-200 flex items-center justify-between select-none hover:text-cyan-300 transition-colors font-mono text-xs sm:text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-blue-400">🔬</span> PARECER TÉCNICO & ANÁLISE DE ALTERNATIVAS
                      </span>
                      <span className="text-slate-400 group-open:text-cyan-400 transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-5 border-t border-slate-800 bg-slate-900/50 space-y-4">
                      {/* Card do Gabarito Oficial // Veredito */}
                      {(() => {
                        const correctOption = q.options.find(o => o.isCorrect);
                        return (
                          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-black">
                                  {correctOption ? `ALTERNATIVA ${correctOption.letter}` : 'CORRETO'}
                                </span>
                                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                  <span>✅</span> Gabarito Oficial // Veredito
                                </span>
                              </div>
                            </div>
                            {correctOption && (
                              <div className="text-xs text-emerald-200/90 font-medium pl-3 border-l-2 border-emerald-500/50 py-0.5">
                                <MathRenderer content={correctOption.text} />
                              </div>
                            )}
                            <div className="text-sm text-gray-200 leading-relaxed pt-1">
                              <MathRenderer content={q.resolution.technicalVerdict} />
                            </div>
                          </div>
                        );
                      })()}

                      {/* Micro-Cards de Distratores */}
                      {(() => {
                        const parsedDistractors = parseDistractorAnalysis(q.resolution.distractorAnalysis, q.options);
                        const incorrectOptions = q.options.filter(o => !o.isCorrect);

                        if (parsedDistractors.success) {
                          return (
                            <div className="space-y-3 pt-1">
                              <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                                <span>⚠️</span> Análise Cirúrgica dos Distratores
                              </h4>
                              <div className="grid grid-cols-1 gap-3">
                                {incorrectOptions.map(opt => {
                                  const isUserChoice = answeredLetter === opt.letter;
                                  const explanation = parsedDistractors.items[opt.letter.toUpperCase()];

                                  return (
                                    <div 
                                      key={opt.letter}
                                      className={`p-4 rounded-xl transition-all space-y-2.5 ${
                                        isUserChoice 
                                          ? 'border-2 border-red-500 bg-red-950/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                                          : 'bg-slate-950/80 border border-slate-800'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                                            isUserChoice 
                                              ? 'bg-red-900 border-red-500 text-red-200' 
                                              : 'bg-slate-800 border-slate-700 text-slate-300'
                                          }`}>
                                            ALTERNATIVA {opt.letter}
                                          </span>
                                          <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                                            <span>❌</span> Incorreta
                                          </span>
                                        </div>
                                        {isUserChoice && (
                                          <span className="px-2 py-0.5 rounded-full bg-red-950 border border-red-500 text-red-300 font-mono text-[10px] font-black animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                                            ⚠️ SUA ESCOLHA // DANO RECEBIDO
                                          </span>
                                        )}
                                      </div>

                                      <div className="text-xs text-slate-300 pl-3 border-l-2 border-slate-700 py-0.5">
                                        <MathRenderer content={opt.text} />
                                      </div>

                                      {explanation && (
                                        <div className="text-xs text-gray-300 leading-relaxed pt-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                                          <MathRenderer content={explanation} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-3 pt-1">
                            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                              <span>⚠️</span> Análise Cirúrgica dos Distratores
                            </h4>
                            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                              {answeredLetter && !q.options.find(o => o.letter === answeredLetter)?.isCorrect && (
                                <div className="p-2.5 rounded-lg border-2 border-red-500 bg-red-950/40 text-red-300 text-xs font-mono mb-2 flex items-center gap-2">
                                  <span>⚠️</span>
                                  <span>Você marcou a Alternativa {answeredLetter} (Incorreta). Confira os fundamentos abaixo:</span>
                                </div>
                              )}
                              <div className="text-sm text-gray-300 leading-relaxed">
                                <MathRenderer content={parsedDistractors.fullText} />
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </details>
                </div>
              );
            })}

            {/* Boss Fight Padrão Canônico */}
            {bossFight && (
              <div className="bg-slate-900/90 border-2 border-red-900/60 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_35px_rgba(220,38,38,0.15)] transition-all">
                <div className="absolute top-0 right-0 bg-red-900/20 text-red-500/15 font-black text-8xl -mt-6 -mr-2 select-none pointer-events-none">
                  BOSS
                </div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-900/40 text-red-400 font-bold font-mono px-3 py-1 rounded border border-red-500/40 text-sm animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                      BOSS FIGHT CANÔNICO
                    </div>
                    <div className="text-red-400 font-bold text-lg">{bossFight.title}</div>
                  </div>
                  {answeredQs['boss'] && (
                    <span className="text-xs font-mono">
                      {answeredQs['boss'] === bossFight.options.find(o => o.isCorrect)?.letter 
                        ? <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">🏆 BOSS DERROTADO</span> 
                        : <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-bold">💀 DANO CRÍTICO</span>}
                    </span>
                  )}
                </div>
                
                <div className="text-gray-200 mb-6 text-sm leading-relaxed relative z-10">
                  <MathRenderer content={bossFight.context} />
                </div>

                <div className="space-y-3 mb-6 relative z-10">
                  {bossFight.options.map(opt => {
                    const isAnswered = !!answeredQs['boss'];
                    const isSelected = answeredQs['boss'] === opt.letter;
                    let btnClass = "border-slate-700/80 hover:border-red-500/50 hover:bg-slate-800 text-gray-300";
                    
                    if (isAnswered) {
                      if (opt.isCorrect) {
                        btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]";
                      } else if (isSelected && !opt.isCorrect) {
                        btnClass = "border-red-500 bg-red-950/40 text-red-300 animate-shake shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                      } else {
                        btnClass = "border-slate-800 opacity-40 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={opt.letter}
                        disabled={isAnswered}
                        onClick={() => handleAnswer('boss', opt.letter, opt.isCorrect)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start cursor-pointer ${btnClass}`}
                      >
                        <div className="flex items-center gap-2 font-bold font-mono mt-0.5 flex-shrink-0">
                          <span>{opt.letter})</span>
                          {isAnswered && opt.isCorrect && <span className="text-emerald-400 text-xs">✓</span>}
                          {isAnswered && isSelected && !opt.isCorrect && <span className="text-red-400 text-xs">✗</span>}
                        </div>
                        <span className="text-sm leading-relaxed"><MathRenderer content={opt.text} /></span>
                      </button>
                    );
                  })}
                </div>

                <details open={!!answeredQs['boss']} className="group bg-slate-950 rounded-xl border border-red-900/50 overflow-hidden relative z-10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="p-4 cursor-pointer font-bold text-red-400 flex items-center justify-between select-none hover:text-red-300 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="text-red-500">⚔️</span> RESOLUÇÃO DO BOSS
                    </span>
                    <span className="text-red-600 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-red-900/30 bg-slate-900/80">
                    <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"><MathRenderer content={bossFight.stepByStepResolution} /></div>
                  </div>
                </details>
              </div>
            )}
          </div>
        </>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          MODO BOSS FIGHT ROGUELIKE (VIA 3 - ARENA EM TURNOS)
         ═════════════════════════════════════════════════════════════════════ */}
      {mode === 'roguelike' && (
        <div 
          className={`relative rounded-3xl border border-red-500/40 p-5 sm:p-7 overflow-hidden shadow-2xl transition-all space-y-6 ${
            bossShake ? 'boss-damaged' : ''
          } ${combat.bossRageLevel > 0 ? 'boss-rage-active' : ''}`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.94), rgba(2, 6, 23, 0.97)), url('/assets/boss/arena_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Topo do Duelo: Avatar e Barra Monolítica de 1.000 HP do Examinador */}
          <div className="relative p-5 rounded-2xl bg-slate-950/85 border border-red-500/30 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)] relative flex-shrink-0 bg-slate-900">
                  <img
                    src="/assets/boss/examiner_avatar.jpg"
                    alt="O Examinador Implacável"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950 to-slate-950 text-red-400 font-bold -z-10 text-2xl">
                    ⚖️
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white tracking-wide font-mono">
                      {bossData.title.toUpperCase()}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 font-black">
                      NÍVEL 99
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    Banca Examinadora Central // Auditoria Epistêmica da Prova
                  </p>
                  {combat.bossRageLevel > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 font-bold mt-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 animate-pulse">
                      ⚡ FÚRIA DA BANCA NÍVEL {combat.bossRageLevel} (+{combat.bossRageLevel * 5} DANO)
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs text-slate-400 uppercase tracking-widest block">INTEGRIDADE DA BANCA</span>
                <span className="text-2xl font-black text-red-400 tracking-tight">
                  {combat.bossHp} <span className="text-xs text-slate-500 font-normal">/ 1.000 HP</span>
                </span>
              </div>
            </div>

            {/* Barra de Vida Monolítica de 1.000 HP */}
            <div className="w-full bg-slate-900/90 h-5 rounded-full overflow-hidden p-0.5 border border-red-500/30 shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-red-600 via-rose-500 to-red-500 shadow-[0_0_18px_rgba(239,68,68,0.7)]"
                style={{ width: `${(combat.bossHp / combat.maxBossHp) * 100}%` }}
              />
            </div>
          </div>

          {/* HUD do Candidato: Sanidade & Estamina de Ação (3 PA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sanidade / Vida do Candidato */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <span>🧠</span> SANIDADE DO CANDIDATO
                </span>
                <span className="font-bold text-white">
                  {combat.playerHp} <span className="text-slate-500 font-normal">/ 100 HP</span>
                </span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-cyan-500/20">
                <div
                  className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                  style={{ width: `${(combat.playerHp / combat.maxPlayerHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Pontos de Ação (PA) e Habilidades Táticas */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <span>⚡</span> PONTOS DE AÇÃO (PA):
                </span>
                <div className="flex gap-2">
                  {Array.from({ length: combat.maxActionPoints }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 transform rotate-45 rounded-xs transition-all ${
                        i < combat.actionPoints
                          ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] border border-cyan-200'
                          : 'bg-slate-800 border border-slate-700 opacity-40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Botões de Habilidades Táticas */}
              <div className="flex gap-2">
                <button
                  onClick={handleUseMnemonicShield}
                  disabled={combat.actionPoints < 1 || combat.isVictory || combat.isDefeat}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 hover:bg-cyan-950/30 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  title="Elimina 1 alternativa falsa (distrator) do tabuleiro"
                >
                  <img 
                    src="/assets/boss/shield_icon.jpg" 
                    alt="Escudo" 
                    className="w-4 h-4 rounded-xs object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                  />
                  <span>🛡️ ESCUDO (-1 PA)</span>
                </button>

                <button
                  onClick={handleUseOracleSiphon}
                  disabled={combat.actionPoints < 2 || combat.oracleHintUsed || combat.isVictory || combat.isDefeat}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-[11px] font-mono font-bold text-amber-300 hover:bg-amber-950/30 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  title="Revela a fraqueza conceitual da banca"
                >
                  <span>📜 ORÁCULO (-2 PA)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enunciado do Dilema Tático */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-sm leading-relaxed text-slate-200 shadow-inner">
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-black block mb-2">
              PROPOSIÇÃO DA BANCA EXAMINADORA:
            </span>
            <MathRenderer content={bossData.prompt} />
          </div>

          {/* Modal / Alerta do Oráculo Descriptografado */}
          {showOracleModal && (
            <div className="relative p-4 rounded-xl bg-amber-950/50 border border-amber-500/60 space-y-2 animate-pulse-subtle">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                  <span>📜</span> DESCRIPTOGRAFIA DO ORÁCULO DE FOCO:
                </span>
                <button
                  onClick={() => setShowOracleModal(false)}
                  className="text-amber-400 hover:text-amber-200 text-xs font-mono cursor-pointer font-bold"
                >
                  [FECHAR ✕]
                </button>
              </div>
              <div className="text-xs font-mono text-amber-200 leading-relaxed pl-2 border-l-2 border-amber-500/50">
                <MathRenderer content={bossData.weaknessClue} />
              </div>
            </div>
          )}

          {/* Alternativas de Ataque (Golpes de Tese) */}
          <div className="relative grid grid-cols-1 gap-3">
            {bossData.options.map((opt, idx) => {
              const letter = bossData.letters[idx] || String.fromCharCode(65 + idx);
              const isEliminated = combat.eliminatedDistractors.includes(opt);

              if (isEliminated) {
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-dashed border-slate-800 bg-slate-950/50 text-slate-600 text-xs font-mono line-through opacity-50 flex items-center gap-3"
                  >
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 text-[10px] font-bold">
                      [{letter}]
                    </span>
                    <span className="text-red-500/70 font-bold">🛡️ [SOFISMA VAPORIZADO PELO ESCUDO]</span>
                    <span className="truncate flex-1">{opt}</span>
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAttack(idx)}
                  disabled={combat.isVictory || combat.isDefeat}
                  className="group p-4 text-left rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-start gap-3 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-red-400 text-[10px] font-bold group-hover:border-red-500 flex-shrink-0">
                    🗡️ GOLPE [{letter}]
                  </span>
                  <span className="flex-1 leading-relaxed text-sm">
                    <MathRenderer content={opt} />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-red-400 text-xs transition-opacity font-bold flex-shrink-0 flex items-center gap-1">
                    [DESFERIR ➔]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Banner de Vitória Épica */}
          {combat.isVictory && (
            <div className="relative p-6 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500 text-center space-y-3 shadow-[0_0_35px_rgba(16,185,129,0.35)] animate-bounce-subtle">
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono flex items-center justify-center gap-2">
                <span>🏆</span> VITÓRIA ÉPICA: O EXAMINADOR FOI REFUTADO! <span>🏆</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-emerald-200 max-w-xl mx-auto leading-relaxed">
                Sua tese axiomática desarmou todos os sofismas da banca examinadora com rigor impecável. 
                A recompensa de <strong className="text-amber-300 font-black">+300 XP</strong> foi transferida para o seu perfil tático!
              </p>
            </div>
          )}

          {/* Banner de Derrota / Sanidade Esgotada */}
          {combat.isDefeat && (
            <div className="relative p-6 rounded-2xl bg-red-950/60 border-2 border-red-500 text-center space-y-4 shadow-[0_0_35px_rgba(239,68,68,0.4)]">
              <div className="text-xl sm:text-2xl font-black text-red-400 font-mono flex items-center justify-center gap-2">
                <span>💀</span> SANIDADE ESGOTADA: VOCÊ FOI ANULADO PELA BANCA
              </div>
              <p className="text-xs sm:text-sm font-mono text-red-200 max-w-xl mx-auto leading-relaxed">
                Os sofismas e contra-ataques drenaram sua estamina. Rearme sua fundamentação e tente novamente com a mente lúcida.
              </p>
              <button
                onClick={() => setCombat(initBossCombat())}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>🔄</span> REINICIAR DUELO COM A BANCA
              </button>
            </div>
          )}

          {/* Terminal de Logs de Batalha */}
          <div className="relative p-4 rounded-xl bg-slate-950/95 border border-slate-800/90 font-mono text-[11px] max-h-36 overflow-y-auto space-y-1.5 shadow-inner">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800/80 pb-1 mb-2">
              TERMINAL DE AUDITORIA & REGISTRO DE COMBATE //
            </div>
            {combat.combatLog.map((log) => (
              <div
                key={log.id}
                className={`${
                  log.type === 'crit'
                    ? 'text-emerald-400 font-bold'
                    : log.type === 'boss'
                    ? 'text-red-400'
                    : log.type === 'system'
                    ? 'text-cyan-300'
                    : 'text-slate-300'
                }`}
              >
                {log.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
