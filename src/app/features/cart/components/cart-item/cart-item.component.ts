import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CartItemData {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    currency: string;
    stock: number;
  };
  quantity: number;
  variant1?: string;
  variant2?: string;
  selected: boolean;
  conformityCheck: boolean;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item!: CartItemData;
  @Output() itemChanged = new EventEmitter<CartItemData>();
  @Output() itemRemoved = new EventEmitter<string>();
  @Output() itemAddedToFavorites = new EventEmitter<string>();

  onSelectionChange(): void {
    this.itemChanged.emit(this.item);
  }

  onConformityChange(): void {
    this.itemChanged.emit(this.item);
  }

  increaseQuantity(): void {
    if (this.item.quantity < this.item.product.stock) {
      this.item.quantity++;
      this.itemChanged.emit(this.item);
    }
  }

  decreaseQuantity(): void {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.itemChanged.emit(this.item);
    }
  }

  removeItem(): void {
    this.itemRemoved.emit(this.item.id);
  }

  addToFavorites(): void {
    this.itemAddedToFavorites.emit(this.item.product.id);
  }
}
