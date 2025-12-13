import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ComplianceStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ComplianceProduct {
  name: string;
  price: number;
  currency: string;
  quantity: number;
  variant1: { label: string; value: string };
  variant2: { label: string; value: string };
  image: string;
}

export interface ComplianceResult {
  isCompliant: boolean;
  message: string;
}

@Component({
  selector: 'app-compliance-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-start justify-center p-2 sm:p-4"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-md w-full max-w-lg my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0"
        >
          <h2 class="text-lg sm:text-xl font-bold text-primary-500">
            Détail du contrôle
          </h2>
          <button
            (click)="close()"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6"
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

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <!-- Product Info -->
          <div
            class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 rounded-md"
          >
            <img
              [src]="product.image"
              [alt]="product.name"
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-gray-900 text-sm sm:text-base truncate"
              >
                {{ product.name }}
              </h3>
              <p class="text-xs sm:text-sm text-gray-600">
                Qté: {{ product.quantity }}
                <span class="hidden sm:inline">
                  &nbsp;&nbsp;{{ product.variant1.label }}:
                  <span class="font-medium">{{ product.variant1.value }}</span>
                  &nbsp;&nbsp;{{ product.variant2.label }}:
                  <span class="font-medium text-gray-500">{{
                    product.variant2.value
                  }}</span>
                </span>
              </p>
            </div>
            <div class="text-right flex-shrink-0">
              <span class="font-bold text-primary-500 text-sm sm:text-base"
                >{{ product.price }}{{ product.currency }}</span
              >
            </div>
          </div>

          <!-- Steps -->
          <div class="space-y-4 sm:space-y-6">
            <div *ngFor="let step of steps" class="space-y-2 sm:space-y-3">
              <h4
                class="font-bold text-primary-500 text-xs sm:text-sm uppercase"
              >
                Etape {{ step.id }} : {{ step.title }}
              </h4>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {{ step.description }}
              </p>
              <img
                [src]="step.image"
                [alt]="step.title"
                class="w-full rounded-md object-cover"
              />
            </div>
          </div>

          <!-- Résultat -->
          <div class="space-y-2 sm:space-y-3">
            <h4
              class="font-bold text-primary-500 text-center text-sm sm:text-base"
            >
              Résultat du contrôle de conformité
            </h4>

            <!-- Alert Success -->
            <div
              *ngIf="result.isCompliant"
              class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-md"
            >
              <div
                class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p class="text-xs sm:text-sm text-green-800">
                {{ result.message }}
              </p>
            </div>

            <!-- Alert Error -->
            <div
              *ngIf="!result.isCompliant"
              class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 rounded-md"
            >
              <div
                class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
              </div>
              <p class="text-xs sm:text-sm text-red-800">
                {{ result.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ComplianceDetailModalComponent {
  @Input() product: ComplianceProduct = {
    name: 'Nom du produit',
    price: 1500,
    currency: '$CAD',
    quantity: 15,
    variant1: { label: 'Variante 1', value: 'valeure' },
    variant2: { label: 'Variante 2', value: 'valeure' },
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
  };

  @Input() steps: ComplianceStep[] = [
    {
      id: 1,
      title:
        "EFFECTIVITE DU PRODUIT EXPEDIE PAR LE VENDEUR EN REFERENCE A L'ANNONCE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor. Quisque vel accumsan ut quis dignissim turpis.',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'VERIFICATION DE LA COMPLETUDE DE LA COMMANDE',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor. Quisque vel accumsan ut quis dignissim turpis.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title:
        "NON CONFORMITE DU PRODUIT PAR RAPPORT A LA DESCRIPTION DE L'ANNONCE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor. Quisque vel accumsan ut quis dignissim turpis.',
      image:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=200&fit=crop',
    },
    {
      id: 4,
      title: "VERIFICATION DE L'ETAT GENERAL DE L'ARTICLE",
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor. Quisque vel accumsan ut quis dignissim turpis.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'TESTS BASIC DE FONCTIONNEMENT POUR LES APPAREILS ELECTRONIQUES',
      description:
        'Lorem ipsum dolor sit amet consectetur. Nullam morbi urna tempor pretium laoreet sit feugiat arcu tempor. Quisque vel accumsan ut quis dignissim turpis.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    },
  ];

  @Input() result: ComplianceResult = {
    isCompliant: true,
    message:
      'Votre commande est conforme à la description du Vendeur. Elle sera remis au Transporteur dans les 48H. Pour consulter le rapport de contrôle de conformité cliquez ici.',
  };

  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
