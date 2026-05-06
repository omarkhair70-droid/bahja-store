'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useOrderBag } from '@/components/OrderBagProvider';
import { buildOrderWhatsAppMessage } from '@/lib/order-bag';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { displaySizeAr, getProductArabicTitle } from '@/lib/utils';
import ProductImage from '@/components/ProductImage';

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
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-bahja-brown">سلة الطلب</h1>
      {items.length === 0 ? (
        <div className="subtle-panel p-6">السلة فارغة حاليًا. <Link href="/shop" className="underline">متابعة التسوق</Link></div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <article key={`${item.productSlug}-${item.selectedSize ?? 'x'}`} className="grid gap-3 rounded-3xl border border-bahja-beige bg-white/80 p-3 sm:grid-cols-[90px_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-bahja-cream">
                  <ProductImage src={item.image} alt={getProductArabicTitle(item.arabicTitle, item.title)} categorySlug={item.collection.includes("كانفس") ? "canvas-art" : item.collection.includes("إكسسوارات") ? "hair-accessories" : "handmade-bags"} usage="thumb" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-bahja-brown">{getProductArabicTitle(item.arabicTitle, item.title)}</p>
                  <p className="text-xs text-bahja-taupe">{item.title}</p>
                  <p className="text-sm text-bahja-taupe">{item.collection}{item.selectedSize ? ` • ${displaySizeAr(item.selectedSize)}` : ''}</p>
                  <p className="rounded-xl bg-bahja-cream/80 px-3 py-2 text-sm">{item.priceGuide}</p>
                  <div className="flex items-center gap-2 rounded-xl bg-bahja-cream/70 p-1 w-fit">
                    <button onClick={() => updateQuantity(item, item.quantity - 1)} className="rounded-full border border-bahja-beige bg-white px-3 py-1 text-sm">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item, item.quantity + 1)} className="rounded-full border border-bahja-beige bg-white px-3 py-1 text-sm">+</button>
                  </div>
                  <textarea value={item.customNote ?? ''} onChange={(e) => updateNote(item, e.target.value)} placeholder="ملاحظات القطعة" className="w-full rounded-xl border p-2 text-sm" />
                  <button onClick={() => removeItem(item)} className="text-sm text-red-700">إزالة</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="subtle-panel h-fit space-y-3 p-4">
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم" className="w-full rounded-xl border p-2" />
            <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الهاتف" className="w-full rounded-xl border p-2" />
            <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="المنطقة / العنوان" className="w-full rounded-xl border p-2" />
            <textarea value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} placeholder="ملاحظات إضافية" className="min-h-24 w-full rounded-xl border p-2" />
            <a href={getWhatsAppUrl(message)} target="_blank" className="block rounded-full bg-bahja-brown px-5 py-3 text-center text-white">إرسال الطلب عبر واتساب</a>
            <Link href="/shop" className="block rounded-full border px-5 py-3 text-center">متابعة التسوق</Link>
            <button onClick={clearBag} className="w-full rounded-full border px-5 py-3">إفراغ السلة</button>
          </aside>
        </div>
      )}
    </section>
  );
}
