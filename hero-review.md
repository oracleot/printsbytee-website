# Hero Section Redesign — Comprehensive Review
**PR:** 10 | **Branch:** pr10 | **Base:** origin/feat/printsbytee-mvp
**Author:** Software Architect subagent
**Date:** 2026-04-11

---

## Executive Summary

The current HeroSection.tsx implementation has **critical layout and UX issues** that fail the spec requirements, particularly around mobile viewport-height containment, text-on-image readability, and overall conversion design. The hero redesign is not production-ready and requires significant rework before merging.

---

## Critical Issues

### 1. Mobile Stacked Images — Viewport Height NOT Contained ❌

**File:** `components/home/HeroSection.tsx:19`
```tsx
className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-screen overflow-hidden group"
```

**Problem:** The mobile image container uses `aspect-[3/4]` which means each image is sized to a 3:4 aspect ratio, NOT constrained to viewport height. Two stacked 3:4 images will be ~1.5x the viewport height, causing the second image to require scrolling.

**Fix required:**
- Remove `aspect-[3/4]` on mobile
- Use `h-[50vh]` (or `min-h-[50vh]`) on each image column for mobile
- Both images must be viewport-height-contained on mobile (50vh each = 100vh total)

---

### 2. Text Overlay Covers Product Images — No Clear Hierarchy ❌

**File:** `components/home/HeroSection.tsx:32-42`

**Problem:** The text overlay is absolutely positioned over the **entire** section, centered on top of BOTH images simultaneously. This creates two major issues:

1. **Text readability suffers** — product photography has varied, complex backgrounds. A centered gold/cream headline over colorful ankara prints will have poor contrast regardless of gradient.
2. **Images are obscured** — the defining feature of the redesign (2 bold product images) is buried under text. Users can't see what they're being sold.

**SPEC violation:** The spec explicitly says "Text overlay below **or** on top of images" — "below OR on top" implies text should be in a clear zone, not floating ambiguously over image content.

---

### 3. Gradient Overlay Insufficient for Text Readability ❌

