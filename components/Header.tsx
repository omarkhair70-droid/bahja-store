'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useOrderBag } from './OrderBagProvider';
import { cn } from '@/lib/utils';

const navLinks = [
  ['الرئيسية', '/'],
  ['الشنط', '/shop?category=handmade-bags'],
  ['إكسسوارات', '/shop?category=hair-accessories'],
  ['طلب خاص', '/custom-orders']
];

export default function Header() {
  const { totalItems } = useOrderBag();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-bahja-beige/45 bg-bahja-ivory/95 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">واتساب</WhatsAppButton>
          <Link href="/" className="text-center text-base font-semibold leading-tight text-bahja-brown sm:text-xl">بهجة ستور</Link>
          <Link href="/cart" className="rounded-full border border-bahja-beige/70 bg-white/75 px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">السلة ({totalItems})</Link>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-xs sm:text-sm">
          {navLinks.map(([label, href]) => {
            const activePath = href.split('?')[0];
            const isActive = activePath === '/' ? pathname === '/' : pathname.startsWith(activePath);
            return <Link key={href} href={href} className={cn('rounded-full px-2 py-1.5 transition', isActive ? 'bg-bahja-blush/55 text-bahja-brown' : 'text-bahja-taupe bg-white/45')}>{label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
