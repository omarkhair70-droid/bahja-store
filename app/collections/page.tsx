import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المجموعات | بهجة ستور',
  description: 'اكتشفي مجموعات بهجة من الشنط الهاند ميد، Elegant Clutch، الإكسسوارات والكانفس.'
};

const primary = [
  {
    title: 'خيط الهيمالايا',
    copy: 'ملمس أهدأ وألوان سهلة في الاستخدام اليومي، مع مقاسات وتفاصيل تُراجع حسب الطلب.',
    href: '/shop?collection=himalayan-thread-bags',
    image: '/images/bahja/editorial/himalayan-bag.jpg'
  },
  {
    title: 'خيوط السلسلة',
    copy: 'حضور أوضح وتفاصيل معدنية أقوى، مع خيارات لون وتشطيب تتأكد قبل التنفيذ.',
    href: '/shop?collection=chain-thread-bags',
    image: '/images/bahja/editorial/chain-bag.jpg'
  }
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid gap-8 border-b border-[#241d19]/15 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">اختاري حكايتك</p>
            <h1 className="mt-3 max-w-[10ch] text-5xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              المجموعات
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#75665d] lg:col-span-4">
            بدل ما تكون كل القطع في شبكة واحدة، هنا كل مجموعة لها شخصية بصرية ومسار واضح للمتجر.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-36">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-5">
          {primary.map((collection, index) => (
            <Link key={collection.href} href={collection.href} className={`group ${index === 1 ? 'lg:mt-20' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded2] sm:aspect-[5/4]">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
              <div className="flex items-end justify-between gap-5 pt-4">
                <div>
                  <h2 className="text-2xl font-medium sm:text-4xl">{collection.title}</h2>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-[#75665d]">{collection.copy}</p>
                </div>
                <span className="text-sm">↙</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-y border-[#241d19]/15 py-12 sm:mt-28 sm:py-16 lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden bg-[#211b18] lg:col-span-7">
            <Image
              src="/images/bahja/elegant-clutch/06-elegant-clutch-three-colors.webp"
              alt="Elegant Clutch من بهجة"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 58vw, 100vw"
            />
          </div>
          <div className="lg:col-span-5 lg:px-6">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">SIGNATURE PIECE</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">Elegant Clutch</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#75665d]">
              قطعة أصغر لكن لها gallery أقوى من أغلب المنتجات: ألوان حقيقية، صور استخدام، تفاصيل قريبة وتشطيب داخلي.
            </p>
            <Link href="/shop?collection=elegant-clutch" className="mt-6 inline-block border-b border-[#241d19] pb-1 text-sm">
              اكتشفي الألوان
            </Link>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="mb-8">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">تفاصيل أصغر</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">أكثر من الشنط</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Link href="/shop?category=hair-accessories" className="group">
              <div className="relative aspect-[5/3] overflow-hidden bg-[#eadfd4]">
                <Image
                  src="/images/bahja/editorial/hair-accessories.jpg"
                  alt="إكسسوارات شعر من بهجة"
                  fill
                  className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]"
                  sizes="(min-width:640px) 50vw, 100vw"
                />
              </div>
              <p className="pt-3 text-xl font-medium">إكسسوارات شعر يدوية</p>
            </Link>

            <Link href="/shop?category=canvas-art" className="group sm:mt-12">
              <div className="relative aspect-[5/3] overflow-hidden bg-[#eadfd4]">
                <Image
                  src="/images/bahja/editorial/custom-art.jpg"
                  alt="لوحات كانفس من بهجة"
                  fill
                  className="object-cover motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.015]"
                  sizes="(min-width:640px) 50vw, 100vw"
                />
              </div>
              <p className="pt-3 text-xl font-medium">لوحات كانفس حسب الطلب</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
