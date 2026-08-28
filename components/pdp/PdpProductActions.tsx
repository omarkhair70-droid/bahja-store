'use client';

import { useState } from 'react';
import type { Product } from '@/content/bahja-products';
import AddToBagButton from '@/components/AddToBagButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { isBagProduct, type BagSize } from '@/lib/order-bag';

const sizes: Array<{ value: BagSize; label: string }> = [
  { value: 'Small', label: 'صغير' },
  { value: 'Medium', label: 'متوسط' },
  { value: 'Large', label: 'كبير' }
];

export default function PdpProductActions({ product }: { product: Product }) {
  const isBag = isBagProduct(product.categorySlug) && product.cardVariant !== 'canvas-custom';
  const isCanvas = product.cardVariant === 'canvas-custom';
  const [size, setSize] = useState<BagSize>('Medium');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  return (
    <div className="border-t border-[#241d19]/15 pt-6">
      {isBag ? (
        <fieldset>
          <legend className="text-xs text-[#75665d]">المقاس</legend>
          <div className="mt-3 grid grid-cols-3 border-y border-[#241d19]/15">
            {sizes.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setSize(item.value)}
                aria-pressed={size === item.value}
                className={`min-h-12 border-l border-[#241d19]/15 px-3 text-sm transition last:border-l-0 ${
                  size === item.value ? 'bg-[#241d19] text-[#fffaf5]' : 'bg-transparent text-[#241d19] hover:bg-[#eee5da]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className={isBag ? 'mt-6' : ''}>
        <p className="text-xs text-[#75665d]">الكمية</p>
        <div className="mt-3 inline-grid grid-cols-[44px_56px_44px] items-center border-y border-[#241d19]/15">
          <button
            type="button"
            aria-label="تقليل الكمية"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="min-h-11 border-l border-[#241d19]/15 text-lg"
          >
            −
          </button>
          <span className="text-center text-sm tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="زيادة الكمية"
            onClick={() => setQuantity(quantity + 1)}
            className="min-h-11 border-r border-[#241d19]/15 text-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`pdp-note-${product.slug}`} className="text-xs text-[#75665d]">
          اللون أو التفاصيل المطلوبة
        </label>
        <textarea
          id={`pdp-note-${product.slug}`}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="اكتبي اللون أو أي تفاصيل تحبيها"
          className="mt-3 min-h-24 w-full resize-y border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm leading-6 outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
        />
      </div>

      <div className="mt-6 grid gap-3">
        {!isCanvas ? (
          <AddToBagButton
            item={{
              productSlug: product.slug,
              title: product.title,
              arabicTitle: product.arabicTitle,
              image: product.displayImage ?? product.image,
              collection: product.collection,
              priceGuide: product.priceGuide
            }}
            selectedSize={isBag ? size : undefined}
            quantity={quantity}
            customNote={note}
            className="min-h-12 w-full bg-[#241d19] px-5 py-3 text-sm font-medium text-[#fffaf5] transition hover:bg-[#3a2f29]"
            label={isBag ? 'أضيفي إلى السلة' : 'أضيفي الطلب'}
          />
        ) : null}

        <WhatsAppButton
          href={getWhatsAppUrl(
            product.whatsappInquiryText ??
              whatsappMessages.productInquiry(isCanvas ? 'اطلبي لوحة حسب الطلب' : (product.arabicTitle ?? product.title))
          )}
          className="!min-h-12 !w-full !justify-center !rounded-none !border !border-[#241d19]/25 !bg-transparent !px-5 !py-3 !text-[#241d19] !shadow-none hover:!border-[#241d19] hover:!opacity-100"
        >
          {isCanvas ? 'اطلبي عبر واتساب' : 'استفسري على واتساب'}
        </WhatsAppButton>
      </div>

      <p className="mt-4 text-[11px] leading-5 text-[#817067]">
        السعر والتفاصيل النهائية تتأكد حسب المقاس والتخصيص والتشطيب المتاح للقطعة.
      </p>
    </div>
  );
}
