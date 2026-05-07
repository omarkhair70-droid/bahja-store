import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductImage from '@/components/ProductImage';
import ProductDetailGallery from '@/components/ProductDetailGallery';
import { getPreferredProductImage } from '@/content/bahja-media';
import { formatBilingualPriceGuide, getCollectionEnglish, getCollectionLabel, getProductArabicTitle } from '@/lib/utils';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);
  const detailImage = getPreferredProductImage(product, 'detail');
  const isBag = (product.cardVariant ?? 'bag') === 'bag';
  const isCanvas = product.cardVariant === 'canvas-custom';
  const isAccessory = product.cardVariant === 'accessory';

  return <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
    <ProductDetailGallery detailImage={detailImage} gallery={product.gallery} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} isCanvas={isCanvas} />
    <div className="space-y-3.5">
      <h1 className="text-2xl font-semibold sm:text-3xl">{getProductArabicTitle(product.arabicTitle, product.title)}</h1>
      <p className="text-sm text-bahja-taupe">{product.title}</p>
      <p className="text-sm">{getCollectionLabel(product.collectionSlug)} <span className="text-bahja-taupe">· {getCollectionEnglish(product.collectionSlug)}</span></p>
      <p className="rounded-2xl bg-bahja-cream/80 p-3 text-sm leading-7">{isCanvas ? 'Made to order · متاح حسب الطلب' : formatBilingualPriceGuide(product.priceGuide)}</p>
      {isBag ? <p className="text-xs text-bahja-taupe">Small / صغير · Medium / متوسط · Large / كبير</p> : null}
      <ProductDetailActions product={{...product, priceGuide: formatBilingualPriceGuide(product.priceGuide)}} />
      {isCanvas ? <div className="rounded-2xl bg-white/70 p-3 text-sm leading-7 text-bahja-taupe"><p className="font-semibold text-bahja-brown">تفاصيل القطعة</p><p className="mt-1">تصميم خاص يُجهز حسب الطلب، مع إمكانية تخصيص العبارة والألوان والتفاصيل المتاحة.</p></div> : isAccessory ? <div className="rounded-2xl bg-white/70 p-3 text-sm leading-7 text-bahja-taupe"><p className="font-semibold text-bahja-brown">تفاصيل القطعة</p><p className="mt-1">قطعة خفيفة تُصنع يدويًا بلمسة ناعمة، ويمكن تنسيق اللون والتشطيب حسب المتاح.</p></div> : <div className="rounded-2xl bg-white/70 p-3 text-sm leading-7"><p className="font-semibold">تفاصيل القطعة</p><ul className="mt-1 list-inside list-disc text-bahja-taupe"><li>صناعة يدوية</li><li>تجهيز حسب الطلب</li><li>يمكن تخصيص اللون والتشطيب حسب المتاح</li><li>قد تختلف الأسعار حسب التفاصيل وجودة التشطيب</li></ul></div>}
      <p className="text-sm leading-7 text-bahja-taupe">{product.description}</p>
    </div>
    <div className="space-y-3 lg:col-span-2"><h2 className="text-xl font-semibold">منتجات مشابهة</h2><div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="bahja-card min-w-[200px] sm:min-w-0"><div className="relative h-36 bg-bahja-cream"><ProductImage src={getPreferredProductImage(item, 'card')} alt={getProductArabicTitle(item.arabicTitle, item.title)} categorySlug={item.categorySlug} usage="card" /></div><div className="space-y-1 p-3"><p className="text-sm font-medium">{getProductArabicTitle(item.arabicTitle, item.title)}</p><p className="text-[11px] text-bahja-taupe">{item.title}</p></div></Link>)}</div></div>
  </section>;
}
