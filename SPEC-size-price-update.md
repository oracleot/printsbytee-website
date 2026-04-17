# SPEC.md — Size & Price Update

## What
Product data and size guide updates:
1. Update Fringe Bubu price from £30 to £35
2. Change all product sizes from `["XS","S","M","L","XL"]` to `["S","M","L","XL","XXL"]`
3. Remove `Bust` column from all size chart tables in `ProductAccordion`

## Why
- Price update per business decision
- Size range refactored: remove XS (too small for diaspora market), add XXL (growing demand)
- Bust measurements not reliably accurate — remove to avoid misleading customers

## Files to Modify

### `data/products.json`
- Fringe Bubu (`pbt-007`): `price: 30` → `35`
- All products: `sizes` array from `["XS","S","M","L","XL"]` → `["S","M","L","XL","XXL"]`

### `lib/products.ts`
- `sizeCharts` entries: replace XS with XXL row, update all bust column references
- Remove `bust` column from table header and data cells in `ProductAccordion`
- Remove `bust` from `SizeChartEntry` interface (update only where used — currently only in `lib/products.ts`)
- For `fringe-bubu`: remove bust column since only bust/hips/length are in measurements
- For `lora-set`: bust → no bust, keep waist, hips, length
- For `aso-oke-kimono`: remove bust, keep shoulder + total length (already has no waist/hips)
- For `naya-jump-suite`: remove bust, keep waist, hips, length + inseam

### `components/products/ProductAccordion.tsx`
- Remove `<th>Bust</th>` from table header
- Remove `{row.bust}` cell from each row

## Acceptance Criteria
1. Fringe Bubu shows £35 on product pages
2. All product size selectors show S, M, L, XL, XXL (not XS)
3. Size chart accordion shows no "Bust" column — only Size, UK, and remaining measurements
4. `pnpm run lint && pnpm run typecheck && pnpm run build` all pass
5. No file exceeds 200 lines