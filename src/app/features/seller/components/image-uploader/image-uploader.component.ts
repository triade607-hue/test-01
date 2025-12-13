import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  isMain: boolean;
  order: number;
}

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Drop Zone -->
      <div
        class="relative border-2 border-dashed rounded-xl p-8 text-center transition-colors"
        [ngClass]="{
          'border-primary-500 bg-primary-50': isDragging,
          'border-gray-300 bg-gray-50 hover:border-gray-400': !isDragging
        }"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <input
          type="file"
          #fileInput
          multiple
          accept="image/*"
          class="hidden"
          (change)="onFileSelected($event)"
        />

        <div class="flex flex-col items-center">
          <svg
            class="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="text-sm text-gray-600 mb-1">
            Glissez ou déposez
            {{
              forVariant
                ? 'une photo de la variante'
                : 'les photos de votre article'
            }}
            ou
          </p>
          <button
            type="button"
            (click)="fileInput.click()"
            class="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
          >
            téléchargez-{{ forVariant ? 'la' : 'les' }}
          </button>
          <span class="text-sm text-gray-500"
            >depuis votre ordinateur{{
              !forVariant && minImages > 0
                ? ' (minimum ' + minImages + ' photos)'
                : ''
            }}</span
          >
        </div>
      </div>

      <!-- Preview Grid -->
      <div *ngIf="images.length > 0" class="grid grid-cols-4 gap-3">
        <div
          *ngFor="let image of images; let i = index"
          class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
          [class.ring-2]="image.isMain"
          [class.ring-primary-500]="image.isMain"
        >
          <img
            [src]="image.preview"
            alt=""
            class="w-full h-full object-cover"
          />

          <!-- Remove Button -->
          <button
            type="button"
            (click)="removeImage(i)"
            class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <svg
              class="w-4 h-4"
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

          <!-- Main Badge -->
          <div
            *ngIf="image.isMain"
            class="absolute bottom-2 left-2 px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded"
          >
            Principale
          </div>
        </div>
      </div>

      <!-- Helper Text -->
      <p *ngIf="!forVariant && images.length > 0" class="text-xs text-gray-500">
        Cliquez et faites glisser pour vos images pour définir l'image
        principale et l'ordre d'affichage.
      </p>

      <!-- Progress Bar (visible during upload) -->
      <div
        *ngIf="uploadProgress > 0 && uploadProgress < 100"
        class="relative h-1.5 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          class="absolute inset-y-0 left-0 bg-primary-500 transition-all duration-300"
          [style.width.%]="uploadProgress"
        ></div>
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
export class ImageUploaderComponent {
  @Input() images: UploadedImage[] = [];
  @Input() maxImages = 10;
  @Input() minImages = 4;
  @Input() forVariant = false;

  @Output() imagesChange = new EventEmitter<UploadedImage[]>();

  isDragging = false;
  uploadProgress = 0;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  }

  private processFiles(files: File[]): void {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const remaining = this.maxImages - this.images.length;
    const filesToProcess = imageFiles.slice(0, remaining);

    filesToProcess.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: UploadedImage = {
          id: `img-${Date.now()}-${index}`,
          file,
          preview: e.target?.result as string,
          isMain: this.images.length === 0 && index === 0,
          order: this.images.length + index,
        };
        this.images.push(newImage);
        this.imagesChange.emit(this.images);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const wasMain = this.images[index].isMain;
    this.images.splice(index, 1);

    // If removed image was main, set first image as main
    if (wasMain && this.images.length > 0) {
      this.images[0].isMain = true;
    }

    // Reorder
    this.images.forEach((img, i) => (img.order = i));

    this.imagesChange.emit(this.images);
  }

  setAsMain(index: number): void {
    this.images.forEach((img, i) => (img.isMain = i === index));
    this.imagesChange.emit(this.images);
  }
}
