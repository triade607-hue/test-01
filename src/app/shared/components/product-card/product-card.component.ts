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
  rating?: number;
  reviewCount?: number;
  vendor?: {
    name: string;
    avatar?: string;
    isVerified: boolean;
  };
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
      class="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer"
      [routerLink]="['/products', product.id]"
    >
      <!-- Image Section -->
      <div class="relative aspect-square bg-gray-100">
        <img
          [src]="product.image"
          [alt]="product.title"
          class="w-full h-full object-cover"
        />

        <!-- Bookmark Button -->
        <button
          (click)="onToggleFavorite($event)"
          class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <svg
            class="w-5 h-5"
            [class.fill-primary-500]="product.isFavorite"
            [class.text-primary-500]="product.isFavorite"
            [class.text-gray-600]="!product.isFavorite"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>

        <!-- Badges -->
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
      </div>

      <!-- Content Section -->
      <div class="p-3">
        <!-- Vendor Info -->
        <div
          *ngIf="product.vendor && showVendor"
          class="flex items-center gap-2 mb-2"
        >
          <div class="w-6 h-6 bg-gray-300 rounded-full overflow-hidden">
            <img
              *ngIf="product.vendor.avatar"
              [src]="product.vendor.avatar"
              [alt]="product.vendor.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex items-center gap-1 min-w-0">
            <span class="text-xs text-gray-600 truncate">
              @{{ product.vendor.name }}
            </span>
            <svg
              *ngIf="product.vendor.isVerified"
              class="w-4 h-4 text-primary-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- Product Title -->
        <h3
          class="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]"
        >
          {{ product.title }}
        </h3>

        <!-- Stock Badge -->
        <div
          *ngIf="product.stock !== undefined"
          class="flex items-center gap-1 mb-2"
        >
          <span
            class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 flex items-center gap-1"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            {{ product.stock }}clics
          </span>
        </div>

        <!-- Price and Rating -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <span class="text-lg font-bold text-primary-500">
              {{ product.price }}{{ product.currency }}
            </span>
            <svg
              class="w-4 h-4 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Rating -->
          <div *ngIf="product.rating" class="flex items-center gap-1">
            <div class="flex items-center">
              <svg
                *ngFor="let star of [1, 2, 3, 4, 5]"
                class="w-3 h-3"
                [class.text-warning]="star <= (product.rating || 0)"
                [class.text-gray-300]="star > (product.rating || 0)"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600" *ngIf="product.reviewCount">
              ({{ product.reviewCount }})
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showVendor = true;
  @Output() favoriteToggled = new EventEmitter<string>();
  @Output() addedToCart = new EventEmitter<string>();

  onToggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggled.emit(this.product.id);
  }
}
