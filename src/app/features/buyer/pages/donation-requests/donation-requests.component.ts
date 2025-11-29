import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type DonationStatus = 'pending' | 'recoverable' | 'refused';

interface DonationRequest {
  id: string;
  vendor: {
    name: string;
    avatar: string;
  };
  article: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  status: DonationStatus;
  isRead: boolean;
}

@Component({
  selector: 'app-donation-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation-requests.component.html',
})
export class DonationRequestsComponent {
  requests: DonationRequest[] = [
    {
      id: '1',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'recoverable',
      isRead: false,
    },
    {
      id: '2',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'recoverable',
      isRead: false,
    },
    {
      id: '3',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'recoverable',
      isRead: false,
    },
    {
      id: '4',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'pending',
      isRead: true,
    },
    {
      id: '5',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'refused',
      isRead: true,
    },
    {
      id: '6',
      vendor: { name: 'Vendeur', avatar: '' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      status: 'refused',
      isRead: true,
    },
  ];

  getStatusLabel(status: DonationStatus): string | null {
    const labels: Record<DonationStatus, string | null> = {
      pending: null,
      recoverable: 'Récupérer',
      refused: 'Non accordée',
    };
    return labels[status];
  }

  getStatusClass(status: DonationStatus): string {
    const classes: Record<DonationStatus, string> = {
      pending: '',
      recoverable: 'text-primary-500 hover:text-primary-600 cursor-pointer',
      refused: 'text-red-500',
    };
    return classes[status];
  }

  onRecover(request: DonationRequest): void {
    if (request.status === 'recoverable') {
      console.log('Récupérer demande:', request.id);
      // Navigation vers la page de récupération du don
    }
  }

  onRequestClick(request: DonationRequest): void {
    console.log('Voir détail demande:', request.id);
    // Navigation vers le détail de la demande
  }
}
