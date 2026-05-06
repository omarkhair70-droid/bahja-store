import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredBags = products.filter((p) => p.categorySlug === 'handmade-bags').slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-4 px-4 pb-5 pt-5 sm:px-6 sm:pb-8 sm:pt-8 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm text-bahja-taupe">بهجة ستور</p>
          <h1 className="editorial-heading">شنط هاند ميد بتفاصيل تحكي ذوقكِ</h1>
          <p className="text-sm leading-7 text-bahja-taupe sm:text-base">اكتشفي شنط بهجة ستور المصنوعة يدويًا بخيوط ناعمة، ألوان دافئة، وتشطيب أنثوي راقٍ.</p>
          <p className="text-sm text-bahja-rose">للغُرز حكايا… وهنا لكل غرزة حكاية</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link href="/shop?category=handmade-bags" className="bahja-btn-primary">تسوقي الشنط</Link>
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton>
          </div>
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-[1.8rem] bg-bahja-cream sm:h-[340px] lg:h-[430px]">
          <ProductImage src="/images/bahja/editorial/hero-bag.jpg" alt="شنطة يدوية من بهجة ستور" categorySlug="handmade-bags" usage="hero" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-1 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {['صناعة يدوية', 'تجهيز حسب الطلب', 'ألوان مخصصة', 'من القاهرة'].map((item) => (
            <p key={item} className="bahja-chip text-center text-xs sm:text-sm">{item}</p>
          ))}
        </div>
      </section>

      <SectionShell title="مجموعات الشنط الرئيسية">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: 'شنط خيط الهيمالايا',
              copy: 'نعومة يومية وحضور أنثوي بتفاصيل هادئة تناسب الإطلالات اليومية.',
              guide: 'الأسعار تبدأ من 300 جنيه',
              href: '/shop?collection=himalayan-thread-bags',
              image: '/images/bahja/editorial/himalayan-bag.jpg'
            },
            {
              title: 'شنط خيوط السلسلة',
              copy: 'طابع بوتيك أنيق بلمسة عصرية وسلاسل معدنية متناسقة.',
              guide: 'الأسعار تبدأ من 340 جنيه',
              href: '/shop?collection=chain-thread-bags',
              image: '/images/bahja/editorial/chain-bag.jpg'
            }
          ].map((c) => (
            <Link key={c.title} href={c.href} className="bahja-card p-3">
              <div className="relative h-56 rounded-2xl bg-bahja-cream sm:h-64">
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

      <SectionShell title="قطع مختارة من بهجة">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredBags.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </SectionShell>

      <SectionShell title="طريقة الطلب">
        <div className="grid gap-3 sm:grid-cols-3">
          {['اختاري القطعة', 'حددي المقاس والتفاصيل', 'أرسلي الطلب عبر واتساب'].map((s, i) => (
            <div key={s} className="subtle-panel p-4 text-sm">
              <p className="mb-2 text-xs text-bahja-taupe">{i + 1}</p>
              {s}
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="شنطة بتفاصيلكِ الخاصة" subtitle="اختاري اللون، المقاس، نوع السلسلة، والتشطيب، وسنساعدكِ في تنفيذ قطعة تناسب ذوقكِ.">
        <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton>
      </SectionShell>

      <SectionShell title="تفاصيل تكمل الحكاية">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', image: '/images/bahja/editorial/hair-accessories.jpg', slug: 'hair-accessories' },
            { title: 'لوحات كانفس حسب الطلب', href: '/shop?category=canvas-art', image: '/images/bahja/editorial/custom-art.jpg', slug: 'canvas-art' }
          ].map((item) => (
            <Link key={item.title} href={item.href} className="bahja-card p-3">
              <div className="relative h-32 rounded-2xl bg-bahja-cream">
                <ProductImage src={item.image} alt={item.title} categorySlug={item.slug} usage="category" />
              </div>
              <p className="pt-3 text-sm font-semibold">{item.title}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="جاهزة لاختيار قطعتكِ؟">
        <div className="flex flex-wrap gap-3">
          <Link href="/shop" className="bahja-btn-primary">تسوقي الآن</Link>
          <Link href="/cart" className="bahja-btn-secondary">السلة</Link>
        </div>
      </SectionShell>
    </>
  );
}
