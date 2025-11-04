import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OrderSummaryData {
  subtotal: number;
  occaverseFees: number;
  conformityFees: number;
  deliveryFees: number;
  total: number;
  itemCount: number;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded border border-gray-200 p-6 sticky top-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Récapitulatif ({{ summary.itemCount.toString().padStart(2, '0') }})
      </h3>

      <div class="space-y-3 mb-6">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Sous Total</span>
          <span class="font-medium text-gray-900">{{
            summary.subtotal | currency : 'EUR'
          }}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Frais d'Occaverse</span>
          <span class="font-medium text-gray-900">{{
            summary.occaverseFees | currency : 'EUR'
          }}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Contrôle de conformité</span>
          <span class="font-medium text-gray-900">{{
            summary.conformityFees | currency : 'EUR'
          }}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Livraison</span>
          <span class="font-medium text-gray-900">{{
            summary.deliveryFees | currency : 'EUR'
          }}</span>
        </div>

        <div class="border-t border-gray-200 pt-3 mt-3">
          <div class="flex items-center justify-between">
            <span class="text-base font-semibold text-gray-900">Total</span>
            <span class="text-xl font-bold text-gray-900">{{
              summary.total | currency : 'EUR'
            }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <ng-content select="[slot=payment-selector]"></ng-content>

        <button
          type="button"
          (click)="onPayment()"
          [disabled]="disabled"
          class="w-full px-6 py-3 bg-primary-500 text-white text-sm font-semibold rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Paiement
        </button>
      </div>
    </div>
  `,
})
export class OrderSummaryComponent {
  @Input() summary!: OrderSummaryData;
  @Input() disabled = false;
  @Output() payment = new EventEmitter<void>();

  onPayment(): void {
    this.payment.emit();
  }
}
