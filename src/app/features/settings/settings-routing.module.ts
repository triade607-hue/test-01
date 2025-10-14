import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { AddressesComponent } from './pages/addresses/addresses.component';

const routes: Routes = [
  { path: 'account', component: AccountSettingsComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: '', redirectTo: 'account', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
