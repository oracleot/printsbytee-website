# PrintsbyTee MVP — Build Spec

## Context
Project directory exists at `/root/projects/printsbytee/` with:
- `public/logo.svg` — brand logo
- `public/logo-bg.jpg` — reference background
- `workflow-artifacts/01-plan-ceo.md` — product decisions
- `workflow-artifacts/02-plan-eng.md` — architecture

NO code exists yet. This is a greenfield Next.js 15 project.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Email:** Nodemailer
- **Fonts:** Playfair Display (headlines) + DM Sans (body)

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `black` | `#0D0D0D` | CTAs, primary text |
| `gold` | `#C9A84C` | Accent, decorative |
| `cream` | `#F5F0E8` | Background |
| `emerald` | `#1B4D3E` | Secondary accent |
| `terracotta` | `#C75B39` | Warm accent |
| `offwhite` | `#FAFAF8` | Page bg |

## Pages to Build

### 1. Homepage `/`
- Sticky header (logo left, nav center, social icons right)
- Full-bleed hero (80vh) with gradient placeholder, overlay text "WEAR YOUR STORY", "SHOP NOW" CTA
- Brand story (2-col: text left, image right)
- Featured products (4 horizontal scroll cards)
- Adinkra pattern divider
- Newsletter signup CTA
- Footer

### 2. Products `/products`
- Page header "Our Collection"
- Category filter tabs: All | Laura Set | Short Bubu | 2-piece set
- Responsive grid (1/2/3 col)
- ProductCard with hover effect, conditional price

### 3. Product Detail `/products/[slug]`
- Breadcrumb nav
- 2-col layout: image gallery (main + thumbnails) + product info
- Product info: badge, name, price (conditional), description, size pills, qty input
- CTAs: "Enquire to Order" + "Notify Me When Available" (if out-of-stock)
- WhatsApp quick-link
- Accordion: Product Details, Sizing Guide, Care Instructions
- Related products (3 same-category)

### 4. Contact `/contact`
- Page header with pattern accent
- 2-col: brand info left, enquiry form right
- Form: Name, Email, Product Interest (optional), Message
- POST /api/enquiry

## API Routes

### `POST /api/enquiry`
```typescript
// Body: { name, email, productInterest?, message }
// Validation: Zod (name min 2, email valid, message min 10)
// Store: data/enquiries.json
// Email: nodemailer to hello@printsbytee.co.uk
// Response: { success: true, id }
```

### `POST /api/waitlist`
```typescript
// Body: { email, productId }
// Store: data/waitlist.json (prevent duplicates)
// Response: { success: true }
```

### `GET /api/products`
```typescript
// Response: { products: Product[] }
```

### `GET /api/products/[slug]`
```typescript
// Response: { product: Product } | { error: "Not found" }
```

## Data Model
```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'laura-set' | 'short-bubu' | '2-piece-set';
  description: string;
  price: number | null;
  sizes: string[];
  images: string[];  // use CSS gradient placeholders
  inStock: boolean;
  notifyMeEnabled: boolean;
  featured: boolean;
  createdAt: string;
}
```

## 20 Sample Products
Create `data/products.json` with 20 products:
- 7 Laura Set
- 7 Short Bubu  
- 6 2-piece set
- Mix of inStock true/false
- Mix of price null/number
- Featured: true for first 4

Use realistic fashion names + storytelling descriptions. Use CSS gradient images via inline styles (fashion editorial style with brand palette colors).

## Components to Build
```
app/
  layout.tsx              # Root layout with fonts + globals
  page.tsx                # Homepage
  globals.css             # Tailwind + custom properties
  products/
    page.tsx             # Products listing
    [slug]/page.tsx      # Product detail
  contact/
    page.tsx             # Contact page
  api/
    enquiry/route.ts
    waitlist/route.ts
    products/route.ts
    products/[slug]/route.ts

components/
  layout/
    Header.tsx
    Footer.tsx
  home/
    Hero.tsx
    BrandStory.tsx
    FeaturedProducts.tsx
    NewsletterForm.tsx
  products/
    ProductCard.tsx
    ProductGrid.tsx
    ProductGallery.tsx
    ProductInfo.tsx
    NotifyMeModal.tsx
  shared/
    PatternDivider.tsx    # Adinkra-inspired SVG
    WhatsAppButton.tsx

lib/
  products.ts             # Product data getters
  utils.ts                # cn(), formatters
  mail.ts                 # Nodemailer config

data/
  products.json           # 20 products
  enquiries.json          # [] (initially empty)
  waitlist.json           # [] (initially empty)
```

## Placeholder Images
Use CSS gradient placeholders inline. No external image URLs. Examples:
- `background: linear-gradient(135deg, #C9A84C 0%, #1B4D3E 50%, #0D0D0D 100%)`
- `background: linear-gradient(135deg, #C75B39 0%, #F5F0E8 50%, #C9A84C 100%)`
- `background: linear-gradient(135deg, #1B4D3E 0%, #0D0D0D 100%)`

## Pattern Divider
Create Adinkra-inspired SVG geometric pattern. Simple diamonds/squares arranged in West African motif. Used as:
- Section dividers (horizontal)
- Card decorative corners
- Background accents in footer
- Header accent line

## shadcn/ui Components to Install
- Button, Input, Label, Textarea, Select, Dialog, Badge, Accordion, Separator

## Key Implementation Notes
1. **No Stripe** — no payment processing in MVP
2. **Conditional price** — `price: null` means hide price entirely, no placeholder text
3. **Notify Me** — only show for `inStock: false && notifyMeEnabled: true` products
4. **All social handles** — @printsbytee for IG, FB, TikTok
5. **WhatsApp** — `https://wa.me/447000000000` (use placeholder number, note to update)
6. **Email enquiries** — `hello@printsbytee.co.uk`

## Validation Before Commit
```bash
pnpm run lint      # ESLint — 0 errors
pnpm run typecheck # tsc --noEmit — 0 errors  
pnpm run build    # Must succeed
```

## Feature Branch
`feat/printsbytee-mvp`

## Output Target
Fully functional Next.js 15 app at `/root/projects/printsbytee/` — no TODOs, no placeholder comments. Ready for code review.