import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from '../../layouts/seller-layout/seller-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
