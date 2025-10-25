import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
    stock: number;
  };
  quantity: number;
  variant1?: string;
  variant2?: string;
  vendor: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  selected: boolean;
  conformityCheck: boolean;
}

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <a routerLink="/" class="hover:text-primary-500">Accueil</a>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">Panier</span>
      </nav>

      <!-- Empty state -->
      <div
        *ngIf="cartItems.length === 0"
        class="bg-white rounded border border-gray-200 p-12 text-center"
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Votre panier est vide
        </h3>
        <p class="text-gray-600 mb-6">Commencez à ajouter des produits</p>
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded hover:bg-primary-600"
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
          <span>Découvrir les produits</span>
        </a>
      </div>

      <!-- Panier avec items -->
      <div *ngIf="cartItems.length > 0" class="flex flex-col lg:flex-row gap-6">
        <!-- Liste des articles -->
        <div class="flex-1 space-y-4">
          <!-- Header -->
          <div class="bg-white rounded border border-gray-200 p-4">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  [(ngModel)]="selectAll"
                  (change)="toggleSelectAll()"
                  class="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-900"
                  >Tout sélectionner ({{ cartItems.length }})</span
                >
              </label>
              <button
                (click)="removeSelected()"
                [disabled]="selectedCount === 0"
                class="text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
              >
                Supprimer ({{ selectedCount }})
              </button>
            </div>
          </div>

          <!-- Articles -->
          <div
            *ngFor="let item of cartItems; trackBy: trackByItem"
            class="bg-white rounded border border-gray-200 p-4"
          >
            <div class="flex items-start gap-4">
              <!-- Checkbox -->
              <input
                type="checkbox"
                [(ngModel)]="item.selected"
                (change)="updateTotals()"
                class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded"
              />

              <!-- Image -->
              <a
                [routerLink]="['/products', item.product.id]"
                class="flex-shrink-0"
              >
                <img
                  [src]="item.product.image"
                  [alt]="item.product.title"
                  class="w-20 h-20 md:w-24 md:h-24 rounded object-cover"
                />
              </a>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <!-- Vendeur -->
                <div class="flex items-center gap-2 mb-2">
                  <img
                    [src]="item.vendor.avatar"
                    [alt]="item.vendor.name"
                    class="w-5 h-5 rounded-full"
                  />
                  <span class="text-xs text-gray-600">{{
                    item.vendor.name
                  }}</span>
                  <svg
                    *ngIf="item.vendor.isVerified"
                    class="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <!-- Titre -->
                <a
                  [routerLink]="['/products', item.product.id]"
                  class="font-medium text-gray-900 hover:text-primary-500 block mb-2"
                >
                  {{ item.product.title }}
                </a>

                <!-- Variantes -->
                <div
                  *ngIf="item.variant1 || item.variant2"
                  class="text-xs text-gray-600 mb-2"
                >
                  <span *ngIf="item.variant1">{{ item.variant1 }}</span>
                  <span *ngIf="item.variant1 && item.variant2"> • </span>
                  <span *ngIf="item.variant2">{{ item.variant2 }}</span>
                </div>

                <!-- Options -->
                <label
                  class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer mb-2"
                >
                  <input
                    type="checkbox"
                    [(ngModel)]="item.conformityCheck"
                    (change)="updateTotals()"
                    class="w-3 h-3 text-primary-500 border-gray-300 rounded"
                  />
                  <span>Contrôle de conformité (+5€)</span>
                </label>

                <!-- Stock warning -->
                <p
                  *ngIf="item.quantity > item.product.stock"
                  class="text-xs text-red-500"
                >
                  ⚠️ Stock insuffisant ({{ item.product.stock }} disponibles)
                </p>

                <!-- Mobile: Quantité et prix -->
                <div class="md:hidden mt-3 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <button
                      (click)="decreaseQuantity(item)"
                      [disabled]="item.quantity <= 1"
                      class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      [(ngModel)]="item.quantity"
                      (change)="validateQuantity(item)"
                      min="1"
                      [max]="item.product.stock"
                      class="w-16 px-2 py-1 text-center border border-gray-300 rounded text-sm"
                    />
                    <button
                      (click)="increaseQuantity(item)"
                      [disabled]="item.quantity >= item.product.stock"
                      class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <p class="text-lg font-bold text-primary-500">
                    {{ getItemTotal(item) }}{{ item.product.currency }}
                  </p>
                </div>
              </div>

              <!-- Desktop: Quantité -->
              <div class="hidden md:flex items-center gap-2">
                <button
                  (click)="decreaseQuantity(item)"
                  [disabled]="item.quantity <= 1"
                  class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  [(ngModel)]="item.quantity"
                  (change)="validateQuantity(item)"
                  min="1"
                  [max]="item.product.stock"
                  class="w-16 px-2 py-1 text-center border border-gray-300 rounded text-sm"
                />
                <button
                  (click)="increaseQuantity(item)"
                  [disabled]="item.quantity >= item.product.stock"
                  class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <!-- Desktop: Prix -->
              <div class="hidden md:block text-right">
                <p class="text-lg font-bold text-primary-500">
                  {{ getItemTotal(item) }}{{ item.product.currency }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ item.product.price }}{{ item.product.currency }} ×
                  {{ item.quantity }}
                </p>
              </div>

              <!-- Actions -->
              <div class="flex flex-col gap-2">
                <button
                  (click)="saveForLater(item.id)"
                  class="p-2 text-gray-600 hover:text-primary-500 rounded"
                  title="Enregistrer"
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
                <button
                  (click)="removeItem(item.id)"
                  class="p-2 text-gray-600 hover:text-red-500 rounded"
                  title="Supprimer"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé sticky -->
        <div class="w-full lg:w-96">
          <div
            class="bg-gray-50 rounded border border-gray-200 p-6 lg:sticky lg:top-24"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Récapitulatif ({{ selectedCount }})
            </h3>

            <!-- Détails -->
            <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Sous-total :</span>
                <span class="font-medium">{{ subtotal.toFixed(2) }}€</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Frais X (5%) :</span>
                <span class="font-medium">{{ fees.toFixed(2) }}€</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Conformité :</span>
                <span class="font-medium"
                  >{{ conformityFees.toFixed(2) }}€</span
                >
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Livraison :</span>
                <span class="font-medium">{{ shippingCost.toFixed(2) }}€</span>
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between mb-6">
              <span class="text-base font-semibold">Total :</span>
              <span class="text-2xl font-bold text-primary-500"
                >{{ total.toFixed(2) }}€</span
              >
            </div>

            <!-- Actions -->
            <button
              [routerLink]="['/cart/checkout']"
              [disabled]="selectedCount === 0"
              class="w-full mb-3 px-6 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 disabled:opacity-50"
            >
              Valider ({{ selectedCount }})
            </button>
            <button
              routerLink="/"
              class="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50"
            >
              Continuer mes achats
            </button>

            <!-- Promo -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-sm font-medium text-gray-900 mb-2">Code promo</p>
              <div class="flex gap-2">
                <input
                  type="text"
                  [(ngModel)]="promoCode"
                  placeholder="Code"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button
                  (click)="applyPromoCode()"
                  [disabled]="!promoCode"
                  class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 disabled:opacity-50"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CartListComponent implements OnInit {
  cartItems: CartItem[] = [];
  selectAll = false;
  promoCode = '';
  subtotal = 0;
  fees = 0;
  conformityFees = 0;
  shippingCost = 0;
  total = 0;

  get selectedCount(): number {
    return this.cartItems.filter((item) => item.selected).length;
  }

  ngOnInit(): void {
    this.loadCart();
    this.updateTotals();
  }

  loadCart(): void {
    // Mock data - À remplacer par CartService
    this.cartItems = [
      {
        id: '1',
        product: {
          id: 'p1',
          title: 'MacBook Pro 16" M3 Max - Comme neuf',
          image: 'https://via.placeholder.com/300',
          price: 2499,
          currency: '€',
          stock: 3,
        },
        quantity: 1,
        variant1: 'Couleur: Gris sidéral',
        variant2: 'Mémoire: 32GB',
        vendor: {
          name: 'TechStore',
          avatar: 'https://i.pravatar.cc/150?img=1',
          isVerified: true,
        },
        selected: true,
        conformityCheck: true,
      },
      {
        id: '2',
        product: {
          id: 'p2',
          title: 'iPhone 15 Pro Max 256GB',
          image: 'https://via.placeholder.com/300',
          price: 1199,
          currency: '€',
          stock: 5,
        },
        quantity: 2,
        variant1: 'Couleur: Titane naturel',
        vendor: {
          name: 'MobileShop',
          avatar: 'https://i.pravatar.cc/150?img=2',
          isVerified: true,
        },
        selected: true,
        conformityCheck: false,
      },
    ];
  }

  toggleSelectAll(): void {
    this.cartItems.forEach((item) => (item.selected = this.selectAll));
    this.updateTotals();
  }

  updateTotals(): void {
    const selected = this.cartItems.filter((i) => i.selected);
    this.subtotal = selected.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    this.fees = this.subtotal * 0.05;
    this.conformityFees = selected.reduce(
      (sum, i) => sum + (i.conformityCheck ? 5 * i.quantity : 0),
      0
    );
    this.shippingCost = this.subtotal > 50 ? 0 : 7.99;
    this.total =
      this.subtotal + this.fees + this.conformityFees + this.shippingCost;
    this.selectAll =
      this.cartItems.length > 0 && this.cartItems.every((i) => i.selected);
  }

  getItemTotal(item: CartItem): number {
    return (
      item.product.price * item.quantity +
      (item.conformityCheck ? 5 * item.quantity : 0)
    );
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.product.stock) {
      item.quantity++;
      this.updateTotals();
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotals();
    }
  }

  validateQuantity(item: CartItem): void {
    if (item.quantity < 1) item.quantity = 1;
    if (item.quantity > item.product.stock) item.quantity = item.product.stock;
    this.updateTotals();
  }

  removeItem(itemId: string): void {
    this.cartItems = this.cartItems.filter((i) => i.id !== itemId);
    this.updateTotals();
  }

  removeSelected(): void {
    this.cartItems = this.cartItems.filter((i) => !i.selected);
    this.updateTotals();
  }

  saveForLater(itemId: string): void {
    console.log('Save for later:', itemId);
  }

  applyPromoCode(): void {
    console.log('Apply promo:', this.promoCode);
  }

  trackByItem(index: number, item: CartItem): string {
    return item.id;
  }
}
