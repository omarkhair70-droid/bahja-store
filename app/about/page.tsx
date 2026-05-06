import SectionShell from '@/components/SectionShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'قصتنا | بهجة ستور',
  description: 'تعرفي على قصة بهجة ستور وفلسفة التصميم اليدوي الأنثوي بتفاصيل دافئة وجودة عناية.',
};

export default function AboutPage() {
  return <SectionShell title="قصتنا" subtitle="بهجة ستور مساحة عربية دافئة للقطع اليدوية المصنوعة بحب."><div className="subtle-panel p-5 text-bahja-taupe"><p>نصنع شنط هاند ميد، لوحات كانفس، وإكسسوارات شعر بروح أنثوية وتفاصيل دقيقة في كل غرزة.</p><p className="mt-2">نهتم بالجودة، التشطيب، وإمكانية التخصيص حتى تصلك القطعة الأقرب لذوقكِ.</p></div></SectionShell>;
}
