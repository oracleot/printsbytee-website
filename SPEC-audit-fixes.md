# SPEC — PrintsbyTee Audit Quick Wins

## Goal
Fix all MEDIUM and LOW severity findings from the OWASP audit that are quick to implement.

## Files to Modify

### 1. components/home/BentoGrid.tsx
**Fixes:** L4 (unused React import)
- Remove `import React from "react";`

### 2. components/products/NotifyMeModal.tsx
**Fixes:** L6 (autoComplete), L5 (callback typing)
- Add `autoComplete="email"` to the email `<Input>`
- Wrap `onOpenChange` as `(open: boolean) => { if (!open) handleClose(); }`

### 3. components/products/ProductGrid.tsx
**Fixes:** M6 (aria-pressed), M7 (aria-live), L1 (type="button")
- Add `type="button"` to all filter `<button>` elements
- Add `aria-pressed={activeFilter === filter.value}` to filter buttons
- Add `aria-live="polite"` to the product count `<p>`

### 4. app/products/[slug]/page.tsx
**Fixes:** M8 (aria-label on breadcrumb)
- Add `aria-label="Breadcrumb"` to the `<nav>` element

### 5. components/products/ProductCard.tsx
**Fixes:** M1 (image index), M4 (price nullability)
- Change `product.images[0].startsWith("/")` to `product.images?.[0]?.startsWith("/") ?? false`
- Change `{product.price && (...)}` to `{product.price !== null && (...)}`

### 6. components/home/FeaturedProducts.tsx
**Fixes:** M2 (image index), M5 (price nullability)
- Change `product.images[0].startsWith("/")` to safe resolver with fallback gradient
- Change `{product.price && (...)}` to `{product.price !== null && (...)}`

### 7. components/home/BentoGrid.tsx
**Fixes:** M3 (image key safety when building bentoItems)
- When building `bentoItems`, use `product.images?.[0] ?? 'gradient-emerald-gold'` as the imageKey

### 8. components/products/ProductGallery.tsx
**Fixes:** L7 (prefers-reduced-motion), L8 (stable keys)
- Import `useReducedMotion` from `framer-motion` and use it to disable transitions when user prefers reduced motion
- Change thumbnail `key={index}` to `key={\`${product.id}-thumb-\${index}\`}`

## Acceptance Criteria
- All lint checks pass
- All typecheck passes
- Build succeeds
- No new runtime errors introduced
