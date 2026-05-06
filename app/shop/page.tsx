import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/content/bahja-products';

type ShopSearchParams = { category?: string | string[]; collection?: string | string[] };
const FILTERS = [
  { label: 'All Pieces', href: '/shop', type: 'all', value: '' },
  { label: 'Handmade Bags', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'Himalayan Thread Bags', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'Chain Thread Bags', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'Canvas Art', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' },
  { label: 'Hair Accessories', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' }
] as const;
const SECTION_ORDER = ['himalayan-thread-bags', 'chain-thread-bags', 'canvas-art', 'hair-accessories'];

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const filteredProducts = products.filter((p) => selectedCollection ? p.collectionSlug === selectedCollection : selectedCategory ? p.categorySlug === selectedCategory : true);
  const active = FILTERS.find((f) => selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all');

  return <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
    <section className="rounded-[2rem] border border-bahja-beige bg-gradient-to-br from-[#fff9f2] via-[#f9ece6] to-[#f2ddd4] p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.2em] text-bahja-taupe">Bahja Boutique Wall</p><h1 className="mt-2 text-4xl text-bahja-brown">Shop by mood, texture, and story.</h1><p className="mt-2 text-sm text-bahja-taupe">Active filter: {active?.label}</p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">{FILTERS.map((f)=>{const on=f.label===active?.label;return <Link key={f.label} href={f.href} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${on?'border-bahja-brown bg-bahja-brown text-white':'border-bahja-beige bg-white/85 text-bahja-brown'}`}>{f.label}</Link>;})}</div>
    </section>
    {SECTION_ORDER.map((slug)=>{const items=filteredProducts.filter((p)=>p.collectionSlug===slug); if(!items.length) return null; return <section key={slug} className="space-y-4"><div className="rounded-2xl border border-bahja-beige/80 bg-white/80 p-4"><h2 className="text-2xl text-bahja-brown">{items[0].collection}</h2><p className="text-sm text-bahja-taupe">Handmade, made to order, and styled like a soft lookbook selection.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((p)=><ProductCard key={p.slug} product={p} />)}</div></section>;})}
  </main>;
}
