// src/app/features/auth/components/new-password-modal/new-password-modal.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-8 relative">
        <!-- Close Button -->
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

        <!-- Title -->
        <h2 class="text-2xl font-bold text-primary-500 mb-2">
          Nouveau mot de passe
        </h2>
        <p class="text-gray-500 mb-8">
          Créez un nouveau mot de passe sécurisé pour votre compte.
        </p>

        <!-- Form -->
        <form (ngSubmit)="resetPassword()">
          <!-- New Password -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Nouveau mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="newPassword"
                name="newPassword"
                placeholder="••••••••••••••••••••••"
                required
                minlength="8"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
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
            <p class="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Confirmer le mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••••••••••••••••"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.ring-2]="
                confirmPassword && newPassword !== confirmPassword
              "
              [class.ring-red-500]="
                confirmPassword && newPassword !== confirmPassword
              "
            />
            <p
              *ngIf="confirmPassword && newPassword !== confirmPassword"
              class="text-xs text-red-500 mt-1"
            >
              Les mots de passe ne correspondent pas
            </p>
          </div>

          <!-- Password Requirements -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-xs font-medium text-gray-700 mb-2">
              Votre mot de passe doit contenir :
            </p>
            <ul class="space-y-1 text-xs text-gray-600">
              <li
                [class.text-green-600]="newPassword.length >= 8"
                class="flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  [class.text-green-600]="newPassword.length >= 8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Au moins 8 caractères
              </li>
              <li
                [class.text-green-600]="hasUpperCase()"
                class="flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  [class.text-green-600]="hasUpperCase()"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Une lettre majuscule
              </li>
              <li
                [class.text-green-600]="hasNumber()"
                class="flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  [class.text-green-600]="hasNumber()"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Un chiffre
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="!isFormValid()"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class NewPasswordModalComponent {
  @Input() email = '';
  @Output() closed = new EventEmitter<void>();
  @Output() passwordReset = new EventEmitter<void>();

  newPassword = '';
  confirmPassword = '';
  showPassword = false;

  close(): void {
    this.closed.emit();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.newPassword);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.newPassword);
  }

  isFormValid(): boolean {
    return (
      this.newPassword.length >= 8 &&
      this.hasUpperCase() &&
      this.hasNumber() &&
      this.newPassword === this.confirmPassword
    );
  }

  resetPassword(): void {
    if (!this.isFormValid()) return;

    // TODO: Appel API pour réinitialiser le mot de passe
    console.log('Password reset for:', this.email);

    this.passwordReset.emit();
    this.close();
  }
}
