'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useOrderBag } from './OrderBagProvider';
import { cn } from '@/lib/utils';

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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-bahja-beige/60 bg-bahja-ivory/90 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-right text-base font-semibold leading-tight text-bahja-brown sm:text-xl">
            بهجة ستور
            <span className="block text-[10px] font-normal text-bahja-taupe sm:text-xs">Bahja Store</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link href="/cart" className="rounded-full border border-bahja-beige bg-white/80 px-2.5 py-1.5 text-[11px] sm:px-3 sm:py-2 sm:text-sm">
              السلة ({totalItems})
            </Link>
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm">
              واتساب
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 text-xs text-bahja-brown sm:mt-3 sm:gap-2 sm:text-sm lg:justify-center">
          {links.map(([label, href]) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3 py-1.5 transition',
                  isActive
                    ? 'border-bahja-beige bg-bahja-blush/45 text-bahja-brown'
                    : 'border-transparent bg-white/40 hover:border-bahja-beige hover:bg-bahja-cream'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
