import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  selector: 'app-profile-email-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-50 rounded border border-gray-200 mb-4">
      <!-- Header avec titre et icône collapse -->
      <button
        (click)="toggleCollapse()"
        class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors rounded-t"
      >
        <h3 class="text-base font-semibold text-gray-900">
          Adresse mail et contact
        </h3>
        <svg
          class="w-5 h-5 text-gray-500 transition-transform"
          [class.rotate-180]="!isCollapsed"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Contenu collapsible -->
      <div *ngIf="!isCollapsed" class="p-6 pt-2 space-y-4 bg-white rounded-b">
        <!-- Adresse mail -->
        <div>
          <label class="block text-sm font-medium text-gray-900 my-2">
            Adresse mail <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            [(ngModel)]="localEmail"
            placeholder="monadresse@gmail.com"
            class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

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
              [(ngModel)]="localPhone"
              name="phone"
              placeholder="010 000 0000"
              [maxlength]="selectedCountry.phoneLength + 2"
              class="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <!-- Bouton Enregistrer -->
        <div class="pt-2">
          <button
            (click)="onSave()"
            class="w-full px-6 py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors shadow-sm"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfileEmailSectionComponent implements OnInit {
  @Input() email = '';
  @Input() phone = '';
  @Input() isCollapsed = false;

  @Output() save = new EventEmitter<{
    email: string;
    phone: string;
    fullPhone: string;
  }>();

  localEmail = '';
  localPhone = '';

  selectedCountry: Country = {
    code: 'BJ',
    name: 'Bénin',
    flag: '🇧🇯',
    dialCode: '+229',
    phoneLength: 8,
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
  ];

  ngOnInit(): void {
    this.localEmail = this.email;
    this.localPhone = this.phone;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSave(): void {
    const fullPhone =
      this.selectedCountry.dialCode + this.localPhone.replace(/\s/g, '');
    this.save.emit({
      email: this.localEmail,
      phone: this.localPhone,
      fullPhone: fullPhone,
    });
  }
}
