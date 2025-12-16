import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LotSource } from '../../../models/product.models';

@Component({
  selector: 'app-lot-source-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          Veuillez préciser la provenance des articles de votre lot d'articles.
        </p>

        <!-- Options -->
        <div class="px-6 space-y-3">
          <!-- Nouveaux articles -->
          <label
            class="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            [class.bg-primary-50]="selectedSource === 'new'"
          >
            <input
              type="radio"
              name="lotSource"
              value="new"
              [(ngModel)]="selectedSource"
              class="w-5 h-5 text-primary-500 border-gray-300 focus:ring-primary-500"
            />
            <span class="text-sm font-medium text-gray-900">
              Lots d'articles avec de nouveaux articles
            </span>
          </label>

          <!-- Articles existants -->
          <label
            class="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            [class.bg-primary-50]="selectedSource === 'existing'"
          >
            <input
              type="radio"
              name="lotSource"
              value="existing"
              [(ngModel)]="selectedSource"
              class="w-5 h-5 text-primary-500 border-gray-300 focus:ring-primary-500"
            />
            <span class="text-sm font-medium text-gray-900">
              Lots d'articles avec vos anciens articles
            </span>
          </label>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 p-6">
          <button
            (click)="goBack()"
            class="flex-1 px-4 py-3 text-sm font-medium text-primary-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Retour
          </button>
          <button
            (click)="confirm()"
            [disabled]="!selectedSource"
            class="flex-1 px-4 py-3 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuer
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

      input[type='radio'] {
        accent-color: #0077b6;
      }
    `,
  ],
})
export class LotSourceModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() selected = new EventEmitter<LotSource>();

  selectedSource: LotSource | null = 'new';

  close(): void {
    this.closed.emit();
  }

  goBack(): void {
    this.back.emit();
  }

  confirm(): void {
    if (this.selectedSource) {
      this.selected.emit(this.selectedSource);
    }
  }
}
