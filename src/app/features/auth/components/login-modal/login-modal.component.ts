// src/app/features/auth/components/login-modal/login-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
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

        <h2 class="text-2xl font-bold text-primary-500 mb-2">Connexion</h2>
        <p class="text-gray-500 mb-8">
          Ravis de vous revoir ! Connectez-vous et accédez aux nouvelles offres.
        </p>

        <form (ngSubmit)="login()">
          <div class="mb-4">
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

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                (blur)="validatePassword()"
                placeholder="••••••••••••••••••••••"
                maxlength="50"
                class="w-full px-4 py-3 pr-12 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            <p *ngIf="passwordError" class="text-xs text-red-500 mt-1">
              {{ passwordError }}
            </p>
          </div>

          <div class="flex items-center mb-6">
            <input
              type="checkbox"
              [(ngModel)]="rememberMe"
              name="rememberMe"
              id="rememberMe"
              class="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label for="rememberMe" class="ml-2 text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <button
            type="submit"
            [disabled]="!isFormValid()"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Se connecter
          </button>

          <div class="text-center mt-4">
            <button
              type="button"
              (click)="forgotPassword()"
              class="text-sm text-primary-500 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </form>

        <div class="my-8 border-t border-gray-200"></div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Vous ne possédez pas de compte?
            <button
              (click)="switchToRegister()"
              class="text-primary-500 font-semibold hover:underline ml-1"
            >
              Inscrivez-vous
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToRegisterModal = new EventEmitter<void>();
  @Output() forgotPasswordClicked = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<any>();

  email = '';
  password = '';
  rememberMe = false;
  emailError = '';
  passwordError = '';
  showPassword = false;

  validateEmail(): void {
    this.emailError = '';
    if (!this.email.trim()) {
      this.emailError = "L'adresse email est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = 'Adresse email invalide';
    }
  }

  validatePassword(): void {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'Le mot de passe est requis';
    } else if (this.password.length < 8) {
      this.passwordError = 'Minimum 8 caractères requis';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      this.password.length >= 8
    );
  }

  login(): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.isFormValid()) return;

    // TEST: Email valide = "test@occaverse.com" / Password = "Test1234"
    this.loginSuccess.emit({ email: this.email });
  }

  close(): void {
    this.closed.emit();
  }

  switchToRegister(): void {
    this.switchToRegisterModal.emit();
  }

  forgotPassword(): void {
    this.forgotPasswordClicked.emit();
  }
}
