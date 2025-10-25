// ============================================
// MODULE FAVORITES - VERSION OPTIMISÉE
// ============================================
// src/app/features/favorites/pages/favorites-list/favorites-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FavoriteProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  category: string;
  vendor: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  addedAt: Date;
  stock: number;
  rating: number;
  location: string;
}

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <a routerLink="/" class="hover:text-primary-500">Accueil</a>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">Mes préférences</span>
      </nav>

      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Mes préférences</h1>
          <p class="text-sm text-gray-600 mt-1">{{ totalCount }} produits</p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Filtre catégorie -->
          <select
            [(ngModel)]="selectedCategory"
            (change)="applyFilters()"
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Toutes les catégories</option>
            <option *ngFor="let cat of categories" [value]="cat">
              {{ cat }}
            </option>
          </select>

          <!-- Tri -->
          <select
            [(ngModel)]="sortBy"
            (change)="applyFilters()"
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="recent">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom A-Z</option>
          </select>

          <!-- Vue toggle -->
          <div class="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              (click)="viewMode = 'grid'"
              [class.bg-primary-500]="viewMode === 'grid'"
              [class.text-white]="viewMode === 'grid'"
              [class.text-gray-600]="viewMode !== 'grid'"
              class="p-2 hover:bg-primary-50 transition-colors"
              title="Vue grille"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              (click)="viewMode = 'list'"
              [class.bg-primary-500]="viewMode === 'list'"
              [class.text-white]="viewMode === 'list'"
              [class.text-gray-600]="viewMode !== 'list'"
              class="p-2 hover:bg-primary-50 transition-colors border-l border-gray-200"
              title="Vue liste"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        *ngIf="filteredProducts.length === 0"
        class="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <svg
          class="w-24 h-24 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucun favori</h3>
        <p class="text-gray-600 mb-6">
          Commencez à sauvegarder vos produits préférés
        </p>
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>Explorer les produits</span>
        </a>
      </div>

      <!-- Vue Grille -->
      <div
        *ngIf="viewMode === 'grid' && filteredProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          *ngFor="let product of filteredProducts"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
        >
          <!-- Image -->
          <div class="relative aspect-square bg-gray-100">
            <img
              [src]="product.image"
              [alt]="product.title"
              class="w-full h-full object-cover"
            />

            <!-- Badge stock -->
            <div
              *ngIf="product.stock === 0"
              class="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <span class="text-white font-semibold text-sm">Indisponible</span>
            </div>

            <!-- Bouton favori -->
            <button
              (click)="removeFromFavorites(product.id)"
              class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
            >
              <svg
                class="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Info -->
          <div class="p-4">
            <!-- Vendeur -->
            <div class="flex items-center gap-2 mb-2">
              <img
                [src]="product.vendor.avatar"
                [alt]="product.vendor.name"
                class="w-5 h-5 rounded-full"
              />
              <span class="text-xs text-gray-600 truncate">{{
                product.vendor.name
              }}</span>
              <svg
                *ngIf="product.vendor.isVerified"
                class="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <!-- Titre -->
            <h3
              class="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary-500"
            >
              {{ product.title }}
            </h3>

            <!-- Rating + Location -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
                <span class="text-xs text-gray-600">{{ product.rating }}</span>
              </div>
              <span class="text-xs text-gray-500 truncate ml-2">{{
                product.location
              }}</span>
            </div>

            <!-- Prix -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-lg font-bold text-primary-500"
                >{{ product.price }}{{ product.currency }}</span
              >
              <span *ngIf="product.stock > 0" class="text-xs text-gray-500"
                >Stock: {{ product.stock }}</span
              >
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <a
                [routerLink]="['/products', product.id]"
                class="flex-1 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg text-center hover:bg-primary-600 transition-colors"
              >
                Voir
              </a>
              <button
                *ngIf="product.stock > 0"
                (click)="addToCart(product.id)"
                class="p-2 border border-gray-200 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Date ajout -->
            <p class="text-xs text-gray-400 mt-3 text-center">
              Ajouté le {{ formatDate(product.addedAt) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Vue Liste -->
      <div
        *ngIf="viewMode === 'list' && filteredProducts.length > 0"
        class="space-y-4"
      >
        <div
          *ngFor="let product of filteredProducts"
          class="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-4 hover:shadow-lg transition-all"
        >
          <!-- Image -->
          <div
            class="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              [src]="product.image"
              [alt]="product.title"
              class="w-full h-full object-cover"
            />
            <div
              *ngIf="product.stock === 0"
              class="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <span class="text-white font-semibold text-xs">Indisponible</span>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {{ product.title }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">{{ product.category }}</p>

                <!-- Vendeur -->
                <div class="flex items-center gap-2 mb-2">
                  <img
                    [src]="product.vendor.avatar"
                    [alt]="product.vendor.name"
                    class="w-5 h-5 rounded-full"
                  />
                  <span class="text-xs text-gray-600">{{
                    product.vendor.name
                  }}</span>
                  <svg
                    *ngIf="product.vendor.isVerified"
                    class="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <!-- Rating + Location -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                    <span class="text-sm text-gray-600">{{
                      product.rating
                    }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{
                    product.location
                  }}</span>
                </div>
              </div>

              <!-- Bouton retirer -->
              <button
                (click)="removeFromFavorites(product.id)"
                class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Prix + Actions -->
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-4">
                <span class="text-xl font-bold text-primary-500"
                  >{{ product.price }}{{ product.currency }}</span
                >
                <span *ngIf="product.stock > 0" class="text-sm text-gray-500"
                  >Stock: {{ product.stock }}</span
                >
              </div>

              <div class="flex items-center gap-2">
                <a
                  [routerLink]="['/products', product.id]"
                  class="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Voir le produit
                </a>
                <button
                  *ngIf="product.stock > 0"
                  (click)="addToCart(product.id)"
                  class="p-2 border border-gray-200 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Date ajout -->
            <p class="text-xs text-gray-400 mt-3">
              Ajouté le {{ formatDate(product.addedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FavoritesListComponent implements OnInit {
  favorites: FavoriteProduct[] = [];
  filteredProducts: FavoriteProduct[] = [];
  categories: string[] = [];
  selectedCategory = '';
  sortBy = 'recent';
  viewMode: 'grid' | 'list' = 'grid';

  get totalCount(): number {
    return this.favorites.length;
  }

  ngOnInit(): void {
    this.loadFavorites();
    this.extractCategories();
    this.applyFilters();
  }

  loadFavorites(): void {
    // Mock data - À remplacer par FavoritesService
    this.favorites = [
      {
        id: '1',
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: 'https://via.placeholder.com/400',
        price: 2,
        currency: '$CAD',
        category: 'Électronique',
        vendor: {
          name: 'Vendeur',
          avatar: 'https://i.pravatar.cc/150?img=1',
          isVerified: true,
        },
        addedAt: new Date(Date.now() - 86400000),
        stock: 35,
        rating: 4.5,
        location: 'Montréal, QC',
      },
      {
        id: '2',
        title: 'iPhone 15 Pro Max 256GB',
        image: 'https://via.placeholder.com/400',
        price: 1199,
        currency: '€',
        category: 'Électronique',
        vendor: {
          name: 'MobileShop',
          avatar: 'https://i.pravatar.cc/150?img=2',
          isVerified: true,
        },
        addedAt: new Date(Date.now() - 172800000),
        stock: 0,
        rating: 4.8,
        location: 'Paris, FR',
      },
      {
        id: '3',
        title: "Canapé d'angle en cuir véritable",
        image: 'https://via.placeholder.com/400',
        price: 899,
        currency: '€',
        category: 'Meubles',
        vendor: {
          name: 'HomeDecor',
          avatar: 'https://i.pravatar.cc/150?img=3',
          isVerified: false,
        },
        addedAt: new Date(Date.now() - 259200000),
        stock: 1,
        rating: 4.2,
        location: 'Lyon, FR',
      },
    ];
  }

  extractCategories(): void {
    const cats = new Set(this.favorites.map((f) => f.category));
    this.categories = Array.from(cats).sort();
  }

  applyFilters(): void {
    // Filtrage
    let filtered = [...this.favorites];
    if (this.selectedCategory) {
      filtered = filtered.filter((f) => f.category === this.selectedCategory);
    }

    // Tri
    switch (this.sortBy) {
      case 'recent':
        filtered.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredProducts = filtered;
  }

  removeFromFavorites(productId: string): void {
    this.favorites = this.favorites.filter((f) => f.id !== productId);
    this.applyFilters();
    // TODO: FavoritesService.remove(productId)
  }

  addToCart(productId: string): void {
    console.log('Add to cart:', productId);
    // TODO: CartService.addToCart(productId)
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
