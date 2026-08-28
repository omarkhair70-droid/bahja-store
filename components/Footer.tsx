'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';

function EditorialGateFooter() {
  return (
    <footer className="border-t border-[#241d19]/12 bg-[#eee3d6] text-[#241d19]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-10 border-b border-[#241d19]/12 pb-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="بهجة ستور — الرئيسية" className="inline-block">
              <Image
                src="/images/bahja/brand/bahja-logo-horizontal.png"
                alt="بهجة ستور"
                width={220}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#6f5f55]">
              للغُرز حكايا… وهنا لكل غرزة حكاية. قطع هاند ميد وتجهيزات حسب الطلب من القاهرة.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:col-span-3" aria-label="روابط بهجة">
            <Link href="/shop" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">المتجر</Link>
            <Link href="/collections" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">المجموعات</Link>
            <Link href="/custom-orders" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">طلب خاص</Link>
            <Link href="/about" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">عن بهجة</Link>
            <Link href="/contact" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">تواصل معنا</Link>
            <Link href="/cart" className="w-fit border-b border-transparent pb-1 transition hover:border-[#241d19]">السلة</Link>
          </nav>

          <div className="space-y-4 text-sm lg:col-span-4 lg:text-left">
            <p className="text-[#6f5f55]">{site.locationAr}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="border-b border-[#241d19] pb-1">Instagram</a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="border-b border-[#241d19] pb-1">Facebook</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-[11px] text-[#7a6a60] sm:flex-row sm:items-center sm:justify-between">
          <p>Bahja Store · بهجة ستور</p>
          <p>Handmade pieces · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}

function LegacyFooter() {
  return (
    <footer className="mt-16 border-t border-bahja-beige/70 bg-bahja-cream/70">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 text-sm text-bahja-brown sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-3">
          <Image
            src="/images/bahja/brand/bahja-logo-primary.png"
            alt="بهجة ستور"
            width={150}
            height={150}
            className="h-16 w-auto"
          />
          <p className="text-bahja-taupe">للغُرز حكايا… وهنا لكل غرزة حكاية</p>
        </div>
        <div className="space-y-2 md:text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-bahja-beige/70 bg-white/65 px-3 py-1.5">
            <Image
              src="/images/bahja/brand/bahja-logo-mark.png"
              alt="Bahja mark"
              width={22}
              height={22}
              className="h-5 w-5"
            />
            <span className="text-xs text-bahja-taupe">Handmade with care</span>
          </div>
          <p>واتساب</p>
          <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-bahja-beige/70 bg-white/70 p-2 shadow-sm md:justify-end">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bahja-beige bg-white/80 px-4 py-2 text-sm font-medium text-bahja-brown transition-colors hover:border-bahja-taupe hover:text-bahja-taupe"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bahja-beige bg-white/80 px-4 py-2 text-sm font-medium text-bahja-brown transition-colors hover:border-bahja-taupe hover:text-bahja-taupe"
            >
              Instagram
            </a>
          </div>
          <p className="text-bahja-taupe">المقطم – الهضبة الوسطى، القاهرة، مصر</p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const pathname = usePathname();
  return pathname === '/' || pathname === '/shop' ? <EditorialGateFooter /> : <LegacyFooter />;
}
