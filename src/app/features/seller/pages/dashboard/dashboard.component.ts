import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
}

interface PopularProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
  stock: number;
}

interface Activity {
  id: string;
  type: 'order' | 'review' | 'stock' | 'message';
  message: string;
  time: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Stats
  stats: StatCard[] = [
    {
      title: 'Ventes du mois',
      value: '12 450,00 €',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'trending-up',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Commandes',
      value: '156',
      change: '23 en attente',
      changeType: 'neutral',
      icon: 'shopping-bag',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Produits actifs',
      value: '49',
      change: '5 en rupture',
      changeType: 'negative',
      icon: 'package',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Note moyenne',
      value: '4.8',
      change: '128 avis',
      changeType: 'positive',
      icon: 'star',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
  ];

  // Recent orders
  recentOrders: RecentOrder[] = [
    {
      id: '1',
      orderNumber: 'CMD-2024-001',
      customer: 'Jean Dupont',
      product: 'iPhone 13 Pro',
      amount: 899.99,
      status: 'pending',
      date: new Date(),
    },
    {
      id: '2',
      orderNumber: 'CMD-2024-002',
      customer: 'Marie Martin',
      product: 'MacBook Air M2',
      amount: 1299.0,
      status: 'processing',
      date: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      orderNumber: 'CMD-2024-003',
      customer: 'Pierre Bernard',
      product: 'AirPods Pro',
      amount: 279.0,
      status: 'shipped',
      date: new Date(Date.now() - 172800000),
    },
    {
      id: '4',
      orderNumber: 'CMD-2024-004',
      customer: 'Sophie Leroy',
      product: 'iPad Mini',
      amount: 559.0,
      status: 'delivered',
      date: new Date(Date.now() - 259200000),
    },
    {
      id: '5',
      orderNumber: 'CMD-2024-005',
      customer: 'Lucas Moreau',
      product: 'Apple Watch',
      amount: 449.0,
      status: 'cancelled',
      date: new Date(Date.now() - 345600000),
    },
  ];

  // Popular products
  popularProducts: PopularProduct[] = [
    {
      id: '1',
      name: 'iPhone 13 Pro Max',
      image:
        'https://images.unsplash.com/photo-1632661674596-df8be59a8498?w=80&h=80&fit=crop',
      sales: 45,
      revenue: 40455,
      stock: 12,
    },
    {
      id: '2',
      name: 'MacBook Pro 14"',
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop',
      sales: 28,
      revenue: 55972,
      stock: 8,
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      image:
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&h=80&fit=crop',
      sales: 67,
      revenue: 16683,
      stock: 34,
    },
    {
      id: '4',
      name: 'iPad Air 5',
      image:
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop',
      sales: 23,
      revenue: 15847,
      stock: 15,
    },
  ];

  // Recent activity
  activities: Activity[] = [
    {
      id: '1',
      type: 'order',
      message: 'Nouvelle commande #CMD-2024-001 de Jean Dupont',
      time: new Date(),
    },
    {
      id: '2',
      type: 'review',
      message: 'Nouvel avis 5★ sur "iPhone 13 Pro"',
      time: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      type: 'stock',
      message: 'Stock faible: AirPods Pro (3 restants)',
      time: new Date(Date.now() - 7200000),
    },
    {
      id: '4',
      type: 'message',
      message: 'Nouveau message de Marie Martin',
      time: new Date(Date.now() - 10800000),
    },
    {
      id: '5',
      type: 'order',
      message: 'Commande #CMD-2024-002 expédiée',
      time: new Date(Date.now() - 14400000),
    },
  ];

  // Chart data (periods)
  selectedPeriod: 'week' | 'month' | 'year' = 'month';

  ngOnInit(): void {
    // Load dashboard data
  }

  getStatusLabel(status: RecentOrder['status']): string {
    const labels: Record<RecentOrder['status'], string> = {
      pending: 'En attente',
      processing: 'En cours',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée',
    };
    return labels[status];
  }

  getStatusClasses(status: RecentOrder['status']): string {
    const classes: Record<RecentOrder['status'], string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return classes[status];
  }

  getActivityIcon(type: Activity['type']): string {
    const icons: Record<Activity['type'], string> = {
      order: 'shopping-bag',
      review: 'star',
      stock: 'alert-triangle',
      message: 'message-circle',
    };
    return icons[type];
  }

  getActivityIconClasses(type: Activity['type']): string {
    const classes: Record<Activity['type'], string> = {
      order: 'bg-blue-100 text-blue-600',
      review: 'bg-yellow-100 text-yellow-600',
      stock: 'bg-red-100 text-red-600',
      message: 'bg-green-100 text-green-600',
    };
    return classes[type];
  }

  formatTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    });
  }
}
