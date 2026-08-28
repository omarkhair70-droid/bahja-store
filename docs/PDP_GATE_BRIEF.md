# Bahja — PDP Gate Brief v1

Scope: **Product detail pages only.** Home and Shop remain approved. Cart and checkout remain visually untouched until this gate passes.

## Goal
Turn each product page into proof-led commerce: the product and its real details should do most of the persuasion, while ordering stays simple and visible.

## Reference roles
- TOTEME — calm split layout, sticky product information, disciplined detail hierarchy.
- Mlouye — product-as-object presentation and personalization.
- Sézane — warm product story, material/craft context and human-scale imagery.
- Cult Gaia — signature treatment for Elegant Clutch without theatrical overload.
- Ounass / Level Shoes — Arabic-first commerce clarity and structured product information.

## 01 Lead composition
Desktop uses a wide product gallery beside a restrained sticky order panel. Mobile stacks gallery first, then ordering information. No rounded mega-card around the page.

## 02 Product information
Order:
1. collection
2. Arabic product name
3. English product name only when useful
4. verified description
5. price guide / availability wording
6. size or quantity controls
7. add-to-bag / WhatsApp actions
8. compact verified ordering note

## 03 Bag gallery
Use real existing assets for:
- primary product view
- angle / scale-supporting view
- texture close-up
- hardware / finishing close-up

Do not invent interiors or lifestyle scenes that do not exist.

## 04 Elegant Clutch
Treat as the signature PDP because it has the strongest evidence set:
- lifestyle lead
- 4 real front color views
- close-up details
- collection/group view
- 4 held views
- 4 interior views

Keep one calm commerce panel; let the gallery carry the drama.

## 05 Personalization / ordering
Keep the existing real mechanics:
- Small / Medium / Large for handmade bags
- quantity
- free-text color/detail note
- add to bag
- WhatsApp inquiry

Do not add fake swatches, stock states, shipping promises or unavailable options.

## 06 Related products
Reuse the approved Shop V1 product language: image-led, no card shell, no chip cloud.

## 07 Page chrome
Extend the approved editorial Header/Footer through `/shop/[slug]`. Cart remains legacy during this gate.

## 08 Mobile
- product image first
- order panel immediately after lead image
- 44px+ controls
- galleries remain readable without horizontal page overflow
- no hover-only actions

## 09 Gate QA
- TypeScript check
- production build
- bag PDP desktop + mobile
- Elegant Clutch desktop + mobile
- accessory PDP mobile
- add-to-bag interaction smoke
- size selection smoke
- WhatsApp link presence
- related-product route smoke
- cart route smoke
- no broken images
- no horizontal overflow
- manual screenshot review

Stop if the page feels like an editorial lookbook that makes ordering harder, or a generic ecommerce template that hides Bahja's craft proof.
