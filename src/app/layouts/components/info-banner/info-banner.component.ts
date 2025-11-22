import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="!isClosed"
      class="border-b border-gray-200"
      style="background-color: #EDF5FA;"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <p class="text-sm text-gray-900">
              <span class="font-medium">Bienvenue M/Mme &#64;User</span>
            </p>
            <p class="text-sm text-gray-700 mt-1">
              Votre compte vous permet de gérer vos commandes, retours,
              remboursements, factures, bons d'achat et de contacter le service
              client ou les vendeurs. Renseignez vos adresses de livraison et
              moyens de paiement pour faciliter vos achats. Restez à l'affût des
              bons plans, nouveautés et ventes flash via votre boîte mail.
            </p>
          </div>
          <button
            (click)="close()"
            class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fermer la bannière"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class InfoBannerComponent {
  isClosed = false;

  close(): void {
    this.isClosed = true;
  }
}
