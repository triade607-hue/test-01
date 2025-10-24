// src/app/features/auth/components/otp-modal/otp-modal.component.ts
import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-8 relative">
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

        <h2 class="text-2xl font-bold text-primary-500 mb-2">Vérification</h2>
        <p class="text-gray-500 mb-8">
          Veuillez entrer le code de vérification envoyé à
          <span class="font-medium text-gray-700">{{ maskedEmail }}</span
          >.
        </p>

        <form (ngSubmit)="verify()">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Code de vérification <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              [(ngModel)]="otpCode"
              name="otpCode"
              (input)="sanitizeInput()"
              (blur)="validateCode()"
              placeholder="12345"
              maxlength="5"
              inputmode="numeric"
              class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-center text-2xl tracking-widest font-semibold"
            />
            <p *ngIf="codeError" class="text-xs text-red-500 mt-1">
              {{ codeError }}
            </p>
          </div>

          <div class="text-center mb-6">
            <p class="text-sm text-gray-600">
              Vous n'avez pas reçu de code?
              <button
                *ngIf="countdown === 0"
                type="button"
                (click)="resendOtp()"
                [disabled]="isResending"
                class="text-primary-500 font-semibold hover:underline ml-1 disabled:opacity-50"
              >
                {{ isResending ? 'Envoi...' : 'Renvoyer le code' }}
              </button>
              <span *ngIf="countdown > 0" class="text-gray-500 ml-1">
                (00:{{ countdown.toString().padStart(2, '0') }})
              </span>
            </p>
          </div>

          <button
            type="submit"
            [disabled]="!isFormValid() || isVerifying"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isVerifying ? 'Vérification...' : 'Valider' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class OtpModalComponent implements OnInit, OnDestroy {
  @Input() email = '';
  @Input() context: 'register' | 'forgot-password' | 'login' = 'register';
  @Output() closed = new EventEmitter<void>();
  @Output() verified = new EventEmitter<void>();
  @Output() codeResendRequested = new EventEmitter<void>();

  otpCode = '';
  codeError = '';
  isVerifying = false;
  isResending = false;
  countdown = 60;
  private countdownInterval: any;

  get maskedEmail(): string {
    if (!this.email) return '';
    const [name, domain] = this.email.split('@');
    if (!domain) return this.email;
    const maskedName =
      name.substring(0, 2) + '***' + name.substring(name.length - 2);
    return `${maskedName}@${domain}`;
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  startCountdown(): void {
    this.countdown = 60;
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) clearInterval(this.countdownInterval);
    }, 1000);
  }

  sanitizeInput(): void {
    this.otpCode = this.otpCode.replace(/\D/g, '').substring(0, 5);
    this.codeError = '';
  }

  validateCode(): void {
    this.codeError = '';
    if (!this.otpCode) {
      this.codeError = 'Le code de vérification est requis';
    } else if (this.otpCode.length !== 5) {
      this.codeError = 'Le code doit contenir 5 chiffres';
    }
  }

  isFormValid(): boolean {
    return this.otpCode.length === 5;
  }

  verify(): void {
    this.validateCode();
    if (!this.isFormValid() || this.isVerifying) return;

    this.isVerifying = true;
    this.codeError = '';

    // TEST: Code valide = "12345"
    setTimeout(() => {
      this.isVerifying = false;
      if (this.otpCode === '12345') {
        this.verified.emit();
      } else {
        this.codeError = 'Code invalide. Veuillez réessayer.';
        this.otpCode = '';
      }
    }, 1000);
  }

  resendOtp(): void {
    if (this.isResending || this.countdown > 0) return;

    this.isResending = true;
    this.codeError = '';
    this.otpCode = '';
    this.codeResendRequested.emit();

    setTimeout(() => {
      this.isResending = false;
      this.startCountdown();
    }, 1500);
  }

  close(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.closed.emit();
  }
}
