import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  CartItemComponent,
  CartItemData,
} from '../../components/cart-item/cart-item.component';
import {
  VendorGroupComponent,
  VendorGroup,
} from '../../components/vendor-group/vendor-group.component';
import {
  CartSummaryComponent,
  CartSummary,
} from '../../components/cart-summary/cart-summary.component';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Product, ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

interface RewardItem {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
  };
  type: 'occaverse-reward';
  selected: boolean;
}

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumbComponent,
    ProductCardComponent,
    VendorGroupComponent,
    CartSummaryComponent,
  ],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Votre Panier', isActive: true },
  ];

  vendorGroups: VendorGroup[] = [];
  rewardItems: RewardItem[] = [];
  occaverseItem: any = null;
  cartSummary!: CartSummary;
  suggestedProducts: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartData();
    this.loadSuggestedProducts();
  }

  loadCartData(): void {
    // Mock data - Groupes de vendeurs
    this.vendorGroups = [
      {
        vendor: {
          name: 'nomvendeur',
          avatar: '',
          country: 'Ca',
          countryFlag: '🇨🇦',
          isVerified: true,
        },
        items: [
          {
            id: '1',
            product: {
              id: 'p1',
              title:
                'Dénomination du produit allant sur deux lignes mais pas plus...',
              image:
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
              price: 150.998,
              currency: '$CAD',
              stock: 10,
            },
            quantity: 1,
            selected: true,
            conformityCheck: true,
          },
          {
            id: '2',
            product: {
              id: 'p2',
              title:
                'Dénomination du produit allant sur deux lignes mais pas plus...',
              image:
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
              price: 150.998,
              currency: '$CAD',
              stock: 5,
            },
            quantity: 1,
            variant1: 'Garantie | Veille',
            variant2: 'Garantie | Veille',
            selected: true,
            conformityCheck: true,
          },
        ],
        totalPrice: 501.98,
        currency: '€',
        discountRequested: true,
        discountPending: false,
      },
      {
        vendor: {
          name: 'nomvendeur',
          avatar: '',
          country: 'Ca',
          countryFlag: '🇨🇦',
          isVerified: true,
        },
        items: [
          {
            id: '3',
            product: {
              id: 'p3',
              title:
                'Dénomination du produit allant sur deux lignes mais pas plus...',
              image:
                'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
              price: 150.998,
              currency: '$CAD',
              stock: 8,
            },
            quantity: 1,
            variant1: 'Garantie | Veille',
            variant2: 'Garantie | Veille',
            selected: true,
            conformityCheck: true,
          },
          {
            id: '4',
            product: {
              id: 'p4',
              title:
                'Dénomination du produit allant sur deux lignes mais pas plus...',
              image:
                'https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&h=200&fit=crop',
              price: 150.998,
              currency: '$CAD',
              stock: 15,
            },
            quantity: 1,
            variant1: 'Garantie | Veille',
            variant2: 'Garantie | Veille',
            selected: false,
            conformityCheck: false,
          },
        ],
        totalPrice: 501.98,
        currency: '€',
        discountPending: true,
      },
    ];

    // Récompenses OCCAVERSE
    this.rewardItems = [
      {
        id: 'r1',
        product: {
          id: 'pr1',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image:
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop',
        },
        type: 'occaverse-reward',
        selected: false,
      },
      {
        id: 'r2',
        product: {
          id: 'pr2',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image:
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop',
        },
        type: 'occaverse-reward',
        selected: false,
      },
    ];

    // Item OCCAVERSE spécial
    this.occaverseItem = {
      id: 'occ1',
      selected: false,
    };

    // Calculer le récapitulatif
    this.calculateSummary();
  }

  loadSuggestedProducts(): void {
    // Mock data - Produits suggérés
    const images = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    ];

    for (let i = 0; i < 8; i++) {
      this.suggestedProducts.push({
        id: `sugg-${i + 1}`,
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: images[i % images.length],
        price: Math.floor(Math.random() * 200) + 10,
        currency: '$CAD',
        vendor: {
          name: 'Vendeur',
          flags: ['🇫🇷'],
          isVerified: true,
        },
        clics: Math.floor(Math.random() * 50) + 10,
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 100),
        stock: Math.floor(Math.random() * 50) + 1,
        badges: [],
        isFavorite: false,
      });
    }
  }

  calculateSummary(): void {
    let subtotal = 0;
    let itemCount = 0;

    // Calculer le sous-total et le nombre d'articles sélectionnés
    this.vendorGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.selected) {
          subtotal += item.product.price * item.quantity;
          itemCount++;
        }
      });
    });

    const occaverseFees = subtotal * 0.1; // 10%
    const conformityCheckFees = subtotal * 0.01; // 1%
    const shippingFees = 0;
    const total = subtotal + occaverseFees + conformityCheckFees + shippingFees;

    this.cartSummary = {
      subtotal,
      occaverseFees,
      conformityCheckFees,
      shippingFees,
      total,
      currency: '€',
      itemCount,
    };
  }

  onItemChanged(item: CartItemData): void {
    this.calculateSummary();
  }

  onItemRemoved(itemId: string): void {
    // Supprimer l'item de tous les groupes
    this.vendorGroups.forEach((group) => {
      group.items = group.items.filter((item) => item.id !== itemId);
    });

    // Supprimer les groupes vides
    this.vendorGroups = this.vendorGroups.filter(
      (group) => group.items.length > 0
    );

    // Supprimer des récompenses
    this.rewardItems = this.rewardItems.filter((item) => item.id !== itemId);

    this.calculateSummary();
  }

  onItemAddedToFavorites(productId: string): void {
    console.log('Add to favorites:', productId);
  }

  onDiscountRequested(group: VendorGroup): void {
    group.discountPending = true;
    console.log('Discount requested for vendor:', group.vendor.name);
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.vendorGroups = [];
      this.rewardItems = [];
      this.occaverseItem = null;
      this.calculateSummary();
    }
  }

  onFavoriteToggled(productId: string): void {
    console.log('Toggle favorite for product:', productId);
  }

  get totalItems(): number {
    return (
      this.vendorGroups.reduce((sum, group) => {
        return sum + group.items.length;
      }, 0) +
      this.rewardItems.length +
      (this.occaverseItem ? 1 : 0)
    );
  }

  get hasItems(): boolean {
    return this.totalItems > 0;
  }

  areAllRewardsSelected(): boolean {
    if (this.rewardItems.length === 0 && !this.occaverseItem) return false;
    const rewardsSelected = this.rewardItems.every((item) => item.selected);
    const occaverseSelected = this.occaverseItem
      ? this.occaverseItem.selected
      : true;
    return rewardsSelected && occaverseSelected;
  }

  toggleSelectAllRewards(): void {
    const newState = !this.areAllRewardsSelected();
    this.rewardItems.forEach((item) => {
      item.selected = newState;
    });
    if (this.occaverseItem) {
      this.occaverseItem.selected = newState;
    }
  }
}
