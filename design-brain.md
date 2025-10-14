# 🧬 Design Brain – X Marketplace

## 🎨 1. Visual Identity

### Color Palette

#### Primary Color (Blue)
```css
primary-50:  #E6F4FA
primary-100: #CCE9F5
primary-200: #99D3EB
primary-300: #66BDE1
primary-400: #339AD7
primary-500: #0077B6  /* Primary brand color */
primary-600: #005F92
primary-700: #00476E
primary-800: #002F49
primary-900: #001825
```

#### Neutral Colors (Grays)
```css
gray-50:  #F9FAFB
gray-100: #F3F4F6
gray-200: #E5E7EB
gray-300: #D1D5DB
gray-400: #9CA3AF
gray-500: #6B7280
gray-600: #4B5563
gray-700: #374151
gray-800: #1F2937
gray-900: #111827  /* Primary text */
```

#### Semantic Colors
```css
success:  #10B981  /* Green */
warning:  #F59E0B  /* Orange/Yellow */
error:    #D80027  /* Red */
info:     #3B82F6  /* Blue */
```

#### Special Gradients
```css
/* Badge Acheteur/Vendeur (Sidebar) */
badge-gradient: linear-gradient(90deg, #FDC830 0%, #F37335 100%);

/* Classe Tailwind custom */
.badge-gradient {
  background: linear-gradient(90deg, #FDC830 0%, #F37335 100%);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
}
```

```html
<!-- Badge Acheteur/Vendeur avec gradient -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FDC830] to-[#F37335]">
  Acheteur Premium
</span>

<!-- Ou avec classe custom si configurée dans Tailwind -->
<span class="badge-gradient text-xs">
  Vendeur Vérifié
</span>
```


#### Background Colors
```css
bg-gray-50:  #F9FAFB  /* Page background */
bg-white:    #FFFFFF  /* Cards and surfaces */
border-gray-200: #E5E7EB  /* Subtle borders */
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Available Weights**: 300, 400, 500, 600, 700

#### Typography Scale
```css
h1: text-2xl (24px) font-bold
h2: text-xl (20px) font-semibold
h3: text-lg (18px) font-medium
h4: text-base (16px) font-medium
body: text-sm (14px) font-normal
caption: text-xs (12px) font-normal
label: text-xs (12px) font-medium text-gray-600
```

### Spacing System
- **Card Padding**: `p-6` (24px) standard, `p-4` (16px) compact
- **Element Gaps**: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- **Section Spacing**: `space-y-4` (16px), `space-y-6` (24px), `space-y-8` (32px)
- **Form Spacing**: `mb-1.5` (6px) for labels, `space-y-4` (16px) between fields

### Border Radius
```css
DEFAULT: 0.25rem (4px)
sm:      0.125rem (2px)
md:      0.375rem (6px)
lg:      0.5rem (8px)
xl:      0.75rem (12px)
2xl:     1rem (16px)
full:    9999px (circle)
```
- Buttons: `rounded` (4px)
- Cards: `rounded` (4px) or `rounded-lg` (8px)
- Inputs: `rounded` (4px)
- Modals: `rounded-lg` (8px) or `rounded-xl` (12px)
- Avatars: `rounded` (4px) or `rounded-full`
- Badges: `rounded-full`

### Shadows
```css
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)  /* Buttons, subtle elevations */
shadow:      0 1px 3px rgba(0,0,0,0.1)   /* Cards, hover states */
shadow-md:   0 4px 6px rgba(0,0,0,0.1)   /* Dropdowns */
shadow-lg:   0 10px 15px rgba(0,0,0,0.1) /* Modals */
shadow-xl:   0 20px 25px rgba(0,0,0,0.1) /* Large modals */
```

---

## ⚙️ 2. Design Principles

### Visual Philosophy
- **Clean Functionality**: Uncluttered interface with clear information hierarchy
- **Strong Contrast**: Dark text (gray-900) on light backgrounds for maximum readability
- **Blue Accent**: Primary-500 (#0077B6) blue guides primary actions and brand identity
- **Subtle Interactions**: Refined hover states with shadow and transform effects
- **Typographic Hierarchy**: Font weights and sizes create visual depth

### UX Conventions
1. **Primary Button** = Main action (submit, create) → Blue primary-500
2. **Secondary Button** = Alternative action (cancel) → White with gray border
3. **Danger Button** = Destructive action (delete) → Red error (#D80027)
4. **Active Navigation** = Blue background with white text
5. **Hover States** = Subtle shadow increase + slight transform
6. **Status Indicators** = Color-coded badges (green=success, yellow=pending, red=error, orange=warning)

### Accessibility
- WCAG AA contrast ratios respected (minimum 4.5:1)
- Visible focus states with ring-2 ring-primary-500
- Minimum touch target sizes 36x36px
- Semantic HTML structure
- Clear labels and alt texts

---

## 🧱 3. Atomic Components (Code Complet)

### 3.1 Buttons

#### Primary Button
```typescript
// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [ngClass]="buttonClasses"
      (click)="handleClick($event)"
    >
      <lucide-angular
        *ngIf="loading"
        name="loader-2"
        class="w-4 h-4 animate-spin"
      ></lucide-angular>

      <lucide-angular
        *ngIf="icon && !loading"
        [name]="icon"
        class="w-4 h-4"
      ></lucide-angular>

      <span *ngIf="!iconOnly">
        <ng-content></ng-content>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() iconOnly = false;
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-200 shadow-sm hover:shadow';

    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
      danger: 'bg-error text-white hover:bg-red-600'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    const width = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled || this.loading ? 'opacity-50 cursor-not-allowed' : '';

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${width} ${disabledClass}`;
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
```

**Utilisation :**
```html
<!-- Primary -->
<app-button variant="primary" (clicked)="onSubmit()">Valider</app-button>

<!-- Secondary -->
<app-button variant="secondary" (clicked)="onCancel()">Annuler</app-button>

<!-- Danger -->
<app-button variant="danger" icon="trash-2" (clicked)="onDelete()">Supprimer</app-button>

<!-- Loading -->
<app-button [loading]="isSubmitting">Enregistrement...</app-button>

<!-- Icon Only -->
<app-button icon="heart" [iconOnly]="true"></app-button>
```

### 3.2 Input Field

```typescript
// input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }],
  template: `
    <div class="w-full">
      <label *ngIf="label" class="block text-xs font-medium text-gray-600 mb-1.5">
        {{ label }}
        <span *ngIf="required" class="text-error">*</span>
      </label>

      <div class="relative">
        <div *ngIf="iconLeft" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <lucide-angular [name]="iconLeft" class="w-5 h-5 text-gray-400"></lucide-angular>
        </div>

        <input
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          [(ngModel)]="value"
          (blur)="onTouched()"
          [ngClass]="inputClasses"
        />

        <div *ngIf="iconRight" class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <lucide-angular [name]="iconRight" class="w-5 h-5 text-gray-400"></lucide-angular>
        </div>
      </div>

      <p *ngIf="error" class="text-xs text-error mt-1">{{ error }}</p>
      <p *ngIf="hint && !error" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'tel' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() error = '';
  @Input() hint = '';

  value = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClasses(): string {
    const base = 'w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all';
    const leftPadding = this.iconLeft ? 'pl-10' : '';
    const rightPadding = this.iconRight ? 'pr-10' : '';
    const borderColor = this.error ? 'border-error' : 'border-gray-300';

    return `${base} ${leftPadding} ${rightPadding} ${borderColor}`;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

**Utilisation :**
```html
<app-input
  label="Email"
  type="email"
  placeholder="votre.email@exemple.com"
  iconLeft="mail"
  [required]="true"
  [(ngModel)]="email"
></app-input>

<app-input
  label="Mot de passe"
  type="password"
  iconRight="eye"
  error="Mot de passe trop court"
></app-input>
```

### 3.3 Badge

```typescript
// badge.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';

  get badgeClasses(): string {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full';

    const variants = {
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-700'
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}
```

**Utilisation :**
```html
<app-badge variant="success">Publié</app-badge>
<app-badge variant="warning">En attente</app-badge>
<app-badge variant="error">Bloqué</app-badge>
<app-badge variant="primary">Nouveau</app-badge>
```

### 3.4 Status Badge (Nouveau)

```typescript
// status-badge.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type StatusType = 'conforme' | 'non-conforme' | 'en-attente' | 'analyse' | 'bloque';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div [ngClass]="containerClasses">
      <lucide-angular
        [name]="statusConfig[status].icon"
        [ngClass]="iconClasses"
      ></lucide-angular>
      <span [ngClass]="textClasses">{{ statusConfig[status].label }}</span>
    </div>
  `
})
export class StatusBadgeComponent {
  @Input() status: StatusType = 'en-attente';
  @Input() size: 'sm' | 'md' = 'md';

