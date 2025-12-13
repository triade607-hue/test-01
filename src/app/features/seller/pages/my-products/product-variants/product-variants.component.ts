import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Variant } from '../../../models/product.models';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss'],
})
export class ProductVariantsComponent implements OnInit {
  productId: string = '';
  productName: string = "Dénomination de l'article";
  variants: Variant[] = [];
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadVariants();
  }

  loadVariants(): void {
    this.isLoading = true;
    this.productService.getVariants(this.productId).subscribe({
      next: (variants) => {
        this.variants = variants;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
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
    if (confirm('Êtes-vous sûr de vouloir retirer cette variante ?')) {
      this.productService
        .removeVariant(this.productId, variantId)
        .subscribe(() => {
          this.loadVariants();
        });
    }
  }

  save(): void {
    this.router.navigate(['/seller/products']);
  }
}
