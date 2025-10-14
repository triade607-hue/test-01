export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
  sellerId: string;
  sellerName: string;
  shippingCost: number;
  selectedColor?: string;
  selectedSize?: string;
}
