import productsData from "@/data/products.json";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'laura-set' | 'short-bubu' | '2-piece-set';
  description: string;
  price: number | null;
  sizes: string[];
  images: string[];
  inStock: boolean;
  notifyMeEnabled: boolean;
  featured: boolean;
  createdAt: string;
}

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  productInterest?: string;
  message: string;
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  productId: string;
  email: string;
  createdAt: string;
}

// CSS gradient placeholders for products
export const productGradients: Record<string, string> = {
  'gradient-emerald-gold': 'linear-gradient(135deg, #1B4D3E 0%, #C9A84C 50%, #0D0D0D 100%)',
  'gradient-terracotta-cream': 'linear-gradient(135deg, #C75B39 0%, #F5F0E8 50%, #C9A84C 100%)',
  'gradient-noir-gold': 'linear-gradient(135deg, #0D0D0D 0%, #C9A84C 50%, #1B4D3E 100%)',
  'gradient-golden-safari': 'linear-gradient(135deg, #C9A84C 0%, #C75B39 50%, #F5F0E8 100%)',
  'gradient-rose-gold': 'linear-gradient(135deg, #F5F0E8 0%, #C9A84C 50%, #C75B39 100%)',
  'gradient-ivory-classic': 'linear-gradient(135deg, #FAFAF8 0%, #F5F0E8 50%, #E8E3DB 100%)',
  'gradient-sage-serene': 'linear-gradient(135deg, #1B4D3E 0%, #F5F0E8 50%, #C9A84C 100%)',
  'gradient-sunny-days': 'linear-gradient(135deg, #C9A84C 0%, #F5F0E8 50%, #C75B39 100%)',
  'gradient-ocean-deep': 'linear-gradient(135deg, #1B4D3E 0%, #0D0D0D 50%, #C9A84C 100%)',
  'gradient-warm-sand': 'linear-gradient(135deg, #F5F0E8 0%, #C75B39 50%, #E8E3DB 100%)',
  'gradient-coral-reef': 'linear-gradient(135deg, #C75B39 0%, #1B4D3E 50%, #C9A84C 100%)',
  'gradient-forest-whisper': 'linear-gradient(135deg, #1B4D3E 0%, #0D0D0D 50%, #F5F0E8 100%)',
  'gradient-lavender-mist': 'linear-gradient(135deg, #E8E3DB 0%, #C9A84C 50%, #1B4D3E 100%)',
  'gradient-rust-vintage': 'linear-gradient(135deg, #C75B39 0%, #C9A84C 50%, #0D0D0D 100%)',
  'gradient-mosaic-magic': 'linear-gradient(135deg, #0D0D0D 0%, #C9A84C 50%, #C75B39 100%)',
  'gradient-golden-hour': 'linear-gradient(135deg, #C9A84C 0%, #C75B39 50%, #1B4D3E 100%)',
  'gradient-navy-regal': 'linear-gradient(135deg, #1B4D3E 0%, #0D0D0D 50%, #C9A84C 100%)',
  'gradient-emerald-jungle': 'linear-gradient(135deg, #1B4D3E 0%, #C9A84C 50%, #F5F0E8 100%)',
  'gradient-blush-glow': 'linear-gradient(135deg, #F5F0E8 0%, #C9A84C 50%, #E8E3DB 100%)',
  'gradient-red-placeholder': 'linear-gradient(135deg, #C75B39 0%, #0D0D0D 50%, #C75B39 100%)',
  'gradient-midnight-jewel': 'linear-gradient(135deg, #0D0D0D 0%, #1B4D3E 50%, #C9A84C 100%)',
};

export function getProductGradient(imageKey: string): string {
  return productGradients[imageKey] || 'linear-gradient(135deg, #C9A84C 0%, #1B4D3E 100%)';
}

export function getProductImage(key: string): string {
  if (key.startsWith("/")) return key;
  return getProductGradient(key);
}

export function formatPrice(price: number | null): string {
  if (price === null) return '';
  return `£${price}`;
}

export function getCategoryLabel(category: Product['category']): string {
  const labels: Record<Product['category'], string> = {
    'laura-set': 'Laura Set',
    'short-bubu': 'Short Bubu',
    '2-piece-set': '2-Piece Set',
  };
  return labels[category];
}