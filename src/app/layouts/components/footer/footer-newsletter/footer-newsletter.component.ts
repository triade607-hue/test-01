// src/app/layouts/components/footer/footer-newsletter/footer-newsletter.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="bg-primary-900 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Newsletter Section (Left) -->
          <div>
            <h3 class="text-2xl font-bold mb-3">
              INSCRIVEZ-VOUS À NOTRE NEWSLETTER
            </h3>
            <p class="text-gray-300 text-sm mb-6">
              Ne manquez aucune réduction ni bonnes affaires. Soyez toujours au
              courant sur nos actualités.
            </p>

            <!-- Newsletter Form -->
            <div class="flex gap-3">
              <input
                type="email"
                [(ngModel)]="email"
                placeholder="Votre adresse email"
                class="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                (click)="subscribe()"
                [disabled]="!isValidEmail || isSubscribing"
                class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {{ isSubscribing ? 'Envoi...' : "S'inscrire" }}
              </button>
            </div>

            <!-- Success Message -->
            <p
              *ngIf="subscriptionSuccess"
              class="mt-3 text-sm text-green-400 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Merci ! Vous êtes maintenant inscrit à notre newsletter.
            </p>

            <!-- Error Message -->
            <p *ngIf="subscriptionError" class="mt-3 text-sm text-red-400">
              {{ subscriptionError }}
            </p>
          </div>

          <!-- Links Sections (Right) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Section 1 -->
            <div *ngFor="let section of footerSections">
              <h4 class="text-sm font-bold mb-4 uppercase">
                {{ section.title }}
              </h4>
              <ul class="space-y-2">
                <li *ngFor="let link of section.links">
                  <a
                    [routerLink]="link.url"
                    class="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Social Media & Payment Methods -->
        <div class="mt-12 pt-8 border-t border-white/10">
          <div
            class="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <!-- Social Media -->
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-400">Suivez-nous :</span>
              <a
                *ngFor="let social of socialLinks"
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                [title]="social.name"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path [attr.d]="getSocialIconPath(social.name)" />
                </svg>
              </a>
            </div>

            <!-- Payment Methods -->
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-400">Moyens de paiement :</span>
              <div class="flex items-center gap-3">
                <div
                  *ngFor="let payment of paymentMethods"
                  class="px-3 py-1.5 bg-white rounded text-xs font-semibold text-gray-900"
                >
                  {{ payment }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class FooterNewsletterComponent {
  email = '';
  isSubscribing = false;
  subscriptionSuccess = false;
  subscriptionError = '';

  footerSections: FooterSection[] = [
    {
      title: 'QUI SOMMES-NOUS?',
      links: [
        { label: 'À propos de Occaverse', url: '/about' },
        { label: 'Nos valeurs', url: '/values' },
        { label: 'Carrières', url: '/careers' },
        { label: 'Presse', url: '/press' },
      ],
    },
    {
      title: 'FAIRE DES AFFAIRES',
      links: [
        { label: 'Vendre sur Occaverse', url: '/sell' },
        { label: 'Acheter sur Occaverse', url: '/buy' },
        { label: 'Guide de vente', url: '/seller-guide' },
        { label: 'Frais et tarification', url: '/pricing' },
      ],
    },
    {
      title: 'AIDE & SUPPORT',
      links: [
        { label: "Centre d'aide", url: '/help' },
        { label: 'Service client', url: '/support' },
        { label: 'Retours et remboursements', url: '/returns' },
        { label: 'Signaler un problème', url: '/report' },
      ],
    },
    {
      title: 'OCCAVERSE PREMIUM',
      links: [
        { label: 'Compte Premium', url: '/premium' },
        { label: 'Avantages Premium', url: '/premium-benefits' },
        { label: 'Conditions de livraison', url: '/shipping' },
        { label: 'Garanties', url: '/warranty' },
      ],
    },
  ];

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/occaverse' },
    { name: 'Twitter', url: 'https://twitter.com/occaverse' },
    { name: 'Instagram', url: 'https://instagram.com/occaverse' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/occaverse' },
  ];

  paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'];

  get isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  subscribe(): void {
    if (!this.isValidEmail) {
      this.subscriptionError = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.isSubscribing = true;
    this.subscriptionError = '';
    this.subscriptionSuccess = false;

    // Simuler un appel API
    setTimeout(() => {
      this.isSubscribing = false;
      this.subscriptionSuccess = true;
      this.email = '';

      // Masquer le message après 5 secondes
      setTimeout(() => {
        this.subscriptionSuccess = false;
      }, 5000);

      // TODO: Implémenter l'appel API réel
      console.log('Email inscrit:', this.email);
    }, 1000);
  }

  getSocialIconPath(name: string): string {
    const icons: { [key: string]: string } = {
      Facebook:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      Twitter:
        'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      Instagram:
        'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
      LinkedIn:
        'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    };
    return icons[name] || '';
  }
}
