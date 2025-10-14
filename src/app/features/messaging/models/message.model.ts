export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
  productReference?: ProductReference;
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  name: string;
  size: number;
}

export interface ProductReference {
  productId: string;
  title: string;
  image: string;
  price: number;
}
