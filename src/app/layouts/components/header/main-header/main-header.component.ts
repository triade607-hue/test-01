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
    <div class="bg-white">
      <div class="container mx-auto px-4">
        <!-- Desktop Layout: 3 blocs en space-between -->
        <div class="hidden md:flex items-center justify-between h-16 gap-6">
          <!-- Bloc 1: Logo -->
          <a routerLink="/" class="flex-shrink-0">
            <img src="assets/images/logo/occaverse.png" alt="OCCAVERSE" />
          </a>

          <!-- Bloc 2: Search Bar (centre, prend l'espace disponible) -->
          <div class="flex-1 max-w-2xl">
            <app-search-bar
              placeholder="Rechercher sur Occaverse"
              [suggestions]="searchSuggestions"
              (search)="onSearch($event)"
              (suggestionSelected)="onSuggestionSelected($event)"
            ></app-search-bar>
          </div>

          <!-- Bloc 3: Actions (4 icônes) -->
          <div class="flex items-center gap-2 flex-shrink-0">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span
                *ngIf="unreadMessagesCount > 0"
                class="absolute top-[-2px] right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-500 rounded-full"
              >
                {{ unreadMessagesCount }}
              </span>
            </a>

            <!-- Favoris Icon -->
            <a
              routerLink="/favorites"
              class="relative p-2 text-gray-600 hover:text-primary-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Favoris"
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
              <span
                *ngIf="notificationsCount > 0"
                class="absolute top-[-2px] right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-500 rounded-full"
              >
                {{ notificationsCount }}
              </span>

              <!-- Notifications Dropdown -->
              <div
                *ngIf="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
              >
                <!-- Header -->
                <div class="px-4 py-3 border-b border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-900 text-center">
                    Notifications
                  </h3>
                </div>

                <!-- Notifications List -->
                <div class="divide-y divide-gray-200">
                  <a
                    *ngFor="let notif of notifications"
                    [routerLink]="notif.link"
                    (click)="showNotifications = false"
                    class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    [class.bg-blue-50]="!notif.read"
                  >
                    <!-- Icon -->
                    <div [ngClass]="notif.iconClass">
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
                          [attr.d]="getNotificationIconPath(notif.type)"
                        />
                      </svg>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 text-left">
                        {{ notif.title }}
                      </p>
                      <p class="text-sm text-gray-600 text-left">
                        {{ notif.message }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1 text-left">
                        {{ notif.time }}
                      </p>
                    </div>
                  </a>
                </div>

                <!-- Footer -->
                <div class="px-4 py-3 border-t border-gray-200 text-center">
                  <a
                    routerLink="/notifications"
                    class="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    (click)="showNotifications = false"
                  >
                    Voir toutes les notifications
                  </a>
                </div>
              </div>
            </button>

            <!-- Panier Icon -->
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
              <span
                *ngIf="cartItemsCount > 0"
                class="absolute top-[-2px] right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-500 rounded-full"
              >
                {{ cartItemsCount }}
              </span>
            </a>
          </div>
        </div>

        <!-- Mobile Layout -->
        <div class="md:hidden">
          <!-- Top row: Logo + Mobile Menu -->
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a routerLink="/" class="flex-shrink-0">
              <img
                src="assets/images/logo/occaverse-mobile.png"
                alt="OCCAVERSE"
                class="h-8"
              />
            </a>
            <!-- Mobile Actions -->
            <div class="flex items-center gap-1">
              <!-- Messages -->
              <a routerLink="/messages" class="relative p-2 text-gray-600">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span
                  *ngIf="unreadMessagesCount > 0"
                  class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                ></span>
              </a>

              <!-- Favoris -->
              <a routerLink="/favorites" class="relative p-2 text-gray-600">
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

              <!-- Notifications -->
              <a routerLink="/notifications" class="relative p-2 text-gray-600">
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
                <span
                  *ngIf="notificationsCount > 0"
                  class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                ></span>
              </a>

              <!-- Panier -->
              <a routerLink="/cart" class="relative p-2 text-gray-600">
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
                <span
                  *ngIf="cartItemsCount > 0"
                  class="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"
                ></span>
              </a>
            </div>
          </div>

          <!-- Search Bar Mobile (Below) -->
          <div class="pb-4">
            <app-search-bar
              placeholder="Rechercher"
              [suggestions]="searchSuggestions"
              (search)="onSearch($event)"
              (suggestionSelected)="onSuggestionSelected($event)"
            ></app-search-bar>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MainHeaderComponent {
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
    {
      type: 'favorite',
      title: 'Prix réduit',
      message: 'Un article de vos favoris a baissé de prix',
      time: 'Il y a 1 jour',
      read: true,
      link: '/favorites',
      iconClass:
        'w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0',
    },
  ];

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
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

  getNotificationIconPath(type: string): string {
    const icons: { [key: string]: string } = {
      order: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      message:
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      favorite: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
    };
    return icons[type] || '';
  }
}
