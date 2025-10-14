import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { CartComponent } from './pages/cart/cart.component';

// Components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { CategoryNavComponent } from './components/category-nav/category-nav.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    // Pages
    HomeComponent,
    ProductDetailComponent,
    SearchResultsComponent,
    CartComponent,
    // Components
    ProductCardComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    ProductReviewsComponent,
    CartItemComponent,
    CheckoutSummaryComponent,
    CategoryNavComponent,
    HeroBannerComponent,
    QuickActionsComponent,
    ProductFiltersComponent
  ]
})
export class PublicModule { }
