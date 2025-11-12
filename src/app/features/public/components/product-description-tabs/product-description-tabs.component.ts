import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product-detail.component';

@Component({
  selector: 'app-product-description-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Pour DON : Affichage direct sans tabs -->
    <div *ngIf="product.type === 'donation'" class="bg-white rounded border border-gray-200 p-6 mb-8 space-y-6">
      <!-- Description -->
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">Description</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          {{ product.description }}
        </p>
      </div>

      <!-- Frais livraison -->
      <div class="pt-6 border-t border-gray-200">
        <h4 class="font-semibold text-gray-900 mb-3">Frais de livraison</h4>
        <p class="text-sm text-gray-600 mb-4">25,00€ Contrôle de conformité inclus</p>
        <div class="space-y-3">
          <div
            *ngFor="let option of product.shippingOptions"
            class="flex items-center justify-between p-4 bg-gray-50 rounded"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded bg-gray-200"></div>
              <span class="text-sm font-medium text-gray-900">{{ option.name }}</span>
            </div>
            <span class="text-lg font-bold text-primary-500">{{ option.price }}$CAD</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pour SIMPLE et LOT : Tabs -->
    <div *ngIf="product.type !== 'donation'" class="bg-white rounded border border-gray-200 overflow-hidden mb-8">
      <!-- Tabs Header -->
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            (click)="selectTab('info')"
            class="px-6 py-4 text-sm font-medium transition-colors border-b-2"
            [class.text-primary-500]="activeTab === 'info'"
            [class.border-primary-500]="activeTab === 'info'"
            [class.text-gray-600]="activeTab !== 'info'"
            [class.border-transparent]="activeTab !== 'info'"
          >
            Informations supplémentaires
          </button>
          <button
            (click)="selectTab('reviews')"
            class="px-6 py-4 text-sm font-medium transition-colors border-b-2"
            [class.text-primary-500]="activeTab === 'reviews'"
            [class.border-primary-500]="activeTab === 'reviews'"
            [class.text-gray-600]="activeTab !== 'reviews'"
            [class.border-transparent]="activeTab !== 'reviews'"
          >
            Avis de la clientèle
          </button>
        </nav>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Onglet Informations -->
        <div *ngIf="activeTab === 'info'" class="space-y-6">
          <!-- Protections -->
          <div *ngFor="let protection of product.protections" class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ protection.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ protection.price }}€ {{ protection.title }}</p>
                <ul class="mt-2 space-y-1">
                  <li *ngFor="let detail of protection.details" class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>{{ detail }}</span>
                  </li>
                </ul>
                <a href="#" class="text-sm text-primary-500 hover:underline mt-2 inline-block">
                  En savoir plus →
                </a>
              </div>
            </div>
          </div>

          <!-- À propos du produit / Description -->
          <div class="pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-3">À propos du produit</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ product.description }}</p>
            <a href="#" class="text-sm text-primary-500 hover:underline mt-2 inline-block">
              Lire plus
            </a>
          </div>

          <!-- Composition du lot (UNIQUEMENT pour type LOT) -->
          <div *ngIf="product.isLot && product.lotItems" class="pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-4">Composition du lot</h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                *ngFor="let item of product.lotItems"
                class="bg-gray-50 rounded overflow-hidden"
              >
                <div class="relative aspect-square bg-gray-100">
                  <img [src]="item.image" [alt]="item.title" class="w-full h-full object-cover" />
                </div>
                <div class="p-3">
                  <p class="text-sm font-medium text-gray-900 line-clamp-2">{{ item.title }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Frais livraison -->
          <div class="pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-3">Frais de livraison</h4>
            <p class="text-sm text-gray-600 mb-4">25,00€ Contrôle de conformité inclus</p>
            <div class="space-y-3">
              <div
                *ngFor="let option of product.shippingOptions"
                class="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-gray-200"></div>
                  <span class="text-sm font-medium text-gray-900">{{ option.name }}</span>
                </div>
                <span class="text-lg font-bold text-primary-500">{{ option.price }}$CAD</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Avis -->
        <div *ngIf="activeTab === 'reviews'">
          <div *ngIf="product.reviews && product.reviews.length > 0" class="space-y-6">
            <div *ngFor="let review of product.reviews" class="flex gap-4 pb-6 border-b border-gray-200 last:border-0">
              <img
                [src]="review.avatar"
                [alt]="review.author"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h5 class="font-semibold text-gray-900">{{ review.author }}</h5>
                  <span class="text-xs text-gray-500">{{ review.country }}</span>
                </div>
                <div class="flex items-center gap-1 mb-2">
                  <svg
                    *ngFor="let star of [1,2,3,4,5]"
                    class="w-4 h-4"
                    [class.text-yellow-400]="star <= review.rating"
                    [class.text-gray-300]="star > review.rating"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <p class="text-sm text-gray-600">{{ review.comment }}</p>
              </div>
            </div>

            <div class="text-center">
              <button class="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Voir plus →
              </button>
            </div>
          </div>

          <div *ngIf="!product.reviews || product.reviews.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <p class="text-gray-500">Aucun avis pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDescriptionTabsComponent {
  @Input() product!: Product;

  activeTab: 'info' | 'reviews' = 'info';

  selectTab(tab: 'info' | 'reviews'): void {
    this.activeTab = tab;
  }
}