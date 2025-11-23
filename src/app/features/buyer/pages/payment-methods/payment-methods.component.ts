import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPaymentMethodModalComponent } from '../../components/add-payment-method-modal/add-payment-method-modal.component';

interface PaymentMethod {
  id: string;
  type: string;
  accountName?: string;
  email?: string;
  cardholderName?: string;
  cardNumber?: string; // Masqué sauf 4 derniers chiffres
  expiryDate?: string;
  isPrimary: boolean;
  logo: string;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPaymentMethodModalComponent],
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent {
  showAddModal = false;
  isCollapsed = false;
  currentSlide = 0;

  paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'paypal',
      accountName: 'Adrien RABIOT',
      email: 'abc@gmail.com',
      isPrimary: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
    },
    {
      id: '2',
      type: 'paypal',
      accountName: 'John DOE',
      email: 'john@example.com',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
    },
    {
      id: '3',
      type: 'stripe',
      cardholderName: 'Marie DUPONT',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg'
    },
    {
      id: '4',
      type: 'paypal',
      accountName: 'Test USER',
      email: 'test@test.com',
      isPrimary: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
    }
  ];

  get visibleMethods(): PaymentMethod[] {
    const itemsPerPage = 4;
    const start = this.currentSlide * itemsPerPage;
    return this.paymentMethods.slice(start, start + itemsPerPage);
  }

  get totalSlides(): number {
    return Math.ceil(this.paymentMethods.length / 4);
  }

  get primaryMethod(): PaymentMethod | undefined {
    return this.paymentMethods.find(m => m.isPrimary);
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
      logo: data.type === 'paypal'
        ? 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg'
    };

    if (data.type === 'paypal') {
      newMethod.accountName = data.accountName;
      newMethod.email = data.email;
    } else if (data.type === 'stripe') {
      newMethod.cardholderName = data.cardholderName;
      // Masquer le numéro de carte
      const lastFour = data.cardNumber.replace(/\s/g, '').slice(-4);
      newMethod.cardNumber = `**** **** **** ${lastFour}`;
      newMethod.expiryDate = data.expiryDate;
    }

    this.paymentMethods.push(newMethod);
    console.log('Nouvelle méthode ajoutée:', newMethod);
    alert('Méthode de paiement ajoutée avec succès !');
  }

  setPrimary(method: PaymentMethod): void {
    this.paymentMethods.forEach(m => m.isPrimary = false);
    method.isPrimary = true;
  }

  deleteMethod(methodId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Voulez-vous vraiment supprimer cette méthode de paiement ?')) {
      this.paymentMethods = this.paymentMethods.filter(m => m.id !== methodId);

      // Si on supprime la méthode principale, définir la première comme principale
      if (!this.paymentMethods.find(m => m.isPrimary) && this.paymentMethods.length > 0) {
        this.paymentMethods[0].isPrimary = true;
      }
    }
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

  onSave(): void {
    console.log('Sauvegarde des méthodes de paiement');
    // TODO: Appel API
    alert('Méthodes de paiement enregistrées !');
  }
}