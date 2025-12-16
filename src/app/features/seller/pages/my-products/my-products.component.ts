import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  Product,
  ProductFilter,
  ProductTab,
  ActionType,
  ArticleType,
  LotSource,
} from '../../models/product.models';
import { ProductListItemComponent } from '../../components/product-list-item/product-list-item.component';
import { SellOrDonateModalComponent } from '../../components/modals/sell-or-donate-modal/sell-or-donate-modal.component';
import { ArticleTypeModalComponent } from '../../components/modals/article-type-modal/article-type-modal.component';
import { LotSourceModalComponent } from '../../components/modals/lot-source-modal/lot-source-modal.component';
import { StockModalComponent } from '../../components/modals/stock-modal/stock-modal.component';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductListItemComponent,
    SellOrDonateModalComponent,
    ArticleTypeModalComponent,
    LotSourceModalComponent,
    StockModalComponent,
  ],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {
  // Data
  products: Product[] = [];
  tabs: ProductTab[] = [];
  activeTabId = 'all';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;

  // Selection
  selectedProductIds: Set<string> = new Set();

  // Filters
  isFilterOpen = false;

  // Loading
  isLoading = false;

  // Modals state
  showSellOrDonateModal = false;
  showArticleTypeModal = false;
  showLotSourceModal = false;
  showStockModal = false;

  // Stock modal data
  stockModalProduct: Product | null = null;

  // Creation flow state
  selectedAction: ActionType = 'sell';
  selectedArticleType: ArticleType = 'article';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.tabs = this.productService.tabs;
    this.loadProducts();
  }

  // ============================================
  // DATA LOADING
  // ============================================

  loadProducts(): void {
    this.isLoading = true;
    const filter: ProductFilter = {
      tab: this.activeTabId as ProductFilter['tab'],
    };

    this.productService
      .getProducts(filter, this.currentPage, this.pageSize)
      .subscribe({
        next: (result) => {
          this.products = result.items;
          this.totalPages = result.totalPages;
          this.totalItems = result.total;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  // ============================================
  // TABS
  // ============================================

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    this.currentPage = 1;
    this.selectedProductIds.clear();
    this.loadProducts();
  }

  // ============================================
  // SELECTION
  // ============================================

  toggleProductSelection(productId: string): void {
    if (this.selectedProductIds.has(productId)) {
      this.selectedProductIds.delete(productId);
    } else {
      this.selectedProductIds.add(productId);
    }
  }

  isProductSelected(productId: string): boolean {
    return this.selectedProductIds.has(productId);
  }

  // ============================================
  // PAGINATION
  // ============================================

  get pages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  // ============================================
  // CREATION FLOW
  // ============================================

  openCreateModal(): void {
    this.showSellOrDonateModal = true;
  }

  onSellOrDonateSelected(action: ActionType): void {
    this.selectedAction = action;
    this.showSellOrDonateModal = false;
    this.showArticleTypeModal = true;
  }

  onArticleTypeSelected(type: ArticleType): void {
    this.selectedArticleType = type;
    this.showArticleTypeModal = false;

    if (type === 'lot' && this.selectedAction === 'sell') {
      // Pour un lot en vente, demander la source
      this.showLotSourceModal = true;
    } else {
      // Navigation directe
      this.navigateToCreation();
    }
  }

  onLotSourceSelected(source: LotSource): void {
    this.showLotSourceModal = false;
    this.navigateToCreation(source);
  }

  onLotSourceBack(): void {
    this.showLotSourceModal = false;
    this.showArticleTypeModal = true;
  }

  private navigateToCreation(lotSource?: LotSource): void {
    if (this.selectedAction === 'donate') {
      this.router.navigate(['/seller/products/create/donation'], {
        queryParams: { type: this.selectedArticleType },
      });
    } else if (this.selectedArticleType === 'lot') {
      this.router.navigate(['/seller/products/create/lot'], {
        queryParams: { source: lotSource },
      });
    } else {
      this.router.navigate(['/seller/products/create/article']);
    }
  }

  closeAllModals(): void {
    this.showSellOrDonateModal = false;
    this.showArticleTypeModal = false;
    this.showLotSourceModal = false;
  }

  // ============================================
  // PRODUCT ACTIONS
  // ============================================

  onViewProduct(product: Product): void {
    // Rediriger vers la page détail du produit (buyer side) ou modal preview
    window.open(`/product/${product.id}`, '_blank');
  }

  onEditProduct(product: Product): void {
    // Rediriger vers la page d'édition selon le type
    if (product.saleType === 'donation') {
      this.router.navigate(['/seller/products/create/donation'], {
        queryParams: { edit: product.id, type: product.articleType },
      });
    } else if (product.articleType === 'lot') {
      this.router.navigate(['/seller/products/create/lot'], {
        queryParams: { edit: product.id },
      });
    } else {
      this.router.navigate(['/seller/products/create/article'], {
        queryParams: { edit: product.id },
      });
    }
  }

  onPromoteProduct(product: Product): void {
    // Rediriger vers la page de promotion
    this.router.navigate(['/seller/promotion'], {
      queryParams: { productId: product.id },
    });
  }

  onManageStock(product: Product): void {
    // Ouvrir le modal de gestion de stock
    this.stockModalProduct = product;
    this.showStockModal = true;
  }

  onStockModalClose(): void {
    this.showStockModal = false;
    this.stockModalProduct = null;
  }

  onStockSave(newQuantity: number): void {
    if (this.stockModalProduct) {
      // TODO: Call API to update stock
      console.log(
        'Updating stock for',
        this.stockModalProduct.id,
        'to',
        newQuantity
      );
      // Update local data
      const product = this.products.find(
        (p) => p.id === this.stockModalProduct?.id
      );
      if (product) {
        product.quantity = newQuantity;
      }
    }
    this.onStockModalClose();
  }

  onEditImages(product: Product): void {
    // Rediriger vers la page d'édition des images
    if (product.articleType === 'lot') {
      this.router.navigate(['/seller/products/create/lot'], {
        queryParams: { edit: product.id, step: 1 },
      });
    } else {
      this.router.navigate(['/seller/products/create/article'], {
        queryParams: { edit: product.id, step: 1 },
      });
    }
  }

  onManageVariants(product: Product): void {
    // Rediriger vers la gestion des variantes
    this.router.navigate(['/seller/products', product.id, 'variants']);
  }

  onDeleteProduct(product: Product): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.productService.deleteProduct(product.id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  // ============================================
  // FILTERS
  // ============================================

  toggleFilters(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
