import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import {
  Product,
  ProductFilter,
  PaginatedProducts,
  ProductTab,
  ArticleFormData,
  LotFormData,
  DonationFormData,
  Variant,
  VariantFormData,
  Category,
  SuggestedCategory,
} from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Mock data
  private mockProducts: Product[] = this.generateMockProducts();

  // Tabs configuration
  readonly tabs: ProductTab[] = [
    { id: 'all', label: 'Tous vos articles', count: 49, filter: {} },
    {
      id: 'articles',
      label: 'Articles unitaires',
      count: 12,
      filter: { tab: 'articles' },
    },
    {
      id: 'lots',
      label: "Lots d'articles",
      count: 12,
      filter: { tab: 'lots' },
    },
    { id: 'donations', label: 'Dons', count: 13, filter: { tab: 'donations' } },
    {
      id: 'promoted',
      label: 'En publicité',
      count: 3,
      filter: { tab: 'promoted' },
    },
  ];

  // Categories
  readonly categories: Category[] = [
    {
      id: '1',
      name: 'Électronique',
      subCategories: [
        { id: '1-1', name: 'Smartphones', parentId: '1' },
        { id: '1-2', name: 'Ordinateurs', parentId: '1' },
        { id: '1-3', name: 'Tablettes', parentId: '1' },
      ],
    },
    {
      id: '2',
      name: 'Mode & Vêtements',
      subCategories: [
        { id: '2-1', name: 'Homme', parentId: '2' },
        { id: '2-2', name: 'Femme', parentId: '2' },
        { id: '2-3', name: 'Enfant', parentId: '2' },
      ],
    },
    {
      id: '3',
      name: 'Maison & Jardin',
      subCategories: [
        { id: '3-1', name: 'Meubles', parentId: '3' },
        { id: '3-2', name: 'Décoration', parentId: '3' },
        { id: '3-3', name: 'Jardin', parentId: '3' },
      ],
    },
  ];

  // Geographic zones
  readonly geoZones: string[] = [
    'France',
    'Canada',
    'Bénin',
    'Belgique',
    'Suisse',
  ];

  // Product states
  readonly productStates: string[] = [
    'Neuf',
    'Comme neuf',
    'Très bon état',
    'Bon état',
    'État correct',
  ];

  // ============================================
  // PRODUCTS CRUD
  // ============================================

  getProducts(
    filter: ProductFilter,
    page = 1,
    pageSize = 10
  ): Observable<PaginatedProducts> {
    let filtered = [...this.mockProducts];

    // Apply tab filter
    if (filter.tab === 'articles') {
      filtered = filtered.filter(
        (p) => p.articleType === 'article' && p.saleType === 'classic'
      );
    } else if (filter.tab === 'lots') {
      filtered = filtered.filter((p) => p.articleType === 'lot');
    } else if (filter.tab === 'donations') {
      filtered = filtered.filter((p) => p.saleType === 'donation');
    } else if (filter.tab === 'promoted') {
      filtered = filtered.filter((p) => p.isPromoted);
    }

    // Apply status filter
    if (filter.status) {
      filtered = filtered.filter((p) => p.status === filter.status);
    }

    // Apply search
    if (filter.search) {
      const search = filter.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({
      items,
      total,
      page,
      pageSize,
      totalPages,
    }).pipe(delay(300));
  }

  getProductById(id: string): Observable<Product | null> {
    const product = this.mockProducts.find((p) => p.id === id) || null;
    return of(product).pipe(delay(200));
  }

  createArticle(data: ArticleFormData): Observable<Product> {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: data.name,
      description: data.description,
      images: [],
      price: data.price,
      currency: '$CAD',
      quantity: data.quantity,
      category: data.category,
      subCategory: data.subCategory,
      brand: data.brand,
      model: data.model,
      state: data.state,
      defects: data.defects,
      articleType: 'article',
      saleType: 'classic',
      status: data.status,
      allowNegotiation: data.allowNegotiation,
      allowReservation: data.allowReservation,
      requireConfirmation: data.requireConfirmation,
      isPromoted: data.isPromoted,
      geoZones: data.geoZones,
      hasVariants: false,
      characteristics: data.characteristics,
      packaging: data.packaging,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.mockProducts.unshift(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  createLot(data: LotFormData): Observable<Product> {
    const newProduct: Product = {
      id: `lot-${Date.now()}`,
      name: data.name,
      description: data.description,
      images: [],
      price: 0,
      currency: '$CAD',
      quantity: 1,
      category: '',
      subCategory: '',
      state: '',
      articleType: 'lot',
      saleType: 'classic',
      status: data.status,
      allowNegotiation: data.allowNegotiation,
      allowReservation: data.allowReservation,
      requireConfirmation: false,
      isPromoted: false,
      geoZones: data.geoZones,
      lotItems: data.items,
      hasVariants: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.mockProducts.unshift(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  createDonation(data: DonationFormData): Observable<Product> {
    const newProduct: Product = {
      id: `don-${Date.now()}`,
      name: data.name,
      description: data.description,
      images: [],
      price: 0,
      currency: '$CAD',
      quantity: data.quantity,
      category: '',
      subCategory: '',
      state: data.state,
      articleType: data.isLot ? 'lot' : 'article',
      saleType: 'donation',
      status: data.status,
      allowNegotiation: false,
      allowReservation: false,
      requireConfirmation: false,
      isPromoted: false,
      geoZones: data.geoZones,
      lotItems: data.items,
      hasVariants: false,
      packaging: data.packaging,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.mockProducts.unshift(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, data: Partial<Product>): Observable<Product> {
    const index = this.mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = {
        ...this.mockProducts[index],
        ...data,
        updatedAt: new Date(),
      };
      return of(this.mockProducts[index]).pipe(delay(300));
    }
    throw new Error('Product not found');
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // ============================================
  // VARIANTS
  // ============================================

  getVariants(productId: string): Observable<Variant[]> {
    const product = this.mockProducts.find((p) => p.id === productId);
    return of(product?.variants || []).pipe(delay(200));
  }

  addVariant(productId: string, data: VariantFormData): Observable<Variant> {
    const product = this.mockProducts.find((p) => p.id === productId);
    if (product) {
      const newVariant: Variant = {
        id: `var-${Date.now()}`,
        color: data.color,
        colorHex: data.colorHex,
        size: data.size,
        otherVariant: data.otherVariant,
        price: data.price,
        quantity: data.quantity,
      };

      if (!product.variants) product.variants = [];
      product.variants.push(newVariant);
      product.hasVariants = true;

      return of(newVariant).pipe(delay(300));
    }
    throw new Error('Product not found');
  }

  removeVariant(productId: string, variantId: string): Observable<boolean> {
    const product = this.mockProducts.find((p) => p.id === productId);
    if (product && product.variants) {
      product.variants = product.variants.filter((v) => v.id !== variantId);
      product.hasVariants = product.variants.length > 0;
      return of(true).pipe(delay(200));
    }
    return of(false).pipe(delay(200));
  }

  // ============================================
  // CATEGORY SUGGESTIONS
  // ============================================

  getSuggestedCategories(productName: string): Observable<SuggestedCategory[]> {
    // Mock AI-based category suggestions
    const suggestions: SuggestedCategory[] = [
      {
        category: 'Catégorie 1',
        subCategory: 'Sous-Catégorie 1',
        fullPath: 'Catégorie 1 > Sous-Catégorie 1',
      },
      {
        category: 'Catégorie 2',
        subCategory: 'Sous-Catégorie 2',
        fullPath: 'Catégorie 2 > Sous-Catégorie 2',
      },
      {
        category: 'Catégorie 3',
        subCategory: 'Sous-Catégorie 3',
        fullPath: 'Catégorie 3 > Sous-Catégorie 3',
      },
    ];
    return of(suggestions).pipe(delay(500));
  }

  // ============================================
  // EXISTING PRODUCTS (for lot creation)
  // ============================================

  getExistingProducts(): Observable<Product[]> {
    const articles = this.mockProducts.filter(
      (p) =>
        p.articleType === 'article' &&
        p.saleType === 'classic' &&
        p.status === 'published'
    );
    return of(articles).pipe(delay(300));
  }

  // ============================================
  // MOCK DATA GENERATOR
  // ============================================

  private generateMockProducts(): Product[] {
    const products: Product[] = [];
    const statuses: Product['status'][] = [
      'published',
      'analyzing',
      'blocked',
      'archived',
    ];
    const types: Array<{
      article: Product['articleType'];
      sale: Product['saleType'];
    }> = [
      { article: 'article', sale: 'classic' },
      { article: 'lot', sale: 'classic' },
      { article: 'article', sale: 'donation' },
      { article: 'lot', sale: 'donation' },
    ];

    for (let i = 1; i <= 50; i++) {
      const type = types[i % types.length];
      const status = statuses[i % statuses.length];

      products.push({
        id: `prod-${i}`,
        name: 'Dénomination du produit',
        description: 'Description du produit',
        images: [
          {
            id: `img-${i}`,
            url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
            isMain: true,
            order: 0,
          },
        ],
        price: 250.99,
        currency: '$CAD',
        quantity: 2,
        category: 'Électronique',
        subCategory: 'Smartphones',
        state: 'Très bon état',
        articleType: type.article,
        saleType: type.sale,
        status,
        allowNegotiation: i % 2 === 0,
        allowReservation: i % 3 === 0,
        requireConfirmation: false,
        isPromoted: i % 10 === 0,
        geoZones: ['France', 'Canada'],
        hasVariants: i % 5 === 0,
        createdAt: new Date(Date.now() - i * 86400000),
        updatedAt: new Date(),
        publishedAt: status === 'published' ? new Date() : undefined,
      });
    }

    return products;
  }
}
