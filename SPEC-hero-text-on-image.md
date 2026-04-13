# Hero Section — Text-On-Image Redesign

## What
Restructure HeroSection.tsx so text overlays ON the two images instead of being in a separate section below. This is a reversal of the previous rework.

## Direction
- Text floats over the images with a full-sides dark vignette gradient so text is readable on any image background
- Keep the same 2-image grid layout (50vh each on mobile, side-by-side on desktop)
- Keep dual CTAs (Shop Now + Custom Orders), scroll indicator, brand tag

## Tech
- Next.js + TypeScript + Tailwind CSS
- Framer Motion for entrance animations (entrance stagger, scroll bounce)
- Brand colors: gold `#C9A84C`, cream `#F5F0E8`, black `#0D0D0D` (CSS variable classes preferred)
- `next/image` with `fill` + `object-cover`

## Files
- `components/home/HeroSection.tsx` — primary rewrite

## Layout

### Mobile
- Two stacked images, 50vh each (no scrolling to see second image)
- Each image cell has its own text overlay (visible on both)
- Gradient vignette ensures text readability on any background

### Desktop
- Side-by-side images (50vw each, min-h-screen)
- Text overlay centered over BOTH images with full vignette protection
- Headline + subhead + CTAs all over the images

## Overlay Strategy
**Gradient vignette on each image cell** — dark from all sides fading to center:
```
background: radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.85) 100%)
```
Plus a subtle directional gradient at bottom for transition.

## Motion
- Staggered entrance: brand tag → headline → subhead → CTAs
- Scroll indicator bounces (disabled if prefers-reduced-motion)
- Image subtle scale on hover (desktop only)

## Typography
- Brand tag: `text-gold text-xs tracking-[0.4em] uppercase font-semibold` with thin border
- Headline: `font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream`
- Subhead: `text-cream/80 text-base sm:text-lg`
- Use `text-cream` / `text-gold` CSS vars, not hardcoded hex

## Acceptance Criteria
- [ ] Text overlays on images (not below)
- [ ] Mobile: 50vh per image, no scroll needed to see second image
- [ ] Desktop: side-by-side images, text centered over both
- [ ] Text readable on both images (vignette gradient)
- [ ] Dual CTAs preserved (Shop Now + Custom Orders)
- [ ] Scroll indicator preserved
- [ ] Framer Motion entrance animation (staggered)
- [ ] `prefers-reduced-motion` respected
- [ ] No file exceeds 200 lines
- [ ] `pnpm run lint && pnpm run typecheck && pnpm run build` all pass

## Constraint
Branch: `origin/feat/hero-redesign` — push only to this branch.