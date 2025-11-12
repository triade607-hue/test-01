import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductType } from '../../pages/product-detail/product-detail.component';
@Component({
  selector: 'app-product-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- PRODUIT SIMPLE / LOT -->
      <ng-container *ngIf="productType === 'simple' || productType === 'lot'">
        <div class="flex gap-3">
          <!-- Quantité -->
          <div
            class="flex items-center border border-gray-300 rounded overflow-hidden"
          >
            <button
              (click)="decreaseQuantity()"
              class="px-4 py-2 hover:bg-gray-50 transition-colors"
              [disabled]="quantity <= 1"
            >
              <svg
                class="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span
              class="px-4 py-2 min-w-[60px] text-center font-medium text-gray-900"
            >
              {{ quantity }}
            </span>
            <button
              (click)="increaseQuantity()"
              class="px-4 py-2 hover:bg-gray-50 transition-colors"
              [disabled]="quantity >= product.stock"
            >
              <svg
                class="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <!-- Ajouter au panier -->
          <button
            (click)="onAddToCart()"
            class="flex-1 px-6 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors"
          >
            Ajouter au panier
          </button>
        </div>

        <!-- Actions secondaires -->
        <div class="grid grid-cols-3 gap-3">
          <button
            (click)="onChat()"
            class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-700">Discuter</span>
          </button>

          <button
            (click)="onNegotiate()"
            class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span class="text-sm font-medium text-gray-700">Négocier</span>
          </button>

          <button
            (click)="onReserve()"
            class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-700">Réserver</span>
          </button>
        </div>
      </ng-container>

      <!-- DON -->
      <ng-container *ngIf="productType === 'donation'">
        <button
          (click)="onRequestDonation()"
          class="w-full px-6 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors"
        >
          Demander le don
        </button>

        <div class="grid grid-cols-3 gap-3">
          <button
            (click)="onChat()"
            class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-700">Discuter</span>
          </button>

          <button
            (click)="onReserve()"
            class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors col-span-2"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-700">Réserver</span>
          </button>
        </div>
      </ng-container>
    </div>
  `,
})
export class ProductActionsComponent {
  @Input() productType: ProductType = 'simple';
  @Input() product!: Product;
  @Input() quantity = 1;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() requestDonation = new EventEmitter<void>();
  @Output() chat = new EventEmitter<void>();
  @Output() negotiate = new EventEmitter<void>();
  @Output() reserve = new EventEmitter<void>();

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  onAddToCart(): void {
    this.addToCart.emit();
  }

  onRequestDonation(): void {
    this.requestDonation.emit();
  }

  onChat(): void {
    this.chat.emit();
  }

  onNegotiate(): void {
    this.negotiate.emit();
  }

  onReserve(): void {
    this.reserve.emit();
  }
}
