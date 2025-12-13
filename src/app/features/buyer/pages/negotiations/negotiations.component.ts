import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isSent: boolean;
  isOffer?: boolean;
  offerAmount?: number;
  currency?: string;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
    lastActive?: string;
  };
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
  };
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  messages: Message[];
  status: 'negotiating' | 'accepted' | 'rejected';
  acceptedPrice?: number;
}

@Component({
  selector: 'app-negotiations',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './negotiations.component.html',
  styleUrls: ['./negotiations.component.scss'],
})
export class NegotiationsComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  activeConversation: Conversation | null = null;
  searchQuery = '';
  offerAmount: number = 1300;
  minOffer: number = 100;
  maxOffer: number = 1500;
  showConfirmModal = false;
  pendingOfferAmount = 0;
  showChatOnMobile = false;
  private shouldScrollToBottom = false;

  ngOnInit(): void {
    this.loadConversations();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  loadConversations(): void {
    this.conversations = [
      {
        id: '1',
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: true,
          lastActive: 'Last active 1 hour ago',
        },
        product: {
          id: 'p1',
          title: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 1500,
          currency: '$CAD',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 1,
        messages: [],
        status: 'negotiating',
      },
      {
        id: '2',
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: true,
          lastActive: 'Last active 1 hour ago',
        },
        product: {
          id: 'p2',
          title: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 1500,
          currency: '$CAD',
        },
        lastMessage: 'Je vous propose 800€',
        timestamp: new Date(Date.now() - 7200000),
        unreadCount: 1,
        messages: [
          {
            id: 'm1',
            content:
              'Bonjour ! Je suis intéressé(e) par le produit et je vous propose 650€',
            timestamp: new Date(Date.now() - 7200000),
            isSent: true,
          },
          {
            id: 'm2',
            content: 'Je vous propose 800€',
            timestamp: new Date(Date.now() - 3600000),
            isSent: false,
            isOffer: true,
            offerAmount: 800,
            currency: '€',
          },
        ],
        status: 'negotiating',
      },
      {
        id: '3',
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: false,
          lastActive: 'Last active 3 hours ago',
        },
        product: {
          id: 'p3',
          title: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 1500,
          currency: '$CAD',
        },
        lastMessage: 'Offre acceptée',
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 0,
        messages: [
          {
            id: 'm1',
            content:
              'Bonjour ! Je suis intéressé(e) par le produit et je vous propose 650€',
            timestamp: new Date(Date.now() - 172800000),
            isSent: true,
          },
          {
            id: 'm2',
            content: 'Je vous propose 800€',
            timestamp: new Date(Date.now() - 86400000),
            isSent: false,
          },
          {
            id: 'm3',
            content:
              'Je suis intéressé(e) par le produit et je vous propose 650€',
            timestamp: new Date(Date.now() - 43200000),
            isSent: true,
          },
        ],
        status: 'accepted',
        acceptedPrice: 650,
      },
    ];

    // Ajouter plus de conversations pour la liste
    for (let i = 4; i <= 10; i++) {
      this.conversations.push({
        id: i.toString(),
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: i % 2 === 0,
          lastActive: 'Last active 1 hour ago',
        },
        product: {
          id: `p${i}`,
          title: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 1500,
          currency: '$CAD',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - i * 3600000),
        unreadCount: 1,
        messages: [],
        status: 'negotiating',
      });
    }

    this.filteredConversations = [...this.conversations];
  }

  filterConversations(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredConversations = [...this.conversations];
    } else {
      this.filteredConversations = this.conversations.filter((conv) =>
        conv.user.name.toLowerCase().includes(query)
      );
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterConversations();
  }

  selectConversation(conversation: Conversation): void {
    this.activeConversation = conversation;
    this.showChatOnMobile = true;
    this.shouldScrollToBottom = true;
    conversation.unreadCount = 0;
  }

  backToList(): void {
    this.showChatOnMobile = false;
    this.activeConversation = null;
  }

  makeOffer(): void {
    if (!this.activeConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: `Bonjour ! Je suis intéressé(e) par le produit et je vous propose ${this.offerAmount}€`,
      timestamp: new Date(),
      isSent: true,
    };

    this.activeConversation.messages.push(message);
    this.activeConversation.lastMessage = message.content;
    this.activeConversation.timestamp = new Date();
    this.shouldScrollToBottom = true;
  }

  acceptOffer(amount: number): void {
    this.pendingOfferAmount = amount;
    this.showConfirmModal = true;
  }

  onConfirmAccept(): void {
    if (this.activeConversation) {
      this.activeConversation.status = 'accepted';
      this.activeConversation.acceptedPrice = this.pendingOfferAmount;
    }
    this.showConfirmModal = false;
  }

  onCancelAccept(): void {
    this.showConfirmModal = false;
    this.pendingOfferAmount = 0;
  }

  addToCart(): void {
    if (this.activeConversation) {
      console.log('Ajout au panier:', {
        product: this.activeConversation.product,
        price: this.activeConversation.acceptedPrice,
      });
    }
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}min`;
    }
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days === 1) return 'Hier';
    if (days < 7) return `${days}j`;

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  formatMessageTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
