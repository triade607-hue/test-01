import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  ComplianceDetailModalComponent,
  ComplianceProduct,
  ComplianceStep,
  ComplianceResult,
} from '../../../components/compliance-detail-modal/compliance-detail-modal.component';

interface ComplianceItem {
  id: string;
  product: {
    name: string;
    image: string;
    price: number;
    currency: string;
    quantity: number;
    variant1: { label: string; value: string };
    variant2: { label: string; value: string };
  };
  status: 'compliant' | 'non_compliant' | 'pending';
}

@Component({
  selector: 'app-compliance-report',
  standalone: true,
  imports: [CommonModule, RouterLink, ComplianceDetailModalComponent],
  templateUrl: './compliance-report.component.html',
  styleUrls: ['./compliance-report.component.scss'],
})
export class ComplianceReportComponent implements OnInit {
  orderId: string = '';
  orderNumber: string = 'SMSG52455454JKFD564';
  showDropdown: boolean = false;
  showDetailModal: boolean = false;
  selectedProduct: ComplianceProduct | null = null;
  selectedResult: ComplianceResult | null = null;

  items: ComplianceItem[] = [
    {
      id: '1',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'pending',
    },
    {
      id: '2',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'non_compliant',
    },
    {
      id: '3',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'compliant',
    },
    {
      id: '4',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'pending',
    },
    {
      id: '5',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'non_compliant',
    },
    {
      id: '6',
      product: {
        name: 'Nom du produit',
        image:
          'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80&h=80&fit=crop',
        price: 1500,
        currency: '$CAD',
        quantity: 15,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'compliant',
    },
  ];

  defaultSteps: ComplianceStep[] = [
    {
      id: 1,
      title:
        "EFFECTIVITE DU PRODUIT EXPEDIE PAR LE VENDEUR EN REFERENCE A L'ANNONCE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor.',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'VERIFICATION DE LA COMPLETUDE DE LA COMMANDE',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title:
        "NON CONFORMITE DU PRODUIT PAR RAPPORT A LA DESCRIPTION DE L'ANNONCE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor.',
      image:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=200&fit=crop',
    },
    {
      id: 4,
      title: "VERIFICATION DE L'ETAT GENERAL DE L'ARTICLE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'TESTS BASIC DE FONCTIONNEMENT POUR LES APPAREILS ELECTRONIQUES',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'compliant':
        return 'check';
      case 'non_compliant':
        return 'x';
      case 'pending':
        return 'clock';
      default:
        return 'clock';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'compliant':
        return 'bg-green-500';
      case 'non_compliant':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  openDetailModal(item: ComplianceItem): void {
    this.selectedProduct = {
      name: item.product.name,
      price: item.product.price,
      currency: item.product.currency,
      quantity: item.product.quantity,
      variant1: item.product.variant1,
      variant2: item.product.variant2,
      image: item.product.image,
    };
    this.selectedResult = {
      isCompliant: item.status === 'compliant',
      message:
        item.status === 'compliant'
          ? 'Votre commande est conforme à la description du Vendeur. Elle sera remis au Transporteur dans les 48H.'
          : "Mauvaise nouvelle, après vérification, un ou plusieurs produit(s) de votre commande n'est pas conforme à sa description.",
    };
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedProduct = null;
    this.selectedResult = null;
  }
}
