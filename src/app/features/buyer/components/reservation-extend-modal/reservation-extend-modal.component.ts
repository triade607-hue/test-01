import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-extend-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
            Prolongement de réservation
          </h2>
          <button
            (click)="close()"
            class="text-red-400 hover:text-red-600 transition-colors"
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
          <!-- Description -->
          <p class="text-xs sm:text-sm text-gray-600">
            Vous pouvez demander un prolongement de votre réservation sur ce
            produit
          </p>

          <!-- Date limite -->
          <div class="space-y-2">
            <label class="block text-xs sm:text-sm font-medium text-gray-700">
              Date limite (maximum 72h)
            </label>
            <input
              type="date"
              [(ngModel)]="newDeadline"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-md text-sm text-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <!-- Submit Button -->
          <button
            (click)="onSubmit()"
            [disabled]="!newDeadline.trim()"
            class="w-full py-2.5 sm:py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Demander
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ReservationExtendModalComponent {
  @Input() productId: string = '';

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<{ deadline: string }>();

  newDeadline: string = '';

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.newDeadline.trim()) {
      this.submitted.emit({ deadline: this.newDeadline });
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
