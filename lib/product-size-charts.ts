import type { ProductCategory, SizeChart } from "./product-types";

export const sizeCharts: Record<ProductCategory, SizeChart> = {
  "lora-set": {
    category: "lora-set",
    description: "Two-piece crop top and skirt set — African wax print with minimal stretch",
    notes: "Recommend sizing up if between sizes. Top is cropped — check length measurement.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "aso-oke-kimono": {
    category: "aso-oke-kimono",
    description: "Flowing kimono-style cover-up — Aso Oke is stiff and structured",
    notes: "Designed to drape loosely. Check shoulder width and total length for your height.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "fringe-bubu": {
    category: "fringe-bubu",
    description: "Loose-fitting traditional bubu with fringe detailing",
    notes: "Relaxed, oversized fit — size down for a more fitted look. Fringe adds ~2\" to hem.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "naya-jump-suit": {
    category: "naya-jump-suit",
    description: "Tailored jumpsuit with belt included — body-flattering silhouette",
    notes: "Material has slight stretch. Check hip and inseam measurements before ordering.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "lumi-set": {
    category: "lumi-set",
    description: "Two-piece Lumi Set — vibrant African print with a modern silhouette",
    notes: "Recommend sizing up if between sizes.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "jasmine-set": {
    category: "jasmine-set",
    description: "The Jasmine Set — elegant two-piece with flowing fabric and minimal stretch",
    notes: "True to size. Check bust and waist measurements before ordering.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "seline-dress": {
    category: "seline-dress",
    description: "The Seline Dress — a flowing dress with a flattering silhouette",
    notes: "True to size. Check bust and length measurements before ordering.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "aso-oke-pant": {
    category: "aso-oke-pant",
    description: "Aso Oke Pant — structured wide-leg pant in handwoven Aso Oke fabric",
    notes: "Designed for a relaxed, structured fit. Check hip and inseam before ordering.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "kora-bubu": {
    category: "kora-bubu",
    description: "The Kora Bubu — a stunning loose-fitting bubu with intricate kora-inspired detailing",
    notes: "Relaxed, flowy fit — true to size or size down for a more tailored look.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "mina-set": {
    category: "mina-set",
    description: "The Mina Set — a versatile two-piece set that can be styled your way",
    notes: "Available as full set or pant only. Recommend sizing up if between sizes.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "ewa-set": {
    category: "ewa-set",
    description: "The Ewa Set — a relaxed two-piece with a belted top and wide-leg trousers",
    notes: "Designed for an easy, flowing fit. Choose your usual size; size up if you prefer extra room through the trousers.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "hawa-bubu": {
    category: "hawa-bubu",
    description: "The Hawa Bubu — a flowing, loose-fitting traditional silhouette",
    notes: "Designed for an easy, relaxed fit. Choose your usual size or size down for less volume.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
  "arike-set": {
    category: "arike-set",
    description: "The Arike Set — a coordinated two-piece in vibrant African print",
    notes: "Choose your usual size; size up if you prefer a more relaxed fit.",
    measurements: [{ size: "S", uk: "8-10" }, { size: "M", uk: "10-12" }, { size: "L", uk: "12-14" }, { size: "XL", uk: "14-16" }, { size: "XXL", uk: "18-20" }],
  },
};

export function getSizeChart(category: ProductCategory): SizeChart | undefined {
  return sizeCharts[category];
}
