import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'السلة | بهجة ستور',
  description: 'راجعي القطع المختارة في سلة بهجة ستور وأرسلي طلبك النهائي بسهولة عبر واتساب.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
