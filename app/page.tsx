import Image from 'next/image';
import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { publicProducts } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

const trustChips = ['صناعة يدوية', 'تجهيز حسب الطلب', 'ألوان حسب المتاح', 'من القاهرة'];

export default function HomePage() {
  const featuredBags = publicProducts
    .filter((p) => p.categorySlug === 'handmade-bags' || p.slug === 'elegant-clutch')
    .sort((a, b) => (a.displayPriority ?? 99) - (b.displayPriority ?? 99))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-5 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-bahja-beige/55 bg-bahja-cream">
          <div className="relative h-[320px] sm:h-[390px] lg:h-[450px]">
            <ProductImage src="/images/bahja/editorial/hero-bag.jpg" alt="شنطة يدوية من بهجة ستور" categorySlug="handmade-bags" usage="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f1e8f7] via-[#f8f1e8cb] to-[#6a4b3a1f] sm:bg-gradient-to-l sm:from-[#f8f1e8f3] sm:via-[#f8f1e8d1] sm:to-[#6a4b3a2f]" />
          </div>
          <div className="relative -mt-24 p-4 sm:absolute sm:inset-y-0 sm:start-0 sm:mt-0 sm:flex sm:max-w-2xl sm:items-center sm:p-8 lg:p-10">
            <div className="relative space-y-4 rounded-3xl border border-bahja-beige/60 bg-bahja-ivory/92 p-5 backdrop-blur-[1px] sm:p-6">
              <Image
                src="/images/bahja/brand/bahja-logo-stamp.png"
                alt="Bahja decorative stamp"
                width={84}
                height={84}
                className="pointer-events-none absolute -start-2 -top-2 h-12 w-12 opacity-25 sm:h-14 sm:w-14"
              />
              <p className="text-[11px] tracking-[0.22em] text-bahja-taupe sm:text-xs">بهجة ستور — لمسة هاند ميد دافئة</p>
              <h1 className="editorial-heading max-w-[14ch]">هنا تُنسَج الأناقة بخيوط من الحُب</h1>
              <p className="max-w-[36ch] text-sm leading-7 text-bahja-taupe sm:text-base">قطع هاند ميد تُصنع بهدوء واهتمام، لتصل إليكِ بتفاصيل دافئة تشبهك.</p>
              <div className="grid gap-2.5 sm:flex sm:flex-wrap">
                <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="w-full px-5 py-3 text-sm sm:w-auto">اطلبي عبر واتساب</WhatsAppButton>
                <Link href="/shop?category=handmade-bags" className="bahja-btn-secondary w-full px-5 py-3 text-sm sm:w-auto">تسوقي الشنط</Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">{trustChips.map((chip) => <span key={chip} className="rounded-full border border-bahja-beige/70 bg-white/75 px-2.5 py-1 text-[11px] text-bahja-taupe">{chip}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell label="الأكثر طلبًا" title="شنط مميزة" subtitle="اختاري قطعتكِ واطلبيها بتفاصيلكِ. كل قطعة تُجهز بعناية." className="pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredBags.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </SectionShell>

      <SectionShell label="قطعة الموسم" title="Elegant Clutch" subtitle="A compact handmade clutch with the feel of a refined wallet and the presence of a keepsake piece.">
        <div className="grid items-center gap-4 rounded-[1.7rem] border border-bahja-beige/55 bg-gradient-to-br from-bahja-ivory to-bahja-blush/35 p-4 sm:grid-cols-2 sm:p-6">
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-bahja-cream sm:h-[360px]">
            <ProductImage src="/images/bahja/elegant-clutch/06-elegant-clutch-three-colors.webp" alt="Elegant Clutch collection in navy, black, and wine" categorySlug="clutch-wallet-pieces" usage="feature" />
          </div>
          <div className="space-y-3.5">
            <h3 className="text-2xl font-semibold">إليجانت كلاتش</h3>
            <p className="text-sm leading-7 text-bahja-taupe">بوك يد أنيق بتفاصيل يدوية، يجمع بين إحساس المحفظة الصغيرة وأناقة الكلاتش في قطعة واحدة، بعيدًا عن شكل الشنطة التقليدية.</p>
            <div className="flex flex-wrap gap-2">
              {['Navy', 'Black', 'Wine', 'Teal'].map((color) => <span key={color} className="rounded-full border border-bahja-beige/70 bg-white/75 px-3 py-1 text-xs text-bahja-taupe">{color}</span>)}
            </div>
            <div className="grid gap-2 sm:flex">
              <Link href="/shop/elegant-clutch" className="bahja-btn-secondary px-5 py-2.5 text-center text-sm">التفاصيل</Link>
              <WhatsAppButton href={getWhatsAppUrl('مرحبًا، أريد الاستفسار عن Elegant Clutch والألوان المتاحة.')} className="px-5 py-2.5 text-sm">واتساب</WhatsAppButton>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell label="اختاري حكايتك" title="مجموعات الشنط الرئيسية" subtitle="اختيارات واضحة حسب الخيط والتشطيب.">
        <div className="grid gap-4 md:grid-cols-2">{[{title:'شنط خيط الهيمالايا',en:'Himalayan Thread Bags',href:'/shop?collection=himalayan-thread-bags',image:'/images/bahja/redesigned/light-grey-himalayan/light-grey-himalayan-thread-bag-card.png'},{title:'شنط خيوط السلسلة',en:'Chain Thread Bags',href:'/shop?collection=chain-thread-bags',image:'/images/bahja/redesigned/black-gold-chain/black-gold-chain-thread-bag-card.png'}].map((c)=><Link key={c.title} href={c.href} className="bahja-card p-3.5"><div className="relative h-52 rounded-2xl bg-bahja-cream"><ProductImage src={c.image} alt={c.title} categorySlug="handmade-bags" usage="feature" /></div><div className="space-y-1.5 p-2"><h3 className="text-lg font-semibold">{c.title}</h3><p className="text-xs text-bahja-taupe">{c.en}</p><p className="text-sm font-medium text-bahja-brown">تسوقي المجموعة</p></div></Link>)}</div>
      </SectionShell>

      <SectionShell label="حسب الطلب" title="شنطة بتفاصيلكِ الخاصة" subtitle="اختاري اللون والمقاس ونوع السلسلة. قد يختلف السعر حسب التفاصيل والتشطيب.">
        <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)} className="px-6 py-3">ابدئي طلبكِ الخاص</WhatsAppButton>
      </SectionShell>

      <SectionShell label="قصة بهجة" title="تفاصيل ناعمة تكمل الإطلالة" subtitle="إكسسوارات شعر ولوحات كانفس بلمسة هادئة.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/shop?category=hair-accessories" className="bahja-card p-3"><div className="relative h-36 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/hair-accessories.jpg" alt="إكسسوارات شعر" categorySlug="hair-accessories" usage="category" /></div><p className="pt-3 text-sm font-semibold">إكسسوارات شعر يدوية</p></Link>
          <Link href="/shop?category=canvas-art" className="bahja-card p-3"><div className="relative h-36 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/custom-art.jpg" alt="لوحات كانفس" categorySlug="canvas-art" usage="category" /></div><p className="pt-3 text-sm font-semibold">لوحات كانفس حسب الطلب</p></Link>
        </div>
      </SectionShell>

      <section className="mx-auto mb-8 mt-2 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-bahja-beige/50 bg-bahja-blush/50 p-5 text-center sm:p-7">
          <h2 className="mb-2 text-xl font-semibold sm:text-2xl">جاهزة تختاري قطعتكِ؟</h2>
          <p className="mb-4 text-sm text-bahja-taupe">راسلينا على واتساب، ونؤكد التوفر والسعر النهائي بهدوء قبل التنفيذ.</p>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
