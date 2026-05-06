import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import WhatsAppButton from '@/components/WhatsAppButton';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collection === product.collection && p.slug !== slug).slice(0, 3);
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-bahja-cream"><Image src={product.image} alt={product.title} fill className="object-cover" /></div>
      <div className="space-y-4"><p className="text-sm text-bahja-taupe">{product.collection} • {product.category}</p><h1 className="text-3xl font-semibold">{product.title}</h1><p className="text-bahja-taupe">{product.description}</p><p className="rounded-2xl bg-bahja-cream p-3 text-sm">{product.priceGuide}</p><p className="text-sm text-bahja-taupe">{site.pricingNote}<br />{site.arabicPricingNote}</p><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(product.title))}>Ask about this piece on WhatsApp</WhatsAppButton></div>
      <div className="md:col-span-2"><h2 className="mb-3 text-xl font-semibold">Related pieces</h2><div className="flex flex-wrap gap-3">{related.map((item) => <Link key={item.slug} href={`/shop/${item.slug}`} className="rounded-full border border-bahja-beige px-4 py-2">{item.title}</Link>)}</div></div>
    </section>
  );
}
