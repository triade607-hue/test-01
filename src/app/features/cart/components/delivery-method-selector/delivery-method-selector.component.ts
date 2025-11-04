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
import { LucideAngularModule, ChevronDown, Truck } from 'lucide-angular';

export interface DeliveryMethod {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

@Component({
  selector: 'app-delivery-method-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryMethodSelectorComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <button
        type="button"
        (click)="toggleDropdown()"
        [disabled]="methods.length === 0"
        class="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:border-primary-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        [class.border-primary-500]="isOpen"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div *ngIf="value" class="flex items-center gap-3">
            <img
              [src]="value.logo"
              [alt]="value.name"
              class="w-8 h-8 object-contain shrink-0"
            />
            <span class="text-sm font-medium text-gray-900 truncate">{{
              value.name
            }}</span>
          </div>

          <div *ngIf="!value" class="flex items-center gap-3">
            <lucide-angular
              [img]="TruckIcon"
              class="w-5 h-5 text-gray-400 shrink-0"
            ></lucide-angular>
            <span class="text-sm text-gray-500">Sélectionner une méthode</span>
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
          *ngFor="let method of methods"
          type="button"
          (click)="selectMethod(method)"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3"
          [class.bg-primary-50]="value?.id === method.id"
        >
          <img
            [src]="method.logo"
            [alt]="method.name"
            class="w-8 h-8 object-contain shrink-0"
          />
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900">
              {{ method.name }}
            </div>
            <div
              *ngIf="method.description"
              class="text-xs text-gray-500 mt-0.5"
            >
              {{ method.description }}
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
export class DeliveryMethodSelectorComponent implements ControlValueAccessor {
  @Input() methods: DeliveryMethod[] = [];
  @Output() methodSelected = new EventEmitter<DeliveryMethod>();

  value: DeliveryMethod | null = null;
  isOpen = false;

  ChevronDownIcon = ChevronDown;
  TruckIcon = Truck;

  private onChange: (value: DeliveryMethod | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DeliveryMethod | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: DeliveryMethod | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    if (this.methods.length > 0) {
      this.isOpen = !this.isOpen;
    }
  }

  selectMethod(method: DeliveryMethod): void {
    this.value = method;
    this.methodSelected.emit(method);
    this.onChange(method);
    this.onTouched();
    this.isOpen = false;
  }
}
