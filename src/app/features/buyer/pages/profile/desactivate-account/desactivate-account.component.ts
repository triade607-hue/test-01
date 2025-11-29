import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface DesactivationReason {
  id: string;
  label: string;
  requiresText?: boolean;
}

@Component({
  selector: 'app-deactivate-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './desactivate-account.component.html',
  styleUrls: ['./desactivate-account.component.scss'],
})
export class DesactivateAccountComponent {
  selectedReason: string = '';
  otherReasonText: string = '';

  reasons: DesactivationReason[] = [
    {
      id: 'pause',
      label: 'Je fais une pause dans mes ventes pour le moment',
    },
    {
      id: 'no-articles',
      label: "Je n'ai plus d'articles à vendre pour l'instant",
    },
    {
      id: 'inventory',
      label: 'Je veux organiser et réévaluer mon inventaire avant de continuer',
    },
    {
      id: 'availability',
      label: 'Je ne pourrais pas assurer la disponibilité de mes articles',
    },
    {
      id: 'visibility',
      label: 'Je ne reçois pas suffisamment de visibilité ou de ventes',
    },
    {
      id: 'features',
      label:
        'Les conditions ou fonctionnalités actuelles ne me conviennent pas',
    },
    {
      id: 'other',
      label: 'Autres raisons...',
      requiresText: true,
    },
  ];

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.selectedReason) {
      alert('Veuillez sélectionner une raison');
      return;
    }

    if (this.selectedReason === 'other' && !this.otherReasonText.trim()) {
      alert('Veuillez préciser votre raison');
      return;
    }

    const reason =
      this.selectedReason === 'other'
        ? this.otherReasonText
        : this.reasons.find((r) => r.id === this.selectedReason)?.label;

    console.log('Raison de désactivation:', reason);

    // TODO: Appel API pour désactiver le compte
    if (confirm('Votre compte sera désactivé. Confirmer ?')) {
      alert(
        'Compte désactivé avec succès. Nous sommes désolés de vous voir partir.'
      );
      this.router.navigate(['/']);
    }
  }

  isOtherSelected(): boolean {
    return this.selectedReason === 'other';
  }
}
