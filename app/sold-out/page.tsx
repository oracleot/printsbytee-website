import Link from "next/link";
import { SoldOutGroups } from "@/components/products/SoldOutGroups";
import { products } from "@/lib/products";

export const metadata = { title: "Sold-out favourites — PrintsbyTee" };

export default function SoldOutPage() {
  return <section className="pt-32 pb-20 bg-cream min-h-screen">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Link href="/products" className="text-sm underline underline-offset-4">← Shop available pieces</Link>
      <header className="my-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div><p className="text-xs tracking-[.2em] text-emerald uppercase mb-4">Previously in the collection</p>
          <h1 className="font-heading text-5xl">The sold-out edit</h1></div>
        <p className="text-black/60 max-w-sm">All your favourites, in one place. Open a piece to explore its details and any available restock options.</p>
      </header>
      <SoldOutGroups products={products.filter(p => !p.inStock && !p.availabilityPending)} />
    </div>
  </section>;
}
