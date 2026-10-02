"use client";

import { CategorySilhouettes } from "./CategorySilhouettes";
import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
}

type CategoryFilter = "all" | Product["category"];

export function ProductGrid({ products }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredProducts = activeFilter === "all"
    ? products
    : products.filter((product) => product.category === activeFilter);

  const sortedProducts = [...filteredProducts].sort((left, right) => {
    if (left.isNew !== right.isNew) return left.isNew ? -1 : 1;
    if (left.inStock !== right.inStock) return left.inStock ? -1 : 1;
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });

  return (
    <div className="space-y-8">
      <CategorySilhouettes products={products} active={activeFilter} onChange={setActiveFilter} />
      <div className="space-y-8">
      {/* Product Count */}
      <p aria-live="polite" className="text-center text-sm text-black/60">
        Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
      </p>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <svg className="w-10 h-10 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-black mb-2">
              No products found
            </h3>
            <p className="text-black/60">
              We couldn{`'`}t find any products in this category. Try browsing all products instead.
            </p>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
