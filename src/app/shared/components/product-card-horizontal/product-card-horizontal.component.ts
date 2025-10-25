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
            {{ '@' + product.vendor.name }}
          </span>
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
              d="M6.73833 1.44915C8.03693 -0.141905 10.4682 -0.141905 11.7668 1.44915C12.072 1.82307 12.5445 2.0188 13.0246 1.9702C15.068 1.76338 16.7872 3.48256 16.5804 5.52584C16.5317 6.00604 16.7275 6.47856 17.1014 6.78374C18.6924 8.08234 18.6924 10.5136 17.1014 11.8122C16.7275 12.1174 16.5317 12.5899 16.5804 13.0701C16.7872 15.1134 15.068 16.8326 13.0246 16.6258C12.5445 16.5771 12.072 16.7729 11.7668 17.1468C10.4682 18.7378 8.03693 18.7378 6.73833 17.1468C6.43315 16.7729 5.96063 16.5771 5.48043 16.6258C3.43715 16.8326 1.71797 15.1134 1.92479 13.0701C1.97339 12.5899 1.77766 12.1174 1.40374 11.8122C-0.187315 10.5136 -0.187315 8.08234 1.40374 6.78374C1.77766 6.47856 1.97339 6.00604 1.92479 5.52584C1.71797 3.48256 3.43715 1.76338 5.48043 1.9702C5.96063 2.0188 6.43315 1.82307 6.73833 1.44915ZM12.7599 7.01672C12.9981 6.57784 12.8355 6.02892 12.3966 5.79067C11.9577 5.55242 11.4087 5.71506 11.1705 6.15394L8.78408 10.5499L7.15835 9.0258C6.79403 8.68428 6.22181 8.70272 5.88026 9.06703C5.53872 9.43133 5.55718 10.0036 5.9215 10.3451L8.4016 12.6702C8.60604 12.8618 8.8877 12.9479 9.16421 12.9032C9.44081 12.8586 9.68106 12.6882 9.8147 12.442L12.7599 7.01672Z"
              fill="#0077B6"
            />
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
