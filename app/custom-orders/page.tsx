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
  return <SectionShell title="الطلبات الخاصة" subtitle="اختاري تفاصيل قطعتكِ لنصنعها كما تتمنين."><ul className="mb-6 list-disc space-y-2 pr-5 text-bahja-taupe"><li>اللون</li><li>المقاس</li><li>السلسلة</li><li>التشطيب</li><li>تفاصيل التصميم</li></ul><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton><div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-bahja-taupe"><span>يمكنكِ أيضًا مراسلتنا عبر</span><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-bahja-beige bg-bahja-cream/70 px-4 py-2 font-medium text-bahja-brown shadow-sm transition-colors hover:border-bahja-taupe hover:text-bahja-taupe">Facebook</a><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-bahja-beige bg-bahja-cream/70 px-4 py-2 font-medium text-bahja-brown shadow-sm transition-colors hover:border-bahja-taupe hover:text-bahja-taupe">Instagram</a></div></SectionShell>;
}
