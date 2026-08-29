'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useOrderBag } from '@/components/OrderBagProvider';
import ProductImage from '@/components/ProductImage';
import { buildOrderWhatsAppMessage } from '@/lib/order-bag';
import { displaySizeAr, getProductArabicTitle } from '@/lib/utils';
import { getWhatsAppUrl } from '@/lib/whatsapp';

function inferCategory(collection: string) {
  const normalized = collection.toLowerCase();
  if (collection.includes('كانفس') || normalized.includes('canvas')) return 'canvas-art';
  if (collection.includes('إكسسوارات') || normalized.includes('accessories')) return 'hair-accessories';
  if (collection.includes('كلاتش') || normalized.includes('clutch')) return 'clutch-wallet-pieces';
  return 'handmade-bags';
}

function displayCollectionAr(collection: string) {
  const normalized = collection.toLowerCase();
  if (collection.includes('خيوط السلسلة') || normalized.includes('chain thread')) return 'شنط خيوط السلسلة';
  if (collection.includes('هيمالايا') || normalized.includes('himalayan')) return 'شنط خيط الهيمالايا';
  if (collection.includes('إكسسوارات') || normalized.includes('accessories')) return 'إكسسوارات شعر';
  if (collection.includes('كانفس') || normalized.includes('canvas')) return 'لوحات كانفس';
  if (collection.includes('كلاتش') || normalized.includes('clutch')) return 'إليجانت كلاتش';
  return collection;
}

