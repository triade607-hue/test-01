import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';

interface Variant {
  id: string;
  image?: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  size?: string;
  color?: string;
  colorCode?: string;
  otherVariant?: string;
}

@Component({
  selector: 'app-product-variants',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss'],
})
export class ProductVariantsComponent implements OnInit {
  productId = '';
  productName = "Dénomination de l'article";
  variants: Variant[] = [];
  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.loadVariants();
    });
  }

  loadVariants(): void {
    // Mock data
    this.variants = [
      {
        id: '1',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        name: 'Dénomination du produit',
        price: 250.99,
        currency: 'CAD',
        quantity: 2,
        size: 'XL',
        color: 'Noire',
        colorCode: '#000000',
      },
      {
        id: '2',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        name: 'Dénomination du produit',
        price: 250.99,
        currency: 'CAD',
        quantity: 2,
        size: 'XL',
        color: 'Noire',
        colorCode: '#000000',
      },
      {
        id: '3',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        name: 'Dénomination du produit',
        price: 250.99,
        currency: 'CAD',
        quantity: 2,
        size: 'XL',
        color: 'Noire',
        colorCode: '#000000',
      },
      {
        id: '4',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        name: 'Dénomination du produit',
        price: 250.99,
        currency: 'CAD',
        quantity: 2,
        size: 'XL',
        color: 'Noire',
        colorCode: '#000000',
      },
    ];
  }

  addVariant(): void {
    this.router.navigate([
      '/seller/products',
      this.productId,
      'variants',
      'add',
    ]);
  }

  removeVariant(variantId: string): void {
    this.variants = this.variants.filter((v) => v.id !== variantId);
  }

  save(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/seller/products']);
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/seller/products']);
  }
}
