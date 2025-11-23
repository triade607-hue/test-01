import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPaymentMethodModalComponent } from '../../components/add-payment-method-modal/add-payment-method-modal.component';
import { PasswordVerificationModalComponent } from '../../components/password-verification-modal/password-verification-modal.component';
import { Router } from '@angular/router';

interface PaymentMethod {
  id: string;
  type: string;
  accountName?: string;
  email?: string;
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  isPrimary: boolean;
  logo: string;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddPaymentMethodModalComponent,
    PasswordVerificationModalComponent,
  ],
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  showAddModal = false;
  showPasswordModal = false;
  passwordAction: 'access' | 'delete' = 'access';
  methodToDelete: string | null = null;
  isPageUnlocked = false;

  isCollapsed = false;
  currentSlide = 0;
  selectedMethodId: string | null = null;

  paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'paypal',
      accountName: 'Adrien RABIOT',
      email: 'abc@gmail.com',
      isPrimary: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    },
    {
      id: '2',
      type: 'paypal',
      accountName: 'John DOE',
      email: 'john@example.com',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    },
    {
      id: '3',
      type: 'stripe',
      cardholderName: 'Marie DUPONT',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    },
    {
      id: '4',
      type: 'paypal',
      accountName: 'Test USER',
      email: 'test@test.com',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // La page nécessite une vérification par mot de passe à l'accès
    this.passwordAction = 'access';
    this.showPasswordModal = true;
  }

  get visibleMethods(): PaymentMethod[] {
    const itemsPerPage = 4;
    const start = this.currentSlide * itemsPerPage;
    return this.paymentMethods.slice(start, start + itemsPerPage);
  }

  get totalSlides(): number {
    return Math.ceil(this.paymentMethods.length / 4);
  }

  get primaryMethod(): PaymentMethod | undefined {
    return this.paymentMethods.find((m) => m.isPrimary);
  }

  get selectedMethod(): PaymentMethod | null {
    return (
      this.paymentMethods.find((m) => m.id === this.selectedMethodId) || null
    );
  }

  get actionButtonText(): string {
    if (!this.selectedMethod) return 'Valider';
    return this.selectedMethod.isPrimary
      ? 'Définir comme principale'
      : 'Valider';
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onPaymentMethodAdded(data: any): void {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: data.type,
      isPrimary: false,
      logo:
        data.type === 'paypal'
          ? 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
          : 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    };

    if (data.type === 'paypal') {
      newMethod.accountName = data.accountName;
      newMethod.email = data.email;
    } else if (data.type === 'stripe') {
      newMethod.cardholderName = data.cardholderName;
      const lastFour = data.cardNumber.replace(/\s/g, '').slice(-4);
      newMethod.cardNumber = `**** **** **** ${lastFour}`;
      newMethod.expiryDate = data.expiryDate;
    }

    this.paymentMethods.push(newMethod);
    console.log('Nouvelle méthode ajoutée:', newMethod);
    alert('Méthode de paiement ajoutée avec succès !');
  }

  selectMethod(methodId: string): void {
    this.selectedMethodId = methodId;
  }

  deleteMethod(methodId: string, event: Event): void {
    event.stopPropagation();

    // Double vérification
    if (
      !confirm('Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?')
    ) {
      return;
    }

    // Demander le mot de passe
    this.methodToDelete = methodId;
    this.passwordAction = 'delete';
    this.showPasswordModal = true;
  }

  confirmDelete(): void {
    if (!this.methodToDelete) return;

    this.paymentMethods = this.paymentMethods.filter(
      (m) => m.id !== this.methodToDelete
    );

    // Si on supprime la méthode principale, définir la première comme principale
    if (
      !this.paymentMethods.find((m) => m.isPrimary) &&
      this.paymentMethods.length > 0
    ) {
      this.paymentMethods[0].isPrimary = true;
    }

    // Reset sélection si la méthode supprimée était sélectionnée
    if (this.selectedMethodId === this.methodToDelete) {
      this.selectedMethodId = null;
    }

    this.methodToDelete = null;
    alert('Méthode de paiement supprimée avec succès !');
  }

  nextSlide(): void {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onValidate(): void {
    if (!this.selectedMethod) {
      alert('Veuillez sélectionner une méthode de paiement');
      return;
    }

    if (!this.selectedMethod.isPrimary) {
      // Définir comme principale
      this.paymentMethods.forEach((m) => (m.isPrimary = false));
      this.selectedMethod.isPrimary = true;
      alert('Méthode définie comme principale !');
    }

    // TODO: Appel API pour sauvegarder
    console.log('Validation de la méthode:', this.selectedMethod);
  }

  onPasswordVerified(password: string): void {
    // TODO: Vérifier le mot de passe avec le backend
    console.log('Mot de passe vérifié:', password);

    if (this.passwordAction === 'access') {
      // Débloquer l'accès à la page
      this.isPageUnlocked = true;
      this.showPasswordModal = false;
      // alert('Accès autorisé !');
    } else if (this.passwordAction === 'delete') {
      // Confirmer la suppression
      this.showPasswordModal = false;
      this.confirmDelete();
    }
  }

  closePasswordModal(): void {
    if (this.passwordAction === 'access' && !this.isPageUnlocked) {
      // Rediriger vers une autre page si l'utilisateur annule
      this.router.navigate(['/buyer/profile']);
      // alert('Accès refusé. Vous devez entrer votre mot de passe.');
      // TODO: Redirection
    } else {
      this.showPasswordModal = false;
      this.methodToDelete = null;
    }
  }
}
