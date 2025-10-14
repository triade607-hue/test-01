// src/app/shared/components/input/input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label
        *ngIf="label"
        [for]="id"
        class="block text-xs font-medium text-gray-600 mb-1.5"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>

      <!-- Input Container -->
      <div class="relative">
        <!-- Icon Left -->
        <div
          *ngIf="iconLeft"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
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
              [attr.d]="getIconPath(iconLeft)"
            />
          </svg>
        </div>

        <!-- Input Field -->
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          [readonly]="readonly"
          [ngModel]="value"
          (ngModelChange)="onValueChange($event)"
          (blur)="onTouched()"
          [ngClass]="inputClasses"
          class="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all"
        />

        <!-- Icon Right / Toggle Password -->
        <div
          *ngIf="iconRight || type === 'password'"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <button
            *ngIf="type === 'password'"
            type="button"
            (click)="togglePasswordVisibility()"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                *ngIf="!showPassword"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                *ngIf="!showPassword"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
              <path
                *ngIf="showPassword"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>

          <svg
            *ngIf="iconRight && type !== 'password'"
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="getIconPath(iconRight)"
            />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <p *ngIf="error" class="mt-1 text-xs text-red-600">
        {{ error }}
      </p>

      <!-- Hint Message -->
      <p *ngIf="hint && !error" class="mt-1 text-xs text-gray-500">
        {{ hint }}
      </p>
    </div>
  `,
  styles: [],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' =
    'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = '';
  @Input() hint = '';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  value = '';
  showPassword = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClasses(): string {
    const leftPadding = this.iconLeft ? 'pl-10' : '';
    const rightPadding =
      this.iconRight || this.type === 'password' ? 'pr-10' : '';
    const borderColor = this.error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-primary-500';
    const disabledClass = this.disabled ? 'bg-gray-100 cursor-not-allowed' : '';

    return `${leftPadding} ${rightPadding} ${borderColor} ${disabledClass}`;
  }

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.onChange(newValue);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }

  // ControlValueAccessor Implementation
  writeValue(value: any): void {
    this.value = value || '';
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

  getIconPath(icon: string): string {
    const icons: { [key: string]: string } = {
      mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      phone:
        'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      calendar:
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    };
    return icons[icon] || '';
  }
}
