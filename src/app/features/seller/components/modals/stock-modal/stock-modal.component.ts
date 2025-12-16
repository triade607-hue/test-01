import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      (click)="onBackdropClick($event)"
    >
      <!-- Modal -->
      <div
        class="bg-white rounded-md shadow-md w-full max-w-md transform transition-all"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-5 border-b border-gray-100"
        >
          <h2 class="text-lg font-semibold text-gray-900">Gérer le stock</h2>
          <button
            (click)="close.emit()"
            class="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-5 space-y-4">
          <!-- Product Info -->
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <div
              class="w-12 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0"
            >
              <img
                *ngIf="productImage"
                [src]="productImage"
                [alt]="productName"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ productName }}
              </p>
              <p class="text-xs text-gray-500">
                Stock actuel : {{ currentStock }}
              </p>
            </div>
          </div>

          <!-- Quantity Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nouvelle quantité en stock
            </label>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="decrementQuantity()"
                [disabled]="newQuantity <= 0"
                class="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
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
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                type="number"
                [(ngModel)]="newQuantity"
                min="0"
                class="flex-1 px-4 py-2.5 text-center text-lg font-semibold border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                (click)="incrementQuantity()"
                class="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Stock Change Info -->
          <div *ngIf="newQuantity !== currentStock" class="text-sm text-center">
            <span *ngIf="newQuantity > currentStock" class="text-green-600">
              +{{ newQuantity - currentStock }} unité(s)
            </span>
            <span *ngIf="newQuantity < currentStock" class="text-red-600">
              -{{ currentStock - newQuantity }} unité(s)
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 p-5 border-t border-gray-100">
          <button
            (click)="close.emit()"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            (click)="onSave()"
            [disabled]="isSaving"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {{ isSaving ? 'Enregistrement...' : 'Valider' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class StockModalComponent implements OnInit, OnChanges {
  @Input() productId = '';
  @Input() productName = '';
  @Input() productImage = '';
  @Input() currentStock = 0;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<number>();

  newQuantity = 0;
  isSaving = false;

  ngOnInit(): void {
    this.newQuantity = this.currentStock;
  }

  ngOnChanges(): void {
    this.newQuantity = this.currentStock;
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  incrementQuantity(): void {
    this.newQuantity++;
  }

  decrementQuantity(): void {
    if (this.newQuantity > 0) {
      this.newQuantity--;
    }
  }

  onSave(): void {
    this.isSaving = true;
    // Simulate API call
    setTimeout(() => {
      this.isSaving = false;
      this.save.emit(this.newQuantity);
    }, 500);
  }
}
