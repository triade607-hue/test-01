// src/app/layouts/components/footer/footer-copyright/footer-copyright.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-copyright',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-950 border-t border-white/10">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row items-center justify-between py-4 gap-4 text-xs text-gray-400"
        >
          <!-- Left - Legal Links -->
          <div
            class="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <a routerLink="/cgu" class="hover:text-white transition-colors">
              Conditions Générales d'Utilisation
            </a>
            <span class="hidden md:inline text-gray-600">•</span>
            <a routerLink="/privacy" class="hover:text-white transition-colors">
              Politique de Confidentialité
            </a>
            <span class="hidden md:inline text-gray-600">•</span>
            <a routerLink="/cookies" class="hover:text-white transition-colors">
              Gestion des Cookies
            </a>
            <span class="hidden md:inline text-gray-600">•</span>
            <a routerLink="/legal" class="hover:text-white transition-colors">
              Mentions Légales
            </a>
          </div>

          <!-- Right - Copyright -->
          <div class="text-center md:text-right">
            <p>
              Copyright © {{ currentYear }}, Produit par
              <a
                href="https://millenium-mediart.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                Millenium Médi'art
              </a>
              &
              <a
                href="https://millenium-tech.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-400 hover:text-primary-300 transition-colors font-medium"
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
