import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';

const toArabicPrice = (text: string) => text.replace('Small:', 'صغير:').replace('Medium:', 'متوسط:').replace('Large:', 'كبير:').replace('Available by request', 'متاح حسب الطلب').replace('EGP', 'جنيه');

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-bahja-cream shadow-soft"><Image src={product.image} alt={product.arabicTitle ?? product.title} fill className="object-cover" /></div>
      <div className="space-y-5">
        <p className="text-sm text-bahja-taupe">{product.collection} • {product.category}</p>
        <div className="space-y-2"><h1 className="text-3xl font-semibold leading-tight text-bahja-brown sm:text-4xl">{product.arabicTitle ?? product.title}</h1><p className="text-sm text-bahja-taupe">{product.title}</p></div>
        <p className="leading-relaxed text-bahja-taupe">{product.description}</p>
        <div className="subtle-panel p-4"><p className="mb-1 text-sm text-bahja-taupe">دليل الأسعار</p><p className="font-medium text-bahja-brown">{toArabicPrice(product.priceGuide)}</p></div>
        <p className="text-sm leading-relaxed text-bahja-taupe">قد تختلف الأسعار حسب التفاصيل والتخصيص وجودة التشطيب لكل قطعة.</p>
        <ProductDetailActions product={{...product, priceGuide: toArabicPrice(product.priceGuide)}} />
      </div>
      <div className="space-y-4 lg:col-span-2"><h2 className="text-2xl font-semibold text-bahja-brown">قطع قد تعجبكِ</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/shop/${item.slug}`} className="overflow-hidden rounded-3xl border border-bahja-beige/70 bg-white/80 shadow-soft"><div className="relative aspect-[4/3] bg-bahja-cream"><Image src={item.image} alt={item.arabicTitle ?? item.title} fill className="object-cover" /></div><div className="space-y-1 p-4"><p className="font-medium text-bahja-brown">{item.arabicTitle}</p><p className="text-xs text-bahja-taupe">{item.title}</p></div></Link>)}</div></div>
    </section>
  );
}
