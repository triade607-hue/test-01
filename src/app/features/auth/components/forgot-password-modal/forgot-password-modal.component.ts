// src/app/features/auth/components/forgot-password-modal/forgot-password-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-8 relative">
        <button
          (click)="close()"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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

        <h2 class="text-2xl font-bold text-primary-500 mb-2">
          Mot de passe oublié
        </h2>
        <p class="text-gray-500 mb-8">
          Entrez votre adresse email pour recevoir un code de réinitialisation.
        </p>

        <form (ngSubmit)="sendCode()">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Adresse mail <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              (blur)="validateEmail()"
              placeholder="monadresse@gmail.com"
              maxlength="100"
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p *ngIf="emailError" class="text-xs text-red-500 mt-1">
              {{ emailError }}
            </p>
          </div>

          <button
            type="submit"
            [disabled]="!isFormValid() || isLoading"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer le code' }}
          </button>

          <div class="text-center mt-4">
            <button
              type="button"
              (click)="backToLogin()"
              class="text-sm text-primary-500 hover:underline"
            >
              Retour à la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class ForgotPasswordModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() backToLoginModal = new EventEmitter<void>();
  @Output() codeSent = new EventEmitter<string>();

  email = '';
  emailError = '';
  isLoading = false;

  validateEmail(): void {
    this.emailError = '';
    if (!this.email.trim()) {
      this.emailError = "L'adresse email est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = 'Adresse email invalide';
    }
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    );
  }

  sendCode(): void {
    this.validateEmail();
    if (!this.isFormValid()) return;

    this.isLoading = true;

    // TEST: Accepte n'importe quel email valide
    setTimeout(() => {
      this.isLoading = false;
      this.codeSent.emit(this.email);
    }, 1500);
  }

  close(): void {
    this.closed.emit();
  }

  backToLogin(): void {
    this.backToLoginModal.emit();
  }
}
