'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useOrderBag } from './OrderBagProvider';
import { cn } from '@/lib/utils';

const navLinks = [
  { ar: 'الرئيسية', en: 'Home', href: '/' },
  { ar: 'الشنط', en: 'Bags', href: '/shop?category=handmade-bags' },
  { ar: 'إكسسوارات', en: 'Accessories', href: '/shop?category=hair-accessories' },
  { ar: 'طلب خاص', en: 'Custom', href: '/custom-orders' },
  { ar: 'تواصل معنا', en: 'Contact', href: '/contact' }
];

export default function Header() {
  const { totalItems } = useOrderBag();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-bahja-beige/45 bg-bahja-ivory/95 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <div className="flex items-center gap-1.5">
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">واتساب <span className="text-[10px] text-bahja-taupe">WhatsApp</span></WhatsAppButton>
            <Link href="/cart" className="rounded-full border border-bahja-beige/70 bg-white/75 px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">السلة <span className="text-[10px] text-bahja-taupe">Cart</span> ({totalItems})</Link>
          </div>
          <Link href="/" className="text-center text-base font-semibold leading-tight text-bahja-brown sm:text-xl">بهجة ستور<span className="block text-[10px] font-normal text-bahja-taupe">Bahja Store</span></Link>
          <div />
        </div>

        <div className="mt-2 flex gap-1 overflow-x-auto pb-1 [direction:rtl] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-5 sm:overflow-visible">
          {navLinks.map((item) => {
            const activePath = item.href.split('?')[0];
            const isActive = activePath === '/' ? pathname === '/' : pathname.startsWith(activePath);
            return <Link key={item.href} href={item.href} className={cn('shrink-0 rounded-full bg-white/45 px-2 py-1.5 text-center transition', isActive ? 'bg-bahja-blush/55 text-bahja-brown' : 'text-bahja-taupe')}><span className="text-[11px] sm:text-xs">{item.ar} <span className="text-[10px]">{item.en}</span></span></Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
