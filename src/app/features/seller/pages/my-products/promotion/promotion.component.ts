import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MultiSelectComponent, MultiSelectOption } from '../../../components/multi-select/multi-select.component';


interface PromotionPlan {
  id: string;
  name: string;
  description: string;
  price?: number;
}

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MultiSelectComponent],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  productId = '';
  productName = "Dénomination de l'article";

  selectedZones: string[] = [];
  selectedPlan = '';
  isLoading = false;

  countryOptions: MultiSelectOption[] = [
    { value: 'FR', label: 'France', flag: '🇫🇷' },
    { value: 'CA', label: 'Canada', flag: '🇨🇦' },
    { value: 'BE', label: 'Belgique', flag: '🇧🇪' },
    { value: 'CH', label: 'Suisse', flag: '🇨🇭' },
    { value: 'BJ', label: 'Bénin', flag: '🇧🇯' },
    { value: 'SN', label: 'Sénégal', flag: '🇸🇳' },
    { value: 'CI', label: "Côte d'Ivoire", flag: '🇨🇮' },
    { value: 'MA', label: 'Maroc', flag: '🇲🇦' },
  ];

  promotionPlans: PromotionPlan[] = [
    {
      id: 'daily',
      name: 'Journalier',
      description:
        "Boostez vos ventes! Une visibilité de 24h pour attirer plus d'acheteurs.",
    },
    {
      id: '3days',
      name: '3 Jours',
      description:
        'Idéale pour optimiser vos chances de vente sur une courte période.',
    },
    {
      id: 'weekly',
      name: '1 Semaine',
      description:
        "Maximisez l'exposition de votre produit en continue pendant 7 jours.",
    },
    {
      id: 'monthly',
      name: '1 Mois',
      description: 'Garantissez une visibilité maximale sur le long terme.',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['productId']) {
        this.productId = params['productId'];
      }
    });
  }

  get isFormValid(): boolean {
    return this.selectedZones.length > 0 && this.selectedPlan !== '';
  }

  goToPayment(): void {
    this.isLoading = true;
    // Simulate API call then redirect to payment
    setTimeout(() => {
      this.isLoading = false;
      // TODO: Navigate to payment page
      console.log('Going to payment with:', {
        productId: this.productId,
        zones: this.selectedZones,
        plan: this.selectedPlan,
      });
      this.router.navigate(['/seller/products']);
    }, 1000);
  }
}
