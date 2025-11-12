import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../pages/product-detail/product-detail.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Catégorie complète -->
      <p class="text-sm text-gray-600">
        {{ product.category }} > {{ product.subCategory }}
      </p>

      <!-- Titre -->
      <h1 class="text-2xl font-bold text-gray-900">
        {{ product.title }}
      </h1>

      <!-- Date -->
      <p class="text-sm text-gray-500">Publié le {{ product.publishedDate }}</p>

      <!-- Vendeur -->
      <div class="flex items-center gap-3 p-4 bg-gray-50 rounded">
        <img
          [src]="product.vendor.avatar"
          [alt]="product.vendor.name"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-gray-900">
              {{ product.vendor.name }}
            </h3>
            <span class="text-lg">{{
              getCountryFlag(product.vendor.country)
            }}</span>
            <svg
              *ngIf="product.vendor.verified"
              class="w-5 h-5 text-primary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span>{{ product.vendor.rating }}</span>
            </div>
            <span
              >({{ product.vendor.totalSales }}) - 35 annonces ({{
                product.vendor.totalSales
              }}
              vente{{ product.vendor.totalSales > 1 ? 's' : '' }})</span
            >
          </div>
        </div>
      </div>

      <!-- Prix (sauf don) -->
      <div *ngIf="product.type !== 'donation'" class="space-y-2">
        <div class="flex items-baseline gap-3">
          <span class="text-3xl font-bold text-gray-900">
            {{ product.price }}{{ product.currency }}
          </span>
          <span class="text-xl text-gray-500">≈ 162.500 F</span>
        </div>
        <p class="text-sm text-gray-600">
          Stock disponible :
          <span class="font-semibold">{{ product.stock }}</span>
        </p>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>Moyens de paiement accepté</span>
          <svg class="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="2" fill="#003087" />
            <path d="M12 6h8v8h-8z" fill="#009CDE" />
          </svg>
          <svg class="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="2" fill="#1A1F71" />
          </svg>
        </div>
      </div>

      <!-- Badge Don -->
      <div *ngIf="product.type === 'donation'" class="space-y-3">
        <div
          class="inline-block px-6 py-2 bg-primary-500 text-white text-3xl font-bold rounded"
        >
          Don
        </div>
        <p class="text-sm text-gray-600">
          Stock disponible :
          <span class="font-semibold">{{ product.stock }}</span>
        </p>
      </div>

      <!-- Validation de vente -->
      <div
        *ngIf="product.needsApproval"
        class="flex items-start gap-3 p-4 bg-blue-50 rounded border border-blue-200"
      >
        <div
          class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-6 h-6 text-white"
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
        </div>
        <div>
          <h4 class="font-semibold text-gray-900">Validation de vente</h4>
          <p class="text-sm text-gray-600 mt-1">
            Ce produit nécessite l'accord du vendeur pour son achat, afin
            d'assurer sa disponibilité.
          </p>
        </div>
      </div>

      <!-- Sélecteurs Couleur et Taille (UNIQUEMENT pour produit simple) -->
      <div
        *ngIf="
          product.type === 'simple' &&
          product.colors &&
          product.colors.length > 0
        "
        class="space-y-4"
      >
        <!-- Couleur -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">
            Couleur :
            <span *ngIf="selectedColor" class="text-error capitalize">{{
              selectedColor
            }}</span>
          </label>
          <div class="flex gap-2 flex-wrap">
            <button
              *ngFor="let color of product.colors"
              (click)="selectColor(color)"
              class="w-10 h-10 rounded-full border-2 transition-all hover:scale-110"
              [ngClass]="getColorClass(color)"
              [class.ring-2]="selectedColor === color"
              [class.ring-primary-500]="selectedColor === color"
              [class.ring-offset-2]="selectedColor === color"
            ></button>
          </div>
        </div>

        <!-- Taille -->
        <div *ngIf="product.sizes && product.sizes.length > 0">
          <label class="block text-sm font-medium text-gray-900 mb-2"
            >Taille :</label
          >
          <select
            (change)="onSizeChange($event)"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Taille</option>
            <option *ngFor="let size of product.sizes" [value]="size">
              {{ size }}
            </option>
          </select>
        </div>
      </div>
    </div>
  `,
})
export class ProductInfoComponent {
  @Input() product!: Product;
  @Input() selectedColor: string | null = null;
  @Input() selectedSize: string | null = null;

  @Output() colorChange = new EventEmitter<string>();
  @Output() sizeChange = new EventEmitter<string>();

  selectColor(color: string): void {
    this.colorChange.emit(color);
  }

  onSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sizeChange.emit(select.value);
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      white: 'bg-white border-gray-300',
      gray: 'bg-gray-400',
      yellow: 'bg-yellow-400',
      red: 'bg-red-600',
      green: 'bg-green-600',
      black: 'bg-gray-900',
      purple: 'bg-purple-600',
      blue: 'bg-blue-600',
    };
    return colorMap[color] || 'bg-gray-400';
  }

  getCountryFlag(countryCode: string): string {
    const flags: { [key: string]: string } = {
      ca: '🇨🇦',
      fr: '🇫🇷',
      us: '🇺🇸',
      uk: '🇬🇧',
    };
    return flags[countryCode] || '🌍';
  }
}
