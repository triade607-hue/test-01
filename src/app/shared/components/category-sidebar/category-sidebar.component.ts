// src/app/shared/components/category-sidebar/category-sidebar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  articleCount?: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subCategories: SubCategory[];
}

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Overlay backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      (click)="close()"
      [@fadeIn]
    ></div>

    <!-- Sidebar -->
    <div
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
      class="fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col"
    >
      <!-- Header -->
      <div
        class="bg-primary-500 text-white px-4 py-4 flex items-center justify-between"
      >
        <button
          *ngIf="selectedCategory"
          (click)="goBack()"
          class="p-2 hover:bg-primary-600 rounded-full transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2 class="text-lg font-semibold flex-1 text-center">
          {{
            selectedCategory ? 'Sous-Catégories' : 'VOIR TOUTES LES CATÉGORIES'
          }}
        </h2>

        <button
          (click)="close()"
          class="p-2 hover:bg-primary-600 rounded-full transition-colors"
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
      </div>

      <!-- Selected Category Header (Niveau 2 uniquement) -->
      <div
        *ngIf="selectedCategory"
        class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3"
      >
        <img
          [src]="selectedCategory.icon"
          [alt]="selectedCategory.name"
          class="w-12 h-12 rounded object-cover"
        />
        <span class="font-medium text-gray-900">{{
          selectedCategory.name
        }}</span>
      </div>

      <!-- Search Bar (Niveau 2 uniquement) -->
      <div
        *ngIf="selectedCategory"
        class="px-4 py-3 bg-gray-50 border-b border-gray-200"
      >
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="filterSubCategories()"
            placeholder="Rechercher une sous catégorie"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            *ngIf="searchQuery"
            (click)="clearSearch()"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content: Categories List (Niveau 1) -->
      <div *ngIf="!selectedCategory" class="flex-1 overflow-y-auto">
        <div class="divide-y divide-gray-200">
          <button
            *ngFor="let category of categories"
            (click)="selectCategory(category)"
            class="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors text-left"
          >
            <div class="flex items-center gap-3">
              <img
                [src]="category.icon"
                [alt]="category.name"
                class="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <span class="font-medium text-gray-900 uppercase text-sm">{{
                category.name
              }}</span>
            </div>
            <svg
              class="w-5 h-5 text-gray-400"
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
          </button>
        </div>
      </div>

      <!-- Content: Sub-Categories List (Niveau 2) -->
      <div *ngIf="selectedCategory" class="flex-1 overflow-y-auto">
        <div class="divide-y divide-gray-200">
          <a
            *ngFor="let subCategory of filteredSubCategories"
            [routerLink]="['/search']"
            [queryParams]="{
              category: selectedCategory.slug,
              subCategory: subCategory.slug
            }"
            (click)="onSubCategoryClick(subCategory)"
            class="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <span class="text-gray-900">{{ subCategory.name }}</span>
            <svg
              class="w-5 h-5 text-gray-400"
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

        <!-- No results message -->
        <div
          *ngIf="filteredSubCategories.length === 0"
          class="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
          <svg
            class="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-500 font-medium">Aucune sous-catégorie trouvée</p>
          <p class="text-gray-400 text-sm mt-1">Essayez une autre recherche</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CategorySidebarComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  selectedCategory: Category | null = null;
  searchQuery = '';
  filteredSubCategories: SubCategory[] = [];

  categories: Category[] = [
    {
      id: '1',
      name: 'Agriculture',
      slug: 'agriculture',
      icon: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
      subCategories: [
        {
          id: '1-1',
          name: 'Accessoires Agricoles',
          slug: 'accessoires-agricoles',
        },
        {
          id: '1-2',
          name: 'Lames de déneigement pour tracteurs',
          slug: 'lames-deneigement',
        },
        {
          id: '1-3',
          name: 'Équipements de désherbage mécanique',
          slug: 'desherbage-mecanique',
        },
        { id: '1-4', name: 'Broyeurs de branches', slug: 'broyeurs-branches' },
        {
          id: '1-5',
          name: 'Équipements de décompactage du sol',
          slug: 'decompactage-sol',
        },
        {
          id: '1-6',
          name: 'Outils de préparation de sol',
          slug: 'preparation-sol',
        },
        { id: '1-7', name: 'Bacs de transport', slug: 'bacs-transport' },
      ],
    },
    {
      id: '2',
      name: 'Ameublement',
      slug: 'ameublement',
      icon: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      subCategories: [
        {
          id: '2-1',
          name: "Accessoires d'Ameublement",
          slug: 'accessoires-ameublement',
        },
        {
          id: '2-2',
          name: 'Bureau et Espace de Travail',
          slug: 'bureau-travail',
        },
        { id: '2-3', name: 'Chambre à Coucher', slug: 'chambre-coucher' },
        {
          id: '2-4',
          name: 'Meubles DIY et Personnalisés',
          slug: 'meubles-diy',
        },
        {
          id: '2-5',
          name: 'Mobilier de Bureau à Domicile',
          slug: 'mobilier-bureau-domicile',
        },
        { id: '2-6', name: 'Mobilier de Cuisine', slug: 'mobilier-cuisine' },
        { id: '2-7', name: 'Mobilier de Jardin', slug: 'mobilier-jardin' },
        {
          id: '2-8',
          name: 'Mobilier de Rangement',
          slug: 'mobilier-rangement',
        },
        {
          id: '2-9',
          name: 'Mobilier de Salle de Bain',
          slug: 'mobilier-salle-bain',
        },
        { id: '2-10', name: 'Mobilier de Salon', slug: 'mobilier-salon' },
        {
          id: '2-11',
          name: 'Mobilier de Terrasse et Balcon',
          slug: 'mobilier-terrasse',
        },
        {
          id: '2-12',
          name: 'Mobilier Multifonctionnel',
          slug: 'mobilier-multifonctionnel',
        },
        { id: '2-13', name: 'Mobilier pour Enfants', slug: 'mobilier-enfants' },
      ],
    },
    {
      id: '3',
      name: 'Arts',
      slug: 'arts',
      icon: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=100&h=100&fit=crop',
      subCategories: [
        { id: '3-1', name: 'Peintures', slug: 'peintures' },
        { id: '3-2', name: 'Sculptures', slug: 'sculptures' },
        { id: '3-3', name: 'Photographies', slug: 'photographies' },
        { id: '3-4', name: 'Art Digital', slug: 'art-digital' },
      ],
    },
    {
      id: '4',
      name: 'Audio / Vidéo',
      slug: 'audio-video',
      icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      subCategories: [
        { id: '4-1', name: 'Casques Audio', slug: 'casques-audio' },
        { id: '4-2', name: 'Enceintes', slug: 'enceintes' },
        { id: '4-3', name: 'Caméras', slug: 'cameras' },
        { id: '4-4', name: 'Microphones', slug: 'microphones' },
      ],
    },
    {
      id: '5',
      name: 'Autres',
      slug: 'autres',
      icon: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop',
      subCategories: [
        { id: '5-1', name: 'Divers', slug: 'divers' },
        { id: '5-2', name: 'Non classé', slug: 'non-classe' },
      ],
    },
    {
      id: '6',
      name: 'Bijoux',
      slug: 'bijoux',
      icon: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
      subCategories: [
        { id: '6-1', name: 'Colliers', slug: 'colliers' },
        { id: '6-2', name: 'Bracelets', slug: 'bracelets' },
        { id: '6-3', name: "Boucles d'oreilles", slug: 'boucles-oreilles' },
        { id: '6-4', name: 'Bagues', slug: 'bagues' },
      ],
    },
    {
      id: '7',
      name: 'Chaussures Enfants',
      slug: 'chaussures-enfants',
      icon: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=100&h=100&fit=crop',
      subCategories: [
        { id: '7-1', name: 'Baskets Enfants', slug: 'baskets-enfants' },
        { id: '7-2', name: 'Sandales Enfants', slug: 'sandales-enfants' },
        { id: '7-3', name: 'Bottes Enfants', slug: 'bottes-enfants' },
      ],
    },
    {
      id: '8',
      name: 'Chaussures Femme',
      slug: 'chaussures-femme',
      icon: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop',
      subCategories: [
        { id: '8-1', name: 'Talons', slug: 'talons' },
        { id: '8-2', name: 'Baskets Femme', slug: 'baskets-femme' },
        { id: '8-3', name: 'Sandales Femme', slug: 'sandales-femme' },
        { id: '8-4', name: 'Bottes Femme', slug: 'bottes-femme' },
      ],
    },
    {
      id: '9',
      name: 'Chaussures Homme',
      slug: 'chaussures-homme',
      icon: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
      subCategories: [
        { id: '9-1', name: 'Chaussures de ville', slug: 'chaussures-ville' },
        { id: '9-2', name: 'Baskets Homme', slug: 'baskets-homme' },
        { id: '9-3', name: 'Sandales Homme', slug: 'sandales-homme' },
        { id: '9-4', name: 'Bottes Homme', slug: 'bottes-homme' },
      ],
    },
    {
      id: '10',
      name: 'Cosmétique',
      slug: 'cosmetique',
      icon: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop',
      subCategories: [
        { id: '10-1', name: 'Maquillage', slug: 'maquillage' },
        { id: '10-2', name: 'Soins de la peau', slug: 'soins-peau' },
        { id: '10-3', name: 'Parfums', slug: 'parfums' },
        { id: '10-4', name: 'Soins des cheveux', slug: 'soins-cheveux' },
      ],
    },
    {
      id: '11',
      name: 'Culture',
      slug: 'culture',
      icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subCategories: [
        { id: '11-1', name: 'Livres', slug: 'livres' },
        { id: '11-2', name: 'Films', slug: 'films' },
        { id: '11-3', name: 'Musique', slug: 'musique' },
        { id: '11-4', name: 'Jeux vidéo', slug: 'jeux-video' },
      ],
    },
    {
      id: '12',
      name: 'Électricité',
      slug: 'electricite',
      icon: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop',
      subCategories: [
        { id: '12-1', name: 'Ampoules', slug: 'ampoules' },
        { id: '12-2', name: 'Interrupteurs', slug: 'interrupteurs' },
        { id: '12-3', name: 'Prises électriques', slug: 'prises' },
        { id: '12-4', name: 'Câbles', slug: 'cables' },
      ],
    },
    {
      id: '13',
      name: 'Électroménager',
      slug: 'electromenager',
      icon: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=100&h=100&fit=crop',
      subCategories: [
        { id: '13-1', name: 'Réfrigérateurs', slug: 'refrigerateurs' },
        { id: '13-2', name: 'Lave-linge', slug: 'lave-linge' },
        { id: '13-3', name: 'Cuisinières', slug: 'cuisinieres' },
        { id: '13-4', name: 'Micro-ondes', slug: 'micro-ondes' },
        { id: '13-5', name: 'Aspirateurs', slug: 'aspirateurs' },
      ],
    },
  ];

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.filteredSubCategories = [...category.subCategories];
    this.searchQuery = '';
  }

  goBack(): void {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filteredSubCategories = [];
  }

  close(): void {
    this.isOpen = false;
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filteredSubCategories = [];
    this.closed.emit();
  }

  filterSubCategories(): void {
    if (!this.selectedCategory) return;

    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSubCategories = [...this.selectedCategory.subCategories];
    } else {
      this.filteredSubCategories = this.selectedCategory.subCategories.filter(
        (sub) => sub.name.toLowerCase().includes(query)
      );
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterSubCategories();
  }

  onSubCategoryClick(subCategory: SubCategory): void {
    console.log('Navigation vers:', subCategory);
    this.close();
  }
}
