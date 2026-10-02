"use client";
import Image from "next/image";
import { EverythingCollage } from "./EverythingCollage";
import { Product, getCategoryLabel } from "@/lib/products";

export function CategorySilhouettes({ products, active, onChange }: {
  products: Product[]; active: string; onChange: (value: "all" | Product["category"]) => void;
}) {
  const categories = Array.from(new Set(products.map(p => p.category)));
  const options = [{ value: "all" as const, label: "Everything", image: undefined },
    ...categories.map(value => ({ value, label: getCategoryLabel(value), image: products.find(p => p.category === value)?.images[0] }))];
  return <nav aria-label="Product categories" className="flex overflow-x-auto gap-5 pb-4">
    {options.map(o => <button key={o.value} aria-pressed={active === o.value} onClick={() => onChange(o.value)} className="shrink-0 w-24 text-center group">
      <span className={`relative block h-24 rounded-t-full overflow-hidden mb-3 border-2 ${active === o.value ? "border-emerald ring-2 ring-emerald/20 ring-offset-2" : "border-transparent"}`}>
        {o.value === "all" ? <EverythingCollage products={products} /> : o.image?.startsWith("/") && <Image src={o.image} alt="" fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform" />}
      </span><span className={`text-xs ${active === o.value ? "text-emerald font-bold" : "text-black/70"}`}>{o.label}</span>
    </button>)}
  </nav>;
}
