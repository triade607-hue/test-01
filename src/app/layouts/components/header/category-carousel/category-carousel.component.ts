// src/app/layouts/components/header/category-carousel/category-carousel.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="relative flex items-center">
          <!-- Scroll Left Button -->
          <button
            *ngIf="showScrollButtons && canScrollLeft"
            (click)="scrollLeft()"
            class="absolute left-0 z-10 p-1 bg-white shadow-md rounded-full text-gray-600 hover:text-primary-500 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Categories Container -->
          <div
            #categoryContainer
            (scroll)="onScroll()"
            class="flex items-center gap-6 h-12 overflow-x-auto scrollbar-hide scroll-smooth"
            style="scrollbar-width: none; -ms-overflow-style: none;"
          >
            <!-- Bouton TOUS - Ouvre le Sidebar -->
            <button
              (click)="openCategorySidebar()"
              class="category-link flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded whitespace-nowrap transition-colors"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>TOUS</span>
            </button>

            <!-- Catégories -->
            <a
              *ngFor="let category of categories"
              [routerLink]="'/category/' + category.slug"
              routerLinkActive="active"
              class="category-link text-sm text-gray-700 hover:text-primary-500 font-medium whitespace-nowrap transition-colors"
            >
              {{ category.name }}
            </a>
          </div>

          <!-- Scroll Right Button -->
          <button
            *ngIf="showScrollButtons && canScrollRight"
            (click)="scrollRight()"
            class="absolute right-0 z-10 p-1 bg-white shadow-md rounded-full text-gray-600 hover:text-primary-500 transition-colors"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .category-link.active {
        @apply text-primary-500 border-b-2 border-primary-500;
      }

      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `,
  ],
})
export class CategoryCarouselComponent implements AfterViewInit {
  @ViewChild('categoryContainer')
  categoryContainer!: ElementRef<HTMLDivElement>;

  showScrollButtons = false;
  canScrollLeft = false;
  canScrollRight = false;

  categories: Category[] = [
    { id: '1', name: 'Accessoires', slug: 'accessoires' },
    { id: '2', name: 'Agriculture', slug: 'agriculture' },
    { id: '3', name: 'Ameublement', slug: 'ameublement' },
    { id: '4', name: 'Arts', slug: 'arts' },
    { id: '5', name: 'Bijoux', slug: 'bijoux' },
    { id: '6', name: 'Chaussures', slug: 'chaussures' },
    { id: '7', name: 'Électronique', slug: 'electronique' },
    { id: '8', name: 'Électroménager', slug: 'electromenager' },
    { id: '9', name: 'Jouets', slug: 'jouets' },
    { id: '10', name: 'Meubles', slug: 'meubles' },
    { id: '11', name: 'Mode', slug: 'mode' },
    { id: '12', name: 'Sport', slug: 'sport' },
    { id: '13', name: 'Véhicules', slug: 'vehicules' },
    { id: '14', name: 'Livres', slug: 'livres' },
    { id: '15', name: 'Maison & Jardin', slug: 'maison-jardin' },
  ];

  ngAfterViewInit(): void {
    this.checkScroll();
    window.addEventListener('resize', () => this.checkScroll());
  }

  onScroll(): void {
    this.checkScroll();
  }

  checkScroll(): void {
    if (!this.categoryContainer) return;

    const container = this.categoryContainer.nativeElement;
    const hasOverflow = container.scrollWidth > container.clientWidth;

    this.showScrollButtons = hasOverflow;
    this.canScrollLeft = container.scrollLeft > 0;
    this.canScrollRight =
      container.scrollLeft < container.scrollWidth - container.clientWidth;
  }

  scrollLeft(): void {
    if (!this.categoryContainer) return;
    const container = this.categoryContainer.nativeElement;
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    if (!this.categoryContainer) return;
    const container = this.categoryContainer.nativeElement;
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  openCategorySidebar(): void {
    // Émettre un événement pour ouvrir le sidebar
    // Cet événement sera capté par le Header parent
    window.dispatchEvent(new CustomEvent('openCategorySidebar'));
  }
}
