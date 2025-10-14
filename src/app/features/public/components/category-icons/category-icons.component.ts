// src/app/features/public/components/category-icons/category-icons.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CategoryIcon {
  id: string;
  name: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-category-icons',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white py-6 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <!-- Categories List -->
        <div class="flex items-center justify-around gap-8 flex-wrap">
          <a
            *ngFor="let category of categories"
            [routerLink]="category.link"
            class="flex items-center gap-3 group"
          >
            <div
              class="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0"
            >
              <img
                [src]="category.image"
                [alt]="category.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                (error)="onImageError($event)"
              />
            </div>
            <span
              class="text-sm font-medium text-gray-700 group-hover:text-primary-500 transition-colors"
            >
              {{ category.name }}
            </span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CategoryIconsComponent {
  categories: CategoryIcon[] = [
    {
      id: '1',
      name: 'Nouveautés',
      image: 'assets/images/home/new.png',
      link: '/search?category=new',
    },
    {
      id: '2',
      name: 'Flash',
      image: 'assets/images/home/flash.png',
      link: '/search?category=deals',
    },
    {
      id: '3',
      name: 'Lots de produit',
      image: 'assets/images/home/lot.png',
      link: '/search?category=lots',
    },
    {
      id: '4',
      name: 'Dons',
      image: 'assets/images/home/don.png',
      link: '/search?category=donations',
    },
    {
      id: '5',
      name: 'Promotions',
      image: 'assets/images/home/promotion.png',
      link: '/search?category=free-shipping',
    },
  ];

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error('Image not found:', img.src);
    // Fallback vers une image placeholder
    img.src = 'https://via.placeholder.com/48';
  }
}
