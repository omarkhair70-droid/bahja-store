import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductImage from '@/components/ProductImage';
import { formatArabicPriceGuide, getProductArabicTitle } from '@/lib/utils';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);

  return <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
    <div className="relative h-[300px] overflow-hidden rounded-3xl bg-bahja-cream sm:h-[420px]"><ProductImage src={product.image} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="detail" /></div>
    <div className="space-y-4"><p className="text-sm text-bahja-taupe">{product.collection}</p><h1 className="text-3xl font-semibold">{getProductArabicTitle(product.arabicTitle, product.title)}</h1><p className="text-xs text-bahja-taupe">{product.title}</p><p className="text-bahja-taupe">{product.description}</p><p className="rounded-2xl bg-bahja-cream/80 p-3 text-sm">{formatArabicPriceGuide(product.priceGuide)}</p><ProductDetailActions product={{ ...product, priceGuide: formatArabicPriceGuide(product.priceGuide) }} /></div>
    <div className="space-y-3 lg:col-span-2"><h2 className="text-xl font-semibold">قطع قريبة من ذوقكِ</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="bahja-card"><div className="relative h-44 bg-bahja-cream"><ProductImage src={item.image} alt={getProductArabicTitle(item.arabicTitle, item.title)} categorySlug={item.categorySlug} usage="card" /></div><div className="p-3"><p className="font-medium">{getProductArabicTitle(item.arabicTitle, item.title)}</p></div></Link>)}</div></div>
  </section>;
}
