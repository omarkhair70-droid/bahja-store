'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useOrderBag } from './OrderBagProvider';
import { cn } from '@/lib/utils';

const links = [
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
      <nav className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2 sm:px-6 lg:px-8">
        <div className="justify-self-start flex items-center gap-1.5 sm:gap-2">
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-2.5 py-1.5 text-[11px] leading-none sm:px-4 sm:py-2 sm:text-sm">واتساب</WhatsAppButton>
          <Link href="/cart" className="rounded-full border border-bahja-beige/70 bg-white/75 px-2.5 py-1.5 text-[11px] leading-none sm:px-3 sm:py-2 sm:text-sm">السلة ({totalItems})</Link>
        </div>

        <div className="flex justify-center gap-1 overflow-x-auto whitespace-nowrap text-xs sm:gap-2 sm:text-sm [&::-webkit-scrollbar]:hidden">
          {links.map(([label, href]) => {
            const activePath = href.split('?')[0];
            const isActive = activePath === '/' ? pathname === '/' : pathname.startsWith(activePath);
            return <Link key={href} href={href} className={cn('shrink-0 rounded-full px-3 py-1.5 transition', isActive ? 'bg-bahja-blush/55 text-bahja-brown' : 'text-bahja-taupe hover:bg-white/60 hover:text-bahja-brown')}>{label}</Link>;
          })}
        </div>

        <Link href="/" className="justify-self-end text-right text-base font-semibold leading-tight text-bahja-brown sm:text-xl">
          بهجة ستور
          <span className="block text-[9px] font-normal text-bahja-taupe sm:text-xs">Bahja Store</span>
        </Link>
      </nav>
    </header>
  );
}
