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


@Component({
  selector: 'app-create-donation',
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
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss'],
})
export class CreateDonationComponent implements OnInit {
  currentStep = 1;
  donationType: 'article' | 'lot' = 'article';

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

  // Step 1
  images: UploadedImage[] = [];
  name = '';
  description = '';

  // Step 2 (article)
  category = '';
  subCategory = '';
  geoZones: string[] = [];
  state = '';
  brand = '';
  model = '';
  quantity = 1;
  defects = '';

  // Step 2 (lot)
  lotItems: any[] = [];
  showAddItemForm = false;
  currentItem: any = this.getEmptyItem();
  currentItemImages: UploadedImage[] = [];

  // Step 3
  coverShippingCosts = false;
  coverServiceFees = false;
  requireConfirmation = false;
  status = 'published';

  // Data Options
  productSuggestions: AutocompleteSuggestion[] = [];
  categoryOptions: SelectOption[] = [];
  subCategoryOptions: SelectOption[] = [];
  countryOptions: MultiSelectOption[] = [];
  brandOptions: SelectOption[] = [];
  modelOptions: SelectOption[] = [];
  stateOptions: SelectOption[] = [];
  defectOptions: SelectOption[] = [];
  statusOptions: SelectOption[] = [];

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
    this.loadOptions();
  }

  loadOptions(): void {
    this.productSuggestions = [
      {
        id: '1',
        name: 'iPhone 14 Pro Max',
        category: 'Électronique > Smartphones',
      },
      { id: '2', name: 'Vêtements enfant', category: 'Mode > Enfant' },
      { id: '3', name: 'Livres scolaires', category: 'Livres > Éducation' },
    ];

    this.categoryOptions = this.productService.categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));

    this.countryOptions = [
      { value: 'FR', label: 'France', flag: '🇫🇷' },
      { value: 'CA', label: 'Canada', flag: '🇨🇦' },
      { value: 'BE', label: 'Belgique', flag: '🇧🇪' },
      { value: 'CH', label: 'Suisse', flag: '🇨🇭' },
      { value: 'BJ', label: 'Bénin', flag: '🇧🇯' },
      { value: 'SN', label: 'Sénégal', flag: '🇸🇳' },
    ];

    this.brandOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'nike', label: 'Nike' },
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

    this.defectOptions = [
      { value: 'none', label: 'Aucun défaut' },
      { value: 'scratch', label: 'Rayures légères' },
      { value: 'dent', label: 'Petite bosse' },
      { value: 'other', label: 'Autre' },
    ];

    this.statusOptions = [
      { value: 'published', label: 'Publié' },
      { value: 'draft', label: 'Brouillon' },
    ];
  }

  onCategoryChange(categoryId: string): void {
    this.category = categoryId;
    const category = this.productService.categories.find(
      (c) => c.id === categoryId
    );
    this.subCategoryOptions =
      category?.subCategories.map((sc) => ({
        value: sc.id,
        label: sc.name,
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
    this.lotItems = this.lotItems.filter((item: any) => item.id !== itemId);
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
    return this.images.length >= 1 && !!this.name;
  }

  get isStep2Valid(): boolean {
    if (this.donationType === 'article') {
      return (
        !!this.category &&
        !!this.state &&
        this.quantity > 0 &&
        this.geoZones.length > 0
      );
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
