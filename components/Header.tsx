import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Collections', '/collections'],
  ['About', '/about'],
  ['Custom Orders', '/custom-orders'],
  ['Contact', '/contact']
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-bahja-beige/60 bg-bahja-ivory/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-bahja-brown">Bahja Store <span className="text-bahja-taupe">| بهجة ستور</span></Link>
        <div className="flex flex-wrap gap-3 text-sm text-bahja-brown">
          {links.map(([label, href]) => <Link key={href} href={href} className="rounded-full px-3 py-1 hover:bg-bahja-cream">{label}</Link>)}
        </div>
      </nav>
    </header>
  );
}
