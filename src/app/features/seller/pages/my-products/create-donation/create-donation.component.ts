import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StepperComponent,
  StepConfig,
} from '../../../components/stepper/stepper.component';
import {
  ImageUploaderComponent,
  UploadedImage,
} from '../../../components/image-uploader/image-uploader.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-create-donation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepperComponent,
    ImageUploaderComponent,
  ],
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss'],
})
export class CreateDonationComponent implements OnInit {
  currentStep = 1;
  donationType: 'article' | 'lot' = 'article';

  // Steps dynamiques selon le type
  get steps(): StepConfig[] {
    if (this.donationType === 'article') {
      return [
        { id: 1, label: 'Que', sublabel: 'donnez-vous ?' },
        { id: 2, label: 'Caractéristiques' },
        { id: 3, label: 'Options', sublabel: 'et publications' },
      ];
    }
    return [
      { id: 1, label: 'Que', sublabel: 'donnez-vous ?' },
      { id: 2, label: 'Composition du lot' },
      { id: 3, label: 'Options', sublabel: 'et publications' },
    ];
  }

  // Step 1 - Basic info
  images: UploadedImage[] = [];
  name = '';
  description = '';

  // Step 2 - Caractéristiques (article) ou composition (lot)
  category = '';
  subCategory = '';
  geoZones: string[] = ['France', 'Canada', 'Bénin'];
  state = '';
  brand = '';
  model = '';
  quantity = 1;
  defects = '';

  // Lot specific
  lotItems: any[] = [];
  showAddItemForm = false;
  currentItem = this.getEmptyItem();
  currentItemImages: UploadedImage[] = [];

  // Step 3 - Options
  coverShippingCosts = false;
  coverServiceFees = false;
  requireConfirmation = false;
  status = 'published';

  // Data
  productStates: string[] = [];
  categories: { id: string; name: string }[] = [];
  subCategories: { id: string; name: string }[] = [];

  // Loading
  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['type']) {
        this.donationType = params['type'];
      }
    });
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
    this.subCategory = '';
  }

  onImagesChange(images: UploadedImage[]): void {
    this.images = images;
  }

  // Lot methods
  getEmptyItem(): any {
    return {
      id: Date.now().toString(),
      name: '',
      brand: '',
      model: '',
      description: '',
      quantity: 1,
      quantityInLot: 1,
      state: '',
    };
  }

  onItemImagesChange(images: UploadedImage[]): void {
    this.currentItemImages = images;
    if (images.length > 0) {
      this.currentItem.image = images[0].preview;
    }
  }

  openAddItemForm(): void {
    this.currentItem = this.getEmptyItem();
    this.currentItemImages = [];
    this.showAddItemForm = true;
  }

  closeAddItemForm(): void {
    this.showAddItemForm = false;
  }

  addItemToLot(): void {
    if (this.currentItem.name && this.currentItem.quantityInLot > 0) {
      this.lotItems.push({ ...this.currentItem });
      this.showAddItemForm = false;
      this.currentItem = this.getEmptyItem();
      this.currentItemImages = [];
    }
  }

  removeItemFromLot(itemId: string): void {
    this.lotItems = this.lotItems.filter((item) => item.id !== itemId);
  }

  // Navigation
  nextStep(): void {
    if (this.currentStep < 3) {
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

  submit(): void {
    this.isSaving = true;

    const donationData = {
      type: this.donationType,
      images: this.images.map((img) => img.file),
      name: this.name,
      description: this.description,
      category: this.category,
      subCategory: this.subCategory,
      geoZones: this.geoZones,
      state: this.state,
      brand: this.brand,
      model: this.model,
      quantity: this.quantity,
      defects: this.defects,
      lotItems: this.lotItems,
      coverShippingCosts: this.coverShippingCosts,
      coverServiceFees: this.coverServiceFees,
      requireConfirmation: this.requireConfirmation,
      status: this.status,
      isDonation: true,
      price: 0,
    };

    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/seller/products']);
    }, 1000);
  }

  // Validation
  get isStep1Valid(): boolean {
    return this.images.length >= 1 && !!this.name;
  }

  get isStep2Valid(): boolean {
    if (this.donationType === 'article') {
      return !!this.category && !!this.state && this.quantity > 0;
    }
    return this.lotItems.length >= 2;
  }

  get totalItemsInLot(): number {
    return this.lotItems.reduce(
      (sum: number, item: any) => sum + item.quantityInLot,
      0
    );
  }
}
