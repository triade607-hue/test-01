// src/app/layouts/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterNewsletterComponent } from './footer-newsletter/footer-newsletter.component';
import { FooterCopyrightComponent } from './footer-copyright/footer-copyright.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FooterNewsletterComponent, FooterCopyrightComponent],
  template: `
    <footer class="mt-auto">
      <!-- Newsletter + Links Section -->
      <app-footer-newsletter></app-footer-newsletter>

      <!-- Copyright Bar -->
      <app-footer-copyright></app-footer-copyright>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
