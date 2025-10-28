import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartSummary {
  subtotal: number;
  occaverseFees: number;
  conformityCheckFees: number;
  shippingFees: number;
  total: number;
  currency: string;
  itemCount: number;
}

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent {
  @Input() summary!: CartSummary;
  @Output() checkout = new EventEmitter<void>();

  onCheckout(): void {
    this.checkout.emit();
  }
}
