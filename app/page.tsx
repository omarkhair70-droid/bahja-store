import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredBags = products.filter((p) => p.categorySlug === 'handmade-bags').slice(0, 4);

  return <>
    <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_1fr] lg:px-8">
      <div className="space-y-3">
        <p className="text-sm text-bahja-taupe">بهجة ستور</p>
        <h1 className="editorial-heading">شنط هاند ميد بتفاصيل تحكي ذوقكِ</h1>
        <p className="text-sm text-bahja-taupe">تشكيلة شنط يدوية أنيقة، سهلة الاختيار، وجاهزة للطلب مباشرة عبر واتساب.</p>
        <div className="flex gap-2"><Link href="/shop?category=handmade-bags" className="bahja-btn-primary">تسوقي الشنط</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton></div>
      </div>
      <div className="relative h-[290px] overflow-hidden rounded-[1.8rem] bg-bahja-cream sm:h-[400px]">
        <ProductImage src="/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp" alt="شنطة خيوط سلسلة أسود وذهبي" categorySlug="handmade-bags" usage="hero" />
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 pb-1 sm:px-6 lg:px-8">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['صناعة يدوية', 'تجهيز حسب الطلب', 'ألوان مخصصة', 'من القاهرة'].map((item) => (
          <p key={item} className="bahja-chip">{item}</p>
        ))}
      </div>
    </section>

    <SectionShell title="مجموعات الشنط"><div className="grid gap-4 md:grid-cols-2">{[
      { title: 'شنط خيط الهيمالايا', copy: 'نعومة يومية بتفاصيل يدوية متقنة.', guide: 'صغير 300 • متوسط 400 • كبير 470', href: '/shop?collection=himalayan-thread-bags', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp' },
      { title: 'شنط خيوط السلسلة', copy: 'طابع بوتيك أنيق بلمسة عصرية.', guide: 'صغير 340 • متوسط 450 • كبير 590', href: '/shop?collection=chain-thread-bags', image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp' }
    ].map((c) => <Link key={c.title} href={c.href} className="bahja-card p-3"><div className="relative h-64 rounded-2xl bg-bahja-cream"><ProductImage src={c.image} alt={c.title} categorySlug="handmade-bags" usage="feature" /></div><div className="space-y-2 p-2"><h3 className="text-xl font-semibold">{c.title}</h3><p className="text-sm text-bahja-taupe">{c.copy}</p><p className="text-sm">{c.guide}</p><span className="bahja-btn-secondary">تسوقي المجموعة</span></div></Link>)}</div></SectionShell>

    <SectionShell title="قطع مختارة"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featuredBags.map((p)=><ProductCard key={p.slug} product={p} />)}</div></SectionShell>

    <SectionShell title="طريقة الطلب"><div className="grid gap-3 sm:grid-cols-3">{['اختاري القطعة','حددي المقاس والتفاصيل','أرسلي الطلب عبر واتساب'].map((s,i)=><div key={s} className="subtle-panel p-4 text-sm"><p className="mb-2 text-xs text-bahja-taupe">{i+1}</p>{s}</div>)}</div></SectionShell>
    <SectionShell title="شنطة بتفاصيلكِ الخاصة" subtitle="اختاري اللون، المقاس، نوع السلسلة، والتشطيب، وسنساعدكِ في تنفيذ قطعة تناسب ذوقكِ."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton></SectionShell>

    <SectionShell title="تفاصيل تكمل الحكاية"><div className="grid gap-3 sm:grid-cols-2">{[
      { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp', slug: 'hair-accessories' },
      { title: 'لوحات كانفس حسب الطلب', href: '/shop?category=canvas-art', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', slug: 'canvas-art' }
    ].map((item)=><Link key={item.title} href={item.href} className="bahja-card p-3"><div className="relative h-36 rounded-2xl bg-bahja-cream"><ProductImage src={item.image} alt={item.title} categorySlug={item.slug} usage="category" /></div><p className="pt-3 text-sm font-semibold">{item.title}</p></Link>)}</div></SectionShell>

    <SectionShell title="جاهزة لاختيار قطعتكِ؟"><div className="flex flex-wrap gap-3"><Link href="/shop" className="bahja-btn-primary">تسوقي الآن</Link><Link href="/cart" className="bahja-btn-secondary">السلة</Link></div></SectionShell>
  </>;
}
