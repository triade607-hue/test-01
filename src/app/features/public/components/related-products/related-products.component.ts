import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Importer le ProductCardComponent existant
// Ajuster le chemin selon votre structure
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent // Décommenter quand le chemin est correct
  ],
  template: `
    <div class="mb-12">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900">{{ title }}</h2>
        <a
          *ngIf="showViewAll"
          routerLink="/search"
          class="text-sm font-medium text-primary-500 hover:underline flex items-center gap-1"
        >
          TOUT VOIR
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <!-- Grille de produits -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <!-- TODO: Décommenter quand ProductCardComponent est importé -->
        <app-product-card
          *ngFor="let product of displayProducts"
          [product]="product"
          (favoriteToggle)="onFavoriteToggled($event)"
        ></app-product-card>

        <!-- Temporaire : affichage basique en attendant l'import du ProductCard -->
        <div
          *ngFor="let product of displayProducts"
          class="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
        >
          <div class="relative aspect-square bg-gray-100">
            <img
              [src]="product.image"
              [alt]="product.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-3 space-y-2">
            <h3
              class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]"
            >
              {{ product.title }}
            </h3>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">
                {{ product.price }}{{ product.currency }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RelatedProductsComponent {
  @Input() title = 'Articles que vous pourriez aimer';
  @Input() products: any[] = [];
  @Input() showViewAll = true;

  @Output() favoriteToggle = new EventEmitter<any>();

  // Données mock avec vraies images Unsplash
  mockProducts = [
    {
      id: '1',
      title: 'Casque audio premium',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Sneakers Nike Air',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Chaussures élégantes',
      image:
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '4',
      title: 'Baskets mode',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '5',
      title: 'Montre connectée',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '6',
      title: 'Appareil photo vintage',
      image:
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '7',
      title: 'Enceinte portable',
      image:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
    {
      id: '8',
      title: 'Lunettes de soleil',
      image:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
      price: 25,
      currency: 'CAD',
      vendor: { name: '@Vendeur', country: 'fr', verified: true },
      isFavorite: false,
    },
  ];

  get displayProducts(): any[] {
    return this.products.length > 0 ? this.products : this.mockProducts;
  }

  onFavoriteToggled(product: any): void {
    this.favoriteToggle.emit(product);
  }
}
