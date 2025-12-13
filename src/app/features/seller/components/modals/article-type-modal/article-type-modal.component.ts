import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleType, ActionType } from '../../../models/product.models';

@Component({
  selector: 'app-article-type-modal',
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
        class="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-slide-up"
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
          {{ actionType === "sell"
            ? "Veuillez sélectionner le type d'article que vous souhaitez mettre en vente"
            : "Veuillez sélectionner le type d'article que vous souhaitez donner"
          }}
        </p>

        <!-- Options -->
        <div class="px-6 pb-6 space-y-3">
          <!-- Un Article -->
          <button
            (click)="select('article')"
            class="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
          >
            <div class="w-16 h-16 flex items-center justify-center">
              <svg
                class="w-12 h-12 text-amber-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Un Article</h3>
              <p class="text-sm text-gray-500">
                Créer un article, possédant ou non des variantes.
              </p>
            </div>
          </button>

          <!-- Lot d'Articles -->
          <button
            (click)="select('lot')"
            class="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
          >
            <div class="w-16 h-16 flex items-center justify-center">
              <svg
                class="w-12 h-12 text-amber-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Lot d'Articles
              </h3>
              <p class="text-sm text-gray-500">
                Créer un lot d'articles, ayant la même nature ou non, quelque
                soit la quantité.
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

export class ArticleTypeModalComponent {
  @Input() isOpen = false;
  @Input() actionType: ActionType = 'sell';
  @Output() closed = new EventEmitter<void>();
  @Output() selected = new EventEmitter<ArticleType>();

  close(): void {
    this.closed.emit();
  }

  select(type: ArticleType): void {
    this.selected.emit(type);
  }
}
