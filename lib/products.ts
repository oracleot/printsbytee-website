import productsData from "@/data/products.json";

export type ProductCategory = 'lora-set' | 'aso-oke-kimono' | 'fringe-bubu' | 'naya-jump-suite';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
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
  const labels: Record<ProductCategory, string> = {
    'lora-set': 'Lora Set',
    'aso-oke-kimono': 'Aso Oke Kimono',
    'fringe-bubu': 'Fringe Bubu',
    'naya-jump-suite': 'Naya Jump Suite',
  };
  return labels[category];
}

export interface SizeChartEntry {
  size: string;
  uk: string;
  waist: string;
  hips: string;
  length: string;
}

export interface SizeChart {
  category: ProductCategory;
  description: string;
  notes: string;
  measurements: SizeChartEntry[];
}

export const sizeCharts: Record<ProductCategory, SizeChart> = {
  'lora-set': {
    category: 'lora-set',
    description: 'Two-piece crop top and skirt set — African wax print with minimal stretch',
    notes: 'Recommend sizing up if between sizes. Top is cropped — check length measurement.',
    measurements: [
      { size: 'S',  uk: '8-10', waist: '26-28"', hips: '36-38"', length: 'Top: 15" / Skirt: 17"' },
      { size: 'M',  uk: '10-12', waist: '28-30"', hips: '38-40"', length: 'Top: 16" / Skirt: 18"' },
      { size: 'L',  uk: '12-14', waist: '30-32"', hips: '40-42"', length: 'Top: 17" / Skirt: 19"' },
      { size: 'XL', uk: '14-16', waist: '32-34"', hips: '42-44"', length: 'Top: 18" / Skirt: 20"' },
      { size: 'XXL', uk: '16-18', waist: '34-36"', hips: '44-46"', length: 'Top: 19" / Skirt: 21"' },
    ],
  },
  'aso-oke-kimono': {
    category: 'aso-oke-kimono',
    description: 'Flowing kimono-style cover-up — Aso Oke is stiff and structured',
    notes: 'Designed to drape loosely. Check shoulder width and total length for your height.',
    measurements: [
      { size: 'S',  uk: '8-10', waist: 'n/a', hips: 'n/a', length: 'Shoulder: 17" / Total: 43"' },
      { size: 'M',  uk: '10-12', waist: 'n/a', hips: 'n/a', length: 'Shoulder: 18" / Total: 44"' },
      { size: 'L',  uk: '12-14', waist: 'n/a', hips: 'n/a', length: 'Shoulder: 19" / Total: 45"' },
      { size: 'XL', uk: '14-16', waist: 'n/a', hips: 'n/a', length: 'Shoulder: 20" / Total: 46"' },
      { size: 'XXL', uk: '16-18', waist: 'n/a', hips: 'n/a', length: 'Shoulder: 21" / Total: 47"' },
    ],
  },
  'fringe-bubu': {
    category: 'fringe-bubu',
    description: 'Loose-fitting traditional bubu with fringe detailing',
    notes: 'Relaxed, oversized fit — size down for a more fitted look. Fringe adds ~2" to hem.',
    measurements: [
      { size: 'S',  uk: '8-10', waist: 'n/a', hips: '40-42"', length: '39" + 2" fringe' },
      { size: 'M',  uk: '10-12', waist: 'n/a', hips: '42-44"', length: '40" + 2" fringe' },
      { size: 'L',  uk: '12-14', waist: 'n/a', hips: '44-46"', length: '41" + 2" fringe' },
      { size: 'XL', uk: '14-16', waist: 'n/a', hips: '46-48"', length: '42" + 2" fringe' },
      { size: 'XXL', uk: '16-18', waist: 'n/a', hips: '48-50"', length: '43" + 2" fringe' },
    ],
  },
  'naya-jump-suite': {
    category: 'naya-jump-suite',
    description: 'Tailored jumpsuit with belt included — body-flattering silhouette',
    notes: 'Material has slight stretch. Check hip and inseam measurements before ordering.',
    measurements: [
      { size: 'S',  uk: '8-10', waist: '26-28"', hips: '36-38"', length: 'Inseam: 29"' },
      { size: 'M',  uk: '10-12', waist: '28-30"', hips: '38-40"', length: 'Inseam: 30"' },
      { size: 'L',  uk: '12-14', waist: '30-32"', hips: '40-42"', length: 'Inseam: 31"' },
      { size: 'XL', uk: '14-16', waist: '32-34"', hips: '42-44"', length: 'Inseam: 32"' },
      { size: 'XXL', uk: '16-18', waist: '34-36"', hips: '44-46"', length: 'Inseam: 33"' },
    ],
  },
};

export function getSizeChart(category: ProductCategory): SizeChart {
  return sizeCharts[category];
}