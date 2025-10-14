export interface Sale {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  commission: number;
  netAmount: number;
  currency: string;
  buyerId: string;
  buyerName: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  saleDate: Date;
  paymentDate?: Date;
}
