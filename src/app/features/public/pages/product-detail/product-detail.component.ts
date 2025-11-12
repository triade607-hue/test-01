import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Types de produits
export type ProductType = 'simple' | 'donation' | 'lot';

// Interfaces
export interface Product {
  id: string;
  type: ProductType;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  price?: number;
  convertedPrice?: number;
  currency: string;
  convertedCurrency: string;
  stock: number;
  images: string[];
  vendor: Vendor;
  colors?: Color[];
  sizes?: string[];
  validationRequired: boolean;
  publishedAt: string;
  rating?: number;
  reviewCount?: number;
  lotItems?: LotItem[];
}

export interface Vendor {
  id: string;
  name: string;
  avatar: string;
  country: string;
  countryFlag: string;
  rating: number;
  salesCount: number;
  verified: boolean;
}

export interface Color {
  name: string;
  hex: string;
}

export interface LotItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  logo: string;
  price: number;
  rating: number;
}

export interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
    country: string;
    countryFlag: string;
  };
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImageIndex = 0;
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity = 1;
  activeTab: 'info' | 'reviews' = 'info';
  showDonationModal = false;
  donationReason = '';

  // Données mock
  deliveryOptions: DeliveryOption[] = [
    { id: '1', name: 'Mondial Relay', logo: '🚚', price: 6.49, rating: 4.5 },
    { id: '2', name: 'Colissimo', logo: '📦', price: 6.49, rating: 4.8 },
    { id: '3', name: 'Colivreo', logo: '🚛', price: 6.49, rating: 4.3 },
  ];

  reviews: Review[] = [
    {
      id: '1',
      author: {
        name: 'Djibril Abeg',
        avatar: 'https://i.pravatar.cc/150?img=1',
        country: 'Canada',
        countryFlag: '🇨🇦',
      },
      rating: 5,
      comment:
        'Alarming monday well territories attached ensure reinvent plane. Streak unit moments and keep site shoulder. Deploy panel boy create future-proof.',
      date: '2024-01-15',
    },
    {
      id: '2',
      author: {
        name: 'Djibril Abeg',
        avatar: 'https://i.pravatar.cc/150?img=2',
        country: 'Canada',
        countryFlag: '🇨🇦',
      },
      rating: 5,
      comment:
        'Alarming monday well territories attached ensure reinvent plane. Streak unit moments and keep site shoulder. Deploy panel boy create future-proof.',
      date: '2024-01-14',
    },
  ];

  relatedProducts = [
    {
      id: '1',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      image: 'https://picsum.photos/200/200?random=1',
      price: 25,
      vendor: '@Vendeur',
      verified: true,
    },
    {
      id: '2',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      image: 'https://picsum.photos/200/200?random=2',
      price: 25,
      vendor: '@Vendeur',
      verified: true,
    },
    {
      id: '3',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      image: 'https://picsum.photos/200/200?random=3',
      price: 25,
      vendor: '@Vendeur',
      verified: true,
    },
    {
      id: '4',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      image: 'https://picsum.photos/200/200?random=4',
      price: 25,
      vendor: '@Vendeur',
      verified: true,
    },
    {
      id: '5',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      image: 'https://picsum.photos/200/200?random=5',
      price: 25,
      vendor: '@Vendeur',
      verified: true,
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      const type = params['type'] || 'simple'; // simple, donation, lot
      this.loadProduct(productId, type as ProductType);
    });
  }

  loadProduct(id: string, type: ProductType) {
    // Simulation de chargement selon le type
    if (type === 'donation') {
      this.product = this.getMockDonationProduct();
    } else if (type === 'lot') {
      this.product = this.getMockLotProduct();
    } else {
      this.product = this.getMockSimpleProduct();
    }

    // Initialiser la première couleur si disponible
    if (this.product.colors && this.product.colors.length > 0) {
      this.selectedColor = this.product.colors[0].name;
    }

    // Initialiser la première taille si disponible
    if (this.product.sizes && this.product.sizes.length > 0) {
      this.selectedSize = this.product.sizes[0];
    }
  }

  getMockSimpleProduct(): Product {
    return {
      id: '1',
      type: 'simple',
      title: 'Dénomination du produit allant sur deux lignes mais pas plus...',
      category: 'Catégorie',
      subCategory: 'Sous-Catégorie',
      description:
        'Alarming monday well territories attached ensure reinvent plane. Streak unit moments and keep site shoulder. Deploy panel boy create future-proof. Boils one no-brainer backwards nobody impact. Miffin fured productive based where where. New first lift underlying standup lift. Engagement product switch cloud crank path.',
      price: 25.99,
      convertedPrice: 162.5,
      currency: '€',
      convertedCurrency: 'F',
      stock: 35,
      images: [
        'https://picsum.photos/600/600?random=1',
        'https://picsum.photos/600/600?random=2',
        'https://picsum.photos/600/600?random=3',
        'https://picsum.photos/600/600?random=4',
        'https://picsum.photos/600/600?random=5',
      ],
      vendor: {
        id: 'v1',
        name: 'Djibril Abeg',
        avatar: 'https://i.pravatar.cc/150?img=1',
        country: 'Canada',
        countryFlag: '🇨🇦',
        rating: 4.5,
        salesCount: 35,
        verified: true,
      },
      colors: [
        { name: 'Blanc', hex: '#FFFFFF' },
        { name: 'Gris', hex: '#9CA3AF' },
        { name: 'Jaune', hex: '#FCD34D' },
        { name: 'Rouge', hex: '#DC2626' },
        { name: 'Vert', hex: '#10B981' },
        { name: 'Noir', hex: '#000000' },
        { name: 'Violet', hex: '#8B5CF6' },
        { name: 'Bleu', hex: '#3B82F6' },
      ],
      sizes: ['XL', 'L', 'M'],
      validationRequired: true,
      publishedAt: '14 Juin 2024 à 17:42',
      rating: 4.5,
      reviewCount: 23,
    };
  }

  getMockDonationProduct(): Product {
    const product = this.getMockSimpleProduct();
    return {
      ...product,
      type: 'donation',
      price: undefined,
      convertedPrice: undefined,
      colors: undefined,
      sizes: undefined,
    };
  }

  getMockLotProduct(): Product {
    const product = this.getMockSimpleProduct();
    return {
      ...product,
      type: 'lot',
      colors: undefined,
      sizes: undefined,
      lotItems: [
        {
          id: '1',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=10',
          price: 25,
        },
        {
          id: '2',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=11',
          price: 25,
        },
        {
          id: '3',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=12',
          price: 25,
        },
        {
          id: '4',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=13',
          price: 25,
        },
        {
          id: '5',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=14',
          price: 25,
        },
        {
          id: '6',
          title:
            'Dénomination du produit allant sur deux lignes mais pas plus...',
          image: 'https://picsum.photos/200/200?random=15',
          price: 25,
        },
      ],
    };
  }

  // Actions
  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  incrementQuantity() {
    if (this.quantity < (this.product?.stock || 99)) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    console.log('Ajout au panier:', {
      product: this.product?.id,
      quantity: this.quantity,
      color: this.selectedColor,
      size: this.selectedSize,
    });
  }

  openDonationModal() {
    this.showDonationModal = true;
  }

  closeDonationModal() {
    this.showDonationModal = false;
    this.donationReason = '';
  }

  submitDonationRequest() {
    console.log('Demande de don:', this.donationReason);
    this.closeDonationModal();
  }

  toggleFavorite() {
    console.log('Toggle favorite');
  }

  shareProduct() {
    console.log('Partager le produit');
  }

  contactSeller() {
    console.log('Contacter le vendeur');
  }

  negotiate() {
    console.log('Négocier');
  }

  reserve() {
    console.log('Réserver');
  }

  changeTab(tab: 'info' | 'reviews') {
    this.activeTab = tab;
  }

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < Math.floor(rating));
  }
}
