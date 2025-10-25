// src/app/layouts/user-layout/user-layout.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterCopyrightComponent } from '../components/footer/footer-copyright/footer-copyright.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterCopyrightComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-header></app-header>

      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <app-footer-copyright></app-footer-copyright>
    </div>
  `,
})
export class UserLayoutComponent {}
