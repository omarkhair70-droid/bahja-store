import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderBagProvider } from '@/components/OrderBagProvider';

export const metadata: Metadata = {
  title: 'بهجة ستور | Bahja Store',
  description: 'بهجة ستور لمنتجات هاند ميد أنثوية: شنط، لوحات كانفس، وإكسسوارات شعر مصنوعة يدويًا في القاهرة.',
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
