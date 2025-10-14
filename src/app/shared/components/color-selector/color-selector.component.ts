// src/app/shared/components/color-selector/color-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Color {
  name: string;
  value: string;
  available?: boolean;
}

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <label *ngIf="label" class="block text-sm font-medium text-gray-900 mb-2">
        {{ label }}
        <span *ngIf="selectedColor" class="text-red-600"
          >: {{ selectedColor.name }}</span
        >
      </label>

      <div class="flex flex-wrap items-center gap-2">
        <button
          *ngFor="let color of colors"
          type="button"
          [disabled]="color.available === false"
          (click)="selectColor(color)"
          [title]="
            color.name + (color.available === false ? ' (Non disponible)' : '')
          "
          [ngClass]="getColorButtonClass(color)"
          [style.background-color]="color.value"
          class="w-10 h-10 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <!-- Checkmark si sélectionné -->
          <svg
            *ngIf="isSelected(color)"
            class="w-5 h-5 mx-auto"
            [class.text-white]="isColorDark(color.value)"
            [class.text-gray-900]="!isColorDark(color.value)"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- X si non disponible -->
          <div
            *ngIf="color.available === false"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div class="w-full h-0.5 bg-red-500 rotate-45 transform"></div>
          </div>
        </button>
      </div>

      <!-- Message si aucune couleur sélectionnée -->
      <p
        *ngIf="!selectedColor && showHelper"
        class="mt-2 text-xs text-gray-500"
      >
        Sélectionnez une couleur
      </p>
    </div>
  `,
  styles: [],
})
export class ColorSelectorComponent {
  @Input() label = 'Couleur';
  @Input() colors: Color[] = [];
  @Input() selectedColor: Color | null = null;
  @Input() showHelper = true;

  @Output() colorSelected = new EventEmitter<Color>();

  selectColor(color: Color): void {
    if (color.available !== false) {
      this.selectedColor = color;
      this.colorSelected.emit(color);
    }
  }

  isSelected(color: Color): boolean {
    return this.selectedColor?.value === color.value;
  }

  getColorButtonClass(color: Color): string {
    const isSelected = this.isSelected(color);
    const isUnavailable = color.available === false;

    let classes = '';

    if (isSelected) {
      classes += 'border-primary-500 ring-2 ring-primary-200 scale-110 ';
    } else {
      classes += 'border-gray-300 hover:border-primary-400 ';
    }

    if (isUnavailable) {
      classes += 'opacity-40 cursor-not-allowed relative ';
    } else {
      classes += 'hover:scale-105 cursor-pointer ';
    }

    return classes;
  }

  // Détecte si une couleur est sombre pour ajuster la couleur du checkmark
  isColorDark(hexColor: string): boolean {
    // Convertir hex en RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculer la luminosité
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128;
  }
}
