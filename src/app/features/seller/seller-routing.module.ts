import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from '../../layouts/seller-layout/seller-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { SalesComponent } from './pages/sales/sales.component';
import { OrderListComponent } from './pages/order-management/order-list/order-list.component';
import { ConformityCheckComponent } from './pages/order-management/conformity-check/conformity-check.component';

const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id/conformity', component: ConformityCheckComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
