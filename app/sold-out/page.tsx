import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/lib/products";

export const metadata = { title: "Sold-out favourites — PrintsbyTee" };

export default function SoldOutPage() {
  return <section className="pt-32 pb-20 bg-cream min-h-screen">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Link href="/products" className="text-sm underline underline-offset-4">← Shop available pieces</Link>
      <header className="text-center my-12">
        <p className="text-gold text-xs uppercase tracking-[.2em] mb-4">The archive</p>
        <h1 className="font-heading text-5xl mb-5">Sold-out favourites</h1>
        <p className="text-black/65">Revisit the prints you loved. Discover available pieces in our collection.</p>
      </header>
      <ProductGrid products={products.filter(p => !p.inStock && !p.availabilityPending)} />
    </div>
  </section>;
}
