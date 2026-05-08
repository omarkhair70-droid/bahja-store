'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useOrderBag } from '@/components/OrderBagProvider';
import ProductImage from '@/components/ProductImage';
import { buildOrderWhatsAppMessage } from '@/lib/order-bag';
import { displaySizeBilingual, getProductArabicTitle } from '@/lib/utils';
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
      <h1 className="mb-1 text-2xl font-semibold sm:text-3xl">سلة الطلب</h1><p className="mb-4 text-sm text-bahja-taupe">لا يتم الدفع عبر الموقع. سيتم تأكيد التوفر والسعر النهائي عبر واتساب.</p>

      {items.length === 0 ? (
        <div className="subtle-panel p-6 text-center">
          <p className="mb-1 font-medium">لا توجد قطع في سلة الطلب بعد.</p>
          <p className="mb-4 text-sm text-bahja-taupe">اختاري قطعتكِ المفضلة وسنجهزها لكِ بعناية.</p>
          <Link href="/shop" className="bahja-btn-primary">
            تصفحي المتجر
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <article key={`${item.productSlug}-${item.selectedSize ?? 'x'}`} className="bahja-card p-3">
                <div className="grid grid-cols-[82px_1fr] gap-3 sm:grid-cols-[88px_1fr]">
                  <div className="relative h-[82px] overflow-hidden rounded-2xl bg-bahja-cream sm:h-[88px]">
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
                    <p className="text-xs text-bahja-taupe sm:block hidden">{item.title}</p>
                    <p className="text-sm text-bahja-taupe">
                      {item.selectedSize ? `المقاس: ${displaySizeBilingual(item.selectedSize)} • ` : ''}الكمية: {item.quantity}
                    </p>
                    <p className="rounded-xl bg-bahja-cream/80 p-2 text-sm">السعر الاسترشادي: {item.priceGuide}</p>

                    <div className="flex items-center gap-1.5">
                      <button aria-label="تقليل الكمية" onClick={() => updateQuantity(item, item.quantity - 1)} className="bahja-btn-secondary !px-3 !py-1.5">-</button>
                      <span>{item.quantity}</span>
                      <button aria-label="زيادة الكمية" onClick={() => updateQuantity(item, item.quantity + 1)} className="bahja-btn-secondary !px-3 !py-1.5">+</button>
                    </div>

                    <textarea
                      aria-label="ملاحظة على القطعة"
                      value={item.customNote ?? ''}
                      onChange={(e) => updateNote(item, e.target.value)}
                      placeholder="اللون أو التفاصيل المطلوبة"
                      className="w-full rounded-xl border border-bahja-beige p-2 text-sm"
                    />
                    <button onClick={() => removeItem(item)} className="text-xs text-bahja-taupe underline-offset-2 hover:underline">
                      حذف القطعة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="subtle-panel h-fit space-y-3 p-4"><h2 className="font-semibold">بياناتكِ لإتمام الطلب</h2>
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
              إرسال طلبي عبر واتساب
            </a>
            <Link href="/shop" className="bahja-btn-secondary w-full">متابعة التسوق</Link>
            <button onClick={clearBag} className="bahja-btn-secondary w-full">إفراغ السلة</button>
          </aside>
        </div>
      )}
    </section>
  );
}
