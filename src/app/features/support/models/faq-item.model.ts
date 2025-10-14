export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
  notHelpful: number;
  order: number;
}
