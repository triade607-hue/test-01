import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLayoutComponent } from '../../layouts/buyer-layout/buyer-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { NegotiationsComponent } from './pages/negotiations/negotiations.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderTrackingComponent } from './pages/orders/order-tracking/order-tracking.component';
import { DeliveryComponent } from './pages/checkout/delivery/delivery.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';
import { ConfirmationComponent } from './pages/checkout/confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'negotiations', component: NegotiationsComponent },
      { path: 'purchases', component: PurchasesComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id/tracking', component: OrderTrackingComponent },
      { path: 'checkout/delivery', component: DeliveryComponent },
      { path: 'checkout/payment', component: PaymentComponent },
      { path: 'checkout/confirmation', component: ConfirmationComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
