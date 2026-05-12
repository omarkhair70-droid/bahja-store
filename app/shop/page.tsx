import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { publicProducts } from '@/content/bahja-products';

type ShopSearchParams = { category?: string | string[]; collection?: string | string[] };
const FILTERS = [
  { label: 'كل القطع', sub: 'All', href: '/shop', type: 'all', value: '' },
  { label: 'الشنط', sub: 'Bags', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'خيط الهيمالايا', sub: 'Himalayan', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'خيوط السلسلة', sub: 'Chain Thread', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'إليجانت كلاتش', sub: 'Clutch', href: '/shop?collection=elegant-clutch', type: 'collection', value: 'elegant-clutch' },
  { label: 'الإكسسوارات', sub: 'Accessories', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' },
  { label: 'الكانفس', sub: 'Canvas', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' }
] as const;
export const metadata: Metadata = { title: 'الشنط والقطع اليدوية | بهجة ستور', description: 'تصفحي الشنط أولًا ثم الإكسسوارات والكانفس، وأضيفي القطع للسلة لإرسال الطلب عبر واتساب.' };
export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const filteredProducts = publicProducts.filter((p) => selectedCollection ? p.collectionSlug === selectedCollection : selectedCategory ? p.categorySlug === selectedCategory : true);
  const active = FILTERS.find((f) => selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all');

  return <SectionShell label="اختاري حكايتك" title="المتجر" subtitle="قطع هاند ميد مصممة بهدوء. اختاري المجموعة المناسبة ثم أرسلي طلبكِ عبر واتساب.">
    <div className="mb-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 whitespace-nowrap [direction:rtl] [&::-webkit-scrollbar]:hidden">{FILTERS.map((f)=><Link key={f.label} href={f.href} className={`shrink-0 rounded-full border px-3.5 py-2 text-xs transition sm:text-sm ${active?.label===f.label ? 'border-bahja-rose/40 bg-bahja-blush/45 text-bahja-brown' : 'border-bahja-beige/70 bg-white/65 text-bahja-taupe'}`}><span>{f.label}</span><span className="ms-1 text-[10px]">{f.sub}</span></Link>)}</div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((p)=><ProductCard key={p.slug} product={p} />)}</div>
  </SectionShell>;
}
