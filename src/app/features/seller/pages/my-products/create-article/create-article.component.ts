import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { SelectOption, SearchableSelectComponent } from '../../../components/searchable-select/searchable-select.component';

interface Characteristic {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
}

@Component({
  selector: 'app-create-article',
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

  // Step 1
  images: UploadedImage[] = [];
  name = '';
  description = '';

  // Step 2
  category = '';
  subCategory = '';
  geoZones: string[] = [];
  characteristics: Characteristic[] = [];
  useManualCategory = false;
  suggestedCategories: {
    category: string;
    subCategory: string;
    fullPath: string;
  }[] = [];

  // Step 3
  brand = '';
  model = '';
  state = '';
  price: number | null = null;
  quantity = 1;
  defects = '';

  // Packaging
  showPackaging = false;
  packagingLength: number | null = null;
  packagingWidth: number | null = null;
  packagingHeight: number | null = null;
  packagingWeight = '';

  // Step 4
  allowNegotiation = false;
  allowReservation = false;
  requireConfirmation = false;
  isPromoted = false;
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
  weightOptions: SelectOption[] = [];
  statusOptions: SelectOption[] = [];

  // Loading
  isSaving = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    // Product name suggestions
    this.productSuggestions = [
      {
        id: '1',
        name: 'iPhone 14 Pro Max',
        category: 'Électronique > Smartphones',
        image:
          'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=80&h=80&fit=crop',
      },
      {
        id: '2',
        name: 'iPhone 13',
        category: 'Électronique > Smartphones',
        image:
          'https://images.unsplash.com/photo-1632661674596-df8be59a8498?w=80&h=80&fit=crop',
      },
      {
        id: '3',
        name: 'MacBook Pro 14"',
        category: 'Électronique > Ordinateurs',
        image:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop',
      },
      {
        id: '4',
        name: 'MacBook Air M2',
        category: 'Électronique > Ordinateurs',
        image:
          'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=80&h=80&fit=crop',
      },
      {
        id: '5',
        name: 'Samsung Galaxy S23',
        category: 'Électronique > Smartphones',
      },
      { id: '6', name: 'AirPods Pro', category: 'Électronique > Audio' },
      { id: '7', name: 'PlayStation 5', category: 'Électronique > Consoles' },
      { id: '8', name: 'Nike Air Max 90', category: 'Mode > Chaussures' },
    ];

    // Categories
    this.categoryOptions = this.productService.categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));

    // Countries
    this.countryOptions = [
      { value: 'FR', label: 'France', flag: '🇫🇷' },
      { value: 'CA', label: 'Canada', flag: '🇨🇦' },
      { value: 'BE', label: 'Belgique', flag: '🇧🇪' },
      { value: 'CH', label: 'Suisse', flag: '🇨🇭' },
      { value: 'BJ', label: 'Bénin', flag: '🇧🇯' },
      { value: 'SN', label: 'Sénégal', flag: '🇸🇳' },
      { value: 'CI', label: "Côte d'Ivoire", flag: '🇨🇮' },
      { value: 'MA', label: 'Maroc', flag: '🇲🇦' },
      { value: 'TN', label: 'Tunisie', flag: '🇹🇳' },
      { value: 'CM', label: 'Cameroun', flag: '🇨🇲' },
    ];

    // Brands
    this.brandOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'sony', label: 'Sony' },
      { value: 'lg', label: 'LG' },
      { value: 'huawei', label: 'Huawei' },
      { value: 'xiaomi', label: 'Xiaomi' },
      { value: 'nike', label: 'Nike' },
      { value: 'adidas', label: 'Adidas' },
      { value: 'zara', label: 'Zara' },
      { value: 'ikea', label: 'IKEA' },
      { value: 'other', label: 'Autre' },
    ];

    // Models (dynamique selon la marque)
    this.modelOptions = [
      { value: 'model1', label: 'Modèle 1' },
      { value: 'model2', label: 'Modèle 2' },
      { value: 'model3', label: 'Modèle 3' },
    ];

    // States
    this.stateOptions = this.productService.productStates.map((s) => ({
      value: s.toLowerCase().replace(/\s+/g, '_'),
      label: s,
    }));

    // Defects
    this.defectOptions = [
      { value: 'none', label: 'Aucun défaut' },
      { value: 'scratch', label: 'Rayures légères' },
      { value: 'dent', label: 'Petite bosse' },
      { value: 'color_fade', label: 'Décoloration' },
      { value: 'missing_part', label: 'Pièce manquante' },
      { value: 'functional', label: 'Défaut fonctionnel mineur' },
      { value: 'other', label: 'Autre' },
    ];

    // Weight ranges
    this.weightOptions = [
      { value: '0-0.5', label: '0 - 500g' },
      { value: '0.5-1', label: '500g - 1kg' },
      { value: '1-2', label: '1kg - 2kg' },
      { value: '2-5', label: '2kg - 5kg' },
      { value: '5-10', label: '5kg - 10kg' },
      { value: '10-20', label: '10kg - 20kg' },
      { value: '20-30', label: '20kg - 30kg' },
      { value: '30+', label: 'Plus de 30kg' },
    ];

    // Status
    this.statusOptions = [
      { value: 'published', label: 'Publié' },
      { value: 'draft', label: 'Brouillon' },
    ];
  }

  // Step 1
  onImagesChange(images: UploadedImage[]): void {
    this.images = images;
  }

  onNameChange(value: string): void {
    this.name = value;
    if (value.length >= 3) {
      this.loadSuggestedCategories();
    }
  }

  onSuggestionSelected(suggestion: AutocompleteSuggestion): void {
    this.name = suggestion.name;
    this.loadSuggestedCategories();
  }

  // Step 2
  loadSuggestedCategories(): void {
    this.productService
      .getSuggestedCategories(this.name)
      .subscribe((suggestions) => {
        this.suggestedCategories = suggestions;
      });
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
    this.loadCharacteristics();
  }

  onSubCategoryChange(subCategoryId: string): void {
    this.subCategory = subCategoryId;
    this.loadCharacteristics();
  }

  loadCharacteristics(): void {
    // Caractéristiques dynamiques selon la catégorie
    if (this.category === '1') {
      // Électronique
      this.characteristics = [
        {
          id: '1',
          label: 'RAM',
          value: '',
          options: [
            { value: '4gb', label: '4 GB' },
            { value: '8gb', label: '8 GB' },
            { value: '16gb', label: '16 GB' },
            { value: '32gb', label: '32 GB' },
          ],
        },
        {
          id: '2',
          label: 'Stockage',
          value: '',
          options: [
            { value: '64gb', label: '64 GB' },
            { value: '128gb', label: '128 GB' },
            { value: '256gb', label: '256 GB' },
            { value: '512gb', label: '512 GB' },
            { value: '1tb', label: '1 TB' },
          ],
        },
        {
          id: '3',
          label: 'Couleur',
          value: '',
          options: [
            { value: 'black', label: 'Noir' },
            { value: 'white', label: 'Blanc' },
            { value: 'silver', label: 'Argent' },
            { value: 'gold', label: 'Or' },
            { value: 'blue', label: 'Bleu' },
          ],
        },
      ];
    } else if (this.category === '2') {
      // Mode
      this.characteristics = [
        {
          id: '1',
          label: 'Taille',
          value: '',
          options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: 'xxl', label: 'XXL' },
          ],
        },
        {
          id: '2',
          label: 'Couleur',
          value: '',
          options: [
            { value: 'black', label: 'Noir' },
            { value: 'white', label: 'Blanc' },
            { value: 'blue', label: 'Bleu' },
            { value: 'red', label: 'Rouge' },
            { value: 'green', label: 'Vert' },
          ],
        },
        {
          id: '3',
          label: 'Matière',
          value: '',
          options: [
            { value: 'cotton', label: 'Coton' },
            { value: 'polyester', label: 'Polyester' },
            { value: 'leather', label: 'Cuir' },
            { value: 'wool', label: 'Laine' },
          ],
        },
      ];
    } else {
      this.characteristics = [];
    }
  }

  selectSuggestedCategory(suggestion: {
    category: string;
    subCategory: string;
  }): void {
    const cat = this.productService.categories.find(
      (c) => c.name === suggestion.category
    );
    if (cat) {
      this.category = cat.id;
      this.onCategoryChange(cat.id);
      const subCat = cat.subCategories.find(
        (sc) => sc.name === suggestion.subCategory
      );
      if (subCat) {
        this.subCategory = subCat.id;
      }
    }
    this.useManualCategory = false;
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

  submit(): void {
    this.isSaving = true;

    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/seller/products']);
    }, 1000);
  }

  // Validation
  get isStep1Valid(): boolean {
    return this.images.length >= 4 && !!this.name && !!this.description;
  }

  get isStep2Valid(): boolean {
    return !!this.category && !!this.subCategory && this.geoZones.length > 0;
  }

  get isStep3Valid(): boolean {
    return (
      !!this.state && this.price !== null && this.price > 0 && this.quantity > 0
    );
  }
}
