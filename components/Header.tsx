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
      <nav className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:px-8">
        <Link href="/" className="justify-self-start text-right text-lg font-semibold leading-tight text-bahja-brown sm:text-xl">
          بهجة ستور
          <span className="block text-xs font-normal text-bahja-taupe">Bahja Store</span>
        </Link>

        <div className="order-3 flex w-full flex-wrap justify-center gap-2 text-sm text-bahja-brown lg:order-none">
          {links.map(([label, href]) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-full border px-3 py-1.5 transition',
                  isActive
                    ? 'border-bahja-beige bg-bahja-blush/40 text-bahja-brown'
                    : 'border-transparent hover:border-bahja-beige hover:bg-bahja-cream'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="justify-self-end flex items-center gap-2">
          <Link href="/cart" className="rounded-full border border-bahja-beige bg-white/80 px-3 py-2 text-xs sm:text-sm">
            السلة ({totalItems})
          </Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-4 py-2 text-xs sm:text-sm">
            واتساب
          </WhatsAppButton>
        </div>
      </nav>
    </header>
  );
}
