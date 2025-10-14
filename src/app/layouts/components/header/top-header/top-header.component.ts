// src/app/layouts/components/header/top-header/top-header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
}

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-8">
          <!-- Left side - App Download -->
          <div class="flex items-center gap-2 text-xs text-gray-600">
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span class="hidden sm:inline"
              >Télécharger l'application Occaverse</span
            >
          </div>

          <!-- Right side - Language & Currency -->
          <div class="flex items-center gap-4">
            <!-- Language Dropdown -->
            <div class="relative" #languageDropdown>
              <button
                (click)="toggleLanguageDropdown()"
                class="flex items-center gap-1 text-xs text-gray-700 hover:text-primary-500 transition-colors focus:outline-none"
              >
                <span class="text-base">{{ selectedLanguage.flag }}</span>
                <span class="font-medium">{{ selectedLanguage.code }}</span>
                <svg
                  class="w-3 h-3"
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

              <!-- Language Dropdown Menu -->
              <div
                *ngIf="showLanguageDropdown"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <button
                  *ngFor="let lang of languages"
                  (click)="selectLanguage(lang)"
                  class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  [class.bg-primary-50]="selectedLanguage.code === lang.code"
                  [class.text-primary-600]="selectedLanguage.code === lang.code"
                >
                  <span class="text-lg">{{ lang.flag }}</span>
                  <span>{{ lang.name }}</span>
                  <svg
                    *ngIf="selectedLanguage.code === lang.code"
                    class="w-4 h-4 ml-auto text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Currency Dropdown -->
            <div class="relative" #currencyDropdown>
              <button
                (click)="toggleCurrencyDropdown()"
                class="flex items-center gap-1 text-xs text-gray-700 hover:text-primary-500 transition-colors focus:outline-none"
              >
                <span class="font-medium">{{ selectedCurrency.code }}</span>
                <svg
                  class="w-3 h-3"
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

              <!-- Currency Dropdown Menu -->
              <div
                *ngIf="showCurrencyDropdown"
                class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <button
                  *ngFor="let curr of currencies"
                  (click)="selectCurrency(curr)"
                  class="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  [class.bg-primary-50]="selectedCurrency.code === curr.code"
                  [class.text-primary-600]="selectedCurrency.code === curr.code"
                >
                  <span>{{ curr.code }}</span>
                  <span class="text-gray-500">{{ curr.symbol }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TopHeaderComponent {
  showLanguageDropdown = false;
  showCurrencyDropdown = false;

  languages: Language[] = [
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  ];

  currencies: Currency[] = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' },
    { code: 'CAD', symbol: '$CAD' },
  ];

  selectedLanguage: Language = this.languages[0];
  selectedCurrency: Currency = this.currencies[0];

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    this.showCurrencyDropdown = false;
  }

  toggleCurrencyDropdown(): void {
    this.showCurrencyDropdown = !this.showCurrencyDropdown;
    this.showLanguageDropdown = false;
  }

  selectLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.showLanguageDropdown = false;
    // TODO: Implémenter le changement de langue
    console.log('Langue sélectionnée:', lang);
  }

  selectCurrency(curr: Currency): void {
    this.selectedCurrency = curr;
    this.showCurrencyDropdown = false;
    // TODO: Implémenter le changement de devise
    console.log('Devise sélectionnée:', curr);
  }

  // Close dropdowns when clicking outside
  closeDropdowns(): void {
    this.showLanguageDropdown = false;
    this.showCurrencyDropdown = false;
  }
}
