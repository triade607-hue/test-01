import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryIconsComponent } from './components/category-icons/category-icons.component';


@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    HomeComponent,
    HeroBannerComponent,
    CategoryIconsComponent
  ]
})
export class PublicModule { }
