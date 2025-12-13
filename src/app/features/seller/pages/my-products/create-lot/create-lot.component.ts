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

interface LotItem {
  id: string;
  image?: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  quantity: number;
  quantityInLot: number;
  state: string;
}

@Component({
  selector: 'app-create-lot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepperComponent,
    ImageUploaderComponent,
  ],
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.scss'],
})
export class CreateLotComponent implements OnInit {
  currentStep = 1;
  lotSource: 'new' | 'existing' = 'new';

  steps: StepConfig[] = [
    { id: 1, label: 'Que', sublabel: 'vendez-vous ?' },
    { id: 2, label: 'Composition du lot' },
    { id: 3, label: 'Options', sublabel: 'et publications' },
  ];

  // Step 1 - Lot info
  lotImages: UploadedImage[] = [];
  lotName = '';
  lotDescription = '';

  // Step 2 - Lot items
  lotItems: LotItem[] = [];
  showAddItemForm = false;
  currentItem: LotItem = this.getEmptyItem();
  currentItemImages: UploadedImage[] = [];

  // Step 3 - Options
  allowNegotiation = false;
  allowReservation = false;
  geoZones: string[] = ['France', 'Canada', 'Bénin'];
  lotPrice = 0;
  status = 'published';

  // Data
  productStates: string[] = [];
  existingProducts: any[] = [];

  // Loading
  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['source']) {
        this.lotSource = params['source'];
      }
    });
    this.productStates = this.productService.productStates;

    if (this.lotSource === 'existing') {
      this.loadExistingProducts();
    }
  }

  loadExistingProducts(): void {
    this.productService
      .getProducts({ tab: 'articles' }, 1, 50)
      .subscribe((result) => {
        this.existingProducts = result.items;
      });
  }

  getEmptyItem(): LotItem {
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

  // Step 1
  onLotImagesChange(images: UploadedImage[]): void {
    this.lotImages = images;
  }

  // Step 2
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

  addExistingProduct(product: any): void {
    const item: LotItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      brand: product.brand || '',
      model: product.model || '',
      description: product.description || '',
      quantity: product.quantity,
      quantityInLot: 1,
      state: product.state || '',
    };
    this.lotItems.push(item);
  }

  isProductInLot(productId: string): boolean {
    return this.lotItems.some((item) => item.id === productId);
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

    const lotData = {
      images: this.lotImages.map((img) => img.file),
      name: this.lotName,
      description: this.lotDescription,
      items: this.lotItems,
      price: this.lotPrice,
      allowNegotiation: this.allowNegotiation,
      allowReservation: this.allowReservation,
      geoZones: this.geoZones,
      status: this.status,
    };

    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/seller/products']);
    }, 1000);
  }

  // Validation
  get isStep1Valid(): boolean {
    return this.lotImages.length >= 1 && !!this.lotName;
  }

  get isStep2Valid(): boolean {
    return this.lotItems.length >= 2;
  }

  get totalItemsInLot(): number {
    return this.lotItems.reduce((sum, item) => sum + item.quantityInLot, 0);
  }
}
