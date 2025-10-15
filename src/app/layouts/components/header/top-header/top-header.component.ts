// src/app/layouts/components/header/top-header/top-header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white h-12">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-12">
          <!-- Left: Télécharger l'app -->
          <a
            href="/download"
            class="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-500 transition-colors"
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
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span class="hidden sm:inline"
              >Télécharger l'application Occaverse</span
            >
            <span class="sm:hidden">App</span>
          </a>

          <!-- Right: Vendre un bien + User Menu + Langue + Devise -->
          <div class="flex items-center gap-4">
            <!-- Vendre un bien -->
            <a
              routerLink="/seller/products/new"
              class="flex items-center gap-1.5 text-xs text-gray-700 hover:text-primary-500 font-medium transition-colors"
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
              <span class="hidden md:inline">Vendre un bien</span>
            </a>

            <!-- User Menu Dropdown -->
            <div class="relative">
              <button
                (click)="toggleUserMenu()"
                class="flex items-center gap-1.5 text-xs text-gray-700 hover:text-primary-500 transition-colors focus:outline-none"
                title="Mon compte"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="hidden md:inline">Mon compte</span>
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

              <!-- User Dropdown Menu -->
              <div
                *ngIf="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
              >
                <a
                  routerLink="/buyer/profile"
                  class="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 first:rounded-t"
                  (click)="showUserMenu = false"
                >
                  Espace Acheteur
                </a>
                <a
                  routerLink="/seller/dashboard"
                  class="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  (click)="showUserMenu = false"
                >
                  Espace Vendeur
                </a>
                <a
                  routerLink="/settings"
                  class="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  (click)="showUserMenu = false"
                >
                  Paramètres
                </a>
                <hr class="my-1 border-gray-200" />
                <button
                  (click)="logout()"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            <!-- Language Dropdown -->
            <div class="relative">
              <button
                (click)="toggleLanguageDropdown()"
                class="flex items-center gap-1 text-xs text-gray-700 hover:text-primary-500 transition-colors focus:outline-none"
              >
                <span>{{ selectedLanguage.flag }}</span>
                <span class="hidden sm:inline">{{
                  selectedLanguage.code
                }}</span>
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
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50"
              >
                <button
                  *ngFor="let lang of languages"
                  (click)="selectLanguage(lang)"
                  class="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 first:rounded-t last:rounded-b transition-colors"
                  [class.bg-primary-50]="lang.code === selectedLanguage.code"
                  [class.text-primary-600]="lang.code === selectedLanguage.code"
                >
                  <span class="flex items-center gap-2">
                    <span>{{ lang.flag }}</span>
                    <span>{{ lang.name }}</span>
                  </span>
                  <svg
                    *ngIf="lang.code === selectedLanguage.code"
                    class="w-4 h-4 text-primary-500"
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
            <div class="relative">
              <button
                (click)="toggleCurrencyDropdown()"
                class="flex items-center gap-1 text-xs text-gray-700 hover:text-primary-500 transition-colors focus:outline-none"
              >
                <span>{{ selectedCurrency.code }}</span>
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
                class="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50"
              >
                <button
                  *ngFor="let curr of currencies"
                  (click)="selectCurrency(curr)"
                  class="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 first:rounded-t last:rounded-b transition-colors"
                  [class.bg-primary-50]="curr.code === selectedCurrency.code"
                  [class.text-primary-600]="curr.code === selectedCurrency.code"
                >
                  <span>{{ curr.symbol }} {{ curr.code }}</span>
                  <svg
                    *ngIf="curr.code === selectedCurrency.code"
                    class="w-4 h-4 text-primary-500"
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
  showUserMenu = false;

  languages: Language[] = [
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  ];

  currencies: Currency[] = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  ];

  selectedLanguage: Language = this.languages[0];
  selectedCurrency: Currency = this.currencies[0];

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    this.showCurrencyDropdown = false;
    this.showUserMenu = false;
  }

  toggleCurrencyDropdown(): void {
    this.showCurrencyDropdown = !this.showCurrencyDropdown;
    this.showLanguageDropdown = false;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showLanguageDropdown = false;
    this.showCurrencyDropdown = false;
  }

  selectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.showLanguageDropdown = false;
    console.log('Langue sélectionnée:', language.name);
  }

  selectCurrency(currency: Currency): void {
    this.selectedCurrency = currency;
    this.showCurrencyDropdown = false;
    console.log('Devise sélectionnée:', currency.name);
  }

  logout(): void {
    console.log('Déconnexion');
    this.showUserMenu = false;
    // TODO: Implémenter la déconnexion avec AuthService
  }
}
