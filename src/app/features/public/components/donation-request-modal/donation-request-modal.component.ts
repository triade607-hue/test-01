import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      (click)="onBackdropClick($event)"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full shadow-xl">
        <!-- En-tête -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <h2 class="text-xl font-bold text-gray-900">Demande de don</h2>
          <button
            (click)="onClose()"
            class="w-8 h-8 flex items-center justify-center text-error hover:bg-error/10 rounded transition-colors"
          >
            <svg
              class="w-6 h-6"
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

        <!-- Contenu -->
        <div class="p-6 space-y-4">
          <p class="text-sm text-gray-600">
            Expliquez en quelques mots pourquoi ce don vous serait utile pour
            encourager le donateur.
          </p>

          <textarea
            [(ngModel)]="reason"
            placeholder="Raison de la demande..."
            rows="6"
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          ></textarea>

          <button
            (click)="onSubmit()"
            [disabled]="!reason.trim()"
            class="w-full px-6 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DonationRequestModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  reason = '';

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.reason.trim()) {
      this.submit.emit(this.reason);
      this.reason = '';
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
