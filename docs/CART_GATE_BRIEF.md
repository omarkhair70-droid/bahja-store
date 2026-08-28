# Bahja — Cart Gate Brief v1

Scope: **Cart only.** Home, Shop and PDP remain approved. Collections, Custom Orders, About and Contact remain outside this gate.

## Goal
Turn the cart into a calm order-review and WhatsApp handoff experience. The user should understand:
1. what she selected,
2. what can still be edited,
3. what information Bahja needs,
4. that availability and final pricing are confirmed on WhatsApp.

The page must not pretend to be a conventional payment checkout when no on-site payment exists.

## Reference roles
- TOTEME — restraint, spacing, linear review flow.
- Ounass / Level Shoes — clear order hierarchy and mobile commerce legibility.
- Sézane — warm service language.
- Approved Bahja Home/Shop/PDP — typography, color, borders, button language.

## 01 Page intro
Large Arabic title, compact explanatory line, item count. No decorative cart hero.

## 02 Order items
Each line item uses:
- real product image
- Arabic title
- collection / size
- price guide
- quantity controls
- editable custom note
- remove action

No rounded card shell, chips or shadow.

## 03 Order status
Do not calculate a fake total because several products use size/customization-dependent price guides. Instead explain clearly that the final price is confirmed after reviewing the order.

## 04 Customer details
Name, phone, area/address, extra notes. Clean underlined/bordered fields, not a floating rounded form card.

## 05 Handoff
Primary action: **إرسال الطلب عبر واتساب**.
Secondary: continue shopping.
Tertiary/destructive: empty cart.

The WhatsApp message must preserve:
- product title
- size if relevant
- quantity
- product custom note
- customer details
- extra notes

## 06 Empty state
Quiet editorial empty state with a clear route back to Shop.

## 07 Page chrome
Extend the approved editorial Header/Footer to `/cart` only. Other supporting pages remain legacy until their own gates.

## 08 Mobile
- line items remain readable
- quantity controls are 44px+
- form follows products naturally
- primary WhatsApp action is prominent without becoming a sticky obstruction
- no horizontal overflow

## 09 Gate QA
- TypeScript check
- production build
- seeded filled-cart desktop screenshot
- seeded filled-cart mobile screenshot
- empty-cart mobile screenshot
- quantity increment/decrement
- item note editing
- remove item
- customer form fill
- WhatsApp URL contains order/customer content
- clear cart
- no broken images
- no horizontal overflow
- Home/Shop/PDP route smoke
- manual screenshot review

Stop if the page looks like a generic checkout, invents a monetary total, or obscures that final confirmation happens through WhatsApp.
