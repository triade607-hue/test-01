export interface Reservation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  price: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'expired' | 'cancelled';
  createdAt: Date;
}
