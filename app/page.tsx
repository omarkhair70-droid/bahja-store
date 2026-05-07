import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import ProductImage from '@/components/ProductImage';
import ProductCard from '@/components/ProductCard';

const craftChips = ['خيوط ناعمة', 'سلاسل أنيقة', 'ألوان مخصصة', 'تشطيب يدوي'];

export default function HomePage() {
  const featuredBags = products
    .filter((p) => p.categorySlug === 'handmade-bags')
    .sort((a, b) => (a.displayPriority ?? 99) - (b.displayPriority ?? 99))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-bahja-cream">
          <div className="relative h-[320px] sm:h-[390px] lg:h-[460px]">
            <ProductImage src="/images/bahja/editorial/hero-bag.jpg" alt="شنطة يدوية من بهجة ستور" categorySlug="handmade-bags" usage="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f1e8f5] via-[#f8f1e89e] to-[#6a4b3a26] sm:bg-gradient-to-l sm:from-[#f8f1e8f2] sm:via-[#f8f1e8cf] sm:to-[#6a4b3a33]" />
          </div>
          <div className="relative -mt-20 p-4 sm:absolute sm:inset-y-0 sm:start-0 sm:mt-0 sm:flex sm:items-center sm:p-8 lg:p-10">
            <div className="max-w-xl space-y-3 rounded-3xl border border-bahja-beige/55 bg-bahja-ivory/92 p-4 backdrop-blur-[1px] sm:p-6">
              <p className="text-xs tracking-[0.2em] text-bahja-taupe">بهجة ستور — حكاية ناعمة تُلبس باليد</p>
              <h1 className="editorial-heading">شنط هاند ميد بتفاصيل تحكي ذوقكِ</h1>
              <p className="text-sm leading-7 text-bahja-taupe sm:text-base">قطع يدوية دافئة، تُصنع بهدوء وحب، من أول غرزة لآخر لمسة.</p>
              <div className="flex flex-wrap gap-2.5"><Link href="/shop?category=handmade-bags" className="bahja-btn-primary">تسوقي الشنط</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-bahja-beige/60 bg-white/65 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-2">{craftChips.map((chip) => <span key={chip} className="rounded-full border border-bahja-beige/70 bg-bahja-cream/70 px-3 py-1 text-xs text-bahja-taupe sm:text-sm">{chip}</span>)}</div>
        </div>
      </section>

      <SectionShell title="شنط مميزة" subtitle="اختاري قطعتكِ، واطلبيها بتفاصيلكِ — نجهزها لكِ بعناية.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredBags.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </SectionShell>

      <SectionShell title="مجموعات الشنط الرئيسية">
        <div className="grid gap-4 md:grid-cols-2">
          {[{title:'شنط خيط الهيمالايا',en:'Himalayan Thread Bags',prices:['Small — 300 EGP','Medium — 400 EGP','Large — 470 EGP'],href:'/shop?collection=himalayan-thread-bags',image:'/images/bahja/editorial/himalayan-bag.jpg'},{title:'شنط خيوط السلسلة',en:'Chain Thread Bags',prices:['Small — 300 EGP','Medium — 400 EGP','Large — 470 EGP'],href:'/shop?collection=chain-thread-bags',image:'/images/bahja/editorial/chain-bag.jpg'}].map((c)=><Link key={c.title} href={c.href} className="bahja-card p-3"><div className="relative h-52 rounded-2xl bg-bahja-cream"><ProductImage src={c.image} alt={c.title} categorySlug="handmade-bags" usage="feature" /></div><div className="space-y-1.5 p-2"><h3 className="text-lg font-semibold">{c.title}</h3><p className="text-xs text-bahja-taupe">{c.en}</p><div className="rounded-xl bg-bahja-cream/70 p-2 text-xs leading-6 sm:text-sm">{c.prices.map((s)=><p key={s}>{s}</p>)}</div></div></Link>)}
        </div>
      </SectionShell>

      <SectionShell title="شنطة بتفاصيلكِ الخاصة" subtitle="اختاري اللون، المقاس، نوع السلسلة ولمسة التشطيب. لكل غرزة حكاية.">
        <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبكِ الخاص</WhatsAppButton>
      </SectionShell>

      <SectionShell title="تفاصيل ناعمة" subtitle="الإكسسوارات والكانفس كلمسة هادئة تكمل ذوقكِ.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/shop?category=hair-accessories" className="bahja-card p-3"><div className="relative h-32 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/hair-accessories.jpg" alt="إكسسوارات شعر" categorySlug="hair-accessories" usage="category" /></div><p className="pt-3 text-sm font-semibold">إكسسوارات شعر يدوية</p></Link>
          <Link href="/shop?category=canvas-art" className="bahja-card p-3"><div className="relative h-32 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/custom-art.jpg" alt="لوحات كانفس" categorySlug="canvas-art" usage="category" /></div><p className="pt-3 text-sm font-semibold">لوحات كانفس حسب الطلب</p></Link>
        </div>
      </SectionShell>

      <section className="mx-auto mb-8 mt-2 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.8rem] bg-bahja-blush/55 p-5 text-center sm:p-7">
          <h2 className="mb-2 text-xl font-semibold sm:text-2xl">جاهزة تختاري قطعتكِ؟</h2>
          <p className="mb-4 text-sm text-bahja-taupe">راسلينا على واتساب، ونرتب طلبكِ بهدوء من أول تفصيلة لآخر لمسة.</p>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