  statusConfig = {
    'conforme': {
      label: 'Conforme',
      icon: 'check-circle',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    'non-conforme': {
      label: 'Non conforme',
      icon: 'x-circle',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-600'
    },
    'en-attente': {
      label: 'En attente',
      icon: 'clock',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-600'
    },
    'analyse': {
      label: 'En cours d\'analyse',
      icon: 'loader-2',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600 animate-spin'
    },
    'bloque': {
      label: 'Article bloqué',
      icon: 'lock',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-600'
    }
  };

  get containerClasses(): string {
    const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded';
    const bg = this.statusConfig[this.status].bgColor;
    return `${base} ${bg}`;
  }

  get iconClasses(): string {
    const size = this.size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const color = this.statusConfig[this.status].iconColor;
    return `${size} ${color}`;
  }

  get textClasses(): string {
    const size = this.size === 'sm' ? 'text-xs' : 'text-sm';
    const color = this.statusConfig[this.status].textColor;
    return `${size} font-medium ${color}`;
  }
}
```

**Utilisation :**
```html
<app-status-badge status="conforme"></app-status-badge>
<app-status-badge status="analyse"></app-status-badge>
<app-status-badge status="bloque"></app-status-badge>
```

### 3.5 Toggle Switch

```typescript
// toggle.component.ts
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }],
  template: `
    <label class="flex items-center gap-3 cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          class="sr-only peer"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onToggle()"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
      </div>
      <span *ngIf="label" class="text-sm text-gray-700">{{ label }}</span>
    </label>
  `
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Output() toggled = new EventEmitter<boolean>();

  checked = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  onToggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.toggled.emit(this.checked);
    }
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

**Utilisation :**
```html
<app-toggle
  label="Négociation"
  [(ngModel)]="allowNegotiation"
  (toggled)="onNegotiationToggled($event)"
></app-toggle>
```

### 3.6 Rating Stars

```typescript
// rating.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center gap-1">
      <button
        *ngFor="let star of stars; let i = index"
        type="button"
        [disabled]="readonly"
        (click)="setRating(i + 1)"
        (mouseenter)="onHover(i + 1)"
        (mouseleave)="onHover(0)"
        class="focus:outline-none transition-transform hover:scale-110"
        [class.cursor-pointer]="!readonly"
        [class.cursor-default]="readonly"
      >
        <lucide-angular
          name="star"
          [ngClass]="getStarClass(i + 1)"
        ></lucide-angular>
      </button>

      <span *ngIf="showValue" class="text-sm font-medium text-gray-600 ml-1">
        {{ value }}
      </span>
    </div>
  `
})
export class RatingComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() readonly = false;
  @Input() showValue = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() valueChange = new EventEmitter<number>();

  hoverValue = 0;
  stars: number[] = [];

  ngOnInit(): void {
    this.stars = Array(this.max).fill(0).map((_, i) => i + 1);
  }

  getStarClass(position: number): string {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    const activeValue = this.hoverValue || this.value;
    const isFilled = position <= activeValue;

    const colorClass = isFilled
      ? 'text-yellow-400 fill-yellow-400'
      : 'text-gray-300';

    return `${sizeClasses[this.size]} ${colorClass}`;
  }

  setRating(value: number): void {
    if (!this.readonly) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }

  onHover(value: number): void {
    if (!this.readonly) {
      this.hoverValue = value;
    }
  }
}
```

**Utilisation :**
```html
<!-- Read-only avec valeur -->
<app-rating [value]="4.5" [readonly]="true" [showValue]="true"></app-rating>

<!-- Interactive -->
<app-rating [(value)]="userRating" (valueChange)="onRatingChange($event)"></app-rating>

<!-- Different sizes -->
<app-rating [value]="5" size="sm" [readonly]="true"></app-rating>
<app-rating [value]="5" size="lg" [readonly]="true"></app-rating>
```

### 3.7 Color Selector

```typescript
// color-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Color {
  name: string;
  value: string;
  class: string;
}

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <label *ngIf="label" class="block text-sm font-medium text-gray-900 mb-2">
        {{ label }}: <span class="text-error">{{ selectedColor?.name }}</span>
      </label>

      <div class="flex items-center gap-2">
        <button
          *ngFor="let color of colors"
          type="button"
          (click)="selectColor(color)"
          [title]="color.name"
          [ngClass]="getColorButtonClass(color)"
          class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <span class="sr-only">{{ color.name }}</span>
        </button>
      </div>
    </div>
  `
})
export class ColorSelectorComponent {
  @Input() label = 'Couleur';
  @Input() colors: Color[] = [];
  @Input() selectedColor: Color | null = null;

  @Output() colorSelected = new EventEmitter<Color>();

  selectColor(color: Color): void {
    this.selectedColor = color;
    this.colorSelected.emit(color);
  }

  getColorButtonClass(color: Color): string {
    const isSelected = this.selectedColor?.value === color.value;
    const borderClass = isSelected ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-300';
    return `${color.class} ${borderClass}`;
  }
}
```

**Utilisation :**
```typescript
// Dans le composant parent
colors: Color[] = [
  { name: 'Blanc', value: 'white', class: 'bg-white' },
  { name: 'Gris', value: 'gray', class: 'bg-gray-400' },
  { name: 'Jaune', value: 'yellow', class: 'bg-yellow-400' },
  { name: 'Rouge', value: 'red', class: 'bg-red-600' },
  { name: 'Vert', value: 'green', class: 'bg-green-600' },
  { name: 'Noir', value: 'black', class: 'bg-gray-900' },
  { name: 'Violet', value: 'purple', class: 'bg-purple-600' },
  { name: 'Bleu', value: 'blue', class: 'bg-blue-600' }
];
```

```html
<app-color-selector
  [colors]="colors"
  [selectedColor]="selectedColor"
  (colorSelected)="onColorSelected($event)"
></app-color-selector>
```

### 3.8 Quantity Selector

```typescript
// quantity-selector.component.ts
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuantitySelectorComponent),
    multi: true
  }],
  template: `
    <div class="inline-flex items-center border border-gray-300 rounded">
      <button
        type="button"
        (click)="decrement()"
        [disabled]="quantity <= min"
        class="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <lucide-angular name="minus" class="w-4 h-4 text-gray-600"></lucide-angular>
      </button>

      <input
        type="number"
        [(ngModel)]="quantity"
        (ngModelChange)="onQuantityChange($event)"
        [min]="min"
        [max]="max"
        class="w-16 text-center border-x border-gray-300 py-2 text-sm font-medium focus:outline-none"
      />

      <button
        type="button"
        (click)="increment()"
        [disabled]="quantity >= max"
        class="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <lucide-angular name="plus" class="w-4 h-4 text-gray-600"></lucide-angular>
      </button>
    </div>
  `
})
export class QuantitySelectorComponent implements ControlValueAccessor {
  @Input() min = 1;
  @Input() max = 99;
  @Output() quantityChange = new EventEmitter<number>();

  quantity = 1;
  onChange: any = () => {};
  onTouched: any = () => {};

  increment(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.onChange(this.quantity);
      this.quantityChange.emit(this.quantity);
    }
  }

  decrement(): void {
    if (this.quantity > this.min) {
      this.quantity--;
      this.onChange(this.quantity);
      this.quantityChange.emit(this.quantity);
    }
  }

  onQuantityChange(value: number): void {
    if (value >= this.min && value <= this.max) {
      this.quantity = value;
      this.onChange(this.quantity);
      this.quantityChange.emit(this.quantity);
    }
  }

  writeValue(value: number): void {
    this.quantity = value || this.min;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
```

