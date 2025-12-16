import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-seller-sidebar',
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
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FDC830] to-[#F37335]"
            >
              Vendeur
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
            class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors group"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <!-- Dashboard -->
              <svg
                *ngIf="item.icon === 'dashboard'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <!-- Products -->
              <svg
                *ngIf="item.icon === 'products'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <!-- Stock -->
              <svg
                *ngIf="item.icon === 'stock'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <!-- Sales -->
              <svg
                *ngIf="item.icon === 'sales'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <!-- Reservations -->
              <svg
                *ngIf="item.icon === 'reservations'"
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
              <!-- Negotiations -->
              <svg
                *ngIf="item.icon === 'negotiations'"
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
              <!-- Donations -->
              <svg
                *ngIf="item.icon === 'donations'"
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
              <!-- Discounts -->
              <svg
                *ngIf="item.icon === 'discounts'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <!-- Pending Carts -->
              <svg
                *ngIf="item.icon === 'pending-carts'"
                class="w-5 h-5"
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
              <!-- Reviews -->
              <svg
                *ngIf="item.icon === 'reviews'"
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
              <!-- Rewards -->
              <svg
                *ngIf="item.icon === 'rewards'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>
            <span>{{ item.label }}</span>
          </a>
        </nav>

        <!-- Support Section -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p
            class="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
          >
            Supports
          </p>
          <nav class="space-y-1">
            <a
              *ngFor="let item of supportMenuItems"
              [routerLink]="item.route"
              routerLinkActive="bg-primary-500 text-white hover:bg-primary-600"
              [routerLinkActiveOptions]="{ exact: item.exact || false }"
              class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors"
              [class.text-error]="item.icon === 'log-out'"
              [class.hover:bg-red-50]="item.icon === 'log-out'"
            >
              <span class="w-5 h-5 flex items-center justify-center">
                <!-- Settings -->
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
                <!-- FAQ -->
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
                <!-- Chat -->
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
                <!-- Logout -->
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
export class SellerSidebarComponent {
  userAvatar = 'https://i.pravatar.cc/150?img=12';

  mainMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/seller/dashboard',
      icon: 'dashboard',
      exact: true,
    },
    { label: 'Mes articles', route: '/seller/products', icon: 'products' },
    {
      label: 'Réservations',
      route: '/seller/reservations',
      icon: 'reservations',
    },
    {
      label: "Validation d'articles",
      route: '/seller/validation',
      icon: 'stock',
    },
    {
      label: 'Négociations',
      route: '/seller/negotiations',
      icon: 'negotiations',
    },
    {
      label: 'Demandes de Dons',
      route: '/seller/donations',
      icon: 'donations',
    },
    { label: 'Mes ventes', route: '/seller/sales', icon: 'sales' },
    { label: 'Mes récompenses', route: '/seller/rewards', icon: 'rewards' },
    {
      label: 'Demandes des réductions',
      route: '/seller/discounts',
      icon: 'discounts',
    },
  ];

  supportMenuItems: MenuItem[] = [
    { label: 'Paramètres', route: '/seller/settings', icon: 'settings' },
    { label: 'F.A.Q.', route: '/seller/faq', icon: 'help-circle' },
    {
      label: 'Chat et Assistance',
      route: '/seller/support',
      icon: 'message-circle',
    },
    { label: 'Se Déconnecter', route: '/auth/logout', icon: 'log-out' },
  ];
}
