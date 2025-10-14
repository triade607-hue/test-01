// src/app/layouts/components/header/main-header/main-header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  template: `
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 gap-4">
          <!-- Logo -->
          <a routerLink="/" class="flex-shrink-0">
            <h1 class="text-2xl font-bold text-primary-500">OCCAVERSE</h1>
          </a>

          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex flex-1 max-w-2xl mx-8">
            <app-search-bar
              placeholder="Rechercher sur Occaverse"
              [suggestions]="searchSuggestions"
              (search)="onSearch($event)"
              (suggestionSelected)="onSuggestionSelected($event)"
            ></app-search-bar>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Vendre un bien (Desktop) -->
            <a
              routerLink="/seller/products/new"
              class="hidden lg:flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              <svg
                class="w-5 h-5"
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
              <span>Vendre un bien</span>
            </a>

            <!-- User Icon -->
            <button
              (click)="toggleUserMenu()"
              class="relative p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              title="Mon compte"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <!-- User Dropdown -->
              <div
                *ngIf="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <a
                  routerLink="/buyer/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                >
                  Mon compte
                </a>
                <a
                  routerLink="/buyer/orders"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Mes commandes
                </a>
                <a
                  routerLink="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Paramètres
                </a>
                <hr class="my-1 border-gray-200" />
                <button
                  (click)="logout()"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                >
                  Déconnexion
                </button>
              </div>
            </button>

            <!-- Messages Icon -->
            <a
              routerLink="/messages"
              class="relative p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Messages"
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <!-- Badge notification -->
              <span
                *ngIf="unreadMessagesCount > 0"
                class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ unreadMessagesCount }}
              </span>
            </a>

            <!-- Favoris Icon -->
            <a
              routerLink="/buyer/favorites"
              class="p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Mes favoris"
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </a>

            <!-- Notifications Icon -->
            <button
              (click)="toggleNotifications()"
              class="relative p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              title="Notifications"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <!-- Badge notification -->
              <span
                *ngIf="notificationsCount > 0"
                class="absolute top-0.5 right-0.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full"
              >
                {{ notificationsCount }}
              </span>

              <!-- Notifications Dropdown -->
              <div
                *ngIf="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
              >
                <div class="p-4 border-b border-gray-200">
                  <h3 class="font-semibold text-gray-900">Notifications</h3>
                </div>

                <!-- Notification Items -->
                <div class="divide-y divide-gray-100">
                  <a
                    *ngFor="let notif of notifications"
                    [routerLink]="notif.link"
                    class="block p-4 hover:bg-gray-50 transition-colors"
                    [class.bg-blue-50]="!notif.read"
                  >
                    <div class="flex items-start gap-3">
                      <div [class]="notif.iconClass">
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            [attr.d]="getNotificationIconPath(notif.type)"
                          />
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">
                          {{ notif.title }}
                        </p>
                        <p class="text-xs text-gray-600 mt-1">
                          {{ notif.message }}
                        </p>
                        <p class="text-xs text-gray-500 mt-1">
                          {{ notif.time }}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <!-- View All -->
                <a
                  routerLink="/notifications"
                  class="block p-3 text-center text-sm text-primary-500 hover:bg-gray-50 font-medium border-t border-gray-200"
                >
                  Voir toutes les notifications
                </a>
              </div>
            </button>

            <!-- Cart Icon -->
            <a
              routerLink="/cart"
              class="relative p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Panier"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <!-- Badge count -->
              <span
                *ngIf="cartItemsCount > 0"
                class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-primary-500 text-white text-xs rounded-full font-medium"
              >
                {{ cartItemsCount }}
              </span>
            </a>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Search (shown on mobile) -->
        <div class="md:hidden pb-3">
          <app-search-bar
            placeholder="Rechercher..."
            size="sm"
            (search)="onSearch($event)"
          ></app-search-bar>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MainHeaderComponent {
  showUserMenu = false;
  showNotifications = false;
  showMobileMenu = false;

  unreadMessagesCount = 3;
  notificationsCount = 5;
  cartItemsCount = 2;

  searchSuggestions: string[] = [
    'iPhone 15',
    'MacBook Pro',
    'AirPods',
    'iPad Pro',
    'Apple Watch',
  ];

  notifications = [
    {
      type: 'order',
      title: 'Commande expédiée',
      message: 'Votre commande #12345 a été expédiée',
      time: 'Il y a 2 heures',
      read: false,
      link: '/buyer/orders/12345',
      iconClass:
        'w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0',
    },
    {
      type: 'message',
      title: 'Nouveau message',
      message: 'TechStore Montreal vous a envoyé un message',
      time: 'Il y a 5 heures',
      read: false,
      link: '/messages/123',
      iconClass:
        'w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0',
    },
  ];

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    // TODO: Ouvrir un drawer mobile
  }

  onSearch(query: string): void {
    console.log('Recherche:', query);
    // TODO: Navigate to search results
  }

  onSuggestionSelected(suggestion: string): void {
    console.log('Suggestion sélectionnée:', suggestion);
    this.onSearch(suggestion);
  }

  logout(): void {
    // TODO: Implémenter la déconnexion
    console.log('Déconnexion');
    this.showUserMenu = false;
  }

  getNotificationIconPath(type: string): string {
    const icons: { [key: string]: string } = {
      order: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      message:
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    };
    return icons[type] || '';
  }
}
