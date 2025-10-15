// src/app/layouts/components/header/header.component.ts
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from './top-header/top-header.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CategoryCarouselComponent } from './category-carousel/category-carousel.component';
import { CategorySidebarComponent } from '../../../shared/components/category-sidebar/category-sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TopHeaderComponent,
    MainHeaderComponent,
    CategoryCarouselComponent,
    CategorySidebarComponent,
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

    <!-- Category Sidebar -->
    <app-category-sidebar
      [isOpen]="isSidebarOpen"
      (closed)="closeSidebar()"
    ></app-category-sidebar>
  `,
  styles: [
    `
      header.sticky {
        position: sticky;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSticky = true;
  isScrolled = false;
  isSidebarOpen = false;
  private scrollThreshold = 100;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > this.scrollThreshold;
  }

  ngOnInit(): void {
    // Écouter l'événement d'ouverture du sidebar
    window.addEventListener('openCategorySidebar', this.handleOpenSidebar);
  }

  ngOnDestroy(): void {
    window.removeEventListener('openCategorySidebar', this.handleOpenSidebar);
  }

  handleOpenSidebar = (): void => {
    this.isSidebarOpen = true;
  };

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
