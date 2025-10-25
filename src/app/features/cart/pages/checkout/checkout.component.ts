import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-4">Checkout</h1>
      <p class="text-gray-600">Page de paiement - TODO: À implémenter</p>
    </div>
  `,
})
export class CheckoutComponent {}
