import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-profile-password-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-50 rounded border border-gray-200 mb-4">
      <!-- Header avec titre et icône collapse -->
      <button
        (click)="toggleCollapse()"
        class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors rounded-t"
      >
        <h3 class="text-base font-semibold text-gray-900">Mot de passe</h3>
        <svg
          class="w-5 h-5 text-gray-500 transition-transform"
          [class.rotate-180]="!isCollapsed"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Contenu collapsible -->
      <div *ngIf="!isCollapsed" class="p-6 pt-2 space-y-4 bg-white rounded-b">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Mot de passe actuel -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Mot de passe actuel <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                [type]="showCurrentPassword ? 'text' : 'password'"
                [(ngModel)]="currentPassword"
                placeholder="••••••••••••••••••••"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
              />
              <button
                type="button"
                (click)="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  *ngIf="!showCurrentPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  *ngIf="showCurrentPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Nouveau mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">
              Nouveau mot passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                [type]="showNewPassword ? 'text' : 'password'"
                [(ngModel)]="newPassword"
                placeholder="••••••••••••••••••••"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
              />
              <button
                type="button"
                (click)="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  *ngIf="!showNewPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  *ngIf="showNewPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Bouton Enregistrer pleine largeur -->
        <div class="pt-2">
          <button
            (click)="onSave()"
            class="w-full px-6 py-3 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors shadow-sm"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfilePasswordSectionComponent {
  @Input() isCollapsed = false;

  @Output() save = new EventEmitter<PasswordData>();

  currentPassword = '';
  newPassword = '';
  showCurrentPassword = false;
  showNewPassword = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSave(): void {
    if (this.currentPassword && this.newPassword) {
      this.save.emit({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      });
      // Reset après save
      this.currentPassword = '';
      this.newPassword = '';
    }
  }
}
