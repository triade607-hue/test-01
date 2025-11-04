import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [{ path: '', component: CartListComponent }],
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [{ path: 'checkout', component: CheckoutComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
