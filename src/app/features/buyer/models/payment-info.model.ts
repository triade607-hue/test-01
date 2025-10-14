export interface PaymentInfo {
  method: 'card' | 'paypal' | 'bank_transfer';
  cardLastFour?: string;
  cardBrand?: string;
  paypalEmail?: string;
  bankName?: string;
  isDefault: boolean;
}
