[0m
> build · claude-opus-4.6
[0m
I'll start by exploring the current codebase to understand the existing structure before making changes.
[0m# [0mTodos
[ ] Explore current HeroSection.tsx and related files
[ ] Rewrite HeroSection.tsx with text-on-image overlay design
[ ] Ensure file stays under 200 lines (split if needed)
[ ] Run lint + typecheck + build pipeline
[ ] Create feature branch and commit
[0m
[0m• [0mExplore hero section codebase[90m Explore Agent[0m
[0m✓ [0mExplore hero section codebase[90m Explore Agent[0m
[0m→ [0mRead components/home/HeroSection.tsx
Now let me read the current HeroSection.tsx directly so I have the exact content:
[0m→ [0mRead app/globals.css
[0m
[0m# [0mTodos
[x] Explore current HeroSection.tsx and related files
[ ] Create feature branch feat/hero-redesign
[ ] Rewrite HeroSection.tsx with text-on-image overlay design
[ ] Ensure file stays under 200 lines (split if needed)
[ ] Run lint + typecheck + build pipeline
[ ] Commit and push to feat/hero-redesign
[0m
Let me check if the remote branch exists and create the local feature branch:
[0m$ [0mgit fetch origin && git branch -r | grep hero-redesign
origin/feat/hero-redesign
[0m
[0m$ [0mgit checkout feat/hero-redesign
Switched to branch 'feat/hero-redesign'
Your branch is up to date with 'origin/feat/hero-redesign'.
[0m
Good, I'm on the correct branch. Let me verify the current HeroSection on this branch:
[0m→ [0mRead components/home/HeroSection.tsx
[0m
[0m# [0mTodos
[x] Explore current HeroSection.tsx and related files
[x] Create feature branch feat/hero-redesign
[ ] Rewrite HeroSection.tsx with text-on-image overlay design
[ ] Ensure file stays under 200 lines (split if needed)
[ ] Run lint + typecheck + build pipeline
[ ] Commit and push to feat/hero-redesign
[0m
Now I'll rewrite the HeroSection. The key changes:

1. **Remove** the separate `bg-black` text zone below the images
2. **Add** text overlay that sits ON TOP of the image grid
3. **Mobile**: text overlays on each image cell individually
4. **Desktop**: single text overlay centered over both images
5. **Radial vignette** gradient on each image cell for readability
6. **Staggered entrance** animations (brand tag → headline → subhead → CTAs)
7. **Bottom gradient** for section transition

Let me plan the structure carefully to stay under 200 lines. The current file is 116 lines. The new version needs:
- Staggered animation (4 motion elements instead of 1 wrapping div)
- Separate mobile/desktop text overlays
- Vignette overlays on each image

I'll need to extract the text content into a sub-component to keep things clean. Let me write it first and check the line count.
[0m← [0mWrite components/home/HeroOverlay.tsx
Wrote file successfully.
[0m
Now rewrite the main HeroSection.tsx:
[0m← [0mWrite components/home/HeroSection.tsx
Wrote file successfully.
[0m
Now let me verify line counts for both files:
[0m$ [0mwc -l components/home/HeroSection.tsx components/home/HeroOverlay.tsx
97 components/home/HeroSection.tsx
  74 components/home/HeroOverlay.tsx
 171 total
[0m
[0m→ [0mRead components/home/HeroSection.tsx
Both files well under 200 lines. Let me verify the content is correct:
[0m→ [0mRead components/home/HeroOverlay.tsx
[0m
[0m# [0mTodos
[x] Explore current HeroSection.tsx and related files
[x] Create feature branch feat/hero-redesign
[x] Rewrite HeroSection.tsx with text-on-image overlay design
[x] Ensure file stays under 200 lines (split if needed)
[ ] Run lint + typecheck + build pipeline
[ ] Commit and push to feat/hero-redesign
[0m
Now let's run the pipeline:
[0m$ [0mpnpm run lint 2>&1
> printsbytee@0.1.0 lint /root/projects/printsbytee
> eslint


/root/projects/printsbytee/components/overlay/ExitIntentProvider.tsx
  29:6  warning  '_email' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)
[0m
Lint passes (only a pre-existing warning in a different file). Now typecheck:
[0m$ [0mpnpm run typecheck 2>&1
ERR_PNPM_NO_SCRIPT  Missing script: typecheck

Command "typecheck" not found.
[0m
Let me check the available scripts:
[0m$ [0mgrep -A 20 '"scripts"' package.json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.3.0",
    "@hookform/resolvers": "^5.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.7.0",
    "next": "16.2.2",
    "nodemailer": "^8.0.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.72.1",
    "shadcn": "^4.1.2",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
[0m
No typecheck script. I'll run tsc directly and then the build:
[0m$ [0mnpx tsc --noEmit 2>&1
Clean typecheck. Now the build:
[0m
[0m$ [0mpnpm run build 2>&1
> printsbytee@0.1.0 build /root/projects/printsbytee
> next build

▲ Next.js 16.2.2 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 16.8s
  Running TypeScript ...
  Finished TypeScript in 9.4s ...
  Collecting page data using 1 worker ...
  Generating static pages using 1 worker (0/9) ...
  Generating static pages using 1 worker (2/9) 
  Generating static pages using 1 worker (4/9) 
  Generating static pages using 1 worker (6/9) 
✓ Generating static pages using 1 worker (9/9) in 387ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/enquiry
├ ƒ /api/products
├ ƒ /api/products/[slug]
├ ƒ /api/waitlist
├ ○ /contact
├ ○ /products
└ ƒ /products/[slug]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
[0m
All three pass: lint (0 errors), typecheck (0 errors), build (compiled successfully).
[0m# [0mTodos
[x] Explore current HeroSection.tsx and related files
[x] Create feature branch feat/hero-redesign
[x] Rewrite HeroSection.tsx with text-on-image overlay design
[x] Ensure file stays under 200 lines (split if needed)
[x] Run lint + typecheck + build pipeline
[ ] Commit and push to feat/hero-redesign
[0m
[0m$ [0mgit status
On branch feat/hero-redesign
Your branch is up to date with 'origin/feat/hero-redesign'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   components/home/HeroSection.tsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	SPEC-hero-rework.md
	SPEC-hero-text-on-image.md
	architect-audit-pr11-merge.txt
	architect-audit-prompt.txt
	architect-prompt.txt
	architect-report-pr11-merge.md
	architect-report.md
	components/home/HeroOverlay.tsx
	components/overlay/
	hero-review.md
	opencode-output.md
	pnpm-lock.yaml

no changes added to commit (use "git add" and/or "git commit -a")
[0m
[0m$ [0mgit diff
diff --git a/components/home/HeroSection.tsx b/components/home/HeroSection.tsx
index fba3614..67f39fb 100644
--- a/components/home/HeroSection.tsx
+++ b/components/home/HeroSection.tsx
@@ -1,9 +1,8 @@
 "use client";
 
-import Link from "next/link";
 import Image from "next/image";
 import { motion, useReducedMotion } from "framer-motion";
-import { ArrowRight } from "lucide-react";
+import { HeroOverlay } from "./HeroOverlay";
 
 const HERO_IMAGES = [
   {
@@ -16,12 +15,16 @@ const HERO_IMAGES = [
   },
 ];
 
+/** Radial vignette — dark from all edges, transparent center */
+const VIGNETTE =
+  "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.85) 100%)";
+
 export function HeroSection() {
   const prefersReducedMotion = useReducedMotion();
 
   return (
     <section className="relative w-full bg-black overflow-hidden">
-      {/* 2-column image grid — 50vh per image on mobile, full viewport on desktop */}
+      {/* ── Image grid ─────────────────────────────────────── */}
       <div className="grid grid-cols-1 md:grid-cols-2">
         {HERO_IMAGES.map((image, index) => (
           <div
@@ -33,71 +36,49 @@ export function HeroSection() {
               alt={image.alt}
               fill
               priority={index === 0}
-              className="object-cover transition-transform duration-700 group-hover:scale-105"
+              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
-            {/* Subtle dark gradient at bottom */}
-            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
-          </div>
-        ))}
-      </div>
 
-      {/* Text zone — below image grid on dark background */}
-      <div className="bg-black py-16 md:py-24 px-4">
-        <motion.div
-          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
-          animate={{ opacity: 1, y: 0 }}
-          transition={
-            prefersReducedMotion
-              ? { duration: 0 }
-              : { duration: 0.9, ease: "easeOut" }
-          }
-          className="text-center max-w-2xl mx-auto"
-        >
-          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 border border-gold/40 px-4 py-1">
-            Ready-to-Wear African Fashion
-          </span>
-
-          <h1
-            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-[0.92] tracking-tight"
-            style={{
-              textShadow: "0 2px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)",
-            }}
-          >
-            WEAR YOUR <span className="text-gold">STORY</span>
-          </h1>
+            {/* Radial vignette overlay */}
+            <div
+              className="absolute inset-0 pointer-events-none"
+              style={{ background: VIGNETTE }}
+            />
 
-          <p className="text-cream/80 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
-            Bold prints. Contemporary style. African heritage, reimagined for the modern woman.
-          </p>
+            {/* Bottom gradient for section transition */}
+            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
 
-          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
-            <Link
-              href="/products"
-              className="inline-flex items-center gap-3 bg-gold text-black px-10 py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-cream transition-all duration-300 shadow-xl shadow-gold/20 hover:shadow-gold/40"
-            >
-              Shop Now
-              <ArrowRight className="w-5 h-5" />
-            </Link>
-            <a
-              href="mailto:hello@printsbytee.co.uk"
-              className="inline-flex items-center gap-2 text-cream/80 hover:text-gold text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 border-b border-cream/30 hover:border-gold pb-0.5"
-            >
-              Custom Orders
-            </a>
+            {/* ── Mobile text overlay (per image cell) ──── */}
+            {index === 0 && (
+              <div className="absolute inset-0 z-10 flex items-center justify-center md:hidden">
+                <HeroOverlay reducedMotion={prefersReducedMotion} />
+              </div>
+            )}
           </div>
-        </motion.div>
+        ))}
+      </div>
+
+      {/* ── Desktop text overlay (centered over both images) ── */}
+      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
+        <HeroOverlay reducedMotion={prefersReducedMotion} />
       </div>
 
-      {/* Scroll indicator */}
+      {/* ── Scroll indicator ────────────────────────────── */}
       <motion.div
         initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
         animate={{ opacity: 1 }}
-        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.2, duration: 0.6 }}
+        transition={
+          prefersReducedMotion
+            ? { duration: 0 }
+            : { delay: 1.2, duration: 0.6 }
+        }
         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
       >
         <motion.div
-          animate={prefersReducedMotion ? { opacity: 0 } : { y: [0, 14, 0] }}
+          animate={
+            prefersReducedMotion ? { opacity: 0 } : { y: [0, 14, 0] }
+          }
           transition={
             prefersReducedMotion
               ? { duration: 0 }
[0m
Now let me check git status and prepare the commit:
[0m$ [0mgit log --oneline -5
07f7fb4 fix(hero): rework hero section — architect review fixes
de03606 feat: hero redesign — 2-image side-by-side layout
b1b53e7 fix: replace remaining old Laura Set Royal Emerald with real products data
fdf5ecf fix: add category circle badge + update categories to match real products
c0c0a00 Merge main into fix/product-detail-image — resolve conflict, keep new products
[0m
Good. The changes are clean — modified `HeroSection.tsx` and new `HeroOverlay.tsx`. The untracked spec/report files should not be committed. Let me stage and commit only the relevant files:
[0m$ [0mgit add components/home/HeroSection.tsx components/home/HeroOverlay.tsx && git commit -m "feat(hero): text-on-image overlay redesign with radial vignette

Move text from separate below-image zone to overlay ON the images.
Mobile shows overlay on first image cell; desktop centers over both.
Radial vignette gradient ensures text readability on any background.
Extract HeroOverlay component with staggered Framer Motion entrance." && git status
[feat/hero-redesign a86ffa7] feat(hero): text-on-image overlay redesign with radial vignette
 2 files changed, 109 insertions(+), 54 deletions(-)
 create mode 100644 components/home/HeroOverlay.tsx
On branch feat/hero-redesign
Your branch is ahead of 'origin/feat/hero-redesign' by 1 commit.
  (use "git push" to publish your local commits)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	SPEC-hero-rework.md
	SPEC-hero-text-on-image.md
	architect-audit-pr11-merge.txt
	architect-audit-prompt.txt
	architect-prompt.txt
	architect-report-pr11-merge.md
	architect-report.md
	components/overlay/
	hero-review.md
	opencode-output.md
	pnpm-lock.yaml

nothing added to commit but untracked files present (use "git add" to track)
[0m
Now push to the remote branch:
[0m$ [0mgit push origin feat/hero-redesign 2>&1
To https://github.com/oracleot/printsbytee-website.git
   07f7fb4..a86ffa7  feat/hero-redesign -> feat/hero-redesign
[0m
[0m# [0mTodos
[x] Explore current HeroSection.tsx and related files
[x] Create feature branch feat/hero-redesign
[x] Rewrite HeroSection.tsx with text-on-image overlay design
[x] Ensure file stays under 200 lines (split if needed)
[x] Run lint + typecheck + build pipeline
[x] Commit and push to feat/hero-redesign
[0m
Done. Here's a summary of what was changed:

## Changes pushed to `origin/feat/hero-redesign`

### Architecture
Split into two files:
- **`HeroSection.tsx`** (97 lines) — layout, image grid, vignette overlays, scroll indicator
- **`HeroOverlay.tsx`** (74 lines) — text content with staggered Framer Motion entrance animations

### What changed

| Before | After |
|--------|-------|
| Text in separate `bg-black` zone **below** images | Text **overlays on** the images |
| Single animation wrapper for all text | Staggered entrance: brand tag (0.1s) → headline (0.3s) → subhead (0.5s) → CTAs (0.7s) |
| Simple bottom gradient on images | Radial vignette (`transparent 30% → rgba(13,13,13,0.85) 100%`) + bottom gradient |
| Hover scale on all viewports | Hover scale desktop-only (`md:group-hover:scale-105`) |
| One text instance always visible | Mobile: overlay on first image cell (`md:hidden`). Desktop: centered over both images (`hidden md:flex`) |

### Acceptance criteria status
- Text overlays on images (not below)
- Mobile: 50vh per image, text on first cell
- Desktop: side-by-side images, text centered over both
- Vignette gradient for readability
- Dual CTAs preserved (Shop Now + Custom Orders)
- Scroll indicator preserved
- Staggered Framer Motion entrance
- `prefers-reduced-motion` respected via `useReducedMotion`
- Both files under 200 lines (97 + 74)
- `lint` (0 errors), `tsc --noEmit` (clean), `build` (compiled successfully)
