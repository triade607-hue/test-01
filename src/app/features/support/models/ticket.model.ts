export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  userId: string;
  assignedTo?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}
