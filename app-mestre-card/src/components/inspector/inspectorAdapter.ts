/**
 * Mapeador e Adaptador de Casos de Auditoria Documental
 * Operação Papers, Please (MKA - Ministério da Validação Acadêmica)
 * Fase 2A: Modo Interrogatório & Boletim Diário de Fim de Expediente
 */
import { generateInspectionCases } from '../../lib/inspection-engine';
import type { MestreCardData, InspectionCase } from '../../types/mestre-card';

export * from '../../lib/inspection-engine';
export type { InspectionCase, InterrogationDialog, InspectionVerdict, InspectionResultRecord } from '../../types/mestre-card';

/**
 * Constrói a lista de casos de inspeção enriquecidos com gatilhos de contradição
 * e árvore de interrogatório teletipo para confronto dialético.
 */
export const buildInspectionCases = (card: MestreCardData): InspectionCase[] => {
  return generateInspectionCases(card);
};
