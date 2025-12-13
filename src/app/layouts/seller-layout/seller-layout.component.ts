import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SellerSidebarComponent } from '../components/seller-sidebar/seller-sidebar.component';
import { FooterCopyrightComponent } from '../components/footer/footer-copyright/footer-copyright.component';

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SellerSidebarComponent,
    FooterCopyrightComponent,
  ],
  templateUrl: './seller-layout.component.html',
  styleUrls: ['./seller-layout.component.scss'],
})
export class SellerLayoutComponent {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
