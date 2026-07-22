export interface Product {
  id: number;
  name: string;
  price: string;
  badge: 'DEAL' | 'AL' | 'ELITE' | 'NEW' | 'GUARANTEED' | string;
  category: 'Tools' | 'AI' | 'YouTube' | 'Course' | string;
  image: string; // Emoji or image URL
  description: string;
  isHidden?: boolean;
  featured?: boolean;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  keywords: string[];
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerWhatsApp: string;
  productName: string;
  price: string;
  paymentMethod?: string;
  notes?: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  whatsappChannel: string;
  ezToolboxLink?: string;
  youtubeLink: string;
  instagramLink: string;
  email: string;
  brandName: string;
  tagline: string;
  brandStory: string;
  adminPassword: string;
}
