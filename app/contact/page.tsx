import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تواصل معنا | بهجة ستور',
  description: 'تواصلي مع بهجة ستور عبر واتساب للاستفسار عن المنتجات، التخصيص، ومدة التجهيز.',
};

export default function ContactPage() {
  return <SectionShell title="تواصل معنا"><div className="space-y-2 text-bahja-taupe"><p>واتساب / رقم الهاتف: {site.phone}</p><div className="flex flex-wrap items-center gap-3"><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Facebook</a><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Instagram</a></div><p>الموقع: المقطم – الهضبة الوسطى، القاهرة، مصر</p></div><div className="my-6"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>استفسار واتساب</WhatsAppButton></div><div className="space-y-3"><h3 className="text-xl font-semibold text-bahja-brown">الأسئلة الشائعة</h3><p><strong>كيف أطلب؟</strong> تصفحي القطع ثم أرسلي طلبكِ عبر واتساب.</p><p><strong>هل يمكن تخصيص اللون أو المقاس؟</strong> نعم، التخصيص متاح حسب الطلب.</p><p><strong>هل الأسعار ثابتة؟</strong> قد تختلف حسب التفاصيل والتشطيب.</p><p><strong>أين يقع بهجة ستور؟</strong> المقطم – الهضبة الوسطى، القاهرة، مصر.</p></div></SectionShell>;
}
