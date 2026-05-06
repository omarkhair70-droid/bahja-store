import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

const collectionCards = [
  {
    title: 'شنط خيط الهيمالايا',
    copy: 'خامات راقية بتشطيب يدوي ودرجات هادئة مناسبة للإطلالات اليومية والمناسبات.',
    guide: 'صغير 300 • متوسط 400 • كبير 470',
    href: '/shop?collection=himalayan-thread-bags',
    image: '/images/bahja/editorial/himalayan-bag.jpg'
  },
  {
    title: 'شنط خيوط السلسلة',
    copy: 'ستايل بوتيك بلمعة أنثوية واضحة وتفاصيل سلسلة تعيش معكِ أكثر من موسم.',
    guide: 'صغير 340 • متوسط 450 • كبير 590',
    href: '/shop?collection=chain-thread-bags',
    image: '/images/bahja/editorial/chain-bag.jpg'
  }
];

export default function HomePage() {
  const featuredBags = products.filter((p) => p.categorySlug === 'handmade-bags').slice(0, 3);

  return <>
    <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-8 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm text-bahja-taupe">بهجة ستور • شنط هاند ميد بريميوم</p>
        <h1 className="editorial-heading">حقائب عربية فاخرة تُصنع يدويًا لتكمل حضوركِ</h1>
        <p className="text-sm leading-7 text-bahja-taupe">مجموعة مختارة من شنط الهيمالايا وخيوط السلسلة بتفاصيل دقيقة، مع طلب مباشر وسريع عبر واتساب بدون خطوات معقدة.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/shop?category=handmade-bags" className="bahja-btn-primary">تسوقي الحقائب</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي مباشرة عبر واتساب</WhatsAppButton>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['تشطيب يدوي فاخر', 'ألوان موسمية', 'تصميم حسب ذوقكِ', 'شحن داخل مصر'].map((item) => (
            <p key={item} className="bahja-chip whitespace-nowrap">{item}</p>
          ))}
        </div>
      </div>
      <div className="relative h-[340px] overflow-hidden rounded-[2rem] bg-bahja-cream sm:h-[420px] lg:h-[500px]">
        <ProductImage src="/images/bahja/editorial/hero-bag.jpg" alt="شنطة فاخرة من بهجة ستور" categorySlug="handmade-bags" usage="hero" />
      </div>
    </section>

    <SectionShell title="مجموعات الحقائب الرئيسية" subtitle="اختاري المجموعة التي تعبّر عن ذوقكِ، ثم انتقلي للمتجر لاختيار اللون والمقاس المناسب.">
      <div className="grid gap-4 md:grid-cols-2">
        {collectionCards.map((c) => (
          <Link key={c.title} href={c.href} className="bahja-card p-3">
            <div className="relative h-72 rounded-2xl bg-bahja-cream">
              <ProductImage src={c.image} alt={c.title} categorySlug="handmade-bags" usage="feature" />
            </div>
            <div className="space-y-2 p-2">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="text-sm text-bahja-taupe">{c.copy}</p>
              <p className="text-sm">{c.guide}</p>
              <span className="bahja-btn-secondary">تسوقي المجموعة</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>

    <SectionShell title="حقائب مختارة لهذا الأسبوع" subtitle="قطع مميزة من المخزون الحالي؛ جميعها متاحة للطلب عبر واتساب بنفس نظام المتجر الحالي.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBags.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {['/images/bahja/editorial/featured-bag-1.jpg', '/images/bahja/editorial/featured-bag-2.jpg', '/images/bahja/editorial/featured-bag-3.jpg'].map((img, idx) => (
          <div key={img} className="relative h-52 overflow-hidden rounded-2xl bg-bahja-cream">
            <ProductImage src={img} alt={`حقيبة مميزة ${idx + 1}`} categorySlug="handmade-bags" usage="feature" />
          </div>
        ))}
      </div>
    </SectionShell>

    <SectionShell title="طريقة الطلب" subtitle="بدون تسجيل دخول أو دفع إلكتروني. نفس تدفق الطلب الحالي المعتمد على واتساب.">
      <div className="grid gap-3 sm:grid-cols-3">
        {['تصفحي الحقائب واختاري الموديل', 'حددي المقاس واللون والتفاصيل', 'أرسلي الطلب عبر واتساب للتأكيد'].map((step, i) => (
          <div key={step} className="subtle-panel p-4 text-sm">
            <p className="mb-2 text-xs text-bahja-taupe">{i + 1}</p>
            {step}
          </div>
        ))}
      </div>
    </SectionShell>

    <SectionShell title="طلب خاص بتوقيعكِ" subtitle="إذا رغبتِ بحقيبة مفصلة بالألوان والتفاصيل التي تفضلينها، ابدئي طلبًا مخصصًا الآن.">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream sm:h-64">
          <ProductImage src="/images/bahja/editorial/chain-bag.jpg" alt="طلب شنطة مخصصة" categorySlug="handmade-bags" usage="feature" />
        </div>
        <div className="space-y-3">
          <p className="text-sm text-bahja-taupe">المقاس، السلسلة، التشطيب، واللون—all tailored for you.</p>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton>
        </div>
      </div>
    </SectionShell>

    <SectionShell title="إضافات ثانوية لإكمال الإطلالة" subtitle="الإكسسوارات والكانفس موجودة كخيارات مكملة بعد اختيار الحقيبة الأساسية.">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', image: '/images/bahja/editorial/hair-accessories.jpg', slug: 'hair-accessories' },
          { title: 'لوحات كانفس حسب الطلب', href: '/shop?category=canvas-art', image: '/images/bahja/editorial/custom-art.jpg', slug: 'canvas-art' }
        ].map((item) => (
          <Link key={item.title} href={item.href} className="bahja-card p-3">
            <div className="relative h-44 rounded-2xl bg-bahja-cream">
              <ProductImage src={item.image} alt={item.title} categorySlug={item.slug} usage="category" />
            </div>
            <p className="pt-3 text-sm font-semibold">{item.title}</p>
          </Link>
        ))}
      </div>
    </SectionShell>

    <SectionShell title="جاهزة لاختيار حقيبتكِ؟">
      <div className="flex flex-wrap gap-3">
        <Link href="/shop" className="bahja-btn-primary">دخولي إلى المتجر</Link>
        <Link href="/cart" className="bahja-btn-secondary">مراجعة السلة</Link>
      </div>
    </SectionShell>
  </>;
}
