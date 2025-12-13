import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

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

interface OrderDetail {
  id: string;
  orderNumber: string;
  products: OrderProduct[];
  vendor: {
    name: string;
    avatar: string;
    country: string;
    countryFlag: string;
  };
  total: number;
  currency: string;
  delivery: {
    address: string;
    toOccaverse: string;
    toCustomer: string;
  };
  payment: {
    method: string;
    icon: string;
  };
}

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
})
export class PurchaseDetailComponent implements OnInit {
  orderId: string = '';

  order: OrderDetail = {
    id: '1',
    orderNumber: 'SMSG125522555DKF65',
    products: [
      {
        id: 'p1',
        name: 'Dénomination du produit allant sur deux lignes mais pas plus...',
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
        price: 250.99,
        currency: '$CAD',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'Valeur' },
        variant2: { label: 'Variante 2', value: 'Valeur' },
        hasConformityCheck: true,
      },
      {
        id: 'p2',
        name: 'Dénomination du produit allant sur deux lignes mais pas plus...',
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
        price: 250.99,
        currency: '$CAD',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'Valeur' },
        variant2: { label: 'Variante 2', value: 'Valeur' },
        hasConformityCheck: true,
      },
    ],
    vendor: {
      name: 'NomVendeur',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      country: 'Ca',
      countryFlag: '🇨🇦',
    },
    total: 501.98,
    currency: '€',
    delivery: {
      address: '@MonAdresseDeLivraisonVersChezMoi',
      toOccaverse: 'Colissimo',
      toCustomer: 'Mondial Relai',
    },
    payment: {
      method: 'PayPal',
      icon: 'paypal',
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
  }
}
