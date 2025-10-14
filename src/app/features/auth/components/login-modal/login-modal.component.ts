// src/app/features/auth/components/login-modal/login-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
        <h2 class="text-2xl font-bold text-primary-500 mb-2">Connexion</h2>
        <p class="text-gray-500 mb-8">
          Ravis de vous revoir ! Connectez-vous et accédez aux nouvelles offres.
        </p>

        <!-- Form -->
        <form (ngSubmit)="login()">
          <!-- Email -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Adresse mail <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="monadresse@gmail.com"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="••••••••••••••••••••••"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Remember me -->
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

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="!email || !password"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Se connecter
          </button>

          <!-- Forgot Password -->
          <div class="text-center mt-4">
            <a
              routerLink="/auth/forgot-password"
              class="text-sm text-primary-500 hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>

        <!-- Divider -->
        <div class="my-8 border-t border-gray-200"></div>

        <!-- Register Link -->
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
  @Output() loginSuccess = new EventEmitter<any>();

  email = '';
  password = '';
  rememberMe = false;

  close(): void {
    this.closed.emit();
  }

  switchToRegister(): void {
    this.switchToRegisterModal.emit();
  }

  login(): void {
    if (!this.email || !this.password) return;

    // TODO: Implémenter l'authentification réelle
    console.log('Login:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });

    // Simuler succès
    this.loginSuccess.emit({ email: this.email });
    this.close();
  }
}
