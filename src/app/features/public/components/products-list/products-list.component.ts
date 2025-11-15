import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8">
      <!-- Header avec titre et lien "Tout voir" -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
        <a
          [href]="viewAllLink"
          class="flex items-center gap-1 text-sm text-primary-500 font-medium hover:underline"
        >
          TOUT VOIR
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <!-- Liste horizontale de produits - Grille responsive 2/3/5 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductsListComponent {
  @Input() title = '';
  @Input() viewAllLink = '#';
}
