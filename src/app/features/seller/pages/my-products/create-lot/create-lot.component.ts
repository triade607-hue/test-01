import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import {
  StepperComponent,
  StepConfig,
} from '../../../components/stepper/stepper.component';
import {
  ImageUploaderComponent,
  UploadedImage,
} from '../../../components/image-uploader/image-uploader.component';

import { ProductService } from '../../../services/product.service';
import { AutocompleteInputComponent, AutocompleteSuggestion } from '../../../components/autocomplete-input/autocomplete-input.component';
import { MultiSelectComponent, MultiSelectOption } from '../../../components/multi-select/multi-select.component';
import { SearchableSelectComponent, SelectOption } from '../../../components/searchable-select/searchable-select.component';

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
    RouterModule,
    StepperComponent,
    ImageUploaderComponent,
    SearchableSelectComponent,
    MultiSelectComponent,
    AutocompleteInputComponent,
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

  // Step 1
  lotImages: UploadedImage[] = [];
  lotName = '';
  lotDescription = '';

  // Step 2
  lotItems: LotItem[] = [];
  showAddItemForm = false;
  currentItem: LotItem = this.getEmptyItem();
  currentItemImages: UploadedImage[] = [];

  // Step 3
  allowNegotiation = false;
  allowReservation = false;
  geoZones: string[] = [];
  lotPrice: number | null = null;
  status = 'published';

  // Data Options
  productSuggestions: AutocompleteSuggestion[] = [];
  countryOptions: MultiSelectOption[] = [];
  brandOptions: SelectOption[] = [];
  modelOptions: SelectOption[] = [];
  stateOptions: SelectOption[] = [];
  statusOptions: SelectOption[] = [];
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
    this.loadOptions();
    if (this.lotSource === 'existing') {
      this.loadExistingProducts();
    }
  }

  loadOptions(): void {
    this.productSuggestions = [
      {
        id: '1',
        name: 'iPhone 14 Pro Max',
        category: 'Électronique > Smartphones',
      },
      {
        id: '2',
        name: 'MacBook Pro 14"',
        category: 'Électronique > Ordinateurs',
      },
      { id: '3', name: 'AirPods Pro', category: 'Électronique > Audio' },
    ];

    this.countryOptions = [
      { value: 'FR', label: 'France', flag: '🇫🇷' },
      { value: 'CA', label: 'Canada', flag: '🇨🇦' },
      { value: 'BE', label: 'Belgique', flag: '🇧🇪' },
      { value: 'CH', label: 'Suisse', flag: '🇨🇭' },
      { value: 'BJ', label: 'Bénin', flag: '🇧🇯' },
    ];

    this.brandOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'sony', label: 'Sony' },
      { value: 'other', label: 'Autre' },
    ];

    this.modelOptions = [
      { value: 'model1', label: 'Modèle 1' },
      { value: 'model2', label: 'Modèle 2' },
    ];

    this.stateOptions = this.productService.productStates.map((s) => ({
      value: s.toLowerCase().replace(/\s+/g, '_'),
      label: s,
    }));

    this.statusOptions = [
      { value: 'published', label: 'Publié' },
      { value: 'draft', label: 'Brouillon' },
    ];
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
      image: product.images?.[0]?.url || product.image,
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
