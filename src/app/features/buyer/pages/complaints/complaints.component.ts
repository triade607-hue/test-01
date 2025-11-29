import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ComplaintStatus = 'pending' | 'resolved';

interface Complaint {
  id: string;
  title: string;
  description: string;
  date: string;
  status: ComplaintStatus;
}

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints.component.html',
})
export class ComplaintsComponent {
  complaints: Complaint[] = [
    {
      id: '1',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'pending',
    },
    {
      id: '5',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'resolved',
    },
    {
      id: '6',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'resolved',
    },
    {
      id: '7',
      title: 'Titre/Type de réclamation',
      description:
        "Description du problème donné par l'acheteur Running wheel issues q1 vec forwar...",
      date: '23 Mars 2023',
      status: 'resolved',
    },
  ];

  getStatusLabel(status: ComplaintStatus): string {
    return status === 'pending' ? 'En cours' : 'Traitée';
  }

  getStatusClass(status: ComplaintStatus): string {
    return status === 'pending' ? 'text-primary-500' : 'text-green-500';
  }

  viewComplaint(complaint: Complaint): void {
    console.log('Voir réclamation:', complaint.id);
    // Navigation vers le détail de la réclamation
  }
}
