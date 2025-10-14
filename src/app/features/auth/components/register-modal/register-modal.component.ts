// src/app/features/auth/components/register-modal/register-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-modal',
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
        <h2 class="text-2xl font-bold text-primary-500 mb-2">Inscription</h2>
        <p class="text-gray-500 mb-6">
          Ravis de vous revoir ! Connectez-vous et accédez aux nouvelles offres.
        </p>

        <!-- Form -->
        <form (ngSubmit)="register()" class="space-y-4">
          <!-- Nom -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Nom <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              [(ngModel)]="formData.lastName"
              name="lastName"
              placeholder="mon nom"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Prénom -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Prénom <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              [(ngModel)]="formData.firstName"
              name="firstName"
              placeholder="mon prénom"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Pseudo -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Pseudo <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              [(ngModel)]="formData.username"
              name="username"
              placeholder="pseudo47"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Adresse mail <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="monadresse@gmail.com"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Téléphone -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Numéro de téléphone <span class="text-red-500">*</span>
            </label>
            <input
              type="tel"
              [(ngModel)]="formData.phone"
              name="phone"
              placeholder="+229   010 000 0000"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              [(ngModel)]="formData.password"
              name="password"
              placeholder="••••••••••••••••••••••"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Confirmer mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Confirmer mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              [(ngModel)]="formData.confirmPassword"
              name="confirmPassword"
              placeholder="••••••••••••••••••••••"
              required
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Devise -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Devise
            </label>
            <select
              [(ngModel)]="formData.currency"
              name="currency"
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="XOF">XOF</option>
            </select>
          </div>

          <!-- Age Confirmation -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              [(ngModel)]="formData.ageConfirmation"
              name="ageConfirmation"
              id="ageConfirmation"
              required
              class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label for="ageConfirmation" class="text-sm text-gray-700">
              En cochant cette case je confirme être âgé(e) de
              <span class="font-medium">18 ans</span> ou plus.
            </label>
          </div>

          <!-- Terms Acceptance -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              [(ngModel)]="formData.termsAccepted"
              name="termsAccepted"
              id="termsAccepted"
              required
              class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label for="termsAccepted" class="text-sm text-gray-700">
              En poursuivant votre inscription, vous acceptez les
              <a routerLink="/terms" class="text-primary-500 hover:underline"
                >Conditions Générales</a
              >
              et la
              <a routerLink="/privacy" class="text-primary-500 hover:underline"
                >Politique de Protection de Données</a
              >
              d'OCCAVERSE
            </label>
          </div>

          <!-- Partners Terms -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              [(ngModel)]="formData.partnerTermsAccepted"
              name="partnerTermsAccepted"
              id="partnerTermsAccepted"
              required
              class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label for="partnerTermsAccepted" class="text-sm text-gray-700">
              Acceptez les conditions générales de nos partenaires de livraison
              Colissimo (<a href="#" class="text-primary-500 hover:underline"
                >CGV</a
              >, <a href="#" class="text-primary-500 hover:underline">CSV</a> et
              <a href="#" class="text-primary-500 hover:underline">CPV</a>) et
              Mondial Relay (<a
                href="#"
                class="text-primary-500 hover:underline"
                >CGV</a
              >)
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="!isFormValid()"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continuer
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 border-t border-gray-200"></div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Vous possédez déjà un compte?
            <button
              (click)="switchToLogin()"
              class="text-primary-500 font-semibold hover:underline ml-1"
            >
              Connectez-vous
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<any>();

  formData = {
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    currency: 'EUR',
    ageConfirmation: false,
    termsAccepted: false,
    partnerTermsAccepted: false,
  };

  close(): void {
    this.closed.emit();
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }

  isFormValid(): boolean {
    return (
      this.formData.lastName !== '' &&
      this.formData.firstName !== '' &&
      this.formData.username !== '' &&
      this.formData.email !== '' &&
      this.formData.phone !== '' &&
      this.formData.password !== '' &&
      this.formData.confirmPassword !== '' &&
      this.formData.password === this.formData.confirmPassword &&
      this.formData.ageConfirmation &&
      this.formData.termsAccepted &&
      this.formData.partnerTermsAccepted
    );
  }

  register(): void {
    if (!this.isFormValid()) return;

    // TODO: Implémenter l'inscription réelle
    console.log('Register:', this.formData);

    // Simuler succès
    this.registerSuccess.emit(this.formData);
    this.close();
  }
}
