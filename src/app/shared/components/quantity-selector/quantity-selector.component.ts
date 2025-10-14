// src/app/shared/components/quantity-selector/quantity-selector.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantitySelectorComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="containerClass">
      <!-- Bouton Moins -->
      <button
        type="button"
        [disabled]="disabled || value <= min"
        (click)="decrement()"
        [class]="buttonClass"
        class="px-4 py-2 bg-white hover:bg-gray-50 border-r transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </button>

      <!-- Input Quantité -->
      <input
        type="number"
        [value]="value"
        [min]="min"
        [max]="max"
        [disabled]="disabled"
        (input)="onInputChange($event)"
        (blur)="onBlur()"
        class="px-4 py-2 bg-white text-center min-w-[60px] border-0 focus:outline-none focus:ring-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
        [class.text-gray-400]="disabled"
      />

      <!-- Bouton Plus -->
      <button
        type="button"
        [disabled]="disabled || (max !== null && value >= max)"
        (click)="increment()"
        [class]="buttonClass"
        class="px-4 py-2 bg-white hover:bg-gray-50 border-l transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>

    <!-- Stock Info -->
    <p *ngIf="showStock && max !== null" class="mt-1 text-xs text-gray-500">
      Stock disponible : {{ max }}
    </p>

    <!-- Error Message -->
    <p *ngIf="errorMessage" class="mt-1 text-xs text-red-600">
      {{ errorMessage }}
    </p>
  `,
  styles: [],
})
export class QuantitySelectorComponent implements ControlValueAccessor {
  @Input() min = 1;
  @Input() max: number | null = null;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showStock = false;

  @Output() valueChange = new EventEmitter<number>();
  @Output() maxReached = new EventEmitter<void>();
  @Output() minReached = new EventEmitter<void>();

  value = 1;
  errorMessage = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  get containerClass(): string {
    const baseClass =
      'inline-flex items-center border border-gray-300 rounded overflow-hidden';
    const sizeClasses = {
      sm: 'text-sm',
      md: '',
      lg: 'text-lg',
    };
    return `${baseClass} ${sizeClasses[this.size]}`;
  }

  get buttonClass(): string {
    return 'flex items-center justify-center text-gray-600 hover:text-gray-900';
  }

  increment(): void {
    if (this.max === null || this.value < this.max) {
      this.updateValue(this.value + this.step);
      this.errorMessage = '';
    } else {
      this.maxReached.emit();
      this.errorMessage = `Quantité maximale atteinte (${this.max})`;
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      this.updateValue(this.value - this.step);
      this.errorMessage = '';
    } else {
      this.minReached.emit();
      this.errorMessage = `Quantité minimale requise (${this.min})`;
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let newValue = parseInt(input.value, 10);

    if (isNaN(newValue)) {
      newValue = this.min;
    }

    // Validation des limites
    if (newValue < this.min) {
      newValue = this.min;
      this.errorMessage = `La quantité minimale est ${this.min}`;
    } else if (this.max !== null && newValue > this.max) {
      newValue = this.max;
      this.errorMessage = `La quantité maximale est ${this.max}`;
    } else {
      this.errorMessage = '';
    }

    this.updateValue(newValue);
  }

  onBlur(): void {
    // Assurer que la valeur est dans les limites au blur
    if (this.value < this.min) {
      this.updateValue(this.min);
    }
    if (this.max !== null && this.value > this.max) {
      this.updateValue(this.max);
    }
    this.onTouched();
  }

  private updateValue(newValue: number): void {
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  // ControlValueAccessor Implementation
  writeValue(value: any): void {
    this.value = value || this.min;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