**Utilisation :**
```html
<app-quantity-selector
  [(ngModel)]="quantity"
  [min]="1"
  [max]="stock"
  (quantityChange)="onQuantityChange($event)"
></app-quantity-selector>
```

### 3.9 Timeline Step (Pour suivi de commande)

```typescript
// timeline-step.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type StepStatus = 'completed' | 'current' | 'upcoming';

@Component({
  selector: 'app-timeline-step',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-start gap-4">
      <!-- Icon -->
      <div [ngClass]="iconContainerClass">
        <lucide-angular
          *ngIf="status === 'completed'"
          name="check"
          class="w-5 h-5 text-white"
        ></lucide-angular>
        <lucide-angular
          *ngIf="status === 'current'"
          name="loader-2"
          class="w-5 h-5 text-primary-500 animate-spin"
        ></lucide-angular>
        <div
          *ngIf="status === 'upcoming'"
          class="w-3 h-3 rounded-full bg-gray-300"
        ></div>
      </div>

      <!-- Content -->
      <div class="flex-1 pb-8">
        <h3 [ngClass]="titleClass">{{ title }}</h3>
        <p [ngClass]="descriptionClass">{{ description }}</p>
        <p *ngIf="date" class="text-xs text-gray-500 mt-1">{{ date }}</p>
      </div>
    </div>
  `
})
export class TimelineStepComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() date = '';
  @Input() status: StepStatus = 'upcoming';

  get iconContainerClass(): string {
    const base = 'w-10 h-10 rounded-full flex items-center justify-center shrink-0';

    const statusClasses = {
      completed: 'bg-success',
      current: 'bg-primary-50 border-2 border-primary-500',
      upcoming: 'bg-gray-100 border-2 border-gray-300'
    };

    return `${base} ${statusClasses[this.status]}`;
  }

  get titleClass(): string {
    const base = 'font-medium mb-1';

    const statusClasses = {
      completed: 'text-gray-900',
      current: 'text-primary-500',
      upcoming: 'text-gray-500'
    };

    return `${base} text-sm ${statusClasses[this.status]}`;
  }

  get descriptionClass(): string {
    return this.status === 'upcoming' ? 'text-xs text-gray-400' : 'text-xs text-gray-600';
  }
}
```

**Utilisation :**
```html
<div class="relative">
  <!-- Vertical line connector -->
  <div class="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>

  <!-- Steps -->
  <app-timeline-step
    title="Préparation"
    description="Votre colis est en cours de préparation chez le vendeur."
    date="25 Janvier 2025"
    status="completed"
  ></app-timeline-step>

  <app-timeline-step
    title="Expédition"
    description="Votre colis est remis au Transporteur."
    date="25 Janvier 2025"
    status="current"
  ></app-timeline-step>

  <app-timeline-step
    title="Colis expédié"
    description="Votre colis a été bien livré."
    status="upcoming"
  ></app-timeline-step>
</div>
```

---

## 🧩 4. Complex Components (Architecture + Assembly)

### 4.1 ProductCard (Composant Complexe)

**Quand l'utiliser :** Listes de produits, grilles de produits, recommandations, wishlist

**Architecture :**
```
ProductCard/
├── ProductCardImage (image + bouton favori + badges status)
├── ProductCardVendor (avatar + nom vendeur + indicateurs)
├── ProductCardInfo (titre + métadonnées)
└── ProductCardPrice (prix + devise + rating + actions)
```

**Props du composant parent :**
```typescript
interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  showVendor?: boolean;
  showActions?: boolean;
  showStatus?: boolean; // Pour vendeur (conformité)
}
```

**Exemple d'implémentation complète :**
```html
<div class="card group cursor-pointer hover:shadow-md transition-all">
  <!-- Image Section -->
  <app-product-card-image
    [imageUrl]="product.image"
    [badges]="product.badges"
    [isFavorite]="product.isFavorite"
    (favoriteToggled)="onFavoriteToggle($event)"
  ></app-product-card-image>

  <!-- Vendor Section (si showVendor = true) -->
  <app-product-card-vendor
    *ngIf="showVendor"
    [vendor]="product.vendor"
    [isVerified]="product.vendor.isVerified"
  ></app-product-card-vendor>

  <!-- Info Section -->
  <app-product-card-info
    [title]="product.title"
    [category]="product.category"
    [stock]="product.stock"
  ></app-product-card-info>

  <!-- Price Section -->
  <app-product-card-price
    [price]="product.price"
    [currency]="product.currency"
    [rating]="product.rating"
    [showActions]="showActions"
    (addToCart)="onAddToCart($event)"
  ></app-product-card-price>

  <!-- Status Section (pour vendeur uniquement) -->
  <app-status-badge
    *ngIf="showStatus"
    [status]="product.conformityStatus"
  ></app-status-badge>
</div>
```

**Sous-composant détaillé : ProductCardPrice**
```typescript
// product-card-price.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-product-card-price',
  standalone: true,
  imports: [CommonModule, RatingComponent, ButtonComponent],
  template: `
    <div class="mt-3">
      <div class="flex items-center justify-between mb-2">
        <p class="text-lg font-bold text-primary-500">
          {{ price }}{{ currency }}
        </p>
        <app-rating
          *ngIf="rating"
          [value]="rating"
          [readonly]="true"
          [showValue]="true"
          size="sm"
        ></app-rating>
      </div>

      <app-button
        *ngIf="showActions"
        variant="primary"
        size="sm"
        icon="shopping-cart"
        [fullWidth]="true"
        (clicked)="addToCart.emit()"
      >
        Ajouter au panier
      </app-button>
    </div>
  `
})
export class ProductCardPriceComponent {
  @Input() price = 0;
  @Input() currency = '$CAD';
  @Input() rating = 0;
  @Input() showActions = true;

  @Output() addToCart = new EventEmitter<void>();
}
```

**Variantes disponibles :**
- Avec statut de conformité (pour vendeur)
- Avec badge "Nouveau", "Prix fou", "Réservé"
- Mode list vs grid
- Avec options de négociation
- Version compacte pour suggestions

---

### 4.2 CartItem (Composant Complexe)

**Quand l'utiliser :** Page panier, récapitulatif de commande

**Architecture :**
```
CartItem/
├── CartItemImage (miniature produit)
├── CartItemInfo (titre + variantes + vendeur)
├── CartItemQuantity (sélecteur de quantité)
├── CartItemPrice (prix unitaire + total)
└── CartItemActions (modifier, supprimer)
```

**Props du composant parent :**
```typescript
interface CartItemProps {
  item: CartItem;
  editable?: boolean;
  showVendor?: boolean;
  showShipping?: boolean;
}
```

**Exemple d'implémentation :**
```html
<div class="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded">
  <!-- Checkbox de sélection -->
  <input
    type="checkbox"
    [(ngModel)]="item.selected"
    class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
  />

  <!-- Image -->
  <app-cart-item-image
    [imageUrl]="item.product.image"
    [title]="item.product.title"
  ></app-cart-item-image>

  <!-- Info principale -->
  <div class="flex-1 min-w-0">
    <app-cart-item-info
      [title]="item.product.title"
      [variant1]="item.variant1"
      [variant2]="item.variant2"
      [vendor]="item.vendor"
      [conformityCheck]="item.conformityCheck"
    ></app-cart-item-info>

    <!-- Options supplémentaires -->
    <div class="flex items-center gap-4 mt-2 text-xs">
      <label class="flex items-center gap-2">
        <input type="checkbox" [(ngModel)]="item.conformityCheck" />
        <span>Contrôle de conformité</span>
      </label>
    </div>
  </div>

  <!-- Quantité -->
  <app-quantity-selector
    *ngIf="editable"
    [(ngModel)]="item.quantity"
    [max]="item.product.stock"
    (quantityChange)="onQuantityChange($event)"
  ></app-quantity-selector>

  <!-- Prix -->
  <app-cart-item-price
    [price]="item.product.price"
    [quantity]="item.quantity"
    [currency]="item.product.currency"
  ></app-cart-item-price>

  <!-- Actions -->
  <app-cart-item-actions
    *ngIf="editable"
    (remove)="onRemove()"
    (saveForLater)="onSaveForLater()"
  ></app-cart-item-actions>
