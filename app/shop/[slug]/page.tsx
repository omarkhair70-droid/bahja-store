import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicProducts } from '@/content/bahja-products';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductImage from '@/components/ProductImage';
import { getPreferredProductImage } from '@/content/bahja-media';
import { formatBilingualPriceGuide, getCollectionEnglish, getCollectionLabel, getProductArabicTitle } from '@/lib/utils';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = publicProducts.find((p) => p.slug === slug);
  if (!product) return notFound();
  const related = publicProducts.filter((p) => p.collectionSlug === product.collectionSlug && p.slug !== slug).slice(0, 3);
  const detailImage = getPreferredProductImage(product, 'detail');
  const isBag = (product.cardVariant ?? 'bag') === 'bag';
  const isCanvas = product.cardVariant === 'canvas-custom';
  const isAccessory = product.cardVariant === 'accessory';
  const isElegantClutch = product.slug === 'elegant-clutch';

  if (isElegantClutch) {
    return <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="relative h-[360px] overflow-hidden rounded-3xl bg-bahja-cream sm:h-[460px]">
          <ProductImage src="/images/bahja/elegant-clutch/01-elegant-clutch-navy-front.webp" alt="Elegant Clutch handmade wallet in navy" categorySlug={product.categorySlug} usage="detail" />
        </div>
        <div className="space-y-3.5">
          <h1 className="text-2xl font-semibold sm:text-3xl">Elegant Clutch</h1>
          <p className="text-base text-bahja-taupe">إليجانت كلاتش</p>
          <p className="text-sm">Clutch & Wallet Pieces <span className="text-bahja-taupe">· Elegant Clutch</span></p>
          <p className="rounded-2xl bg-bahja-cream/80 p-3 text-sm leading-7">استفسري عن السعر عبر واتساب · Ask on WhatsApp</p>
          <p className="text-sm leading-7 text-bahja-taupe">بوك يد أنيق بتفاصيل يدوية، يجمع بين إحساس المحفظة الصغيرة وأناقة الكلاتش في قطعة واحدة، بعيدًا عن شكل الشنطة التقليدية.</p>
          <p className="text-sm text-bahja-taupe">A compact handmade clutch with the feel of a refined wallet and the presence of a keepsake piece.</p>
          <div className="flex flex-wrap gap-2">{[['Navy','bg-[#2f3f5f]'],['Black','bg-[#2f2a28]'],['Wine','bg-[#6b2f3a]'],['Teal','bg-[#2a6f72]']].map(([name,bg]) => <span key={name} className="inline-flex items-center gap-2 rounded-full border border-bahja-beige/70 bg-white/75 px-3 py-1 text-xs text-bahja-taupe"><span className={`h-2.5 w-2.5 rounded-full ${bg}`} />{name}</span>)}</div>
          <ProductDetailActions product={product} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Color options</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/01-elegant-clutch-navy-front.webp" alt="Elegant Clutch handmade wallet in navy" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/02-elegant-clutch-black-front.webp" alt="Elegant Clutch black color variant" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/03-elegant-clutch-wine-front.webp" alt="Elegant Clutch wine color variant" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/13-elegant-clutch-teal-front.webp" alt="Elegant Clutch teal color variant" categorySlug={product.categorySlug} usage="detail" /></div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Finish & details</h2>
        <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative h-64 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/04-elegant-clutch-navy-detail-closeup.webp" alt="Elegant Clutch navy closeup handmade detail" categorySlug={product.categorySlug} usage="detail" /></div>
        <div className="relative h-64 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/14-elegant-clutch-teal-detail-closeup.webp" alt="Elegant Clutch teal closeup handmade detail" categorySlug={product.categorySlug} usage="detail" /></div>
        <div className="relative h-64 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/05-elegant-clutch-wine-lifestyle.webp" alt="Elegant Clutch wine lifestyle styling" categorySlug={product.categorySlug} usage="detail" /></div>
        </div>
      </div>
      <div className="relative h-72 overflow-hidden rounded-2xl bg-bahja-cream">
        <ProductImage src="/images/bahja/elegant-clutch/06-elegant-clutch-three-colors.webp" alt="Elegant Clutch collection in navy black and wine" categorySlug={product.categorySlug} usage="detail" />
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Scale & handling</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/07-elegant-clutch-navy-held-top.webp" alt="Elegant Clutch navy held top view" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/08-elegant-clutch-black-held-top.webp" alt="Elegant Clutch black held top view" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/09-elegant-clutch-wine-held-top.webp" alt="Elegant Clutch wine held top view" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-56 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/15-elegant-clutch-teal-held-top.webp" alt="Elegant Clutch teal held top view" categorySlug={product.categorySlug} usage="detail" /></div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Interior views</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative h-52 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/10-elegant-clutch-navy-interior.webp" alt="Elegant Clutch interior lining view in navy" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-52 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/11-elegant-clutch-black-interior.webp" alt="Elegant Clutch interior lining view in black" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-52 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/12-elegant-clutch-wine-interior.webp" alt="Elegant Clutch interior lining view in wine" categorySlug={product.categorySlug} usage="detail" /></div>
          <div className="relative h-52 overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src="/images/bahja/elegant-clutch/16-elegant-clutch-teal-interior.webp" alt="Elegant Clutch interior lining view in teal" categorySlug={product.categorySlug} usage="detail" /></div>
        </div>
      </div>
    </section>;
  }

  return <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
    <div className={`relative overflow-hidden rounded-3xl bg-bahja-cream ${isCanvas ? 'h-[300px] p-3 sm:h-[380px] sm:p-4' : 'h-[330px] sm:h-[460px]'}`}><ProductImage src={detailImage} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="detail" /></div>
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
