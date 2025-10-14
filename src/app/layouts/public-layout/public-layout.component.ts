import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent {}
