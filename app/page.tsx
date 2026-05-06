import Image from 'next/image';
import Link from 'next/link';
import SectionShell from '@/components/SectionShell';
import CollectionCard from '@/components/CollectionCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { collections, products } from '@/content/bahja-products';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function HomePage() {
  const hairPreview = products.filter((p) => p.categorySlug === 'hair-accessories').slice(0, 3);
  const canvasPiece = products.find((p) => p.categorySlug === 'canvas-art');

  return (<>
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
      <div className="space-y-5"><p className="text-sm text-bahja-taupe">Bahja Store</p><h1 className="text-4xl font-semibold text-bahja-brown">Stories in every stitch.</h1><p className="text-bahja-taupe">Handmade bags, canvas pieces, and delicate accessories crafted with warmth, care, and a little story in every detail.</p><p className="text-bahja-brown">للغُرز حكايا… وهنا لكل غرزة حكاية</p><div className="flex flex-wrap gap-3"><Link href="/collections" className="rounded-full border border-bahja-taupe px-5 py-3">Explore Collections</Link><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>Order on WhatsApp</WhatsAppButton></div></div>
      <div className="grid grid-cols-2 gap-3"><div className="relative col-span-2 aspect-[4/3] rounded-3xl bg-bahja-cream"><Image src="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp" alt="Handmade bag" fill className="rounded-3xl object-cover"/></div><div className="relative aspect-square rounded-2xl bg-bahja-cream"><Image src="/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp" alt="Hair accessories" fill className="rounded-2xl object-cover"/></div><div className="relative aspect-square rounded-2xl bg-bahja-cream"><Image src="/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp" alt="Thread bag" fill className="rounded-2xl object-cover"/></div></div>
    </section>
    <div className="bg-bahja-cream/70 py-3 text-center text-bahja-brown">{site.tagline} • {site.arabicTagline}</div>

    <SectionShell title="Choose your story"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      { title: 'Handmade Bags', href: '/shop?category=handmade-bags', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp', desc: 'Explore handcrafted bags with warm, detailed threadwork.', cta: 'Shop handmade bags' },
      { title: 'Canvas Art', href: '/shop?category=canvas-art', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', desc: 'Discover poetic canvas pieces inspired by Arabic art.', cta: 'View canvas pieces' },
      { title: 'Hair Accessories', href: '/shop?category=hair-accessories', image: '/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp', desc: 'Find satin accessories for graceful everyday styling.', cta: 'Browse accessories' },
      { title: 'Custom Orders', href: '/custom-orders', image: '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp', desc: 'Choose colors and details to create your own piece.', cta: 'Start custom order' }
    ].map((item) => <Link key={item.title} href={item.href} className="overflow-hidden rounded-2xl border border-bahja-beige bg-white/70 shadow-soft"><div className="relative aspect-[4/3] bg-bahja-cream"><Image src={item.image} alt={item.title} fill className="object-cover"/></div><div className="space-y-2 p-4"><h3 className="text-lg font-semibold text-bahja-brown">{item.title}</h3><p className="text-sm text-bahja-taupe">{item.desc}</p><p className="text-sm font-medium text-bahja-brown">{item.cta}</p></div></Link>)}</div></SectionShell>

    <SectionShell title="Featured bag collections" subtitle="Elegant handmade bags with boutique finishing and clear pricing guide."><div className="grid gap-4 md:grid-cols-2"><CollectionCard title={collections[0].title} arabicTitle={collections[0].arabicTitle} href="/shop?collection=himalayan-thread-bags" description="Small 300 EGP • Medium 400 EGP • Large 470 EGP" image="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp"/><CollectionCard title={collections[1].title} arabicTitle={collections[1].arabicTitle} href="/shop?collection=chain-thread-bags" description="Small 340 EGP • Medium 450 EGP • Large 590 EGP" image="/images/bahja/bags-chain-thread/chain-thread-bag-silver-grey-closeup-02.webp"/></div></SectionShell>

    <SectionShell title="Hair accessories preview"><div className="grid gap-4 sm:grid-cols-3">{hairPreview.map((p)=><Link key={p.slug} href={`/shop/${p.slug}`} className="overflow-hidden rounded-2xl border border-bahja-beige bg-white/70 shadow-soft"><div className="relative aspect-square"><Image src={p.image} alt={p.title} fill className="object-cover"/></div><div className="p-3 text-sm text-bahja-brown">{p.title}</div></Link>)}</div></SectionShell>
    <SectionShell title="Canvas art preview">{canvasPiece && <Link href={`/shop/${canvasPiece.slug}`} className="block overflow-hidden rounded-2xl border border-bahja-beige bg-white/70 shadow-soft"><div className="relative aspect-[16/7] bg-bahja-cream"><Image src={canvasPiece.image} alt={canvasPiece.title} fill className="object-cover"/></div><div className="p-4"><p className="font-medium text-bahja-brown">{canvasPiece.title}</p><p className="text-sm text-bahja-taupe">Custom canvas pieces available by request.</p></div></Link>}</SectionShell>
    <SectionShell title="Custom orders" subtitle="Choose colors, size, chain finishing, and design details. Pricing may vary."><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>Start Your Custom Order</WhatsAppButton></SectionShell>
  </>);
}
