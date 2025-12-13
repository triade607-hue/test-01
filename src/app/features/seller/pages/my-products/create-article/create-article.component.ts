import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageUploaderComponent, UploadedImage } from '../../../components/image-uploader/image-uploader.component';
import { StepperComponent, StepConfig } from '../../../components/stepper/stepper.component';
import { ArticleFormData, SuggestedCategory, Characteristic } from '../../../models/product.models';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepperComponent,
    ImageUploaderComponent,
  ],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  currentStep = 1;

  steps: StepConfig[] = [
    { id: 1, label: 'Que', sublabel: 'vendez-vous ?' },
    { id: 2, label: 'Caractéristiques' },
    { id: 3, label: 'Informations', sublabel: 'supplémentaires' },
    { id: 4, label: 'Options', sublabel: 'et publications' },
  ];

  // Form data
  images: UploadedImage[] = [];
  formData: ArticleFormData = {
    images: [],
    name: '',
    description: '',
    category: '',
    subCategory: '',
    geoZones: [],
    characteristics: [],
    brand: '',
    model: '',
    state: '',
    price: 0,
    quantity: 1,
    defects: '',
    packaging: {
      weight: 0,
      weightUnit: 'kg',
      length: 0,
      width: 0,
      height: 0,
      dimensionUnit: 'cm',
    },
    allowNegotiation: false,
    allowReservation: false,
    requireConfirmation: false,
    isPromoted: false,
    status: 'published',
  };

  // Step 2
  suggestedCategories: SuggestedCategory[] = [];
  selectedSuggestion: string | null = null;
  useManualCategory = false;
  categories: { id: string; name: string }[] = [];
  subCategories: { id: string; name: string }[] = [];

  // Characteristics (dynamic)
  characteristics: Characteristic[] = [
    { id: '1', label: 'Caractéristique 1', value: '' },
    { id: '2', label: 'Caractéristique 2', value: '' },
    { id: '3', label: 'Caractéristique 3', value: '' },
    { id: '4', label: 'Caractéristique 4', value: '' },
    { id: '5', label: 'Caractéristique 5', value: '' },
  ];

  // Step 3
  productStates: string[] = [];

  // Loading
  isLoading = false;
  isSaving = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productStates = this.productService.productStates;
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories = this.productService.categories.map((c) => ({
      id: c.id,
      name: c.name,
    }));
  }

  onCategoryChange(categoryId: string): void {
    const category = this.productService.categories.find(
      (c) => c.id === categoryId
    );
    this.subCategories =
      category?.subCategories.map((sc) => ({
        id: sc.id,
        name: sc.name,
      })) || [];
    this.formData.subCategory = '';
  }

  onImagesChange(images: UploadedImage[]): void {
    this.images = images;
    this.formData.images = images.map((img) => img.file);
  }

  // Navigation
  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  cancel(): void {
    this.router.navigate(['/seller/products']);
  }

  // Submit
  submit(): void {
    this.isSaving = true;
    this.formData.characteristics = this.characteristics.filter((c) => c.value);

    this.productService.createArticle(this.formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/seller/products']);
      },
      error: () => {
        this.isSaving = false;
      },
    });
  }

  // Validation
  get isStep1Valid(): boolean {
    return (
      this.images.length >= 4 &&
      !!this.formData.name &&
      !!this.formData.description
    );
  }

  get isStep2Valid(): boolean {
    return (
      !!this.formData.category &&
      !!this.formData.subCategory &&
      this.formData.geoZones.length > 0
    );
  }

  get isStep3Valid(): boolean {
    return (
      !!this.formData.state &&
      this.formData.price > 0 &&
      this.formData.quantity > 0
    );
  }
}
