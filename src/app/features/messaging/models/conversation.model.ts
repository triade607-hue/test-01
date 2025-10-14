export interface Conversation {
  id: string;
  participants: Participant[];
  lastMessage?: string;
  lastMessageDate?: Date;
  unreadCount: number;
  productReference?: {
    productId: string;
    title: string;
    image: string;
  };
  createdAt: Date;
}

export interface Participant {
  userId: string;
  name: string;
  avatar?: string;
  role: 'buyer' | 'seller';
}
