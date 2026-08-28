# Bahja — Shop Gate Brief v1

Scope: **Shop catalogue only.** Product detail and cart remain visually untouched until this gate passes.

## Goal
Translate the approved Home visual DNA into a commerce-first catalogue. The Shop should feel quieter than Home: less theatre, more comparison, stronger imagery, clearer Arabic taxonomy, and fewer UI containers.

## Reference roles
- TOTEME — catalogue restraint, whitespace, density, product-first grid.
- Sézane — warm merchandising and collection naming.
- Level Shoes / Ounass — Arabic-first taxonomy and clear commerce hierarchy.
- Mlouye — object-led product presentation where an item needs a special collection treatment.

## 01 Page intro
Large Arabic title, short supporting copy, visible item count. No decorative hero card and no repeated English subtitle.

## 02 Filters
Text-led horizontal filter rail separated by rules, not pills. Arabic is primary. Keep the current real categories/collections only; do not invent material/color filters until the data supports them.

## 03 Product grid
- Mobile: 2 columns.
- Desktop: 3 columns.
- Images dominate.
- No rounded card shell, shadow, chip cloud, or nested panels.
- Name, collection and price guide sit beneath the image.
- Detail/WhatsApp actions stay quiet but discoverable.

## 04 Elegant Clutch collection
When filtered to Elegant Clutch, show the four real color variants as a clean collection grid. All variants resolve to the same verified PDP and their existing WhatsApp inquiry.

## 05 Page chrome
Use the approved editorial Header/Footer on the Shop index only. PDP routes under `/shop/[slug]` retain legacy chrome during this gate.

## 06 Mobile
Filter rail must scroll without horizontal page overflow. Product text must remain readable at 2-up density. Tap targets stay accessible; no hover-only commerce.

## 07 Gate QA
- TypeScript check
- Production build
- 1440×1000 Shop screenshot
- 390×844 Shop screenshot
- filtered collection screenshot
- no broken images
- no horizontal overflow
- filter route smoke
- product route smoke
- cart route smoke
- manual comparison against the approved Home DNA and reference principles

Stop if the Shop looks like a separate template or if the editorial treatment makes product comparison slower.
