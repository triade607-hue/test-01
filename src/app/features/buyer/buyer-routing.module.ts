import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLayoutComponent } from '../../layouts/buyer-layout/buyer-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DesactivateAccountComponent } from './pages/desactivate-account/desactivate-account.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }