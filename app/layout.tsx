import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderBagProvider } from '@/components/OrderBagProvider';

export const metadata: Metadata = {
  title: 'بهجة ستور | شنط هاند ميد وإكسسوارات شعر ولوحات كانفس',
  description:
    'بهجة ستور يقدم قطع هاند ميد أنثوية تشمل شنط خيط الهيمالايا، شنط خيوط السلسلة، لوحات كانفس، وإكسسوارات شعر بتفاصيل دافئة ولمسة فنية في القاهرة.',
  openGraph: {
    title: 'بهجة ستور | شنط هاند ميد وإكسسوارات شعر ولوحات كانفس',
    description:
      'بهجة ستور يقدم قطع هاند ميد أنثوية تشمل شنط خيط الهيمالايا، شنط خيوط السلسلة، لوحات كانفس، وإكسسوارات شعر بتفاصيل دافئة ولمسة فنية في القاهرة.',
    images: [
      {
        url: '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp',
        alt: 'شنطة خيوط سلسلة باللون الأسود وسلسلة ذهبية',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <OrderBagProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </OrderBagProvider>
      </body>
    </html>
  );
}
