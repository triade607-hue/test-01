import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';
import { FavoritesLayoutComponent } from '../../layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesLayoutComponent,
    children: [{ path: '', component: FavoritesListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
