import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle } from 'lucide-angular';

@Component({
  selector: 'app-delivery-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-error/10 border border-error/20 rounded p-4">
      <div class="flex items-start gap-3">
        <lucide-angular
          [img]="AlertTriangleIcon"
          class="w-5 h-5 text-error shrink-0 mt-0.5"
        ></lucide-angular>
        <div class="flex-1">
          <p class="text-sm text-error leading-relaxed">
            <strong>Attention,</strong> {{ message }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class DeliveryAlertComponent {
  @Input() message =
    'Configurez vos livraisons. Si une commande nécessite un contrôle de conformité, choisissez également un mode de livraison vers OCCAVERSE.';

  AlertTriangleIcon = AlertTriangle;
}
