import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductImage from '@/components/ProductImage';
import { formatArabicPriceGuide, getProductArabicTitle } from '@/lib/utils';
import { isBagProduct } from '@/lib/order-bag';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);
  const isBag = isBagProduct(product.categorySlug);

  return <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
    <div className={`relative overflow-hidden rounded-3xl bg-bahja-cream ${product.categorySlug === 'canvas-art' ? 'h-[250px] p-4 sm:h-[300px]' : 'h-[320px] sm:h-[460px]'}`}><ProductImage src={product.image} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="detail" /></div>
    <div className="space-y-3"><p className="text-sm text-bahja-taupe">{product.collection}</p><h1 className="text-2xl font-semibold sm:text-3xl">{getProductArabicTitle(product.arabicTitle, product.title)}</h1><p className="rounded-2xl bg-bahja-cream/80 p-3 text-sm">{formatArabicPriceGuide(product.priceGuide)}</p><ProductDetailActions product={{ ...product, priceGuide: formatArabicPriceGuide(product.priceGuide) }} /><p className="text-sm text-bahja-taupe">{product.description}</p>{isBag && <div className="grid grid-cols-2 gap-2 text-xs"><span className="subtle-panel px-3 py-2 text-center">صناعة يدوية</span><span className="subtle-panel px-3 py-2 text-center">تجهيز حسب الطلب</span><span className="subtle-panel px-3 py-2 text-center">مقاسات مختلفة</span><span className="subtle-panel px-3 py-2 text-center">تفاصيل قابلة للتخصيص</span></div>}</div>
    <div className="space-y-3 lg:col-span-2"><h2 className="text-xl font-semibold">قطع قريبة من ذوقكِ</h2><div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="bahja-card min-w-[200px] sm:min-w-0"><div className="relative h-36 bg-bahja-cream"><ProductImage src={item.image} alt={getProductArabicTitle(item.arabicTitle, item.title)} categorySlug={item.categorySlug} usage="card" /></div><div className="p-3"><p className="text-sm font-medium">{getProductArabicTitle(item.arabicTitle, item.title)}</p></div></Link>)}</div></div>
  </section>;
}
