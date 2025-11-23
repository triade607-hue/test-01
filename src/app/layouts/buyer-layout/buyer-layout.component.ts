import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { BuyerSidebarComponent } from '../components/buyer-sidebar/buyer-sidebar.component';
import { InfoBannerComponent } from '../components/info-banner/info-banner.component';
import { FooterCopyrightComponent } from '../components/footer/footer-copyright/footer-copyright.component';

@Component({
  selector: 'app-buyer-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BuyerSidebarComponent,
    InfoBannerComponent,
    FooterCopyrightComponent,
],
  templateUrl: './buyer-layout.component.html',
  styleUrls: ['./buyer-layout.component.scss'],
})
export class BuyerLayoutComponent {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
