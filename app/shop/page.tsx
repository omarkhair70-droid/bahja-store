import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { products } from '@/content/bahja-products';

type ShopSearchParams = { category?: string | string[]; collection?: string | string[] };
const FILTERS = [
  { label: 'كل القطع', sub: 'All', href: '/shop', type: 'all', value: '' },
  { label: 'الشنط', sub: 'Bags', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'خيط الهيمالايا', sub: 'Himalayan', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'خيوط السلسلة', sub: 'Chain', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'الإكسسوارات', sub: 'Accessories', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' },
  { label: 'الكانفس', sub: 'Canvas', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' }
] as const;
const sortOrder: Record<string, number> = { 'himalayan-thread-bags': 1, 'chain-thread-bags': 2, 'hair-accessories': 3, 'canvas-art': 4 };
const displayPriority: Record<string, number> = {
  'black-gold-chain-thread-bag': 1,
  'light-grey-himalayan-thread-bag': 2,
  'navy-himalayan-thread-bag': 3,
  'soft-sage-chain-thread-bag': 4,
  'silver-grey-chain-thread-bag': 5,
  'teal-himalayan-thread-bag': 8
};

export const metadata: Metadata = { title: 'الشنط والقطع اليدوية | بهجة ستور', description: 'تصفحي الشنط أولًا ثم الإكسسوارات والكانفس، وأضيفي القطع للسلة لإرسال الطلب عبر واتساب.' };

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const filteredProducts = products
    .filter((p) => selectedCollection ? p.collectionSlug === selectedCollection : selectedCategory ? p.categorySlug === selectedCategory : true)
    .sort((a, b) => ((sortOrder[a.collectionSlug] ?? 99) - (sortOrder[b.collectionSlug] ?? 99)) || ((displayPriority[a.slug] ?? 50) - (displayPriority[b.slug] ?? 50)));
  const active = FILTERS.find((f) => selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all');

  return <SectionShell title="المتجر" subtitle="تصاميم هادئة بلمسة يدوية. Bags first ثم الإكسسوارات والكانفس.">
    <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 whitespace-nowrap [&::-webkit-scrollbar]:hidden">{FILTERS.map((f)=><Link key={f.label} href={f.href} className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm ${active?.label===f.label ? 'border-bahja-rose/40 bg-bahja-blush/45' : 'border-bahja-beige/70 bg-white/55'}`}><span>{f.label}</span><span className="ms-1 text-[10px] text-bahja-taupe">{f.sub}</span></Link>)}</div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((p)=><ProductCard key={p.slug} product={p} />)}</div>
  </SectionShell>;
}
