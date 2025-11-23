import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phoneLength: number;
}

@Component({
  selector: 'app-add-address-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-md max-w-xl w-full max-h-[90vh] flex flex-col relative"
      >
        <!-- Close Button -->
        <button
          (click)="close()"
          class="absolute top-4 right-4 z-10 text-error hover:text-error/80 transition-colors"
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

        <!-- Header - Fixed -->
        <div class="flex-shrink-0 p-8 pb-4">
          <h2 class="text-2xl font-bold text-primary-500">
            {{ addressToEdit ? "Modifier l'adresse" : 'Nouvelle adresse' }}
          </h2>
        </div>

        <!-- Content - Scrollable -->
        <div class="flex-1 overflow-y-auto px-8">
          <form class="space-y-4 pb-4">
            <!-- Numéro de téléphone -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Numéro de téléphone <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <select
                  [(ngModel)]="selectedCountry"
                  name="country"
                  class="w-32 px-2 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option *ngIf="selectedCountry" [ngValue]="selectedCountry">
                    {{ selectedCountry.flag }} {{ selectedCountry.dialCode }}
                  </option>
                  <option *ngFor="let country of countries" [ngValue]="country">
                    {{ country.flag }} {{ country.dialCode }}
                  </option>
                </select>
                <input
                  type="tel"
                  [(ngModel)]="phone"
                  name="phone"
                  placeholder="+1 000 000 0000"
                  [maxlength]="selectedCountry.phoneLength + 2"
                  class="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Adresse avec autocomplete -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Adresse <span class="text-red-500">*</span>
              </label>
              <input
                #addressInput
                type="text"
                [(ngModel)]="address"
                name="address"
                (input)="onAddressInput()"
                (focus)="onAddressFocus()"
                (blur)="onAddressBlur()"
                placeholder="Lieu de l'adresse, Rue, Ville, Pays..."
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>
        </div>

        <!-- Footer - Fixed -->
        <div
          class="flex-shrink-0 p-8 pt-4 border-t border-gray-200 bg-white rounded-b-md"
        >
          <button
            (click)="onSubmit()"
            class="w-full px-6 py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors shadow-sm"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>

    <!-- Dropdown suggestions FIXED par rapport au viewport -->
    <div
      *ngIf="showSuggestions && filteredSuggestions.length > 0"
      [style.position]="'fixed'"
      [style.left.px]="suggestionsPosition.left"
      [style.top.px]="suggestionsPosition.top"
      [style.width.px]="suggestionsPosition.width"
      class="z-[100] bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto"
    >
      <button
        *ngFor="let suggestion of filteredSuggestions"
        type="button"
        (mousedown)="selectSuggestion(suggestion)"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {{ suggestion }}
      </button>
    </div>

    <!-- Overlay pour fermer les suggestions -->
    <div
      *ngIf="showSuggestions"
      (click)="showSuggestions = false"
      class="fixed inset-0 z-[90]"
    ></div>
  `,
  styles: [],
})
export class AddAddressModalComponent implements OnInit {
  @ViewChild('addressInput') addressInputRef!: ElementRef;

  @Input() addressToEdit: any = null;
  @Output() closed = new EventEmitter<void>();
  @Output() addressSaved = new EventEmitter<any>();

  phone = '';
  address = '';
  showSuggestions = false;
  filteredSuggestions: string[] = [];
  suggestionsPosition = { left: 0, top: 0, width: 0 };

  selectedCountry: Country = {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    phoneLength: 10,
  };

  countries: Country[] = [
    { code: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229', phoneLength: 8 },
    {
      code: 'CI',
      name: "Côte d'Ivoire",
      flag: '🇨🇮',
      dialCode: '+225',
      phoneLength: 10,
    },
    {
      code: 'SN',
      name: 'Sénégal',
      flag: '🇸🇳',
      dialCode: '+221',
      phoneLength: 9,
    },
    { code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228', phoneLength: 8 },
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', phoneLength: 9 },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', phoneLength: 10 },
    {
      code: 'US',
      name: 'États-Unis',
      flag: '🇺🇸',
      dialCode: '+1',
      phoneLength: 10,
    },
    {
      code: 'BE',
      name: 'Belgique',
      flag: '🇧🇪',
      dialCode: '+32',
      phoneLength: 9,
    },
  ];

  addressSuggestions: string[] = [
    '123 Rue de la Paix, Paris, France',
    '456 Avenue des Champs-Élysées, Paris, France',
    '789 Boulevard Saint-Michel, Paris, France',
    '10 Rue Victor Hugo, Lyon, France',
    '20 Avenue de la République, Marseille, France',
    '30 Place de la Liberté, Bordeaux, France',
    '40 Rue du Commerce, Toulouse, France',
    '50 Avenue Jean Jaurès, Lille, France',
    '123 Main Street, Toronto, Canada',
    '456 King Street, Montreal, Canada',
    '789 Queen Street, Vancouver, Canada',
    '10 Avenue du Port, Cotonou, Bénin',
    '20 Boulevard de la Marina, Cotonou, Bénin',
  ];

  ngOnInit(): void {
    if (this.addressToEdit) {
      this.address = this.addressToEdit.address;
      this.phone = this.addressToEdit.phone;
    }
  }

  onAddressInput(): void {
    if (this.address.length >= 3) {
      this.filteredSuggestions = this.addressSuggestions.filter((s) =>
        s.toLowerCase().includes(this.address.toLowerCase())
      );
      this.updateSuggestionsPosition();
      this.showSuggestions = true;
    } else {
      this.filteredSuggestions = [];
      this.showSuggestions = false;
    }
  }

  onAddressFocus(): void {
    if (this.address.length >= 3 && this.filteredSuggestions.length > 0) {
      this.updateSuggestionsPosition();
      this.showSuggestions = true;
    }
  }

  onAddressBlur(): void {
    // Délai pour permettre le clic sur une suggestion
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  updateSuggestionsPosition(): void {
    if (this.addressInputRef) {
      const rect = this.addressInputRef.nativeElement.getBoundingClientRect();
      this.suggestionsPosition = {
        left: rect.left,
        top: rect.bottom + 4, // 4px en dessous de l'input
        width: rect.width,
      };
    }
  }

  selectSuggestion(suggestion: string): void {
    this.address = suggestion;
    this.showSuggestions = false;
  }

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (!this.phone || !this.address) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const fullPhone = this.selectedCountry.dialCode + ' ' + this.phone;

    const addressData = {
      id: this.addressToEdit?.id || Date.now().toString(),
      phone: this.phone,
      fullPhone: fullPhone,
      address: this.address,
      isPrimary: this.addressToEdit?.isPrimary || false,
    };

    this.addressSaved.emit(addressData);
    this.close();
  }
}
