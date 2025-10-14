export interface DeliveryMethod {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: number;
  cost: number;
  description?: string;
  isExpressDelivery: boolean;
  isInternational: boolean;
}
