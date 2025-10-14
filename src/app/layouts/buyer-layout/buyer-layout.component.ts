import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { BuyerSidebarComponent } from '../components/buyer-sidebar/buyer-sidebar.component';

@Component({
  selector: 'app-buyer-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BuyerSidebarComponent
  ],
  templateUrl: './buyer-layout.component.html',
  styleUrls: ['./buyer-layout.component.scss']
})
export class BuyerLayoutComponent {}
