import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isSent: boolean;
}

interface ConversationDetail {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  product?: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
  };
}

@Component({
  selector: 'app-conversation-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <a routerLink="/" class="hover:text-primary-500">Accueil</a>
        <span class="mx-2">></span>
        <a routerLink="/messages" class="hover:text-primary-500">Messagerie</a>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">{{
          conversation?.user?.name
        }}</span>
      </nav>

      <div class="flex gap-6 h-[calc(100vh-200px)]">
        <!-- Sidebar conversations (mobile hidden) -->
        <div
          class="hidden md:block w-96 bg-white rounded border border-gray-200 overflow-y-auto"
        >
          <div class="p-4 border-b border-gray-200">
            <a
              routerLink="/messages"
              class="flex items-center gap-2 text-gray-600 hover:text-primary-500"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span class="text-sm font-medium">Retour aux conversations</span>
            </a>
          </div>
          <!-- Liste mini conversations ici si besoin -->
        </div>

        <!-- Zone de conversation -->
        <div
          *ngIf="conversation"
          class="flex-1 bg-white rounded border border-gray-200 flex flex-col"
        >
          <!-- Header -->
          <div
            class="p-4 border-b border-gray-200 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <a routerLink="/messages" class="md:hidden text-gray-600">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </a>
              <div class="relative">
                <img
                  [src]="conversation.user.avatar"
                  [alt]="conversation.user.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <span
                  *ngIf="conversation.user.isOnline"
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
                ></span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">
                  {{ conversation.user.name }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ conversation.user.isOnline ? 'En ligne' : 'Hors ligne' }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button
                class="p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-100 rounded transition-colors"
                title="Archiver"
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </button>
              <button
                class="p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-100 rounded transition-colors"
                title="Options"
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Produit référencé -->
          <div
            *ngIf="conversation.product"
            class="p-4 bg-gray-50 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <img
                [src]="conversation.product.image"
                [alt]="conversation.product.title"
                class="w-16 h-16 rounded object-cover"
              />
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 text-sm">
                  {{ conversation.product.title }}
                </h4>
                <p class="text-primary-500 font-semibold text-sm">
                  {{ conversation.product.price
                  }}{{ conversation.product.currency }}
                </p>
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div #messagesContainer class="flex-1 overflow-y-auto p-4 space-y-4">
            <div
              *ngFor="let msg of messages"
              [class.flex-row-reverse]="msg.isSent"
              class="flex items-end gap-2"
            >
              <div
                [class.bg-primary-500]="msg.isSent"
                [class.text-white]="msg.isSent"
                [class.bg-gray-100]="!msg.isSent"
                [class.text-gray-900]="!msg.isSent"
                class="max-w-[70%] px-4 py-2 rounded-lg"
              >
                <p class="text-sm">{{ msg.content }}</p>
                <span
                  [class.text-blue-100]="msg.isSent"
                  [class.text-gray-500]="!msg.isSent"
                  class="text-xs mt-1 block"
                >
                  {{ formatTime(msg.timestamp) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-gray-200">
            <form
              (submit)="sendMessage($event)"
              class="flex items-center gap-2"
            >
              <input
                type="text"
                [(ngModel)]="newMessage"
                name="message"
                placeholder="entrer votre message..."
                class="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                [disabled]="!newMessage.trim()"
                class="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <span class="font-medium">Envoyer</span>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConversationDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  conversation: ConversationDetail | null = null;
  messages: Message[] = [];
  newMessage = '';
  private shouldScrollToBottom = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const conversationId = params['id'];
      this.loadConversation(conversationId);
      this.loadMessages(conversationId);
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  loadConversation(id: string): void {
    // Mock data - À remplacer par MessagingService
    this.conversation = {
      id,
      user: {
        name: 'James Gorden',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isOnline: true,
      },
      product: {
        id: 'p1',
        title: 'Nom du produit',
        image: 'https://via.placeholder.com/100',
        price: 1500,
        currency: '$CAD',
      },
    };
  }

  loadMessages(conversationId: string): void {
    // Mock data
    this.messages = [
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
    ];
    this.shouldScrollToBottom = true;
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    if (!this.newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: this.newMessage,
      timestamp: new Date(),
      isSent: true,
    };

    this.messages.push(message);
    this.newMessage = '';
    this.shouldScrollToBottom = true;
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
