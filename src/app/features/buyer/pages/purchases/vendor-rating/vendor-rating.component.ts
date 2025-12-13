import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

interface RatingCriteria {
  id: string;
  title: string;
  description: string;
  rating: number;
}

@Component({
  selector: 'app-vendor-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vendor-rating.component.html',
  styleUrls: ['./vendor-rating.component.scss'],
})
export class VendorRatingComponent implements OnInit {
  orderId: string = '';
  orderNumber: string = 'SMSG52455454JKFD564';
  showDropdown: boolean = false;
  currentStep: 1 | 2 = 1;
  comment: string = '';

  criteria: RatingCriteria[] = [
    {
      id: 'communication',
      title: 'Communication',
      description:
        'Notez la clarté et la précision des informations fournies sur les produits, la réactivité du Vendeur à vos différentes questions, la politesse et la courtoisie dans vos échanges.',
      rating: 4,
    },
    {
      id: 'conformity',
      title: 'Conformité du produit',
      description:
        "Noter la conformité des produits à la description fournie par le Vendeur, la qualité des produits par rapport à vos attentes et l'exactitude des spécifications techniques, des tailles, des couleurs, de l'authenticité.",
      rating: 4,
    },
    {
      id: 'honesty',
      title: 'Honnêteté et transparence',
      description:
        "Noter l'exactitude des informations sur les promotions, les réductions, les offres spéciales et l'absence de frais cachés ou de coûts imprévus lors de l'achat.",
      rating: 4,
    },
    {
      id: 'shipping',
      title: 'Expédition',
      description: "Notez la qualité et la rapidité de l'expédition.",
      rating: 4,
    },
  ];

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
  }

  get averageRating(): number {
    const sum = this.criteria.reduce((acc, c) => acc + c.rating, 0);
    return Math.round((sum / this.criteria.length) * 10) / 10;
  }

  setRating(criteriaId: string, rating: number): void {
    const criteria = this.criteria.find((c) => c.id === criteriaId);
    if (criteria) {
      criteria.rating = rating;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  goToStep2(): void {
    this.currentStep = 2;
  }

  goToStep1(): void {
    this.currentStep = 1;
  }

  submitRating(): void {
    const ratingData = {
      orderId: this.orderId,
      criteria: this.criteria.map((c) => ({ id: c.id, rating: c.rating })),
      averageRating: this.averageRating,
      comment: this.comment,
    };
    console.log('Rating submitted:', ratingData);
    this.router.navigate(['/buyer/purchases']);
  }
}
