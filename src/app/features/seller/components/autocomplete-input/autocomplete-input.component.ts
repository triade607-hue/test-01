import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AutocompleteSuggestion {
  id: string;
  name: string;
  category?: string;
  image?: string;
}

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <!-- Input Field -->
      <input
        type="text"
        [(ngModel)]="value"
        (input)="onInput()"
        (focus)="onFocus()"
        [placeholder]="placeholder"
        class="w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
      />

      <!-- Suggestions Dropdown -->
      <div
        *ngIf="showSuggestions && filteredSuggestions.length > 0"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto"
      >
        <div class="p-2 border-b border-gray-100">
          <p class="text-xs text-gray-500 font-medium">
            Suggestions d'articles
          </p>
        </div>

        <div
          *ngFor="let suggestion of filteredSuggestions"
          (click)="selectSuggestion(suggestion)"
          class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
        >
          <!-- Image -->
          <div
            class="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0"
          >
            <img
              *ngIf="suggestion.image"
              [src]="suggestion.image"
              [alt]="suggestion.name"
              class="w-full h-full object-cover"
            />
            <div
              *ngIf="!suggestion.image"
              class="w-full h-full flex items-center justify-center"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ suggestion.name }}
            </p>
            <p *ngIf="suggestion.category" class="text-xs text-gray-500">
              {{ suggestion.category }}
            </p>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 text-gray-400"
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
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AutocompleteInputComponent implements OnInit {
  @Input() placeholder = '';
  @Input() suggestions: AutocompleteSuggestion[] = [];
  @Input() value = '';
  @Input() minChars = 2;

  @Output() valueChange = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<AutocompleteSuggestion>();

  showSuggestions = false;
  filteredSuggestions: AutocompleteSuggestion[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }

  onInput(): void {
    this.valueChange.emit(this.value);

    if (this.value.length >= this.minChars) {
      const term = this.value.toLowerCase();
      this.filteredSuggestions = this.suggestions
        .filter((s) => s.name.toLowerCase().includes(term))
        .slice(0, 5);
      this.showSuggestions = this.filteredSuggestions.length > 0;
    } else {
      this.showSuggestions = false;
      this.filteredSuggestions = [];
    }
  }

  onFocus(): void {
    if (
      this.value.length >= this.minChars &&
      this.filteredSuggestions.length > 0
    ) {
      this.showSuggestions = true;
    }
  }

  selectSuggestion(suggestion: AutocompleteSuggestion): void {
    this.value = suggestion.name;
    this.valueChange.emit(this.value);
    this.suggestionSelected.emit(suggestion);
    this.showSuggestions = false;
  }
}
