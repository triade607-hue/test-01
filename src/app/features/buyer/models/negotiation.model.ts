import { NegotiationStatus } from '../enums/negotiation-status.enum';

export interface Negotiation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  originalPrice: number;
  proposedPrice: number;
  counterOffer?: number;
  status: NegotiationStatus;
  message?: string;
  createdAt: Date;
  expiresAt: Date;
}
