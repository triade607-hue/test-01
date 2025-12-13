import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TrackingStep {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  alerts?: {
    type: 'success' | 'error';
    message: string;
  }[];
  actions?: {
    type: 'button' | 'link';
    label: string;
    variant?: 'primary' | 'secondary' | 'success';
    icon?: string;
    action: string;
  }[];
}

@Component({
  selector: 'app-tracking-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-0">
      <div
        *ngFor="let step of steps; let i = index; let last = last"
        class="relative pl-6 sm:pl-8"
      >
        <!-- Ligne verticale -->
        <div
          *ngIf="!last"
          class="absolute left-[6px] sm:left-[7px] top-4 w-0.5 -ml-px"
          [ngClass]="
            step.status === 'completed' ? 'bg-primary-500' : 'bg-gray-200'
          "
          [style.height]="'calc(100% - 8px)'"
        ></div>

        <div class="relative pb-8">
          <!-- Point -->
          <div
            class="absolute left-[-24px] sm:left-[-32px] top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 bg-white z-10"
            [ngClass]="{
              'bg-primary-500 border-primary-500':
                step.status === 'completed' || step.status === 'current',
              'bg-white border-gray-300': step.status === 'pending'
            }"
          ></div>

          <!-- Contenu -->
          <div class="flex-1">
            <!-- Header -->
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1"
            >
              <h4
                class="font-semibold text-sm sm:text-base"
                [ngClass]="
                  step.status === 'pending'
                    ? 'text-gray-400'
                    : 'text-primary-500'
                "
              >
                {{ step.title }}
              </h4>
              <span class="text-xs sm:text-sm text-gray-500">{{
                step.date
              }}</span>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {{ step.description }}
              <a
                *ngIf="step.description.includes('lien')"
                href="#"
                class="text-primary-500 hover:underline"
                >(lien)</a
              >
            </p>

            <!-- Alerts -->
            <div *ngIf="step.alerts?.length" class="mt-3 space-y-2">
              <div
                *ngFor="let alert of step.alerts"
                class="flex items-start gap-3 p-4 rounded-md"
                [ngClass]="{
                  'bg-green-50': alert.type === 'success',
                  'bg-red-50': alert.type === 'error'
                }"
              >
                <!-- Icon -->
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  [ngClass]="{
                    'bg-green-500': alert.type === 'success',
                    'bg-red-500': alert.type === 'error'
                  }"
                >
                  <svg
                    *ngIf="alert.type === 'success'"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    *ngIf="alert.type === 'error'"
                    class="w-4 h-4 text-white"
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
                </div>
                <p
                  class="text-sm"
                  [ngClass]="{
                    'text-green-800': alert.type === 'success',
                    'text-red-800': alert.type === 'error'
                  }"
                >
                  {{ alert.message }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div
              *ngIf="step.actions?.length"
              class="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3"
            >
              <ng-container *ngFor="let action of step.actions">
                <!-- Bouton primary -->
                <button
                  *ngIf="
                    action.type === 'button' && action.variant === 'primary'
                  "
                  class="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                  (click)="onAction(action.action)"
                >
                  <svg
                    *ngIf="action.icon === 'file'"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <svg
                    *ngIf="action.icon === 'star'"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  {{ action.label }}
                </button>

                <!-- Bouton outline success -->
                <button
                  *ngIf="
                    action.type === 'button' && action.variant === 'success'
                  "
                  class="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-green-500 text-green-600 text-xs sm:text-sm font-medium rounded-md hover:bg-green-50 transition-colors"
                  (click)="onAction(action.action)"
                >
                  <svg
                    *ngIf="action.icon === 'check'"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {{ action.label }}
                </button>

                <!-- Bouton secondary vert (Je suis satisfait) -->
                <button
                  *ngIf="
                    action.type === 'button' && action.variant === 'secondary'
                  "
                  class="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-md hover:bg-green-200 transition-colors"
                  (click)="onAction(action.action)"
                >
                  <svg
                    *ngIf="action.icon === 'check'"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {{ action.label }}
                </button>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TrackingTimelineComponent {
  @Input() steps: TrackingStep[] = [];

  onAction(action: string): void {
    console.log('Action:', action);
  }
}
