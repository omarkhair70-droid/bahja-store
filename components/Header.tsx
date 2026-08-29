'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useOrderBag } from './OrderBagProvider';

const nav = [
  { label: 'المتجر', href: '/shop', match: '/shop' },
  { label: 'المجموعات', href: '/collections', match: '/collections' },
  { label: 'طلب خاص', href: '/custom-orders', match: '/custom-orders' },
  { label: 'عن بهجة', href: '/about', match: '/about' },
  { label: 'تواصل معنا', href: '/contact', match: '/contact' }
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useOrderBag();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#201a17]/10 bg-[#f8f4ed]/95 backdrop-blur-md">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10" aria-label="التنقل الرئيسي">
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center lg:h-[78px]">
          <div className="hidden items-center gap-6 text-[13px] text-[#3f342f] lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.match);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`border-b py-2 transition ${active ? 'border-[#3f342f]' : 'border-transparent hover:border-[#3f342f]'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="bahja-main-menu"
            onClick={() => setOpen((value) => !value)}
            className="min-h-11 justify-self-start px-2 text-sm text-[#29211d] lg:hidden"
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
            <Link href="/custom-orders" className="hidden border-b border-transparent py-2 transition hover:border-[#29211d] sm:inline lg:hidden">
              طلب خاص
            </Link>
            <Link href="/cart" className={`whitespace-nowrap border-b py-2 ${pathname === '/cart' ? 'border-[#29211d]' : 'border-transparent hover:border-[#29211d]'}`}>
              السلة <span className="tabular-nums">({totalItems})</span>
            </Link>
          </div>
        </div>

        {open && (
          <div id="bahja-main-menu" className="border-t border-[#201a17]/10 py-4 lg:hidden">
            <div className="grid gap-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.match);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between border-b border-[#201a17]/10 py-2 text-sm text-[#29211d]"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">{active ? '—' : '↙'}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
