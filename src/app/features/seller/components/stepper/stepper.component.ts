import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepConfig {
  id: number;
  label: string;
  sublabel?: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Mobile: Simple step indicator -->
    <div class="sm:hidden flex items-center justify-center gap-2">
      <span class="text-sm font-medium text-primary-500">
        Étape {{ currentStep }} / {{ steps.length }}
      </span>
      <span class="text-sm text-gray-500">-</span>
      <span class="text-sm text-gray-700">{{ getCurrentStepLabel() }}</span>
    </div>

    <!-- Desktop: Full stepper -->
    <div class="hidden sm:flex items-center justify-between">
      <ng-container *ngFor="let step of steps; let i = index; let last = last">
        <!-- Step -->
        <div class="flex flex-col items-center">
          <!-- Circle -->
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
            [ngClass]="{
              'bg-primary-500 text-white': currentStep >= step.id,
              'bg-white text-gray-400 border-2 border-gray-200':
                currentStep < step.id
            }"
          >
            {{ step.id }}
          </div>
          <!-- Label -->
          <div class="mt-2 text-center">
            <p
              class="text-xs font-medium"
              [ngClass]="{
                'text-primary-500': currentStep >= step.id,
                'text-gray-400': currentStep < step.id
              }"
            >
              {{ step.label }}
            </p>
            <p *ngIf="step.sublabel" class="text-xs text-gray-400">
              {{ step.sublabel }}
            </p>
          </div>
        </div>

        <!-- Connector Line -->
        <div
          *ngIf="!last"
          class="flex-1 h-0.5 mx-2 -mt-6"
          [ngClass]="{
            'bg-primary-500': currentStep > step.id,
            'bg-gray-200': currentStep <= step.id
          }"
        ></div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class StepperComponent {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep = 1;

  getCurrentStepLabel(): string {
    const step = this.steps.find((s) => s.id === this.currentStep);
    if (step) {
      return step.sublabel ? `${step.label} ${step.sublabel}` : step.label;
    }
    return '';
  }
}