export default function CartPage() {
  const { items, removeItem, updateNote, updateQuantity, clearBag, totalItems } = useOrderBag();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [extraNotes, setExtraNotes] = useState('');

  const message = useMemo(
    () => buildOrderWhatsAppMessage(items, { customerName, customerPhone, customerAddress, extraNotes }),
    [items, customerName, customerPhone, customerAddress, extraNotes]
  );

  if (!items.length) {
    return (
      <main className="bg-[#f8f4ed] text-[#241d19]">
        <section className="mx-auto flex min-h-[68svh] max-w-[1440px] items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="w-full border-y border-[#241d19]/15 py-16 text-center sm:py-24">
            <p className="text-xs tracking-[0.14em] text-[#75665d]">سلة الطلب</p>
            <h1 className="mx-auto mt-3 max-w-[10ch] text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-6xl">
              لسه ما اخترتيش قطعة.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#75665d]">
              ارجعي للمتجر واختاري القطعة والمقاس والتفاصيل، وبعدها نراجع الطلب هنا قبل إرساله على واتساب.
            </p>
            <Link href="/shop" className="mt-8 inline-block border-b border-[#241d19] pb-1 text-sm font-medium">
              تصفحي المتجر
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16 lg:px-12 lg:pb-36 lg:pt-20">
        <div className="grid gap-8 border-b border-[#241d19]/15 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.14em] text-[#75665d]">مراجعة الطلب</p>
            <h1 className="mt-3 text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              سلة الطلب
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-md text-sm leading-7 text-[#75665d]">
              راجعي القطع والتفاصيل، ثم املئي بياناتكِ وأرسلي الطلب لبهجة على واتساب. التوفر والسعر النهائي يتأكدوا بعد مراجعة المقاس والتخصيص.
            </p>
            <p className="mt-4 text-xs text-[#8a786d]">
              {totalItems} {totalItems === 1 ? 'قطعة' : 'قطع'} في السلة
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4 border-b border-[#241d19]/15 pb-4">
              <div>
                <p className="text-xs tracking-[0.12em] text-[#75665d]">01</p>
                <h2 className="mt-1 text-2xl font-medium sm:text-3xl">القطع المختارة</h2>
              </div>
              <Link href="/shop" className="border-b border-[#241d19] pb-1 text-xs sm:text-sm">
                متابعة التسوق
              </Link>
            </div>

            <div className="divide-y divide-[#241d19]/15">
              {items.map((item) => (
                <article key={`${item.productSlug}-${item.selectedSize ?? 'x'}`} className="grid gap-5 py-7 sm:grid-cols-[150px_1fr] sm:gap-7 sm:py-8">
                  <Link href={`/shop/${item.productSlug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#eee5da] sm:aspect-square">
                      <ProductImage
                        src={item.image}
                        alt={getProductArabicTitle(item.arabicTitle, item.title)}
                        categorySlug={inferCategory(item.collection)}
                        usage="thumb"
                      />
                    </div>
                  </Link>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.08em] text-[#817067] sm:text-[11px]">{displayCollectionAr(item.collection)}</p>
                        <Link href={`/shop/${item.productSlug}`} className="mt-1 block">
                          <h3 className="text-lg font-medium leading-6 sm:text-xl">
                            {getProductArabicTitle(item.arabicTitle, item.title)}
                          </h3>
                        </Link>
                        {item.selectedSize ? (
                          <p className="mt-2 text-xs text-[#75665d]">المقاس: {displaySizeAr(item.selectedSize)}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="shrink-0 border-b border-transparent pb-0.5 text-[11px] text-[#817067] transition hover:border-[#817067]"
                      >
                        حذف
                      </button>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-[#62554e]">{item.priceGuide}</p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#241d19]/10 pt-4">
                      <div>
                        <p className="mb-2 text-[11px] text-[#817067]">الكمية</p>
                        <div className="inline-grid grid-cols-[44px_48px_44px] items-center border-y border-[#241d19]/15">
                          <button
                            type="button"
                            aria-label={`تقليل كمية ${getProductArabicTitle(item.arabicTitle, item.title)}`}
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                            className="min-h-11 border-l border-[#241d19]/15 text-lg"
                          >
                            −
                          </button>
                          <span className="text-center text-sm tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`زيادة كمية ${getProductArabicTitle(item.arabicTitle, item.title)}`}
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="min-h-11 border-r border-[#241d19]/15 text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <label className="mt-5 block text-[11px] text-[#817067]">
                      ملاحظة على القطعة
                      <textarea
                        aria-label={`ملاحظة على ${getProductArabicTitle(item.arabicTitle, item.title)}`}
                        value={item.customNote ?? ''}
                        onChange={(event) => updateNote(item, event.target.value)}
                        placeholder="اللون أو التفاصيل المطلوبة"
                        className="mt-2 min-h-20 w-full resize-y border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm leading-6 outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
                      />
                    </label>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-[#241d19]/15 pt-6">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-xs font-medium">السعر النهائي بعد المراجعة</p>
                  <p className="mt-2 max-w-xl text-xs leading-6 text-[#75665d]">
                    بعض القطع سعرها بيتغير حسب المقاس والتخصيص والتشطيب؛ لذلك مش بنعرض إجمالي وهمي هنا. بهجة تؤكد التوفر والسعر النهائي معكِ قبل التنفيذ.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearBag}
                  className="w-fit border-b border-[#817067] pb-1 text-[11px] text-[#817067]"
                >
                  إفراغ السلة
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="border-b border-[#241d19]/15 pb-4">
              <p className="text-xs tracking-[0.12em] text-[#75665d]">02</p>
              <h2 className="mt-1 text-2xl font-medium sm:text-3xl">بيانات الطلب</h2>
              <p className="mt-3 max-w-md text-xs leading-6 text-[#75665d]">
                البيانات دي بتدخل في رسالة واتساب نفسها عشان نبدأ التأكيد من غير ما تعيدي كتابتها.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <label className="block text-xs text-[#75665d]">
                الاسم
                <input
                  aria-label="الاسم"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="اسمك"
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm text-[#241d19] outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
                />
              </label>

              <label className="block text-xs text-[#75665d]">
                رقم الهاتف
                <input
                  aria-label="رقم الهاتف"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="01xxxxxxxxx"
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-2 min-h-12 w-full border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm text-[#241d19] outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
                />
              </label>

              <label className="block text-xs text-[#75665d]">
                المنطقة / العنوان
                <input
                  aria-label="المنطقة / العنوان"
                  value={customerAddress}
                  onChange={(event) => setCustomerAddress(event.target.value)}
                  placeholder="المنطقة أو العنوان"
                  autoComplete="street-address"
                  className="mt-2 min-h-12 w-full border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm text-[#241d19] outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
                />
              </label>

              <label className="block text-xs text-[#75665d]">
                ملاحظات إضافية
                <textarea
                  aria-label="ملاحظات إضافية"
                  value={extraNotes}
                  onChange={(event) => setExtraNotes(event.target.value)}
                  placeholder="أي ملاحظة تخص الطلب كله"
                  className="mt-2 min-h-24 w-full resize-y border-x-0 border-b border-t border-[#241d19]/15 bg-transparent px-0 py-3 text-sm leading-6 text-[#241d19] outline-none placeholder:text-[#9a8a80] focus:border-[#241d19]"
                />
              </label>
            </div>

            <div className="mt-8 border-t border-[#241d19]/15 pt-6">
              <p className="text-xs tracking-[0.12em] text-[#75665d]">03 · التأكيد</p>
              <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-12 w-full items-center justify-center bg-[#241d19] px-5 py-3 text-center text-sm font-medium text-[#fffaf5] transition hover:bg-[#3a2f29]"
              >
                إرسال الطلب عبر واتساب
              </a>
              <p className="mt-3 text-[11px] leading-5 text-[#817067]">
                الرسالة تشمل القطع والمقاسات والكميات والملاحظات وبياناتكِ المكتوبة هنا.
              </p>
              <Link href="/shop" className="mt-5 inline-block border-b border-[#241d19] pb-1 text-xs">
                الرجوع للمتجر
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
