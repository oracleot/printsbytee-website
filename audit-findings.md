# PrintsbyTee Website Audit — SUL-53

**Auditor:** OpenCode GPT-5.3-Codex (security-auditor gate)
**Date:** 2026-04-11
**Scope:** Security (OWASP Top 10), Accessibility (WCAG 2.1 AA), Performance, Type Safety, UX

---

## Findings Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 0 |
| HIGH | 5 |
| MEDIUM | 9 |
| LOW | 8 |

---

## HIGH Findings

### H1: SMTP transport uses plaintext (lib/mail.ts:23)
- **OWASP:** A02 – Cryptographic Failures
- **Issue:** `secure: false` hardcoded — credentials and message content exposed in transit
- **Code:** `secure: false,`
- **Fix:** Derive `secure` from port (465 → true) or env var `SMTP_SECURE`

### H2: No rate limiting on waitlist API (app/api/waitlist/route.ts:10)
- **OWASP:** A04 – Insecure Design
- **Issue:** Public `/api/waitlist` has no bot protection or throttling — easy to spam
- **Fix:** Add Upstash Redis rate limiter + Cloudflare Turnstile CAPTCHA

### H3: No rate limiting on enquiry API (app/api/enquiry/route.ts:13)
- **OWASP:** A04 – Insecure Design
- **Issue:** Same as H2 — enquiry form can be flooded
- **Fix:** Add rate limiting + CAPTCHA

### H4: PII logged in plain text — waitlist (app/api/waitlist/route.ts:29)
- **OWASP:** A09 – Security Logging Failures
- **Code:** `console.log(\`[Waitlist] New entry id=${id} email=${email}...\`)`
- **Fix:** Redact email to `e***@domain.com`, log only request ID + status

### H5: PII logged in plain text — enquiry (app/api/enquiry/route.ts:30)
- **OWASP:** A09 – Security Logging Failures
- **Code:** `console.log(\`[Enquiry] New submission id=${id} name=${name} email=${email}...\`)`
- **Fix:** Same as H4 — redact PII

---

## MEDIUM Findings

### M1: Image index crash — ProductCard (components/products/ProductCard.tsx:26)
- **Issue:** `product.images[0].startsWith("/")` throws if images array is empty
- **Fix:** `product.images?.[0]?.startsWith("/") ?? false`

### M2: Image index crash — FeaturedProducts (components/home/FeaturedProducts.tsx:43)
- **Issue:** Same as M1
- **Fix:** Use safe resolver `product.images?.[0] ?? gradientKey`

### M3: Image index crash — BentoGrid (components/home/BentoGrid.tsx:63)
- **Issue:** `item.imageKey.startsWith("/")` unsafe when building from `product.images[0]`
- **Fix:** Validate when building `bentoItems`, default to gradient

### M4: Price `0` falsy bug — ProductCard (components/products/ProductCard.tsx:86)
- **Issue:** `{product.price && (...)}` — price of `0` is falsy, won't display
- **Fix:** `product.price !== null`

### M5: Price `0` falsy bug — FeaturedProducts (components/home/FeaturedProducts.tsx:81)
- **Issue:** Same as M4
- **Fix:** `product.price !== null`

### M6: Filter buttons lack ARIA state (components/products/ProductGrid.tsx:32)
- **WCAG:** 4.1.2 Name/Role/Value
- **Fix:** Add `aria-pressed={activeFilter === filter.value}`

### M7: Product count not announced to screen readers (components/products/ProductGrid.tsx:47)
- **WCAG:** 4.1.3 Status Messages
- **Fix:** Add `aria-live="polite"` to count `<p>`

### M8: Breadcrumb nav lacks accessible name (app/products/[slug]/page.tsx:39)
- **WCAG:** 1.3.1 / 2.4.6
- **Fix:** Add `aria-label="Breadcrumb"` to `<nav>`

### M9: Hero CTA has no keyboard focus treatment (components/home/HeroSection.tsx:49)
- **WCAG:** 2.4.7 Focus Visible
- **Fix:** Add `focus-visible:outline focus-visible:ring` styles

---

## LOW Findings

### L1: Filter buttons missing `type="button"` (components/products/ProductGrid.tsx:33)
- **Issue:** Default submit type could fire accidentally in a form context
- **Fix:** Add `type="button"` to all filter buttons

### L2: "Quick View" overlay is hover-only (components/products/ProductCard.tsx:50)
- **Issue:** Keyboard/touch users never see it
- **Fix:** Add `group-focus-visible` equivalent or persistent text

### L3: "View Product" overlay hover-only (components/home/FeaturedProducts.tsx:69)
- **Issue:** Same as L2
- **Fix:** Same approach

### L4: Unused `React` import (components/home/BentoGrid.tsx:4)
- **Fix:** Remove `import React from "react";`

### L5: NotifyMeModal callback typing (components/products/NotifyMeModal.tsx:68)
- **Fix:** Wrap as `(open) => { if (!open) handleClose(); }`

### L6: Email input missing `autoComplete` (components/products/NotifyMeModal.tsx:98)
- **Fix:** Add `autoComplete="email"`

### L7: Gallery transitions ignore `prefers-reduced-motion` (components/products/ProductGallery.tsx:31)
- **WCAG:** 2.3.3
- **Fix:** Use `useReducedMotion()` from Framer Motion

### L8: Thumbnail keys use array index (components/products/ProductGallery.tsx:86)
- **Issue:** Unstable reconciliation if image order changes
- **Fix:** Use `${product.id}-${index}` as key

---

## Prioritized Improvement Plan

| Priority | Action | File(s) | Effort |
|----------|--------|---------|--------|
| 1 | Fix SMTP TLS (secure flag) | lib/mail.ts | Low |
| 2 | Add PII redaction to logs | app/api/*/route.ts | Low |
| 3 | Add rate limiting to APIs | app/api/*/route.ts | Medium |
| 4 | Add CAPTCHA to forms | NotifyMeModal, enquiry | Medium |
| 5 | Fix image index crashes (M1-M3) | ProductCard, FeaturedProducts, BentoGrid | Low |
| 6 | Fix price nullability (M4-M5) | ProductCard, FeaturedProducts | Low |
| 7 | A11y: aria-pressed on filters (M6) | ProductGrid | Low |
| 8 | A11y: aria-live on count (M7) | ProductGrid | Low |
| 9 | A11y: breadcrumb label (M8) | product detail page | Low |
| 10 | A11y: focus-visible on hero CTA (M9) | HeroSection | Low |
| 11 | Low-touch a11y polish (L1-L8) | Various | Low |
| 12 | API abuse protection (H2-H3) | Next.js middleware | Medium |

---

## Quick Wins Implemented in This PR

The following were fixed as part of `feat/audit-fixes`:
- L4: Remove unused React import (BentoGrid.tsx)
- L6: Add `autoComplete="email"` (NotifyMeModal)
- M6: Add `aria-pressed` to filter buttons (ProductGrid)
- M7: Add `aria-live` to product count (ProductGrid)
- M8: Add `aria-label` to breadcrumb nav (product detail page)
- L1: Add `type="button"` to filter buttons (ProductGrid)
- M1, M2, M3: Fix image index crashes (ProductCard, FeaturedProducts, BentoGrid)
- M4, M5: Fix price nullability (ProductCard, FeaturedProducts)
- L7: Add `prefers-reduced-motion` guard (ProductGallery)
- L8: Use stable keys for thumbnails (ProductGallery)

**Remaining HIGH findings require infrastructure changes (rate limiting, CAPTCHA, SMTP TLS) and should be addressed in a follow-up PR.**