</div>
```

**Sous-composants à créer :**
- `CartItemImage` : Simple image avec alt text
- `CartItemInfo` : Titre + variantes + vendeur avec badge
- `CartItemPrice` : Calcul prix × quantité
- `CartItemActions` : Boutons bookmark et trash

---

### 4.3 OrderTimeline (Composant Complexe)

**Quand l'utiliser :** Page de suivi de commande, détail de commande

**Architecture :**
```
OrderTimeline/
├── TimelineConnector (ligne verticale)
└── TimelineStep[] (liste d'étapes avec statut)
```

**Props du composant parent :**
```typescript
interface OrderTimelineProps {
  steps: TimelineStep[];
  currentStep: number;
}

interface TimelineStep {
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
}
```

**Exemple d'implémentation :**
```html
<div class="bg-white rounded border border-gray-200 p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-6">Suivi de commande</h2>

  <div class="relative">
    <!-- Ligne de connexion verticale -->
    <div class="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>

    <!-- Liste des étapes -->
    <app-timeline-step
      *ngFor="let step of steps"
      [title]="step.title"
      [description]="step.description"
      [date]="step.date"
      [status]="step.status"
    ></app-timeline-step>
  </div>

  <!-- Action buttons -->
  <div class="mt-6 pt-6 border-t border-gray-200 space-y-3">
    <app-button
      variant="primary"
      [fullWidth]="true"
      *ngIf="currentStep === steps.length"
    >
      Oui, j'ai reçu
    </app-button>

    <app-button
      variant="primary"
      [fullWidth]="true"
      *ngIf="isDelivered"
    >
      Donner une note
    </app-button>

    <app-button
      variant="secondary"
      [fullWidth]="true"
      *ngIf="isDelivered"
    >
      Je suis satisfait
    </app-button>
  </div>

  <p class="text-xs text-gray-600 text-center mt-4">
    Vous n'êtes pas satisfait de cette commande ?
    <a href="#" class="text-error font-medium hover:underline">réclamation</a>
  </p>
</div>
```

**Usage :**
```typescript
steps: TimelineStep[] = [
  {
    title: 'Préparation',
    description: 'Votre colis est en cours de préparation chez le vendeur.',
    date: '25 Janvier 2025',
    status: 'completed'
  },
  {
    title: 'Expédition',
    description: 'Votre colis est remis au Transporteur.',
    date: '25 Janvier 2025',
    status: 'current'
  },
  {
    title: 'Colis expédié',
    description: 'Votre colis a été bien livré.',
    status: 'upcoming'
  }
];
```

---

### 4.4 ChatMessage (Composant Complexe)

**Quand l'utiliser :** Messagerie entre utilisateurs, négociations

**Architecture :**
```
ChatMessage/
├── MessageBubble (bulle de message avec texte)
├── MessageTime (timestamp)
└── ProductReference (référence produit dans le message)
```

**Props du composant parent :**
```typescript
interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  productRef?: Product;
}
```

**Exemple d'implémentation :**
```html
<div [ngClass]="messageContainerClass">
  <!-- Message de l'autre utilisateur -->
  <div *ngIf="!isCurrentUser" class="flex items-start gap-3 max-w-[70%]">
    <img
      [src]="message.sender.avatar"
      [alt]="message.sender.name"
      class="w-8 h-8 rounded-full"
    />
    <div>
      <div class="bg-gray-100 rounded-lg px-4 py-2">
        <p class="text-sm text-gray-900">{{ message.content }}</p>
      </div>
      <p class="text-xs text-gray-500 mt-1">{{ message.timestamp | date:'short' }}</p>
    </div>
  </div>

  <!-- Message de l'utilisateur courant -->
  <div *ngIf="isCurrentUser" class="flex flex-col items-end max-w-[70%] ml-auto">
    <div class="bg-primary-500 rounded-lg px-4 py-2">
      <p class="text-sm text-white">{{ message.content }}</p>
    </div>
    <p class="text-xs text-gray-500 mt-1">{{ message.timestamp | date:'short' }}</p>
  </div>

  <!-- Référence produit (si présente) -->
  <app-product-reference
    *ngIf="message.productRef"
    [product]="message.productRef"
    [isCurrentUser]="isCurrentUser"
  ></app-product-reference>
</div>
```

**Sous-composant : ProductReference**
```typescript
// product-reference.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-reference',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="containerClass">
      <img
        [src]="product.image"
        [alt]="product.title"
        class="w-16 h-16 rounded object-cover"
      />
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-gray-900 line-clamp-1">
          {{ product.title }}
        </h4>
        <p class="text-lg font-bold text-primary-500">
          {{ product.price }}{{ product.currency }}
        </p>
      </div>
    </div>
  `
})
export class ProductReferenceComponent {
  @Input() product: any;
  @Input() isCurrentUser = false;

  get containerClass(): string {
    const base = 'flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 mt-2';
    const alignment = this.isCurrentUser ? 'ml-auto' : '';
    return `${base} ${alignment}`;
  }
}
```

---

### 4.5 NotificationItem (Composant Complexe)

**Quand l'utiliser :** Centre de notifications, dropdown notifications

**Architecture :**
```
NotificationItem/
├── NotificationIcon (icône selon le type)
├── NotificationContent (titre + description)
├── NotificationAction (bouton d'action si nécessaire)
└── NotificationTime (timestamp)
```

**Props du composant parent :**
```typescript
interface NotificationItemProps {
  notification: Notification;
  showAction?: boolean;
}

interface Notification {
  id: string;
  type: 'reservation' | 'negotiation' | 'order' | 'donation' | 'message';
  title: string;
  description?: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  actionLink?: string;
  product?: Product;
}
```

**Exemple d'implémentation :**
```html
<div
  class="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
  [class.bg-blue-50]="!notification.read"
>
  <!-- Icon -->
  <div [ngClass]="iconContainerClass">
    <lucide-angular
      [name]="getIconName()"
      class="w-5 h-5"
    ></lucide-angular>
  </div>

  <!-- Content -->
  <div class="flex-1 min-w-0">
    <div class="flex items-start justify-between gap-2">
      <div class="flex-1">
        <h4 class="text-sm font-medium text-gray-900">
          {{ notification.title }}
        </h4>
        <p *ngIf="notification.description" class="text-xs text-gray-600 mt-0.5">
          {{ notification.description }}
        </p>

        <!-- Product Reference (si présent) -->
        <div
          *ngIf="notification.product"
          class="flex items-center gap-2 mt-2 p-2 bg-white rounded border border-gray-200"
        >
          <img
            [src]="notification.product.image"
            [alt]="notification.product.title"
            class="w-10 h-10 rounded object-cover"
          />
          <span class="text-xs font-medium text-gray-900">
            {{ notification.product.title }}
          </span>
        </div>
      </div>

      <!-- Unread indicator -->
      <div
        *ngIf="!notification.read"
        class="w-2 h-2 bg-primary-500 rounded-full"
      ></div>
    </div>

    <div class="flex items-center justify-between mt-2">
      <p class="text-xs text-gray-500">
        {{ notification.timestamp | timeAgo }}
      </p>

      <a
        *ngIf="notification.actionLabel"
        [href]="notification.actionLink"
        class="text-xs font-medium text-primary-500 hover:underline"
      >
        {{ notification.actionLabel }}
      </a>
    </div>
  </div>
</div>
```

