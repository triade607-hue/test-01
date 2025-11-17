import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../../shared/components/breadcrumb/breadcrumb.component';
import {
  ProductCardComponent,
  Product,
} from '../../../../shared/components/product-card/product-card.component';

interface Seller {
  id: string;
  name: string;
  isVerified: boolean;
  country: string;
  countryFlag: string;
  coverImage: string;
  avatar: string;
  stats: {
    followers: number;
    announcements: number;
    productsSold: number;
    rating: number;
  };
}

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ProductCardComponent],
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];
  seller: Seller | null = null;
  products: Product[] = [];
  isFollowing = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sellerId = this.route.snapshot.paramMap.get('id');
    this.loadSellerData(sellerId);
    this.loadProducts();
    this.setupBreadcrumb();
  }

  setupBreadcrumb(): void {
    this.breadcrumbItems = [
      { label: 'Accueil', url: '/' },
      { label: "Dénomination de l'article", url: '/search' },
      { label: this.seller?.name || 'Nom du Vendeur' },
    ];
  }

  loadSellerData(sellerId: string | null): void {
    this.seller = {
      id: sellerId || '1',
      name: 'Nom_Vendeur',
      isVerified: true,
      country: 'Canada',
      countryFlag: '🇨🇦',
      coverImage:
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200',
      avatar:
        'https://ui-avatars.com/api/?name=Nom+Vendeur&background=F59E0B&color=fff&size=200',
      stats: {
        followers: 45,
        announcements: 78,
        productsSold: 145,
        rating: 4.5,
      },
    };
  }

  loadProducts(): void {
    this.products = this.generateMockProducts(24);
  }

  private generateMockProducts(count: number): Product[] {
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
        id: `prod-${i + 1}`,
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: images[i % images.length],
        price: 2,
        currency: '$CAD',
        vendor: {
          name: 'Vendeur',
          flags: ['🇫🇷'],
          isVerified: true,
        },
        clics: 35,
      });
    }

    return products;
  }

  toggleFollow(): void {
    this.isFollowing = !this.isFollowing;
  }
}
