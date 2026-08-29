import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن بهجة | بهجة ستور',
  description: 'بهجة ستور — قطع هاند ميد من القاهرة، تركز على الشنط والإكسسوارات والطلبات المخصصة.'
};

export default function AboutPage() {
  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">عن بهجة</p>
            <h1 className="mt-3 max-w-[11ch] text-5xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              المنتج هو البطل، والتفاصيل هي اللي تحكي القصة.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#75665d] lg:col-span-4">
            بهجة ستور براند هاند ميد من القاهرة يركز على الشنط والإكسسوارات والقطع المخصصة، مع اهتمام واضح بالخيط واللون والتشطيب.
          </p>
        </div>

        <div className="mt-12 relative aspect-[4/5] overflow-hidden bg-[#e8ded2] sm:aspect-[16/9] lg:mt-16">
          <Image
            src="/images/bahja/editorial/hero-bag.jpg"
            alt="قطعة هاند ميد من بهجة"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="border-y border-[#241d19]/12 bg-[#eee5da]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.16em] text-[#75665d]">روح بهجة</p>
              <h2 className="mt-2 max-w-[8ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
                هدوء في الواجهة، شخصية في القطعة.
              </h2>
            </div>
            <div className="grid gap-0 border-t border-[#241d19]/15 lg:col-span-8">
              {[
                ['01', 'هاند ميد', 'قيمة القطعة تبدأ من ملمسها وتفاصيلها الحقيقية، مش من زخرفة الواجهة.'],
                ['02', 'قابلة للتخصيص', 'المقاس واللون والخيط وبعض تفاصيل التشطيب ممكن تتراجع حسب الطلب والمتاح.'],
                ['03', 'عربية أولًا', 'تجربة التسوق مكتوبة ومبنية بالعربي من البداية، مش نسخة إنجليزية مقلوبة RTL.']
              ].map(([n, title, copy]) => (
                <div key={n} className="grid gap-4 border-b border-[#241d19]/15 py-6 sm:grid-cols-[60px_1fr_1.4fr]">
                  <span className="text-xs text-[#817067]">{n}</span>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-sm leading-7 text-[#75665d]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          <div className="relative aspect-square overflow-hidden bg-[#eee5da] lg:col-span-5">
            <Image src="/images/bahja/redesigned/light-grey-himalayan-thread-bag-texture.png" alt="تفاصيل خيط بهجة" fill className="object-contain p-3" sizes="40vw" />
          </div>
          <div className="relative aspect-square overflow-hidden bg-[#eee5da] lg:col-span-3 lg:mt-20">
            <Image src="/images/bahja/redesigned/black-gold-chain-thread-bag-hardware.png" alt="تفاصيل سلسلة بهجة" fill className="object-contain p-3" sizes="25vw" />
          </div>
          <div className="lg:col-span-4 lg:pl-8">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">من قرب</p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">الخيط، السلسلة، والتشطيب.</h2>
            <p className="mt-5 text-sm leading-7 text-[#75665d]">
              بدل كلام عام عن الحرفة، بهجة بتعرض صور قريبة حقيقية للخامة والهاردوير والتشطيب عشان القرار يبقى مبني على المنتج نفسه.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/shop" className="border-b border-[#241d19] pb-1">تصفحي المتجر</Link>
              <Link href="/custom-orders" className="border-b border-[#75665d] pb-1 text-[#75665d]">طلب خاص</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
