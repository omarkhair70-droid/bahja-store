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
  return <SectionShell title="الطلبات الخاصة" subtitle="اختاري تفاصيل قطعتكِ لنصنعها كما تتمنين."><ul className="mb-6 list-disc space-y-2 pr-5 text-bahja-taupe"><li>اللون</li><li>المقاس</li><li>السلسلة</li><li>التشطيب</li><li>تفاصيل التصميم</li></ul><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>ابدئي طلبًا خاصًا</WhatsAppButton><p className="mt-4 text-sm text-bahja-taupe">يمكنكِ أيضًا مراسلتنا عبر <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Facebook</a> أو <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Instagram</a>.</p></SectionShell>;
}