**Logique du composant :**
```typescript
export class NotificationItemComponent {
  @Input() notification!: Notification;

  get iconContainerClass(): string {
    const base = 'w-10 h-10 rounded-full flex items-center justify-center shrink-0';

    const typeClasses = {
      reservation: 'bg-blue-100 text-blue-600',
      negotiation: 'bg-purple-100 text-purple-600',
      order: 'bg-green-100 text-green-600',
      donation: 'bg-orange-100 text-orange-600',
      message: 'bg-gray-100 text-gray-600'
    };

    return `${base} ${typeClasses[this.notification.type]}`;
  }

  getIconName(): string {
    const icons = {
      reservation: 'calendar-check',
      negotiation: 'message-square',
      order: 'package',
      donation: 'gift',
      message: 'mail'
    };

    return icons[this.notification.type];
  }
}
```

---

### 4.6 ProductGallery (Composant Complexe)

**Quand l'utiliser :** Page détail produit

**Architecture :**
```
ProductGallery/
├── MainImage (grande image principale)
├── ThumbnailList (liste de miniatures)
└── GalleryControls (boutons précédent/suivant, zoom)
```

**Props du composant parent :**
```typescript
interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}
```

**Exemple d'implémentation :**
```html
<div class="space-y-4">
  <!-- Image principale -->
  <div class="relative bg-white rounded border border-gray-200 overflow-hidden">
    <img
      [src]="images[currentIndex]"
      [alt]="productTitle"
      class="w-full h-96 object-contain"
    />

    <!-- Contrôles de navigation -->
    <button
      *ngIf="currentIndex > 0"
      (click)="previousImage()"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
    >
      <lucide-angular name="chevron-left" class="w-5 h-5"></lucide-angular>
    </button>

    <button
      *ngIf="currentIndex < images.length - 1"
      (click)="nextImage()"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
    >
      <lucide-angular name="chevron-right" class="w-5 h-5"></lucide-angular>
    </button>

    <!-- Bookmark button -->
    <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
      <lucide-angular name="bookmark" class="w-5 h-5 text-gray-600"></lucide-angular>
    </button>
  </div>

  <!-- Miniatures -->
  <div class="grid grid-cols-5 gap-2">
    <button
      *ngFor="let image of images; let i = index"
      (click)="selectImage(i)"
      [class.ring-2]="i === currentIndex"
      [class.ring-primary-500]="i === currentIndex"
      class="aspect-square bg-white rounded border border-gray-200 overflow-hidden hover:opacity-75 transition-opacity"
    >
      <img
        [src]="image"
        [alt]="productTitle + ' - Image ' + (i + 1)"
        class="w-full h-full object-cover"
      />
    </button>
  </div>
</div>
```

---

### 4.7 CheckoutSummary (Composant Complexe)

**Quand l'utiliser :** Page panier, page checkout

**Architecture :**
```
CheckoutSummary/
├── SummaryRow[] (lignes de détail: sous-total, frais, etc.)
├── SummaryTotal (total général)
└── SummaryActions (bouton de validation)
```

**Exemple d'implémentation :**
```html
<div class="bg-gray-50 rounded border border-gray-200 p-6 sticky top-24">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">
    Récapitulatif ({{ itemCount }})
  </h3>

  <!-- Lignes de détail -->
  <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600">Sous total :</span>
      <span class="font-medium text-gray-900">{{ subtotal }}€</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600">Frais d'X :</span>
      <span class="font-medium text-gray-900">{{ fees }}€</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600">Contrôle de conformité :</span>
      <span class="font-medium text-gray-900">{{ conformityFees }}€</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600">Livraison :</span>
      <span class="font-medium text-gray-900">{{ shippingCost }}€</span>
    </div>
  </div>

  <!-- Total -->
  <div class="flex items-center justify-between mb-6">
    <span class="text-base font-semibold text-gray-900">Total :</span>
    <span class="text-2xl font-bold text-primary-500">{{ total }}€</span>
  </div>

  <!-- Actions -->
  <app-button
    variant="primary"
    [fullWidth]="true"
    size="lg"
    (clicked)="onCheckout()"
  >
    Valider mon panier ({{ itemCount }})
  </app-button>
</div>
```

---

## 📄 5. Page Patterns (Templates Complets)

### 5.1 Page Product Detail

**Composants utilisés :**
1. `Header` (layout - navigation principale)
2. `Breadcrumb` (navigation secondaire)
3. `ProductGallery` (galerie d'images)
4. `ProductInfo` (informations produit)
5. `ProductActions` (boutons d'action)
6. `ProductDescription` (description détaillée)
7. `ProductReviews` (avis clients)
8. `ProductRecommendations` (produits similaires)
9. `Footer` (layout)

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <app-header></app-header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <a href="/" class="hover:text-primary-500">Accueil</a>
      <lucide-angular name="chevron-right" class="w-4 h-4"></lucide-angular>
      <span class="text-gray-900 font-medium">{{ product.title }}</span>
    </nav>

    <!-- Bouton traduire (coin supérieur droit) -->
    <button class="absolute top-6 right-6 flex items-center gap-2 text-sm text-primary-500 hover:underline">
      <lucide-angular name="languages" class="w-4 h-4"></lucide-angular>
      <span>Traduire dans ma langue</span>
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Galerie -->
      <app-product-gallery
        [images]="product.images"
        [productTitle]="product.title"
      ></app-product-gallery>

      <!-- Informations produit -->
      <div class="space-y-6">
        <!-- En-tête -->
        <div>
          <p class="text-sm text-gray-600 mb-1">
            Catégorie > Sous-Catégorie
          </p>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            {{ product.title }}
          </h1>
          <p class="text-sm text-gray-500">
            Publié le {{ product.publishedAt | date }}
          </p>
        </div>

        <!-- Vendeur -->
        <div class="flex items-center gap-3 p-4 bg-white rounded border border-gray-200">
          <img
            [src]="product.vendor.avatar"
            [alt]="product.vendor.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ product.vendor.name }}</p>
            <div class="flex items-center gap-2 mt-1">
              <app-rating
                [value]="product.vendor.rating"
                [readonly]="true"
                size="sm"
              ></app-rating>
              <span class="text-xs text-gray-500">
                ({{ product.vendor.reviewCount }}) ·
                {{ product.vendor.soldCount }} annonces ({{ product.vendor.salesCount }} ventes)
              </span>
            </div>
          </div>
        </div>

        <!-- Prix et Stock -->
        <div class="bg-white rounded border border-gray-200 p-6">
          <div class="flex items-baseline gap-3 mb-4">
            <p class="text-3xl font-bold text-primary-500">
              {{ product.price }}€
            </p>
            <p class="text-lg text-gray-400 line-through" *ngIf="product.originalPrice">
              ≈ {{ product.originalPrice }} F
            </p>
          </div>

          <p class="text-sm text-gray-600 mb-4">
            Stock disponible : <span class="font-semibold text-gray-900">{{ product.stock }}</span>
          </p>

          <div class="flex items-center gap-2 mb-4">
            <span class="text-sm text-gray-600">Moyens de paiement accepté</span>
            <img src="/assets/paypal.svg" alt="PayPal" class="h-5" />
            <img src="/assets/visa.svg" alt="Visa" class="h-5" />
          </div>

          <!-- Badge validation -->
          <div class="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200">
            <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
              <lucide-angular name="shield-check" class="w-6 h-6 text-white"></lucide-angular>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Validation de vente</p>
              <p class="text-xs text-gray-600">
                Ce produit nécessite l'accord du vendeur pour son achat, afin d'assurer sa disponibilité.
              </p>
            </div>
          </div>
        </div>

        <!-- Sélecteurs -->
        <div class="space-y-4">
          <!-- Couleur -->
          <app-color-selector
            [colors]="availableColors"
            [(selectedColor)]="selectedColor"
          ></app-color-selector>

          <!-- Taille -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Taille :</label>
            <select class="input-field">
              <option value="xl">XL</option>
              <option value="l">L</option>
              <option value="m">M</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <app-button variant="secondary" icon="plus" (clicked)="onAddQuantity()">-</app-button>
          <app-button variant="primary" [fullWidth]="true" size="lg">
            Ajouter au panier
          </app-button>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <app-button variant="secondary" icon="message-circle" [fullWidth]="true">
            Discuter
          </app-button>
          <app-button variant="secondary" icon="repeat" [fullWidth]="true">
            Négocier
          </app-button>
          <app-button variant="secondary" icon="calendar" [fullWidth]="true">
            Réserver
          </app-button>
        </div>
      </div>
    </div>

    <!-- Tabs: Informations & Avis -->
    <div class="bg-white rounded border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            class="px-6 py-4 text-sm font-medium border-b-2 transition-colors"
            [class.border-primary-500]="activeTab === 'info'"
            [class.text-primary-500]="activeTab === 'info'"
            [class.border-transparent]="activeTab !== 'info'"
            [class.text-gray-600]="activeTab !== 'info'"
            (click)="activeTab = 'info'"
          >
            Informations supplémentaires
          </button>
          <button
            class="px-6 py-4 text-sm font-medium border-b-2 transition-colors"
            [class.border-primary-500]="activeTab === 'reviews'"
            [class.text-primary-500]="activeTab === 'reviews'"
            [class.border-transparent]="activeTab !== 'reviews'"
            [class.text-gray-600]="activeTab !== 'reviews'"
            (click)="activeTab = 'reviews'"
          >
            Avis de la clientèle
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- Info Tab -->
        <div *ngIf="activeTab === 'info'">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Description</h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ product.description }}
          </p>
          <button class="text-sm text-primary-500 font-medium hover:underline mt-2">
            lire plus
          </button>
        </div>

        <!-- Reviews Tab -->
        <div *ngIf="activeTab === 'reviews'">
          <app-product-reviews
            [reviews]="product.reviews"
            [productId]="product.id"
          ></app-product-reviews>
        </div>
      </div>
    </div>

    <!-- Autres produits du vendeur -->
    <section class="mt-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900">Autres produits du vendeur</h2>
        <a href="#" class="text-sm font-medium text-primary-500 hover:underline flex items-center gap-1">
          TOUT VOIR
          <lucide-angular name="chevron-right" class="w-4 h-4"></lucide-angular>
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <app-product-card
          *ngFor="let item of vendorProducts"
          [product]="item"
        ></app-product-card>
      </div>
    </section>

    <!-- Produits similaires -->
    <section class="mt-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900">Produits similaires</h2>
        <a href="#" class="text-sm font-medium text-primary-500 hover:underline flex items-center gap-1">
          TOUT VOIR
          <lucide-angular name="chevron-right" class="w-4 h-4"></lucide-angular>
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <app-product-card
          *ngFor="let item of similarProducts"
          [product]="item"
        ></app-product-card>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <app-footer></app-footer>
