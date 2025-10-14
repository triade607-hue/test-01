// src/app/shared/components/badge/badge.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="badgeClasses">
      <!-- Icon (optionnel) -->
      <svg
        *ngIf="icon"
        [class]="iconSizeClass"
        [class.mr-1]="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path [attr.d]="getIconPath(icon)" />
      </svg>

      <!-- Content -->
      <ng-content></ng-content>

      <!-- Remove Button (optionnel) -->
      <button
        *ngIf="removable"
        type="button"
        (click)="handleRemove()"
        class="ml-1 inline-flex items-center justify-center hover:opacity-75 focus:outline-none"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input() variant:
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() icon?: string;
  @Input() removable = false;
  @Input() rounded: 'default' | 'full' = 'full';

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-semibold';

    // Size classes
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    // Border radius
    const roundedClasses = {
      default: 'rounded',
      full: 'rounded-full',
    };

    // Variant classes
    const variantClasses = {
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
      secondary: 'bg-gray-100 text-gray-700',
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${
      roundedClasses[this.rounded]
    } ${variantClasses[this.variant]}`;
  }

  get iconSizeClass(): string {
    return this.size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  }

  handleRemove(): void {
    // Émission d'un événement pour le parent si nécessaire
    console.log('Badge removed');
  }

  getIconPath(icon: string): string {
    const icons: { [key: string]: string } = {
      check:
        'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
      x: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
      info: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
      exclamation:
        'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
      star: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
    };
    return icons[icon] || '';
  }
}
