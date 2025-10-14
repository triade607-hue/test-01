// src/app/features/auth/components/otp-modal/otp-modal.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
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
          Veuillez entrer le code de vérification envoyé à votre adresse
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
            [(ngModel)]="otpDigits[i]"
            (input)="onOtpInput($event, i)"
            (keydown)="onKeyDown($event, i)"
            class="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-100 text-gray-900 transition-all"
          />
        </div>

        <!-- Resend Code -->
        <div class="text-center mb-6">
          <p class="text-sm text-gray-600">
            Vous n'avez pas reçu de code?
            <button
              (click)="resendCode()"
              [disabled]="resendTimer > 0"
              class="text-primary-500 font-semibold hover:underline ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Renvoyer le code
              <span *ngIf="resendTimer > 0"
                >({{ formatTime(resendTimer) }})</span
              >
            </button>
          </p>
        </div>

        <!-- Submit Button -->
        <button
          (click)="verify()"
          [disabled]="!isOtpComplete()"
          class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Valider
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class OtpModalComponent {
  @Input() maskedEmail = 'ph***dg@gmail.com';
  @Output() closed = new EventEmitter<void>();
  @Output() verified = new EventEmitter<string>();
  @Output() resendRequested = new EventEmitter<void>();

  otpDigits: string[] = ['', '', '', '', ''];
  resendTimer = 0;
  private timerInterval: any;

  close(): void {
    this.closed.emit();
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Garde uniquement les chiffres
    if (value && !/^\d$/.test(value)) {
      this.otpDigits[index] = '';
      return;
    }

    // Déplace le focus au champ suivant
    if (value && index < 4) {
      const nextInput = input.parentElement?.children[
        index + 1
      ] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Backspace: déplace au champ précédent
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = input.parentElement?.children[
        index - 1
      ] as HTMLInputElement;
      prevInput?.focus();
    }
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every((digit) => digit !== '');
  }

  verify(): void {
    if (!this.isOtpComplete()) return;

    const otp = this.otpDigits.join('');
    this.verified.emit(otp);
  }

  resendCode(): void {
    if (this.resendTimer > 0) return;

    this.resendRequested.emit();
    this.startResendTimer();
  }

  private startResendTimer(): void {
    this.resendTimer = 60; // 1 minute
    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
