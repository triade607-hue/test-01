// src/app/layouts/components/header/header.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from './top-header/top-header.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CategoryCarouselComponent } from './category-carousel/category-carousel.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TopHeaderComponent,
    MainHeaderComponent,
    CategoryCarouselComponent,
  ],
  template: `
    <header
      [class.sticky]="isSticky"
      [class.shadow-md]="isSticky && isScrolled"
      class="top-0 z-50 bg-white transition-shadow duration-200"
    >
      <!-- Top Header - Langue & Devise -->
      <app-top-header></app-top-header>

      <!-- Main Header - Logo, Search, Actions -->
      <app-main-header></app-main-header>

      <!-- Category Carousel -->
      <app-category-carousel></app-category-carousel>
    </header>
  `,
  styles: [
    `
      header.sticky {
        position: sticky;
      }
    `,
  ],
})
export class HeaderComponent {
  isSticky = true;
  isScrolled = false;
  private scrollThreshold = 100;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > this.scrollThreshold;
  }
}
