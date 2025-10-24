// src/app/features/auth/components/otp-modal/otp-modal.component.ts
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
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
        <h2 class="text-2xl font-bold text-primary-500 mb-2">Vérification</h2>
        <p class="text-gray-500 mb-8">
          Veuillez entrer le code de vérification envoyé à
          <span class="font-medium text-gray-700">{{ maskedEmail }}</span
          >.
        </p>

        <!-- OTP Input -->
        <div class="flex gap-3 mb-6 justify-center">
          <input
            *ngFor="let digit of otpDigits; let i = index"
            #otpInput
            type="text"
            maxlength="1"
            inputmode="numeric"
            [value]="otpDigits[i]"
            (input)="onInput($event, i)"
            (keydown)="onKeyDown($event, i)"
            (paste)="onPaste($event, i)"
            (focus)="onFocus($event, i)"
            class="w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            [class.border-gray-300]="!otpDigits[i]"
            [class.border-primary-500]="otpDigits[i]"
            [class.bg-gray-100]="!otpDigits[i]"
            [class.bg-primary-50]="otpDigits[i]"
          />
        </div>

        <!-- Error Message -->
        <p
          *ngIf="errorMessage"
          class="text-sm text-red-500 text-center mb-4 animate-shake"
        >
          {{ errorMessage }}
        </p>

        <!-- Resend Code -->
        <div class="text-center mb-6">
          <p class="text-sm text-gray-600">
            Vous n'avez pas reçu de code?
            <button
              *ngIf="!isResending && countdown === 0"
              type="button"
              (click)="resendOtp()"
              class="text-primary-500 font-semibold hover:underline ml-1"
            >
              Renvoyer le code
            </button>
            <span *ngIf="countdown > 0" class="text-gray-500 ml-1">
              ({{ formatCountdown() }})
            </span>
            <span *ngIf="isResending" class="text-primary-500 ml-1">
              Envoi en cours...
            </span>
          </p>
        </div>

        <!-- Submit Button -->
        <button
          (click)="verify()"
          [disabled]="!isOtpComplete() || isVerifying"
          class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isVerifying ? 'Vérification...' : 'Valider' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        75% {
          transform: translateX(5px);
        }
      }

      .animate-shake {
        animation: shake 0.3s ease-in-out;
      }
    `,
  ],
})
export class OtpModalComponent implements AfterViewInit, OnDestroy {
  @Input() email = '';
  @Input() context: 'register' | 'forgot-password' | 'login' = 'register';
  @Output() closed = new EventEmitter<void>();
  @Output() verified = new EventEmitter<void>();
  @Output() codeResendRequested = new EventEmitter<void>();

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpDigits: string[] = ['', '', '', '', ''];
  errorMessage = '';
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

  ngAfterViewInit(): void {
    // Auto-focus sur le premier input après un court délai
    setTimeout(() => {
      this.focusInput(0);
    }, 200);

    // Démarrer le compte à rebours
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown(): void {
    this.countdown = 60;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  formatCountdown(): string {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `00:${seconds.toString().padStart(2, '0')}`;
  }

  focusInput(index: number): void {
    const inputs = this.otpInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
      // Sélectionner le texte si présent
      inputs[index].nativeElement.select();
    }
  }

  onInput(event: any, index: number): void {
    const input = event.target;
    let value = input.value;

    // Nettoyer la valeur (ne garder que les chiffres)
    value = value.replace(/\D/g, '');

    if (value.length > 1) {
      // Si plusieurs chiffres sont collés, prendre le premier
      value = value.charAt(0);
    }

    // Mettre à jour la valeur
    this.otpDigits[index] = value;
    input.value = value;

    // Effacer le message d'erreur
    this.errorMessage = '';

    // Si un chiffre est entré, passer automatiquement au suivant
    if (value && index < 4) {
      this.focusInput(index + 1);
    }

    // Si tous les chiffres sont remplis, vérifier automatiquement
    if (this.isOtpComplete()) {
      setTimeout(() => {
        this.verify();
      }, 300);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Backspace : effacer et revenir à l'input précédent
    if (event.key === 'Backspace') {
      event.preventDefault();

      if (this.otpDigits[index]) {
        // Si le champ actuel contient une valeur, l'effacer
        this.otpDigits[index] = '';
        input.value = '';
      } else if (index > 0) {
        // Sinon, aller au champ précédent et l'effacer
        this.otpDigits[index - 1] = '';
        this.focusInput(index - 1);
      }

      this.errorMessage = '';
      return;
    }

    // Delete : effacer le champ actuel
    if (event.key === 'Delete') {
      event.preventDefault();
      this.otpDigits[index] = '';
      input.value = '';
      this.errorMessage = '';
      return;
    }

    // Flèches gauche/droite pour navigation
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < 4) {
      event.preventDefault();
      this.focusInput(index + 1);
      return;
    }

    // Bloquer les caractères non numériques
    if (
      !/^\d$/.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
        event.key
      )
    ) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').substring(0, 5).split('');

    if (digits.length === 0) return;

    // Remplir à partir de l'index actuel
    digits.forEach((digit, i) => {
      const targetIndex = index + i;
      if (targetIndex < 5) {
        this.otpDigits[targetIndex] = digit;
        const inputs = this.otpInputs.toArray();
        if (inputs[targetIndex]) {
          inputs[targetIndex].nativeElement.value = digit;
        }
      }
    });

    // Focus sur le prochain champ vide ou le dernier
    const nextEmptyIndex = this.otpDigits.findIndex((d, i) => i >= index && !d);
    if (nextEmptyIndex !== -1) {
      this.focusInput(nextEmptyIndex);
    } else {
      this.focusInput(4);
    }

    // Si complet, vérifier automatiquement
    if (this.isOtpComplete()) {
      setTimeout(() => {
        this.verify();
      }, 300);
    }
  }

  onFocus(event: FocusEvent, index: number): void {
    // Sélectionner le texte au focus
    const input = event.target as HTMLInputElement;
    input.select();
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every((digit) => digit !== '');
  }

  verify(): void {
    if (!this.isOtpComplete() || this.isVerifying) return;

    this.isVerifying = true;
    this.errorMessage = '';
    const otp = this.otpDigits.join('');

    // TODO: Appel API pour vérifier le code
    console.log('Verifying OTP:', otp, 'for context:', this.context);

    // Simuler l'appel API
    setTimeout(() => {
      this.isVerifying = false;

      // Simuler succès (à remplacer par la vraie logique)
      const isValid = otp === '12345'; // Pour les tests

      if (isValid) {
        this.verified.emit();
      } else {
        this.errorMessage = 'Code invalide. Veuillez réessayer.';
        this.clearOtp();
      }
    }, 1500);
  }

  clearOtp(): void {
    this.otpDigits = ['', '', '', '', ''];
    const inputs = this.otpInputs.toArray();
    inputs.forEach((input) => {
      input.nativeElement.value = '';
    });
    this.focusInput(0);
  }

  resendOtp(): void {
    if (this.isResending || this.countdown > 0) return;

    this.isResending = true;
    this.errorMessage = '';
    this.clearOtp();

    // Émettre l'événement de renvoi
    this.codeResendRequested.emit();

    // Simuler l'appel API
    setTimeout(() => {
      this.isResending = false;
      this.startCountdown();
    }, 1500);
  }

  close(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.closed.emit();
  }
}
