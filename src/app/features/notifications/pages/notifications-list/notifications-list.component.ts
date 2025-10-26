import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../shared/components/breadcrumb/breadcrumb.component';


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
}

interface NotificationFilter {
  label: string;
  value: string;
  count: number;
}

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit {
  activeFilter = 'reservation'; // Première catégorie par défaut
  notifications: Notification[] = [];
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Notifications', isActive: true },
  ];

  filters: NotificationFilter[] = [
    { label: 'Réservations', value: 'reservation', count: 4 },
    { label: 'Négociations', value: 'negotiation', count: 6 },
    { label: 'Remises', value: 'order', count: 25 },
    { label: 'Liste de préférences', value: 'product', count: 2 },
    { label: 'Recherches programmées', value: 'system', count: 2 },
    { label: 'Donations', value: 'donation', count: 21 },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  get filteredNotifications(): Notification[] {
    return this.notifications.filter((n) => n.type === this.activeFilter);
  }

  getActiveFilterLabel(): string {
    const filter = this.filters.find((f) => f.value === this.activeFilter);
    return filter?.label || 'Notifications';
  }

  loadNotifications(): void {
    // Mock data - Toutes les notifications
    this.notifications = [
      // Réservations (4)
      {
        id: 'res-1',
        type: 'reservation',
        title: 'Nouvelle réservation',
        description: 'John Doe a réservé votre iPhone 15 Pro Max',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        actionLabel: 'Voir la réservation',
        actionLink: '/seller/reservations/res-1',
      },
      {
        id: 'res-2',
        type: 'reservation',
        title: 'Réservation confirmée',
        description: 'Sarah Martin confirme la réservation de MacBook Air',
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        actionLabel: 'Voir détails',
        actionLink: '/seller/reservations/res-2',
      },
      {
        id: 'res-3',
        type: 'reservation',
        title: 'Réservation annulée',
        description: 'Marc Dubois a annulé sa réservation',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/seller/reservations/res-3',
      },
      {
        id: 'res-4',
        type: 'reservation',
        title: 'Réservation expirée',
        description: 'La réservation de AirPods Pro a expiré',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
      },

      // Négociations (6)
      {
        id: 'neg-1',
        type: 'negotiation',
        title: 'Nouvelle offre reçue',
        description: 'Alexandre propose 850€ pour votre PlayStation 5',
        timestamp: new Date(Date.now() - 1800000),
        read: false,
        actionLabel: 'Répondre',
        actionLink: '/seller/negotiations/neg-1',
      },
      {
        id: 'neg-2',
        type: 'negotiation',
        title: 'Contre-offre acceptée',
        description: 'Julie accepte votre contre-offre de 1200€',
        timestamp: new Date(Date.now() - 5400000),
        read: false,
        actionLabel: 'Voir',
        actionLink: '/seller/negotiations/neg-2',
      },
      {
        id: 'neg-3',
        type: 'negotiation',
        title: 'Offre refusée',
        description: 'Pierre refuse votre contre-offre',
        timestamp: new Date(Date.now() - 10800000),
        read: true,
        actionLabel: 'Détails',
        actionLink: '/seller/negotiations/neg-3',
      },
      {
        id: 'neg-4',
        type: 'negotiation',
        title: 'Négociation en cours',
        description: 'Sophie propose 650€ pour Nintendo Switch',
        timestamp: new Date(Date.now() - 43200000),
        read: true,
        actionLabel: 'Répondre',
        actionLink: '/seller/negotiations/neg-4',
      },
      {
        id: 'neg-5',
        type: 'negotiation',
        title: 'Offre expirée',
        description: "L'offre de Thomas a expiré",
        timestamp: new Date(Date.now() - 259200000),
        read: true,
      },
      {
        id: 'neg-6',
        type: 'negotiation',
        title: 'Nouvelle négociation',
        description: 'Emma souhaite négocier le prix de votre Apple Watch',
        timestamp: new Date(Date.now() - 345600000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/seller/negotiations/neg-6',
      },

      // Remises / Orders (25 - on en met 5 pour l'exemple)
      {
        id: 'ord-1',
        type: 'order',
        title: 'Remise accordée',
        description: 'Vous avez accordé une remise de 15% à Lucas',
        timestamp: new Date(Date.now() - 900000),
        read: false,
        actionLabel: 'Voir commande',
        actionLink: '/seller/orders/ord-1',
      },
      {
        id: 'ord-2',
        type: 'order',
        title: 'Commande confirmée',
        description: 'Commande #12345 confirmée avec remise',
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        actionLabel: 'Détails',
        actionLink: '/seller/orders/ord-2',
      },
      {
        id: 'ord-3',
        type: 'order',
        title: 'Remise de 20%',
        description: 'Client fidèle - remise appliquée automatiquement',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
      },
      {
        id: 'ord-4',
        type: 'order',
        title: 'Code promo utilisé',
        description: 'Code SUMMER2025 appliqué sur commande #12347',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/seller/orders/ord-4',
      },
      {
        id: 'ord-5',
        type: 'order',
        title: 'Remise flash',
        description: 'Remise flash de 30% accordée pendant 2h',
        timestamp: new Date(Date.now() - 259200000),
        read: true,
      },

      // Liste de préférences (2)
      {
        id: 'pref-1',
        type: 'product',
        title: 'Produit disponible',
        description: 'iPhone 15 Pro de votre liste est maintenant disponible',
        timestamp: new Date(Date.now() - 14400000),
        read: false,
        actionLabel: 'Voir le produit',
        actionLink: '/products/iphone-15-pro',
      },
      {
        id: 'pref-2',
        type: 'product',
        title: 'Baisse de prix',
        description: 'MacBook Pro M3 a baissé de 200€',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/products/macbook-pro-m3',
      },

      // Recherches programmées (2)
      {
        id: 'search-1',
        type: 'system',
        title: 'Nouveaux résultats',
        description:
          '5 nouveaux produits correspondent à votre recherche "PlayStation 5"',
        timestamp: new Date(Date.now() - 21600000),
        read: false,
        actionLabel: 'Voir résultats',
        actionLink: '/search?q=PlayStation+5',
      },
      {
        id: 'search-2',
        type: 'system',
        title: 'Alerte recherche',
        description: '3 nouveaux iPhone 15 dans votre zone',
        timestamp: new Date(Date.now() - 259200000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/search?q=iPhone+15',
      },

      // Donations (21 - on en met 5 pour l'exemple)
      {
        id: 'don-1',
        type: 'donation',
        title: 'Donation acceptée',
        description: 'Votre demande de donation a été acceptée',
        timestamp: new Date(Date.now() - 28800000),
        read: false,
        actionLabel: "Récupérer l'article",
        actionLink: '/donations/don-1',
      },
      {
        id: 'don-2',
        type: 'donation',
        title: 'Article donné',
        description: 'Merci pour votre générosité ! Article récupéré',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
        actionLabel: 'Détails',
        actionLink: '/donations/don-2',
      },
      {
        id: 'don-3',
        type: 'donation',
        title: 'Donation en attente',
        description: 'Votre donation est en cours de validation',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
      },
      {
        id: 'don-4',
        type: 'donation',
        title: 'Donation refusée',
        description: "Votre demande de donation n'a pas été acceptée",
        timestamp: new Date(Date.now() - 259200000),
        read: true,
        actionLabel: 'Non accordé',
      },
      {
        id: 'don-5',
        type: 'donation',
        title: 'Nouvelle donation disponible',
        description: 'Un vélo est disponible près de chez vous',
        timestamp: new Date(Date.now() - 345600000),
        read: true,
        actionLabel: 'Voir',
        actionLink: '/donations/don-5',
      },
    ];
  }

  selectFilter(value: string): void {
    this.activeFilter = value;
  }

  markAsRead(id: string): void {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif && !notif.read) {
      notif.read = true;
      // TODO: Appeler le service pour marquer comme lu dans le backend
    }
  }

  navigateToAction(link: string, notifId: string): void {
    this.markAsRead(notifId);
    if (link) {
      this.router.navigate([link]);
    }
  }

  getIconContainerClass(type: NotificationType): string {
    const base =
      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0';
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
      system: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    };
    return icons[type];
  }

  formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    });
  }
}
