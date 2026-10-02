"use client";
import Image from "next/image";
import { EverythingCollage } from "./EverythingCollage";
import { Product, getCategoryLabel } from "@/lib/products";
export function PrototypeCategories({ products, active, onChange, variant }: {
  products: Product[]; active: string; onChange: (value: "all" | Product["category"]) => void; variant: string;
}) {
  const categories = Array.from(new Set(products.map(p => p.category)));
  const options = [{ value: "all" as const, label: "Everything", image: undefined, count: products.length },
    ...categories.map(value => ({ value, label: getCategoryLabel(value), image: products.find(p => p.category === value)?.images[0], count: products.filter(p => p.category === value).length }))];
  if (variant === "C") return <nav aria-label="Product categories" className="lg:w-56 shrink-0">
    <p className="text-xs uppercase tracking-[.2em] mb-5 text-black/60">Find your silhouette</p>
    <div className="flex lg:flex-col overflow-x-auto gap-1 pb-4">
      {options.map(o => <button key={o.value} aria-pressed={active === o.value} onClick={() => onChange(o.value)} className={`flex shrink-0 items-center justify-between gap-6 px-4 py-3 text-sm text-left border-l-2 ${active === o.value ? "border-emerald bg-cream font-semibold" : "border-transparent hover:bg-cream"}`}><span>{o.label}</span><span className="text-black/50">{o.count}</span></button>)}
    </div>
  </nav>;
  if (variant === "B") return <nav aria-label="Product categories" className="flex overflow-x-auto gap-5 pb-4">
    {options.map(o => <button key={o.value} aria-pressed={active === o.value} onClick={() => onChange(o.value)} className="shrink-0 w-24 text-center group">
      <span className={`relative block h-24 rounded-t-full overflow-hidden mb-3 border-2 ${active === o.value ? "border-emerald ring-2 ring-emerald/20 ring-offset-2" : "border-transparent"}`}>
        {o.value === "all" ? <EverythingCollage products={products} /> : o.image?.startsWith("/") && <Image src={o.image} alt="" fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform" />}
      </span><span className={`text-xs ${active === o.value ? "text-emerald font-bold" : "text-black/70"}`}>{o.label}</span>
    </button>)}
  </nav>;
  return <nav aria-label="Product categories" className="flex overflow-x-auto gap-7 border-b border-black/15">
    {options.map(o => <button key={o.value} aria-pressed={active === o.value} onClick={() => onChange(o.value)} className={`shrink-0 pb-4 text-sm border-b-2 ${active === o.value ? "border-emerald text-emerald font-semibold" : "border-transparent text-black/60 hover:text-black"}`}>{o.label} <span className="text-[10px] align-super ml-1">{o.count}</span></button>)}
  </nav>;
}
