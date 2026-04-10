# SPEC.md — PrintsbyTee Hero Section Redesign

## What
Redesign the hero section to a bold 2-image side-by-side layout using the brand's black/gold/cream palette. The hero should feel like a seamless continuation of the nav — one continuous surface from nav into hero.

## Design Direction
- **Layout:** Two product images side by side (50/50 split), full-width, full-bleed
- **Background:** `#0D0D0D` (near-black) — seamless blend from nav into hero
- **Accent:** Gold (`#C9A84C`) for CTA button
- **Images:** Next.js `<Image>` with `fill` + `object-fit: cover`
- **Mobile:** Single column, full-width stacked images
- **Brand colours:** #0D0D0D (black), #C9A84C (gold), #F5F0E8 (cream)

## Images
Pick 2 strong product shots from `public/`:
- Primary: `lora-set-turquoise.jpg` (Lora Set Turquoise — standout hero piece)
- Secondary: `naya-jump-suite.jpg` (Naya Jump Suite — bold, structured)
- Both are local images in `public/` — no remote domain config needed

## Tech
- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4 with CSS variables
- Framer Motion for subtle entrance animation
- Lucide React for icons
- `font-heading` = Playfair Display, `font-sans` = DM Sans (from globals.css)
- No external dependencies beyond what's already installed

## Files to Create / Modify

### 1. Create `components/home/HeroSection.tsx`
New component replacing `HeroParallax` on homepage:
- Full-width container, `min-h-screen`, `bg-[#0D0D0D]`
- Two-column grid on desktop (`grid-cols-2`), single column on mobile
- Each column: full-height image container with `position: relative`, `overflow-hidden`
- Next.js `<Image fill object-fit="cover">` for each image
- Subtle scale animation on image hover (CSS transition, not JS)
- Text overlay below or on top of images:
  - "PRINTSSBYTEE" (or "WEAR YOUR STORY") as brand name
  - Tagline: "Bold prints. Contemporary style. African heritage, reimagined."
  - Gold "SHOP NOW" CTA button linking to `/products`
- On mobile: stack vertically, full-width images

### 2. Modify `app/page.tsx`
- Replace `import { HeroParallax } from "@/components/home/HeroParallax"` with `import { HeroSection } from "@/components/home/HeroSection"`
- Replace `<HeroParallax />` with `<HeroSection />`

### 3. Optional: `components/layout/Header.tsx` — nav style adjustment
If needed to blend with hero (nav currently cream `#F5F0E8`), optionally update the nav background to match the hero for a seamless dark theme. However, the nav is cream in the current design — check if it should stay cream and hero transitions from cream OR if nav should also go dark.
> **Decision:** Keep nav as cream (`bg-cream`) as it's already live. Hero starts at `#0D0D0D`. The visual blend is achieved by a gradient transition strip or by the hero content starting well below the fold. No nav changes needed.

## Component Structure — HeroSection.tsx

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMAGES = [
  { src: "/lora-set-turquoise.jpg", alt: "Lora Set in Turquoise — bold ankara print" },
  { src: "/naya-jump-suite.jpg", alt: "Naya Jump Suite — structured and elegant" },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0D0D0D] overflow-hidden">
      {/* 2-column image grid — full viewport height on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-screen overflow-hidden group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle dark overlay at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 md:opacity-80" />
          </div>
        ))}
      </div>

      {/* Centered text overlay — absolute positioned */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 border border-gold/40 px-4 py-1">
            Ready-to-Wear African Fashion
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-[0.92] tracking-tight">
            WEAR YOUR <span className="text-gold">STORY</span>
          </h1>
          <p className="text-cream/80 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Bold prints. Contemporary style. African heritage, reimagined for the modern woman.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gold text-black px-10 py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-cream transition-all duration-300 shadow-xl shadow-gold/20 hover:shadow-gold/40"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

## Acceptance Criteria
- [ ] `HeroSection.tsx` renders 2 images side by side (50/50) on desktop
- [ ] Images stack to single column on mobile (`grid-cols-1 md:grid-cols-2`)
- [ ] Background is `#0D0D0D` for seamless nav→hero blend
- [ ] CTA button is gold (`#C9A84C` via `bg-gold`) with hover state
- [ ] Brand name "WEAR YOUR STORY" is displayed in cream/gold
- [ ] Framer Motion entrance animation on text
- [ ] Next.js `<Image fill>` with `object-fit: cover` for both images
- [ ] `app/page.tsx` imports and renders `<HeroSection />` instead of `<HeroParallax />`
- [ ] `pnpm lint` passes with 0 errors
- [ ] `pnpm build` succeeds
- [ ] No file exceeds 200 lines
- [ ] Architect review gate (opencode + gpt-5.3-codex) passes with 0 Critical/High
- [ ] PR raised to `feat/hero-redesign` for Dami to review
