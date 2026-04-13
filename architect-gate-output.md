[0m
> build · gpt-5.3-codex
[0m
- **Severity:** Medium  
  **File:** `components/home/HeroSection.tsx`  
  **Line:** `19`, `44-47`  
  **Description:** The vignette leaves a transparent center (`transparent 30%`) while text is overlaid on dynamic photography, so contrast can drop below WCAG AA in brighter image regions.  
  **Recommendation:** Increase center darkening (e.g., non-zero alpha in center), or add a dedicated semi-opaque backdrop behind text content (`HeroOverlay`) to guarantee minimum contrast regardless of image luminance.

- **Severity:** Medium  
  **File:** `components/home/HeroSection.tsx`  
  **Line:** `53-56`, `63-64`  
  **Description:** `HeroOverlay` is rendered twice (mobile and desktop variants) and toggled with CSS visibility. This duplicates animated markup and interactive controls in the DOM, increasing render/animation work and complexity.  
  **Recommendation:** Render a single `HeroOverlay` and reposition/rescale via responsive classes, or conditionally render by viewport using a hydration-safe strategy.

- **Severity:** Low  
  **File:** `components/home/HeroOverlay.tsx`  
  **Line:** `47-60`  
  **Description:** Interactive elements do not define explicit `focus-visible` styling. Browser defaults may be inconsistent and can be hard to see against image-heavy backgrounds.  
  **Recommendation:** Add clear keyboard focus styles (`focus-visible:outline`, `focus-visible:ring`, contrast-safe colors) for both the `/products` link and `mailto` link.

- **Severity:** Low  
  **File:** `components/home/HeroSection.tsx`  
  **Line:** `34-40`  
  **Description:** Only the first hero image is `priority`; on desktop both images are immediately above the fold and visually critical, so the second may load later than desired.  
  **Recommendation:** Consider prioritizing both above-the-fold images (or preload strategically) and verify LCP/CLS in Lighthouse/Web Vitals after change.

- **Severity:** Low  
  **File:** `components/home/HeroOverlay.tsx`  
  **Line:** `17`  
  **Description:** `reducedMotion` is typed as `boolean | null`, but current `useReducedMotion` usage is effectively boolean in this client-only path; nullable typing adds avoidable state branching and weakens type clarity.  
  **Recommendation:** Narrow to `boolean` (or normalize before prop passing) unless null is explicitly required by the installed framer-motion version behavior.

Security-specific review notes:
- No direct OWASP Top 10 issues found in these files: no user input handling, no `dangerouslySetInnerHTML`, no dynamic script/style injection, no auth/authorization logic, and no secret exposure.
- No CSRF-relevant mutation paths present (UI-only links and static content).

```
CRITICAL: 0
HIGH: 0
MEDIUM: 2
LOW: 3
```
