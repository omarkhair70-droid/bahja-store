import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailActions from '@/components/ProductDetailActions';
import { products } from '@/content/bahja-products';
import { site } from '@/content/site';

const tactileMap = {
  'handmade-bags': ['Handmade thread texture', 'Chain finishing', 'Made to order'],
  'hair-accessories': ['Satin softness', 'Feminine detail', 'Giftable piece'],
  'canvas-art': ['Arabic calligraphy', 'Floral detail', 'Available by request']
} as const;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== product.slug).slice(0, 3);
  const tactile = tactileMap[product.categorySlug as keyof typeof tactileMap] ?? tactileMap['handmade-bags'];

  return <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-bahja-beige bg-bahja-cream"><Image src={product.image} alt={product.title} fill className="object-cover"/></div>
      <div className="space-y-4"><p className="text-sm text-bahja-taupe">{product.collection} • {product.category}</p><h1 className="text-4xl text-bahja-brown">{product.title}</h1>{product.arabicTitle && <p className="text-bahja-taupe">{product.arabicTitle}</p>}<p className="text-sm text-bahja-taupe">{product.description}</p><div className="rounded-2xl border border-bahja-beige bg-white/80 p-4"><p className="text-xs uppercase tracking-[0.14em] text-bahja-taupe">Price guide</p><p className="mt-1 text-bahja-brown">{product.priceGuide}</p></div><div className="rounded-2xl border border-bahja-beige/80 bg-bahja-ivory/85 p-4 text-sm text-bahja-taupe"><p>Customization panel: choose size, color direction, and any finishing notes in your order message.</p></div><div className="flex flex-wrap gap-2">{tactile.map((t)=><span key={t} className="rounded-full border border-bahja-beige bg-white px-3 py-1 text-xs text-bahja-brown">{t}</span>)}</div><p className="text-xs text-bahja-taupe">{site.pricingNote}</p><ProductDetailActions product={product} /></div></section>
    <section className="space-y-3"><h2 className="text-2xl text-bahja-brown">Related Pieces</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="overflow-hidden rounded-2xl border border-bahja-beige bg-white/80"><div className="relative aspect-[4/5]"><Image src={item.image} alt={item.title} fill className="object-cover"/></div><div className="p-3"><p className="text-sm text-bahja-brown">{item.title}</p></div></Link>)}</div></section>
  </main>;
}
