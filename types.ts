export interface Project {
  id: string;
  title: string;
  category: 'website' | 'landing' | 'brand';
  categoryLabel: string;
  description: string;
  metrics: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  features: string[];
  deliveryTime: string;
  priceFrom: string;
}

export interface faqItem {
  question: string;
  answer: string;
}
