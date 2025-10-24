// src/app/features/auth/components/register-modal/register-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phoneLength: number;
}

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col relative"
      >
        <button
          (click)="close()"
          class="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600"
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

        <div class="p-8 pb-4">
          <h2 class="text-2xl font-bold text-primary-500 mb-2">Inscription</h2>
          <p class="text-gray-500 mb-6">
            Ravis de vous revoir ! Connectez-vous et accédez aux nouvelles
            offres.
          </p>
        </div>

        <div class="flex-1 overflow-y-auto px-8">
          <form>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Nom <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="lastName"
                name="lastName"
                (blur)="validateLastName()"
                placeholder="mon nom"
                maxlength="50"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p *ngIf="lastNameError" class="text-xs text-red-500 mt-1">
                {{ lastNameError }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Prénom <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="firstName"
                name="firstName"
                (blur)="validateFirstName()"
                placeholder="mon prénom"
                maxlength="50"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p *ngIf="firstNameError" class="text-xs text-red-500 mt-1">
                {{ firstNameError }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Pseudo <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="username"
                name="username"
                (blur)="validateUsername()"
                placeholder="pseudo47"
                maxlength="30"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p *ngIf="usernameError" class="text-xs text-red-500 mt-1">
                {{ usernameError }}
              </p>
            </div>

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
                Numéro de téléphone <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <select
                  [(ngModel)]="selectedCountry"
                  name="country"
                  class="w-24 px-2 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option *ngFor="let country of countries" [ngValue]="country">
                    {{ country.flag }} {{ country.dialCode }}
                  </option>
                </select>
                <input
                  type="tel"
                  [(ngModel)]="phone"
                  name="phone"
                  (input)="sanitizePhone()"
                  (blur)="validatePhone()"
                  placeholder="010 000 0000"
                  [maxlength]="selectedCountry.phoneLength + 2"
                  class="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p *ngIf="phoneError" class="text-xs text-red-500 mt-1">
                {{ phoneError }}
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
                  (input)="validatePassword()"
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

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Confirmer mot de passe <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  (input)="validateConfirmPassword()"
                  placeholder="••••••••••••••••••••••"
                  maxlength="50"
                  class="w-full px-4 py-3 pr-12 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  (click)="toggleConfirmPassword()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    *ngIf="!showConfirmPassword"
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
                    *ngIf="showConfirmPassword"
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
              <p *ngIf="confirmPasswordError" class="text-xs text-red-500 mt-1">
                {{ confirmPasswordError }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Devise</label
              >
              <select
                [(ngModel)]="currency"
                name="currency"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>

            <div class="space-y-3 mb-6">
              <label class="flex items-start gap-2">
                <input
                  type="checkbox"
                  [(ngModel)]="ageConfirmation"
                  name="ageConfirmation"
                  (change)="validateAgeConfirmation()"
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span class="text-xs text-gray-700">
                  En cochant cette case je confirme être âgé(e) de
                  <span class="font-semibold">18 ans</span> ou plus.
                </span>
              </label>
              <p *ngIf="ageConfirmationError" class="text-xs text-red-500">
                {{ ageConfirmationError }}
              </p>

              <label class="flex items-start gap-2">
                <input
                  type="checkbox"
                  [(ngModel)]="termsAccepted"
                  name="termsAccepted"
                  (change)="validateTermsAccepted()"
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span class="text-xs text-gray-700">
                  En poursuivant votre inscription, vous acceptez les
                  <a
                    href="/cgu"
                    target="_blank"
                    class="text-primary-500 underline"
                    >Conditions Générales</a
                  >
                  et la
                  <a
                    href="/privacy"
                    target="_blank"
                    class="text-primary-500 underline"
                    >Politique de Protection de Données</a
                  >
                  d'OCCAVERSE
                </span>
              </label>
              <p *ngIf="termsAcceptedError" class="text-xs text-red-500">
                {{ termsAcceptedError }}
              </p>

              <label class="flex items-start gap-2">
                <input
                  type="checkbox"
                  [(ngModel)]="partnerTermsAccepted"
                  name="partnerTermsAccepted"
                  (change)="validatePartnerTermsAccepted()"
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span class="text-xs text-gray-700">
                  Acceptez les conditions générales de nos partenaires de
                  livraison Colissimo (<a
                    href="#"
                    target="_blank"
                    class="text-primary-500 underline"
                    >CGV</a
                  >,
                  <a href="#" target="_blank" class="text-primary-500 underline"
                    >CSV</a
                  >
                  et
                  <a href="#" target="_blank" class="text-primary-500 underline"
                    >CPV</a
                  >) et Mondial Relay (<a
                    href="#"
                    target="_blank"
                    class="text-primary-500 underline"
                    >CGV</a
                  >)
                </span>
              </label>
              <p *ngIf="partnerTermsAcceptedError" class="text-xs text-red-500">
                {{ partnerTermsAcceptedError }}
              </p>
            </div>
          </form>
        </div>

        <div class="p-8 pt-4 border-t border-gray-200 space-y-4">
          <button
            (click)="register()"
            [disabled]="!isFormValid()"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continuer
          </button>

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
    </div>
  `,
  styles: [],
})
export class RegisterModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<any>();

  lastName = '';
  firstName = '';
  username = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  currency = 'EUR';
  ageConfirmation = false;
  termsAccepted = false;
  partnerTermsAccepted = false;
  showPassword = false;
  showConfirmPassword = false;

  lastNameError = '';
  firstNameError = '';
  usernameError = '';
  emailError = '';
  phoneError = '';
  passwordError = '';
  confirmPasswordError = '';
  ageConfirmationError = '';
  termsAcceptedError = '';
  partnerTermsAcceptedError = '';

  countries: Country[] = [
    { code: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229', phoneLength: 8 },
    {
      code: 'FR',
      name: 'France',
      flag: '🇫🇷',
      dialCode: '+33',
      phoneLength: 10,
    },
    { code: 'US', name: 'USA', flag: '🇺🇸', dialCode: '+1', phoneLength: 10 },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', phoneLength: 10 },
  ];

  selectedCountry: Country = this.countries[0];

  validateLastName(): void {
    this.lastNameError = '';
    if (!this.lastName.trim()) {
      this.lastNameError = 'Le nom est requis';
    } else if (this.lastName.trim().length < 2) {
      this.lastNameError = 'Minimum 2 caractères';
    }
  }

  validateFirstName(): void {
    this.firstNameError = '';
    if (!this.firstName.trim()) {
      this.firstNameError = 'Le prénom est requis';
    } else if (this.firstName.trim().length < 2) {
      this.firstNameError = 'Minimum 2 caractères';
    }
  }

  validateUsername(): void {
    this.usernameError = '';
    if (!this.username.trim()) {
      this.usernameError = 'Le pseudo est requis';
    } else if (this.username.trim().length < 3) {
      this.usernameError = 'Minimum 3 caractères';
    } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
      this.usernameError = 'Lettres, chiffres et underscore uniquement';
    }
  }

  validateEmail(): void {
    this.emailError = '';
    if (!this.email.trim()) {
      this.emailError = "L'adresse email est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = 'Adresse email invalide';
    }
  }

  sanitizePhone(): void {
    this.phone = this.phone.replace(/[^\d\s]/g, '');
  }

  validatePhone(): void {
    this.phoneError = '';
    const digits = this.phone.replace(/\s/g, '');
    if (!digits) {
      this.phoneError = 'Le numéro de téléphone est requis';
    } else if (digits.length !== this.selectedCountry.phoneLength) {
      this.phoneError = `${this.selectedCountry.phoneLength} chiffres requis`;
    }
  }

  validatePassword(): void {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'Le mot de passe est requis';
    } else if (this.password.length < 8) {
      this.passwordError = 'Minimum 8 caractères';
    } else if (!/[A-Z]/.test(this.password)) {
      this.passwordError = 'Au moins une majuscule requise';
    } else if (!/[0-9]/.test(this.password)) {
      this.passwordError = 'Au moins un chiffre requis';
    }

    if (this.confirmPassword) this.validateConfirmPassword();
  }

  validateConfirmPassword(): void {
    this.confirmPasswordError = '';
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'La confirmation est requise';
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Les mots de passe ne correspondent pas';
    }
  }

  validateAgeConfirmation(): void {
    this.ageConfirmationError = '';
    if (!this.ageConfirmation) {
      this.ageConfirmationError = 'Vous devez avoir 18 ans ou plus';
    }
  }

  validateTermsAccepted(): void {
    this.termsAcceptedError = '';
    if (!this.termsAccepted) {
      this.termsAcceptedError = 'Vous devez accepter les conditions';
    }
  }

  validatePartnerTermsAccepted(): void {
    this.partnerTermsAcceptedError = '';
    if (!this.partnerTermsAccepted) {
      this.partnerTermsAcceptedError =
        'Vous devez accepter les conditions partenaires';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFormValid(): boolean {
    const phoneDigits = this.phone.replace(/\s/g, '');
    return (
      this.lastName.trim().length >= 2 &&
      this.firstName.trim().length >= 2 &&
      this.username.trim().length >= 3 &&
      /^[a-zA-Z0-9_]+$/.test(this.username) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      phoneDigits.length === this.selectedCountry.phoneLength &&
      this.password.length >= 8 &&
      /[A-Z]/.test(this.password) &&
      /[0-9]/.test(this.password) &&
      this.password === this.confirmPassword &&
      this.ageConfirmation &&
      this.termsAccepted &&
      this.partnerTermsAccepted
    );
  }

  register(): void {
    this.validateLastName();
    this.validateFirstName();
    this.validateUsername();
    this.validateEmail();
    this.validatePhone();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAgeConfirmation();
    this.validateTermsAccepted();
    this.validatePartnerTermsAccepted();

    if (!this.isFormValid()) return;

    // TEST: Valeurs acceptées ci-dessus
    this.registerSuccess.emit({
      lastName: this.lastName,
      firstName: this.firstName,
      username: this.username,
      email: this.email,
      phone: this.selectedCountry.dialCode + this.phone.replace(/\s/g, ''),
      currency: this.currency,
    });
  }

  close(): void {
    this.closed.emit();
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }
}
