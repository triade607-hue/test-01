import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type NotificationType =
  | 'order'
  | 'reservation'
  | 'negotiation'
  | 'donation'
  | 'message'
  | 'product'
  | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  actionLink?: string;
  product?: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
  };
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <a routerLink="/" class="hover:text-primary-500">Accueil</a>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">Notifications</span>
      </nav>

      <!-- Header -->
      <div class="bg-white rounded border border-gray-200 p-6 mb-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <h1 class="text-2xl font-bold text-gray-900">
            Notifications ({{ unreadCount }})
          </h1>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button
              (click)="markAllAsRead()"
              [disabled]="unreadCount === 0"
              class="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-50 rounded transition-colors disabled:opacity-50"
            >
              Tout marquer comme lu
            </button>
            <button
              (click)="clearAll()"
              class="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              Tout effacer
            </button>
          </div>
        </div>

        <!-- Filtres -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            *ngFor="let filter of filters"
            (click)="activeFilter = filter.value"
            [class.bg-primary-500]="activeFilter === filter.value"
            [class.text-white]="activeFilter === filter.value"
            [class.bg-gray-100]="activeFilter !== filter.value"
            [class.text-gray-700]="activeFilter !== filter.value"
            class="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {{ filter.label }}
            <span
              *ngIf="filter.count > 0"
              class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs"
            >
              {{ filter.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div
        *ngIf="filteredNotifications.length === 0"
        class="bg-white rounded border border-gray-200 p-12 text-center"
      >
        <svg
          class="w-24 h-24 mx-auto mb-4 text-gray-300"
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
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Aucune notification
        </h3>
        <p class="text-gray-600">
          Vous n'avez pas de notifications pour le moment
        </p>
      </div>

      <!-- Liste des notifications -->
      <div *ngIf="filteredNotifications.length > 0" class="space-y-3">
        <div
          *ngFor="let notif of filteredNotifications"
          (click)="markAsRead(notif.id)"
          [class.bg-blue-50]="!notif.read"
          [class.bg-white]="notif.read"
          class="rounded border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div class="p-4 flex items-start gap-4">
            <!-- Icon -->
            <div
              [ngClass]="getIconContainerClass(notif.type)"
              class="flex-shrink-0"
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
                  [attr.d]="getIconPath(notif.type)"
                />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1">
                  <h4 class="text-sm font-semibold text-gray-900 mb-1">
                    {{ notif.title }}
                  </h4>
                  <p class="text-sm text-gray-600">{{ notif.description }}</p>

                  <!-- Product Reference -->
                  <div
                    *ngIf="notif.product"
                    class="mt-3 p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div class="flex items-center gap-3">
                      <img
                        [src]="notif.product.image"
                        [alt]="notif.product.title"
                        class="w-16 h-16 rounded object-cover"
                      />
                      <div class="flex-1 min-w-0">
                        <h5 class="text-sm font-medium text-gray-900 truncate">
                          {{ notif.product.title }}
                        </h5>
                        <p class="text-sm font-semibold text-primary-500">
                          {{ notif.product.price }}{{ notif.product.currency }}
                        </p>
                      </div>
                      <a
                        [routerLink]="['/products', notif.product.id]"
                        (click)="$event.stopPropagation()"
                        class="px-3 py-1.5 bg-primary-500 text-white text-xs font-medium rounded hover:bg-primary-600"
                      >
                        Voir
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  *ngIf="!notif.read"
                  class="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"
                ></div>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-between mt-3">
                <span class="text-xs text-gray-500">{{
                  formatTimestamp(notif.timestamp)
                }}</span>
                <div class="flex items-center gap-2">
                  <a
                    *ngIf="notif.actionLabel && notif.actionLink"
                    [routerLink]="notif.actionLink"
                    (click)="$event.stopPropagation()"
                    class="text-xs font-medium text-primary-500 hover:underline"
                  >
                    {{ notif.actionLabel }}
                  </a>
                  <button
                    (click)="
                      deleteNotification(notif.id); $event.stopPropagation()
                    "
                    class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        *ngIf="filteredNotifications.length > 0"
        class="mt-6 flex items-center justify-center"
      >
        <button
          class="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-50 rounded transition-colors"
        >
          Charger plus
        </button>
      </div>
    </div>
  `,
})
export class NotificationsListComponent implements OnInit {
  notifications: Notification[] = [];
  activeFilter = 'all';

  filters: FilterOption[] = [
    { label: 'Toutes', value: 'all', count: 0 },
    { label: 'Commandes', value: 'order', count: 0 },
    { label: 'Réservations', value: 'reservation', count: 0 },
    { label: 'Négociations', value: 'negotiation', count: 0 },
    { label: 'Donations', value: 'donation', count: 0 },
    { label: 'Messages', value: 'message', count: 0 },
    { label: 'Produits', value: 'product', count: 0 },
    { label: 'Système', value: 'system', count: 0 },
  ];

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get filteredNotifications(): Notification[] {
    if (this.activeFilter === 'all') return this.notifications;
    return this.notifications.filter((n) => n.type === this.activeFilter);
  }

  ngOnInit(): void {
    this.loadNotifications();
    this.updateFilterCounts();
  }

  loadNotifications(): void {
    // Mock data - À remplacer par NotificationsService
    this.notifications = [
      {
        id: '1',
        type: 'order',
        title: 'Commande confirmée',
        description:
          'Votre commande #12345 a été confirmée et est en cours de traitement.',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        actionLabel: 'Suivre ma commande',
        actionLink: '/orders/12345',
      },
      {
        id: '2',
        type: 'reservation',
        title: 'Nouvelle réservation',
        description: 'Quelqu\'un a réservé votre produit "MacBook Pro 16"',
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        actionLabel: 'Voir la réservation',
        actionLink: '/reservations/456',
        product: {
          id: 'p1',
          title: 'MacBook Pro 16" M3 Max',
          image: 'https://via.placeholder.com/100',
          price: 2499,
          currency: '€',
        },
      },
      {
        id: '3',
        type: 'negotiation',
        title: 'Nouvelle offre',
        description: 'Un acheteur propose 1800€ pour votre iPhone',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
        actionLabel: 'Répondre',
        actionLink: '/negotiations/789',
      },
      {
        id: '4',
        type: 'message',
        title: 'Nouveau message',
        description: 'Vous avez reçu un nouveau message de @JohnDoe',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/messages/conv-123',
      },
      {
        id: '5',
        type: 'donation',
        title: 'Donation reçue',
        description: 'Vous avez reçu une donation de 50€',
        timestamp: new Date(Date.now() - 259200000),
        read: true,
        actionLabel: 'Détails',
        actionLink: '/donations/don-456',
      },
      {
        id: '6',
        type: 'product',
        title: 'Produit bientôt disponible',
        description: 'PlayStation 5 sera bientôt en stock',
        timestamp: new Date(Date.now() - 345600000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/products/prod-3',
      },
      {
        id: '7',
        type: 'system',
        title: 'Mise à jour CGU',
        description: 'Nos conditions générales ont été mises à jour',
        timestamp: new Date(Date.now() - 432000000),
        read: true,
        actionLabel: 'Lire',
        actionLink: '/legal/terms',
      },
    ];
  }

  updateFilterCounts(): void {
    this.filters.forEach((filter) => {
      if (filter.value === 'all') {
        filter.count = this.notifications.length;
      } else {
        filter.count = this.notifications.filter(
          (n) => n.type === filter.value
        ).length;
      }
    });
  }

  markAsRead(id: string): void {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    // TODO: NotificationsService.markAsRead(id)
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
    // TODO: NotificationsService.markAllAsRead()
  }

  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.updateFilterCounts();
    // TODO: NotificationsService.delete(id)
  }

  clearAll(): void {
    if (
      confirm('Êtes-vous sûr de vouloir supprimer toutes les notifications ?')
    ) {
      this.notifications = [];
      this.updateFilterCounts();
      // TODO: NotificationsService.clearAll()
    }
  }

  getIconContainerClass(type: NotificationType): string {
    const base =
      'w-10 h-10 rounded-full flex items-center justify-center shrink-0';
    const typeClasses: Record<NotificationType, string> = {
      order: 'bg-green-100 text-green-600',
      reservation: 'bg-blue-100 text-blue-600',
      negotiation: 'bg-purple-100 text-purple-600',
      donation: 'bg-orange-100 text-orange-600',
      message: 'bg-gray-100 text-gray-600',
      product: 'bg-yellow-100 text-yellow-600',
      system: 'bg-red-100 text-red-600',
    };
    return `${base} ${typeClasses[type]}`;
  }

  getIconPath(type: NotificationType): string {
    const icons: Record<NotificationType, string> = {
      order:
        'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      reservation:
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      negotiation:
        'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
      donation:
        'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
      message:
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      product:
        'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      system: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    };
    return icons[type];
  }

  formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