</div>
```

**Points d'attention :**
- State management pour les variantes (couleur, taille)
- Synchronisation entre galerie et sélections
- Gestion du stock en temps réel
- Lazy loading des reviews et produits recommandés

---

### 5.2 Page Cart / Checkout

**Composants utilisés :**
1. `Header`
2. `Breadcrumb`
3. `CartItem[]` (liste des articles)
4. `CheckoutSummary` (récapitulatif)
5. `Footer`

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50">
  <app-header></app-header>

  <main class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <a href="/" class="hover:text-primary-500">Accueil</a>
      <lucide-angular name="chevron-right" class="w-4 h-4"></lucide-angular>
      <span class="text-gray-900 font-medium">Votre Panier</span>
    </nav>

    <h1 class="text-2xl font-bold text-gray-900 mb-6">Votre Panier</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Liste des articles -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Groupement par vendeur -->
        <div *ngFor="let vendorGroup of cartGroupedByVendor" class="space-y-3">
          <!-- En-tête vendeur -->
          <div class="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
            <img
              [src]="vendorGroup.vendor.avatar"
              [alt]="vendorGroup.vendor.name"
              class="w-8 h-8 rounded-full"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ vendorGroup.vendor.name }}
              </p>
            </div>
            <p class="text-lg font-bold text-primary-500">
              Total: {{ vendorGroup.total }}€
            </p>
            <button class="text-sm text-primary-500 font-medium hover:underline">
              Demander remise
            </button>
          </div>

          <!-- Articles du vendeur -->
          <app-cart-item
            *ngFor="let item of vendorGroup.items"
            [item]="item"
            [editable]="true"
            (remove)="onRemoveItem(item)"
            (quantityChange)="onQuantityChange(item, $event)"
          ></app-cart-item>
        </div>

        <!-- Section récompenses X -->
        <div class="p-4 bg-white rounded border border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                <lucide-angular name="gift" class="w-6 h-6 text-orange-600"></lucide-angular>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  Dénomination du produit allant sur deux lignes mais pas plus...
                </p>
                <p class="text-xs text-orange-600 font-medium">
                  Récompense X
                </p>
              </div>
            </div>
            <button class="text-error hover:bg-red-50 p-2 rounded transition-colors">
              <lucide-angular name="trash-2" class="w-5 h-5"></lucide-angular>
            </button>
          </div>
        </div>

        <!-- Section X -->
        <div class="flex items-center gap-3 p-4 bg-white rounded border border-gray-200">
          <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">OC</span>
          </div>
          <p class="text-sm font-medium text-gray-900">X</p>
        </div>
      </div>

      <!-- Récapitulatif -->
      <div class="lg:col-span-1">
        <app-checkout-summary
          [items]="cartItems"
          [subtotal]="subtotal"
          [fees]="fees"
          [conformityFees]="conformityFees"
          [shippingCost]="shippingCost"
          [total]="total"
          (checkout)="onCheckout()"
        ></app-checkout-summary>
      </div>
    </div>

    <!-- Articles que vous pourriez aimer -->
    <section class="mt-12">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Articles que vous pourriez aimer</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <app-product-card
          *ngFor="let product of recommendations"
          [product]="product"
        ></app-product-card>
      </div>
      <div class="text-center mt-6">
        <button class="btn-secondary">Voir plus</button>
      </div>
    </section>
  </main>

  <app-footer></app-footer>
</div>
```

---

### 5.3 Page Order Tracking (Suivi de Commande)

**Composants utilisés :**
1. `Header`
2. `Sidebar` (navigation utilisateur)
3. `OrderTimeline` (chronologie de livraison)
4. `ProductCard[]` (articles de la commande)

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50 flex">
  <!-- Sidebar -->
  <app-user-sidebar></app-user-sidebar>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <!-- Banner d'information -->
    <div class="bg-blue-50 border-b border-blue-200 p-4 mb-6">
      <div class="flex items-start gap-3">
        <lucide-angular name="info" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></lucide-angular>
        <div class="flex-1">
          <p class="text-sm text-blue-900 font-medium">Bienvenue M/Mme @User</p>
          <p class="text-sm text-blue-800">
            Votre compte vous permet de gérer vos commandes, retours, remboursements...
          </p>
        </div>
        <button class="text-blue-600 hover:text-blue-800">
          <lucide-angular name="x" class="w-5 h-5"></lucide-angular>
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-600 mb-6">
      Mes achats > Commande n° SMSG52455454JKFD564 > Suivi de commande
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Timeline -->
      <div class="lg:col-span-2">
        <app-order-timeline
          [steps]="orderSteps"
          [currentStep]="currentStep"
          [isDelivered]="isDelivered"
        ></app-order-timeline>
      </div>

      <!-- Récapitulatif -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Récapitulatif (03)
          </h3>

          <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Sous total :</span>
              <span class="font-medium">752,97€</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Frais d'X :</span>
              <span class="font-medium">75,297€</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Contrôle de conformité :</span>
              <span class="font-medium">7,5297€</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Livraison :</span>
              <span class="font-medium">0€</span>
            </div>
          </div>

          <div class="flex justify-between mb-4">
            <span class="font-semibold text-gray-900">Total :</span>
            <span class="text-xl font-bold text-primary-500">1503,6€</span>
          </div>

          <div class="space-y-2">
            <p class="text-xs text-gray-600">Méthode de paiement</p>
            <select class="input-field">
              <option>Méthode de paiement</option>
            </select>
          </div>

          <app-button variant="primary" [fullWidth]="true" class="mt-6">
            Paiement
          </app-button>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

