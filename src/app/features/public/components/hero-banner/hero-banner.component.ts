// src/app/features/public/components/hero-banner/hero-banner.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-200"
    >
      <!-- Carousel Images -->
      <div
        *ngFor="let image of carouselImages; let i = index"
        class="absolute inset-0 transition-opacity duration-1000"
        [class.opacity-100]="currentSlide === i"
        [class.opacity-0]="currentSlide !== i"
      >
        <img
          [src]="image"
          [alt]="'Bannière ' + (i + 1)"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Previous Button -->
      <button
        (click)="previousSlide()"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
      >
        <svg
          class="w-6 h-6 text-gray-800"
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

      <!-- Next Button -->
      <button
        (click)="nextSlide()"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
      >
        <svg
          class="w-6 h-6 text-gray-800"
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
    </div>
  `,
  styles: [],
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  carouselImages: string[] = [
    '/assets/images/home/banner-1.png',
    '/assets/images/home/banner-2.png',
  ];

  currentSlide = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change d'image toutes les 5 secondes
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  previousSlide(): void {
    this.currentSlide =
      this.currentSlide === 0
        ? this.carouselImages.length - 1
        : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide(); // Redémarre l'auto-slide après un clic manuel
  }
}
