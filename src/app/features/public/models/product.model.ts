export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  brand?: string;
  size?: string;
  color?: string;
  sellerId: string;
  sellerName: string;
  location: string;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;
  shipping: {
    local: boolean;
    international: boolean;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  };
}
