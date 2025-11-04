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
import { LucideAngularModule, ChevronDown, Package } from 'lucide-angular';

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  estimatedDays?: string;
}

@Component({
  selector: 'app-delivery-option-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryOptionSelectorComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <button
        type="button"
        (click)="toggleDropdown()"
        [disabled]="options.length === 0"
        class="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:border-primary-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        [class.border-primary-500]="isOpen"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <lucide-angular
            [img]="PackageIcon"
            class="w-5 h-5 text-gray-400 shrink-0"
          ></lucide-angular>
          <div class="flex-1 min-w-0">
            <span *ngIf="value" class="text-sm font-medium text-gray-900">
              {{ value.name }} - {{ value.price | currency : 'EUR' }}
            </span>
            <span *ngIf="!value" class="text-sm text-gray-500">
              Sélectionner une option
            </span>
          </div>
        </div>
        <lucide-angular
          [img]="ChevronDownIcon"
          class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200"
          [class.rotate-180]="isOpen"
        ></lucide-angular>
      </button>

      <!-- Liste -->
      <div
        *ngIf="isOpen"
        class="mt-2 bg-white rounded-lg shadow-md overflow-hidden animate-slideDown"
      >
        <button
          *ngFor="let option of options"
          type="button"
          (click)="selectOption(option)"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
          [class.bg-primary-50]="value?.id === option.id"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900">
                {{ option.name }}
              </div>
              <div
                *ngIf="option.description"
                class="text-xs text-gray-500 mt-0.5"
              >
                {{ option.description }}
              </div>
              <div
                *ngIf="option.estimatedDays"
                class="text-xs text-gray-600 mt-1"
              >
                Délai: {{ option.estimatedDays }}
              </div>
            </div>
            <div class="text-sm font-semibold text-gray-900 shrink-0">
              {{ option.price | currency : 'EUR' }}
            </div>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-slideDown {
        animation: slideDown 0.15s ease-out;
      }
    `,
  ],
})
export class DeliveryOptionSelectorComponent implements ControlValueAccessor {
  @Input() options: DeliveryOption[] = [];
  @Output() optionSelected = new EventEmitter<DeliveryOption>();

  value: DeliveryOption | null = null;
  isOpen = false;

  ChevronDownIcon = ChevronDown;
  PackageIcon = Package;

  private onChange: (value: DeliveryOption | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DeliveryOption | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: DeliveryOption | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    if (this.options.length > 0) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: DeliveryOption): void {
    this.value = option;
    this.optionSelected.emit(option);
    this.onChange(option);
    this.onTouched();
    this.isOpen = false;
  }
}
