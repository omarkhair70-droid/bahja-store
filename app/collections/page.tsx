import CollectionCard from '@/components/CollectionCard';
import SectionShell from '@/components/SectionShell';
import type { Metadata } from 'next';

const collectionCards = [
  {
    title: 'شنط خيط الهيمالايا',
    arabicTitle: 'شنط خيط الهيمالايا',
    href: '/shop?collection=himalayan-thread-bags',
    description: 'تصاميم هيمالايا بتفاصيل دافئة وأناقة ناعمة.',
    image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp'
  },
  {
    title: 'شنط خيوط السلسلة',
    arabicTitle: 'شنط خيوط السلسلة',
    href: '/shop?collection=chain-thread-bags',
    description: 'شنط خيوط السلسلة بتفاصيل عصرية ولمسة أنثوية.',
    image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp'
  },
  {
    title: 'لوحات كانفس',
    arabicTitle: 'لوحات كانفس',
    href: '/shop?category=canvas-art',
    description: 'لوحات كانفس بروح فنية تجمع بين الخط العربي والزهور.',
    image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp'
  },
  {
    title: 'إكسسوارات شعر',
    arabicTitle: 'إكسسوارات شعر',
    href: '/shop?category=hair-accessories',
    description: 'إكسسوارات شعر ساتان ناعمة لإطلالة يومية رقيقة.',
    image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp'
  }
];

export const metadata: Metadata = {
  title: 'المجموعات | بهجة ستور',
  description: 'اكتشفي مجموعات بهجة ستور: شنط خيط الهيمالايا، شنط خيوط السلسلة، لوحات كانفس، وإكسسوارات شعر.',
};

export default function المجموعاتPage() {
  return (
    <SectionShell title="المجموعات" subtitle="تشكيلات بهجة ستور بلمسة يدوية أنيقة.">
      <div className="grid gap-4 md:grid-cols-2">
        {collectionCards.map((c) => (
          <CollectionCard key={c.title} title={c.title} arabicTitle={c.arabicTitle} href={c.href} description={c.description} image={c.image} categorySlug={c.href.includes("canvas-art") ? "canvas-art" : c.href.includes("hair-accessories") ? "hair-accessories" : "handmade-bags"} />
        ))}
      </div>
    </SectionShell>
  );
}
