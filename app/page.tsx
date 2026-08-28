import Image from 'next/image';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { publicProducts } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

function product(slug: string) {
  const item = publicProducts.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing Bahja product: ${slug}`);
  return item;
}

const leadBag = product('black-gold-chain-thread-bag');
const lightGreyBag = product('light-grey-himalayan-thread-bag');
const navyBag = product('navy-himalayan-thread-bag');

const craftDetails = [
  {
    src: '/images/bahja/redesigned/light-grey-himalayan-thread-bag-texture.png',
    label: 'الخيط',
    note: 'ملمس واضح يعرّف القطعة قبل أي شرح.'
  },
  {
    src: '/images/bahja/redesigned/black-gold-chain-thread-bag-texture.png',
    label: 'الغرزة',
    note: 'تفاصيل قريبة تبيّن إيقاع الخامة والتشطيب.'
  },
  {
    src: '/images/bahja/redesigned/black-gold-chain-thread-bag-hardware.png',
    label: 'السلسلة',
    note: 'الهاردوير جزء من شخصية كل تصميم.'
  },
  {
    src: '/images/bahja/redesigned/light-grey-himalayan-thread-bag-hardware.png',
    label: 'التشطيب',
    note: 'نهاية القطعة تظهر في التفاصيل الصغيرة.'
  }
];

export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-[#f8f4ed] text-[#241d19]">
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-[#d8c2a8] sm:min-h-[78svh] lg:min-h-[calc(100svh-78px)]">
        <ProductImage
          src="/images/bahja/editorial/hero-bag.jpg"
          alt="شنطة هاند ميد من بهجة ستور"
          categorySlug="handmade-bags"
          usage="hero"
          className="object-[58%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17110d]/72 via-[#17110d]/18 to-transparent sm:bg-gradient-to-l sm:from-[#17110d]/68 sm:via-[#17110d]/16 sm:to-transparent" />

        <div className="relative mx-auto flex min-h-[72svh] max-w-[1440px] items-end px-5 pb-10 pt-28 sm:min-h-[78svh] sm:px-8 sm:pb-14 lg:min-h-[calc(100svh-78px)] lg:items-center lg:px-12 lg:pb-20">
          <div className="max-w-[620px] text-[#fffaf5]">
            <p className="mb-4 text-xs tracking-[0.2em] text-[#fffaf5]/78">بهجة ستور · قطع هاند ميد من القاهرة</p>
            <h1 className="max-w-[10ch] text-[clamp(2.7rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              للغُرز حكايا… وهُنا لكل غرزة حكاية
            </h1>
            <p className="mt-5 max-w-[38ch] text-sm leading-7 text-[#fffaf5]/86 sm:text-base">
              شنط وقطع يدوية بهدوء في الشكل واهتمام في التفاصيل، مع اختيارات تُجهز حسب الطلب.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/shop?category=handmade-bags" className="border-b border-[#fffaf5] pb-1 font-medium">
                اكتشفي الشنط
              </Link>
              <Link href="/custom-orders" className="border-b border-[#fffaf5]/55 pb-1 text-[#fffaf5]/86 transition hover:border-[#fffaf5] hover:text-[#fffaf5]">
                اطلبي قطعتك الخاصة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mb-10 flex items-end justify-between gap-5 border-b border-[#241d19]/15 pb-5 sm:mb-14">
          <div>
            <p className="text-xs tracking-[0.16em] text-[#75665d]">اختيارات بهجة</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">قطع تستحق مساحة أكبر</h2>
          </div>
          <Link href="/shop" className="hidden border-b border-[#241d19] pb-1 text-sm sm:inline">كل القطع</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-5">
          <Link href={`/shop/${leadBag.slug}`} className="group lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#efe8df] sm:aspect-[5/4] lg:aspect-[4/5]">
              <ProductImage
                src="/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp"
                alt={leadBag.arabicTitle}
                categorySlug={leadBag.categorySlug}
                usage="feature"
                className="motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]"
              />
            </div>
            <div className="flex items-start justify-between gap-5 pt-4">
              <div>
                <h3 className="text-xl font-medium sm:text-2xl">{leadBag.arabicTitle}</h3>
                <p className="mt-1 text-xs text-[#78685f]">{leadBag.collectionAr}</p>
              </div>
              <p className="max-w-[15rem] text-left text-xs leading-5 text-[#78685f]" dir="rtl">{leadBag.priceGuide}</p>
            </div>
          </Link>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-12 lg:pt-20">
            {[lightGreyBag, navyBag].map((item, index) => (
              <Link key={item.slug} href={`/shop/${item.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#efe8df]">
                  <ProductImage
                    src={index === 0 ? '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp' : '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp'}
                    alt={item.arabicTitle}
                    categorySlug={item.categorySlug}
                    usage="feature"
                    className="motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 pt-3">
                  <div>
                    <h3 className="font-medium sm:text-lg">{item.arabicTitle}</h3>
                    <p className="mt-1 text-[11px] text-[#78685f]">{item.collectionAr}</p>
                  </div>
                  <span className="text-xs text-[#78685f]">اكتشفي ↙</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/shop" className="mt-10 inline-block border-b border-[#241d19] pb-1 text-sm sm:hidden">كل القطع</Link>
      </section>

      <section className="bg-[#211b18] text-[#f8f1e9]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="relative min-h-[58svh] lg:col-span-7 lg:min-h-[780px]">
            <Image
              src="/images/bahja/elegant-clutch/05-elegant-clutch-wine-lifestyle.webp"
              alt="Elegant Clutch من بهجة ستور"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 lg:col-span-5 lg:px-12 lg:py-20">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#d8c6b8]">SIGNATURE PIECE</p>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-6xl">Elegant Clutch</h2>
              <p className="mt-3 text-2xl leading-tight text-[#e9ddd2]">قطعة صغيرة بحضور كامل.</p>
              <p className="mt-6 max-w-[36ch] text-sm leading-7 text-[#d7c8bd]">
                بوك يد هاند ميد بطابع محفظة صغيرة، متاح بعدة ألوان ومع صور حقيقية للتفاصيل والداخل وطريقة الإمساك.
              </p>
              <Link href="/shop/elegant-clutch" className="mt-8 inline-block border-b border-[#f8f1e9] pb-1 text-sm">
                اكتشفي القطعة والألوان
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                ['/images/bahja/elegant-clutch/04-elegant-clutch-navy-detail-closeup.webp', 'تفاصيل Elegant Clutch الكحلي'],
                ['/images/bahja/elegant-clutch/07-elegant-clutch-navy-held-top.webp', 'Elegant Clutch أثناء الإمساك'],
                ['/images/bahja/elegant-clutch/10-elegant-clutch-navy-interior.webp', 'داخل Elegant Clutch']
              ].map(([src, alt]) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-[#382d27]">
                  <Image src={src} alt={alt} fill className="object-cover motion-safe:transition motion-safe:duration-500 hover:scale-[1.02]" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="text-xs tracking-[0.16em] text-[#75665d]">المجموعات</p>
          <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">خيطان، وشخصيتان مختلفتان</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-5">
          <Link href="/shop?collection=himalayan-thread-bags" className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded2] sm:aspect-[5/4]">
              <Image src="/images/bahja/editorial/himalayan-bag.jpg" alt="شنط خيط الهيمالايا" fill className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="flex items-end justify-between gap-5 pt-4">
              <div>
                <h3 className="text-2xl font-medium sm:text-3xl">خيط الهيمالايا</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#75665d]">ملمس أكثر هدوءًا، وألوان تسمح للقطعة تدخل في اليومي بسهولة.</p>
              </div>
              <span className="text-sm">↙</span>
            </div>
          </Link>

          <Link href="/shop?collection=chain-thread-bags" className="group lg:mt-20">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded2] sm:aspect-[5/4]">
              <Image src="/images/bahja/editorial/chain-bag.jpg" alt="شنط خيوط السلسلة" fill className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="flex items-end justify-between gap-5 pt-4">
              <div>
                <h3 className="text-2xl font-medium sm:text-3xl">خيوط السلسلة</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#75665d]">حضور أقوى وتفاصيل معدنية أوضح، مع تجهيز حسب اللون والتفاصيل المتاحة.</p>
              </div>
              <span className="text-sm">↙</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-[#241d19]/12 bg-[#f1e9df]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.16em] text-[#75665d]">تفاصيل الحرفة</p>
              <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">القطعة تُقرأ من قرب.</h2>
              <p className="mt-5 text-sm leading-7 text-[#75665d]">
                بدل ما نقول إن القطعة هاند ميد فقط، نقرّب الصورة إلى الخيط والملمس والسلسلة والتشطيب — تفاصيل حقيقية من منتجات بهجة الحالية.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4">
              {craftDetails.map((detail) => (
                <figure key={detail.src}>
                  <div className="relative aspect-square overflow-hidden bg-[#e7ddd1]">
                    <Image src={detail.src} alt={detail.label} fill className="object-contain p-2" sizes="(min-width:768px) 22vw, 48vw" />
                  </div>
                  <figcaption className="pt-3">
                    <p className="font-medium">{detail.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#75665d]">{detail.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="grid gap-12 border-b border-[#241d19]/15 pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:pb-28">
          <div>
            <p className="text-xs tracking-[0.16em] text-[#75665d]">حسب الطلب</p>
            <h2 className="mt-2 max-w-[8ch] text-4xl font-medium tracking-[-0.04em] sm:text-6xl">خليها بتفاصيلك.</h2>
          </div>

          <div>
            <div className="grid gap-0 border-t border-[#241d19]/15 sm:grid-cols-2">
              {[
                ['01', 'المقاس', 'اختاري المقاس المتاح حسب نوع الشنطة.'],
                ['02', 'اللون', 'نؤكد معكِ الألوان المتاحة قبل التنفيذ.'],
                ['03', 'الخيط', 'هيمالايا أو خيوط السلسلة حسب التصميم.'],
                ['04', 'السلسلة والتفاصيل', 'نراجع تفاصيل السلسلة والتشطيب قبل تأكيد الطلب.']
              ].map(([number, title, copy]) => (
                <div key={number} className="border-b border-[#241d19]/15 py-6 sm:odd:pl-6 sm:even:border-r sm:even:border-[#241d19]/15 sm:even:pr-6">
                  <span className="text-xs text-[#8a776c]">{number}</span>
                  <h3 className="mt-4 text-xl font-medium">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#75665d]">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/custom-orders" className="border-b border-[#241d19] pb-1 text-sm font-medium">ابدئي طلبك الخاص</Link>
              <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)} className="!rounded-none !bg-transparent !px-0 !py-0 !text-[#75665d] !shadow-none hover:!opacity-100">
                تواصلي على واتساب ↙
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-36">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs tracking-[0.16em] text-[#75665d]">Small joys</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">تفاصيل أصغر، بنفس الروح</h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Link href="/shop?category=hair-accessories" className="group">
            <div className="relative aspect-[5/3] overflow-hidden bg-[#eadfd4]">
              <Image src="/images/bahja/editorial/hair-accessories.jpg" alt="إكسسوارات شعر من بهجة" fill className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]" sizes="(min-width:640px) 50vw, 100vw" />
            </div>
            <p className="pt-3 text-lg font-medium">إكسسوارات شعر يدوية</p>
          </Link>
          <Link href="/shop?category=canvas-art" className="group sm:mt-12">
            <div className="relative aspect-[5/3] overflow-hidden bg-[#eadfd4]">
              <Image src="/images/bahja/editorial/custom-art.jpg" alt="لوحات كانفس من بهجة" fill className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]" sizes="(min-width:640px) 50vw, 100vw" />
            </div>
            <p className="pt-3 text-lg font-medium">لوحات كانفس حسب الطلب</p>
          </Link>
        </div>
      </section>

      <section className="bg-[#e8d8c8]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:px-12 lg:py-32">
          <div className="lg:col-span-4">
            <Image src="/images/bahja/brand/bahja-logo-primary.png" alt="بهجة ستور" width={240} height={240} className="h-auto w-28 sm:w-36" />
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-[24ch] text-3xl font-medium leading-[1.35] tracking-[-0.025em] sm:text-5xl">
              بهجة مساحة لقطع هاند ميد تُختار بهدوء، وتتجهز بتفاصيل أقرب لذوق صاحبتها.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#6f5f55]">
              من الشنط إلى الإكسسوارات والقطع المخصصة، الفكرة واحدة: المنتج الحقيقي هو البطل، والتفاصيل هي اللي تحكي القصة.
            </p>
            <Link href="/about" className="mt-8 inline-block border-b border-[#241d19] pb-1 text-sm">عن بهجة</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <p className="text-xs tracking-[0.16em] text-[#75665d]">اختاري حكايتك</p>
        <h2 className="mx-auto mt-3 max-w-[12ch] text-4xl font-medium tracking-[-0.04em] sm:text-6xl">جاهزة تختاري قطعتك؟</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#75665d]">
          تصفحي القطع الجاهزة للعرض، أو ابدئي طلبًا خاصًا ونأكد معكِ التفاصيل والسعر النهائي قبل التنفيذ.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-4 text-sm">
          <Link href="/shop" className="border-b border-[#241d19] pb-1 font-medium">تصفحي المتجر</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)} className="!rounded-none !bg-transparent !px-0 !py-0 !text-[#75665d] !shadow-none hover:!opacity-100">
            تواصلي على واتساب ↙
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
