import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-lg w-full max-w-sm p-6 sm:p-8"
        (click)="$event.stopPropagation()"
      >
        <!-- Title -->
        <h2
          class="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4"
        >
          {{ title }}
        </h2>

        <!-- Message -->
        <p class="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
          {{ message }}
        </p>

        <!-- Buttons -->
        <div class="flex items-center justify-center gap-4">
          <button
            (click)="onCancel()"
            class="px-6 py-2.5 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            {{ cancelText }}
          </button>
          <button
            (click)="onConfirm()"
            class="px-6 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmModalComponent {
  @Input() title: string = 'Validation';
  @Input() message: string = 'Êtes-vous sûr de vouloir continuer ?';
  @Input() cancelText: string = 'Non, annuler';
  @Input() confirmText: string = 'Oui, accepter';

  @Output() cancelled = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  onCancel(): void {
    this.cancelled.emit();
  }

  onConfirm(): void {
    this.confirmed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