### 5.4 Page Livraison / Checkout Flow

**Composants utilisés :**
1. `Header`
2. `DeliveryMethodSelector`
3. `CartSummary`
4. `ProductCard[]`

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50">
  <app-header></app-header>

  <main class="container mx-auto px-4 py-6">
    <nav class="text-sm text-gray-600 mb-6">
      Accueil > Votre Panier > Livraison
    </nav>

    <!-- Alerte de conformité -->
    <div class="bg-red-50 border border-red-200 rounded p-4 mb-6">
      <p class="text-sm text-red-700">
        <strong>Attention.</strong> Configurez vos livraisons. Si une commande nécessite un contrôle de conformité,
        choisissez également un mode de livraison vers X.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Section livraison -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Vendeur avec conformité -->
        <div *ngFor="let vendorGroup of shippingGroups">
          <div class="flex items-center gap-3 mb-4">
            <img
              [src]="vendorGroup.vendor.avatar"
              [alt]="vendorGroup.vendor.name"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ vendorGroup.vendor.name }}
              </p>
              <p class="text-lg font-bold text-primary-500">
                {{ vendorGroup.total }}€
              </p>
            </div>
            <a href="#" class="text-sm text-primary-500 font-medium hover:underline">
              Frais de livraison
            </a>
          </div>

          <!-- Produits sans contrôle -->
          <div class="bg-white rounded border border-gray-200 p-4 mb-3">
            <h4 class="text-sm font-medium text-gray-700 mb-3">
              Produits sans contrôle de conformité (02)
            </h4>

            <div class="space-y-3">
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <lucide-angular name="truck" class="w-5 h-5 text-gray-400"></lucide-angular>
                <p class="text-sm text-gray-700 flex-1">
                  Votre adresse de livraison
                </p>
                <a href="#" class="text-sm text-primary-500 font-medium hover:underline">
                  @MonAdresseDelivraisonVersChesMoi
                </a>
              </div>

              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <lucide-angular name="package" class="w-5 h-5 text-gray-400"></lucide-angular>
                <p class="text-sm text-gray-700 flex-1">
                  Méthode de livraison
                </p>
                <div class="flex items-center gap-2">
                  <img src="/assets/mondial-relay.svg" alt="Mondial Relay" class="h-5" />
                  <span class="text-sm font-medium">Mondial Relay</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Produits avec contrôle -->
          <div class="bg-white rounded border border-gray-200 p-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">
              Produits avec contrôle de conformité (02)
            </h4>

            <div class="space-y-3">
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <lucide-angular name="truck" class="w-5 h-5 text-gray-400"></lucide-angular>
                <p class="text-sm text-gray-700 flex-1">
                  Votre adresse de livraison
                </p>
                <a href="#" class="text-sm text-primary-500 font-medium hover:underline">
                  @MonAdresseDelivraisonVersChesMoi
                </a>
              </div>

              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <lucide-angular name="package" class="w-5 h-5 text-gray-400"></lucide-angular>
                <p class="text-sm text-gray-700 flex-1">
                  Méthode de livraison
                </p>
                <div class="flex items-center gap-2">
                  <img src="/assets/mondial-relay.svg" alt="Mondial Relay" class="h-5" />
                  <span class="text-sm font-medium">Mondial Relay</span>
                </div>
              </div>

              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <lucide-angular name="map-pin" class="w-5 h-5 text-gray-400"></lucide-angular>
                <p class="text-sm text-gray-700 flex-1">
                  Méthode de livraison vers votre
                </p>
                <div class="flex items-center gap-2">
                  <img src="/assets/mondial-relay.svg" alt="Mondial Relay" class="h-5" />
                  <span class="text-sm font-medium">Mondial Relay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Récapitulatif -->
      <div class="lg:col-span-1">
        <app-checkout-summary
          [items]="cartItems"
          [subtotal]="subtotal"
          [fees]="fees"
          [total]="total"
          buttonLabel="Paiement"
          (checkout)="onProceedToPayment()"
        ></app-checkout-summary>
      </div>
    </div>

    <!-- Articles que vous pourriez aimer -->
    <section class="mt-12">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Articles que vous pourriez aimer</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <app-product-card
          *ngFor="let product of recommendations"
          [product]="product"
        ></app-product-card>
      </div>
      <button class="btn-secondary mx-auto block mt-6">Voir plus</button>
    </section>
  </main>

  <app-footer></app-footer>
</div>
```

---

### 5.5 Page Notifications

**Composants utilisés :**
1. `Header`
2. `NotificationTabs` (filtres par type)
3. `NotificationItem[]` (liste des notifications)

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50">
  <app-header></app-header>

  <main class="container mx-auto px-4 py-6">
    <nav class="text-sm text-gray-600 mb-6">
      Accueil > Notifications
    </nav>

    <h1 class="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar filtres -->
      <aside class="lg:col-span-1">
        <div class="bg-white rounded border border-gray-200">
          <button
            *ngFor="let filter of notificationFilters"
            [class.bg-primary-500]="activeFilter === filter.type"
            [class.text-white]="activeFilter === filter.type"
            [class.hover:bg-gray-50]="activeFilter !== filter.type"
            class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-b border-gray-200 last:border-b-0"
            (click)="activeFilter = filter.type"
          >
            <span>{{ filter.label }}</span>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-semibold"
              [class.bg-white]="activeFilter === filter.type"
              [class.text-primary-500]="activeFilter === filter.type"
              [class.bg-primary-100]="activeFilter !== filter.type"
              [class.text-primary-700]="activeFilter !== filter.type"
            >
              {{ filter.count }}
            </span>
          </button>
        </div>
      </aside>

      <!-- Liste notifications -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded border border-gray-200">
          <div class="border-b border-gray-200 p-4">
            <h2 class="text-lg font-semibold text-primary-500">
              {{ getActiveFilterLabel() }}
            </h2>
          </div>

          <div class="divide-y divide-gray-100">
            <app-notification-item
              *ngFor="let notification of filteredNotifications"
              [notification]="notification"
              (click)="onNotificationClick(notification)"
            ></app-notification-item>
          </div>

          <!-- Empty state -->
          <div
            *ngIf="filteredNotifications.length === 0"
            class="p-12 text-center"
          >
            <lucide-angular name="inbox" class="w-12 h-12 text-gray-300 mx-auto mb-3"></lucide-angular>
            <p class="text-sm text-gray-500">Aucune notification</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <app-footer></app-footer>
</div>
```

---

### 5.6 Page Messagerie

