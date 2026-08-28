import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'الطلبات الخاصة | بهجة ستور',
  description: 'ابدئي طلبًا خاصًا من بهجة مع مراجعة المقاس واللون والخيط والسلسلة أو التشطيب قبل التأكيد.'
};

const steps = [
  ['01', 'اختاري نوع القطعة', 'ابدئي من شنطة موجودة أو من نوع القطعة اللي عايزاها.'],
  ['02', 'حددي المقاس', 'للشنط الهاند ميد نراجع المقاس المناسب حسب التصميم.'],
  ['03', 'اختاري اللون والخيط', 'نأكد معكِ الدرجات والخامات المتاحة وقت الطلب.'],
  ['04', 'راجعي السلسلة والتشطيب', 'التفاصيل المعدنية واللمسات النهائية تتأكد قبل التنفيذ.'],
  ['05', 'ابعتي الطلب', 'نراجع كل التفاصيل والسعر النهائي معكِ على واتساب.']
];

export default function CustomOrdersPage() {
  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">حسب الطلب</p>
            <h1 className="mt-3 max-w-[8ch] text-5xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              خليها بتفاصيلك.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-sm leading-7 text-[#75665d]">
              التخصيص هنا مش configurator وهمي. بنحدد معكِ المقاس واللون والخيط والسلسلة أو التشطيب المتاح، وبعدها السعر النهائي يتأكد قبل التنفيذ.
            </p>
            <WhatsAppButton
              href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}
              className="mt-6 !rounded-none !bg-[#241d19] !px-5 !py-3 !text-[#fffaf5] !shadow-none hover:!bg-[#3a2f29]"
            >
              ابدئي طلبًا خاصًا
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#eee5da] sm:aspect-square lg:col-span-7 lg:aspect-[5/4]">
            <Image
              src="/images/bahja/redesigned/light-grey-himalayan-thread-bag-texture.png"
              alt="تفاصيل خيط من شنطة بهجة"
              fill
              className="object-contain p-4"
              sizes="(min-width:1024px) 58vw, 100vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
              <Image src="/images/bahja/redesigned/black-gold-chain-thread-bag-hardware.png" alt="تفاصيل سلسلة من بهجة" fill className="object-contain p-3" sizes="25vw" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
              <Image src="/images/bahja/redesigned/black-gold-chain-thread-bag-texture.png" alt="ملمس خيط من بهجة" fill className="object-contain p-3" sizes="25vw" />
            </div>
            <div className="relative col-span-2 aspect-[5/3] overflow-hidden bg-[#eee5da]">
              <Image src="/images/bahja/editorial/chain-bag.jpg" alt="شنطة بهجة بخيوط السلسلة" fill className="object-cover" sizes="42vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#241d19]/12 bg-[#eee5da]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.16em] text-[#75665d]">الطريقة</p>
              <h2 className="mt-2 max-w-[8ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">من الفكرة للتأكيد.</h2>
            </div>
            <div className="border-t border-[#241d19]/15 lg:col-span-8">
              {steps.map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-[#241d19]/15 py-6 sm:grid-cols-[60px_1fr_1.2fr] sm:items-start">
                  <span className="text-xs text-[#817067]">{number}</span>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-sm leading-7 text-[#75665d]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-8 border-b border-[#241d19]/15 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">قبل ما تبعتي</p>
            <h2 className="mt-2 max-w-[11ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
              كل ما توضحي التفاصيل، نبدأ من نقطة أوضح.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-7 text-[#75665d]">
              ممكن تبعتي اسم القطعة أو صورة مرجعية من منتجات بهجة، المقاس اللي في بالك، اللون، وأي تفصيلة مهمة بالنسبة لكِ.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 text-sm">
          <WhatsAppButton
            href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}
            className="!rounded-none !bg-[#241d19] !px-5 !py-3 !text-[#fffaf5] !shadow-none hover:!bg-[#3a2f29]"
          >
            ابدئي على واتساب
          </WhatsAppButton>
          <Link href="/shop" className="self-center border-b border-[#241d19] pb-1">
            شوفي القطع أولًا
          </Link>
        </div>
      </section>
    </main>
  );
}
