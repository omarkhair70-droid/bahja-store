import Image from 'next/image';
import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import CollectionCard from '@/components/CollectionCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { collections, products } from '@/content/bahja-products';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function HomePage() {
  return (<>
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
      <div className="space-y-5"><p className="text-sm text-bahja-taupe">Bahja Store</p><h1 className="text-4xl font-semibold text-bahja-brown">Stories in every stitch.</h1><p className="text-bahja-taupe">Handmade bags, canvas pieces, and delicate accessories crafted with warmth, care, and a little story in every detail.</p><p className="text-bahja-brown">للغُرز حكايا… وهنا لكل غرزة حكاية</p><div className="flex gap-3"><Link href="/collections" className="rounded-full border border-bahja-taupe px-5 py-3">Explore Collections</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>Order on WhatsApp</WhatsAppButton></div></div>
      <div className="grid grid-cols-2 gap-3"><div className="relative col-span-2 aspect-[4/3] rounded-3xl bg-bahja-cream"><Image src="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp" alt="Handmade bag" fill className="rounded-3xl object-cover"/></div><div className="relative aspect-square rounded-2xl bg-bahja-cream"><Image src="/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp" alt="Hair accessories" fill className="rounded-2xl object-cover"/></div><div className="relative aspect-square rounded-2xl bg-bahja-cream"><Image src="/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp" alt="Canvas art" fill className="rounded-2xl object-cover"/></div></div>
    </section>
    <div className="bg-bahja-cream/70 py-4 text-center text-bahja-brown">{site.tagline} • {site.arabicTagline}</div>
    <SectionShell title="Choose your story"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Handmade Bags','/shop'],['Canvas Art','/collections'],['Hair Accessories','/collections'],['Custom Orders','/custom-orders']].map(([t,h])=><Link key={t} href={h} className="rounded-2xl border border-bahja-beige bg-white/70 p-5 text-bahja-brown shadow-soft">{t}</Link>)}</div></SectionShell>
    <SectionShell title="Featured bag collections" subtitle="Elegant handmade bags with boutique finishing and clear pricing guide."><div className="grid gap-4 md:grid-cols-2"><CollectionCard title={collections[0].title} arabicTitle={collections[0].arabicTitle} href="/shop" description="Small 300 EGP • Medium 400 EGP • Large 470 EGP"/><CollectionCard title={collections[1].title} arabicTitle={collections[1].arabicTitle} href="/shop" description="Small 340 EGP • Medium 450 EGP • Large 590 EGP"/></div></SectionShell>
    <SectionShell title="Hair accessories preview"><div className="grid gap-4 sm:grid-cols-3">{products.filter(p=>p.collection==='Hair Accessories').map(p=><div key={p.slug} className="rounded-2xl border border-bahja-beige p-4">{p.title}</div>)}</div></SectionShell>
    <SectionShell title="Canvas art preview"><p className="text-bahja-taupe">Custom canvas pieces available by request.</p></SectionShell>
    <SectionShell title="Custom orders" subtitle="Choose colors, size, chain finishing, and design details. Pricing may vary."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>Start Your Custom Order</WhatsAppButton></SectionShell>
  </>);
}
