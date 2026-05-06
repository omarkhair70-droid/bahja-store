import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bahja Store | Handmade Bags, Canvas Art & Hair Accessories',
  description: 'Feminine handmade bags, canvas art, and hair accessories crafted with warmth, detail, and creativity in Cairo, Egypt.',
  openGraph: {
    title: 'Bahja Store | Handmade Bags, Canvas Art & Hair Accessories',
    description: 'Feminine handmade bags, canvas art, and hair accessories crafted with warmth, detail, and creativity in Cairo, Egypt.',
    images: ['/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
