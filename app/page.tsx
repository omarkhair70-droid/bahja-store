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
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="relative h-[290px] overflow-hidden rounded-[2rem] bg-bahja-cream sm:h-[380px] lg:h-[470px]">
          <ProductImage src="/images/bahja/editorial/hero-bag.jpg" alt="شنطة يدوية من بهجة ستور" categorySlug="handmade-bags" usage="hero" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#4f342833] via-[#6f4d3f1f] to-[#f8f1e8e0]" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl space-y-3 px-5 sm:px-8 lg:px-10">
              <h1 className="editorial-heading">شنط هاند ميد بتفاصيل تحكي ذوقكِ</h1>
              <p className="text-sm leading-7 text-bahja-taupe sm:text-base">قطع يدوية دافئة، تُصنع بهدوء وحب، من أول غرزة لآخر لمسة.</p>
              <div className="flex flex-wrap gap-2.5"><Link href="/shop?category=handmade-bags" className="bahja-btn-primary">تسوقي الشنط</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton></div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell title="شنط مميزة" subtitle="اختاري القطعة التي تعكس ذوقكِ واطلبيها مباشرة.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredBags.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </SectionShell>

      <SectionShell title="مجموعات الشنط الرئيسية">
        <div className="grid gap-4 md:grid-cols-2">
          {[{title:'شنط خيط الهيمالايا',en:'Himalayan Thread Bags',prices:['Small — 300 EGP','Medium — 400 EGP','Large — 470 EGP'],href:'/shop?collection=himalayan-thread-bags',image:'/images/bahja/editorial/himalayan-bag.jpg'},{title:'شنط خيوط السلسلة',en:'Chain Thread Bags',prices:['Small — 340 EGP','Medium — 450 EGP','Large — 590 EGP'],href:'/shop?collection=chain-thread-bags',image:'/images/bahja/editorial/chain-bag.jpg'}].map((c)=><Link key={c.title} href={c.href} className="bahja-card p-3"><div className="relative h-52 rounded-2xl bg-bahja-cream"><ProductImage src={c.image} alt={c.title} categorySlug="handmade-bags" usage="feature" /></div><div className="space-y-1.5 p-2"><h3 className="text-lg font-semibold">{c.title}</h3><p className="text-xs text-bahja-taupe">{c.en}</p><div className="rounded-xl bg-bahja-cream/70 p-2 text-xs leading-6 sm:text-sm">{c.prices.map((s)=><p key={s}>{s}</p>)}</div></div></Link>)}
        </div>
      </SectionShell>

      <SectionShell title="قصة بهجة">
        <p className="max-w-3xl text-sm leading-7 text-bahja-taupe sm:text-base">بهجة بدأت بحب التفاصيل الصغيرة: غرزة متقنة، لون دافئ، وقطعة تعيش طويلًا. نصنع كل منتج بروح هادئة ولمسة أنثوية تشبهكِ، لتكون كل قطعة إضافة ناعمة ليومكِ.</p>
      </SectionShell>

      <SectionShell title="إكسسوارات شعر يدوية" subtitle="تفاصيل خفيفة تكمل إطلالتك.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/shop?category=hair-accessories" className="bahja-card p-3"><div className="relative h-36 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/hair-accessories.jpg" alt="إكسسوارات شعر" categorySlug="hair-accessories" usage="category" /></div><p className="pt-3 text-sm font-semibold">اكتشفي الإكسسوارات</p></Link>
          <Link href="/shop?category=canvas-art" className="bahja-card p-3"><div className="relative h-36 rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/editorial/custom-art.jpg" alt="لوحات كانفس" categorySlug="canvas-art" usage="category" /></div><p className="pt-3 text-sm font-semibold">لوحات كانفس حسب الطلب</p></Link>
        </div>
      </SectionShell>

      <SectionShell title="طلبكِ الخاص" subtitle="تريدين شنطة بلون معين؟ أو لوحة كانفس بعبارة تحبينها؟ شاركينا فكرتكِ وننفذها بتفاصيل تناسبكِ.">
        <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبكِ الخاص</WhatsAppButton>
      </SectionShell>

      <section className="mx-auto mb-8 mt-2 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.8rem] bg-bahja-blush/55 p-6 text-center sm:p-8">
          <h2 className="mb-2 text-2xl font-semibold">جاهزة تطلبين؟</h2>
          <p className="mb-4 text-sm text-bahja-taupe">راسلينا مباشرة وسنساعدكِ في تأكيد الطلب والتفاصيل.</p>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>راسلينا على واتساب</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
