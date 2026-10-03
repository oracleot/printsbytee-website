import productsData from "@/data/products.json";
import newProductsData from "@/data/new-products.json";
import type { Product } from "./product-types";

const existingProducts = productsData.map((product) => ({
  ...product,
  isNew: false,
}));

const latestProducts = newProductsData.map((product) => ({
  ...product,
  detailsPending: true,
  isNew: true,
}));

const bubuCategories = new Set(["bubu-dress", "kora-bubu", "hawa-bubu"]);

export const products: Product[] = ([...existingProducts, ...latestProducts] as Product[])
  .map((product) => bubuCategories.has(product.category)
    ? { ...product, category: "bubu", sizeChartCategory: product.category }
    : product);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew);
}
