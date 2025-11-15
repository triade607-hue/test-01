import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationRequestModalComponent } from '../donation-request-modal/donation-request-modal.component';

interface Seller {
  name: string;
  country: string;
  countryFlag: string;
  rating: number;
  totalAds: number;
  totalSales: number;
  avatar: string;
}

interface Product {
  title: string;
  category: string;
  subCategory: string;
  publishedDate: string;
  priceCAD: number;
  priceFCFA: number;
  stock: number;
  seller: Seller;
  isDonation?: boolean;
  isLot?: boolean;
  colors?: { name: string; value: string }[];
  sizes?: string[];
  description: string;
}

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule, DonationRequestModalComponent],
  template: `
    <div class="space-y-6">
      <!-- Catégorie -->
      <div class="text-sm text-gray-600">
        {{ product.category }} > {{ product.subCategory }}
      </div>

      <!-- Badge "Lot de produit" (si applicable) -->
      <div
        *ngIf="product.isLot"
        class="inline-flex items-center px-3 py-1 bg-blue-50 text-primary-500 text-xs font-medium rounded"
      >
        Lot de produit
      </div>

      <!-- Titre -->
      <h1 class="text-2xl font-bold text-gray-900 leading-tight">
        {{ product.title }}
      </h1>

      <!-- Date de publication -->
      <p class="text-sm text-gray-500">Publié le {{ product.publishedDate }}</p>

      <!-- Info Vendeur -->
      <div class="flex items-center gap-3">
        <img
          [src]="product.seller.avatar"
          [alt]="product.seller.name"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-900">{{
              product.seller.name
            }}</span>
            <span class="text-lg">{{ product.seller.countryFlag }}</span>
            <span class="text-xs text-gray-500"
              >({{ product.seller.country }})</span
            >
          </div>
          <div class="flex items-center gap-2 mt-1">
            <!-- Rating -->
            <div class="flex items-center">
              <svg
                *ngFor="let star of [1, 2, 3, 4, 5]"
                class="w-3.5 h-3.5"
                [class.text-yellow-400]="star <= product.seller.rating"
                [class.text-gray-300]="star > product.seller.rating"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <span class="text-xs text-gray-600"
              >({{ product.seller.rating }})</span
            >
            <span class="text-xs text-gray-500"
              >· {{ product.seller.totalAds }} annonces ({{
                product.seller.totalSales
              }}
              ventes)</span
            >
          </div>
        </div>
      </div>

      <!-- Prix -->
      <div *ngIf="!product.isDonation">
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-bold text-gray-900"
            >{{ product.priceCAD | number : '1.2-2' }}€</span
          >
          <span class="text-xl text-primary-500"
            >≈ {{ product.priceFCFA | number : '1.0-0' }} F</span
          >
        </div>
        <p class="text-sm text-gray-600 mt-1">
          Stock disponible :
          <span class="font-semibold">{{ product.stock }}</span>
        </p>

        <!-- Moyens de paiement -->
        <div class="flex items-center gap-2 mt-2">
          <span class="text-sm text-gray-600">Moyens de paiement accepté</span>
          <div class="flex items-center gap-1">
            <svg class="w-8 h-5" viewBox="0 0 38 24" fill="none">
              <rect width="38" height="24" rx="4" fill="#0070BA" />
            </svg>
            <svg class="w-8 h-5" viewBox="0 0 38 24" fill="none">
              <rect width="38" height="24" rx="4" fill="#1A1F71" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Don Mode -->
      <div *ngIf="product.isDonation" class="space-y-4">
        <div class="text-3xl font-bold text-primary-500">Don</div>
        <p class="text-sm text-gray-600">
          Stock disponible :
          <span class="font-semibold">{{ product.stock }}</span>
        </p>
      </div>

      <!-- Validation de vente -->
      <div class="flex items-start gap-3 p-4 bg-blue-50 rounded">
        <div
          class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 text-sm">
            Validation de vente
          </h3>
          <p class="text-xs text-gray-600 mt-1">
            Ce produit nécessite l'accord du vendeur pour son achat, afin
            d'assurer sa disponibilité.
          </p>
        </div>
      </div>

      <!-- Sélecteurs (seulement si pas donation) -->
      <div *ngIf="!product.isDonation && product.colors" class="space-y-4">
        <!-- Couleur -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">
            Couleur :
            <span class="text-red-600 font-semibold">{{
              selectedColor?.name || 'Rouge'
            }}</span>
          </label>
          <div class="flex items-center gap-2">
            <button
              *ngFor="let color of product.colors"
              (click)="selectedColor = color"
              [style.background-color]="color.value"
              class="w-10 h-10 rounded-full border-2 transition-all"
              [class.border-primary-500]="selectedColor?.value === color.value"
              [class.border-gray-300]="selectedColor?.value !== color.value"
              [class.ring-2]="selectedColor?.value === color.value"
              [class.ring-primary-200]="selectedColor?.value === color.value"
            ></button>
          </div>
        </div>

        <!-- Taille -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2"
            >Taille :</label
          >
          <select
            [(ngModel)]="selectedSize"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Taille</option>
            <option *ngFor="let size of product.sizes" [value]="size">
              {{ size }}
            </option>
          </select>
        </div>

        <!-- Quantité + Ajouter au panier -->
        <div class="flex items-center gap-3">
          <!-- Quantité -->
          <div class="flex items-center border border-gray-300 rounded">
            <button
              (click)="decreaseQuantity()"
              class="px-3 py-2 hover:bg-gray-50 text-gray-600"
            >
              -
            </button>
            <input
              type="number"
              [(ngModel)]="quantity"
              min="1"
              class="w-12 text-center border-x border-gray-300 py-2 text-sm"
            />
            <button
              (click)="increaseQuantity()"
              class="px-3 py-2 hover:bg-gray-50 text-gray-600"
            >
              +
            </button>
          </div>

          <!-- Bouton Ajouter au panier -->
          <button
            class="flex-1 bg-primary-500 text-white px-6 py-2.5 rounded font-medium hover:bg-primary-600 transition-colors"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      <!-- Bouton Demander le don (mode donation) -->
      <div *ngIf="product.isDonation">
        <button
          (click)="openDonationModal()"
          class="w-full bg-primary-500 text-white px-6 py-3 rounded font-medium hover:bg-primary-600 transition-colors"
        >
          Demander le don
        </button>
      </div>

      <!-- Boutons d'action -->
      <div class="grid grid-cols-4 gap-2">
        <!-- Discuter -->
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
        >
          <svg
            class="w-5 h-5 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span class="text-sm font-medium text-primary-500 hidden md:inline"
            >Discuter</span
          >
        </button>

        <!-- Négocier -->
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
        >
          <svg
            class="w-5 h-5 text-warning"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm font-medium text-warning hidden md:inline"
            >Négocier</span
          >
        </button>

        <!-- Réserver -->
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors"
        >
          <svg
            class="w-5 h-5 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm font-medium text-success hidden md:inline"
            >Réserver</span
          >
        </button>

        <!-- Partager -->
        <button
          class="flex items-center justify-center px-4 py-3 bg-gray-800 rounded hover:bg-gray-900 transition-colors"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>

      <!-- Description (visible sur desktop, masquée sur mobile) -->
      <div class="hidden lg:block">
        <h3 class="font-semibold text-gray-900 mb-2">Description</h3>
        <p class="text-sm text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>
        <button
          class="text-sm text-primary-500 font-medium hover:underline mt-2"
        >
          lire plus
        </button>
      </div>

      <!-- Description (visible sur mobile après les boutons, masquée sur desktop) -->
      <div class="lg:hidden">
        <h3 class="font-semibold text-gray-900 mb-2">Description</h3>
        <p class="text-sm text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>
        <button
          class="text-sm text-primary-500 font-medium hover:underline mt-2"
        >
          lire plus
        </button>
      </div>

      <!-- Composition du lot (si isLot) -->
      <div *ngIf="product.isLot && lotProducts && lotProducts.length > 0">
        <h3 class="font-semibold text-gray-900 mb-4">Composition du lot</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            *ngFor="let item of lotProducts"
            class="border border-gray-200 rounded overflow-hidden group hover:shadow-md transition-shadow"
          >
            <img
              [src]="item.image"
              [alt]="item.title"
              class="w-full h-32 object-cover"
            />
            <div class="p-3">
              <p class="text-sm text-gray-700 line-clamp-2">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de demande de don -->
    <app-donation-request-modal
      *ngIf="showDonationModal"
      (close)="closeDonationModal()"
      (submit)="onDonationSubmit($event)"
    ></app-donation-request-modal>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ProductInfoComponent {
  @Input() product!: Product;
  @Input() lotProducts: { image: string; title: string }[] = [];

  selectedColor: { name: string; value: string } | null = null;
  selectedSize = '';
  quantity = 1;
  showDonationModal = false;

  ngOnInit() {
    if (this.product.colors && this.product.colors.length > 0) {
      this.selectedColor = this.product.colors[0];
    }
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  openDonationModal(): void {
    this.showDonationModal = true;
  }

  closeDonationModal(): void {
    this.showDonationModal = false;
  }

  onDonationSubmit(reason: string): void {
    console.log('Demande de don soumise:', reason);
    // TODO: Envoyer la demande au backend
    this.closeDonationModal();
    // Afficher un message de confirmation
  }
}
