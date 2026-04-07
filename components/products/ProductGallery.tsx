"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductGradient, Product } from "@/lib/products";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // For demo, we show multiple gradient variations of the same image key
  const gradients = [
    getProductGradient(product.images[0]),
    getProductGradient(product.images[0]).replace('135deg', '45deg'),
    getProductGradient(product.images[0]).replace('135deg', '90deg'),
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? gradients.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === gradients.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{ background: gradients[currentIndex] }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {gradients.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-cream transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-cream transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-cream text-xs px-3 py-1 rounded-full">
          {currentIndex + 1} / {gradients.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {gradients.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                currentIndex === index 
                  ? "ring-2 ring-gold ring-offset-2" 
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ background: gradient }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}