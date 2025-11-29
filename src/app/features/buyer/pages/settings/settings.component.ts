import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NotificationOption {
  id: string;
  label: string;
  checked: boolean;
}

interface DeleteReason {
  id: string;
  label: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  // Devise
  currencies = ['USD', 'EUR', 'CAD', 'FCFA', 'GBP'];
  selectedCurrency = 'USD';

  // Langue
  languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];
  selectedLanguage = 'fr';

  // Pays/Région
  countries = [
    { code: 'FR', label: 'France' },
    { code: 'CA', label: 'Canada' },
    { code: 'BE', label: 'Belgique' },
    { code: 'CH', label: 'Suisse' },
    { code: 'SN', label: 'Sénégal' },
    { code: 'CI', label: "Côte d'Ivoire" },
  ];
  selectedCountry = 'FR';

  // Notifications
  notificationsEnabled = true;
  emailNotificationsEnabled = true;
  notificationOptions: NotificationOption[] = [
    { id: 'new_message', label: 'Nouveaux messages', checked: false },
    { id: 'order_status', label: 'Statut de commande', checked: false },
    { id: 'promotions', label: 'Promotions et offres', checked: false },
    {
      id: 'price_drop',
      label: 'Baisse de prix sur les favoris',
      checked: false,
    },
    {
      id: 'new_products',
      label: 'Nouveaux produits des vendeurs suivis',
      checked: false,
    },
  ];

  // À propos
  aboutText = `Occaverse est une marketplace innovante qui connecte acheteurs et vendeurs dans un environnement sécurisé et convivial.

Notre mission est de faciliter les échanges de produits d'occasion tout en garantissant la sécurité des transactions grâce à notre système de contrôle de conformité.

Fondée en 2024, Occaverse s'engage à offrir une expérience utilisateur exceptionnelle avec des fonctionnalités avancées comme la négociation, les réservations et la protection des achats.

Notre équipe travaille chaque jour pour améliorer la plateforme et répondre aux besoins de notre communauté grandissante.`;

  // Suppression de compte
  deleteReasons: DeleteReason[] = [
    {
      id: 'no_use',
      label:
        "J'aime bien Occaverse, mais je ne souhaite plus continuer à l'utiliser",
    },
    {
      id: 'alternative',
      label: "J'ai trouvé une alternative qui me répond mieux à mes besoins",
    },
    { id: 'expenses', label: 'Je souhaite limiter mes dépenses' },
    {
      id: 'missing_features',
      label:
        'Je ne trouve pas les fonctionnalités ou services que je recherche',
    },
    {
      id: 'bad_experience',
      label: "J'ai eu une mauvaise expérience avec le service client",
    },
    { id: 'other', label: 'Autres raisons...' },
  ];
  selectedDeleteReason = '';
  otherReason = '';

  // Actions
  saveCurrency(): void {
    console.log('Devise enregistrée:', this.selectedCurrency);
  }

  saveLanguage(): void {
    console.log('Langue enregistrée:', this.selectedLanguage);
  }

  saveCountry(): void {
    console.log('Pays enregistré:', this.selectedCountry);
  }

  saveNotifications(): void {
    console.log('Notifications enregistrées:', {
      enabled: this.notificationsEnabled,
      email: this.emailNotificationsEnabled,
      options: this.notificationOptions,
    });
  }

  submitDeleteRequest(): void {
    if (!this.selectedDeleteReason) return;

    console.log('Demande de suppression:', {
      reason: this.selectedDeleteReason,
      otherReason: this.otherReason,
    });
  }
}
