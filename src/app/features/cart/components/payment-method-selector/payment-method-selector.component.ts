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
import { LucideAngularModule, ChevronDown, CreditCard } from 'lucide-angular';

export interface PaymentMethod {
  id: string;
  name: string;
  logo: string; // URL du logo
  type: 'card' | 'paypal' | 'bank' | 'other';
}

@Component({
  selector: 'app-payment-method-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentMethodSelectorComponent),
      multi: true,
    },
  ],
  template: `
    <div class="space-y-1.5">
      <label class="block text-xs font-medium text-gray-600">
        {{ label }}
      </label>

      <div class="relative">
        <button
          type="button"
          (click)="toggleDropdown()"
          [disabled]="methods.length === 0"
          class="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border border-gray-300 rounded text-sm text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div *ngIf="selectedMethod" class="flex items-center gap-3">
              <img
                [src]="selectedMethod.logo"
                [alt]="selectedMethod.name"
                class="h-5 object-contain shrink-0"
              />
              <span class="text-gray-900 truncate">{{
                selectedMethod.name
              }}</span>
            </div>

            <div *ngIf="!selectedMethod" class="flex items-center gap-2">
              <lucide-angular
                [img]="CreditCardIcon"
                class="w-4 h-4 text-gray-400 shrink-0"
              ></lucide-angular>
              <span class="text-gray-500"
                >Sélectionner un moyen de paiement</span
              >
            </div>
          </div>
          <lucide-angular
            [img]="ChevronDownIcon"
            class="w-4 h-4 text-gray-400 shrink-0"
          ></lucide-angular>
        </button>

        <!-- Dropdown menu -->
        <div
          *ngIf="isOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-64 overflow-auto"
        >
          <button
            *ngFor="let method of methods"
            type="button"
            (click)="selectMethod(method)"
            class="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3"
            [class.bg-primary-50]="selectedMethod?.id === method.id"
          >
            <img
              [src]="method.logo"
              [alt]="method.name"
              class="h-5 object-contain shrink-0"
            />
            <div class="text-sm font-medium text-gray-900 truncate">
              {{ method.name }}
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PaymentMethodSelectorComponent implements ControlValueAccessor {
  @Input() label = 'Méthode de paiement';
  @Input() methods: PaymentMethod[] = [];
  @Input() selectedMethod: PaymentMethod | null = null;
  @Output() methodSelected = new EventEmitter<PaymentMethod>();

  isOpen = false;

  ChevronDownIcon = ChevronDown;
  CreditCardIcon = CreditCard;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: PaymentMethod | null): void {
    this.selectedMethod = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    if (this.methods.length > 0) {
      this.isOpen = !this.isOpen;
    }
  }

  selectMethod(method: PaymentMethod): void {
    this.selectedMethod = method;
    this.methodSelected.emit(method);
    this.onChange(method);
    this.isOpen = false;
  }
}
