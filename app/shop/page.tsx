import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { products } from '@/content/bahja-products';

type ShopSearchParams = { category?: string | string[]; collection?: string | string[] };
const FILTERS = [
  { label: 'كل القطع', href: '/shop', type: 'all', value: '' },
  { label: 'شنط هاند ميد', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'شنط خيط الهيمالايا', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'شنط خيوط السلسلة', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'لوحات كانفس', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' },
  { label: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' }
] as const;

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const filteredProducts = products.filter((p) => selectedCollection ? p.collectionSlug === selectedCollection : selectedCategory ? p.categorySlug === selectedCategory : true);
  const active = FILTERS.find((f) => selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all');

  return <SectionShell title="متجر بهجة" subtitle="تصفحي القطع، أضيفي للسلة، وأكملي طلبك عبر واتساب بسهولة.">
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">{FILTERS.map((f)=><Link key={f.label} href={f.href} className={`bahja-chip ${active?.label===f.label ? 'bg-bahja-blush/45 border-bahja-rose' : ''}`}>{f.label}</Link>)}</div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((p)=><ProductCard key={p.slug} product={p} />)}</div>
  </SectionShell>;
}
