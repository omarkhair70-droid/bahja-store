'use client';

import Link from 'next/link';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useOrderBag } from './OrderBagProvider';

const links = [
  ['الرئيسية', '/'],
  ['المتجر', '/shop'],
  ['المجموعات', '/collections'],
  ['قصتنا', '/about'],
  ['الطلبات الخاصة', '/custom-orders'],
  ['تواصل معنا', '/contact']
];

export default function Header() {
  const { totalItems } = useOrderBag();
  return (
    <header className="sticky top-0 z-30 border-b border-bahja-beige/60 bg-bahja-ivory/90 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-bahja-brown sm:text-xl">بهجة ستور <span className="text-sm text-bahja-taupe">| Bahja Store</span></Link>
        <div className="order-3 flex w-full flex-wrap justify-center gap-2 text-sm text-bahja-brown md:order-2 md:w-auto md:justify-end">
          {links.map(([label, href]) => <Link key={href} href={href} className="rounded-full px-3 py-1.5 hover:bg-bahja-cream">{label}</Link>)}
        </div>
        <div className="order-2 flex items-center gap-2 md:order-3">
          <Link href="/cart" className="rounded-full border border-bahja-beige bg-white/80 px-3 py-2 text-xs sm:text-sm">السلة ({totalItems})</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-4 py-2 text-xs sm:text-sm">واتساب</WhatsAppButton>
        </div>
      </nav>
    </header>
  );
}
