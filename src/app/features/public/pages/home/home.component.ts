// src/app/features/public/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { CategoryIconsComponent } from '../../components/category-icons/category-icons.component';
import {
  Product,
  ProductCardComponent,
} from '../../../../shared/components/product-card/product-card.component';

interface ProductSection {
  id: string;
  title: string;
  subtitle?: string;
  link: string;
  products: Product[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroBannerComponent,
    ProductCardComponent,
    CategoryIconsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sections: ProductSection[] = [];

  ngOnInit(): void {
    this.loadSections();
  }

  private loadSections(): void {
    // Section Nouveautés
    this.sections.push({
      id: 'nouveautes',
      title: 'Nouveautés',
      link: '/search?filter=new',
      products: this.generateMockProducts(4, { badge: 'Nouveau' }),
    });

    // Section Bonnes affaires
    this.sections.push({
      id: 'bonnes-affaires',
      title: 'Bonnes affaires',
      link: '/search?filter=deals',
      products: this.generateMockProducts(4, { badge: 'Prix fou' }),
    });

    // Section Produits en lot
    this.sections.push({
      id: 'produits-lot',
      title: 'Produits en lot',
      link: '/search?filter=lots',
      products: this.generateMockProducts(4, { badge: 'En lot' }),
    });

    // Section Produits recherchés
    this.sections.push({
      id: 'produits-recherches',
      title: 'Produits recherchés',
      subtitle: 'Les plus populaires du moment',
      link: '/search?filter=trending',
      products: this.generateMockProducts(4, { badge: 'Populaire' }),
    });

    // Section Autres produits
    this.sections.push({
      id: 'autres-produits',
      title: 'Autres produits',
      link: '/search',
      products: this.generateMockProducts(8),
    });
  }

  private generateMockProducts(
    count: number,
    options?: { badge?: string }
  ): Product[] {
    const images = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    ];

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      products.push({
        id: `product-${Date.now()}-${i}`,
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: images[i % images.length],
        price: Math.floor(Math.random() * 200) + 10,
        currency: '$CAD',
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 100),
        vendor: {
          name: 'Vendeur',
          isVerified: Math.random() > 0.5,
        },
        stock: Math.floor(Math.random() * 50) + 1,
        badges: options?.badge ? [options.badge] : [],
        isFavorite: false,
      });
    }

    return products;
  }

  onFavoriteToggled(productId: string): void {
    // TODO: Implémenter la logique de favoris
    console.log('Toggle favorite for product:', productId);
  }

  onProductClick(productId: string): void {
    // Navigation gérée par routerLink dans ProductCard
    console.log('Product clicked:', productId);
  }
}
