import React from 'react';
import { InspectionDesk as ArcadeInspectionDesk } from '../arcade/InspectionDesk';
import type { MestreCardData } from '../../types/mestre-card';

export interface InspectionDeskProps {
  card: MestreCardData;
  onClose?: () => void;
  onApplyDamage?: (amount: number) => void;
}

export const InspectionDesk: React.FC<InspectionDeskProps> = (props) => {
  return <ArcadeInspectionDesk {...props} />;
};

export default InspectionDesk;
