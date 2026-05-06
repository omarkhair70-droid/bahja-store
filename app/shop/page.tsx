import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { products } from '@/content/bahja-products';

const FILTERS = [
  { label: 'All Pieces', href: '/shop', type: 'all', value: '' },
  { label: 'Handmade Bags', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'Himalayan Thread Bags', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'Chain Thread Bags', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'Canvas Art', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' },
  { label: 'Hair Accessories', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' }
] as const;

const SECTION_ORDER = ['himalayan-thread-bags', 'chain-thread-bags', 'canvas-art', 'hair-accessories'];

export default function ShopPage({ searchParams }: { searchParams: { category?: string; collection?: string } }) {
  const category = searchParams.category;
  const collection = searchParams.collection;

  const filteredProducts = products.filter((product) => {
    if (collection) return product.collectionSlug === collection;
    if (category) return product.categorySlug === category;
    return true;
  });

  const activeFilter = FILTERS.find((f) => (collection ? f.type === 'collection' && f.value === collection : category ? f.type === 'category' && f.value === category : f.type === 'all'));

  return (
    <SectionShell title="Shop All Pieces" subtitle="Browse by category or collection, then ask directly on WhatsApp.">
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = filter.label === activeFilter?.label;
            return (
              <Link key={filter.label} href={filter.href} className={`rounded-full border px-4 py-2 text-sm transition ${isActive ? 'border-bahja-brown bg-bahja-brown text-white' : 'border-bahja-beige bg-white text-bahja-brown hover:border-bahja-taupe'}`}>
                {filter.label}
              </Link>
            );
          })}
        </div>

        {SECTION_ORDER.map((sectionSlug) => {
          const sectionItems = filteredProducts.filter((product) => product.collectionSlug === sectionSlug || (sectionSlug === 'himalayan-thread-bags' && product.categorySlug === 'handmade-bags' && category === 'handmade-bags' && product.collectionSlug === 'himalayan-thread-bags'));
          if (sectionItems.length === 0) return null;
          return (
            <section key={sectionSlug}>
              <h3 className="mb-4 text-2xl font-semibold">{sectionItems[0].collection}</h3>
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
