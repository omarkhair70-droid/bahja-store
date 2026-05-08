import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الطلبات الخاصة | بهجة ستور',
  description: 'اطلبي قطعة مخصصة من بهجة ستور مع خيارات اللون والمقاس والتشطيب وتفاصيل التصميم عبر واتساب.',
};

export default function CustomOrdersPage() {
  return <SectionShell title="الطلبات الخاصة" subtitle="اختاري تفاصيل قطعتكِ لنصنعها كما تتمنين."><ul className="mb-6 list-disc space-y-2 pr-5 text-bahja-taupe"><li>اللون</li><li>المقاس</li><li>السلسلة</li><li>التشطيب</li><li>تفاصيل التصميم</li></ul><div className="space-y-3"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton><p className="text-sm text-bahja-taupe">أو تواصلي معنا عبر:</p><div className="flex flex-wrap gap-2"><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-bahja-beige bg-white/80 px-4 py-1.5 text-sm font-medium text-bahja-brown transition hover:border-bahja-taupe hover:text-bahja-taupe">Facebook · فيسبوك</a><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-bahja-beige bg-white/80 px-4 py-1.5 text-sm font-medium text-bahja-brown transition hover:border-bahja-taupe hover:text-bahja-taupe">Instagram · إنستجرام</a></div></div></SectionShell>;
}
