import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ReservationProduct {
  name: string;
  image: string;
  quantity: number;
  variant1: { label: string; value: string };
  variant2: { label: string; value: string };
}

export type ReservationStatus =
  | 'pending'
  | 'in_progress'
  | 'accepted'
  | 'refused'
  | 'expired';

@Component({
  selector: 'app-reservation-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-2 sm:p-4"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-md w-full max-w-lg flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 sm:p-6 flex-shrink-0">
          <h2 class="text-lg sm:text-xl font-bold text-primary-500">
            Demande de réservation
          </h2>
          <button
            (click)="close()"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6"
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

        <!-- Body -->
        <div class="flex-1 px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-5">
          <!-- Product Info -->
          <div
            class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 rounded-md"
          >
            <img
              [src]="product.image"
              [alt]="product.name"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 text-sm sm:text-base">
                {{ product.name }}
              </h3>
              <p class="text-xs sm:text-sm text-gray-600">
                Qté: {{ product.quantity }} &nbsp;&nbsp;
                {{ product.variant1.label }}:
                <span class="font-medium">{{ product.variant1.value }}</span>
                &nbsp;&nbsp; {{ product.variant2.label }}:
                <span class="font-medium">{{ product.variant2.value }}</span>
              </p>
            </div>
          </div>

          <!-- Date limite -->
          <div class="space-y-2">
            <label class="block text-xs sm:text-sm font-medium text-gray-700">
              Date limite de réservation (max. 72h)
              <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              [value]="deadlineDateValue"
              disabled
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-md text-sm text-gray-600 cursor-not-allowed"
            />
          </div>

          <!-- Note au vendeur -->
          <div class="space-y-2">
            <label class="block text-xs sm:text-sm font-medium text-gray-700">
              Note adressée au vendeur <span class="text-red-500">*</span>
            </label>
            <div
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 rounded-md text-sm text-gray-500 select-none pointer-events-none min-h-[42px]"
            >
              {{ note || 'entrez votre message...' }}
            </div>
          </div>

          <!-- Status Message -->
          <div *ngIf="status === 'accepted'" class="text-center py-2">
            <p class="text-sm sm:text-base text-primary-500 font-medium">
              <span class="text-primary-600">{{ '@' }}{{ vendorName }}</span> a
              accepté votre demande de réservation.
            </p>
          </div>

          <div *ngIf="status === 'expired'" class="text-center py-2">
            <p
              class="text-xs sm:text-sm text-red-500 font-medium leading-relaxed"
            >
              Le vendeur n'ayant pas confirmé à temps, votre demande a été
              annulée. N'hésitez pas à la prolonger ou à rechercher d'autres
              articles similaires qui pourraient correspondre à vos attentes.
            </p>
          </div>

          <!-- Action Button (pour expired) -->
          <button
            *ngIf="status === 'expired'"
            (click)="onExtend()"
            class="w-full py-2.5 sm:py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
          >
            Prolonger la demande
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ReservationDetailModalComponent {
  @Input() product: ReservationProduct = {
    name: 'Nom du produit',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
    quantity: 15,
    variant1: { label: 'Variante 1', value: 'valeure' },
    variant2: { label: 'Variante 2', value: 'valeure' },
  };

  @Input() status: ReservationStatus = 'pending';
  @Input() deadlineDate: string = '24 - 07 - 2025';
  @Input() deadlineDateValue: string = '2025-07-24';
  @Input() note: string = '';
  @Input() vendorName: string = 'Le vendeur';

  @Output() closed = new EventEmitter<void>();
  @Output() extend = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  onExtend(): void {
    this.extend.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
