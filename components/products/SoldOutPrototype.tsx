import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, getCategoryLabel } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { PrototypeSwitcher } from "./PrototypeSwitcher";

export function SoldOutPrototype({ products, variant }: { products: Product[]; variant: string }) {
  const categories = Array.from(new Set(products.map(product => product.category)));
  return <section className="pt-32 pb-28 bg-cream min-h-screen">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Link href="/products" className="text-sm text-emerald underline underline-offset-4">← Shop available pieces</Link>
      {variant === "B" ? <>
        <header className="grid md:grid-cols-2 gap-8 my-12 items-end border-b border-black/20 pb-10">
          <div><p className="text-xs tracking-[.25em] uppercase text-emerald mb-5">The PrintsbyTee lookbook</p><h1 className="font-heading text-4xl sm:text-6xl lg:text-8xl">Loved.<br />Worn.<br /><em>Remembered.</em></h1></div>
          <p className="max-w-sm text-black/70 text-lg">A celebration of the pieces you made your own. These prints have sold out — explore their stories, then discover your next favourite.</p>
        </header>
        <div className="flex flex-col gap-16">{products.map((p, i) => <article key={p.id} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[&>a]:order-2" : ""}`}>
          <Link href={`/products/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden">{p.images[0]?.startsWith("/") && <Image src={p.images[0]} alt={p.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />}</Link>
          <div className="md:px-12"><p className="text-gold text-sm mb-5">ARCHIVE / {String(i + 1).padStart(2, "0")}</p><h2 className="font-heading text-4xl mb-5">{p.name}</h2><p className="text-black/65 mb-6">{p.description}</p><p className="text-xs uppercase tracking-widest mb-6">Sold out</p><Link href={`/products/${p.slug}`} className="border-b border-black pb-2">View piece ↗</Link></div>
        </article>)}</div>
      </> : variant === "C" ? <>
        <header className="my-12 flex flex-col md:flex-row md:items-end justify-between gap-6"><div><p className="text-xs tracking-[.2em] text-emerald uppercase mb-4">Previously in the collection</p><h1 className="font-heading text-5xl">The sold-out edit</h1></div><p className="text-black/60 max-w-sm">All your favourites, in one place. Open a piece to explore its details and any available restock options.</p></header>
        <div className="flex flex-col gap-12">{categories.map(category => {
          const pieces = products.filter(product => product.category === category);
          return <section key={category} aria-labelledby={`archive-${category}`}>
            <header className="flex items-baseline justify-between gap-4 border-b border-emerald/30 pb-4">
              <h2 id={`archive-${category}`} className="font-heading text-2xl sm:text-3xl text-emerald">{getCategoryLabel(category)}</h2>
              <span className="text-xs text-black/60 shrink-0">{pieces.length} sold-out {pieces.length === 1 ? "piece" : "pieces"}</span>
            </header>
            {pieces.map(p => <Link key={p.id} href={`/products/${p.slug}`} className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_auto] gap-5 sm:gap-8 py-6 border-b border-black/15 items-center group">
              <div className="relative aspect-[3/4]">{p.images[0]?.startsWith("/") && <Image src={p.images[0]} alt={p.name} fill sizes="100px" className="object-cover" />}</div>
              <div><h3 className="font-heading text-xl sm:text-3xl mb-2">{p.name}</h3><p className="text-sm text-black/60">Sold out{p.price !== null ? ` · ${formatPrice(p.price)}` : ""}</p></div><span className="hidden sm:block group-hover:text-emerald">View details ↗</span>
            </Link>)}
          </section>;
        })}</div>
      </> : <>
        <header className="text-center my-14 max-w-2xl mx-auto"><p className="text-xs tracking-[.25em] uppercase text-emerald mb-5">The archive · {products.length} pieces</p><h1 className="font-heading text-5xl sm:text-7xl mb-6">Gone, but adored.</h1><p className="text-black/65 text-lg">Your most-loved prints have found their homes. Browse sold-out favourites and revisit the pieces that made a statement.</p></header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
      </>}
    </div>
    <PrototypeSwitcher names={["Archive gallery", "Editorial lookbook", "Grouped archive"]} />
  </section>;
}
