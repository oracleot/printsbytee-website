# BentoGrid Layout Fix v2

## Problem
Current grid is broken. The "large 2×2" card spans 2 rows but only 1 column — it doesn't span the full width of the grid on the left side. This leaves a gap that looks broken.

## Desired Layout
```
+------------------+----+----+
|                  |    |    |
|   LARGE 2×2      |    |    |
|   (spans 2 cols  +----+----+
|    AND 2 rows)   |    |    |
|                  |    |    |
+------------------+----+----+
```
The large card MUST span 2 columns (full width of left section) AND 2 rows.

## Grid Setup
```jsx
<div className="grid grid-cols-4 gap-4 h-[540px]">
```
- 4 equal columns
- Large card: `col-span-2 row-span-2` — spans 2 of 4 columns, 2 rows
- Small cards (4 total): fill remaining cells
- `h-[540px]` grid container with `grid-rows-2`

## Bento Items (5 products → 5 cells)
| Index | Col Span | Row Span | Notes |
|-------|----------|----------|-------|
| 0 (Large) | col-span-2 | row-span-2 | Full height + half width |
| 1 (Small) | col-span-1 row-span-1 | fills cell normally |
| 2 (Small) | col-span-1 row-span-1 | fills cell normally |
| 3 (Tall) | col-span-1 row-span-1 | fills cell normally |
| 4 (Tall) | col-span-1 row-span-1 | fills cell normally |

Wait — 5 items can't fill a 4-column, 2-row grid symmetrically. Let's count cells:
- 4-column × 2-row = 8 cells
- Large 2×2 = 4 cells
- Remaining 4 cells for 4 small/tall = perfect fit!

## Small Cards
- All 4 small/tall cards: `col-span-1 row-span-1` — each fills exactly 1 cell
- No special tall spans needed
- `h-full` makes them fill their grid cell height

## Large Card Inner
- `flex flex-col justify-center` — vertically centered content
- `min-h-0` — prevents content from breaking grid height
- Content: badge at top-left, product info at bottom

## Acceptance Criteria
- Large card spans exactly half the grid width AND full grid height
- 4 smaller cards fill the remaining 4 cells evenly
- All cards fill their grid cells completely — no gaps, no overflow
- Badges positioned top-left of each card, not clipped
- Hover works on full card area

## File: components/home/BentoGrid.tsx
