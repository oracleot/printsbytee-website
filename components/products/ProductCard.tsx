"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { getProductImage, formatPrice, getCategoryLabel, Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const stockLabel = (product as Product & { stockLabel?: string }).stockLabel;
  const isLowStock = stockLabel === "low-stock";
  const outOfStockText = product.notifyMeEnabled ? "Restocking Soon" : "Sold Out";
  const statusBadges = [
    product.isNew ? "new" : null,
    isLowStock ? "low-stock" : null,
    !product.inStock && product.notifyMeEnabled ? "notify-me" : null,
  ].filter(Boolean) as Array<"new" | "low-stock" | "notify-me">;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-cream">
          {product.images?.[0]?.startsWith("/") ?? false ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={index < 4}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: getProductImage(product.images?.[0] ?? '') }}
            />
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-cream text-black text-sm font-medium px-4 py-2">
                {outOfStockText}
              </span>
            </div>
          )}

          {statusBadges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              {statusBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className={
                    badge === "new"
                      ? "border border-gold/40 bg-gradient-to-r from-[#0d0d0d] via-[#1b4d3e] to-[#5c2f24] text-white text-[10px] font-black uppercase tracking-[0.25em] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] shadow-[0_0_24px_rgba(201,168,76,0.35)] animate-pulse"
                      : "bg-gold text-black text-xs font-medium tracking-wide"
                  }
                >
                  {badge === "new"
                    ? "Just In"
                    : badge === "low-stock"
                      ? "Low Stock"
                      : "Notify Me"}
                </Badge>
              ))}
            </div>
          )}

          {/* Hover Overlay — covers full image; triggers on any hover over the card (.group) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-cream text-black text-sm font-medium px-4 py-2 flex items-center gap-2 shadow-lg">
              <Eye className="w-4 h-4" />
              Quick View
            </div>
          </div>

          {/* Category Circle */}
          <div className="absolute top-3 left-3">
            <div
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center"
              aria-label={getCategoryLabel(product.category) ?? 'Unknown category'}
              title={getCategoryLabel(product.category) ?? 'Unknown category'}
              role="img"
            >
              <span className="text-cream text-[10px] font-bold tracking-wide uppercase" aria-hidden="true">
                {getCategoryLabel(product.category)?.charAt(0) || '?'}
              </span>
            </div>
          </div>

        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-black group-hover:text-emerald transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          {product.price !== null && (
            <p className="text-gold font-semibold text-lg">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
