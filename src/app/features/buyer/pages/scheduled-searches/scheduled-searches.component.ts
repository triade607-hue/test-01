import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleSearchModalComponent } from '../../../public/components/schedule-search-modal/schedule-search-modal.component';

interface ScheduledSearch {
  id: string;
  vendor: {
    name: string;
  };
  article: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  isRead: boolean;
}

@Component({
  selector: 'app-scheduled-searches',
  standalone: true,
  imports: [CommonModule, ScheduleSearchModalComponent],
  templateUrl: './scheduled-searches.component.html',
})
export class ScheduledSearchesComponent {
  showAddModal = false;

  searches: ScheduledSearch[] = [
    {
      id: '1',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: false,
    },
    {
      id: '2',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: false,
    },
    {
      id: '3',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: false,
    },
    {
      id: '4',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: false,
    },
    {
      id: '5',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: true,
    },
    {
      id: '6',
      vendor: { name: 'Vendeur' },
      article: {
        name: 'Article',
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop',
      },
      date: "Aujourd'hui",
      time: '15:55',
      isRead: true,
    },
  ];

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onSearchAdded(data: any): void {
    console.log('Nouvelle recherche programmée:', data);
    // Ajouter la nouvelle recherche à la liste
    this.showAddModal = false;
  }

  viewProduct(search: ScheduledSearch): void {
    console.log('Voir produit:', search.id);
    // Navigation vers la page produit
  }
}
