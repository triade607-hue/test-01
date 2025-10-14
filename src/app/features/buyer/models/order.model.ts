import { OrderStatus } from '../enums/order-status.enum';

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  shippingCost: number;
  taxAmount: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
  sellerId: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
