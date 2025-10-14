// src/app/shared/components/rating/rating.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-1">
      <button
        *ngFor="let star of stars; let i = index"
        type="button"
        [disabled]="readonly"
        (click)="setRating(i + 1)"
        (mouseenter)="onHover(i + 1)"
        (mouseleave)="onHover(0)"
        [class.cursor-pointer]="!readonly"
        [class.cursor-default]="readonly"
        class="focus:outline-none transition-transform hover:scale-110"
      >
        <svg
          [ngClass]="getStarClass(i + 1)"
          [class]="sizeClass"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </button>

      <span *ngIf="showValue" class="text-sm font-medium text-gray-600 ml-1">
        {{ value }}
      </span>
    </div>
  `,
  styles: [],
})
export class RatingComponent implements OnInit {
  @Input() value = 0;
  @Input() max = 5;
  @Input() readonly = false;
  @Input() showValue = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() valueChange = new EventEmitter<number>();

  hoverValue = 0;
  stars: number[] = [];

  ngOnInit(): void {
    this.stars = Array(this.max)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get sizeClass(): string {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };
    return sizeClasses[this.size];
  }

  getStarClass(position: number): string {
    const activeValue = this.hoverValue || this.value;
    const isFilled = position <= activeValue;

    return isFilled
      ? 'text-yellow-400 fill-yellow-400'
      : 'text-gray-300 fill-gray-300';
  }

  setRating(value: number): void {
    if (!this.readonly) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }

  onHover(value: number): void {
    if (!this.readonly) {
      this.hoverValue = value;
    }
  }
}
