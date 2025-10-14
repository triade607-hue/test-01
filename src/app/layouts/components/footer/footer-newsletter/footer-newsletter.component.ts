// src/app/layouts/components/footer/footer-newsletter/footer-newsletter.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer-newsletter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-100 border-t border-gray-200">
      <div class="container mx-auto px-4 py-12">
        <!-- 4 Columns Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Column 1: QUI SOMMES-NOUS? -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-4 uppercase">
              QUI SOMMES-NOUS ?
            </h4>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/about"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  A propos d'Occaverse
                </a>
              </li>
              <li>
                <a
                  routerLink="/visits"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Visites
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 2: FAIRE DE L'ARGENT AVEC NOUS -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-4 uppercase">
              FAIRE DE L'ARGENT AVEC NOUS
            </h4>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/sell"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Vendre sur Occaverse
                </a>
              </li>
              <li>
                <a
                  routerLink="/partner"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Devenir Partenaire
                </a>
              </li>
              <li>
                <a
                  routerLink="/advertise"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Faire la publicité de vos produits
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: LAISSEZ-NOUS VOUS AIDEZ -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-4 uppercase">
              LAISSEZ-NOUS VOUS AIDEZ
            </h4>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/account"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Votre compte
                </a>
              </li>
              <li>
                <a
                  routerLink="/orders"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Vos commandes
                </a>
              </li>
              <li>
                <a
                  routerLink="/shipping"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Tarifs et politique de livraison
                </a>
              </li>
              <li>
                <a
                  routerLink="/returns"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Retours et remboursements
                </a>
              </li>
              <li>
                <a
                  routerLink="/content"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Gérer votre contenu
                </a>
              </li>
              <li>
                <a
                  routerLink="/assistant"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Assistant Occaverse
                </a>
              </li>
              <li>
                <a
                  routerLink="/help"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Aide
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 4: PRODUITS DE PAIEMENT OCCAVERSE -->
          <div>
            <h4 class="text-sm font-bold text-gray-900 mb-4 uppercase">
              PRODUITS DE PAIEMENT OCCAVERSE
            </h4>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/business-card"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Carte de visite Occaverse
                </a>
              </li>
              <li>
                <a
                  routerLink="/points"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Acheter avec des points
                </a>
              </li>
              <li>
                <a
                  routerLink="/currency-converter"
                  class="text-sm text-gray-700 hover:text-primary-500 transition-colors"
                >
                  Convertisseur de devises Occaverse
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class FooterNewsletterComponent {}
