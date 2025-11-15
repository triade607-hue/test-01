import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      (click)="onClose()"
    >
      <!-- Modal -->
      <div
        class="bg-white rounded-lg max-w-lg w-full p-6 relative animate-slide-up"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Demande de don</h2>
            <p class="text-sm text-gray-600 mt-2">
              Expliquez en quelques mots pourquoi ce don vous serait utile pour
              encourager le donateur.
            </p>
          </div>

          <!-- Bouton fermer -->
          <button
            (click)="onClose()"
            class="text-red-500 hover:text-red-600 transition-colors flex-shrink-0 ml-4"
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

        <!-- Textarea -->
        <div class="mb-6">
          <textarea
            [(ngModel)]="reason"
            rows="6"
            placeholder="Raison de la demande..."
            class="w-full px-4 py-3 bg-gray-50 border-0 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          ></textarea>
        </div>

        <!-- Bouton Soumettre -->
        <button
          (click)="onSubmit()"
          [disabled]="!reason.trim()"
          class="w-full bg-primary-500 text-white py-3 rounded font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Soumettre
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-slide-up {
        animation: slideUp 0.3s ease-out;
      }
    `,
  ],
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
}
