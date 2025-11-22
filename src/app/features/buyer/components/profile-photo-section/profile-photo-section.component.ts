import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-photo-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 rounded border border-gray-200 mb-4">
      <!-- Header avec titre et icône collapse -->
      <button
        (click)="toggleCollapse()"
        class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
      >
        <h3 class="text-base font-semibold text-gray-900">Photo de profil</h3>
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
      <div *ngIf="!isCollapsed" class="p-6 pt-2 bg-white rounded-b">
        <div class="flex justify-center">
          <div class="relative">
            <!-- Photo de profil -->
            <div
              class="w-30 h-30 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg"
            >
              <img
                [src]="currentPhoto"
                alt="Photo de profil"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Bouton upload (icône caméra) -->
            <label
              class="absolute bottom-2 right-2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors shadow-lg"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                (change)="onFileSelected($event)"
                class="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfilePhotoSectionComponent {
  @Input() profilePhoto = 'https://i.pravatar.cc/160?img=25';
  @Input() isCollapsed = false;

  @Output() photoChange = new EventEmitter<File>();

  currentPhoto = '';

  ngOnInit(): void {
    this.currentPhoto = this.profilePhoto;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Preview de l'image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.currentPhoto = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Emit automatiquement (upload auto)
      this.photoChange.emit(file);
    }
  }
}
