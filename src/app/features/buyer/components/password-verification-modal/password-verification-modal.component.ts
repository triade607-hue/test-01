import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-verification-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-md max-w-md w-full p-8 relative">
        <!-- Close Button -->
        <button
          (click)="close()"
          class="absolute top-4 right-4 text-error hover:text-error/80 transition-colors"
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

        <!-- Title -->
        <h2 class="text-xl font-bold text-gray-900 mb-2">
          Vérification de sécurité
        </h2>
        <p class="text-sm text-gray-600 mb-6">
          {{ message }}
        </p>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••••••••••••••"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
              />
              <button
                type="button"
                (click)="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  *ngIf="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  *ngIf="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              type="button"
              (click)="close()"
              class="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors shadow-sm"
            >
              Vérifier
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class PasswordVerificationModalComponent {
  @Input() message = 'Veuillez entrer votre mot de passe pour continuer';
  @Output() closed = new EventEmitter<void>();
  @Output() verified = new EventEmitter<string>();

  password = '';
  showPassword = false;

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (!this.password) {
      alert('Veuillez entrer votre mot de passe');
      return;
    }

    // TODO: Vérifier avec le backend
    // Pour l'instant, on simule
    this.verified.emit(this.password);
  }
}
