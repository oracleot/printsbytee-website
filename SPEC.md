# SPEC.md — Fix Product Detail Page Image Display

## What
The product detail page (`ProductGallery.tsx`) always renders gradient backgrounds via `getProductGradient()`, ignoring real image paths (like `/laura-set-royal-emerald-1.jpg`). Meanwhile `ProductCard.tsx` correctly checks `product.images[0].startsWith("/")` and uses Next.js `<Image>` for real photos. This makes the product listing show the actual photo but the detail page show only a gradient.

## Tech
- Next.js 16.2.2, React 19, TypeScript, Tailwind CSS 4
- Next.js `<Image>` component with `fill` + `sizes` for optimized real images
- Framer Motion for gallery transitions
- Same image/gradient pattern already working in `ProductCard.tsx`

## Files to Modify

### `components/products/ProductGallery.tsx`
Replace the gradient-only rendering with the same conditional pattern used in `ProductCard.tsx`:
- If `product.images[0]` starts with `/` → use Next.js `<Image>` with `fill` and `object-cover`
- Otherwise → use gradient background via `getProductGradient()`

The thumbnail strip should also be updated similarly — render real images for thumbnails when available.

## Acceptance Criteria
1. `ProductGallery` displays the real image (e.g. `/laura-set-royal-emerald-1.jpg`) when `product.images[0]` starts with `/`
2. Gradient fallback still works for products without real images
3. Gallery navigation (arrows, thumbnails) still functions
4. `pnpm run lint && pnpm run typecheck && pnpm run build` all pass
5. No file exceeds 200 lines
