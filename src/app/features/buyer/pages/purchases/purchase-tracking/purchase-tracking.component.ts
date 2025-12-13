import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import {
  TrackingTimelineComponent,
  TrackingStep,
} from '../../../components/tracking-timeline/tracking-timeline.component';

@Component({
  selector: 'app-purchase-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink, TrackingTimelineComponent],
  templateUrl: './purchase-tracking.component.html',
  styleUrls: ['./purchase-tracking.component.scss'],
})
export class PurchaseTrackingComponent implements OnInit {
  orderId: string = '';
  orderNumber: string = 'SMSG52455454JKFD564';
  hasConformityCheck: boolean = true;
  showDropdown: boolean = false;

  // Steps pour commande SANS contrôle de conformité
  stepsWithoutConformity: TrackingStep[] = [
    {
      id: '1',
      title: 'Préparation',
      date: '25 Janvier 2025',
      description:
        'Votre colis est en cours de préparation chez le vendeur. Il dispose de "décompte" pour expédier le colis.',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Expédition',
      date: '25 Janvier 2025',
      description:
        'Votre colis est remis au Transporteur ou Message du Transporteur. Pour consulter les informations de livraison de votre colis, cliquez ici (lien) ou consultez directement le site du Transporteur.',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Colis expédié',
      date: '25 Janvier 2025',
      description:
        "Votre colis a été bien livré. Vous disposez d'un délai de 72h pour confirmer réception ou signaler un éventuel problème. Passé ce délai, la transaction sera systématiquement clôturée et le vendeur sera payé.",
      status: 'current',
      actions: [
        {
          type: 'button',
          label: "Oui, j'ai reçu",
          variant: 'success',
          icon: 'check',
          action: 'confirm_received',
        },
        {
          type: 'button',
          label: 'Donner une note',
          variant: 'primary',
          icon: 'star',
          action: 'give_rating',
        },
        {
          type: 'button',
          label: 'Je suis satisfait',
          variant: 'secondary',
          icon: 'check',
          action: 'satisfied',
        },
      ],
    },
  ];

  // Steps pour commande AVEC contrôle de conformité
  stepsWithConformity: TrackingStep[] = [
    {
      id: '1',
      title: 'Préparation',
      date: '25 Janvier 2025',
      description:
        'Votre colis est en cours de préparation chez le vendeur. Il dispose de "décompte" pour expédier le colis.',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Expédition',
      date: '25 Janvier 2025',
      description:
        'Votre colis est remis au Transporteur. Consultez les informations de livraison directement le site du Transporteur ou en cliquant ici (lien).',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Colis expédié à Occaverse',
      date: '25 Janvier 2025',
      description:
        'Votre colis est remis au Transporteur. Consultez les informations de livraison directement le site du Transporteur ou en cliquant ici (lien).',
      status: 'current',
      alerts: [
        {
          type: 'success',
          message:
            'Votre commande est conforme à la description du Vendeur. Elle sera remis au Transporteur dans les 48H. Pour consulter le rapport de contrôle de conformité cliquez ici.',
        },
        {
          type: 'error',
          message:
            "Mauvaise nouvelle, après vérification, un ou plusieurs produit(s) de votre commande n'est pas conforme à sa description.",
        },
      ],
      actions: [
        {
          type: 'button',
          label: 'Consulter le rapport',
          variant: 'primary',
          icon: 'file',
          action: 'view_report',
        },
      ],
    },
    {
      id: '4',
      title: 'Préparation',
      date: '25 Janvier 2025',
      description:
        'Le colis est prêt à être expédié. Il est en attente de prise en charge par le transporteur pour la livraison.',
      status: 'pending',
    },
    {
      id: '5',
      title: 'Expédition',
      date: '25 Janvier 2025',
      description:
        'Votre colis est remis au Transporteur=. Pour consulter les informations de livraison de votre colis, consultez directement le site du Transporteur ou cliquez ici (lien).',
      status: 'pending',
    },
    {
      id: '6',
      title: 'Colis expédié',
      date: '25 Janvier 2025',
      description:
        "Votre colis a été bien livré. Vous disposez d'un délai de 72h pour confirmer réception ou signaler un éventuel problème. Passé ce délai, la transaction sera systématiquement clôturée et le vendeur sera payé.",
      status: 'pending',
      actions: [
        {
          type: 'button',
          label: "Oui, j'ai reçu",
          variant: 'success',
          icon: 'check',
          action: 'confirm_received',
        },
        {
          type: 'button',
          label: 'Donner une note',
          variant: 'primary',
          icon: 'star',
          action: 'give_rating',
        },
        {
          type: 'button',
          label: 'Je suis satisfait',
          variant: 'secondary',
          icon: 'check',
          action: 'satisfied',
        },
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
  }

  get steps(): TrackingStep[] {
    return this.hasConformityCheck
      ? this.stepsWithConformity
      : this.stepsWithoutConformity;
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  onRequestReduction(): void {
    this.closeDropdown();
    console.log('Demander une réduction');
  }

  onContinuePurchase(): void {
    this.closeDropdown();
    console.log("Poursuivre l'achat");
  }

  onCancelOrder(): void {
    this.closeDropdown();
    console.log('Annuler la commande');
  }

  navigateToRating(): void {
    this.router.navigate([
      '/buyer/purchases',
      this.orderId,
      'tracking',
      'rating',
    ]);
  }

  navigateToCompliance(): void {
    this.router.navigate([
      '/buyer/purchases',
      this.orderId,
      'tracking',
      'compliance',
    ]);
  }

  openReclamation(): void {
    console.log('Ouvrir réclamation');
  }
}
