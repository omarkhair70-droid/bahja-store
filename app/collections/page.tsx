import Image from 'next/image';
import Link from 'next/link';

const cards = [
  { title: 'Himalayan Thread Bags', ar: 'شنط خيط الهيمالايا', href: '/shop?collection=himalayan-thread-bags', desc: 'Textured silhouettes with graceful golden rhythm.', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp', cls: 'md:col-span-2' },
  { title: 'Chain Thread Bags', ar: 'شنط خيوط السلسلة', href: '/shop?collection=chain-thread-bags', desc: 'Boutique icons balancing polish and softness.', image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp', cls: 'md:row-span-2' },
  { title: 'Canvas Art', ar: 'فن الكانفس', href: '/shop?category=canvas-art', desc: 'Arabic floral soul for poetic spaces.', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', cls: '' },
  { title: 'Hair Accessories', ar: 'اكسسوارات الشعر', href: '/shop?category=hair-accessories', desc: 'Satin stories in delicate feminine shades.', image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp', cls: 'md:col-span-2' }
];

export default function CollectionsPage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"><h1 className="text-4xl text-bahja-brown">Collections Lookbook</h1><div className="grid gap-4 md:grid-cols-3">{cards.map((c)=><Link key={c.title} href={c.href} className={`group overflow-hidden rounded-[2rem] border border-bahja-beige bg-white/80 shadow-soft ${c.cls}`}><div className="relative aspect-[16/10]"><Image src={c.image} alt={c.title} fill className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="space-y-1 p-5"><p className="text-sm text-bahja-taupe">{c.ar}</p><h2 className="text-2xl text-bahja-brown">{c.title}</h2><p className="text-sm text-bahja-taupe">{c.desc}</p><p className="pt-2 text-sm font-medium text-bahja-brown">Open story →</p></div></Link>)}</div></main>;
}
