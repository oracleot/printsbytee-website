You are the security architect reviewing a PR for the PrintsbyTee Next.js website.

## Files to Review

### File 1: components/home/HeroSection.tsx
```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HeroOverlay } from "./HeroOverlay";

const HERO_IMAGES = [
  {
    src: "/lora-set-turquoise.jpg",
    alt: "Lora Set in Turquoise — bold ankara print",
  },
  {
    src: "/naya-jump-suite.jpg",
    alt: "Naya Jump Suite — structured and elegant",
  },
];

/** Radial vignette — dark from all edges, transparent center */
const VIGNETTE =
  "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.85) 100%)";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* ── Image grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className="relative w-full h-[50vh] md:min-h-screen overflow-hidden group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Radial vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: VIGNETTE }}
            />

            {/* Bottom gradient for section transition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* ── Mobile text overlay (per image cell) ──── */}
            {index === 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center md:hidden">
                <HeroOverlay reducedMotion={prefersReducedMotion} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop text overlay (centered over both images) ── */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
        <HeroOverlay reducedMotion={prefersReducedMotion} />
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 1.2, duration: 0.6 }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={
            prefersReducedMotion ? { opacity: 0 } : { y: [0, 14, 0] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center gap-2"
        >
          <span className="text-cream/60 text-xs tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

### File 2: components/home/HeroOverlay.tsx
```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const instant = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  transition: { duration: 0 },
};

interface HeroOverlayProps {
  reducedMotion: boolean | null;
}

export function HeroOverlay({ reducedMotion }: HeroOverlayProps) {
  const f = (delay: number) => (reducedMotion ? instant : fade(delay));

  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
      <motion.span
        {...f(0.1)}
        className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 border border-gold/40 px-4 py-1"
      >
        Ready-to-Wear African Fashion
      </motion.span>

      <motion.h1
        {...f(0.3)}
        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-[0.92] tracking-tight"
        style={{
          textShadow:
            "0 2px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)",
        }}
      >
        WEAR YOUR <span className="text-gold">STORY</span>
      </motion.h1>

      <motion.p
        {...f(0.5)}
        className="text-cream/80 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
      >
        Bold prints. Contemporary style. African heritage, reimagined
        for the modern woman.
      </motion.p>

      <motion.div
        {...f(0.7)}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-gold text-black px-10 py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-cream transition-all duration-300 shadow-xl shadow-gold/20 hover:shadow-gold/40"
        >
          Shop Now
          <ArrowRight className="w-5 h-5" />
        </Link>
        <a
          href="mailto:hello@printsbytee.co.uk"
          className="inline-flex items-center gap-2 text-cream/80 hover:text-gold text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 border-b border-cream/30 hover:border-gold pb-0.5"
        >
          Custom Orders
        </a>
      </motion.div>
    </div>
  );
}
```

## Your Task

Perform a thorough architect review covering:

### Security (OWASP Top 10)
- Injection, XSS, CSRF risks
- Auth/authorization patterns
- Secrets exposure
- Unsafe DOM operations

### Performance
- Bundle size / dead code concerns
- Image optimization (next/image fill usage)
- Animation performance (framer-motion GPU usage)
- N+1 or redundant renders

### Accessibility / UX
- WCAG AA contrast (cream text on dark backgrounds)
- Keyboard navigation / focus indicators
- prefers-reduced-motion handling
- Screen reader support (alt text, aria labels)

### Architecture
- Component separation concerns
- TypeScript correctness
- Next.js conventions compliance

## Output Format

For each finding, specify:
- **Severity:** Critical / High / Medium / Low
- **File:** filename
- **Line:** line number reference
- **Description:** what's wrong
- **Recommendation:** how to fix

Then give a summary:
```
CRITICAL: 0
HIGH: 0
MEDIUM: 0
LOW: 0
```

If all zero, say "Architect gate PASSED — 0 Critical / 0 High"