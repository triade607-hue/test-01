import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PaymentMethodType {
  id: string;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-add-payment-method-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-md max-w-xl w-full max-h-[90vh] flex flex-col relative"
      >
        <!-- Close Button -->
        <button
          (click)="close()"
          class="absolute top-4 right-4 z-10 text-error hover:text-error/80 transition-colors"
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

        <!-- Header - Fixed -->
        <div class="flex-shrink-0 p-8 pb-4">
          <h2 class="text-2xl font-bold text-primary-500 mb-2">
            Nouvelle méthode de paiement
          </h2>
          <p class="text-gray-500 mb-6">
            Ajoutez une nouvelle méthode de paiement pour vos achats
          </p>
        </div>

        <!-- Content - Scrollable -->
        <div class="flex-1 overflow-y-auto px-8">
          <form class="space-y-4 pb-4">
            <!-- Méthode de Paiement -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Méthode de Paiement <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  [(ngModel)]="selectedMethod"
                  name="paymentMethod"
                  (change)="onMethodChange()"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none pr-12"
                >
                  <option value="" disabled>Sélectionner une méthode</option>
                  <option
                    *ngFor="let method of paymentMethods"
                    [value]="method.id"
                  >
                    {{ method.name }}
                  </option>
                </select>
                <!-- Logo et chevron -->
                <div
                  class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
                >
                  <img
                    *ngIf="getSelectedMethodLogo()"
                    [src]="getSelectedMethodLogo()"
                    alt="Logo"
                    class="h-6"
                  />
                  <svg
                    class="w-5 h-5 text-gray-400"
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
                </div>
              </div>
            </div>

            <!-- Formulaire PayPal -->
            <ng-container *ngIf="selectedMethod === 'paypal'">
              <!-- Nom du compte -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Nom du compte <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.accountName"
                  name="accountName"
                  placeholder="monadresse@gmail.com"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <!-- Adresse mail -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Adresse mail <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="monadresse@gmail.com"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </ng-container>

            <!-- Formulaire Stripe -->
            <ng-container *ngIf="selectedMethod === 'stripe'">
              <!-- Nom du titulaire -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Nom du titulaire <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.cardholderName"
                  name="cardholderName"
                  placeholder="Adrien RABIOT"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <!-- Numéro de carte -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Numéro de carte <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                  (input)="formatCardNumber()"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <!-- Date d'expiration -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">
                    Date d'expiration <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.expiryDate"
                    name="expiryDate"
                    placeholder="MM/AA"
                    maxlength="5"
                    (input)="formatExpiryDate()"
                    class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <!-- CVV -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">
                    CVV <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.cvv"
                    name="cvv"
                    placeholder="123"
                    maxlength="4"
                    class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <!-- Adresse de facturation -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Adresse de facturation <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.billingAddress"
                  name="billingAddress"
                  placeholder="123 Rue Example, Ville, Pays"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </ng-container>
          </form>
        </div>

        <!-- Footer - Fixed -->
        <div class="flex-shrink-0 p-8 pt-4 border-t border-gray-200">
          <button
            (click)="onSubmit()"
            class="w-full px-6 py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors shadow-sm"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddPaymentMethodModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() paymentMethodAdded = new EventEmitter<any>();

  selectedMethod = '';

  formData = {
    accountName: '',
    email: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  };

  paymentMethods: PaymentMethodType[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    },
    {
      id: 'stripe',
      name: 'Stripe (Carte bancaire)',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    },
  ];

  close(): void {
    this.closed.emit();
  }

  onMethodChange(): void {
    this.formData = {
      accountName: '',
      email: '',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
    };
  }

  getSelectedMethodLogo(): string {
    const method = this.paymentMethods.find(
      (m) => m.id === this.selectedMethod
    );
    return method ? method.logo : '';
  }

  formatCardNumber(): void {
    let value = this.formData.cardNumber.replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    this.formData.cardNumber = formatted;
  }

  formatExpiryDate(): void {
    let value = this.formData.expiryDate.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.formData.expiryDate = value;
  }

  onSubmit(): void {
    if (!this.selectedMethod) {
      alert('Veuillez sélectionner une méthode de paiement');
      return;
    }

    const paymentMethodData: any = {
      type: this.selectedMethod,
      isPrimary: false,
    };

    if (this.selectedMethod === 'paypal') {
      if (!this.formData.accountName || !this.formData.email) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
      paymentMethodData.accountName = this.formData.accountName;
      paymentMethodData.email = this.formData.email;
    }

    if (this.selectedMethod === 'stripe') {
      if (
        !this.formData.cardholderName ||
        !this.formData.cardNumber ||
        !this.formData.expiryDate ||
        !this.formData.cvv ||
        !this.formData.billingAddress
      ) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
      paymentMethodData.cardholderName = this.formData.cardholderName;
      paymentMethodData.cardNumber = this.formData.cardNumber;
      paymentMethodData.expiryDate = this.formData.expiryDate;
      paymentMethodData.cvv = this.formData.cvv;
      paymentMethodData.billingAddress = this.formData.billingAddress;
    }

    this.paymentMethodAdded.emit(paymentMethodData);
    this.close();
  }
}
