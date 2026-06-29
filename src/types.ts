/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: string; // fallback local id or mongo ObjectId
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string; // lucide icon name
  count?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string;
  featured?: boolean;
}

export interface AffiliateLink {
  platform: 'amazon' | 'flipkart' | 'official' | 'other';
  label: string;
  url: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  brand: string; // brand slug or name
  category: string; // category slug or name
  images: string[];
  primaryImage?: string;
  thumbnail?: string;
  galleryImages?: string[];
  featureImage?: string;
  optional360Url?: string;
  specifications: Record<string, string>;
  pros: string[];
  cons: string[];
  features: string[];
  highlights: string[];
  price: number; // Lowest available price
  mrp: number;
  discount: number; // percentage
  rating: number;
  reviewCount: number;
  affiliateLinks: AffiliateLink[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  createdDate?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown support
  summary: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  readTime: string;
  createdDate: string;
  featured?: boolean;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string; // Markdown / Structured text
  summary: string;
  image: string;
  lastUpdated: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  createdDate: string;
  approved: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ClickRecord {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  url: string;
  timestamp: string;
}

export interface DashboardStats {
  totalClicks: number;
  totalProducts: number;
  totalBlogs: number;
  totalSubscribers: number;
  totalMessages: number;
  clicksByPlatform: Record<string, number>;
  clicksByProduct: Array<{ name: string; count: number }>;
  recentClicks: Array<{
    id: string;
    productName: string;
    platform: string;
    timestamp: string;
  }>;
}
