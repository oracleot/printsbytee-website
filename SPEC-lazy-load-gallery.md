# SPEC.md — Lazy Load Product Gallery with Blur Placeholder

## What

Implement lazy loading for the PrintsbyTee product gallery with a blur-up placeholder effect. The gallery should display a blurred low-resolution version of the image while loading, then smoothly transition to the full image when loaded. Uses Intersection Observer for performance and handles loading/error states gracefully.

## Tech

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion (already in use)
- **Image Loading**: `next/image` with blur placeholder support
- **Lazy Loading**: Intersection Observer API
- **Pattern**: Custom `LazyImage` component encapsulating blur + lazy load logic

## Files Affected

### New Files
- `components/products/LazyImage.tsx` — Reusable lazy image component with blur placeholder

### Modified Files
- `components/products/ProductGallery.tsx` — Use `LazyImage` instead of raw `Image`

## Component: LazyImage

### Props
```ts
interface LazyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  gradientFallback?: string; // CSS gradient string for non-image src
}
```

### Behavior
1. **Initial State**: Shows a blurred, low-res placeholder (blur-up effect via CSS filter)
2. **Intersection Observer**: Only loads full image when component enters viewport
3. **Loading State**: Smooth opacity transition (0.5 → 1) once image loads
4. **Error State**: Falls back to gradient background if image fails
5. **Blur Transition**: Uses CSS `filter: blur()` and `transform: scale()` for blur-up effect

### CSS Classes for Blur Effect
- Container: `relative overflow-hidden`
- Placeholder: `absolute inset-0 bg-cream/50` with `filter: blur(20px) scale(1.1)`
- Loaded image: `opacity-100 transition-opacity duration-500`

## Acceptance Criteria

- [ ] `LazyImage` component created and exported
- [ ] `ProductGallery` uses `LazyImage` for main image and thumbnails
- [ ] Images lazy-load only when entering viewport (Intersection Observer)
- [ ] Blur placeholder visible while image loads
- [ ] Smooth transition from blur to full image (fade-in effect)
- [ ] Error state handled gracefully (gradient fallback)
- [ ] Loading and error states accessible (alt text, aria)
- [ ] No file exceeds 200 lines
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes  
- [ ] `pnpm run build` succeeds
