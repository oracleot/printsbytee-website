import Image from "next/image";
import Link from "next/link";
import { Product, getCategoryLabel } from "@/lib/products";

export function SoldOutGroups({ products }: { products: Product[] }) {
  const categories = Array.from(new Set(products.map(product => product.category)));
  return (
        <div className="flex flex-col gap-12">{categories.map(category => {
          const pieces = products.filter(product => product.category === category);
          return <section key={category} aria-labelledby={`archive-${category}`}>
            <header className="flex items-baseline justify-between gap-4 border-b border-emerald/30 pb-4">
              <h2 id={`archive-${category}`} className="font-heading text-2xl sm:text-3xl text-emerald">{getCategoryLabel(category)}</h2>
            </header>
            {pieces.map(p => <Link key={p.id} href={`/products/${p.slug}`} className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_auto] gap-5 sm:gap-8 py-6 border-b border-black/15 items-center group">
              <div className="relative aspect-[3/4]">{p.images[0]?.startsWith("/") && <Image src={p.images[0]} alt={p.name} fill sizes="100px" className="object-cover" />}</div>
              <div><h3 className="font-heading text-xl sm:text-3xl mb-2">{p.name}</h3></div><span className="hidden sm:block group-hover:text-emerald">View details ↗</span>
            </Link>)}
          </section>;
        })}</div>
  );
}
