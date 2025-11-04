import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Address, AddressSelectorComponent } from '../../components/address-selector/address-selector.component';
import { DeliveryAlertComponent } from '../../components/delivery-alert/delivery-alert.component';
import { DeliveryMethod, DeliveryMethodSelectorComponent } from '../../components/delivery-method-selector/delivery-method-selector.component';
import { DeliveryOption, DeliveryOptionSelectorComponent } from '../../components/delivery-option-selector/delivery-option-selector.component';
import { OrderSummaryComponent, OrderSummaryData } from '../../components/order-summary/order-summary.component';
import { PaymentMethodSelectorComponent, PaymentMethod } from '../../components/payment-method-selector/payment-method-selector.component';


export interface VendorArticle {
  vendorId: string;
  vendorName: string;
  vendorCountry: string;
  articlePrice: number;
  totalPrice: number;
  deliveryFees: number;
  hasConformityControl: boolean;
}

interface VendorDeliveryConfig {
  vendor: VendorArticle;
  isExpanded: boolean;
  hasWithConformity?: boolean;
  hasWithoutConformity?: boolean;
  // Pour produits sans contrôle
  selectedAddress: Address | null;
  selectedMethod: DeliveryMethod | null;
  selectedOption: DeliveryOption | null;
  // Pour produits avec contrôle
  toOccaverseAddress: Address | null;
  toOccaverseMethod: DeliveryMethod | null;
  toOccaverseOption: DeliveryOption | null;
  toUserMethod: DeliveryMethod | null;
  toUserOption: DeliveryOption | null;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    DeliveryAlertComponent,
    AddressSelectorComponent,
    DeliveryMethodSelectorComponent,
    DeliveryOptionSelectorComponent,
    PaymentMethodSelectorComponent,
    OrderSummaryComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Votre panier', url: '/cart' },
    { label: 'Livraison', isActive: true },
  ];

  addresses: Address[] = [];
  deliveryMethods: DeliveryMethod[] = [];
  deliveryOptions: DeliveryOption[] = [];
  paymentMethods: PaymentMethod[] = [];

  vendorConfigs: VendorDeliveryConfig[] = [];
  selectedPaymentMethod: PaymentMethod | null = null;

  orderSummary: OrderSummaryData = {
    subtotal: 752.97,
    occaverseFees: 75.297,
    conformityFees: 7.5297,
    deliveryFees: 0,
    total: 835.8,
    itemCount: 3,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.loadDeliveryMethods();
    this.loadPaymentMethods();
    this.loadVendorArticles();
  }

  loadAddresses(): void {
    this.addresses = [
      {
        id: '1',
        fullName: 'John Doe',
        street: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        isDefault: true,
      },
      {
        id: '2',
        fullName: 'John Doe',
        street: '456 Avenue des Champs',
        city: 'Lyon',
        postalCode: '69001',
        country: 'France',
      },
    ];
  }

  loadDeliveryMethods(): void {
    this.deliveryMethods = [
      {
        id: 'mondial-relay',
        name: 'Mondial Relay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Mondial_Relay_logo.svg/320px-Mondial_Relay_logo.svg.png',
        description: 'Point relais',
      },
      {
        id: 'colissimo',
        name: 'Colissimo',
        logo: 'https://www.colissimo.entreprise.laposte.fr/sites/default/files/styles/max_325x325/public/2021-03/logo-colissimo.png',
        description: 'La Poste',
      },
    ];
  }

  loadPaymentMethods(): void {
    this.paymentMethods = [
      {
        id: 'paypal',
        name: 'PayPal',
        logo: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg',
        type: 'paypal',
      },
      {
        id: 'card',
        name: 'Carte bancaire',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png',
        type: 'card',
      },
    ];
  }

  loadVendorArticles(): void {
    this.vendorConfigs = [
      {
        vendor: {
          vendorId: '1',
          vendorName: 'Jean Dupont',
          vendorCountry: 'CA',
          articlePrice: 501.98,
          totalPrice: 501.98,
          deliveryFees: 0,
          hasConformityControl: false,
        },
        isExpanded: true,
        selectedAddress: null,
        selectedMethod: null,
        selectedOption: null,
        toOccaverseAddress: null,
        toOccaverseMethod: null,
        toOccaverseOption: null,
        toUserMethod: null,
        toUserOption: null,
        hasWithConformity: true,
        hasWithoutConformity: true,
      },
    ];
  }

  onMethodSelected(
    vendorConfig: VendorDeliveryConfig,
    method: DeliveryMethod
  ): void {
    this.loadDeliveryOptionsForMethod(method.id);
  }

  loadDeliveryOptionsForMethod(methodId: string): void {
    if (methodId === 'mondial-relay') {
      this.deliveryOptions = [
        {
          id: 'mr-point-relais',
          name: 'Point relais',
          price: 2.5,
          estimatedDays: '3-5 jours',
        },
        {
          id: 'mr-domicile',
          name: 'Livraison à domicile',
          price: 10,
          estimatedDays: '2-4 jours',
        },
      ];
    } else if (methodId === 'colissimo') {
      this.deliveryOptions = [
        {
          id: 'col-standard',
          name: 'Colissimo standard',
          price: 5,
          estimatedDays: '2-3 jours',
        },
        {
          id: 'col-express',
          name: 'Colissimo express',
          price: 15,
          estimatedDays: '24h',
        },
      ];
    }
  }

  onOptionSelected(option: DeliveryOption): void {
    this.orderSummary = {
      ...this.orderSummary,
      deliveryFees: option.price,
      total:
        this.orderSummary.subtotal +
        this.orderSummary.occaverseFees +
        this.orderSummary.conformityFees +
        option.price,
    };
  }

  onAddAddress(): void {
    this.router.navigate(['/settings/addresses/add']);
  }

  onDeliveryFeesClick(event: Event): void {
    event.stopPropagation();
    console.log('Afficher les frais de livraison');
  }

  onPayment(): void {
    if (!this.selectedPaymentMethod) {
      alert('Veuillez sélectionner un moyen de paiement');
      return;
    }

    const allConfigured = this.vendorConfigs.every((config) => {
      if (config.vendor.hasConformityControl) {
        return (
          config.toOccaverseAddress &&
          config.toOccaverseMethod &&
          config.toUserMethod
        );
      } else {
        return config.selectedAddress && config.selectedMethod;
      }
    });

    if (!allConfigured) {
      alert('Veuillez configurer toutes les livraisons');
      return;
    }

    console.log('Proceeding to payment...', {
      vendorConfigs: this.vendorConfigs,
      paymentMethod: this.selectedPaymentMethod,
      summary: this.orderSummary,
    });

    this.router.navigate(['/cart/order-confirmation']);
  }

  getVendorInitials(vendor: VendorArticle): string {
    const parts = vendor.vendorName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return vendor.vendorName.substring(0, 2).toUpperCase();
  }
}
