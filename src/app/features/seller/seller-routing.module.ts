import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from '../../layouts/seller-layout/seller-layout.component';
import { SettingsComponent } from '../buyer/pages/settings/settings.component';
import { RewardsComponent } from '../buyer/pages/rewards/rewards.component';
import { FaqComponent } from '../buyer/pages/faq/faq.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { CreateArticleComponent } from './pages/my-products/create-article/create-article.component';
import { CreateLotComponent } from './pages/my-products/create-lot/create-lot.component';
import { CreateDonationComponent } from './pages/my-products/create-donation/create-donation.component';
import { AddVariantComponent } from './pages/my-products/product-variants/add-variant/add-variant.component';
import { ProductVariantsComponent } from './pages/my-products/product-variants/product-variants.component';

// Pages


const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
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

      // // Gestion du stock
      // { path: 'stock', component: StockComponent },

      // // Gestion des ventes
      // {
      //   path: 'sales',
      //   children: [
      //     { path: '', component: SalesComponent },
      //     { path: ':id', component: SaleDetailComponent },
      //   ],
      // },

      // // Gestion des réservations
      // { path: 'reservations', component: ReservationsComponent },

      // // Gestion des négociations
      // { path: 'negotiations', component: NegotiationsComponent },

      // // Gestion des dons
      // { path: 'donations', component: DonationsManagementComponent },

      // // Gestion des réductions
      // { path: 'discounts', component: DiscountsComponent },

      // // Paniers en attente
      // { path: 'pending-carts', component: PendingCartsComponent },

      // // Notes et avis
      // { path: 'reviews', component: ReviewsComponent },

      // Mes récompenses
      { path: 'rewards', component: RewardsComponent },

      // Supports (partagés)
      { path: 'settings', component: SettingsComponent },
      { path: 'faq', component: FaqComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
