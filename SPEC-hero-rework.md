# SPEC.md — HeroSection Rework (PR 10 Fixes)

## Context
Rework `HeroSection.tsx` to fix critical architect review findings from `hero-review.md`.

## File to Modify
- `components/home/HeroSection.tsx`

## Design Direction
Option A from review: **Images full-bleed above, text in dark zone below.**
- Mobile: 2 stacked images, each exactly 50vh (100vh total = one screen)
- Desktop: 2 side-by-side images, full viewport height
- Text block BELOW the image grid on the `#0D0D0D` background

## Layout Target

### Desktop
```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   Lora Set           │   Naya Jump Suite    │
│                      │                      │
└──────────────────────┴──────────────────────┘
          WEAR YOUR STORY
  Bold prints. Contemporary style.
      [SHOP NOW]   Custom Orders
```

### Mobile
```
┌─────────────────────────┐
│   Lora Set (50vh)       │
└─────────────────────────┘
┌─────────────────────────┐
│   Naya Jump Suite (50vh)│
└─────────────────────────┘
   WEAR YOUR STORY
   [SHOP NOW]  Custom Orders
```

## Changes Required

### 1. Mobile Viewport-Height Containment (CRITICAL)
**File:** `HeroSection.tsx`
- Remove `aspect-[3/4]` from image container
- Use `h-[50vh]` on mobile, `md:min-h-screen` on desktop
- Both images exactly 50vh each on mobile (100vh total = first viewport)

### 2. Text Block Below Image Grid (CRITICAL)
**File:** `HeroSection.tsx`
- Remove absolute-positioned text overlay
- Move text to a dark zone (`bg-black`) below the image grid
- Image grid and text are siblings in a vertical flex/grid layout
- Desktop: images side-by-side (50/50), text below centered
- Mobile: images stacked (100vw), text below centered

### 3. Text Shadow on Headline (CRITICAL)
**File:** `HeroSection.tsx`
Add to h1:
```tsx
style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)" }}
```

### 4. Hardcoded Brand Colors → CSS Variables (HIGH)
Replace all hardcoded hex with CSS variable classes:
- `text-[#C9A84C]` → `text-gold`
- `text-[#F5F0E8]` → `text-cream`
- `bg-[#0D0D0D]` → `bg-black`
- `border-[#C9A84C]/40` → `border-gold/40`
- `bg-[#C9A84C]` → `bg-gold`
- `text-cream/80` → `text-cream/80` (already correct)
- `shadow-[#C9A84C]/20` → `shadow-gold/20`

### 5. Add Secondary CTA "Custom Orders" (HIGH)
From `HeroParallax.tsx`, add a secondary CTA:
```tsx
<a
  href="mailto:hello@printsbytee.co.uk"
  className="inline-flex items-center gap-2 text-cream/80 hover:text-gold text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 border-b border-cream/30 hover:border-gold pb-0.5"
>
  Custom Orders
</a>
```
Place next to (or below) the Shop Now button.

### 6. Add Scroll Indicator (HIGH)
From `HeroParallax.tsx` (bouncing dot + "Scroll" text):
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.6 }}
  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
>
  <motion.div
    animate={{ y: [0, 14, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    className="flex flex-col items-center gap-2"
  >
    <span className="text-cream/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
    <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
  </motion.div>
</motion.div>
```
The scroll indicator should be at the very bottom of the hero section (after the CTAs).

### 7. prefers-reduced-motion (MEDIUM)
Add `prefers-reduced-motion` check to Framer Motion animations — if user prefers reduced motion, skip the bounce animation on the scroll indicator.

## Component Structure
```
<section>
  {/* Image Grid — full viewport */}
  <div className="grid grid-cols-1 md:grid-cols-2">
    {HERO_IMAGES.map(image => (
      <div className="h-[50vh] md:min-h-screen">
        <Image fill object-cover />
        <div className="gradient overlay" />
      </div>
    ))}
  </div>

  {/* Text Zone — dark background below images */}
  <div className="bg-black py-16 md:py-24 px-4">
    <div className="text-center max-w-2xl mx-auto">
      <span className="...">Ready-to-Wear African Fashion</span>
      <h1 className="..." style={{ textShadow }}>WEAR YOUR STORY</h1>
      <p className="...">Bold prints. Contemporary style.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/products" className="bg-gold ...">Shop Now</Link>
        <a href="mailto:..." className="text-cream ...">Custom Orders</a>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <motion.div className="...">...</motion.div>
</section>
```

## Acceptance Criteria
- [ ] Mobile: both images fit in first viewport (50vh each, no scroll required)
- [ ] Text appears BELOW image grid on dark background
- [ ] Headline has text-shadow for readability
- [ ] All hardcoded hex colors replaced with CSS variable classes
- [ ] Two CTAs: "Shop Now" + "Custom Orders"
- [ ] Scroll indicator with bouncing animation
- [ ] `prefers-reduced-motion` respected
- [ ] `pnpm run lint` passes with 0 errors
- [ ] `pnpm run typecheck` passes with 0 errors
- [ ] `pnpm run build` succeeds
- [ ] File ≤ 200 lines (split if needed)
- [ ] Architect gate (opencode gpt-5.3-codex) passes with 0 Critical/High
