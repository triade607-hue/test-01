import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ProductCardComponent,
  Product,
} from '../../../../shared/components/product-card/product-card.component';
import { ScheduleSearchModalComponent } from '../../components/schedule-search-modal/schedule-search-modal.component';

interface Filter {
  id: string;
  label: string;
  isOpen: boolean;
  options?: FilterOption[];
}

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ScheduleSearchModalComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  searchQuery = '';
  hasResults = false; // Toggle pour tester les deux états
  showScheduleModal = false;

  filters: Filter[] = [
    {
      id: 'category',
      label: 'Catégorie',
      isOpen: false,
      options: [
        { id: 'electronics', label: 'Électronique', checked: false },
        { id: 'fashion', label: 'Mode', checked: false },
        { id: 'home', label: 'Maison', checked: false },
        { id: 'sports', label: 'Sports', checked: false },
      ],
    },
    {
      id: 'price',
      label: 'Echelle de prix',
      isOpen: false,
      options: [
        { id: 'price-1', label: 'Moins de 50€', checked: false },
        { id: 'price-2', label: '50€ - 100€', checked: false },
        { id: 'price-3', label: '100€ - 200€', checked: false },
        { id: 'price-4', label: 'Plus de 200€', checked: false },
      ],
    },
    {
      id: 'subcategory',
      label: 'Sous-Catégorie',
      isOpen: false,
      options: [
        { id: 'sub-1', label: 'Smartphones', checked: false },
        { id: 'sub-2', label: 'Laptops', checked: false },
        { id: 'sub-3', label: 'Accessoires', checked: false },
      ],
    },
    {
      id: 'state',
      label: 'Etat',
      isOpen: false,
      options: [
        { id: 'new', label: 'Neuf', checked: false },
        { id: 'like-new', label: 'Comme neuf', checked: false },
        { id: 'good', label: 'Bon état', checked: false },
        { id: 'fair', label: 'État correct', checked: false },
      ],
    },
    {
      id: 'location',
      label: 'Localisation',
      isOpen: false,
      options: [
        { id: 'local', label: 'À proximité', checked: false },
        { id: 'national', label: 'National', checked: false },
        { id: 'international', label: 'International', checked: false },
      ],
    },
    {
      id: 'brand',
      label: 'Marque',
      isOpen: false,
      options: [
        { id: 'apple', label: 'Apple', checked: false },
        { id: 'samsung', label: 'Samsung', checked: false },
        { id: 'sony', label: 'Sony', checked: false },
        { id: 'lg', label: 'LG', checked: false },
      ],
    },
    {
      id: 'model',
      label: 'Modèle',
      isOpen: false,
      options: [
        { id: 'model-1', label: 'iPhone 15', checked: false },
        { id: 'model-2', label: 'Galaxy S24', checked: false },
        { id: 'model-3', label: 'Pixel 8', checked: false },
      ],
    },
    {
      id: 'feature-a',
      label: 'Caractéristique A',
      isOpen: false,
      options: [
        { id: 'feat-a1', label: 'Option A1', checked: false },
        { id: 'feat-a2', label: 'Option A2', checked: false },
        { id: 'feat-a3', label: 'Option A3', checked: false },
      ],
    },
    {
      id: 'feature-b',
      label: 'Caractéristique B',
      isOpen: false,
      options: [
        { id: 'feat-b1', label: 'Option B1', checked: false },
        { id: 'feat-b2', label: 'Option B2', checked: false },
        { id: 'feat-b3', label: 'Option B3', checked: false },
      ],
    },
  ];

  // Produits affichés (Articles proposés)
  products: Product[] = [];

  // Autres produits recherchés (avec badge "Recherche active")
  searchedProducts: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer la query de recherche depuis l'URL
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.loadProducts();
    });
  }

  toggleFilter(filterId: string): void {
    const filter = this.filters.find((f) => f.id === filterId);
    if (filter) {
      filter.isOpen = !filter.isOpen;
    }
  }

  loadProducts(): void {
    if (this.hasResults) {
      this.products = this.generateMockProducts(12);
      this.searchedProducts = this.generateMockSearchProducts(4);
    } else {
      this.products = [];
      this.searchedProducts = [];
    }
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

  private generateMockSearchProducts(count: number): Product[] {
    const images = [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    ];

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      products.push({
        id: `search-${Date.now()}-${i}`,
        title:
          'Dénomination du produit allant sur deux lignes mais pas plus...',
        image: images[i % images.length],
        price: Math.floor(Math.random() * 200) + 10,
        currency: '$CAD',
        vendor: {
          name: 'CeluiQuiRecherche',
          flags: ['🇫🇷'],
          isVerified: false,
        },
        clics: Math.floor(Math.random() * 50) + 10,
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 100),
        stock: Math.floor(Math.random() * 50) + 1,
        badges: ['Recherche active'],
        isFavorite: false,
      });
    }

    return products;
  }

  onFavoriteToggled(productId: string): void {
    console.log('Toggle favorite for product:', productId);
  }

  onScheduleSearch(): void {
    this.showScheduleModal = true;
  }

  closeScheduleModal(): void {
    this.showScheduleModal = false;
  }

  onScheduleSubmit(data: any): void {
    console.log('Recherche programmée:', data);
    // TODO: Envoyer au backend
    this.closeScheduleModal();
    // Afficher message de confirmation
  }

  get activeFilters(): { id: string; filterId: string; label: string }[] {
    const active: { id: string; filterId: string; label: string }[] = [];

    this.filters.forEach((filter) => {
      filter.options?.forEach((option) => {
        if (option.checked) {
          active.push({
            id: option.id,
            filterId: filter.id,
            label: option.label,
          });
        }
      });
    });

    return active;
  }

  removeFilter(filterId: string, optionId: string): void {
    const filter = this.filters.find((f) => f.id === filterId);
    if (filter && filter.options) {
      const option = filter.options.find((o) => o.id === optionId);
      if (option) {
        option.checked = false;
      }
    }
  }
}
