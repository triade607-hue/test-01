import { ProductStatus } from '../enums/product-status.enum';

export interface SellerProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  stock: number;
  status: ProductStatus;
  brand?: string;
  size?: string;
  color?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}
