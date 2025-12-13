import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
  variant1: { label: string; value: string };
  variant2: { label: string; value: string };
  hasConformityCheck: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status:
    | 'preparation'
    | 'conformity_check'
    | 'shipped'
    | 'delivered'
    | 'completed';
  products: OrderProduct[];
  vendor: {
    name: string;
    avatar: string;
    country: string;
    countryFlag: string;
  };
  total: number;
  currency: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent {
  activeTab: 'in_progress' | 'completed' = 'in_progress';
  activeDropdownId: string | null = null;

  orders: Order[] = [
    {
      id: '1',
      orderNumber: 'SMSG142644NOJDSKC14',
      date: '23 Janvier 2025',
      status: 'preparation',
      products: [
        {
          id: 'p1',
          name: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
          price: 1500,
          currency: '$CAD',
          quantity: 15,
          variant1: { label: 'Variante 1', value: 'valeure' },
          variant2: { label: 'Variante 2', value: 'valeure' },
          hasConformityCheck: false,
        },
      ],
      vendor: {
        name: 'Djibril Abeg',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
        country: 'Ca',
        countryFlag: '🇨🇦',
      },
      total: 0.99,
      currency: '€',
      isExpanded: false,
    },
    {
      id: '2',
      orderNumber: 'SMSG142644NOJDSKC14',
      date: '23 Janvier 2025',
      status: 'conformity_check',
      products: [
        {
          id: 'p2',
          name: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
          price: 1500,
          currency: '$CAD',
          quantity: 15,
          variant1: { label: 'Variante 1', value: 'valeure' },
          variant2: { label: 'Variante 2', value: 'valeure' },
          hasConformityCheck: true,
        },
        {
          id: 'p3',
          name: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
          price: 1500,
          currency: '$CAD',
          quantity: 15,
          variant1: { label: 'Variante 1', value: 'valeure' },
          variant2: { label: 'Variante 2', value: 'valeure' },
          hasConformityCheck: true,
        },
        {
          id: 'p4',
          name: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
          price: 1500,
          currency: '$CAD',
          quantity: 15,
          variant1: { label: 'Variante 1', value: 'valeure' },
          variant2: { label: 'Variante 2', value: 'valeure' },
          hasConformityCheck: true,
        },
      ],
      vendor: {
        name: 'Djibril Abeg',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
        country: 'Ca',
        countryFlag: '🇨🇦',
      },
      total: 0.99,
      currency: '€',
      isExpanded: true,
    },
  ];

  get filteredOrders(): Order[] {
    if (this.activeTab === 'in_progress') {
      return this.orders.filter((o) =>
        ['preparation', 'conformity_check', 'shipped'].includes(o.status)
      );
    }
    return this.orders.filter((o) =>
      ['delivered', 'completed'].includes(o.status)
    );
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      preparation: 'Préparation',
      conformity_check: 'Contrôle de conformité',
      shipped: 'Expédié',
      delivered: 'Livré',
      completed: 'Terminé',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      preparation: 'bg-orange-100 text-orange-700',
      conformity_check: 'bg-primary-100 text-primary-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  }

  toggleExpand(order: Order): void {
    order.isExpanded = !order.isExpanded;
  }

  toggleDropdown(orderId: string, event: Event): void {
    event.stopPropagation();
    this.activeDropdownId = this.activeDropdownId === orderId ? null : orderId;
  }

  closeDropdown(): void {
    this.activeDropdownId = null;
  }

  onOrderDetail(orderId: string): void {
    this.closeDropdown();
    console.log('Navigate to order detail:', orderId);
  }

  onOrderTracking(orderId: string): void {
    this.closeDropdown();
    console.log('Navigate to order tracking:', orderId);
  }

  onDeliverySlip(orderId: string): void {
    this.closeDropdown();
    console.log('Download delivery slip:', orderId);
  }

  onContactVendor(orderId: string): void {
    this.closeDropdown();
    console.log('Contact vendor for order:', orderId);
  }
}
