import CollectionCard from '@/components/CollectionCard';
import SectionShell from '@/components/SectionShell';
import { collections } from '@/content/bahja-products';

export default function CollectionsPage() {
  return <SectionShell title="Collections"><div className="grid gap-4 md:grid-cols-2">{collections.map((c) => <CollectionCard key={c.slug} title={c.title} arabicTitle={c.arabicTitle} href="/shop" description="Explore handcrafted pieces and ask directly on WhatsApp." />)}</div></SectionShell>;
}
