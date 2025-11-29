import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
      (click)="close()"
    >
      <!-- Modal -->
      <div
        class="bg-white rounded-md max-w-md w-full max-h-[90vh] flex flex-col relative"
        (click)="$event.stopPropagation()"
      >
        <!-- Bouton fermer (X) -->
        <button
          (click)="close()"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Header fixe -->
        <div class="p-8 pb-4 flex-shrink-0">
          <h2 class="text-2xl font-bold text-primary-500 mb-2">
            Programmer une recherche
          </h2>
        </div>

        <!-- Contenu scrollable -->
        <div class="overflow-y-auto flex-1 px-8">
          <form (ngSubmit)="submit()">
            <!-- Zone upload photo -->
            <div class="mb-6">
              <label
                for="file-upload"
                class="block bg-gray-50 rounded-md p-8 border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-primary-500 transition-colors"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  (change)="onFileSelected($event)"
                  class="hidden"
                />
                <div class="flex flex-col items-center">
                  <!-- Aperçu de l'image si uploadée -->
                  <div *ngIf="selectedImagePreview" class="mb-4">
                    <img
                      [src]="selectedImagePreview"
                      alt="Preview"
                      class="max-h-32 rounded"
                    />
                  </div>

                  <!-- Icône par défaut -->
                  <svg
                    *ngIf="!selectedImagePreview"
                    class="w-16 h-16 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <p class="text-sm text-gray-600 mb-1">
                    {{ selectedImagePreview ? "Cliquez pour changer l'image" : "Glissez ou déposez une photo de l'article recherché ou" }}
                  </p>
                  <span
                    class="text-sm text-primary-500 font-medium hover:underline"
                  >
                    téléchargez-la depuis votre ordinateur
                  </span>
                </div>
              </label>
            </div>

            <!-- Que recherchez-vous -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Que recherchez-vous ? <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                name="searchQuery"
                (blur)="validateSearchQuery()"
                placeholder="Entrez le nom de l'article recherché"
                maxlength="100"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p *ngIf="searchQueryError" class="text-xs text-red-500 mt-1">
                {{ searchQueryError }}
              </p>
            </div>

            <!-- Marque -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Marque de l'article
              </label>
              <select
                [(ngModel)]="brand"
                name="brand"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="" disabled selected>Marque de l'article</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="LG">LG</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <!-- Modèle -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Modèle de l'article
              </label>
              <select
                [(ngModel)]="model"
                name="model"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="" disabled selected>Modèle de l'article</option>
                <option value="iPhone 15">iPhone 15</option>
                <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                <option value="Galaxy S24">Galaxy S24</option>
                <option value="MacBook Pro">MacBook Pro</option>
                <option value="iPad Pro">iPad Pro</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <!-- État -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Etat de l'article
              </label>
              <select
                [(ngModel)]="state"
                name="state"
                class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="" disabled selected>Etat de l'article</option>
                <option value="Neuf">Neuf</option>
                <option value="Comme neuf">Comme neuf</option>
                <option value="Bon état">Bon état</option>
                <option value="État correct">État correct</option>
                <option value="Pour pièces">Pour pièces</option>
              </select>
            </div>

            <!-- Prix min/max -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="number"
                  [(ngModel)]="minPrice"
                  name="minPrice"
                  placeholder="Prix minimum"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  [(ngModel)]="maxPrice"
                  name="maxPrice"
                  placeholder="Prix maximum"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Délai -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Délai <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  type="date"
                  [(ngModel)]="deadline"
                  name="deadline"
                  (blur)="validateDeadline()"
                  [min]="minDate"
                  [max]="maxDate"
                  class="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                />
              </div>
              <p *ngIf="deadlineError" class="text-xs text-red-500 mt-1">
                {{ deadlineError }}
              </p>
            </div>
          </form>
        </div>

        <!-- Footer fixe -->
        <div class="pt-4 pb-8 px-8 flex-shrink-0 border-t border-gray-200">
          <button
            type="submit"
            (click)="submit()"
            [disabled]="!isFormValid()"
            class="w-full py-3 bg-primary-500 text-white rounded-md font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ScheduleSearchModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  searchQuery = '';
  brand = '';
  model = '';
  state = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  deadline = '';
  selectedImage: File | null = null;
  selectedImagePreview: string | null = null;

  searchQueryError = '';
  deadlineError = '';

  // Dates limites (aujourd'hui et dans 1 an)
  minDate: string;
  maxDate: string;

  constructor() {
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = oneYearLater.toISOString().split('T')[0];
  }

  close(): void {
    this.closed.emit();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImage = file;

      // Créer l'aperçu
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  validateSearchQuery(): void {
    this.searchQueryError = '';
    if (!this.searchQuery.trim()) {
      this.searchQueryError = "Le nom de l'article est requis";
    } else if (this.searchQuery.trim().length < 3) {
      this.searchQueryError = 'Minimum 3 caractères requis';
    }
  }

  validateDeadline(): void {
    this.deadlineError = '';
    if (!this.deadline) {
      this.deadlineError = 'La date de fin est requise';
    }
  }

  isFormValid(): boolean {
    return (
      this.searchQuery.trim() !== '' &&
      this.searchQuery.trim().length >= 3 &&
      this.deadline.trim() !== ''
    );
  }

  submit(): void {
    this.validateSearchQuery();
    this.validateDeadline();

    if (!this.isFormValid()) return;

    const data = {
      searchQuery: this.searchQuery,
      brand: this.brand,
      model: this.model,
      state: this.state,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      deadline: this.deadline,
      image: this.selectedImage,
    };

    this.submitted.emit(data);
    this.resetForm();
  }

  resetForm(): void {
    this.searchQuery = '';
    this.brand = '';
    this.model = '';
    this.state = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.deadline = '';
    this.selectedImage = null;
    this.selectedImagePreview = null;
    this.searchQueryError = '';
    this.deadlineError = '';
  }
}