**File:** `components/home/HeroSection.tsx:28-29`
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 md:opacity-80" />
```

**Problem:** The gradient only darkens the bottom-to-top direction. The centered text will land in the middle of the images where the gradient is essentially transparent (`via-transparent`). Varied product backgrounds (turquoise, patterned ankara, etc.) will make the headline illegible.

**HeroParallax.tsx:53** handles this correctly with text shadow:
```tsx
style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5), 0 1px 8px rgba(0,0,0,0.3)" }}
```

**HeroSection.tsx has no text shadow** — the hardcoded color values (`text-[#F5F0E8]`) provide no protection against varying image backgrounds.

---

### 4. CTA Button — Weak Conversion Design ⚠️

**File:** `components/home/HeroSection.tsx:50`

**Problem:** Single "Shop Now" CTA without social proof or secondary action. The HeroParallax (the OLD hero) has TWO CTAs:
- Primary: "Shop Now" button
- Secondary: "Custom Orders" email link

For a high-consideration fashion purchase, dual CTAs increase conversion by capturing both "ready to buy" and "browsing with intent" users. Removing the secondary CTA was a regression.

---

### 5. No Scroll Indicator on New Hero ❌

**File:** `components/home/HeroSection.tsx` (missing)

The old `Hero.tsx:67-77` had a scroll indicator with bouncing dot animation. The spec or the brief didn't mention scroll indicator, but removing it entirely loses a key UX affordance for first-time visitors who may not know the page continues.

---

## Layout Analysis

### Desktop Layout: Mostly Correct ✅ (with text overlay issue)

```
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────┬───────────────────────┐         │
│  │                       │                       │  ← 50vw │
│  │   Lora Set Turquoise   │   Naya Jump Suite     │         │
│  │   (Image fill+cover)   │   (Image fill+cover)  │         │
│  │                       │                       │         │
│  │   gradient overlay ──────────────────────────  │         │
│  └───────────────────────┴───────────────────────┘         │
│                    TEXT OVERLAY (centered)                  │
│              "WEAR YOUR STORY" + "Shop Now"                 │
└─────────────────────────────────────────────────────────────┘
```

**Issue:** Text centered over split images = half the text lands on each image. Headline "WEAR YOUR" reads over left image, "STORY" over right. Broken visual hierarchy.

---

### Mobile Layout: BROKEN ❌

```
┌─────────────────────────┐
│                         │
│   Lora Set (3:4 ratio)  │  ← TALLER than 50vh
│                         │
│   gradient at bottom    │
└─────────────────────────┘
┌─────────────────────────┐
│                         │
│   Naya Jump Suite        │  ← REQUIRES SCROLL — FAILS SPEC
│   (3:4 ratio)            │
│                         │
└─────────────────────────┘
      ↓ scroll required
```

**Current code:**
```tsx
className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-screen overflow-hidden group"
```

---

## Rework Specifications

### Mobile Layout (FIXED)

```
┌─────────────────────────┐
│                         │
│   Lora Set (50vh)       │  ← EXACTLY 50vh, overflow hidden
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│                         │
│   Naya Jump Suite (50vh)│  ← EXACTLY 50vh, overflow hidden
│                         │
└─────────────────────────┘
      ↓ (after scrolling)
   StickyScrollReveal
```

**CSS:**
```css
/* Mobile: 50vh per image, no aspect ratio forcing */
@media (max-width: 767px) {
  .hero-image-cell {
    height: 50vh;
    min-height: 50vh;
  }
}

/* Desktop: full height */
@media (min-width: 768px) {
  .hero-image-cell {
    min-height: 100vh;
  }
}
```

---

### Desktop Layout (SUGGESTED ALTERNATIVE)

The centered text overlay over split images creates legibility problems. Two recommended approaches:

**Option A: Text Below Images** (Recommended for Afro-Luxe brand)
```
┌────────────────────────────────────────────────────────┐
│  ┌──────────────────────┬──────────────────────┐       │
│  │                      │                      │       │
│  │   Lora Set           │   Naya Jump Suite     │       │
│  │                      │                      │       │
│  └──────────────────────┴──────────────────────┘       │
│                                                        │
│            WEAR YOUR STORY                             │
│  Bold prints. Contemporary style.   [SHOP NOW]         │
│                                                        │
└────────────────────────────────────────────────────────┘
```
Text moves BELOW the image grid into the dark background zone. Images are full-bleed hero, not obscured.

**Option B: Side-by-Side with Split Text**
```
┌─────────────────────┬─────────────────────┐
│  WEAR YOUR          │                     │
│  STORY              │   [IMAGE]           │
│                     │                     │
│  Bold prints...     │                     │
│  [SHOP NOW]         │                     │
├─────────────────────┼─────────────────────┤
│                     │   WEAR YOUR         │
│   [IMAGE]           │   STORY            │
│                     │                     │
│                     │  Bold prints...    │
│                     │  [SHOP NOW]        │
└─────────────────────┴─────────────────────┘
```
Each image paired with its own text block. Text reads over the dark background (not the image).

---

### Image Sourcing Guidance

**Required images (from SPEC):**
- `lora-set-turquoise.jpg` — already in `public/`
- `naya-jump-suite.jpg` — already in `public/`

**Image dimension requirements:**

| Context | Width | Height | Aspect Ratio | Notes |
|---------|-------|--------|--------------|-------|
| Desktop left/right (each) | 1920px (ideal) | 1080px+ | 16:9 or wider | Full-bleed, object-fit: cover handles cropping |
| Mobile stacked (each) | 800px (min) | 1067px | 3:4 | Must be at least 50vh × 100vw when displayed |

**Better image selection for Afro-Luxe:**
The SPEC picks `lora-set-turquoise.jpg` and `naya-jump-suite.jpg`. Verify these are suitable hero images (standalone product shots on clean/dark backgrounds, not busy editorial shots). If they have light/white backgrounds, they'll blend poorly with the `#0D0D0D` background.

**Alternative hero images to consider:**
- `aso-oke-kimono-set.jpg` — structured, luxurious feel
- `laura-set-royal-emerald-1.jpg` — rich emerald + royal gold tones

---

### Gradient/Overlay Treatment

**Current implementation:**
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 md:opacity-80" />
```

**Problems:**
- Only vertical gradient (bottom dark → top transparent)
- Center of image (where text would be) has ~0% overlay darkness
- `md:opacity-80` breakpoint at 768px means tablet/mobile get 60%, desktop gets 80%

**Recommended gradient approach (Option A — text below images):**
If text moves BELOW the image grid, the gradient only needs to transition images → text area:

```tsx
/* Bottom edge fades to black for text area transition */
<div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-70" />
/* Plus a dark zone at bottom for text */
<div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-[#0D0D0D]" />
```

**If keeping centered text overlay (Option B/C):**
Need ALL-SIDES vignette for text readability over varied backgrounds:

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/60 via-[#0D0D0D]/40 to-[#0D0D0D]/60" />
/* Plus radial vignette from center */
<div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-[#0D0D0D]/70" />
```

**Text shadow (mandatory regardless of gradient):**
```tsx
className="text-cream mb-6 leading-[0.92] tracking-tight"
style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)" }}
```

---

## Additional Improvement Suggestions

### 1. Add Brand Logo/Watermark on Hero (Afro-Luxe Positioning)
A subtle "PrintsbyTee" logo or monogram in the corner signals premium brand positioning. Many luxury fashion brands have a recognizable hero mark.

### 2. Sticky "Shop Now" CTA on Mobile Scroll
Consider a sticky bottom CTA bar on mobile that appears after scrolling past the hero. This captures "ready to buy" intent without cluttering the hero.

### 3. Trust Signals / Social Proof
Add a subtle "As seen in" or Instagram follower count / rating indicator near the CTA. Builds confidence for first-time visitors.

### 4. Revisit Typography Hierarchy
The `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` range is aggressive. On mobile, `text-5xl` at 3.75rem is very large. Verify the headline doesn't overflow on small Android devices (360px width).

### 5. Brand Color Variable Usage
HeroSection.tsx uses hardcoded hex values (`#C9A84C`, `#F5F0E8`, `#0D0D0D`) instead of CSS variable classes (`text-gold`, `text-cream`, `bg-black`). For consistency and theming flexibility, prefer:
- `text-gold` instead of `text-[#C9A84C]`
- `text-cream` instead of `text-[#F5F0E8]`
- `bg-black` instead of `bg-[#0D0D0D]`

### 6. Animation Performance
Framer Motion entrance animations are fine but ensure `will-change: transform` is not overused. On mobile, heavy animations cause jank.

### 7. Secondary CTA (Custom Orders)
For a bespoke/ready-to-wear brand, the "Custom Orders" secondary CTA (present in HeroParallax) is valuable for high-value customers who want tailored pieces.

### 8. Accessibility
- Ensure color contrast ratio meets WCAG AA for text (especially cream on image backgrounds)
- Add `aria-label` to the CTA button if the icon-only arrow doesn't have adjacent text
- `prefers-reduced-motion` media query should disable/paralyze the Framer Motion animations

---

## File:Line References

| Issue | File | Lines |
|-------|------|-------|
| Mobile aspect ratio broken | `HeroSection.tsx` | 19 |
| Text overlay position | `HeroSection.tsx` | 32-42 |
| Missing text shadow | `HeroSection.tsx` | 37-40 |
| Insufficient gradient | `HeroSection.tsx` | 28-29 |
| Single CTA only | `HeroSection.tsx` | 50 |
| No scroll indicator | `HeroSection.tsx` | (missing) |
| Hardcoded brand colors | `HeroSection.tsx` | 34, 37, 39, 47, 50 |
| Old Hero.tsx (backup) | `Hero.tsx` | all |
| Old HeroParallax.tsx | `HeroParallax.tsx` | all |
| SPEC document | `SPEC-hero-redesign.md` | all |
| Brand colors defined | `globals.css` | 42-47 |

---

## Recommendations Summary

| Priority | Issue | Action |
|----------|-------|--------|
| 🔴 CRITICAL | Mobile images exceed viewport | Fix to `h-[50vh]` per image on mobile |
| 🔴 CRITICAL | Text overlay covers images | Move text BELOW image grid OR to dedicated zones |
| 🔴 CRITICAL | No text shadow on new hero | Add `textShadow` style (HeroParallax already has it) |
| 🟠 HIGH | Gradient insufficient | Implement all-sides vignette if text stays over images |
| 🟠 HIGH | Hardcoded brand colors | Replace with CSS variable classes |
| 🟡 MEDIUM | Single CTA only | Add secondary "Custom Orders" CTA |
| 🟡 MEDIUM | No scroll indicator | Add subtle scroll affordance |
| 🟡 MEDIUM | Typography overflow risk | Test on 360px viewport |

---

## Conclusion

The HeroSection.tsx implementation partially satisfies the SPEC layout (2 images, side-by-side on desktop, stacked on mobile) but **fails on the most critical requirements**: mobile viewport-height containment and text-on-image readability. The spec's requirement that "user should NOT have to scroll to see the second image" is definitively violated by the current `aspect-[3/4]` approach.

**Do not merge PR 10 without these critical fixes.**

The review should be shared with the implementation team for rework before resubmission.
