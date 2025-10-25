// src/app/features/favorites/pages/favorites-list/favorites-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ProductCardComponent,
  Product,
} from '../../../../shared/components/product-card/product-card.component';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    BreadcrumbComponent,
  ],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>

      <!-- Grille de produits -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <app-product-card
          *ngFor="let product of favorites"
          [product]="product"
          [showFavoriteButton]="true"
          [isFavorite]="true"
          (favoriteToggle)="removeFromFavorites($event)"
        ></app-product-card>
      </div>
    </div>
  `,
})
export class FavoritesListComponent implements OnInit {
  favorites: Product[] = [];
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Mes préférences', isActive: true },
  ];

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    // Mock data
    this.favorites = [
      {
        id: '1',
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        price: 2,
        currency: '$CAD',
        vendor: { name: 'Vendeur', flags: ['🇨🇦'] },
        clics: 35,
      },
      {
        id: '2',
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
        price: 2,
        currency: '$CAD',
        vendor: { name: 'Vendeur', flags: ['🇨🇦'] },
        clics: 35,
      },
      {
        id: '3',
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        price: 2,
        currency: '$CAD',
        vendor: { name: 'Vendeur', flags: ['🇨🇦'] },
        clics: 35,
      },
      {
        id: '4',
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        price: 2,
        currency: '$CAD',
        vendor: { name: 'Vendeur', flags: ['🇫🇷'] },
        clics: 35,
      },
    ];
  }

  removeFromFavorites(productId: string): void {
    this.favorites = this.favorites.filter((f) => f.id !== productId);
    console.log('Removed from favorites:', productId);
  }
}
