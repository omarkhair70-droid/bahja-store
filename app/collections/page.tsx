import CollectionCard from '@/components/CollectionCard';
import SectionShell from '@/components/SectionShell';
import type { Metadata } from 'next';

const topCollections = [
  { title: 'شنط خيط الهيمالايا', en: 'Himalayan Thread Bags', href: '/shop?collection=himalayan-thread-bags', description: 'قطع هادئة بتفاصيل يدوية ولمسة ناعمة.', image: '/images/bahja/redesigned/light-grey-himalayan/light-grey-himalayan-thread-bag-card.png', slug: 'handmade-bags' },
  { title: 'شنط خيوط السلسلة', en: 'Chain Thread Bags', href: '/shop?collection=chain-thread-bags', description: 'تصاميم أنثوية بتشطيب مرتب يناسب كل يوم.', image: '/images/bahja/redesigned/soft-sage-chain/soft-sage-chain-thread-bag-card.png', slug: 'handmade-bags' }
];
const secondary = [
  { title: 'إكسسوارات شعر', en: 'Hair Accessories', href: '/shop?category=hair-accessories', description: 'تفاصيل بسيطة تكمل الإطلالة بهدوء.', image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp', slug: 'hair-accessories' },
  { title: 'لوحات كانفس', en: 'Canvas Art', href: '/shop?category=canvas-art', description: 'لوحات حسب الطلب بلمسة شخصية دافئة.', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', slug: 'canvas-art' }
];
export const metadata: Metadata = { title: 'المجموعات | بهجة ستور', description: 'مجموعات بهجة ستور مع تركيز أساسي على الشنط اليدوية.' };
export default function CollectionsPage() {
  return <SectionShell label="اختاري حكايتك" title="المجموعات" subtitle="اكتشفي مجموعات بهجة من الشنط إلى التفاصيل المكملة.">
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">{topCollections.map((c)=><CollectionCard key={c.title} title={c.en} arabicTitle={c.title} href={c.href} description={c.description} image={c.image} categorySlug={c.slug} />)}</div>
      <div className="grid gap-4 md:grid-cols-2">{secondary.map((c)=><CollectionCard key={c.title} title={c.en} arabicTitle={c.title} href={c.href} description={c.description} image={c.image} categorySlug={c.slug} />)}</div>
    </div>
  </SectionShell>;
}
