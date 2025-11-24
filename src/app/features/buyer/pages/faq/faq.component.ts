import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'QUESTION NUMERO 1',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Sed arcu ut ullamcorper porttitor sit est vitae arcu enim. Id viverra consequat sagittis laoreet odio finibus ultrices elit volutpat. Urna augue semper quis id pharetra pulvinar tristique auismod. Enim neque eu leo donec nam cras urna feugiat amet.\n\nId pretium nunc tempus purus sit. Leo molestie sed sapien feugiat sed vitae quam. Sed hendrerit hendrerit velit vulputate.',
      isOpen: true,
    },
    {
      id: 2,
      question: 'QUESTION NUMERO 2',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Sed arcu ut ullamcorper porttitor sit est vitae arcu enim. Id viverra consequat sagittis laoreet odio finibus ultrices elit volutpat.',
      isOpen: false,
    },
    {
      id: 3,
      question: 'QUESTION NUMERO 3',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Sed arcu ut ullamcorper porttitor sit est vitae arcu enim. Id viverra consequat sagittis laoreet odio finibus ultrices elit volutpat.',
      isOpen: false,
    },
    {
      id: 4,
      question: 'QUESTION NUMERO 4',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Sed arcu ut ullamcorper porttitor sit est vitae arcu enim. Id viverra consequat sagittis laoreet odio finibus ultrices elit volutpat.',
      isOpen: false,
    },
    {
      id: 5,
      question: 'QUESTION NUMERO 5',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Sed arcu ut ullamcorper porttitor sit est vitae arcu enim. Id viverra consequat sagittis laoreet odio finibus ultrices elit volutpat.',
      isOpen: false,
    },
  ];

  toggleFaq(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }
}
