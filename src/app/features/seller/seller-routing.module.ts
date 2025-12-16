import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from '../../layouts/seller-layout/seller-layout.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { CreateArticleComponent } from './pages/my-products/create-article/create-article.component';
import { CreateLotComponent } from './pages/my-products/create-lot/create-lot.component';
import { CreateDonationComponent } from './pages/my-products/create-donation/create-donation.component';
import { ProductVariantsComponent } from './pages/my-products/product-variants/product-variants.component';
import { AddVariantComponent } from './pages/my-products/product-variants/add-variant/add-variant.component';

// import { SalesComponent } from './pages/sales/sales.component';
// import { SaleDetailComponent } from './pages/sales/sale-detail/sale-detail.component';
// import { ReservationsComponent } from './pages/reservations/reservations.component';
// import { NegotiationsComponent } from './pages/negotiations/negotiations.component';
// import { DonationsManagementComponent } from './pages/donations-management/donations-management.component';
// import { DiscountsComponent } from './pages/discounts/discounts.component';
// import { PendingCartsComponent } from './pages/pending-carts/pending-carts.component';
// import { ReviewsComponent } from './pages/reviews/reviews.component';
// import { RewardsComponent } from './pages/rewards/rewards.component';
// import { SupportComponent } from './pages/support/support.component';

// Shared pages (réutilisés depuis shared)
import { PromotionComponent } from './pages/my-products/promotion/promotion.component';
import { FaqComponent } from '../buyer/pages/faq/faq.component';
import { SettingsComponent } from '../buyer/pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Mes produits (page principale + sous-pages)
      {
        path: 'products',
        children: [
          { path: '', component: MyProductsComponent },
          { path: 'create/article', component: CreateArticleComponent },
          { path: 'create/lot', component: CreateLotComponent },
          { path: 'create/donation', component: CreateDonationComponent },
          { path: ':id/variants', component: ProductVariantsComponent },
          { path: ':id/variants/add', component: AddVariantComponent },
        ],
      },

      // Promotion
      { path: 'promotion', component: PromotionComponent },

      // Gestion du stock
      // { path: 'stock', component: StockComponent },

      // Gestion des ventes
      // {
      //   path: 'sales',
      //   children: [
      //     { path: '', component: SalesComponent },
      //     { path: ':id', component: SaleDetailComponent },
      //   ],
      // },

      // Gestion des réservations
      // { path: 'reservations', component: ReservationsComponent },

      // Gestion des négociations
      // { path: 'negotiations', component: NegotiationsComponent },

      // Gestion des dons
      // { path: 'donations', component: DonationsManagementComponent },

      // Gestion des réductions
      // { path: 'discounts', component: DiscountsComponent },

      // Paniers en attente
      // { path: 'pending-carts', component: PendingCartsComponent },

      // Notes et avis
      // { path: 'reviews', component: ReviewsComponent },

      // Mes récompenses
      // { path: 'rewards', component: RewardsComponent },

      // Supports (partagés)
      { path: 'settings', component: SettingsComponent },
      { path: 'faq', component: FaqComponent },
      // { path: 'support', component: SupportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
