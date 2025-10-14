export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  cardLastFour?: string;
  cardBrand?: string;
  cardExpiry?: string;
  paypalEmail?: string;
  bankName?: string;
  bankAccountNumber?: string;
  isDefault: boolean;
  createdAt: Date;
}
