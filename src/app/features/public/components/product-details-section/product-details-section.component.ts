import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ShippingOption {
  name: string;
  logo: string;
  price: number;
}

interface Review {
  author: string;
  avatar: string;
  country: string;
  countryFlag: string;
  rating: number;
  comment: string;
  date: string;
}

interface LotProduct {
  image: string;
  title: string;
}

@Component({
  selector: 'app-product-details-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Onglets -->
    <div class="bg-white rounded border border-gray-200 mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            (click)="activeTab = 'info'"
            class="px-6 py-4 text-sm font-medium border-b-2 transition-colors"
            [class.border-primary-500]="activeTab === 'info'"
            [class.text-primary-500]="activeTab === 'info'"
            [class.border-transparent]="activeTab !== 'info'"
            [class.text-gray-600]="activeTab !== 'info'"
          >
            Informations supplémentaires
          </button>
          <button
            (click)="activeTab = 'reviews'"
            class="px-6 py-4 text-sm font-medium border-b-2 transition-colors"
            [class.border-primary-500]="activeTab === 'reviews'"
            [class.text-primary-500]="activeTab === 'reviews'"
            [class.border-transparent]="activeTab !== 'reviews'"
            [class.text-gray-600]="activeTab !== 'reviews'"
          >
            Avis de la clientèle
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div class="p-6">
        <!-- Onglet Informations supplémentaires -->
        <div *ngIf="activeTab === 'info'" class="space-y-6">
          <!-- Protection Occaverse -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-base font-semibold text-gray-900 mb-3">
              Protection <span class="text-primary-500">Occaverse</span>
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              25,00€ Protection des utilisateurs
            </p>

            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <svg
                  class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm text-gray-700"
                  >Sécurité du paiement inclus</span
                >
              </div>
              <div class="flex items-start gap-2">
                <svg
                  class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm text-gray-700">Service client dédié</span>
              </div>
            </div>

            <button
              class="flex items-center gap-1 text-sm text-primary-500 font-medium hover:underline mt-3"
            >
              En savoir plus
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
            </button>
          </div>

          <!-- Contrôle de conformité -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-base font-semibold text-gray-900 mb-3">
              Contrôle de conformité
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              25,00€ Contrôle de conformité inclus
            </p>

            <button
              class="flex items-center gap-1 text-sm text-primary-500 font-medium hover:underline"
            >
              En savoir plus
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
            </button>
          </div>

          <!-- À propos du produit -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-base font-semibold text-gray-900 mb-3">
              À propos du produit
            </h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-gray-400 mt-1">•</span>
                <span
                  >Far far away behind word mountains, cliente fut sa un non
                  there</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400 mt-1">•</span>
                <span
                  >Simpliciter they live in Bookm harkey porttum tor creative
                  futur</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400 mt-1">•</span>
                <span>Relie one mountain tur tokinghure nobody impulse</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400 mt-1">•</span>
                <span
                  >Which trees productive based where where New first lift
                  underlying</span
                >
              </li>
            </ul>
          </div>

          <!-- Frais de livraison -->
          <div class="pb-6">
            <h3 class="text-base font-semibold text-gray-900 mb-3">
              Frais de livraison
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              25,00€ Contrôle de conformité inclus
            </p>

            <div class="space-y-3">
              <div
                *ngFor="let option of shippingOptions"
                class="flex items-center justify-between p-3 border border-gray-200 rounded"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br flex items-center justify-center rounded"
                    [style.background]="option.logo"
                  >
                    <span class="text-white text-xs font-bold">{{
                      option.name.substring(0, 1)
                    }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 text-sm">
                      {{ option.name }}
                    </p>
                    <p class="text-xs text-gray-500">Service standard</p>
                  </div>
                </div>
                <span class="text-primary-500 font-semibold text-sm"
                  >{{ option.price | number : '1.0-0' }}CAD</span
                >
              </div>
            </div>
          </div>

          <!-- Composition du lot (si isLot) -->
          <div *ngIf="isLot && lotProducts.length > 0" class="pb-6">
            <h3 class="text-base font-semibold text-gray-900 mb-4">
              Composition du lot
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                *ngFor="let item of lotProducts"
                class="border border-gray-200 rounded overflow-hidden group hover:shadow-md transition-shadow"
              >
                <img
                  [src]="item.image"
                  [alt]="item.title"
                  class="w-full h-40 object-cover"
                />
                <div class="p-3">
                  <p class="text-sm text-gray-700 line-clamp-2">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Avis -->
        <div *ngIf="activeTab === 'reviews'">
          <div *ngIf="reviews.length > 0" class="space-y-6">
            <div
              *ngFor="let review of reviews"
              class="pb-6 border-b border-gray-200 last:border-0"
            >
              <div class="flex items-start gap-3">
                <img
                  [src]="review.avatar"
                  [alt]="review.author"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900">{{
                      review.author
                    }}</span>
                    <span class="text-lg">{{ review.countryFlag }}</span>
                    <span class="text-xs text-gray-500"
                      >({{ review.country }})</span
                    >
                  </div>

                  <!-- Rating -->
                  <div class="flex items-center gap-1 mb-2">
                    <svg
                      *ngFor="let star of [1, 2, 3, 4, 5]"
                      class="w-4 h-4"
                      [class.text-yellow-400]="star <= review.rating"
                      [class.text-gray-300]="star > review.rating"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <p class="text-sm text-gray-700 leading-relaxed">
                    {{ review.comment }}
                  </p>
                </div>
              </div>
            </div>

            <button
              class="text-sm text-primary-500 font-medium hover:underline flex items-center gap-1"
            >
              Voir plus
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div *ngIf="reviews.length === 0" class="text-center py-12">
            <p class="text-gray-500">Aucun avis pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ProductDetailsSectionComponent {
  @Input() isLot = false;
  @Input() lotProducts: LotProduct[] = [];
  @Input() reviews: Review[] = [];
  @Input() shippingOptions: ShippingOption[] = [
    {
      name: 'Mondial Relay',
      logo: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
      price: 6.49,
    },
    {
      name: 'Colissimo',
      logo: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
      price: 6.49,
    },
    {
      name: 'Colivrée',
      logo: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)',
      price: 6.49,
    },
  ];

  activeTab: 'info' | 'reviews' = 'info';
}
