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

export const metadata: Metadata = { title: 'الشنط والقطع اليدوية | بهجة ستور', description: 'تصفحي الشنط أولًا ثم الإكسسوارات والكانفس، وأضيفي القطع للسلة لإرسال الطلب عبر واتساب.' };

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const collectionOrder: Record<string, number> = { 'himalayan-thread-bags': 1, 'chain-thread-bags': 2, 'hair-accessories': 3, 'canvas-art': 4 };
  const variantOrder: Record<string, number> = { bag: 1, accessory: 3, 'canvas-custom': 4 };
  const filteredProducts = products
    .filter((p) => selectedCollection ? p.collectionSlug === selectedCollection : selectedCategory ? p.categorySlug === selectedCategory : true)
    .sort((a, b) => ((variantOrder[a.cardVariant ?? 'bag'] ?? 9) - (variantOrder[b.cardVariant ?? 'bag'] ?? 9)) || ((collectionOrder[a.collectionSlug] ?? 99) - (collectionOrder[b.collectionSlug] ?? 99)) || ((a.displayPriority ?? 99) - (b.displayPriority ?? 99)));
  const active = FILTERS.find((f) => selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all');

  return <SectionShell title="المتجر" subtitle="تصاميم هادئة بلمسة يدوية. Bags first ثم الإكسسوارات والكانفس.">
    <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-2 pb-2 whitespace-nowrap [direction:rtl] [&::-webkit-scrollbar]:hidden">{FILTERS.map((f)=><Link key={f.label} href={f.href} className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm ${active?.label===f.label ? 'border-bahja-rose/40 bg-bahja-blush/45' : 'border-bahja-beige/70 bg-white/55'}`}><span>{f.label}</span><span className="ms-1 text-[10px] text-bahja-taupe">{f.sub}</span></Link>)}</div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((p)=><ProductCard key={p.slug} product={p} />)}</div>
  </SectionShell>;
}
