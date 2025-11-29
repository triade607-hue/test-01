import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
  active?: boolean;
}

@Component({
  selector: 'app-buyer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="h-full flex flex-col">
      <!-- User Profile Section - FIXED -->
      <div class="flex-shrink-0 p-6 pb-4">
        <div class="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div
            class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0"
          >
            <img
              [src]="userAvatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              M/Mme &#64;User
            </p>
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FDC830] to-[#F37335]"
            >
              Acheteur
            </span>
          </div>
        </div>
      </div>

      <!-- Navigation Menu - SCROLLABLE -->
      <div class="flex-1 overflow-y-auto px-6">
        <!-- Main Navigation -->
        <nav class="space-y-1">
          <a
            *ngFor="let item of mainMenuItems"
            [routerLink]="item.route"
            routerLinkActive="bg-primary-500 text-white hover:bg-primary-600"
            [routerLinkActiveOptions]="{ exact: item.exact || false }"
            class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors group"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <svg
                *ngIf="item.icon === 'user'"
                class="w-5 h-5"
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
              <svg
                *ngIf="item.icon === 'calendar'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'message-square'"
                class="w-5 h-5"
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
              <svg
                *ngIf="item.icon === 'gift'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'shopping-bag'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'award'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'search'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'map-pin'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'credit-card'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'heart'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'star'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <svg
                *ngIf="item.icon === 'alert-circle'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span>{{ item.label }}</span>
          </a>
        </nav>

        <!-- Support Section -->
        <div class="mt-8 pt-6 border-t border-gray-200 pb-6">
          <p
            class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
          >
            SUPPORTS
          </p>
          <nav class="space-y-1">
            <a
              *ngFor="let item of supportMenuItems"
              [routerLink]="item.route"
              routerLinkActive="text-primary-500"
              class="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 transition-colors"
            >
              <span class="w-5 h-5 flex items-center justify-center">
                <svg
                  *ngIf="item.icon === 'settings'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  *ngIf="item.icon === 'help-circle'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  *ngIf="item.icon === 'message-circle'"
                  class="w-5 h-5"
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
                <svg
                  *ngIf="item.icon === 'log-out'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span>{{ item.label }}</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class BuyerSidebarComponent {
  userAvatar = 'https://i.pravatar.cc/150?img=12';

  mainMenuItems: MenuItem[] = [
    { label: 'Mon Profil', route: '/buyer/profile', icon: 'user' },
    {
      label: 'Mes Réservations',
      route: '/buyer/reservations',
      icon: 'calendar',
    },
    {
      label: 'Mes Négociations',
      route: '/buyer/negotiations',
      icon: 'message-square',
    },
    { label: 'Demandes de dons', route: '/buyer/donations', icon: 'gift' },
    { label: 'Mes Achats', route: '/buyer/purchases', icon: 'shopping-bag' },
    { label: 'Mes Récompenses', route: '/buyer/rewards', icon: 'award' },
    {
      label: 'Recherche Programmée',
      route: '/buyer/scheduled-searches',
      icon: 'search',
    },
    { label: 'Mes Adresses', route: '/buyer/addresses', icon: 'map-pin' },
    {
      label: 'Méthodes de paiement',
      route: '/buyer/payment-methods',
      icon: 'credit-card',
    },
    { label: "Centres d'intérêts", route: '/buyer/interests', icon: 'heart' },
    {
      label: 'Mes réclamations',
      route: '/buyer/complaints',
      icon: 'alert-circle',
    },
  ];

  supportMenuItems: MenuItem[] = [
    { label: 'Paramètres', route: '/buyer/settings', icon: 'settings' },
    { label: 'F.A.Q.', route: '/buyer/faq', icon: 'help-circle' },
    {
      label: 'Chat et Assistance',
      route: '/support/chat',
      icon: 'message-circle',
    },
    { label: 'Se Déconnecter', route: '/auth/logout', icon: 'log-out' },
  ];
}
