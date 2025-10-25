// src/app/shared/components/product-card/product-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  vendor: {
    name: string;
    flags: string[];
    avatar?: string;
    isVerified?: boolean;
  };
  clics: number;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  badges?: string[];
  isFavorite?: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
      [routerLink]="['/products', product.id]"
    >
      <!-- Image -->
      <div class="relative aspect-square bg-gray-100">
        <img
          [src]="product.image"
          [alt]="product.title"
          class="w-full h-full object-cover"
        />

        <!-- Badges (coin supérieur gauche) -->
        <div
          *ngIf="product.badges && product.badges.length > 0"
          class="absolute top-2 left-2 flex flex-col gap-1"
        >
          <span
            *ngFor="let badge of product.badges"
            class="px-2 py-1 text-xs font-semibold rounded"
            [ngClass]="{
              'bg-warning text-white': badge === 'Nouveau',
              'bg-error text-white': badge === 'Prix fou',
              'bg-gray-600 text-white': badge === 'Réservé'
            }"
          >
            {{ badge }}
          </span>
        </div>

        <!-- Bouton favori (bookmark) -->
        <button
          *ngIf="showFavoriteButton"
          (click)="onFavoriteClick($event)"
          class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
        >
          <svg
            class="w-5 h-5 text-gray-700"
            [attr.fill]="isFavorite ? 'currentColor' : 'none'"
            [attr.stroke]="isFavorite ? 'none' : 'currentColor'"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <!-- Info produit -->
      <div class="p-3">
        <!-- Titre -->
        <h3
          class="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[40px]"
        >
          {{ product.title }}
        </h3>

        <!-- Vendeur avec badge vérifié -->
        <div class="flex items-center gap-1.5 mb-2">
          <span class="text-xs text-gray-600">{{
            '@' + product.vendor.name
          }}</span>

          <!-- Badge vérifié bleu (si isVerified) -->
          <svg
            *ngIf="product.vendor.isVerified"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.52788 1.19329C7.82648 -0.397765 10.2577 -0.397765 11.5564 1.19329C11.8615 1.56721 12.3341 1.76294 12.8142 1.71434C14.8575 1.50752 16.5767 3.2267 16.3699 5.26998C16.3213 5.75018 16.517 6.2227 16.8909 6.52788C18.482 7.82648 18.482 10.2577 16.8909 11.5564C16.517 11.8615 16.3213 12.3341 16.3699 12.8142C16.5767 14.8575 14.8575 16.5767 12.8142 16.3699C12.3341 16.3213 11.8615 16.517 11.5564 16.8909C10.2577 18.482 7.82648 18.482 6.52788 16.8909C6.2227 16.517 5.75018 16.3213 5.26998 16.3699C3.2267 16.5767 1.50752 14.8575 1.71434 12.8142C1.76294 12.3341 1.56721 11.8615 1.19329 11.5564C-0.397765 10.2577 -0.397765 7.82648 1.19329 6.52788C1.56721 6.2227 1.76294 5.75018 1.71434 5.26998C1.50752 3.2267 3.2267 1.50752 5.26998 1.71434C5.75018 1.76294 6.2227 1.56721 6.52788 1.19329ZM12.5494 6.76086C12.7876 6.32198 12.625 5.77306 12.1861 5.53481C11.7472 5.29656 11.1983 5.4592 10.96 5.89808L8.57363 10.2941L6.9479 8.76994C6.58358 8.42842 6.01136 8.44686 5.66981 8.81117C5.32827 9.17548 5.34673 9.74775 5.71105 10.0893L8.19115 12.4144C8.39559 12.606 8.67725 12.692 8.95376 12.6474C9.23036 12.6027 9.47061 12.4324 9.60425 12.1861L12.5494 6.76086Z"
              fill="#0077B6"
            />
          </svg>

          <!-- Drapeaux -->
          <span *ngFor="let flag of product.vendor.flags" class="text-xs">{{
            flag
          }}</span>
        </div>

        <!-- Prix et badge clics -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <span class="text-lg font-bold text-gray-900">{{
              product.price + product.currency
            }}</span>
          </div>

          <!-- Badge clics avec icône (sans background) -->
          <div class="flex items-center gap-1">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.87 16.8057L17.0581 15.9937L15.7538 14.6917L17.8565 12.589C18.1506 12.2944 18.1503 11.817 17.8556 11.5228C17.778 11.4453 17.6844 11.3857 17.5813 11.3481L10.8196 8.89488C10.0365 8.61181 9.17215 9.01723 8.88909 9.80039C8.76946 10.1314 8.76939 10.4938 8.88887 10.8249L11.3488 17.5868C11.4366 17.8288 11.6419 18.0094 11.8932 18.0655C11.9469 18.0772 12.0018 18.083 12.0568 18.0829C12.2567 18.0828 12.4484 18.0034 12.5898 17.862L14.6901 15.7555L15.9921 17.0576L16.8041 17.8695C17.1036 18.1588 17.5808 18.1505 17.8701 17.851C18.1522 17.5588 18.1522 17.0957 17.8701 16.8035L17.87 16.8057Z"
                fill="#0077B6"
              />
              <path
                d="M7.53893 15.0783C3.37532 15.0783 0 11.7029 0 7.53917C0 3.37544 3.37532 0 7.53893 0C11.7026 0 15.0779 3.37541 15.0779 7.53917C15.0779 7.95555 14.7404 8.29308 14.324 8.29308C13.9077 8.29308 13.5701 7.95555 13.5701 7.53917C13.5701 4.20815 10.8699 1.50784 7.53893 1.50784C4.208 1.50784 1.5078 4.20815 1.5078 7.53917C1.5078 10.8702 4.20804 13.5705 7.53897 13.5705C7.95533 13.5705 8.29285 13.908 8.29285 14.3244C8.29285 14.7408 7.9553 15.0783 7.53893 15.0783Z"
                fill="#0077B6"
              />
              <path
                d="M6.0939 11.7751C5.99481 11.7752 5.89671 11.7557 5.80515 11.7178C3.49806 10.7595 2.40457 8.11242 3.36278 5.80523C4.32099 3.49804 6.96808 2.40456 9.27517 3.36279C10.3825 3.82274 11.262 4.70355 11.7202 5.81163C11.8859 6.19362 11.7106 6.63759 11.3286 6.8033C10.9467 6.96901 10.5027 6.79368 10.337 6.41173C10.3335 6.40375 10.3302 6.39572 10.327 6.38763C9.68882 4.84926 7.92438 4.11956 6.38609 4.7578C4.84779 5.39603 4.11808 7.16051 4.7563 8.69885C5.06194 9.43558 5.64701 10.0212 6.38343 10.3276C6.76817 10.4868 6.95098 10.9278 6.79174 11.3125C6.67494 11.5948 6.39937 11.7786 6.09394 11.7781L6.0939 11.7751Z"
                fill="#0077B6"
              />
            </svg>

            <span class="text-xs font-medium text-primary-600">{{
              product.clics + 'clics'
            }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showFavoriteButton = true;
  @Input() isFavorite = false;

  @Output() favoriteToggle = new EventEmitter<string>();

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteToggle.emit(this.product.id);
  }
}
