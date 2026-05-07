'use client';

import Image from 'next/image';
import { useOrderBag } from './OrderBagProvider';
import { buildOrderWhatsAppMessage } from '@/lib/order-bag';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { displaySizeBilingual } from '@/lib/utils';

export default function OrderBagDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, updateNote, totalItems } = useOrderBag();
  const whatsappUrl = getWhatsAppUrl(buildOrderWhatsAppMessage(items));

  return (
    <>
      {isOpen && <button onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-bahja-brown/35" />}
      <aside className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-bahja-beige bg-bahja-ivory p-4 shadow-soft transition duration-300 sm:w-[420px] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between"><h3 className="text-xl font-semibold">Order Bag ({totalItems})</h3><button onClick={() => setIsOpen(false)}>✕</button></div>
        <p className="mt-2 text-xs text-bahja-taupe">Prices may vary depending on design details, customization, and finishing quality.<br/>قد تختلف الأسعار حسب التفاصيل والتخصيص وجودة التشطيب لكل قطعة.</p>
        <div className="mt-4 max-h-[65vh] space-y-4 overflow-auto pr-1">
          {items.map((item) => (
            <div key={`${item.productSlug}-${item.selectedSize ?? 'x'}`} className="rounded-2xl border border-bahja-beige/70 bg-white/80 p-3">
              <div className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl"><Image src={item.image} alt={item.title} fill className="object-cover" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{item.title}</p>{item.selectedSize && <p className="text-xs text-bahja-taupe">Size: {displaySizeBilingual(item.selectedSize)}</p>}</div>
                <button onClick={() => removeItem(item)} className="text-xs text-bahja-terracotta">Remove</button>
              </div>
              <div className="mt-2 flex items-center gap-2"><button onClick={() => updateQuantity(item, item.quantity - 1)} className="rounded-full border px-2">-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item, item.quantity + 1)} className="rounded-full border px-2">+</button></div>
              <textarea value={item.customNote ?? ''} onChange={(e) => updateNote(item, e.target.value)} placeholder="Add note" className="mt-2 w-full rounded-xl border border-bahja-beige p-2 text-xs" />
            </div>
          ))}
          {items.length === 0 && <p className="rounded-2xl border border-dashed border-bahja-beige p-4 text-sm text-bahja-taupe">Your order bag is empty.</p>}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <a href={items.length ? whatsappUrl : '#'} target="_blank" className={`rounded-full px-4 py-3 text-center text-sm ${items.length ? 'bg-bahja-brown text-white' : 'bg-bahja-beige text-bahja-taupe pointer-events-none'}`}>Send Order on WhatsApp</a>
          <button onClick={() => setIsOpen(false)} className="rounded-full border border-bahja-taupe px-4 py-3 text-sm">Continue Shopping</button>
        </div>
      </aside>
    </>
  );
}
