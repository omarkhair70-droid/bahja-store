import Image from 'next/image';

export default function Footer() {
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
          <p className="text-bahja-taupe">المقطم – الهضبة الوسطى، القاهرة، مصر</p>
        </div>
      </div>
    </footer>
  );
}
