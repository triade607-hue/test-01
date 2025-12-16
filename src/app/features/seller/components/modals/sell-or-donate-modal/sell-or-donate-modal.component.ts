import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionType } from '../../../models/product.models';

@Component({
  selector: 'app-sell-or-donate-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" (click)="close()"></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-md shadow-xl w-full max-w-md animate-slide-up"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 pb-2">
          <h2 class="text-xl font-bold text-gray-900">Nouvel article</h2>
          <button
            (click)="close()"
            class="text-error hover:text-red-700 transition-colors"
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

        <!-- Subtitle -->
        <p class="px-6 text-sm text-gray-600 mb-6">
          Comment souhaitez-vous donner une seconde vie à votre article
        </p>

        <!-- Options -->
        <div class="px-6 pb-6 space-y-3">
          <!-- Vendre -->
          <button
            (click)="select('sell')"
            class="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
          >
            <div class="w-16 h-16 flex items-center justify-center">
              <img
                src="assets/icons/cart-sell.svg"
                alt=""
                class="w-12 h-12"
                onerror="this.style.display='none'"
              />
              <svg
                *ngIf="true"
                class="w-12 h-12 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Vendre</h3>
              <p class="text-sm text-gray-500">
                Mettez votre article en vente et trouvez un acheteur.
              </p>
            </div>
          </button>

          <!-- Donner -->
          <button
            (click)="select('donate')"
            class="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
          >
            <div class="w-16 h-16 flex items-center justify-center">
              <svg
                class="w-12 h-12 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Donner</h3>
              <p class="text-sm text-gray-500">
                Offrez votre article gratuitement à quelqu'un qui en aurait
                besoin.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slide-up {
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
        animation: slide-up 0.3s ease-out;
      }
    `,
  ],
})
export class SellOrDonateModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() selected = new EventEmitter<ActionType>();

  close(): void {
    this.closed.emit();
  }

  select(action: ActionType): void {
    this.selected.emit(action);
  }
}
