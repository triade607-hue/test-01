import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageUploaderComponent, UploadedImage } from '../../../../components/image-uploader/image-uploader.component';
import { VariantFormData } from '../../../../models/product.models';
import { ProductService } from '../../../../services/product.service';


@Component({
  selector: 'app-add-variant',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploaderComponent],
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.scss'],
})
export class AddVariantComponent implements OnInit {
  productId: string = '';
  images: UploadedImage[] = [];

  formData: VariantFormData = {
    color: 'Noire',
    colorHex: '#000000',
    size: 'XL',
    otherVariant: '',
    price: 0,
    quantity: 1,
  };

  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  onImagesChange(images: UploadedImage[]): void {
    this.images = images;
    if (images.length > 0) {
      this.formData.image = images[0].file;
    }
  }

  submit(): void {
    this.isSaving = true;
    this.productService.addVariant(this.productId, this.formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/seller/products', this.productId, 'variants']);
      },
      error: () => {
        this.isSaving = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/seller/products', this.productId, 'variants']);
  }
}
