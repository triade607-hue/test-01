import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLayoutComponent } from '../../layouts/buyer-layout/buyer-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DesactivateAccountComponent } from './pages/desactivate-account/desactivate-account.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerLayoutComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'deactivate-account', component: DesactivateAccountComponent },
      { path: 'interests', component: InterestsComponent },
      { path: 'payment-methods', component: PaymentMethodsComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'faq', component: FaqComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }