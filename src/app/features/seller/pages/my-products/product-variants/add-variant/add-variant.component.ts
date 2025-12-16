import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import {
  ImageUploaderComponent,
  UploadedImage,
} from '../../../../components/image-uploader/image-uploader.component';

@Component({
  selector: 'app-add-variant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.scss'],
})
export class AddVariantComponent implements OnInit {
  productId = '';
  productName = "Dénomination de l'article";

  // Form
  images: UploadedImage[] = [];
  colorName = 'Couleur Noire';
  colorCode = '#000000';
  size = 'XL';
  otherVariant = '';
  price: number | null = null;
  quantity: number | null = null;

  // Size options
  sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];

  isSaving = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
  }

  onImagesChange(images: UploadedImage[]): void {
    this.images = images;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images = [
          {
            id: Date.now().toString(),
            file,
            preview: e.target?.result as string,
            isMain: true,
            order: 0,
          },
        ];
      };
      reader.readAsDataURL(file);
    }
  }

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorCode = input.value;
    // Auto-generate color name from hex
    this.colorName = this.getColorName(this.colorCode);
  }

  getColorName(hex: string): string {
    const colors: Record<string, string> = {
      '#000000': 'Couleur Noire',
      '#FFFFFF': 'Couleur Blanche',
      '#FF0000': 'Couleur Rouge',
      '#00FF00': 'Couleur Verte',
      '#0000FF': 'Couleur Bleue',
      '#FFFF00': 'Couleur Jaune',
      '#FF00FF': 'Couleur Magenta',
      '#00FFFF': 'Couleur Cyan',
      '#808080': 'Couleur Grise',
      '#C0C0C0': 'Couleur Argent',
      '#FFD700': 'Couleur Or',
    };
    return colors[hex.toUpperCase()] || `Couleur ${hex}`;
  }

  get isFormValid(): boolean {
    return (
      this.colorCode !== '' &&
      this.size !== '' &&
      this.price !== null &&
      this.price > 0 &&
      this.quantity !== null &&
      this.quantity > 0
    );
  }

  submit(): void {
    if (!this.isFormValid) return;

    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/seller/products', this.productId, 'variants']);
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/seller/products', this.productId, 'variants']);
  }
}
