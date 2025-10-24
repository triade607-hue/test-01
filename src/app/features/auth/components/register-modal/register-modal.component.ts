// src/app/features/auth/components/register-modal/register-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phoneLength: number; // Longueur du numéro sans l'indicatif
  placeholder: string;
}

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <!-- Modal Container avec hauteur fixe -->
      <div
        class="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col relative"
      >
        <!-- Header - Fixe -->
        <div class="flex-shrink-0 p-8 pb-4 border-b border-gray-200">
          <!-- Close Button -->
          <button
            (click)="close()"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
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
          <p class="text-gray-500 text-sm">
            Créez votre compte et accédez à des milliers d'offres.
          </p>
        </div>

        <!-- Content - Scrollable -->
        <div class="flex-1 overflow-y-auto px-8 py-6">
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
                placeholder="Votre nom"
                required
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                [class.ring-2]="hasAttemptedSubmit && !formData.lastName.trim()"
                [class.ring-red-500]="
                  hasAttemptedSubmit && !formData.lastName.trim()
                "
              />
              <p
                *ngIf="hasAttemptedSubmit && !formData.lastName.trim()"
                class="text-xs text-red-500 mt-1"
              >
                Le nom est requis
              </p>
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
                placeholder="Votre prénom"
                required
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                [class.ring-2]="
                  hasAttemptedSubmit && !formData.firstName.trim()
                "
                [class.ring-red-500]="
                  hasAttemptedSubmit && !formData.firstName.trim()
                "
              />
              <p
                *ngIf="hasAttemptedSubmit && !formData.firstName.trim()"
                class="text-xs text-red-500 mt-1"
              >
                Le prénom est requis
              </p>
            </div>

            <!-- Nom d'utilisateur -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Nom d'utilisateur <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formData.username"
                name="username"
                placeholder="@username"
                required
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                [class.ring-2]="hasAttemptedSubmit && !formData.username.trim()"
                [class.ring-red-500]="
                  hasAttemptedSubmit && !formData.username.trim()
                "
              />
              <p
                *ngIf="hasAttemptedSubmit && !formData.username.trim()"
                class="text-xs text-red-500 mt-1"
              >
                Le nom d'utilisateur est requis
              </p>
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
                [class.ring-2]="hasAttemptedSubmit && !isEmailValid()"
                [class.ring-red-500]="hasAttemptedSubmit && !isEmailValid()"
              />
              <p
                *ngIf="hasAttemptedSubmit && !isEmailValid()"
                class="text-xs text-red-500 mt-1"
              >
                Veuillez entrer une adresse email valide
              </p>
            </div>

            <!-- Téléphone avec indicatif -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Numéro de téléphone <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <!-- Dropdown indicatif pays -->
                <div class="relative">
                  <button
                    type="button"
                    (click)="toggleCountryDropdown()"
                    class="flex items-center gap-2 px-3 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 h-full"
                  >
                    <span class="text-xl">{{ selectedCountry.flag }}</span>
                    <span class="text-sm font-medium text-gray-700">{{
                      selectedCountry.dialCode
                    }}</span>
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <!-- Country Dropdown -->
                  <div
                    *ngIf="showCountryDropdown"
                    class="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                  >
                    <button
                      *ngFor="let country of countries"
                      type="button"
                      (click)="selectCountry(country)"
                      class="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                      [class.bg-primary-50]="
                        country.code === selectedCountry.code
                      "
                    >
                      <span class="text-xl">{{ country.flag }}</span>
                      <span class="flex-1 text-sm text-gray-900">{{
                        country.name
                      }}</span>
                      <span class="text-sm font-medium text-gray-600">{{
                        country.dialCode
                      }}</span>
                    </button>
                  </div>
                </div>

                <!-- Numéro de téléphone -->
                <input
                  type="tel"
                  [(ngModel)]="formData.phone"
                  name="phone"
                  [placeholder]="selectedCountry.placeholder"
                  required
                  [maxlength]="
                    selectedCountry.phoneLength +
                    Math.floor(selectedCountry.phoneLength / 2)
                  "
                  class="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  [class.ring-2]="formData.phone && !isPhoneValid()"
                  [class.ring-red-500]="formData.phone && !isPhoneValid()"
                />
              </div>
              <p
                *ngIf="formData.phone && !isPhoneValid()"
                class="text-xs text-red-500 mt-1"
              >
                Le numéro doit contenir
                {{ selectedCountry.phoneLength }} chiffres
              </p>
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
                minlength="8"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <!-- Confirmer mot de passe -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Confirmer le mot de passe <span class="text-red-500">*</span>
              </label>
              <input
                type="password"
                [(ngModel)]="formData.confirmPassword"
                name="confirmPassword"
                placeholder="••••••••••••••••••••••"
                required
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                [class.ring-2]="
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                "
                [class.ring-red-500]="
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                "
              />
              <p
                *ngIf="
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                "
                class="text-xs text-red-500 mt-1"
              >
                Les mots de passe ne correspondent pas
              </p>
            </div>

            <!-- Devise -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Devise préférée <span class="text-red-500">*</span>
              </label>
              <select
                [(ngModel)]="formData.currency"
                name="currency"
                required
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="EUR">EUR - Euro (€)</option>
                <option value="USD">USD - Dollar ($)</option>
                <option value="GBP">GBP - Livre (£)</option>
                <option value="CAD">CAD - Dollar Canadien ($CAD)</option>
                <option value="XOF">XOF - Franc CFA (FCFA)</option>
              </select>
            </div>

            <!-- Checkboxes -->
            <div class="space-y-3 pt-2">
              <!-- Age confirmation -->
              <div class="flex items-start">
                <input
                  type="checkbox"
                  [(ngModel)]="formData.ageConfirmation"
                  name="ageConfirmation"
                  id="ageConfirmation"
                  required
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label for="ageConfirmation" class="ml-2 text-sm text-gray-700">
                  Je confirme avoir au moins 18 ans
                  <span class="text-red-500">*</span>
                </label>
              </div>

              <!-- Terms -->
              <div class="flex items-start">
                <input
                  type="checkbox"
                  [(ngModel)]="formData.termsAccepted"
                  name="termsAccepted"
                  id="termsAccepted"
                  required
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label for="termsAccepted" class="ml-2 text-sm text-gray-700">
                  J'accepte les
                  <a
                    href="/terms"
                    target="_blank"
                    class="text-primary-500 hover:underline"
                  >
                    conditions générales d'utilisation
                  </a>
                  <span class="text-red-500">*</span>
                </label>
              </div>

              <!-- Partner terms -->
              <div class="flex items-start">
                <input
                  type="checkbox"
                  [(ngModel)]="formData.partnerTermsAccepted"
                  name="partnerTermsAccepted"
                  id="partnerTermsAccepted"
                  required
                  class="w-4 h-4 mt-0.5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label
                  for="partnerTermsAccepted"
                  class="ml-2 text-sm text-gray-700"
                >
                  J'accepte les
                  <a
                    href="/partner-terms"
                    target="_blank"
                    class="text-primary-500 hover:underline"
                  >
                    conditions générales de nos partenaires
                  </a>
                  <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <!-- Footer - Fixe -->
        <div class="flex-shrink-0 p-8 pt-4 border-t border-gray-200 space-y-4">
          <!-- Validation Summary (si formulaire incomplet) -->
          <!-- <div
            *ngIf="!isFormValid() && hasAttemptedSubmit"
            class="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-sm font-medium text-red-800 mb-2">
              Veuillez compléter les champs suivants :
            </p>
            <ul class="text-xs text-red-600 space-y-1">
              <li *ngIf="!formData.lastName.trim()">• Nom</li>
              <li *ngIf="!formData.firstName.trim()">• Prénom</li>
              <li *ngIf="!formData.username.trim()">• Nom d'utilisateur</li>
              <li *ngIf="!isEmailValid()">• Adresse email valide</li>
              <li *ngIf="!isPhoneValid()">
                • Numéro de téléphone valide ({{
                  selectedCountry.phoneLength
                }}
                chiffres)
              </li>
              <li *ngIf="!isPasswordValid()">
                • Mot de passe (minimum 8 caractères)
              </li>
              <li *ngIf="formData.password !== formData.confirmPassword">
                • Les mots de passe doivent correspondre
              </li>
              <li *ngIf="!formData.ageConfirmation">
                • Confirmation d'âge (18+)
              </li>
              <li *ngIf="!formData.termsAccepted">• Acceptation des CGU</li>
              <li *ngIf="!formData.partnerTermsAccepted">
                • Acceptation des conditions partenaires
              </li>
            </ul>
          </div> -->

          <!-- Submit Button -->
          <button
            (click)="register()"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continuer
          </button>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Vous possédez déjà un compte?
              <button
                type="button"
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
  styles: [
    `
      /* Custom scrollbar pour le contenu */
      .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
      }

      .overflow-y-auto::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 10px;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: #a0aec0;
      }
    `,
  ],
})
export class RegisterModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<any>();
  Math = Math; // Make Math available in template

  showCountryDropdown = false;
  hasAttemptedSubmit = false;

  countries: Country[] = [
    {
      code: 'BJ',
      name: 'Bénin',
      flag: '🇧🇯',
      dialCode: '+229',
      phoneLength: 8,
      placeholder: 'XX XX XX XX',
    },
    {
      code: 'FR',
      name: 'France',
      flag: '🇫🇷',
      dialCode: '+33',
      phoneLength: 9,
      placeholder: 'X XX XX XX XX',
    },
    {
      code: 'CI',
      name: "Côte d'Ivoire",
      flag: '🇨🇮',
      dialCode: '+225',
      phoneLength: 10,
      placeholder: 'XX XX XX XX XX',
    },
    {
      code: 'SN',
      name: 'Sénégal',
      flag: '🇸🇳',
      dialCode: '+221',
      phoneLength: 9,
      placeholder: 'XX XXX XX XX',
    },
    {
      code: 'TG',
      name: 'Togo',
      flag: '🇹🇬',
      dialCode: '+228',
      phoneLength: 8,
      placeholder: 'XX XX XX XX',
    },
    {
      code: 'BF',
      name: 'Burkina Faso',
      flag: '🇧🇫',
      dialCode: '+226',
      phoneLength: 8,
      placeholder: 'XX XX XX XX',
    },
    {
      code: 'ML',
      name: 'Mali',
      flag: '🇲🇱',
      dialCode: '+223',
      phoneLength: 8,
      placeholder: 'XX XX XX XX',
    },
    {
      code: 'NE',
      name: 'Niger',
      flag: '🇳🇪',
      dialCode: '+227',
      phoneLength: 8,
      placeholder: 'XX XX XX XX',
    },
    {
      code: 'CM',
      name: 'Cameroun',
      flag: '🇨🇲',
      dialCode: '+237',
      phoneLength: 9,
      placeholder: 'X XX XX XX XX',
    },
    {
      code: 'GA',
      name: 'Gabon',
      flag: '🇬🇦',
      dialCode: '+241',
      phoneLength: 7,
      placeholder: 'XX XX XXX',
    },
    {
      code: 'CD',
      name: 'RD Congo',
      flag: '🇨🇩',
      dialCode: '+243',
      phoneLength: 9,
      placeholder: 'XX XXX XXXX',
    },
    {
      code: 'CG',
      name: 'Congo',
      flag: '🇨🇬',
      dialCode: '+242',
      phoneLength: 9,
      placeholder: 'XX XXX XXXX',
    },
    {
      code: 'US',
      name: 'États-Unis',
      flag: '🇺🇸',
      dialCode: '+1',
      phoneLength: 10,
      placeholder: 'XXX XXX XXXX',
    },
    {
      code: 'GB',
      name: 'Royaume-Uni',
      flag: '🇬🇧',
      dialCode: '+44',
      phoneLength: 10,
      placeholder: 'XXXX XXXXXX',
    },
    {
      code: 'CA',
      name: 'Canada',
      flag: '🇨🇦',
      dialCode: '+1',
      phoneLength: 10,
      placeholder: 'XXX XXX XXXX',
    },
  ];

  selectedCountry: Country = this.countries[0]; // Bénin par défaut

  formData = {
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    countryCode: this.selectedCountry.dialCode,
    phone: '',
    password: '',
    confirmPassword: '',
    currency: 'EUR',
    ageConfirmation: false,
    termsAccepted: false,
    partnerTermsAccepted: false,
  };

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;
  }

  selectCountry(country: Country): void {
    this.selectedCountry = country;
    this.formData.countryCode = country.dialCode;
    this.showCountryDropdown = false;
    // Réinitialiser le numéro de téléphone lors du changement de pays
    this.formData.phone = '';
  }

  close(): void {
    this.closed.emit();
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }

  isPhoneValid(): boolean {
    if (!this.formData.phone) return false;
    // Enlever tous les espaces et caractères non numériques
    const digitsOnly = this.formData.phone.replace(/\D/g, '');
    return digitsOnly.length === this.selectedCountry.phoneLength;
  }

  isEmailValid(): boolean {
    if (!this.formData.email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.formData.email);
  }

  isPasswordValid(): boolean {
    return this.formData.password.length >= 8;
  }

  isFormValid(): boolean {
    return (
      this.formData.lastName.trim() !== '' &&
      this.formData.firstName.trim() !== '' &&
      this.formData.username.trim() !== '' &&
      this.isEmailValid() &&
      this.isPhoneValid() &&
      this.isPasswordValid() &&
      this.formData.confirmPassword !== '' &&
      this.formData.password === this.formData.confirmPassword &&
      this.formData.ageConfirmation &&
      this.formData.termsAccepted &&
      this.formData.partnerTermsAccepted
    );
  }

  register(): void {
    this.hasAttemptedSubmit = true;

    if (!this.isFormValid()) {
      console.log('Form invalid, showing errors');
      return;
    }

    const fullPhone = `${
      this.formData.countryCode
    }${this.formData.phone.replace(/\D/g, '')}`;

    // TODO: Implémenter l'inscription réelle
    console.log('Register:', {
      ...this.formData,
      fullPhone,
    });

    // Rediriger vers la sélection de catégories
    this.registerSuccess.emit({
      ...this.formData,
      fullPhone,
    });
  }
}
