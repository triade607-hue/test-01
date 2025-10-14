export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  brand?: string;
  size?: string;
  color?: string;
  stock: number;
  images: File[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shipping: {
    local: boolean;
    international: boolean;
  };
}
