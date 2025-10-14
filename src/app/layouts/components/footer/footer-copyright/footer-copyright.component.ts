// src/app/layouts/components/footer/footer-copyright/footer-copyright.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-copyright',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-primary-600">
      <div class="container mx-auto px-4 py-4">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4 text-white"
        >
          <!-- Legal Links (Left) -->
          <div
            class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm"
          >
            <a routerLink="/cgu" class="hover:underline transition-all">
              Conditions Générales d'Utilisation
            </a>
            <a routerLink="/cookies" class="hover:underline transition-all">
              Cookies
            </a>
          </div>

          <!-- Copyright (Right) -->
          <div class="text-sm text-center md:text-right">
            <p>
              Copyright © Jan. {{ currentYear }}, Produced
              <a
                href="https://millenium-mediart.com"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold hover:underline"
              >
                Millenium Médi'art
              </a>
              &
              <a
                href="https://millenium-tech.com"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold hover:underline"
              >
                Millenium Tech Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class FooterCopyrightComponent {
  currentYear = new Date().getFullYear();
}
