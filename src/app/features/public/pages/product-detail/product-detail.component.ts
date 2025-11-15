import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  ProductCardComponent,
  Product,
} from '../../../../shared/components/product-card/product-card.component';
import { ProductDetailsSectionComponent } from '../../components/product-details-section/product-details-section.component';
import { ProductGalleryComponent } from '../../components/product-gallery/product-gallery.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { ProductsListComponent } from '../../components/products-list/products-list.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    ProductGalleryComponent,
    ProductInfoComponent,
    ProductDetailsSectionComponent,
    ProductsListComponent,
    ProductCardComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  // Données de démonstration
  product = {
    title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    category: 'Catégorie',
    subCategory: 'Sous-Catégorie',
    publishedDate: '14 Juin 2024 à 17:42',
    priceCAD: 25.99,
    priceFCFA: 162500,
    stock: 35,
    isDonation: true,
    isLot: false,
    seller: {
      name: 'Djibril Abeg',
      country: 'Ca',
      countryFlag: '🇨🇦',
      rating: 5,
      totalAds: 23,
      totalSales: 2,
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    colors: [
      { name: 'Blanc', value: '#FFFFFF' },
      { name: 'Gris', value: '#9CA3AF' },
      { name: 'Jaune', value: '#FCD34D' },
      { name: 'Rouge', value: '#DC2626' },
      { name: 'Vert', value: '#059669' },
      { name: 'Noir', value: '#1F2937' },
      { name: 'Violet', value: '#7C3AED' },
      { name: 'Bleu', value: '#2563EB' },
    ],
    sizes: ['XL', 'L', 'M', 'S'],
    description:
      'Alarming monday well territories attached ensure reinvent plane. Break unit moments and keep site shoulder. Deploy panel boy create future-proof. Bells one no-brainer backwards nobody impact. Mifflin fured productive based where where. New first lift underlying standup lift. Engagement product switch cloud crank jedi.',
  };

  productImages = [
    {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
      alt: 'Vêtements colorés',
    },
    {
      url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
      alt: 'Vêtements colorés 2',
    },
    {
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      alt: 'Vêtements colorés 3',
    },
    {
      url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      alt: 'Vêtements colorés 4',
    },
    {
      url: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800',
      alt: 'Vêtements colorés 5',
    },
  ];

  reviews = [
    {
      author: 'Djibril Abeg',
      avatar: 'https://i.pravatar.cc/150?img=12',
      country: 'Ca',
      countryFlag: '🇨🇦',
      rating: 5,
      comment:
        'Alarming monday well territories attached ensure reinvent plane. Break unit moments and keep site shoulder. Deploy panel boy create future-proof.',
      date: '14 Juin 2024',
    },
    {
      author: 'Djibril Abeg',
      avatar: 'https://i.pravatar.cc/150?img=12',
      country: 'Ca',
      countryFlag: '🇨🇦',
      rating: 5,
      comment:
        'Alarming monday well territories attached ensure reinvent plane. Break unit moments and keep site shoulder. Deploy panel boy create future-proof.',
      date: '14 Juin 2024',
    },
    {
      author: 'Djibril Abeg',
      avatar: 'https://i.pravatar.cc/150?img=12',
      country: 'Ca',
      countryFlag: '🇨🇦',
      rating: 5,
      comment:
        'Alarming monday well territories attached ensure reinvent plane. Break unit moments and keep site shoulder. Deploy panel boy create future-proof.',
      date: '14 Juin 2024',
    },
  ];

  lotProducts = [
    {
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
    {
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
    {
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
    {
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
    {
      image:
        'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
    },
  ];

  // Utilisation des mêmes données que la page home
  sellerProducts: Product[] = this.generateMockProducts(5);
  similarProducts: Product[] = this.generateMockProducts(5);

  breadcrumbs = [
    { label: 'Accueil', url: '/' },
    { label: "Dénomination de l'article", url: '#' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    // TODO: Charger les données du produit depuis un service
  }

  // Méthode identique à celle de home.component.ts
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
        vendor: {
          name: 'Vendeur',
          flags: ['🇫🇷'],
          isVerified: true,
        },
        clics: Math.floor(Math.random() * 50) + 10,
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 100),
        stock: Math.floor(Math.random() * 50) + 1,
        badges: options?.badge ? [options.badge] : [],
        isFavorite: false,
      });
    }

    return products;
  }

  onFavoriteToggled(productId: string): void {
    console.log('Toggle favorite for product:', productId);
  }
}
