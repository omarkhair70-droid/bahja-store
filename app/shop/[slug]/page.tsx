import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductImage from '@/components/ProductImage';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getCollectionEnglish, getCollectionLabel, getProductArabicTitle } from '@/lib/utils';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);
  const detailImage = getPreferredProductImage(product, 'detail');
  const isBag = (product.cardVariant ?? 'bag') === 'bag';
  const isCanvas = product.cardVariant === 'canvas-custom';

  return <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
    <div className={`relative overflow-hidden rounded-3xl bg-bahja-cream ${isCanvas ? 'h-[300px] p-3 sm:h-[380px] sm:p-4' : 'h-[330px] sm:h-[460px]'}`}><ProductImage src={detailImage} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="detail" /></div>
    <div className="space-y-3.5">
      <h1 className="text-2xl font-semibold sm:text-3xl">{getProductArabicTitle(product.arabicTitle, product.title)}</h1>
      <p className="text-sm text-bahja-taupe">{product.title}</p>
      <p className="text-sm">{getCollectionLabel(product.collectionSlug)} <span className="text-bahja-taupe">· {getCollectionEnglish(product.collectionSlug)}</span></p>
      <p className="rounded-2xl bg-bahja-cream/80 p-3 text-sm leading-7">{isCanvas ? 'Made to order · متاح حسب الطلب' : product.priceGuide}</p>
      {isBag ? <p className="text-xs text-bahja-taupe">Small / صغير · Medium / متوسط · Large / كبير</p> : null}
      <ProductDetailActions product={product} />
      <p className="text-sm leading-7 text-bahja-taupe">{product.description}</p>
    </div>
    <div className="space-y-3 lg:col-span-2"><h2 className="text-xl font-semibold">منتجات مشابهة</h2><div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/shop/${item.slug}`} className="bahja-card min-w-[200px] sm:min-w-0"><div className="relative h-36 bg-bahja-cream"><ProductImage src={getPreferredProductImage(item, 'card')} alt={getProductArabicTitle(item.arabicTitle, item.title)} categorySlug={item.categorySlug} usage="card" /></div><div className="space-y-1 p-3"><p className="text-sm font-medium">{getProductArabicTitle(item.arabicTitle, item.title)}</p><p className="text-[11px] text-bahja-taupe">{item.title}</p></div></Link>)}</div></div>
  </section>;
}
