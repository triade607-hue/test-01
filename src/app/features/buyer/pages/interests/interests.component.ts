import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent {
  categories: Category[] = [
    {
      id: 1,
      name: 'Catégorie 1',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 2,
      name: 'Catégorie 2',
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 3,
      name: 'Catégorie 3',
      image:
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 4,
      name: 'Catégorie 4',
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 5,
      name: 'Catégorie 5',
      image:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 6,
      name: 'Catégorie 6',
      image:
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 7,
      name: 'Catégorie 7',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 8,
      name: 'Catégorie 8',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 9,
      name: 'Catégorie 9',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 10,
      name: 'Catégorie 10',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 11,
      name: 'Catégorie 11',
      image:
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 12,
      name: 'Catégorie 12',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 13,
      name: 'Catégorie 13',
      image:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
      selected: false,
    },
    {
      id: 14,
      name: 'Catégorie 14',
      image:
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
      selected: false,
    },
  ];

  toggleCategory(category: Category): void {
    category.selected = !category.selected;
  }

  getSelectedCount(): number {
    return this.categories.filter((c) => c.selected).length;
  }

  onSave(): void {
    const selectedIds = this.categories
      .filter((c) => c.selected)
      .map((c) => c.id);

    console.log("Centres d'intérêts sélectionnés:", selectedIds);
    // TODO: Appel API pour sauvegarder les centres d'intérêts
    alert(`${selectedIds.length} centre(s) d'intérêt enregistré(s) !`);
  }
}
