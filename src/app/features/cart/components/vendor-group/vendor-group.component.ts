import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CartItemComponent,
  CartItemData,
} from '../cart-item/cart-item.component';

export interface VendorGroup {
  vendor: {
    name: string;
    avatar: string;
    country: string;
    countryFlag: string;
    isVerified: boolean;
  };
  items: CartItemData[];
  totalPrice: number;
  currency: string;
  discountRequested?: boolean;
  discountPending?: boolean;
}

@Component({
  selector: 'app-vendor-group',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.scss'],
})
export class VendorGroupComponent {
  @Input() group!: VendorGroup;
  @Output() itemChanged = new EventEmitter<CartItemData>();
  @Output() itemRemoved = new EventEmitter<string>();
  @Output() itemAddedToFavorites = new EventEmitter<string>();
  @Output() discountRequested = new EventEmitter<VendorGroup>();

  onItemChanged(item: CartItemData): void {
    this.itemChanged.emit(item);
  }

  onItemRemoved(itemId: string): void {
    this.itemRemoved.emit(itemId);
  }

  onItemAddedToFavorites(productId: string): void {
    this.itemAddedToFavorites.emit(productId);
  }

  requestDiscount(): void {
    this.discountRequested.emit(this.group);
  }

  calculateTotal(): number {
    return this.group.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }

  areAllItemsSelected(): boolean {
    return this.group.items.every((item) => item.selected);
  }

  toggleSelectAll(): void {
    const newState = !this.areAllItemsSelected();
    this.group.items.forEach((item) => {
      item.selected = newState;
      this.itemChanged.emit(item);
    });
  }
}
