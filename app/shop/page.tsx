import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { products } from '@/content/bahja-products';

type ShopSearchParams = {
  category?: string | string[];
  collection?: string | string[];
};

const FILTERS = [
  { label: 'كل القطع', href: '/shop', type: 'all', value: '' },
  { label: 'شنط هاند ميد', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'شنط خيط الهيمالايا', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'شنط خيوط السلسلة', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'لوحات كانفس', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' },
  { label: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' }
] as const;

const SECTION_ORDER = ['himalayan-thread-bags', 'chain-thread-bags', 'canvas-art', 'hair-accessories'];

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const filteredProducts = products.filter((product) => selectedCollection ? product.collectionSlug === selectedCollection : selectedCategory ? product.categorySlug === selectedCategory : true);
  const activeFilter = FILTERS.find((f) => (selectedCollection ? f.type === 'collection' && f.value === selectedCollection : selectedCategory ? f.type === 'category' && f.value === selectedCategory : f.type === 'all'));

  return (
    <SectionShell title="المتجر" subtitle="تصفحي القطع حسب المجموعة، ثم أضيفي ما يعجبكِ إلى السلة أو ارسلي استفساركِ عبر واتساب.">
      <div className="space-y-10">
        <div className="subtle-panel p-5">
          <p className="mb-4 text-sm text-bahja-taupe">تصفية حسب المجموعة أو التصنيف</p>
          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((filter) => {
              const isActive = filter.label === activeFilter?.label;
              return <Link key={filter.label} href={filter.href} className={`rounded-full border px-4 py-2 text-sm transition ${isActive ? 'border-bahja-brown bg-bahja-brown text-white' : 'border-bahja-beige bg-white/80 text-bahja-brown hover:border-bahja-rose hover:bg-bahja-cream'}`}>{filter.label}</Link>;
            })}
          </div>
        </div>

        {SECTION_ORDER.map((sectionSlug) => {
          const sectionItems = filteredProducts.filter((product) => product.collectionSlug === sectionSlug || (sectionSlug === 'himalayan-thread-bags' && product.categorySlug === 'handmade-bags' && selectedCategory === 'handmade-bags' && product.collectionSlug === 'himalayan-thread-bags'));
          if (sectionItems.length === 0) return null;
          return (
            <section key={sectionSlug} className="space-y-5">
              <h3 className="text-2xl font-semibold text-bahja-brown sm:text-3xl">{sectionItems[0].collection}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sectionItems.map((product) => <ProductCard key={product.slug} product={product} />)}
              </div>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
