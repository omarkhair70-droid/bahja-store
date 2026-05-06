import ProductCard from '@/components/ProductCard';
import SectionShell from '@/components/SectionShell';
import { products } from '@/content/bahja-products';

export default function ShopPage() {
  const groups = Object.groupBy(products, (p) => p.collection);
  return (
    <SectionShell title="Shop All Pieces" subtitle="Browse by collection and ask directly on WhatsApp.">
      <div className="space-y-10">
        {Object.entries(groups).map(([collection, items]) => (
          <section key={collection}>
            <h3 className="mb-4 text-2xl font-semibold">{collection}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items?.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
