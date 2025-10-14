// src/app/shared/components/modal/modal.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay -->
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto" [@fadeIn]>
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black transition-opacity"
        [class.bg-opacity-75]="isOpen"
        [class.bg-opacity-0]="!isOpen"
        (click)="closeOnBackdrop && close()"
      ></div>

      <!-- Modal Container -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Modal Content -->
        <div
          [ngClass]="modalClasses"
          class="relative bg-white rounded-lg shadow-xl transform transition-all"
          [@scaleIn]
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div
            *ngIf="title || showCloseButton"
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <!-- Title -->
            <h3 *ngIf="title" class="text-xl font-bold text-gray-900">
              {{ title }}
            </h3>

            <!-- Close Button -->
            <button
              *ngIf="showCloseButton"
              type="button"
              (click)="close()"
              class="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
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
          </div>

          <!-- Body -->
          <div [class]="bodyPaddingClass">
            <ng-content></ng-content>
          </div>

          <!-- Footer (si présent) -->
          <div
            *ngIf="hasFooter"
            class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50"
          >
            <ng-content select="[modal-footer]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  animations: [],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() hasFooter = false;
  @Input() noPadding = false;

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.isOpen) {
      this.lockBodyScroll();
      this.opened.emit();
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  ngOnChanges(changes: any): void {
    if (changes.isOpen) {
      if (this.isOpen) {
        this.lockBodyScroll();
        this.opened.emit();
      } else {
        this.unlockBodyScroll();
      }
    }
  }

  get modalClasses(): string {
    const sizeClasses = {
      sm: 'max-w-sm w-full',
      md: 'max-w-md w-full',
      lg: 'max-w-lg w-full',
      xl: 'max-w-2xl w-full',
      full: 'max-w-full w-full m-4',
    };

    return sizeClasses[this.size];
  }

  get bodyPaddingClass(): string {
    return this.noPadding ? '' : 'p-6';
  }

  close(): void {
    this.isOpen = false;
    this.unlockBodyScroll();
    this.closed.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (this.isOpen && this.closeOnEscape) {
      this.close();
    }
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }
}
