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

export interface MultiSelectOption {
  value: string;
  label: string;
  flag?: string;
}

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <!-- Input Field -->
      <div
        class="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-md bg-gray-50 cursor-pointer transition-colors min-h-[48px]"
        [class.ring-2]="isOpen"
        [class.ring-primary-500]="isOpen"
        (click)="toggleDropdown()"
      >
        <span class="text-sm text-gray-600">{{ label }}</span>
        <div class="flex items-center gap-2 flex-1 justify-end">
          <!-- Selected Tags -->
          <div
            *ngIf="selectedOptions.length > 0"
            class="flex flex-wrap gap-1 justify-end"
          >
            <span
              *ngFor="let option of selectedOptions.slice(0, maxVisibleTags)"
              class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded"
            >
              {{ option.label }}
              <button
                type="button"
                (click)="removeOption(option, $event)"
                class="hover:text-primary-900"
              >
                <svg
                  class="w-3 h-3"
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
            </span>
            <span
              *ngIf="selectedOptions.length > maxVisibleTags"
              class="text-xs text-gray-500"
            >
              +{{ selectedOptions.length - maxVisibleTags }}
            </span>
          </div>
          <span
            *ngIf="selectedOptions.length === 0"
            class="text-sm text-primary-500"
          >
            {{ placeholder }}
          </span>
          <svg
            class="w-4 h-4 text-gray-400 transition-transform flex-shrink-0"
            [class.rotate-180]="isOpen"
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
        </div>
      </div>

      <!-- Dropdown -->
      <div
        *ngIf="isOpen"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-hidden"
      >
        <!-- Search Input -->
        <div class="p-2 border-b border-gray-100">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
              placeholder="Rechercher un pays..."
              class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              (click)="$event.stopPropagation()"
            />
          </div>
        </div>

        <!-- Options List -->
        <div class="overflow-y-auto max-h-48">
          <div
            *ngFor="let option of filteredOptions"
            (click)="toggleOption(option, $event)"
            class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              [checked]="isSelected(option)"
              class="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              (click)="$event.stopPropagation()"
              (change)="toggleOption(option, $event)"
            />
            <span *ngIf="option.flag" class="text-base">{{ option.flag }}</span>
            <span [class.font-medium]="isSelected(option)">{{
              option.label
            }}</span>
          </div>
          <div
            *ngIf="filteredOptions.length === 0"
            class="px-4 py-3 text-sm text-gray-500 text-center"
          >
            Aucun résultat
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      input[type='checkbox'] {
        accent-color: #0077b6;
      }
    `,
  ],
})
export class MultiSelectComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = 'Sélectionner';
  @Input() options: MultiSelectOption[] = [];
  @Input() values: string[] = [];
  @Input() maxVisibleTags = 3;

  @Output() valuesChange = new EventEmitter<string[]>();

  isOpen = false;
  searchTerm = '';
  filteredOptions: MultiSelectOption[] = [];
  selectedOptions: MultiSelectOption[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
    this.selectedOptions = this.options.filter((o) =>
      this.values.includes(o.value)
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.filteredOptions = [...this.options];
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(term)
    );
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.selectedOptions.some((o) => o.value === option.value);
  }

  toggleOption(option: MultiSelectOption, event: Event): void {
    event.stopPropagation();

    if (this.isSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        (o) => o.value !== option.value
      );
    } else {
      this.selectedOptions = [...this.selectedOptions, option];
    }

    this.values = this.selectedOptions.map((o) => o.value);
    this.valuesChange.emit(this.values);
  }

  removeOption(option: MultiSelectOption, event: Event): void {
    event.stopPropagation();
    this.selectedOptions = this.selectedOptions.filter(
      (o) => o.value !== option.value
    );
    this.values = this.selectedOptions.map((o) => o.value);
    this.valuesChange.emit(this.values);
  }
}
