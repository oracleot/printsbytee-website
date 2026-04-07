# PrintsbyTee Sprint 2 Implementation

## Context
Next.js 14 project at `/root/projects/printsbytee`. Branch: `feat/sprint-2`.
Brand: African print ready-to-wear. Colors: #0D0D0D, #C9A84C, #F5F0E8, #1B4D3E, #C75B39.
Typography: Playfair Display (headings), DM Sans (body).

## TASKS

### TASK 1: Replace PbT logo with SVG in Header

**Current state in `components/layout/Header.tsx`:**
The header has an inline SVG with text "PbT" (drawn with `<text>` elements):
```tsx
<svg viewBox="0 0 100 60" className="h-10 w-16" fill="currentColor">
  <text x="0" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#0D0D0D">P</text>
  <text x="30" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#C9A84C">b</text>
  <text x="50" y="45" fontFamily="serif" fontSize="42" fontWeight="bold" fill="#0D0D0D">T</text>
</svg>
```

**Also in `components/layout/Footer.tsx`:**
Similar inline SVG text logo in the footer.

**Action:**
Replace both inline SVG text logos with `<Image` from `next/image` pointing to `/logo.svg` (a proper SVG file already exists at `/public/logo.svg`).

In Header, the logo area should be:
```tsx
<Link href="/" className="flex items-center gap-2">
  <Image src="/logo.svg" alt="PrintsbyTee" width={64} height={40} className="h-10 w-auto" />
  <span className="hidden sm:block font-heading text-lg font-bold text-black">
    PrintsbyTee
  </span>
</Link>
```

In Footer:
```tsx
<Link href="/" className="flex items-center gap-2">
  <Image src="/logo.svg" alt="PrintsbyTee" width={64} height={40} className="h-10 w-auto" />
  <span className="font-heading text-xl font-bold text-cream">PrintsbyTee</span>
</Link>
```

Also search entire codebase for any other "PbT" text strings that should be replaced with the logo SVG.

**Files to modify:**
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`

---

### TASK 2: Move WhatsApp floating button higher

**File:** `components/shared/WhatsAppButton.tsx`

**Current:**
```tsx
className={`fixed bottom-6 right-6 z-50 ...`}
```

**Change to:**
```tsx
className={`fixed bottom-24 right-6 z-50 ...`}
```

This moves the button higher up so it no longer overlaps content when scrolled to bottom. Keep all other styling and functionality unchanged.

---

### TASK 3: Fix Quick View hover trigger

**File:** `components/products/ProductCard.tsx`

**Current hover overlay structure:**
The hover overlay div does NOT have `absolute inset-0` coverage, so only part of the image triggers the hover.

**Fix:** Make the hover overlay cover the entire image container and ensure it triggers on both image AND product name hover:

In the image container, add `absolute inset-0` to the hover overlay div:
```tsx
<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
```

The `.group` class is on the parent `<Link>` which also wraps the product name, so hovering the name should already trigger the image overlay via Tailwind's `group-hover`. Make sure the product name is inside the `.group` element.

If the product name is outside the `.group` Link, move it inside OR add a separate hover trigger for the Quick View on the name.

Current structure (partial):
```tsx
<Link href={`/products/${product.slug}`} className="group block">
  {/* Image Container */}
  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-cream">
    <div className="absolute inset-0 transition-transform..." />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 ...">
      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }}>
        Quick View
      </motion.div>
    </div>
  </div>
  {/* Product Info */}
  <div className="space-y-2">
    <h3 className="... group-hover:text-emerald ...">
```

The fix: Ensure the hover overlay `div` has `absolute inset-0` AND the Quick View button appears when hovering anywhere on the card (image area + name area).

---

### TASK 4: Mobile hamburger → full height menu

**File:** `components/layout/Header.tsx`

**Current:** Mobile menu uses AnimatePresence with height animation (accordion style opening downward).

**Required:** Full-height slide-out overlay menu (mobile only).

**Implementation:**
Replace the mobile menu implementation with:
- A `fixed inset-0 z-40` overlay when open
- Background backdrop (semi-transparent black)
- Menu panel that slides in from right (or left)
- Logo at top
- Nav links stacked vertically (Home, Products, Contact) — large tap targets
- Social icons below nav links
- X close button at top right
- Animated with Framer Motion (slide from right + fade backdrop)

Example structure:
```tsx
{/* Mobile Menu Backdrop */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={() => setIsMobileMenuOpen(false)}
    />
  )}
</AnimatePresence>

