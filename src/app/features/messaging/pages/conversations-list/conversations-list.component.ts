import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  product?: {
    title: string;
    image: string;
    price: number;
    currency: string;
  };
}

@Component({
  selector: 'app-conversations-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <a routerLink="/" class="hover:text-primary-500">Accueil</a>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">Messagerie</span>
      </nav>

      <div class="flex gap-6 h-[calc(100vh-200px)]">
        <!-- Liste des conversations -->
        <div
          class="w-full md:w-96 bg-white rounded border border-gray-200 flex flex-col"
        >
          <!-- Header avec recherche -->
          <div class="p-4 border-b border-gray-200">
            <div class="relative">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="filterConversations()"
                placeholder="rechercher une conversation..."
                class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
            </div>
          </div>

          <!-- Liste scrollable -->
          <div class="flex-1 overflow-y-auto">
            <a
              *ngFor="let conv of filteredConversations"
              [routerLink]="['/messages', conv.id]"
              routerLinkActive="bg-primary-50"
              class="block p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <!-- Avatar -->
              <div class="relative flex-shrink-0">
                <img
                  [src]="conv.user.avatar"
                  [alt]="conv.user.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <span
                  *ngIf="conv.user.isOnline"
                  class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                ></span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="font-medium text-gray-900 text-sm truncate">
                    {{ conv.user.name }}
                  </h4>
                  <span class="text-xs text-gray-500">{{
                    formatTime(conv.timestamp)
                  }}</span>
                </div>
                <p class="text-xs text-gray-600 truncate mb-1">
                  {{ conv.lastMessage }}
                </p>
                <div class="flex items-center justify-between">
                  <span
                    *ngIf="conv.product"
                    class="text-xs text-primary-500 truncate"
                    >{{ conv.product.title }}</span
                  >
                  <span
                    *ngIf="conv.unreadCount > 0"
                    class="flex items-center justify-center w-5 h-5 bg-primary-500 text-white text-xs font-medium rounded-full"
                  >
                    {{ conv.unreadCount }}
                  </span>
                </div>
              </div>
            </a>

            <!-- Empty state -->
            <div
              *ngIf="filteredConversations.length === 0"
              class="p-8 text-center text-gray-500"
            >
              <svg
                class="w-16 h-16 mx-auto mb-4 text-gray-300"
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
              <p class="text-sm">Aucune conversation trouvée</p>
            </div>
          </div>
        </div>

        <!-- Message pour mobile: sélectionner une conversation -->
        <div
          class="hidden md:flex flex-1 bg-white rounded border border-gray-200 items-center justify-center text-gray-500"
        >
          <div class="text-center">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p>Sélectionnez une conversation</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConversationsListComponent implements OnInit {
  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  searchQuery = '';

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    // Mock data - À remplacer par MessagingService
    this.conversations = [
      {
        id: '1',
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: true,
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 1,
        product: {
          title: 'Nom du produit',
          image: 'https://via.placeholder.com/100',
          price: 1500,
          currency: '$CAD',
        },
      },
      {
        id: '2',
        user: {
          name: 'Sarah Connor',
          avatar: 'https://i.pravatar.cc/150?img=5',
          isOnline: false,
        },
        lastMessage: 'Merci pour votre réponse!',
        timestamp: new Date(Date.now() - 7200000),
        unreadCount: 0,
      },
      {
        id: '3',
        user: {
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=8',
          isOnline: true,
        },
        lastMessage: 'Le produit est-il toujours disponible?',
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 3,
      },
    ];
    this.filteredConversations = [...this.conversations];
  }

  filterConversations(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredConversations = this.conversations.filter((conv) =>
      conv.user.name.toLowerCase().includes(query)
    );
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)}min`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    });
  }
}
