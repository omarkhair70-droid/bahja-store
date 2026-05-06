import SectionShell from '@/components/SectionShell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'من نحن | بهجة ستور', description: 'تعرفي على هوية بهجة ستور كبراند هاند ميد يركز على الشنط والإكسسوارات.' };

export default function AboutPage() {
  return <SectionShell title="من نحن" subtitle="بهجة ستور — شنط هاند ميد بتفاصيل ناعمة وحكاية في كل غرزة."><div className="subtle-panel p-5 text-bahja-taupe"><p>بهجة ستور براند هاند ميد يهتم بتفاصيل الشنط والإكسسوارات المصنوعة بعناية، ليقدم قطعًا ناعمة تحمل لمسة فنية وحكاية خاصة.</p></div></SectionShell>;
}