**Composants utilisés :**
1. `Header`
2. `ConversationList` (liste des conversations)
3. `ChatMessage[]` (messages de la conversation)
4. `MessageInput` (zone de saisie)

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50">
  <app-header></app-header>

  <main class="container mx-auto px-4 py-6">
    <nav class="text-sm text-gray-600 mb-6">
      Accueil > Messagerie
    </nav>

    <div class="bg-white rounded border border-gray-200 overflow-hidden h-[calc(100vh-200px)]">
      <div class="grid grid-cols-12 h-full">
        <!-- Liste conversations -->
        <aside class="col-span-4 border-r border-gray-200 flex flex-col">
          <!-- Search -->
          <div class="p-4 border-b border-gray-200">
            <div class="relative">
              <lucide-angular
                name="search"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              ></lucide-angular>
              <input
                type="text"
                placeholder="rechercher une conversation..."
                class="input-field pl-10"
              />
            </div>
          </div>

          <!-- Conversations list -->
          <div class="flex-1 overflow-y-auto">
            <button
              *ngFor="let conversation of conversations"
              [class.bg-primary-500]="activeConversation?.id === conversation.id"
              [class.text-white]="activeConversation?.id === conversation.id"
              class="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              (click)="selectConversation(conversation)"
            >
              <div class="relative">
                <img
                  [src]="conversation.user.avatar"
                  [alt]="conversation.user.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <span
                  *ngIf="conversation.unreadCount > 0"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-semibold rounded-full flex items-center justify-center"
                >
                  {{ conversation.unreadCount }}
                </span>
              </div>

              <div class="flex-1 min-w-0 text-left">
                <h4 class="text-sm font-medium truncate">
                  {{ conversation.user.name }}
                </h4>
                <p class="text-xs text-gray-500 truncate">
                  {{ conversation.lastMessage }}
                </p>
              </div>

              <p class="text-xs text-gray-400">
                {{ conversation.timestamp | date:'shortTime' }}
              </p>
            </button>
          </div>
        </aside>

        <!-- Chat area -->
        <div class="col-span-8 flex flex-col" *ngIf="activeConversation">
          <!-- Header -->
          <header class="p-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                [src]="activeConversation.user.avatar"
                [alt]="activeConversation.user.name"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  {{ activeConversation.user.name }}
                </h3>
                <p class="text-xs text-gray-500">
                  Last active {{ activeConversation.lastActive }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button class="btn-icon">
                <lucide-angular name="archive" class="w-5 h-5"></lucide-angular>
              </button>
              <button class="btn-icon">
                <lucide-angular name="more-vertical" class="w-5 h-5"></lucide-angular>
              </button>
            </div>
          </header>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <app-chat-message
              *ngFor="let message of activeConversation.messages"
              [message]="message"
              [isCurrentUser]="message.sender.id === currentUser.id"
            ></app-chat-message>
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-end gap-3">
              <textarea
                placeholder="entrer votre message..."
                rows="1"
                class="flex-1 px-4 py-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                [(ngModel)]="messageInput"
              ></textarea>

              <app-button
                variant="primary"
                icon="send"
                (clicked)="sendMessage()"
              >
                Envoyer
              </app-button>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          *ngIf="!activeConversation"
          class="col-span-8 flex items-center justify-center"
        >
          <div class="text-center">
            <lucide-angular name="message-circle" class="w-16 h-16 text-gray-300 mx-auto mb-4"></lucide-angular>
            <p class="text-gray-500">Sélectionnez une conversation</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

### 5.7 Dashboard Vendeur - Gestion des Ventes

**Composants utilisés :**
1. `Header`
2. `VendorSidebar`
3. `StatusBadge`
4. `OrderItem[]`

**Structure de la page :**
```html
<div class="min-h-screen bg-gray-50 flex">
  <!-- Sidebar -->
  <app-vendor-sidebar></app-vendor-sidebar>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-600 mb-6">
      Gestion des ventes > Commande n° SMSG52455454JKFD564 > Suivi de commande > Contrôle de conformité
    </nav>

    <!-- Alert -->
    <div class="bg-red-50 border border-red-200 rounded p-4 mb-6">
      <p class="text-sm text-red-700">
        @L'acheteur a refusé de poursuivre. La vente est donc annulé. Votre colis vous sera retourné.
        Vous devez payer les frais de livraison pour le retour de votre colis dans un délai de jours ouvrés
        à compter de maintenant: 00.
      </p>
    </div>

    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Contrôle de conformité</h1>
      <app-button variant="primary" icon="credit-card">
        Paiement
      </app-button>
    </div>

    <!-- Liste des produits -->
    <div class="space-y-4">
      <div
        *ngFor="let item of orderItems"
        class="bg-white rounded border border-gray-200 p-6 flex items-start gap-6"
      >
        <!-- Image -->
        <img
          [src]="item.product.image"
          [alt]="item.product.title"
          class="w-24 h-24 rounded object-cover"
        />

        <!-- Info -->
        <div class="flex-1">
          <h3 class="text-base font-medium text-gray-900 mb-2">
            {{ item.product.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-1">
            Qté: {{ item.quantity }} ·
            Variante 1: <strong>{{ item.variant1 }}</strong> ·
            Variante 2: <strong>{{ item.variant2 }}</strong>
          </p>
          <p class="text-lg font-bold text-primary-500">
            {{ item.product.price }}$CAD
          </p>
        </div>

        <!-- Status -->
        <app-status-badge [status]="item.status"></app-status-badge>

        <!-- Action -->
        <a
          href="#"
          class="text-sm text-primary-500 font-medium hover:underline whitespace-nowrap"
        >
          voir le détail<br/>du contrôle
        </a>
      </div>
    </div>
  </main>
</div>
```

---

## 🎨 6. CSS Utilities & Animations

### Custom CSS Classes

```css
/* styles/_components.css */

/* Boutons */
.btn-primary {
  @apply bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow px-4 py-2 rounded text-sm font-medium transition-all duration-200 inline-flex items-center justify-center gap-2;
}

.btn-secondary {
  @apply bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm px-4 py-2 rounded text-sm font-medium transition-all duration-200;
}

.btn-danger {
  @apply bg-error text-white hover:bg-red-600 shadow-sm hover:shadow px-4 py-2 rounded text-sm font-medium transition-all duration-200 inline-flex items-center justify-center gap-2;
}

.btn-icon {
  @apply w-9 h-9 rounded flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900;
}

/* Inputs */
.input-field {
  @apply w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all;
}

.input-label {
  @apply block text-xs font-medium text-gray-600 mb-1.5;
}

/* Cards */
.card {
  @apply bg-white rounded border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200;
}

/* Sidebar */
.sidebar-item {
  @apply flex items-center gap-3 px-3 py-2.5 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer font-medium;
}

.sidebar-item.active {
  @apply bg-primary-500 text-white hover:bg-primary-600;
}

/* Text truncate multi-line */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Animations

```css
/* styles/_animations.css */

/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Slide Up (Modals) */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Spin (Loading) */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Skeleton Loading */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

## 🎯 7. AI Generation Guidelines

### For AI Implementing Pages

Quand une IA doit implémenter une page complète:

1. **Lire la section "Page Patterns"** pour comprendre la structure globale
2. **Identifier les composants nécessaires** listés dans "Composants utilisés"
3. **Utiliser les composants atomiques** (section 3) avec leur code complet
4. **Assembler les composants complexes** (section 4) selon leur architecture
5. **Appliquer les classes CSS** définies dans les utilities
6. **Respecter la palette de couleurs** et les espacements du design system

### Checklist d'implémentation

- [ ] Tous les composants atomiques sont importés
- [ ] Les composants complexes sont correctement assemblés
- [ ] Les classes Tailwind utilisées respectent le design system
- [ ] Les transitions et animations sont appliquées
- [ ] Le responsive design est géré (sm/md/lg/xl)
- [ ] L'accessibilité est respectée (labels, alt, aria)
- [ ] Les états (hover, focus, disabled) sont définis
- [ ] Le code est syntaxiquement correct pour Angular 17+

---

## 📝 Final Notes

Ce design brain est **complet et prêt pour l'utilisation par une IA**. Il contient:

✅ **Composants atomiques** avec code complet TypeScript + HTML
✅ **Composants complexes** avec architecture et exemples d'assemblage
✅ **Patterns de pages** avec structure complète
✅ **Design system** (couleurs, typographie, espacements)
✅ **Guidelines d'implémentation** pour les IAs

**Version**: 2.0
**Last Update**: Janvier 2025
**Project**: X Marketplace
**Framework**: Angular 17+ (Standalone Components)
**Styling**: Tailwind CSS 3.4
**Icons**: Lucide Angular