import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../shared/components/breadcrumb/breadcrumb.component';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isSent: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
    lastActive?: string;
  };
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  product?: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
  };
  messages: Message[];
}

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BreadcrumbComponent],
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  activeConversation: Conversation | null = null;
  searchQuery = '';
  newMessage = '';
  showChatOnMobile = false; // Pour gérer l'affichage mobile
  private shouldScrollToBottom = false;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Messagerie', isActive: true },
  ];

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
    // Mock data
    this.conversations = [
      {
        id: '1',
        user: {
          name: 'James Gorden',
          avatar: 'https://i.pravatar.cc/150?img=12',
          isOnline: true,
          lastActive: 'Last active 1 hour ago',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 1,
        product: {
          id: 'p1',
          title: 'Nom du produit',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
          price: 1500,
          currency: '$CAD',
        },
        messages: [
          {
            id: '1',
            senderId: 'other',
            content:
              "Ici se présente le message emi par tous ceux qui m'enverront des messages pour discuter",
            timestamp: new Date(Date.now() - 3600000),
            isSent: false,
          },
          {
            id: '2',
            senderId: 'me',
            content:
              "Ici se présente la suite du message que j'ai écrit pour répondre à ceux qui m'ont écrit",
            timestamp: new Date(Date.now() - 1800000),
            isSent: true,
          },
        ],
      },
      {
        id: '2',
        user: {
          name: 'Sarah Connor',
          avatar: 'https://i.pravatar.cc/150?img=5',
          isOnline: false,
          lastActive: 'Last active 3 hours ago',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 7200000),
        unreadCount: 1,
        product: {
          id: 'p2',
          title: 'MacBook Pro M3',
          image:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
          price: 2500,
          currency: '$CAD',
        },
        messages: [
          {
            id: '1',
            senderId: 'other',
            content: 'Bonjour, le produit est-il toujours disponible ?',
            timestamp: new Date(Date.now() - 7200000),
            isSent: false,
          },
        ],
      },
      {
        id: '3',
        user: {
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=8',
          isOnline: true,
          lastActive: 'En ligne',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 1,
        messages: [],
      },
      {
        id: '4',
        user: {
          name: 'Emma Wilson',
          avatar: 'https://i.pravatar.cc/150?img=10',
          isOnline: false,
          lastActive: 'Last active 2 days ago',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 172800000),
        unreadCount: 1,
        messages: [],
      },
      {
        id: '5',
        user: {
          name: 'Michael Brown',
          avatar: 'https://i.pravatar.cc/150?img=15',
          isOnline: true,
          lastActive: 'En ligne',
        },
        lastMessage: 'Last message of someone...',
        timestamp: new Date(Date.now() - 259200000),
        unreadCount: 1,
        messages: [],
      },
    ];
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

    // Marquer comme lu
    conversation.unreadCount = 0;
  }

  backToList(): void {
    this.showChatOnMobile = false;
    this.activeConversation = null;
  }

  sendMessage(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.newMessage.trim() || !this.activeConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: this.newMessage,
      timestamp: new Date(),
      isSent: true,
    };

    this.activeConversation.messages.push(message);
    this.activeConversation.lastMessage = this.newMessage;
    this.activeConversation.timestamp = new Date();

    this.newMessage = '';
    this.shouldScrollToBottom = true;

    // TODO: Envoyer via MessagingService
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
