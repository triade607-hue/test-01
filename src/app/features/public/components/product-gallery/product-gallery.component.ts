import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductImage {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Image principale avec navigation -->
      <div class="relative bg-gray-100 rounded overflow-hidden group">
        <img
          [src]="images[currentImageIndex].url"
          [alt]="images[currentImageIndex].alt"
          class="w-full h-[400px] object-cover"
        />

        <!-- Bouton Favoris -->
        <button
          (click)="toggleFavorite()"
          class="absolute top-4 right-4 w-10 h-10 bg-white rounded flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          [class.text-red-500]="isFavorite"
          [class.text-gray-600]="!isFavorite"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
        </button>

        <!-- Bouton Previous -->
        <button
          *ngIf="images.length > 1"
          (click)="previousImage()"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Bouton Next -->
        <button
          *ngIf="images.length > 1"
          (click)="nextImage()"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicateurs de position -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div
            *ngFor="let img of images; let i = index"
            class="w-2 h-2 rounded-full transition-all"
            [class.bg-white]="i === currentImageIndex"
            [class.bg-gray-400]="i !== currentImageIndex"
          ></div>
        </div>
      </div>

      <!-- Miniatures -->
      <div class="grid grid-cols-5 gap-2">
        <button
          *ngFor="let img of images; let i = index"
          (click)="selectImage(i)"
          class="relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all"
          [class.border-primary-500]="i === currentImageIndex"
          [class.border-transparent]="i !== currentImageIndex"
        >
          <img
            [src]="img.url"
            [alt]="img.alt"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductGalleryComponent {
  @Input() images: ProductImage[] = [];

  currentImageIndex = 0;
  isFavorite = false;

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.images.length - 1
        : this.currentImageIndex - 1;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
