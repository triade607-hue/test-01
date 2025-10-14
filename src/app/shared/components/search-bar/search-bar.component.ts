// src/app/shared/components/search-bar/search-bar.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full">
      <!-- Search Input Container -->
      <div class="relative">
        <!-- Search Icon -->
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Input Field -->
        <input
          #searchInput
          type="text"
          [(ngModel)]="searchValue"
          [placeholder]="placeholder"
          (input)="onInputChange()"
          (keyup.enter)="onSearch()"
          (focus)="onFocus()"
          (blur)="onBlurDelayed()"
          [ngClass]="inputClasses"
          class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />

        <!-- Clear Button -->
        <button
          *ngIf="searchValue && showClearButton"
          type="button"
          (click)="clearSearch()"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Suggestions Dropdown -->
      <div
        *ngIf="showSuggestions && filteredSuggestions.length > 0 && isFocused"
        class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
      >
        <button
          *ngFor="let suggestion of filteredSuggestions; let i = index"
          type="button"
          (click)="selectSuggestion(suggestion)"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
          [class.bg-gray-50]="i === selectedIndex"
        >
          <div class="flex items-center gap-3">
            <!-- Icon -->
            <svg
              class="w-5 h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <!-- Text -->
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 truncate">
                {{ suggestion }}
              </p>
            </div>

            <!-- Arrow Icon -->
            <svg
              class="w-4 h-4 text-gray-400 flex-shrink-0"
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
          </div>
        </button>

        <!-- No Results -->
        <div
          *ngIf="
            searchValue &&
            filteredSuggestions.length === 0 &&
            suggestions.length > 0
          "
          class="px-4 py-3 text-sm text-gray-500 text-center"
        >
          Aucun résultat trouvé
        </div>
      </div>

      <!-- Loading Indicator -->
      <div *ngIf="loading" class="absolute right-12 top-1/2 -translate-y-1/2">
        <svg
          class="animate-spin h-5 w-5 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Rechercher...';
  @Input() suggestions: string[] = [];
  @Input() showSuggestions = true;
  @Input() showClearButton = true;
  @Input() debounceTime = 300;
  @Input() loading = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  @Output() suggestionSelected = new EventEmitter<string>();
  @Output() inputChanged = new EventEmitter<string>();

  searchValue = '';
  isFocused = false;
  selectedIndex = -1;
  private debounceTimer: any;
  private blurTimer: any;

  get inputClasses(): string {
    const sizeClasses = {
      sm: 'text-sm py-2',
      md: 'text-base py-2.5',
      lg: 'text-lg py-3',
    };
    return sizeClasses[this.size];
  }

  get filteredSuggestions(): string[] {
    if (!this.searchValue || !this.showSuggestions) {
      return this.suggestions;
    }

    return this.suggestions.filter((s) =>
      s.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  onInputChange(): void {
    // Debounce input changes
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.inputChanged.emit(this.searchValue);
    }, this.debounceTime);
  }

  onSearch(): void {
    if (this.searchValue.trim()) {
      this.search.emit(this.searchValue.trim());
      this.isFocused = false;
    }
  }

  clearSearch(): void {
    this.searchValue = '';
    this.cleared.emit();
    this.searchInput.nativeElement.focus();
  }

  selectSuggestion(suggestion: string): void {
    this.searchValue = suggestion;
    this.suggestionSelected.emit(suggestion);
    this.isFocused = false;
    this.onSearch();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlurDelayed(): void {
    // Délai pour permettre le clic sur les suggestions
    this.blurTimer = setTimeout(() => {
      this.isFocused = false;
    }, 200);
  }

  focus(): void {
    this.searchInput.nativeElement.focus();
  }
}
