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
import { LucideAngularModule, ChevronDown, MapPin, Plus } from 'lucide-angular';

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-address-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressSelectorComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <!-- Si aucune adresse -->
      <div
        *ngIf="addresses.length === 0"
        class="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50/50 text-center"
      >
        <button
          type="button"
          (click)="onAddAddress()"
          class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
        >
          <lucide-angular [img]="PlusIcon" class="w-4 h-4"></lucide-angular>
          Ajouter une nouvelle adresse
        </button>
      </div>

      <!-- Sélecteur -->
      <div *ngIf="addresses.length > 0">
        <button
          type="button"
          (click)="toggleDropdown()"
          class="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:border-primary-400 focus:outline-none transition-all"
          [class.border-primary-500]="isOpen"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <lucide-angular
              [img]="MapPinIcon"
              class="w-5 h-5 text-gray-400 shrink-0"
            ></lucide-angular>
            <div class="flex-1 min-w-0">
              <div *ngIf="value" class="text-sm text-gray-900">
                {{ value.street }}, {{ value.postalCode }} {{ value.city }},
                {{ value.country }}
              </div>
              <span *ngIf="!value" class="text-sm text-gray-500"
                >Sélectionner une adresse</span
              >
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
          <div class="max-h-72 overflow-y-auto">
            <button
              *ngFor="let address of addresses"
              type="button"
              (click)="selectAddress(address)"
              class="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
              [class.bg-primary-50]="value?.id === address.id"
            >
              <div class="text-sm text-gray-900">
                {{ address.street }}, {{ address.postalCode }}
                {{ address.city }}, {{ address.country }}
              </div>
              <div
                *ngIf="address.isDefault"
                class="text-xs text-primary-600 mt-1.5 font-medium"
              >
                ✓ Adresse par défaut
              </div>
            </button>
          </div>

          <button
            type="button"
            (click)="onAddAddress()"
            class="w-full px-4 py-3 text-left text-sm text-primary-600 hover:bg-primary-50 font-medium flex items-center gap-2 border-t border-gray-200 transition-colors"
          >
            <lucide-angular [img]="PlusIcon" class="w-4 h-4"></lucide-angular>
            Ajouter une nouvelle adresse
          </button>
        </div>
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
export class AddressSelectorComponent implements ControlValueAccessor {
  @Input() addresses: Address[] = [];
  @Output() addAddress = new EventEmitter<void>();

  value: Address | null = null;
  isOpen = false;

  ChevronDownIcon = ChevronDown;
  MapPinIcon = MapPin;
  PlusIcon = Plus;

  private onChange: (value: Address | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Address | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Address | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectAddress(address: Address): void {
    this.value = address;
    this.onChange(address);
    this.onTouched();
    this.isOpen = false;
  }

  onAddAddress(): void {
    this.addAddress.emit();
    this.isOpen = false;
  }
}
