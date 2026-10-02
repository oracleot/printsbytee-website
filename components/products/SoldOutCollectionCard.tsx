import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SoldOutCollectionCard() {
  return (
    <Link href="/sold-out" className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-emerald text-cream mb-4 flex flex-col items-center justify-center p-8 text-center">
        <div aria-hidden="true" className="absolute -top-16 -right-16 size-64 rounded-full border border-gold/30" />
        <div aria-hidden="true" className="absolute -bottom-16 -left-16 size-64 rounded-full border border-gold/30" />
        <span className="relative text-gold text-xs uppercase tracking-[.2em] mb-6">The archive</span>
        <span className="relative font-heading text-3xl sm:text-4xl mb-5">Gone, but<br />adored.</span>
        <span className="relative text-sm text-cream/80 max-w-56">Revisit the prints you loved, with every sold-out favourite in one place.</span>
        <span className="relative mt-8 flex size-12 items-center justify-center rounded-full border border-gold/60 group-hover:bg-gold group-hover:text-black transition-colors">
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </span>
      </div>
      <h3 className="font-heading text-lg font-semibold group-hover:text-emerald transition-colors">Sold-out favourites</h3>
      <p className="text-sm text-black/60 mt-2">Explore the archive ↗</p>
    </Link>
  );
}
