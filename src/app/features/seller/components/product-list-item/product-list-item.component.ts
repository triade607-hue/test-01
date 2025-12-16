import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.models';
import { ProductActionsMenuComponent } from '../product-actions-menu/product-actions-menu.component';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [CommonModule, ProductActionsMenuComponent],
  template: `
    <div
      class="flex items-center gap-4 p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      (click)="onView()"
    >
      <!-- Checkbox -->
      <div (click)="$event.stopPropagation()">
        <input
          type="checkbox"
          [checked]="isSelected"
          (change)="onSelect()"
          class="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
        />
      </div>

      <!-- Image -->
      <div
        class="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0"
      >
        <img
          [src]="product.images[0].url || 'assets/placeholder.png'"
          [alt]="product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap mb-1">
          <h3 class="font-semibold text-gray-900 truncate">
            {{ product.name }}
          </h3>

          <!-- Badges -->
          <span
            class="px-2 py-0.5 text-xs font-medium rounded-full"
            [ngClass]="{
              'bg-gray-100 text-gray-700': product.articleType === 'article',
              'bg-blue-100 text-blue-700': product.articleType === 'lot'
            }"
          >
            {{ product.articleType === 'lot' ? 'Lot de produit' : 'Article' }}
          </span>

          <span
            class="px-2 py-0.5 text-xs font-medium rounded-full"
            [ngClass]="{
              'bg-gray-100 text-gray-700': product.saleType === 'classic',
              'bg-purple-100 text-purple-700': product.saleType === 'donation'
            }"
          >
            {{ product.saleType === 'donation' ? 'Dons' : 'Vente Classique' }}
          </span>

          <span
            class="px-2 py-0.5 text-xs font-medium rounded-full"
            [ngClass]="getStatusClasses()"
          >
            {{ getStatusLabel() }}
          </span>
        </div>

        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span class="text-primary-500 font-semibold">
            {{ product.price | number : '1.2-2' }}{{ product.currency }}
          </span>
          <span
            >Quantité en stock :
            <strong class="text-gray-700">{{
              product.quantity | number : '2.0'
            }}</strong></span
          >
          <span class="flex items-center gap-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatDate(product.createdAt) }}
          </span>
        </div>
      </div>

      <!-- Status Icon (si bloqué ou en analyse) -->
      <div
        *ngIf="product.status === 'analyzing' || product.status === 'blocked'"
        class="flex-shrink-0"
      >
        <div
          *ngIf="product.status === 'analyzing'"
          class="flex items-center gap-1 text-xs text-primary-500"
        >
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span class="font-medium">En cours<br />d'analyse</span>
          <svg
            class="w-4 h-4 text-gray-400 ml-1"
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

        <div
          *ngIf="product.status === 'blocked'"
          class="flex items-center gap-1 text-xs text-error"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
          <span class="font-medium">Article<br />bloqué</span>
          <svg
            class="w-4 h-4 text-gray-400 ml-1"
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
      </div>

      <!-- Actions Menu -->
      <div (click)="$event.stopPropagation()">
        <app-product-actions-menu
          (edit)="onEdit()"
          (promote)="onPromote()"
          (manageStock)="onManageStock()"
          (editImages)="onEditImages()"
          (manageVariants)="onManageVariants()"
          (delete)="onDelete()"
        ></app-product-actions-menu>
      </div>
    </div>
  `,
  styles: [
    `
      input[type='checkbox'] {
        accent-color: #0077b6;
      }
    `,
  ],
})
export class ProductListItemComponent {
  @Input() product!: Product;
  @Input() isSelected = false;

  @Output() select = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() promote = new EventEmitter<void>();
  @Output() manageStock = new EventEmitter<void>();
  @Output() editImages = new EventEmitter<void>();
  @Output() manageVariants = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  getStatusClasses(): Record<string, boolean> {
    return {
      'bg-green-100 text-green-700': this.product.status === 'published',
      'bg-yellow-100 text-yellow-700': this.product.status === 'draft',
      'bg-gray-100 text-gray-700': this.product.status === 'archived',
      'bg-red-100 text-red-700': this.product.status === 'blocked',
      'bg-blue-100 text-blue-700': this.product.status === 'analyzing',
    };
  }

  getStatusLabel(): string {
    const labels: Record<string, string> = {
      published: 'Publié',
      draft: 'Brouillon',
      archived: 'Archivé',
      blocked: 'Bloqué',
      analyzing: 'En analyse',
    };
    return labels[this.product.status] || this.product.status;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleDateString('fr-FR', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  onSelect(): void {
    this.select.emit();
  }

  onView(): void {
    this.view.emit();
  }

  onEdit(): void {
    this.edit.emit();
  }

  onPromote(): void {
    this.promote.emit();
  }

  onManageStock(): void {
    this.manageStock.emit();
  }

  onEditImages(): void {
    this.editImages.emit();
  }

  onManageVariants(): void {
    this.manageVariants.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
