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
 * Constrói a lista de casos de inspeção enriquecidos com gatilhos de contradição,
 * pareamento determinístico de evidências (Dossiê ↔ Manual) e carimbos de razão (Fase 2B).
 */
export const buildInspectionCases = (card: MestreCardData): InspectionCase[] => {
  const cases = generateInspectionCases(card);
  return cases.map((c) => {
    if (c.isFraudulent && !c.targetRuleId) {
      c.targetRuleId = card.sec04_radar?.blindSpots?.length ? 'rule-trap-0' : 'rule-theory-0';
    }
    if (c.isFraudulent && !c.denialReason) {
      c.denialReason = 'ANOMALIA: VIOLAÇÃO CONCEITUAL';
    }
    return c;
  });
};
