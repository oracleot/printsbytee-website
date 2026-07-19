export type ProductCategory =
  | "lora-set"
  | "aso-oke-kimono"
  | "fringe-bubu"
  | "naya-jump-suit"
  | "lumi-set"
  | "jasmine-set"
  | "seline-dress"
  | "aso-oke-pant"
  | "kora-bubu"
  | "mina-set"
  | "ewa-set";

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
  isNew?: boolean;
  createdAt: string;
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

export interface SizeChartEntry {
  size: string;
  uk: string;
}

export interface SizeChart {
  category: ProductCategory;
  description: string;
  notes: string;
  measurements: SizeChartEntry[];
}
