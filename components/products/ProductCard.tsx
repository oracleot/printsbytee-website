"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { getProductGradient, formatPrice, getCategoryLabel, Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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
          {/* Product Image */}
          <div 
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: getProductGradient(product.images[0]) }}
          />

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-cream text-black text-sm font-medium px-4 py-2">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="bg-cream text-black text-sm font-medium px-4 py-2 flex items-center gap-2 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-cream/90 text-black hover:bg-cream text-xs font-medium tracking-wide"
            >
              {getCategoryLabel(product.category)}
            </Badge>
          </div>

          {/* Notify Me Badge */}
          {!product.inStock && product.notifyMeEnabled && (
            <div className="absolute top-3 right-3">
              <Badge 
                variant="secondary" 
                className="bg-gold/90 text-black hover:bg-gold text-xs font-medium tracking-wide"
              >
                Notify Me
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-black group-hover:text-emerald transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          {product.price && (
            <p className="text-gold font-semibold text-lg">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}