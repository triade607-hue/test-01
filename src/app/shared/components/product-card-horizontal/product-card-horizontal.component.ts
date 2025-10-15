// src/app/shared/components/product-card-horizontal/product-card-horizontal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-card-horizontal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all group cursor-pointer flex h-48"
      [routerLink]="['/products', product.id]"
    >
      <!-- Image Section (Gauche - 40%) -->
      <div class="relative w-2/5 flex-shrink-0 bg-gray-100">
        <img
          [src]="product.image"
          [alt]="product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content Section (Droite - 60%) -->
      <div class="flex-1 p-4 flex flex-col justify-between">
        <!-- Badge "Recherche active" -->
        <span
          class="inline-block px-3 py-1 bg-warning text-white text-xs font-semibold rounded-full self-start mb-3"
        >
          Recherche active
        </span>

        <!-- Title -->
        <h3
          class="text-base font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug"
        >
          {{ product.title }}
        </h3>

        <!-- Vendor -->
        <div class="flex items-center gap-1 mb-3">
          <span class="text-sm text-gray-700">
            {{ '@' + product.vendor?.name }}
          </span>
          <svg
            *ngIf="product.vendor?.isVerified"
            class="w-4 h-4 text-primary-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Footer with Expiration Date -->
        <div class="flex items-center justify-between mt-auto">
          <span class="text-sm text-gray-600">
            Expiration : <span class="font-semibold text-error">27/12/24</span>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
    
export class ProductCardHorizontalComponent {
  @Input() product!: Product;
  @Output() favoriteToggled = new EventEmitter<string>();

  onToggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggled.emit(this.product.id);
  }
}
