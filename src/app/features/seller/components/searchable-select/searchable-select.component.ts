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

export interface SelectOption {
  value: string;
  label: string;
  category?: string;
}

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <!-- Input Field -->
      <div
        class="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-md bg-gray-50 cursor-pointer transition-colors"
        [class.ring-2]="isOpen"
        [class.ring-primary-500]="isOpen"
        (click)="toggleDropdown()"
      >
        <span
          class="text-sm"
          [class.text-gray-400]="!selectedOption"
          [class.text-gray-900]="selectedOption"
        >
          {{ label }}
        </span>
        <div class="flex items-center gap-2">
          <span
            *ngIf="selectedOption"
            class="text-sm text-primary-500 font-medium"
          >
            {{ selectedOption.label }}
          </span>
          <span
            *ngIf="!selectedOption && placeholder"
            class="text-sm text-primary-500"
          >
            {{ placeholder }}
          </span>
          <svg
            class="w-4 h-4 text-gray-400 transition-transform"
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
        <div *ngIf="searchable" class="p-2 border-b border-gray-100">
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
              placeholder="Rechercher..."
              class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              (click)="$event.stopPropagation()"
            />
          </div>
        </div>

        <!-- Options List -->
        <div class="overflow-y-auto max-h-48">
          <div
            *ngFor="let option of filteredOptions"
            (click)="selectOption(option)"
            class="px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
            [class.bg-primary-50]="selectedOption?.value === option.value"
            [class.text-primary-600]="selectedOption?.value === option.value"
          >
            <span *ngIf="option.category" class="text-xs text-gray-400 block">{{
              option.category
            }}</span>
            {{ option.label }}
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
    `,
  ],
})
export class SearchableSelectComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Input() searchable = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<SelectOption>();

  isOpen = false;
  searchTerm = '';
  filteredOptions: SelectOption[] = [];
  selectedOption: SelectOption | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
    if (this.value) {
      this.selectedOption =
        this.options.find((o) => o.value === this.value) || null;
    }
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
    this.filteredOptions = this.options.filter(
      (option) =>
        option.label.toLowerCase().includes(term) ||
        (option.category && option.category.toLowerCase().includes(term))
    );
  }

  selectOption(option: SelectOption): void {
    this.selectedOption = option;
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
