// src/app/shared/components/cart-item/cart-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface CartItemData {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
    stock: number;
  };
  quantity: number;
  variant1?: string;
  variant2?: string;
  vendor?: {
    name: string;
    isVerified: boolean;
  };
  conformityCheck: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div
      class="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded"
    >
      <!-- Checkbox -->
      <input
        *ngIf="editable"
        type="checkbox"
        [(ngModel)]="item.selected"
        (change)="onSelectionChange()"
        class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
      />

      <!-- Product Image -->
      <div
        class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden cursor-pointer"
        [routerLink]="['/products', item.product.id]"
      >
        <img
          [src]="item.product.image"
          [alt]="item.product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <h3
          class="text-sm font-medium text-gray-900 mb-1 hover:text-primary-500 cursor-pointer"
          [routerLink]="['/products', item.product.id]"
        >
          {{ item.product.title }}
        </h3>

        <!-- Variants -->
        <div
          *ngIf="item.variant1 || item.variant2"
          class="text-xs text-gray-600 mb-2 space-y-0.5"
        >
          <p *ngIf="item.variant1">
            <span class="font-medium">Variante 1:</span> {{ item.variant1 }}
          </p>
          <p *ngIf="item.variant2">
            <span class="font-medium">Variante 2:</span> {{ item.variant2 }}
          </p>
        </div>

        <!-- Vendor Info -->
        <div
          *ngIf="item.vendor && showVendor"
          class="flex items-center gap-1 mb-2"
        >
          <span class="text-xs text-gray-600">@{{ item.vendor.name }}</span>
          <svg
            *ngIf="item.vendor.isVerified"
            class="w-3 h-3 text-primary-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Conformity Check -->
        <label
          *ngIf="editable"
          class="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
        >
          <input
            type="checkbox"
            [(ngModel)]="item.conformityCheck"
            (change)="onConformityChange()"
            class="w-3 h-3 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <span>Contrôle de conformité (+5€)</span>
        </label>
      </div>

      <!-- Quantity Selector -->
      <div *ngIf="editable" class="flex items-center gap-2 flex-shrink-0">
        <button
          (click)="decrementQuantity()"
          [disabled]="item.quantity <= 1"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            class="w-4 h-4 text-gray-600"
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

        <input
          type="number"
          [(ngModel)]="item.quantity"
          (change)="onQuantityChange()"
          [min]="1"
          [max]="item.product.stock"
          class="w-12 h-8 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <button
          (click)="incrementQuantity()"
          [disabled]="item.quantity >= item.product.stock"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            class="w-4 h-4 text-gray-600"
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

      <!-- Quantity Display (non-editable) -->
      <div *ngIf="!editable" class="text-sm text-gray-600 flex-shrink-0">
        Qté: <span class="font-medium text-gray-900">{{ item.quantity }}</span>
      </div>

      <!-- Price -->
      <div class="flex flex-col items-end flex-shrink-0 min-w-[100px]">
        <p class="text-lg font-bold text-primary-500">
          {{ getTotalPrice() }}{{ item.product.currency }}
        </p>
        <p *ngIf="item.quantity > 1" class="text-xs text-gray-500">
          {{ item.product.price }}{{ item.product.currency }} ×
          {{ item.quantity }}
        </p>
      </div>

      <!-- Actions -->
      <div *ngIf="editable" class="flex flex-col gap-2 flex-shrink-0">
        <!-- Save for Later -->
        <button
          (click)="onSaveForLater()"
          class="p-2 text-gray-400 hover:text-primary-500 transition-colors"
          title="Enregistrer pour plus tard"
        >
          <svg
            class="w-5 h-5"
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

        <!-- Remove -->
        <button
          (click)="onRemove()"
          class="p-2 text-gray-400 hover:text-error transition-colors"
          title="Supprimer"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class CartItemComponent {
  @Input() item!: CartItemData;
  @Input() editable = true;
  @Input() showVendor = true;

  @Output() quantityChanged = new EventEmitter<{
    id: string;
    quantity: number;
  }>();
  @Output() conformityChanged = new EventEmitter<{
    id: string;
    conformityCheck: boolean;
  }>();
  @Output() selectionChanged = new EventEmitter<{
    id: string;
    selected: boolean;
  }>();
  @Output() removed = new EventEmitter<string>();
  @Output() savedForLater = new EventEmitter<string>();

  getTotalPrice(): number {
    return this.item.product.price * this.item.quantity;
  }

  incrementQuantity(): void {
    if (this.item.quantity < this.item.product.stock) {
      this.item.quantity++;
      this.onQuantityChange();
    }
  }

  decrementQuantity(): void {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.onQuantityChange();
    }
  }

  onQuantityChange(): void {
    this.quantityChanged.emit({
      id: this.item.id,
      quantity: this.item.quantity,
    });
  }

  onConformityChange(): void {
    this.conformityChanged.emit({
      id: this.item.id,
      conformityCheck: this.item.conformityCheck,
    });
  }

  onSelectionChange(): void {
    this.selectionChanged.emit({
      id: this.item.id,
      selected: this.item.selected,
    });
  }

  onRemove(): void {
    this.removed.emit(this.item.id);
  }

  onSaveForLater(): void {
    this.savedForLater.emit(this.item.id);
  }
}
