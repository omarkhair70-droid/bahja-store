'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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

const homeNav = [
  { label: 'المتجر', href: '/shop' },
  { label: 'الشنط', href: '/shop?category=handmade-bags' },
  { label: 'المجموعات', href: '/collections' },
  { label: 'طلب خاص', href: '/custom-orders' },
  { label: 'عن بهجة', href: '/about' }
];

function EditorialGateHeader() {
  const { totalItems } = useOrderBag();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#201a17]/10 bg-[#f8f4ed]/95 backdrop-blur-md">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10" aria-label="التنقل الرئيسي">
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center lg:h-[78px]">
          <div className="hidden items-center gap-6 text-[13px] text-[#3f342f] lg:flex">
            {homeNav.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-transparent py-2 transition hover:border-[#3f342f]">
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="bahja-home-menu"
            onClick={() => setOpen((value) => !value)}
            className="justify-self-start p-2 text-sm text-[#29211d] lg:hidden"
          >
            {open ? 'إغلاق' : 'القائمة'}
          </button>

          <Link href="/" aria-label="بهجة ستور — الرئيسية" className="justify-self-center">
            <Image
              src="/images/bahja/brand/bahja-logo-horizontal.png"
              alt="بهجة ستور"
              width={220}
              height={60}
              priority
              className="h-9 w-auto sm:h-10 lg:h-11"
            />
          </Link>

          <div className="flex items-center justify-self-end gap-4 text-[13px] text-[#29211d]">
            <Link href="/custom-orders" className="hidden border-b border-transparent py-2 transition hover:border-[#29211d] sm:inline">
              طلب خاص
            </Link>
            <Link href="/cart" className="whitespace-nowrap border-b border-[#29211d] py-2">
              السلة <span className="tabular-nums">({totalItems})</span>
            </Link>
          </div>
        </div>

        {open && (
          <div id="bahja-home-menu" className="border-t border-[#201a17]/10 py-4 lg:hidden">
            <div className="grid gap-1">
              {homeNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between border-b border-[#201a17]/10 py-2 text-sm text-[#29211d]"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↙</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default function Header() {
  const { totalItems } = useOrderBag();
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/shop') return <EditorialGateHeader />;

  return (
    <header className="sticky top-0 z-30 border-b border-bahja-beige/45 bg-bahja-ivory/95 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <div className="flex items-center gap-1.5">
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">واتساب <span className="text-[10px] text-bahja-taupe">WhatsApp</span></WhatsAppButton>
            <Link href="/cart" className="rounded-full border border-bahja-beige/70 bg-white/75 px-2.5 py-1.5 text-[11px] leading-none sm:text-sm">السلة <span className="text-[10px] text-bahja-taupe">Cart</span> ({totalItems})</Link>
          </div>
          <Link href="/" aria-label="Bahja Store Home" className="mx-auto block w-fit">
            <Image
              src="/images/bahja/brand/bahja-logo-horizontal.png"
              alt="بهجة ستور | Bahja Store"
              width={220}
              height={60}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>
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
