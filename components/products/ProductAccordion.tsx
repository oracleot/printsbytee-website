"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCategoryLabel, type Product } from "@/lib/products";

interface ProductAccordionProps {
  category: string;
  sizes: string[];
}

export function ProductAccordion({ category, sizes }: ProductAccordionProps) {
  return (
    <Accordion className="w-full">
      <AccordionItem value="product-details">
        <AccordionTrigger className="text-sm font-medium">Product Details</AccordionTrigger>
        <AccordionContent className="text-sm text-black/70 space-y-2">
          <p><strong>Category:</strong> {getCategoryLabel(category as Product["category"])}</p>
          <p><strong>Available Sizes:</strong> {sizes.join(", ")}</p>
          <p><strong>Material:</strong> Premium African print fabric with cotton blend</p>
          <p><strong>Closure:</strong> Zip and button fastening</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sizing-guide">
        <AccordionTrigger className="text-sm font-medium">Sizing Guide</AccordionTrigger>
        <AccordionContent className="text-sm text-black/70 space-y-2">
          <table className="w-full">
            <tbody>
              <tr><td className="py-1"><strong>XS</strong></td><td>UK 6-8</td><td>Chest: 32-34&quot;</td></tr>
              <tr><td className="py-1"><strong>S</strong></td><td>UK 8-10</td><td>Chest: 34-36&quot;</td></tr>
              <tr><td className="py-1"><strong>M</strong></td><td>UK 10-12</td><td>Chest: 36-38&quot;</td></tr>
              <tr><td className="py-1"><strong>L</strong></td><td>UK 12-14</td><td>Chest: 38-40&quot;</td></tr>
              <tr><td className="py-1"><strong>XL</strong></td><td>UK 14-16</td><td>Chest: 40-42&quot;</td></tr>
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
  );
}
