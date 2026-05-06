import CollectionCard from '@/components/CollectionCard';
import SectionShell from '@/components/SectionShell';

const collectionCards = [
  {
    title: 'Himalayan Thread Bags',
    arabicTitle: 'شنط خيط الهيمالايا',
    href: '/shop?collection=himalayan-thread-bags',
    description: 'Textured handmade pieces with elegant chain finishing.',
    image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp'
  },
  {
    title: 'Chain Thread Bags',
    arabicTitle: 'شنط خيوط السلسلة',
    href: '/shop?collection=chain-thread-bags',
    description: 'Signature chain-thread designs in rich boutique tones.',
    image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp'
  },
  {
    title: 'Canvas Art',
    arabicTitle: 'فن الكانفس',
    href: '/shop?category=canvas-art',
    description: 'Arabic calligraphy canvas pieces made with warmth and soul.',
    image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp'
  },
  {
    title: 'Hair Accessories',
    arabicTitle: 'اكسسوارات الشعر',
    href: '/shop?category=hair-accessories',
    description: 'Soft satin accents for graceful everyday styling.',
    image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp'
  }
];

export default function CollectionsPage() {
  return <SectionShell title="Collections" subtitle="Explore each story and open the exact matching pieces."><div className="grid gap-4 md:grid-cols-2">{collectionCards.map((c) => <CollectionCard key={c.title} title={c.title} arabicTitle={c.arabicTitle} href={c.href} description={c.description} image={c.image} />)}</div></SectionShell>;
}
