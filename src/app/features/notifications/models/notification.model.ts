import { NotificationType } from '../enums/notification-type.enum';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  icon?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
