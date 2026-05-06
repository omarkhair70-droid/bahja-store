import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = products.slice(0, 6);
  const categories = [
    { title: 'شنط هاند ميد', href: '/shop?category=handmade-bags', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp', slug: 'handmade-bags' },
    { title: 'لوحات كانفس', href: '/shop?category=canvas-art', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', slug: 'canvas-art' },
    { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', image: '/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp', slug: 'hair-accessories' },
    { title: 'طلبات خاصة', href: '/custom-orders', image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp', slug: 'handmade-bags' }
  ];

  return <>
    <section className="mx-auto grid max-w-6xl gap-5 px-4 section-space sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="space-y-4"><p className="text-sm text-bahja-taupe">بهجة ستور</p><h1 className="editorial-heading">قطع هاند ميد تحمل حكاية في كل غرزة</h1><p className="text-bahja-taupe">شنط هاند ميد، لوحات كانفس، وإكسسوارات شعر مصنوعة بتفاصيل دافئة ولمسة فنية ناعمة.</p><div className="flex flex-wrap gap-3"><Link href="/shop" className="bahja-btn-primary">تصفحي المتجر</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton></div></div>
      <div className="relative h-[280px] overflow-hidden rounded-[1.8rem] bg-bahja-cream sm:h-[360px]"><ProductImage src="/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp" alt="شنطة هاند ميد" categorySlug="handmade-bags" usage="hero" /></div>
    </section>

    <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8"><div className="grid gap-2 sm:grid-cols-4">{['صناعة يدوية', 'تجهيز حسب الطلب', 'ألوان وتفاصيل مخصصة', 'من القاهرة'].map((point)=><div key={point} className="subtle-panel px-4 py-3 text-center text-sm">{point}</div>)}</div></section>

    <SectionShell title="أقسام المتجر"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{categories.map((item)=><Link key={item.title} href={item.href} className="bahja-card"><div className="relative h-40"><ProductImage src={item.image} alt={item.title} categorySlug={item.slug} usage="category" /></div><p className="p-3 text-sm font-semibold">{item.title}</p></Link>)}</div></SectionShell>

    <SectionShell title="قطع مختارة من بهجة"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p)=><ProductCard key={p.slug} product={p} />)}</div></SectionShell>

    <SectionShell title="دليل أسعار الشنط"><div className="grid gap-4 md:grid-cols-2"><div className="subtle-panel p-5"><h3 className="mb-2 font-semibold">شنط خيط الهيمالايا</h3><p>صغير: 300 جنيه</p><p>متوسط: 400 جنيه</p><p>كبير: 470 جنيه</p></div><div className="subtle-panel p-5"><h3 className="mb-2 font-semibold">شنط خيوط السلسلة</h3><p>صغير: 340 جنيه</p><p>متوسط: 450 جنيه</p><p>كبير: 590 جنيه</p></div></div><p className="mt-4 text-sm text-bahja-taupe">قد تختلف الأسعار حسب التفاصيل والتخصيص وجودة التشطيب لكل قطعة.</p></SectionShell>

    <SectionShell title="طريقة الطلب"><div className="grid gap-3 sm:grid-cols-3">{['اختاري القطعة','أضيفي المقاس والملاحظات','أرسلي الطلب عبر واتساب'].map((s,i)=><div key={s} className="subtle-panel p-4 text-sm"><p className="mb-2 text-xs text-bahja-taupe">{i+1}</p>{s}</div>)}</div></SectionShell>
    <SectionShell title="الطلبات الخاصة" subtitle="التخصيص متاح في: اللون، المقاس، السلسلة، التشطيب، تفاصيل التصميم."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبك الخاص</WhatsAppButton></SectionShell>
    <SectionShell title="هل لديكِ فكرة لقطعة خاصة؟" subtitle="أرسلي لنا التفاصيل وسنساعدكِ في اختيار الأنسب."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>اطلبي عبر واتساب</WhatsAppButton></SectionShell>
  </>;
}
