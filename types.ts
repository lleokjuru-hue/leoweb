export interface FieldCase {
  id: string;
  title: string;
  region: string;
  category: 'graos' | 'pastagem' | 'solo';
  categoryLabel: string;
  description: string;
  primaryMetric: string;
  secondaryMetric: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export interface AgroService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

