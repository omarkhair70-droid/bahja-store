import Image from 'next/image';
import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import CollectionCard from '@/components/CollectionCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { collections, products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function HomePage() {
  const hairPreview = products.filter((p) => p.categorySlug === 'hair-accessories').slice(0, 3);
  const canvasPiece = products.find((p) => p.categorySlug === 'canvas-art');

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-14">
        <div className="space-y-5">
          <p className="text-sm text-bahja-taupe">بهجة ستور <span className="text-xs">Bahja Store</span></p>
          <h1 className="editorial-heading">قطع هاند ميد تحمل حكاية في كل غرزة</h1>
          <p className="text-bahja-taupe">شنط هاند ميد، لوحات كانفس، وإكسسوارات شعر مصنوعة بتفاصيل دافئة ولمسة فنية ناعمة.</p>
          <p className="text-bahja-brown">للغُرز حكايا… وهنا لكل غرزة حكاية</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/collections" className="rounded-full border border-bahja-taupe px-5 py-3">تصفحي المجموعات</Link>
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>اطلبي عبر واتساب</WhatsAppButton>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-bahja-taupe">
            <span className="rounded-full bg-bahja-cream px-3 py-1">صناعة يدوية</span><span className="rounded-full bg-bahja-cream px-3 py-1">تجهيز حسب الطلب</span><span className="rounded-full bg-bahja-cream px-3 py-1">ألوان وتفاصيل مخصصة</span><span className="rounded-full bg-bahja-cream px-3 py-1">من القاهرة</span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="relative col-span-5 aspect-[4/3] overflow-hidden rounded-[2rem] bg-bahja-cream shadow-soft"><Image src="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp" alt="شنطة هاند ميد" fill className="object-cover"/></div>
          <div className="relative col-span-2 aspect-square overflow-hidden rounded-2xl bg-bahja-cream"><Image src="/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp" alt="إكسسوارات شعر" fill className="object-cover"/></div>
          <div className="relative col-span-3 aspect-square overflow-hidden rounded-2xl bg-bahja-cream"><Image src="/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp" alt="شنطة خيوط السلسلة" fill className="object-cover"/></div>
        </div>
      </section>

      <SectionShell title="اختاري حكايتكِ">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
          { title: 'شنط هاند ميد', href: '/shop?category=handmade-bags', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp', desc: 'تشكيلة شنط يدوية بتفاصيل أنيقة ولمسة دافئة.', cta: 'تصفحي الشنط الهاند ميد' },
          { title: 'لوحات كانفس', href: '/shop?category=canvas-art', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', desc: 'لوحات فنية تجمع بين الخط العربي والزهور.', cta: 'شاهدي لوحات الكانفس' },
          { title: 'إكسسوارات شعر', href: '/shop?category=hair-accessories', image: '/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp', desc: 'إكسسوارات ساتان ناعمة لإطلالة أنثوية.', cta: 'تصفحي الإكسسوارات' },
          { title: 'طلبات خاصة', href: '/custom-orders', image: '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp', desc: 'اختاري تفاصيلكِ الخاصة لنصنع قطعة مناسبة لكِ.', cta: 'ابدئي طلبًا خاصًا' }
        ].map((item) => <Link key={item.title} href={item.href} className="group overflow-hidden rounded-3xl border border-bahja-beige bg-white/80 shadow-soft"><div className="relative aspect-[4/3] bg-bahja-cream"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="space-y-2 p-4"><h3 className="text-lg font-semibold text-bahja-brown">{item.title}</h3><p className="text-sm text-bahja-taupe">{item.desc}</p><p className="text-sm font-medium text-bahja-brown">{item.cta}</p></div></Link>)}
        </div>
      </SectionShell>

      <SectionShell title="عالم الشنط الهاند ميد"><div className="grid gap-4 md:grid-cols-2"><CollectionCard title={collections[0].arabicTitle} arabicTitle="" href="/shop?collection=himalayan-thread-bags" description="صغير: 300 جنيه • متوسط: 400 جنيه • كبير: 470 جنيه" image="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp"/><CollectionCard title={collections[1].arabicTitle} arabicTitle="" href="/shop?collection=chain-thread-bags" description="صغير: 340 جنيه • متوسط: 450 جنيه • كبير: 590 جنيه" image="/images/bahja/bags-chain-thread/chain-thread-bag-silver-grey-closeup-02.webp"/></div></SectionShell>
      <SectionShell title="تفاصيل ساتان ناعمة" subtitle="تفاصيل ساتان ناعمة تضيف لمسة أنثوية بسيطة لإطلالتكِ."><div className="grid gap-4 sm:grid-cols-3">{hairPreview.map((p)=><Link key={p.slug} href={`/shop/${p.slug}`} className="overflow-hidden rounded-3xl border border-bahja-beige/70 bg-white/80 shadow-soft"><div className="relative aspect-[4/5]"><Image src={p.image} alt={p.arabicTitle ?? p.title} fill className="object-cover"/></div><div className="space-y-1 p-4"><p className="font-medium text-bahja-brown">{p.arabicTitle}</p><p className="text-xs text-bahja-taupe">{p.title}</p></div></Link>)}</div></SectionShell>
      <SectionShell title="لوحات كانفس بروح فنية">{canvasPiece && <Link href={`/shop/${canvasPiece.slug}`} className="block overflow-hidden rounded-3xl border border-bahja-beige bg-white/80 shadow-soft"><div className="relative aspect-[16/8] bg-bahja-cream"><Image src={canvasPiece.image} alt={canvasPiece.arabicTitle ?? canvasPiece.title} fill className="object-cover"/></div><div className="p-5"><p className="text-lg font-medium text-bahja-brown">{canvasPiece.arabicTitle}</p><p className="text-sm text-bahja-taupe">لوحات كانفس بروح فنية دافئة، تجمع بين الخط العربي والزهور والتفاصيل اليدوية.</p></div></Link>}</SectionShell>
      <SectionShell title="هل لديكِ فكرة لقطعة خاصة؟" subtitle="أرسلي لنا التفاصيل عبر واتساب وسنساعدكِ في اختيار الأنسب."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)} className="w-full sm:w-auto">اطلبي عبر واتساب</WhatsAppButton></SectionShell>
    </>
  );
}
