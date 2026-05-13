import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderBagProvider } from '@/components/OrderBagProvider';
import PWARegister from '@/components/PWARegister';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bahja-store.vercel.app';


export const viewport: Viewport = {
  themeColor: '#BFA27A'
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'بهجة ستور | شنط هاند ميد وإكسسوارات شعر ولوحات كانفس',
  description:
    'بهجة ستور يقدم قطع هاند ميد أنثوية تشمل شنط خيط الهيمالايا، شنط خيوط السلسلة، لوحات كانفس، وإكسسوارات شعر بتفاصيل دافئة ولمسة فنية في القاهرة.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  openGraph: {
    title: 'بهجة ستور | شنط هاند ميد وإكسسوارات شعر ولوحات كانفس',
    description:
      'بهجة ستور يقدم قطع هاند ميد أنثوية تشمل شنط خيط الهيمالايا، شنط خيوط السلسلة، لوحات كانفس، وإكسسوارات شعر بتفاصيل دافئة ولمسة فنية في القاهرة.',
    images: [
      {
        url: '/images/bahja/brand/bahja-og-image.jpg',
        alt: 'Bahja Store Open Graph Image',
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
          <PWARegister />
          <Header />
          <main>{children}</main>
          <Footer />
          <PWAInstallPrompt />
        </OrderBagProvider>
      </body>
    </html>
  );
}
