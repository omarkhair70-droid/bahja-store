import CollectionCard from '@/components/CollectionCard';
import SectionShell from '@/components/SectionShell';
import type { Metadata } from 'next';

const topCollections = [
  { title: 'شنط خيط الهيمالايا', href: '/shop?collection=himalayan-thread-bags', description: 'تصاميم هادئة بتفاصيل يدوية دقيقة.', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp', slug: 'handmade-bags' },
  { title: 'شنط خيوط السلسلة', href: '/shop?collection=chain-thread-bags', description: 'ستايل أنثوي فاخر بطابع بوتيك.', image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp', slug: 'handmade-bags' }
];
const secondary = [
  { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', description: 'تفاصيل ناعمة تكمل الإطلالة.', image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp', slug: 'hair-accessories' },
  { title: 'لوحات كانفس', href: '/shop?category=canvas-art', description: 'قطع فنية حسب الطلب.', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', slug: 'canvas-art' }
];

export const metadata: Metadata = { title: 'المجموعات | بهجة ستور', description: 'مجموعات بهجة ستور مع تركيز أساسي على الشنط اليدوية.' };

export default function CollectionsPage() {
  return <SectionShell title="المجموعات" subtitle="تشكيلات بهجة ستور بترتيب يبدأ بالشنط أولًا.">
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">{topCollections.map((c)=><CollectionCard key={c.title} title={c.title} arabicTitle={c.title} href={c.href} description={c.description} image={c.image} categorySlug={c.slug} />)}</div>
      <div className="grid gap-4 md:grid-cols-2">{secondary.map((c)=><CollectionCard key={c.title} title={c.title} arabicTitle={c.title} href={c.href} description={c.description} image={c.image} categorySlug={c.slug} />)}</div>
    </div>
  </SectionShell>;
}
