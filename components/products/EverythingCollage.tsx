import Image from "next/image";
import type { Product } from "@/lib/products";

// One photo per category creates a miniature overview of the collection.
export function EverythingCollage({ products }: { products: Product[] }) {
  const categories = new Set<Product["category"]>();
  const images = products.filter(product => {
    if (categories.has(product.category) || !product.images[0]?.startsWith("/")) return false;
    categories.add(product.category);
    return true;
  }).slice(0, 6);

  return (
    <span aria-hidden="true" className="grid h-full grid-cols-3 grid-rows-2 gap-px bg-cream transition-transform group-hover:scale-105">
      {images.map(product => (
        <span key={product.id} className="relative min-h-0 overflow-hidden">
          <Image src={product.images[0]} alt="" fill sizes="32px" className="object-cover" />
        </span>
      ))}
    </span>
  );
}
