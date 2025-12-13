import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLayoutComponent } from '../../layouts/buyer-layout/buyer-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DesactivateAccountComponent } from './pages/profile/desactivate-account/desactivate-account.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { FaqComponent } from './pages/faq/faq.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DonationRequestsComponent } from './pages/donation-requests/donation-requests.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { ScheduledSearchesComponent } from './pages/scheduled-searches/scheduled-searches.component';
import { ComplianceReportComponent } from './pages/purchases/compliance-report/compliance-report.component';
import { PurchaseDetailComponent } from './pages/purchases/purchase-detail/purchase-detail.component';
import { PurchaseTrackingComponent } from './pages/purchases/purchase-tracking/purchase-tracking.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { VendorRatingComponent } from './pages/purchases/vendor-rating/vendor-rating.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerLayoutComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        children: [
          { path: '', component: ProfileComponent },
          {
            path: 'deactivate-account',
            component: DesactivateAccountComponent,
          },
        ],
      },
      {
        path: 'purchases',
        children: [
          { path: '', component: PurchasesComponent },
          { path: ':id', component: PurchaseDetailComponent },
          { path: ':id/tracking', component: PurchaseTrackingComponent },
          {
            path: ':id/tracking/compliance',
            component: ComplianceReportComponent,
          },
          { path: ':id/tracking/rating', component: VendorRatingComponent },
        ],
      },
      { path: 'deactivate-account', component: DesactivateAccountComponent },
      { path: 'interests', component: InterestsComponent },
      { path: 'payment-methods', component: PaymentMethodsComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'donations', component: DonationRequestsComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'scheduled-searches', component: ScheduledSearchesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
