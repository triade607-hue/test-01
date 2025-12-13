// ============================================
// TYPES & ENUMS
// ============================================

export type ActionType = 'sell' | 'donate';
export type ArticleType = 'article' | 'lot';
export type LotSource = 'new' | 'existing';
export type ProductStatus =
  | 'published'
  | 'draft'
  | 'archived'
  | 'blocked'
  | 'analyzing';
export type SaleType = 'classic' | 'donation';

// ============================================
// INTERFACES
// ============================================

export interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
  order: number;
}

export interface Variant {
  id: string;
  image?: string;
  color: string;
  colorHex: string;
  size: string;
  otherVariant?: string;
  price: number;
  quantity: number;
}

export interface LotItem {
  id: string;
  productId?: string;
  name: string;
  image: string;
  brand?: string;
  model?: string;
  description?: string;
  quantityInStock: number;
  quantityInLot: number;
  state?: string;
  isNew: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: ProductImage[];
  price: number;
  currency: string;
  quantity: number;
  category: string;
  subCategory: string;
  brand?: string;
  model?: string;
  state: string;
  defects?: string;

  // Type & Status
  articleType: ArticleType;
  saleType: SaleType;
  status: ProductStatus;

  // Options
  allowNegotiation: boolean;
  allowReservation: boolean;
  requireConfirmation: boolean;
  isPromoted: boolean;

  // Geographic
  geoZones: string[];

  // Lot specific
  lotItems?: LotItem[];

  // Variants
  variants?: Variant[];
  hasVariants: boolean;

  // Packaging
  packaging?: PackagingInfo;

  // Characteristics
  characteristics?: Characteristic[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface PackagingInfo {
  weight: number;
  weightUnit: 'kg' | 'g';
  length: number;
  width: number;
  height: number;
  dimensionUnit: 'cm' | 'm';
}

export interface Characteristic {
  id: string;
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
}

export interface SuggestedCategory {
  category: string;
  subCategory: string;
  fullPath: string;
}

// ============================================
// FORM DATA INTERFACES
// ============================================

export interface ArticleFormData {
  // Step 1: Photos & Basic Info
  images: File[];
  name: string;
  description: string;

  // Step 2: Category & Characteristics
  category: string;
  subCategory: string;
  geoZones: string[];
  characteristics: Characteristic[];

  // Step 3: Details
  brand: string;
  model: string;
  state: string;
  price: number;
  quantity: number;
  defects: string;
  packaging: PackagingInfo;

  // Step 4: Options
  allowNegotiation: boolean;
  allowReservation: boolean;
  requireConfirmation: boolean;
  isPromoted: boolean;
  status: ProductStatus;
}

export interface LotFormData {
  // Step 1: Photos & Basic Info
  images: File[];
  name: string;
  description: string;

  // Step 2: Composition
  source: LotSource;
  items: LotItem[];

  // Step 3: Options
  geoZones: string[];
  allowNegotiation: boolean;
  allowReservation: boolean;
  status: ProductStatus;
}

export interface DonationFormData {
  images: File[];
  name: string;
  description: string;
  quantity: number;
  state: string;
  packaging?: PackagingInfo;
  geoZones: string[];
  status: ProductStatus;

  // For lot donation
  isLot: boolean;
  items?: LotItem[];
}

export interface VariantFormData {
  image?: File;
  color: string;
  colorHex: string;
  size: string;
  otherVariant?: string;
  price: number;
  quantity: number;
}

// ============================================
// FILTER & PAGINATION
// ============================================

export interface ProductFilter {
  tab: 'all' | 'articles' | 'lots' | 'donations' | 'promoted';
  status?: ProductStatus;
  search?: string;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// TAB CONFIG
// ============================================

export interface ProductTab {
  id: string;
  label: string;
  count: number;
  filter: Partial<ProductFilter>;
}
