[0m
> build · claude-sonnet-4.6
[0m
[0m• [0mExplore codebase structure[90m Explore Agent[0m
I'll analyze the codebase first, then implement all tasks systematically.
[0m✓ [0mExplore codebase structure[90m Explore Agent[0m
[0m→ [0mRead components/layout/Header.tsx
[0m→ [0mRead components/layout/Footer.tsx
[0m→ [0mRead components/shared/WhatsAppButton.tsx
[0m→ [0mRead components/products/ProductCard.tsx
[0m→ [0mRead components/products/ProductInfo.tsx
Now let me read the actual file contents to implement everything accurately.
[0m→ [0mRead app/contact/page.tsx
[0m
[0m# [0mTodos
[ ] TASK 1: Replace PbT SVG text logo with /logo.svg in Header.tsx and Footer.tsx
[ ] TASK 2: Create workflow-artifacts/sprint-2-plan.md (Aceternity UI plan)
[ ] TASK 3: Move WhatsApp button from bottom-6 to bottom-24
[ ] TASK 4: Rework Footer (logo, nav, social, tagline, PatternDivider)
[ ] TASK 5: Fix Quick View button hover trigger on ProductCard
[ ] TASK 6: Mobile hamburger → full-height slide-out menu overlay
[ ] TASK 7A: Split app/contact/page.tsx into focused modules
[ ] TASK 7B: Split components/products/ProductInfo.tsx into focused modules
[ ] Run lint + typecheck + build — fix all errors
[0m
Now I have all the information needed. Let me set up the todo list and implement all tasks.
[0m# [0mTodos
[ ] TASK 1: Replace PbT SVG text logo with /logo.svg in Header.tsx and Footer.tsx
[ ] TASK 2: Create workflow-artifacts/sprint-2-plan.md (Aceternity UI plan)
[ ] TASK 3: Move WhatsApp button from bottom-6 to bottom-24
[ ] TASK 4: Rework Footer (logo, nav, social, tagline, PatternDivider)
[ ] TASK 5: Fix Quick View button hover trigger on ProductCard
[ ] TASK 6: Mobile hamburger → full-height slide-out menu overlay
[ ] TASK 7A: Split app/contact/page.tsx into focused modules
[ ] TASK 7B: Split components/products/ProductInfo.tsx into focused modules
[ ] Run lint + typecheck + build — fix all errors
[0m
**TASK 1 + TASK 6: Header.tsx** — replace logo AND implement full-height mobile menu overlay:
[0m← [0mWrite components/layout/Header.tsx
Wrote file successfully.
[0m
[0m# [0mTodos
[ ] TASK 1: Replace PbT SVG text logo with /logo.svg in Header.tsx and Footer.tsx
[ ] TASK 2: Create workflow-artifacts/sprint-2-plan.md (Aceternity UI plan)
[ ] TASK 3: Move WhatsApp button from bottom-6 to bottom-24
[ ] TASK 4: Rework Footer (logo, nav, social, tagline, PatternDivider)
[ ] TASK 5: Fix Quick View button hover trigger on ProductCard
[x] TASK 6: Mobile hamburger → full-height slide-out menu overlay
[ ] TASK 7A: Split app/contact/page.tsx into focused modules
[ ] TASK 7B: Split components/products/ProductInfo.tsx into focused modules
[ ] Run lint + typecheck + build — fix all errors
[0m
**TASK 4: Rework Footer.tsx** (also covers TASK 1 logo swap for footer):
[0m← [0mWrite components/layout/Footer.tsx
Wrote file successfully.
[0m
[0m# [0mTodos
[x] TASK 1: Replace PbT SVG text logo with /logo.svg in Header.tsx and Footer.tsx
[ ] TASK 2: Create workflow-artifacts/sprint-2-plan.md (Aceternity UI plan)
[ ] TASK 3: Move WhatsApp button from bottom-6 to bottom-24
[x] TASK 4: Rework Footer (logo, nav, social, tagline, PatternDivider)
[ ] TASK 5: Fix Quick View button hover trigger on ProductCard
[x] TASK 6: Mobile hamburger → full-height slide-out menu overlay
[ ] TASK 7A: Split app/contact/page.tsx into focused modules
[ ] TASK 7B: Split components/products/ProductInfo.tsx into focused modules
[ ] Run lint + typecheck + build — fix all errors
[0m
**TASK 3: WhatsApp button — bump up**

**TASK 5: Fix Quick View hover**
[0m← [0mEdit components/shared/WhatsAppButton.tsx
Index: /root/projects/printsbytee/components/shared/WhatsAppButton.tsx
===================================================================
--- /root/projects/printsbytee/components/shared/WhatsAppButton.tsx
+++ /root/projects/printsbytee/components/shared/WhatsAppButton.tsx
@@ -24,9 +24,9 @@
   initial={{ scale: 0, opacity: 0 }}
   animate={{ scale: 1, opacity: 1 }}
   whileHover={{ scale: 1.1 }}
   whileTap={{ scale: 0.95 }}
-  className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow ${className}`}
+  className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow ${className}`}
 >
   <MessageCircle className="w-5 h-5" />
   <span className="font-medium text-sm hidden sm:inline">Chat on WhatsApp</span>
 </motion.a>

[0m
Now fix the Quick View button — replace `whileHover` (self-hover only) with `group-hover` CSS so the entire card triggers it:
[0m← [0mEdit components/products/ProductCard.tsx
Index: /root/projects/printsbytee/components/products/ProductCard.tsx
===================================================================
--- /root/projects/printsbytee/components/products/ProductCard.tsx
+++ /root/projects/printsbytee/components/products/ProductCard.tsx
@@ -36,18 +36,14 @@
     </span>
   </div>
 )}
 
-{/* Hover Overlay */}
+{/* Hover Overlay — covers full image; triggers on any hover over the card (.group) */}
 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
-  <motion.div
-    initial={{ opacity: 0, y: 10 }}
-    whileHover={{ opacity: 1, y: 0 }}
-    className="bg-cream text-black text-sm font-medium px-4 py-2 flex items-center gap-2 shadow-lg"
-  >
+  <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-cream text-black text-sm font-medium px-4 py-2 flex items-center gap-2 shadow-lg">
     <Eye className="w-4 h-4" />
     Quick View
-  </motion.div>
+  </div>
 </div>
 
 {/* Category Badge */}
 <div className="absolute top-3 left-3">

[0m
Now remove the unused `motion` import from ProductCard since we no longer use `motion.div` inside the overlay:
[0m→ [0mRead components/products/ProductCard.tsx
[0m
[0m# [0mTodos
[x] TASK 1: Replace PbT SVG text logo with /logo.svg in Header.tsx and Footer.tsx
[ ] TASK 2: Create workflow-artifacts/sprint-2-plan.md (Aceternity UI plan)
[x] TASK 3: Move WhatsApp button from bottom-6 to bottom-24
[x] TASK 4: Rework Footer (logo, nav, social, tagline, PatternDivider)
[x] TASK 5: Fix Quick View button hover trigger on ProductCard
[x] TASK 6: Mobile hamburger → full-height slide-out menu overlay
[ ] TASK 7A: Split app/contact/page.tsx into focused modules
[ ] TASK 7B: Split components/products/ProductInfo.tsx into focused modules
[ ] Run lint + typecheck + build — fix all errors
[0m
`motion` is still used for the `motion.div` entrance animation wrapper — keep it. Good.
**TASK 2: Aceternity UI plan document**
[0m$ [0mls /root/projects/printsbytee/workflow-artifacts/
00-office-hours.md
01-plan-ceo.md
02-plan-eng.md
[0m
