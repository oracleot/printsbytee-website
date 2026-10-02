// Throwaway: three dedicated sold-out page designs, pending selection.
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { SoldOutPrototype } from "@/components/products/SoldOutPrototype";
export default async function Page({ searchParams }: { searchParams: Promise<{ variant?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { variant } = await searchParams;
  return <SoldOutPrototype products={products.filter(p => !p.inStock && !p.availabilityPending)} variant={variant ?? "A"} />;
}
