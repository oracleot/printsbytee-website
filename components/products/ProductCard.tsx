"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { getProductImage, formatPrice, getCategoryLabel, Product } from "@/lib/products";
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
          {product.images[0].startsWith("/") ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: getProductImage(product.images[0]) }}
            />
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-cream text-black text-sm font-medium px-4 py-2">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover Overlay — covers full image; triggers on any hover over the card (.group) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-cream text-black text-sm font-medium px-4 py-2 flex items-center gap-2 shadow-lg">
              <Eye className="w-4 h-4" />
              Quick View
            </div>
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