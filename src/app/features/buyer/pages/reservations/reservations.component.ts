import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReservationDetailModalComponent,
  ReservationProduct,
  ReservationStatus,
} from '../../components/reservation-detail-modal/reservation-detail-modal.component';
import { ReservationExtendModalComponent } from '../../components/reservation-extend-modal/reservation-extend-modal.component';

interface Reservation {
  id: string;
  product: {
    name: string;
    image: string;
    quantity: number;
    variant1: { label: string; value: string };
    variant2: { label: string; value: string };
  };
  status: ReservationStatus;
  date: string;
  deadlineDate: string;
  deadlineDateValue: string;
  note: string;
  vendorName: string;
}

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    ReservationDetailModalComponent,
    ReservationExtendModalComponent,
  ],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent {
  showDetailModal: boolean = false;
  showExtendModal: boolean = false;
  selectedReservation: Reservation | null = null;

  reservations: Reservation[] = [
    {
      id: '1',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'pending',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: 'Message au vendeur...',
      vendorName: 'Le vendeur',
    },
    {
      id: '2',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'pending',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
    {
      id: '3',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'in_progress',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
    {
      id: '4',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'in_progress',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
    {
      id: '5',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'expired',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
    {
      id: '6',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'accepted',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
    {
      id: '7',
      product: {
        name: 'Dénomination du produit',
        image:
          'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=80&h=80&fit=crop',
        quantity: 2,
        variant1: { label: 'Variante 1', value: 'valeure' },
        variant2: { label: 'Variante 2', value: 'valeure' },
      },
      status: 'refused',
      date: '12 Décembre 2024',
      deadlineDate: '24 - 07 - 2025',
      deadlineDateValue: '2025-07-24',
      note: '',
      vendorName: 'Le vendeur',
    },
  ];

  getStatusLabel(status: ReservationStatus): string {
    const labels: Record<ReservationStatus, string> = {
      pending: 'En attente',
      in_progress: 'En cours',
      accepted: 'Acceptée',
      refused: 'Refusée',
      expired: 'Expirée',
    };
    return labels[status] || status;
  }

  getStatusClass(status: ReservationStatus): string {
    const classes: Record<ReservationStatus, string> = {
      pending: 'bg-orange-100 text-orange-700',
      in_progress: 'bg-primary-100 text-primary-700',
      accepted: 'bg-green-100 text-green-700',
      refused: 'bg-red-100 text-red-700',
      expired: 'bg-gray-100 text-gray-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  }

  openDetailModal(reservation: Reservation): void {
    this.selectedReservation = reservation;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedReservation = null;
  }

  onExtendRequest(): void {
    this.showDetailModal = false;
    this.showExtendModal = true;
  }

  closeExtendModal(): void {
    this.showExtendModal = false;
    this.selectedReservation = null;
  }

  onExtendSubmitted(data: { deadline: string }): void {
    console.log(
      'Extension demandée:',
      data,
      'pour réservation:',
      this.selectedReservation?.id
    );
    this.closeExtendModal();
  }
}
