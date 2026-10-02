import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getNewProducts } from "@/lib/products";

export function NewArrivals() {
  const products = getNewProducts()
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .filter((product, index, all) =>
      all.findIndex((candidate) => candidate.category === product.category) === index)
    .slice(0, 3);

  return (
    <section className="hidden bg-cream py-20 lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald">New Arrivals</p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-black sm:text-5xl">
              Fresh Prints, Bold Stories
            </h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 font-medium text-black hover:text-emerald">
            Explore the Collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
