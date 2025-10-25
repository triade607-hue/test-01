// src/app/shared/components/breadcrumb/breadcrumb.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="text-sm text-gray-600 mb-6">
      <ng-container *ngFor="let item of items; let isLast = last">
        <!-- Lien cliquable -->
        <a
          *ngIf="item.url && !isLast"
          [routerLink]="item.url"
          class="hover:text-primary-500 transition-colors"
        >
          {{ item.label }}
        </a>

        <!-- Item actif (dernier élément ou isActive) -->
        <span
          *ngIf="!item.url || isLast || item.isActive"
          [class.text-primary-500]="isLast || item.isActive"
          [class.font-medium]="isLast || item.isActive"
        >
          {{ item.label }}
        </span>

        <!-- Séparateur -->
        <span *ngIf="!isLast" class="mx-2">></span>
      </ng-container>
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