{/* Mobile Menu Panel */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-cream md:hidden flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="/logo.svg" alt="PrintsbyTee" width={48} height={30} />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 flex flex-col justify-center gap-6 p-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-heading font-bold text-black hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
              <social.Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

---

### TASK 5: Footer rework

**File:** `components/layout/Footer.tsx`

**Current:** Basic footer with nav links, social icons, email, copyright.

**Requirements:**
- Use `PatternDivider` as decorative top element (import and place at top of footer, between footer content and page above)
- Logo: use `<Image src="/logo.svg">` wrapped in `<Link href="/">` (same as header)
- Nav links: Home, Products, Contact
- Social icons: Instagram, Facebook, TikTok (use `SocialIcons` component — already imported)
- Copyright: `© {new Date().getFullYear()} PrintsbyTee. All rights reserved.`
- Brand tagline: "Ready-to-Wear fashion for bold and beautiful African women."
- Dark theme: `bg-black text-cream`
- Rose gold for section labels: `text-gold`
- Responsive: stack on mobile, 3-column grid on larger screens

Current footer structure uses a 3-column grid (brand, quick links, contact) — keep this layout but enhance styling and add logo + Adinkra divider.

Add `import Image from "next/image"` and import `Link` from next/link.

---

### TASK 6: Write Aceternity UI Plan

**File to create:** `workflow-artifacts/sprint-2-plan.md`

Document 5 Aceternity components for PrintsbyTee homepage. For each component:

```
## [Component Name]

**Where on homepage:** [location]

**Visual sketch:**
```
[ASCII mockup of the layout]
```

**How it elevates the Afro-Luxe Modern brand:**
[Description of why this component fits the brand aesthetic]
```

**Components to document (pick 5):**

1. **Bento Grid** — Product showcase grid with varied box sizes
   - Where: Product categories / Featured section
   - Sketches bento-style asymmetric grid for product cards

2. **Sparkles** — Animated particles/sparkle effect
   - Where: Hero section background
   - Gold sparkle particles over hero image for luxury feel

3. **Hero Parallax** — Parallax scrolling hero with images
   - Where: Hero section
   - Parallax effect as user scrolls through hero, African print fabric imagery

4. **Card Spotlight** — Product cards with spotlight reveal effect
   - Where: Product grid on homepage
   - Spotlight reveals product detail as user hovers

5. **Sticky Scroll Reveal** — Sticky sections for storytelling
   - Where: Brand story / About section
   - As user scrolls, content sticks and reveals sequentially

6. **Animated Testimonials** — Testimonials with elegant animations
   - Where: Social proof section
   - Customer testimonials with smooth fade/slide animations

7. **Text Generate Effect** — Text that generates on page load
   - Where: Hero headline
   - Headline text generates with typewriter effect

8. **Background Beams** — Animated beam rays in background
   - Where: Hero section
   - Subtle beam rays emanating from corners for dramatic effect

9. **Parallax Hero Images** — Mouse-driven parallax on hero images
   - Where: Hero
   - African print fabric images with mouse-driven depth effect

10. **Spotlight** — Spotlight effect for hero
    - Where: Hero
    - Spotlight reveals content as user moves mouse

For EACH include: component name, where on homepage, ASCII sketch, brand fit explanation.

---

### TASK 7: File refactors — split files > 200 lines

#### A. `app/contact/page.tsx` (380 lines → split into modules)

Create directory `components/contact/` and split:

**File 1: `app/contact/page.tsx`** (~20 lines)
- Keeps only the export default function wrapping in Suspense
- Imports and renders `ContactFormInner` from `components/contact/ContactForm.tsx`

**File 2: `components/contact/ContactForm.tsx`** (~100 lines)
- The `<form>` element with all form fields (name, email, productInterest, message)
- All form state (useState for formData, errors, status, errorMessage)
- All event handlers (handleSubmit, handleChange, validateForm)
- Imports: React, motion/AnimatePresence, form fields, icons

**File 3: `components/contact/ContactHero.tsx`** (~60 lines)
- Hero Header section with decorative pattern background
- Title: "Contact Us", subtitle text
- Uses PatternDivider

**File 4: `components/contact/ContactInfo.tsx`** (~80 lines)
- Left side: contact info (email link, WhatsApp link, social icons)
- Brand story quote snippet
- Uses SocialIcons

**File 5: `components/contact/ContactSuccess.tsx`** (~30 lines)
- Success state after form submission
- CheckCircle icon + success message

Note: The `useSearchParams` hook must stay in a component inside `<Suspense>` boundary. `ContactFormInner` already has this. The new `ContactForm.tsx` should be the one that uses `useSearchParams`.

#### B. `components/products/ProductInfo.tsx` (208 lines → split into modules)

Create directory `components/products/` (already exists — put splitted files there) and split:

**File 1: `components/products/ProductInfo.tsx`** (~90 lines)
- Main orchestrator component
- Props: product, onNotifyMe
- Renders: Badge, ProductName, Price, StockStatus, Description
- Imports and composes child components

**File 2: `components/products/ProductSizeSelector.tsx`** (~60 lines)
- Size selection buttons
- Props: sizes, selectedSize, onSelect
- Returns size button grid

**File 3: `components/products/ProductAccordion.tsx`** (~60 lines)
- Accordion for Product Details, Sizing Guide, Care Instructions
- Uses Accordion from shadcn/ui
- Props: product

**File 4: `components/products/ProductCTA.tsx`** (~50 lines)
- Enquire button, Notify Me button, WhatsApp link
- Props: product, selectedSize, quantity, onNotifyMe, etc.

#### Rules:
- shadcn/ui `components/ui/select.tsx` is EXEMPT (do NOT touch)
- All new files must be ≤200 lines
- Preserve all prop types and imports
- No functional changes — only structural reorganization
