'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useOrderBag } from '@/components/OrderBagProvider';
import ProductImage from '@/components/ProductImage';
import { buildOrderWhatsAppMessage } from '@/lib/order-bag';
import { displaySizeAr, getProductArabicTitle } from '@/lib/utils';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function CartPage() {
  const { items, removeItem, updateNote, updateQuantity, clearBag } = useOrderBag();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [extraNotes, setExtraNotes] = useState('');

  const message = useMemo(
    () => buildOrderWhatsAppMessage(items, { customerName, customerPhone, customerAddress, extraNotes }),
    [items, customerName, customerPhone, customerAddress, extraNotes]
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-semibold">السلة</h1>

      {items.length === 0 ? (
        <div className="subtle-panel p-6 text-center">
          <p className="mb-1 font-medium">سلة الطلب فارغة حاليًا.</p>
          <p className="mb-4 text-sm text-bahja-taupe">تصفحي المتجر لاختيار القطع التي أعجبتكِ.</p>
          <Link href="/shop" className="bahja-btn-primary">
            تصفحي المتجر
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <article key={`${item.productSlug}-${item.selectedSize ?? 'x'}`} className="bahja-card p-3">
                <div className="grid gap-3 sm:grid-cols-[88px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-bahja-cream">
                    <ProductImage
                      src={item.image}
                      alt={getProductArabicTitle(item.arabicTitle, item.title)}
                      categorySlug={
                        item.collection.includes('كانفس')
                          ? 'canvas-art'
                          : item.collection.includes('إكسسوارات')
                            ? 'hair-accessories'
                            : 'handmade-bags'
                      }
                      usage="thumb"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">{getProductArabicTitle(item.arabicTitle, item.title)}</p>
                    <p className="text-xs text-bahja-taupe">{item.title}</p>
                    <p className="text-sm text-bahja-taupe">
                      {item.selectedSize ? `المقاس: ${displaySizeAr(item.selectedSize)} • ` : ''}
                      {item.collection}
                    </p>
                    <p className="rounded-xl bg-bahja-cream/80 p-2 text-sm">{item.priceGuide}</p>

                    <div className="flex items-center gap-2">
                      <button aria-label="تقليل الكمية" onClick={() => updateQuantity(item, item.quantity - 1)} className="bahja-btn-secondary">-</button>
                      <span>{item.quantity}</span>
                      <button aria-label="زيادة الكمية" onClick={() => updateQuantity(item, item.quantity + 1)} className="bahja-btn-secondary">+</button>
                    </div>

                    <textarea
                      aria-label="ملاحظة على القطعة"
                      value={item.customNote ?? ''}
                      onChange={(e) => updateNote(item, e.target.value)}
                      placeholder="ملاحظة على القطعة"
                      className="w-full rounded-xl border border-bahja-beige p-2 text-sm"
                    />
                    <button onClick={() => removeItem(item)} className="text-sm text-bahja-taupe underline-offset-2 hover:underline">
                      حذف القطعة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="subtle-panel h-fit space-y-3 p-4">
            <label className="block text-sm">
              الاسم
              <input aria-label="الاسم" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم" className="mt-1 w-full rounded-xl border border-bahja-beige p-2" />
            </label>
            <label className="block text-sm">
              رقم الهاتف
              <input aria-label="رقم الهاتف" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الهاتف" className="mt-1 w-full rounded-xl border border-bahja-beige p-2" />
            </label>
            <label className="block text-sm">
              المنطقة / العنوان
              <input
                aria-label="المنطقة / العنوان"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="المنطقة / العنوان"
                className="mt-1 w-full rounded-xl border border-bahja-beige p-2"
              />
            </label>
            <label className="block text-sm">
              ملاحظات إضافية
              <textarea
                aria-label="ملاحظات إضافية"
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="ملاحظات إضافية"
                className="mt-1 min-h-24 w-full rounded-xl border border-bahja-beige p-2"
              />
            </label>

            <a href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className="bahja-btn-primary w-full">
              إرسال الطلب عبر واتساب
            </a>
            <Link href="/shop" className="bahja-btn-secondary w-full">متابعة التسوق</Link>
            <button onClick={clearBag} className="bahja-btn-secondary w-full">إفراغ السلة</button>
          </aside>
        </div>
      )}
    </section>
  );
}
