import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Image principale -->
      <div
        class="relative aspect-square bg-gray-100 rounded overflow-hidden group"
      >
        <img
          [src]="currentImage"
          [alt]="productTitle"
          class="w-full h-full object-cover"
        />

        <!-- Bouton favori -->
        <button
          (click)="toggleFavorite()"
          class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          [class.text-error]="isFavorite"
          [class.text-gray-400]="!isFavorite"
        >
          <svg
            class="w-6 h-6"
            [attr.fill]="isFavorite ? 'currentColor' : 'none'"
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

        <!-- Boutons navigation -->
        <button
          *ngIf="images.length > 1"
          (click)="previousImage()"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <svg
            class="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          *ngIf="images.length > 1"
          (click)="nextImage()"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <svg
            class="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Indicateurs -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            *ngFor="let image of images; let i = index"
            (click)="selectImage(i)"
            class="w-2 h-2 rounded-full transition-all"
            [ngClass]="i === currentImageIndex ? 'bg-white' : 'bg-white/50'"
          ></button>
        </div>
      </div>

      <!-- Miniatures -->
      <div class="grid grid-cols-5 gap-2">
        <button
          *ngFor="let image of images; let i = index"
          (click)="selectImage(i)"
          class="relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all"
          [class.border-primary-500]="i === currentImageIndex"
          [class.border-transparent]="i !== currentImageIndex"
        >
          <img
            [src]="image"
            [alt]="productTitle + ' - Image ' + (i + 1)"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  `,
})
export class ProductGalleryComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() productTitle = '';

  currentImageIndex = 0;
  isFavorite = false;

  ngOnInit(): void {
    if (this.images.length === 0) {
      this.images = ['/assets/placeholder.jpg'];
    }
  }

  get currentImage(): string {
    return this.images[this.currentImageIndex] || '/assets/placeholder.jpg';
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex > 0
        ? this.currentImageIndex - 1
        : this.images.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex < this.images.length - 1
        ? this.currentImageIndex + 1
        : 0;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
