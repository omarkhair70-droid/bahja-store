import Link from 'next/link';
import type { Metadata } from 'next';
import WhatsAppButton from '@/components/WhatsAppButton';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'تواصل معنا | بهجة ستور',
  description: 'تواصلي مع بهجة ستور عبر واتساب أو Instagram وFacebook للاستفسار عن المنتجات والطلبات الخاصة.'
};

const faqs = [
  ['إزاي أطلب؟', 'اختاري القطعة من المتجر، حددي المقاس والتفاصيل، وبعدها أرسلي الطلب من السلة أو تواصلي على واتساب.'],
  ['هل اللون أو المقاس ممكن يتخصص؟', 'التخصيص متاح حسب نوع القطعة والمتاح وقت الطلب، ويتأكد قبل التنفيذ.'],
  ['هل السعر ثابت؟', 'قد يختلف السعر حسب المقاس والتخصيص والتشطيب، والسعر النهائي يتأكد بعد مراجعة الطلب.'],
  ['مكان بهجة فين؟', site.locationAr]
];

export default function ContactPage() {
  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">تواصل معنا</p>
            <h1 className="mt-3 max-w-[9ch] text-5xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              اسألي عن القطعة قبل ما تقرري.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-sm leading-7 text-[#75665d]">
              واتساب هو الطريق الأساسي للاستفسار عن التوفر والسعر النهائي والتخصيص. تقدري كمان توصلي لبهجة على Instagram وFacebook.
            </p>
            <WhatsAppButton
              href={getWhatsAppUrl(whatsappMessages.generalContact)}
              className="mt-6 !rounded-none !bg-[#241d19] !px-5 !py-3 !text-[#fffaf5] !shadow-none hover:!bg-[#3a2f29]"
            >
              افتحي واتساب
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-14 grid gap-0 border-y border-[#241d19]/15 sm:grid-cols-3">
          <div className="border-b border-[#241d19]/15 py-6 sm:border-b-0 sm:border-l sm:px-6">
            <p className="text-[11px] text-[#817067]">الهاتف / واتساب</p>
            <p className="mt-2 text-sm">{site.phone}</p>
          </div>
          <div className="border-b border-[#241d19]/15 py-6 sm:border-b-0 sm:border-l sm:px-6">
            <p className="text-[11px] text-[#817067]">الموقع</p>
            <p className="mt-2 text-sm leading-6">{site.locationAr}</p>
          </div>
          <div className="py-6 sm:px-6">
            <p className="text-[11px] text-[#817067]">السوشيال</p>
            <div className="mt-2 flex gap-4 text-sm">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="border-b border-[#241d19] pb-1">Instagram</a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="border-b border-[#241d19] pb-1">Facebook</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#241d19]/12 bg-[#eee5da]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.16em] text-[#75665d]">الأسئلة الشائعة</p>
              <h2 className="mt-2 max-w-[8ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">قبل ما تبعتي.</h2>
            </div>
            <div className="divide-y divide-[#241d19]/15 border-y border-[#241d19]/15 lg:col-span-8">
              {faqs.map(([question, answer]) => (
                <div key={question} className="grid gap-3 py-6 sm:grid-cols-[0.8fr_1.2fr]">
                  <h3 className="font-medium">{question}</h3>
                  <p className="text-sm leading-7 text-[#75665d]">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <p className="text-xs tracking-[0.16em] text-[#75665d]">لو جاهزة تختاري</p>
        <h2 className="mx-auto mt-3 max-w-[11ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
          ابدئي من القطعة، وبعدها خلّي التفاصيل علينا.
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-4 text-sm">
          <Link href="/shop" className="border-b border-[#241d19] pb-1">تصفحي المتجر</Link>
          <Link href="/custom-orders" className="border-b border-[#75665d] pb-1 text-[#75665d]">طلب خاص</Link>
        </div>
      </section>
    </main>
  );
}
