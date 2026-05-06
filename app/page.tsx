import Image from 'next/image';
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products } from '@/content/bahja-products';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

const atelierBadges = ['Handmade in Cairo', 'Made to order', 'Custom colors', 'Stories in every stitch'];

export default function HomePage() {
  const himalayan = products.filter((p) => p.collectionSlug === 'himalayan-thread-bags');
  const chain = products.filter((p) => p.collectionSlug === 'chain-thread-bags');
  const hair = products.filter((p) => p.categorySlug === 'hair-accessories').slice(0, 2);
  const canvas = products.find((p) => p.categorySlug === 'canvas-art');

  return <main className="mx-auto w-full max-w-6xl space-y-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
    <section className="relative overflow-hidden rounded-[2.5rem] border border-bahja-beige/80 bg-gradient-to-br from-[#fffaf1] via-[#f9ece6] to-[#f4dfd6] p-5 shadow-soft sm:p-8 lg:p-10">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem]">
          <Image src="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp" alt="Bahja atelier bag" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bahja-brown/45 via-transparent" />
          <p className="absolute bottom-5 left-5 text-sm text-bahja-ivory">Bahja Atelier / بهجة أتيليه</p>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-bahja-taupe">Editorial Opening</p>
            <h1 className="editorial-heading text-4xl sm:text-5xl">Soft stories, stitched by hand.</h1>
            <p className="text-bahja-brown">للغُرز حكايا… وهنا لكل غرزة حكاية</p>
            <p className="text-sm leading-relaxed text-bahja-taupe">A feminine lookbook of handmade bags, satin details, and canvas stories made to order with warmth and character.</p>
          </div>
          <div className="flex flex-wrap gap-2">{atelierBadges.map((badge) => <span key={badge} className="rounded-full border border-bahja-beige bg-white/75 px-3 py-1 text-xs text-bahja-brown">{badge}</span>)}</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-bahja-brown px-5 py-3 text-sm text-white">Explore the Atelier</Link>
            <Link href="/shop" className="rounded-full border border-bahja-taupe px-5 py-3 text-sm text-bahja-brown">Start an Order Bag</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-4 lg:grid-cols-3">
      <Link href="/shop?category=handmade-bags" className="group relative row-span-2 overflow-hidden rounded-[2rem] border border-bahja-beige bg-bahja-cream shadow-soft">
        <div className="relative aspect-[4/5]"><Image src="/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp" alt="The Bag Atelier" fill className="object-cover transition duration-500 group-hover:scale-105" /></div>
        <div className="space-y-2 p-5"><h3 className="text-2xl text-bahja-brown">The Bag Atelier</h3><p className="text-sm text-bahja-taupe">حكاية شنط مصنوعة بحب</p><p className="text-sm text-bahja-taupe">Thread textures and signature silhouettes for your everyday lookbook.</p><p className="text-sm font-medium text-bahja-brown">Enter the atelier →</p></div>
      </Link>
      <Link href="/shop?category=hair-accessories" className="overflow-hidden rounded-[1.8rem] border border-bahja-beige bg-white/80 shadow-soft"><div className="relative aspect-[16/10]"><Image src="/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp" alt="Satin Details" fill className="object-cover" /></div><div className="p-4"><h3 className="text-lg text-bahja-brown">Satin Details</h3><p className="text-sm text-bahja-taupe">نعومة الساتان</p><p className="text-sm text-bahja-taupe">Delicate accents for feminine styling.</p></div></Link>
      <Link href="/shop?category=canvas-art" className="overflow-hidden rounded-[1.8rem] border border-bahja-beige bg-white/80 shadow-soft"><div className="relative aspect-[16/10]"><Image src="/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp" alt="Canvas with Soul" fill className="object-cover" /></div><div className="p-4"><h3 className="text-lg text-bahja-brown">Canvas with Soul</h3><p className="text-sm text-bahja-taupe">لوحات بروح دافئة</p><p className="text-sm text-bahja-taupe">Arabic artistry with floral softness.</p></div></Link>
      <Link href="/custom-orders" className="lg:col-span-2 rounded-[1.8rem] border border-bahja-beige bg-gradient-to-r from-[#f9e9e3] to-[#f4e6dc] p-6 shadow-soft"><h3 className="text-2xl text-bahja-brown">Custom Made</h3><p className="text-bahja-taupe">تفصيلة خاصة لكِ</p><p className="mt-2 text-sm text-bahja-taupe">Tell us your color and size palette, then we craft your piece with intentional finishing.</p><p className="mt-3 text-sm font-medium text-bahja-brown">Start custom request →</p></Link>
    </section>
  

    <section className="grid gap-6 rounded-[2rem] border border-bahja-beige/70 bg-white/70 p-5 shadow-soft lg:grid-cols-2">
      <div className="space-y-4"><p className="text-xs uppercase tracking-[0.2em] text-bahja-taupe">The Himalayan Edit</p><h2 className="text-3xl text-bahja-brown">Textured calm, golden details.</h2><p className="text-sm text-bahja-taupe">Price guide: Small 300 • Medium 400 • Large 470 EGP.</p><Link href="/shop?collection=himalayan-thread-bags" className="text-sm font-medium text-bahja-brown">Shop Himalayan edit →</Link><div className="grid grid-cols-3 gap-2">{himalayan.slice(0,3).map((item)=><div key={item.slug} className="relative aspect-square overflow-hidden rounded-xl"><Image src={item.image} alt={item.title} fill className="object-cover"/></div>)}</div></div>
      <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem]"><Image src="/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp" alt="Himalayan edit" fill className="object-cover"/></div>
    </section>

    <section className="grid gap-4 rounded-[2rem] border border-bahja-beige/70 bg-gradient-to-br from-[#fcf3ef] to-[#f4e2d8] p-5 shadow-soft">
      <p className="text-xs uppercase tracking-[0.2em] text-bahja-taupe">Chain Thread Icons</p><div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]"><div className="relative aspect-[16/9] overflow-hidden rounded-2xl"><Image src="/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp" alt="Chain thread icons" fill className="object-cover"/></div><div className="space-y-3"><h2 className="text-3xl text-bahja-brown">Polished silhouettes.</h2><p className="text-sm text-bahja-taupe">Price guide: Small 340 • Medium 450 • Large 590 EGP.</p><p className="text-sm text-bahja-taupe">Each chain-thread icon balances structure and softness for statement evenings.</p><Link href="/shop?collection=chain-thread-bags" className="text-sm font-medium text-bahja-brown">Discover icons →</Link></div></div>
    </section>

    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Thread texture','Gold chain detail','Satin softness','Custom finishing'].map((t)=><div key={t} className="rounded-2xl border border-bahja-beige bg-bahja-ivory/90 p-4 text-sm text-bahja-brown">{t}</div>)}</section>

    <section className="grid gap-5 lg:grid-cols-2"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"><Image src="/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp" alt="Satin softness" fill className="object-cover"/></div><div className="space-y-4 self-center"><h2 className="text-3xl text-bahja-brown">Satin Softness</h2><p className="text-sm text-bahja-taupe">Delicate handmade satin pieces designed for gifting and graceful daily styling.</p>{hair.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="block text-sm text-bahja-brown underline-offset-4 hover:underline">{item.title}</Link>)}<Link href="/shop?category=hair-accessories" className="inline-block rounded-full border border-bahja-taupe px-4 py-2 text-sm">View Satin Details</Link></div></section>

    {canvas && <section className="grid gap-5 rounded-[2rem] border border-bahja-beige bg-white/70 p-5 shadow-soft lg:grid-cols-[1fr_1.1fr]"><div className="space-y-3 self-center"><h2 className="text-3xl text-bahja-brown">Canvas with Soul</h2><p className="text-bahja-taupe">لوحات عربية بلمسة فنية دافئة.</p><p className="text-sm text-bahja-taupe">Available by request with poetic finishing for your space.</p><Link href="/shop?category=canvas-art" className="text-sm font-medium text-bahja-brown">Explore Canvas Art →</Link></div><div className="relative aspect-[16/10] overflow-hidden rounded-2xl"><Image src={canvas.image} alt={canvas.title} fill className="object-cover"/></div></section>}

    <section className="rounded-[2rem] border border-bahja-beige bg-gradient-to-r from-[#f9ece8] to-[#f3dfd6] p-6 text-center shadow-soft"><h2 className="text-2xl text-bahja-brown">Tell us the color, size, and story — we’ll make the piece.</h2><div className="mt-4 flex flex-wrap justify-center gap-3"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>Start on WhatsApp</WhatsAppButton><Link href="/shop" className="rounded-full border border-bahja-taupe px-5 py-3 text-sm text-bahja-brown">Start an Order Bag</Link></div></section>

  </main>;
}
