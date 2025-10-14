// src/app/features/auth/components/category-selection-modal/category-selection-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}

@Component({
  selector: 'app-category-selection-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full p-8 relative">
        <!-- Close Button -->
        <button
          (click)="close()"
          class="absolute top-4 right-4 text-error hover:text-error/80 transition-colors"
        >
          <svg
            class="w-6 h-6"
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

        <!-- Title -->
        <h2 class="text-2xl font-bold text-primary-500 mb-2">Inscription</h2>
        <p class="text-gray-500 mb-6">
          Aidez-nous à mieux vous servir. Veuillez sélectionner cinq
          <span class="font-medium">(05)</span> catégories d'articles qui vous
          intéressent.
        </p>

        <!-- Search Bar -->
        <div class="relative mb-6">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="filterCategories()"
            placeholder="rechercher une catégorie d'article"
            class="w-full px-4 py-3 pr-12 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6 max-h-96 overflow-y-auto">
          <button
            *ngFor="let category of filteredCategories"
            (click)="toggleCategory(category)"
            [class.ring-2]="category.selected"
            [class.ring-primary-500]="category.selected"
            class="relative aspect-video rounded-lg overflow-hidden hover:opacity-90 transition-all"
          >
            <img
              [src]="category.image"
              [alt]="category.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <span class="text-white text-lg font-semibold">
                {{ category.name }}
              </span>
            </div>
            <!-- Checkmark -->
            <div
              *ngIf="category.selected"
              class="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
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
          </button>
        </div>

        <!-- Selection Counter -->
        <p class="text-sm text-gray-600 text-center mb-6">
          {{ getSelectedCount() }} / 5 catégories sélectionnées
        </p>

        <!-- Submit Button -->
        <button
          (click)="submit()"
          [disabled]="getSelectedCount() !== 5"
          class="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          S'inscrire
        </button>

        <!-- Divider -->
        <div class="my-6 border-t border-gray-200"></div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Vous possédez déjà un compte?
            <button
              (click)="switchToLogin()"
              class="text-primary-500 font-semibold hover:underline ml-1"
            >
              Connectez-vous
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CategorySelectionModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();
  @Output() categoriesSelected = new EventEmitter<number[]>();

  searchQuery = '';

  categories: Category[] = [
    {
      id: 1,
      name: 'Catégorie 1',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 2,
      name: 'Catégorie 2',
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 3,
      name: 'Catégorie 3',
      image:
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 4,
      name: 'Catégorie 4',
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 5,
      name: 'Catégorie 5',
      image:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 6,
      name: 'Catégorie 6',
      image:
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 7,
      name: 'Catégorie 7',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
      selected: false,
    },
  ];

  filteredCategories: Category[] = [...this.categories];

  close(): void {
    this.closed.emit();
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }

  toggleCategory(category: Category): void {
    const selectedCount = this.getSelectedCount();

    if (category.selected) {
      category.selected = false;
    } else if (selectedCount < 5) {
      category.selected = true;
    }
  }

  getSelectedCount(): number {
    return this.categories.filter((c) => c.selected).length;
  }

  filterCategories(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter((c) =>
        c.name.toLowerCase().includes(query)
      );
    }
  }

  submit(): void {
    if (this.getSelectedCount() !== 5) return;

    const selectedIds = this.categories
      .filter((c) => c.selected)
      .map((c) => c.id);

    this.categoriesSelected.emit(selectedIds);
    this.close();
  }
}
