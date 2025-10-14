import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  category: string;
  isFavorite: boolean;
  badges?: string[];
  vendor: {
    name: string;
    avatar: string;
    isVerified: boolean;
    rating: number;
  };
  conformityStatus?: 'pending' | 'approved' | 'rejected';
}

interface CartItem {
  id: string;
  selected: boolean;
  product: Product;
  quantity: number;
  variant1?: string;
  variant2?: string;
  conformityCheck: boolean;
}

interface TimelineStep {
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface Notification {
  id: string;
  type: 'reservation' | 'negotiation' | 'order' | 'donation' | 'message';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-showcase.component.html',
  styleUrls: ['./component-showcase.component.scss'],
})
export class ComponentShowcaseComponent {
  // Données de test pour ProductCard
  sampleProducts: Product[] = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max 256GB - Titanium Blue',
      price: 1299,
      currency: '$CAD',
      image:
        'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400',
      rating: 4.5,
      reviews: 128,
      stock: 15,
      category: 'Électronique',
      isFavorite: false,
      badges: ['Nouveau', 'En stock'],
      vendor: {
        name: 'TechStore Montreal',
        avatar:
          'https://ui-avatars.com/api/?name=TechStore&background=0077B6&color=fff',
        isVerified: true,
        rating: 4.8,
      },
    },
    {
      id: '2',
      title: 'MacBook Pro 16" M3 Max',
      price: 3499,
      currency: '$CAD',
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      rating: 4.9,
      reviews: 89,
      stock: 3,
      category: 'Électronique',
      isFavorite: true,
      badges: ['Prix fou'],
      vendor: {
        name: 'Apple Premium Reseller',
        avatar:
          'https://ui-avatars.com/api/?name=Apple&background=000&color=fff',
        isVerified: true,
        rating: 4.9,
      },
    },
  ];

  // Données pour CartItem
  cartItems: CartItem[] = [
    {
      id: '1',
      selected: true,
      product: this.sampleProducts[0],
      quantity: 1,
      variant1: 'Titanium Blue',
      variant2: '256GB',
      conformityCheck: true,
    },
    {
      id: '2',
      selected: true,
      product: this.sampleProducts[1],
      quantity: 1,
      variant1: 'Space Gray',
      variant2: '1TB SSD',
      conformityCheck: false,
    },
  ];

  // Données pour OrderTimeline
  orderSteps: TimelineStep[] = [
    {
      title: 'Commande passée',
      description: 'Votre commande a été confirmée',
      date: '24 Janvier 2025',
      status: 'completed',
    },
    {
      title: 'En préparation',
      description: 'Le vendeur prépare votre colis',
      date: '25 Janvier 2025',
      status: 'completed',
    },
    {
      title: 'Expédition',
      description: 'Votre colis est remis au transporteur',
      date: '26 Janvier 2025',
      status: 'current',
    },
    {
      title: 'En livraison',
      description: 'Votre colis est en route',
      status: 'upcoming',
    },
    {
      title: 'Livré',
      description: 'Colis reçu avec succès',
      status: 'upcoming',
    },
  ];

  // Données pour ProductGallery
  productImages: string[] = [
    'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800',
    'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800',
    'https://images.unsplash.com/photo-1678652197861-c0b0e2e4e56a?w=800',
    'https://images.unsplash.com/photo-1678652197914-7e1f3c3c5c3e?w=800',
  ];
  currentImageIndex = 0;

  // Données pour Notifications
  notifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Commande expédiée',
      description: 'Votre commande #12345 a été expédiée',
      timestamp: 'Il y a 2 heures',
      isRead: false,
    },
    {
      id: '2',
      type: 'negotiation',
      title: 'Nouvelle offre de prix',
      description: 'Le vendeur a proposé 1200$CAD pour iPhone 15',
      timestamp: 'Il y a 5 heures',
      isRead: false,
    },
    {
      id: '3',
      type: 'reservation',
      title: 'Réservation confirmée',
      description: 'Votre réservation pour MacBook Pro est confirmée',
      timestamp: 'Hier',
      isRead: true,
    },
    {
      id: '4',
      type: 'message',
      title: 'Nouveau message',
      description: 'TechStore Montreal vous a envoyé un message',
      timestamp: 'Il y a 2 jours',
      isRead: true,
    },
  ];

  // Méthodes pour ProductCard
  onFavoriteToggle(product: Product) {
    product.isFavorite = !product.isFavorite;
    console.log('Favori togglé:', product.title, product.isFavorite);
  }

  onAddToCart(product: Product) {
    console.log('Ajouté au panier:', product.title);
  }

  // Méthodes pour CartItem
  onQuantityChange(item: CartItem, newQuantity: number) {
    item.quantity = newQuantity;
    console.log('Quantité modifiée:', item.product.title, newQuantity);
  }

  onRemoveItem(item: CartItem) {
    console.log('Article retiré:', item.product.title);
  }

  onSaveForLater(item: CartItem) {
    console.log('Sauvegardé pour plus tard:', item.product.title);
  }

  // Méthodes pour ProductGallery
  nextImage() {
    if (this.currentImageIndex < this.productImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  // Méthodes pour CheckoutSummary
  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get fees(): number {
    return this.subtotal * 0.05; // 5% de frais
  }

  get conformityFees(): number {
    return this.cartItems
      .filter((item) => item.conformityCheck)
      .reduce((sum, item) => sum + 10, 0); // 10$ par article
  }

  get shippingCost(): number {
    return 15;
  }

  get total(): number {
    return this.subtotal + this.fees + this.conformityFees + this.shippingCost;
  }

  onCheckout() {
    console.log('Procéder au paiement:', this.total);
  }

  // Méthodes pour Notifications
  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      reservation: 'calendar-check',
      negotiation: 'message-square',
      order: 'package',
      donation: 'gift',
      message: 'mail',
    };
    return icons[type] || 'bell';
  }

  getNotificationColor(type: string): string {
    const colors: { [key: string]: string } = {
      reservation: 'bg-blue-100 text-blue-600',
      negotiation: 'bg-purple-100 text-purple-600',
      order: 'bg-green-100 text-green-600',
      donation: 'bg-orange-100 text-orange-600',
      message: 'bg-gray-100 text-gray-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  }
}
