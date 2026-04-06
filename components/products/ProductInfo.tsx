"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, getCategoryLabel, Product } from "@/lib/products";

interface ProductInfoProps {
  product: Product;
  onNotifyMe: () => void;
}

export function ProductInfo({ product, onNotifyMe }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToEnquiry, setAddedToEnquiry] = useState(false);

  const handleEnquire = () => {
    setAddedToEnquiry(true);
    // In production, this would open a pre-filled contact form
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  const whatsappMessage = `Hi, I'm interested in the ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''}. Can you provide more information?`;
  const whatsappUrl = `https://wa.me/447000000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <Badge variant="secondary" className="bg-cream text-emerald hover:bg-cream text-sm font-medium tracking-wide">
        {getCategoryLabel(product.category)}
      </Badge>

      {/* Product Name */}
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-black">
        {product.name}
      </h1>

      {/* Price */}
      {product.price && (
        <p className="text-2xl font-semibold text-gold">
          {formatPrice(product.price)}
        </p>
      )}

      {/* Stock Status */}
      <div>
        {product.inStock ? (
          <span className="inline-flex items-center gap-2 text-sm text-emerald font-medium">
            <span className="w-2 h-2 bg-emerald rounded-full" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-gold font-medium">
            <span className="w-2 h-2 bg-gold rounded-full" />
            Currently Out of Stock
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-black/70 leading-relaxed text-base">
        {product.description}
      </p>

      {/* Divider */}
      <hr className="border-border" />

      {/* Size Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-black">
          Select Size <span className="text-black/50">(Required)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                selectedSize === size
                  ? "bg-black text-cream border-black"
                  : "bg-cream text-black border-border hover:border-gold hover:text-gold"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-xs text-terracotta">Please select a size</p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-black">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-md border border-border bg-cream hover:bg-gold/20 flex items-center justify-center text-black transition-colors"
          >
            -
          </button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-md border border-border bg-cream hover:bg-gold/20 flex items-center justify-center text-black transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleEnquire}
          disabled={!selectedSize}
          className="flex-1 bg-black text-cream hover:bg-emerald disabled:opacity-50 disabled:cursor-not-allowed text-base py-6"
        >
          <motion.span
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2"
          >
            {addedToEnquiry ? (
              <>
                <Check className="w-5 h-5" />
                Opening Form...
              </>
            ) : (
              "Enquire to Order"
            )}
          </motion.span>
        </Button>

        {(!product.inStock && product.notifyMeEnabled) && (
          <Button
            onClick={onNotifyMe}
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black text-base py-6"
          >
            <motion.span
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              <Bell className="w-5 h-5" />
              Notify Me
            </motion.span>
          </Button>
        )}
      </div>

      {/* WhatsApp Quick Link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-emerald hover:text-gold transition-colors font-medium"
      >
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp for quick response
      </a>

      {/* Product Details Accordion */}
      <Accordion className="w-full">
        <AccordionItem value="product-details">
          <AccordionTrigger className="text-sm font-medium">Product Details</AccordionTrigger>
          <AccordionContent className="text-sm text-black/70 space-y-2">
            <p><strong>Category:</strong> {getCategoryLabel(product.category)}</p>
            <p><strong>Available Sizes:</strong> {product.sizes.join(", ")}</p>
            <p><strong>Material:</strong> Premium African print fabric with cotton blend</p>
            <p><strong>Closure:</strong> Zip and button fastening</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sizing-guide">
          <AccordionTrigger className="text-sm font-medium">Sizing Guide</AccordionTrigger>
          <AccordionContent className="text-sm text-black/70 space-y-2">
            <table className="w-full">
              <tbody>
                <tr><td className="py-1"><strong>XS</strong></td><td>UK 6-8</td><td>Chest: 32-34"</td></tr>
                <tr><td className="py-1"><strong>S</strong></td><td>UK 8-10</td><td>Chest: 34-36"</td></tr>
                <tr><td className="py-1"><strong>M</strong></td><td>UK 10-12</td><td>Chest: 36-38"</td></tr>
                <tr><td className="py-1"><strong>L</strong></td><td>UK 12-14</td><td>Chest: 38-40"</td></tr>
                <tr><td className="py-1"><strong>XL</strong></td><td>UK 14-16</td><td>Chest: 40-42"</td></tr>
              </tbody>
            </table>
            <p className="mt-2 text-xs">When in doubt, size up for the perfect fit.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="care-instructions">
          <AccordionTrigger className="text-sm font-medium">Care Instructions</AccordionTrigger>
          <AccordionContent className="text-sm text-black/70 space-y-2">
            <p><strong>Washing:</strong> Machine wash cold on delicate cycle</p>
            <p><strong>Drying:</strong> Hang to dry, avoid direct sunlight</p>
            <p><strong>Ironing:</strong> Low heat on reverse side</p>
            <p><strong>Storage:</strong> Hang or fold neatly in a cool, dry place</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}