import React, { useEffect } from 'react';
import { playVictorySound, playDamageSound } from '../../lib/audio';

export interface ShiftStats {
  totalProcessed: number;
  correctApprovals?: number;
  correctDenials?: number;
  correctVerdicts?: number;
  infractions?: number;
  citationsReceived?: number;
  fraudsIntercepted?: number;
  score?: number;
  xpEarned?: number;
}

export interface DailyShiftModalProps {
  isOpen: boolean;
  stats: ShiftStats;
  cardTitle?: string;
  topic?: string;
  soundEnabled?: boolean;
  onRestartShift: () => void;
  onClose: () => void;
  onExitToArcade?: () => void;
}

export const DailyShiftModal: React.FC<DailyShiftModalProps> = ({
  isOpen,
  stats,
  cardTitle,
  topic,
  soundEnabled = true,
  onRestartShift,
  onClose,
  onExitToArcade,
}) => {
  if (!isOpen) return null;

  const title = cardTitle || topic || 'TÓPICO NÃO ESPECIFICADO';
  const handleExit = onExitToArcade || onClose;

  const correctApprovals = stats.correctApprovals ?? (stats.correctVerdicts ? Math.max(0, stats.correctVerdicts - (stats.fraudsIntercepted ?? 0)) : 0);
  const correctDenials = stats.correctDenials ?? stats.fraudsIntercepted ?? 0;
  const infractions = stats.infractions ?? stats.citationsReceived ?? 0;
  const totalHits = correctApprovals + correctDenials;

  const accuracy = stats.totalProcessed > 0
    ? Math.round((totalHits / stats.totalProcessed) * 100)
    : 0;

  const isElite = accuracy >= 80;
  const isApto = accuracy >= 50 && accuracy < 80;

  useEffect(() => {
    if (isOpen && soundEnabled) {
      if (isElite || isApto) {
        playVictorySound(true);
      } else {
        playDamageSound(true);
      }
    }
  }, [isOpen, isElite, isApto, soundEnabled]);

  const approvalCredits = correctApprovals * 100;
  const denialCredits = correctDenials * 150;
  const infractionPenalties = infractions * 100;
  const netEarnings = Math.max(0, approvalCredits + denialCredits - infractionPenalties);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Folha Contínua de Expediente Retrô Anos 80 */}
      <div 
        className="relative w-full max-w-2xl rounded-lg p-6 sm:p-8 bg-[#ece2cd] text-[#2c221a] shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-4 border-[#5c4a3b] font-mono select-none overflow-hidden my-6"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent 0px, transparent 23px, rgba(92,74,59,0.07) 24px)
          `
        }}
      >
        {/* Clipe metálico de latão no canto superior */}
        <div className="absolute top-2 left-6 w-8 h-2 bg-[#8c7853] border border-[#4a3b25] rounded-sm shadow-md rotate-[-8deg] z-20"></div>

        {/* Marca d'água de carimbo oficial no fundo */}
        <div 
          className="absolute right-4 bottom-12 opacity-10 pointer-events-none transform rotate-[-15deg] select-none"
          style={{ width: '220px', height: '220px' }}
        >
          <img 
            src="./inspection/stamp_approved.jpg" 
            alt="Watermark" 
            className="w-full h-full object-cover filter contrast-150"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
        </div>

        {/* Cabeçalho Oficial do Ministério */}
        <div className="border-b-2 border-[#5c4a3b] pb-4 mb-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] tracking-widest text-[#7a6450] font-black uppercase">
              MKA // DIVISÃO DE CONTROLE DE FRONTEIRA ACADÊMICA
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a140e] uppercase">
              RELATÓRIO DIÁRIO DE EXPEDIENTE
            </h2>
            <p className="text-xs text-[#5c4a3b] font-semibold">
              POSTO DE TRIAGEM: <span className="text-black font-bold">{title.toUpperCase()}</span>
            </p>
          </div>

          <div className="w-16 h-16 rounded-full border-2 border-[#5c4a3b] bg-black p-0.5 shadow-inner shrink-0 hidden sm:block">
            <img 
              src="./inspection/ministry-seal.jpg" 
              alt="MKA Seal" 
              className="w-full h-full object-cover rounded-full filter grayscale contrast-125"
            />
          </div>
        </div>

        {/* Tabela Pautada Datilografada */}
        <div className="space-y-3 mb-6 text-xs sm:text-sm">
          <div className="grid grid-cols-12 font-bold text-[11px] text-[#7a6450] border-b border-[#5c4a3b]/40 pb-1 uppercase tracking-wider">
            <div className="col-span-6 sm:col-span-7">RUBRICA DO DESPACHO</div>
            <div className="col-span-3 sm:col-span-2 text-center">QUANTIDADE</div>
            <div className="col-span-3 text-right">BALANÇO</div>
          </div>

          <div className="grid grid-cols-12 items-center py-1 border-b border-[#5c4a3b]/20">
            <div className="col-span-6 sm:col-span-7 font-bold text-black flex items-center gap-1.5">
              <span>📋</span> <span>Dossiês Submetidos</span>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center font-black">
              {stats.totalProcessed}
            </div>
            <div className="col-span-3 text-right text-stone-600 font-mono">
              Registrado
            </div>
          </div>

          <div className="grid grid-cols-12 items-center py-1 border-b border-[#5c4a3b]/20">
            <div className="col-span-6 sm:col-span-7 font-bold text-emerald-900 flex items-center gap-1.5">
              <span>✅</span> <span>Homologações Conformes</span>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center font-black text-emerald-800">
              {stats.correctApprovals}
            </div>
            <div className="col-span-3 text-right font-black text-emerald-700">
              +{approvalCredits} XP
            </div>
          </div>

          <div className="grid grid-cols-12 items-center py-1 border-b border-[#5c4a3b]/20">
            <div className="col-span-6 sm:col-span-7 font-bold text-blue-950 flex items-center gap-1.5">
              <span>⛔</span> <span>Fraudes Interceptadas</span>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center font-black text-blue-900">
              {stats.correctDenials}
            </div>
            <div className="col-span-3 text-right font-black text-blue-700">
              +{denialCredits} XP
            </div>
          </div>

          <div className="grid grid-cols-12 items-center py-1 border-b-2 border-[#5c4a3b] pb-2">
            <div className="col-span-6 sm:col-span-7 font-bold text-red-900 flex items-center gap-1.5">
              <span>⚠️</span> <span>Infrações M.O.A. (Erros de Triagem)</span>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center font-black text-red-700">
              {stats.infractions}
            </div>
            <div className="col-span-3 text-right font-black text-red-700">
              -{infractionPenalties} XP
            </div>
          </div>

          {/* Saldo Líquido do Turno */}
          <div className="p-3 rounded bg-[#dfd3bc] border border-[#b5a38a] flex items-center justify-between mt-3 shadow-inner">
            <span className="font-black text-sm uppercase text-[#1a140e]">
              SALDO LÍQUIDO DO EXPEDIENTE:
            </span>
            <span className="text-base sm:text-lg font-black text-[#1a140e]">
              {netEarnings} PONTOS
            </span>
          </div>
        </div>

        {/* Avaliação Disciplinar do Ministério */}
        <div className="p-4 rounded-lg bg-black/5 border-2 border-[#5c4a3b] mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs border-b border-[#5c4a3b]/30 pb-1.5">
            <span className="font-bold text-[#7a6450] uppercase">ÍNDICE DE ACERTO DOCUMENTAL:</span>
            <span className="font-black text-base text-black">{accuracy}%</span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="text-2xl">
              {isElite ? '🎖️' : isApto ? '📑' : '🚨'}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-black uppercase tracking-wider">
                {isElite && <span className="text-emerald-800">CLASSIFICAÇÃO: SOBERANO // CONDECORAÇÃO DE ELITE</span>}
                {isApto && <span className="text-amber-800">CLASSIFICAÇÃO: APTO // EXPEDIENTE REGULAR</span>}
                {!isElite && !isApto && <span className="text-red-800 font-bold">CLASSIFICAÇÃO: SOB INVESTIGAÇÃO DISCIPLINAR</span>}
              </div>
              <p className="text-xs text-[#4a3a2a] leading-relaxed">
                {isElite && "Desempenho irrepreensível no posto de auditoria. Todas as falácias da banca foram identificadas com rigor absoluto."}
                {isApto && "Turno concluído com margem satisfatória. Mantenha vigilância redobrada contra pegadinhas semânticas nos próximos lotes."}
                {!isElite && !isApto && "Número crítico de anomalias passou despercebido. Recomenda-se estudo compulsório do Manual de Leis antes do próximo turno."}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé e Botões Táticos de Despacho */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={onRestartShift}
            className="w-full sm:w-auto px-6 py-3 rounded bg-[#3b2b1e] hover:bg-[#523d2b] text-amber-300 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#6e5339] flex items-center justify-center gap-2"
          >
            <span>🔄</span> <span>INICIAR NOVO TURNO</span>
          </button>

          <button
            onClick={handleExit}
            className="w-full sm:w-auto px-6 py-3 rounded bg-[#8a2424] hover:bg-[#a62d2d] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#591414] flex items-center justify-center gap-2"
          >
            <span>🏢</span> <span>ENCERRAR E RETORNAR AO QG</span>
          </button>
        </div>

        {/* Carimbo de Registro Oficial */}
        <div className="text-center text-[10px] text-[#7a6450] mt-4 uppercase">
          MKA REGISTRO 44.912 • GLÓRIA AO MINISTÉRIO DA VALIDAÇÃO
        </div>
      </div>
    </div>
  );
};
