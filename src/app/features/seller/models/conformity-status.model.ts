import { ConformityStatus } from '../enums/conformity-status.enum';

export interface ConformityCheck {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  checkDate: Date;
  status: ConformityStatus;
  inspector: string;
  notes?: string;
  issues?: ConformityIssue[];
  photos?: string[];
}

export interface ConformityIssue {
  type: 'physical' | 'functional' | 'packaging' | 'documentation';
  description: string;
  severity: 'minor' | 'major' | 'critical';
}
