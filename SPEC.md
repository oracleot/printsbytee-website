# PrintsbyTee Sprint 2 — SPEC.md

## Project Context
African print ready-to-wear fashion brand. Next.js 14, TypeScript, Tailwind CSS, Framer Motion.

## Brand Palette
- Obsidian Black: #0D0D0D
- Rose Gold: #C9A84C
- Warm Cream: #F5F0E8
- Deep Emerald: #1B4D3E
- Terracotta: #C75B39
- Gold accent: #C9A84C (used as `gold` in Tailwind)

Typography: Playfair Display (headings), DM Sans (body)

---

## TASK 1: Replace "PbT" text logo with SVG logo in Header

**Files:**
- `components/layout/Header.tsx` — replace inline SVG `<text>` logo with proper `<img>` referencing `/logo.svg`
- `components/layout/Footer.tsx` — replace inline SVG `<text>` logo with `<img>` referencing `/logo.svg`
- Search for any other "PbT" text occurrences across codebase

**Spec:**
- Header: Logo in `<Link href="/">` tag, links to home (`/`). Use `<Image>` from next/image or plain `<img>` tag with `src="/logo.svg"` (the SVG file already exists at `/public/logo.svg`)
- Footer: Same logo treatment, also wrapped in `<Link href="/">`
- Logo must be clickable and navigate home
- Maintain current sizing/positioning — just swap the text-based SVG for the proper logo SVG file

---

## TASK 2: Aceternity UI Exploration Plan (NO INSTALL — document only)

**File to create:** `workflow-artifacts/sprint-2-plan.md`

Document 3-5 Aceternity components that would elevate the PrintsbyTee homepage fitting the Afro-Luxe Modern brand. For EACH component include:
- Component name from Aceternity
- Where it would go on the homepage
- ASCII/text mockup sketch
- Visual description

**Components to evaluate:**
- Bento Grid / Feature Sections (product showcase layout)
- Parallax Hero Images (hero section with African print imagery)
- Infinite Moving Cards (testimonials or product carousel)
- Sparkles (background effect for hero)
- Tracing Beam (animated beam for section headers)
- Hero Highlight (hero text with highlight effect)
- Card Spotlight (product cards with spotlight effect)
- Sticky Scroll Reveal (sticky sections for storytelling)
- Animated Testimonials (customer testimonials section)
- Background Beams (hero background effect)

**Do NOT install Aceternity UI — only document the plan.**

---

## TASK 3: Move WhatsApp floating button up

**File:** `components/shared/WhatsAppButton.tsx`

**Spec:**
- Currently `bottom-6 right-6` — the button blocks "Ready to Wear" text when scrolled to bottom
- Change to `bottom-20 right-6` or higher (`bottom-24 right-6`) so it floats well above the fold area bottom edge
- The button should still be visible and accessible but not overlap the main content when scrolling
- Keep all existing styling (green WhatsApp button, motion animations, etc.)

---

## TASK 4: Rework the Footer

**File:** `components/layout/Footer.tsx`

**Spec:**
- Match Afro-Luxe Modern brand aesthetic
- Use the `PatternDivider` (Adinkra pattern) as a decorative top element (between dark footer and page content above)
- Include:
  - Logo (use `/logo.svg` via `<img src="/logo.svg">`) wrapped in `<Link href="/">`
  - Nav links: Home, Products, Contact (each wrapped in `<Link>`)
  - Social icons: Instagram (@printsbytee), Facebook (@printsbytee), TikTok (@printsbytee) using existing SocialIcons component
  - Copyright line: `© {year} PrintsbyTee. All rights reserved.`
  - Brand tagline: e.g., "Ready-to-Wear fashion for bold and beautiful African women."
- Dark background (`bg-black text-cream`) — maintain existing
- Responsive layout: stack on mobile, side-by-side on larger screens
- Rose Gold (`text-gold`) for section headers/labels

---

## TASK 5: Fix Quick View button hover trigger

**File:** `components/products/ProductCard.tsx`

**Spec:**
- Currently Quick View button only shows when hovering at a certain position
- Fix: show Quick View as soon as user hovers on ANY part of the product image or the product name
- The entire card/image area (`.group` container) should trigger the hover state
- Currently uses `group-hover:bg-black/30` on a div and `whileHover` on the Quick View div
- The issue is the Quick View overlay div only covers part of the image area
- Make the overlay cover the full image container (`absolute inset-0` on the hover overlay div)
- Ensure Quick View button appears when hovering either the image OR the product name

---

## TASK 6: Mobile hamburger → full height menu

**File:** `components/layout/Header.tsx`

**Spec:**
- Currently the mobile menu is `md:hidden` and uses AnimatePresence with height animation (accordion style)
- Implement a full-height slide-out mobile menu overlay — reference the suleclaw agency website style
- The menu should:
  - Use `fixed inset-0` to cover full screen when open
  - Animated open/close transition (e.g., slide from right or fade in)
  - Logo at top (left aligned)
  - Full-height nav links: Home, Products, Contact — large, easy to tap (stacked vertically)
  - Social icons below nav links (Instagram, Facebook, TikTok)
  - Close button (X) at top right
  - Semi-transparent backdrop behind menu (optional)
- Use Framer Motion for smooth animation
- Keep desktop view unchanged
- Mobile menu button trigger remains the hamburger icon button

---

## TASK 7: File refactors (split files > 200 lines)

**Files to refactor:**

### A: `app/contact/page.tsx` (380 lines → split into focused modules)
Split into:
- `app/contact/page.tsx` — imports and exports ContactPage (Suspense wrapper only, ~15 lines)
- `components/contact/ContactForm.tsx` — form component with useSearchParams and form logic
- `components/contact/ContactHero.tsx` — Hero Header section
- `components/contact/ContactInfo.tsx` — Contact info panel (email, WhatsApp, social links)
- `components/contact/ContactSuccess.tsx` — Success state component

### B: `components/products/ProductInfo.tsx` (208 lines → split into focused modules)
Split into:
- `components/products/ProductInfo.tsx` — main component (orchestrator, ~80 lines)
- `components/products/ProductSizeSelector.tsx` — size selection UI
- `components/products/ProductAccordion.tsx` — product details/sizing/care accordion
- `components/products/ProductCTA.tsx` — enquiry button, notify me, WhatsApp link

**Rules:**
- shadcn/ui `components/ui/select.tsx` is EXEMPT (third-party library code)
- All new files must be ≤200 lines
- Preserve all existing imports, props, and functionality
- No logic changes — only structural reorganization

---

## Acceptance Criteria (All Tasks)

- [ ] Header and Footer use `/logo.svg` (not inline text SVG)
- [ ] Logo in Header and Footer links to home (`/`)
- [ ] Aceternity UI plan documented in `workflow-artifacts/sprint-2-plan.md`
- [ ] WhatsApp button positioned higher (no longer blocking content)
- [ ] Footer redesigned with logo, nav, social icons, Adinkra divider, tagline
- [ ] Quick View shows when hovering any part of product image or name
- [ ] Mobile menu is full-height slide-out overlay
- [ ] `app/contact/page.tsx` split into focused modules (all ≤200 lines)
- [ ] `components/products/ProductInfo.tsx` split into focused modules (all ≤200 lines)
- [ ] `pnpm run lint` passes with 0 errors
- [ ] `pnpm run typecheck` passes with 0 errors
- [ ] `pnpm run build` succeeds
