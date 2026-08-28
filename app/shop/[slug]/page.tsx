import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/ProductImage';
import PdpProductActions from '@/components/pdp/PdpProductActions';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { publicProducts, type Product } from '@/content/bahja-products';
import { getPreferredProductImage } from '@/content/bahja-media';

const bagEvidence: Record<string, { angle: string; texture: string; hardware: string }> = {
  'black-gold-chain-thread-bag': {
    angle: '/images/bahja/redesigned/black-gold-chain-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/black-gold-chain-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/black-gold-chain-thread-bag-hardware.png'
  },
  'light-grey-himalayan-thread-bag': {
    angle: '/images/bahja/redesigned/light-grey-himalayan-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/light-grey-himalayan-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/light-grey-himalayan-thread-bag-hardware.png'
  },
  'navy-himalayan-thread-bag': {
    angle: '/images/bahja/redesigned/navy-himalayan-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/navy-himalayan-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/navy-himalayan-thread-bag-hardware.png'
  },
  'soft-sage-chain-thread-bag': {
    angle: '/images/bahja/redesigned/soft-sage-chain-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/soft-sage-chain-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/soft-sage-chain-thread-bag-hardware.png'
  },
  'silver-grey-chain-thread-bag': {
    angle: '/images/bahja/redesigned/silver-grey-chain-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/silver-grey-chain-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/silver-grey-chain-thread-bag-hardware.png'
  },
  'teal-himalayan-thread-bag': {
    angle: '/images/bahja/redesigned/teal-himalayan-thread-bag-angle.png',
    texture: '/images/bahja/redesigned/teal-himalayan-thread-bag-texture.png',
    hardware: '/images/bahja/redesigned/teal-himalayan-thread-bag-hardware.png'
  }
};

function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <nav aria-label="مسار المنتج" className="flex flex-wrap items-center gap-2 text-[11px] text-[#817067]">
      <Link href="/shop" className="border-b border-transparent pb-0.5 hover:border-[#817067]">المتجر</Link>
      <span aria-hidden="true">/</span>
      <Link
        href={`/shop?collection=${product.collectionSlug}`}
        className="border-b border-transparent pb-0.5 hover:border-[#817067]"
      >
        {product.collectionAr}
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[#241d19]">{product.arabicTitle}</span>
    </nav>
  );
}

function CommercePanel({ product, eyebrow }: { product: Product; eyebrow?: string }) {
  const isBag = product.categorySlug === 'handmade-bags';

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-xs tracking-[0.14em] text-[#75665d]">{eyebrow ?? product.collectionAr}</p>
      <h1 className="mt-3 max-w-[12ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
        {product.arabicTitle}
      </h1>
      {product.title !== product.arabicTitle ? (
        <p className="mt-2 text-xs text-[#817067]">{product.title}</p>
      ) : null}

      <p className="mt-6 max-w-[42ch] text-sm leading-7 text-[#62554e]">
        {product.descriptionAr}
      </p>

      <div className="mt-6 border-y border-[#241d19]/15 py-5">
        <p className="text-[11px] text-[#817067]">السعر</p>
        <p className="mt-2 text-sm leading-7 text-[#241d19]">{product.priceGuide}</p>
        {isBag ? (
          <p className="mt-2 text-[11px] leading-5 text-[#817067]">
            المقاسات المتاحة في الطلب: صغير · متوسط · كبير
          </p>
        ) : null}
      </div>

      <PdpProductActions product={product} />

      <div className="mt-7 divide-y divide-[#241d19]/12 border-y border-[#241d19]/12 text-sm">
        <div className="py-4">
          <p className="font-medium">تفاصيل القطعة</p>
          <p className="mt-2 leading-6 text-[#75665d]">
            {isBag
              ? 'صناعة يدوية وتجهيز حسب الطلب، مع إمكانية مراجعة اللون والتشطيب والتفاصيل المتاحة قبل تأكيد الطلب.'
              : 'قطعة يدوية تُجهز بعناية، ويُراجع اللون والتفاصيل المتاحة قبل تأكيد الطلب.'}
          </p>
        </div>
        <div className="py-4">
          <p className="font-medium">التخصيص</p>
          <p className="mt-2 leading-6 text-[#75665d]">
            اكتبي اللون أو التفاصيل المطلوبة داخل الطلب، ونؤكد المتاح والسعر النهائي قبل التنفيذ.
          </p>
        </div>
      </div>
    </aside>
  );
}

function ElegantClutchPdp({ product }: { product: Product }) {
  const colorViews = [
    ['/images/bahja/elegant-clutch/01-elegant-clutch-navy-front.webp', 'كحلي', 'Navy'],
    ['/images/bahja/elegant-clutch/02-elegant-clutch-black-front.webp', 'أسود', 'Black'],
    ['/images/bahja/elegant-clutch/03-elegant-clutch-wine-front.webp', 'نبيتي', 'Wine'],
    ['/images/bahja/elegant-clutch/13-elegant-clutch-teal-front.webp', 'تركواز', 'Teal']
  ] as const;

  const heldViews = [
    ['/images/bahja/elegant-clutch/07-elegant-clutch-navy-held-top.webp', 'الكحلي في اليد'],
    ['/images/bahja/elegant-clutch/08-elegant-clutch-black-held-top.webp', 'الأسود في اليد'],
    ['/images/bahja/elegant-clutch/09-elegant-clutch-wine-held-top.webp', 'النبيتي في اليد'],
    ['/images/bahja/elegant-clutch/15-elegant-clutch-teal-held-top.webp', 'التركواز في اليد']
  ] as const;

  const interiorViews = [
    ['/images/bahja/elegant-clutch/10-elegant-clutch-navy-interior.webp', 'داخل الكحلي'],
    ['/images/bahja/elegant-clutch/11-elegant-clutch-black-interior.webp', 'داخل الأسود'],
    ['/images/bahja/elegant-clutch/12-elegant-clutch-wine-interior.webp', 'داخل النبيتي'],
    ['/images/bahja/elegant-clutch/16-elegant-clutch-teal-interior.webp', 'داخل التركواز']
  ] as const;

  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:px-12 lg:pb-32">
        <ProductBreadcrumb product={product} />

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ddd2] sm:aspect-[5/4] lg:aspect-[4/5]">
              <ProductImage
                src="/images/bahja/elegant-clutch/05-elegant-clutch-wine-lifestyle.webp"
                alt="Elegant Clutch من بهجة في لقطة استخدام حقيقية"
                categorySlug={product.categorySlug}
                usage="detail"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <CommercePanel product={product} eyebrow="SIGNATURE PIECE · إليجانت كلاتش" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#241d19]/12 bg-[#eee5da]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs tracking-[0.14em] text-[#75665d]">الألوان الحقيقية</p>
              <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">أربع درجات، نفس القطعة.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#75665d] lg:col-span-4">
              الصور هنا للدرجات المتاحة في الـgallery الحالية، والاختيار النهائي يتأكد وقت الطلب.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {colorViews.map(([src, colorAr, colorEn]) => (
              <figure key={src}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e5dbd0]">
                  <ProductImage src={src} alt={`Elegant Clutch باللون ${colorAr}`} categorySlug={product.categorySlug} usage="detail" />
                </div>
                <figcaption className="pt-3">
                  <p className="text-sm font-medium">{colorAr}</p>
                  <p className="mt-1 text-[11px] text-[#817067]">{colorEn}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#eee5da] lg:col-span-7 lg:aspect-[5/4]">
            <ProductImage
              src="/images/bahja/elegant-clutch/04-elegant-clutch-navy-detail-closeup.webp"
              alt="تفاصيل Elegant Clutch الكحلي عن قرب"
              categorySlug={product.categorySlug}
              usage="detail"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
              <ProductImage
                src="/images/bahja/elegant-clutch/14-elegant-clutch-teal-detail-closeup.webp"
                alt="تفاصيل Elegant Clutch التركواز عن قرب"
                categorySlug={product.categorySlug}
                usage="detail"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#eee5da]">
              <ProductImage
                src="/images/bahja/elegant-clutch/06-elegant-clutch-three-colors.webp"
                alt="ثلاث درجات من Elegant Clutch معًا"
                categorySlug={product.categorySlug}
                usage="detail"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#241d19]/12 pt-10 sm:mt-24 sm:pt-14">
          <p className="text-xs tracking-[0.14em] text-[#75665d]">الحجم وطريقة الإمساك</p>
          <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">شوفيها في اليد.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {heldViews.map(([src, alt]) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-[#eee5da]">
                <ProductImage src={src} alt={alt} categorySlug={product.categorySlug} usage="detail" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-[#241d19]/12 pt-10 sm:mt-24 sm:pt-14">
          <p className="text-xs tracking-[0.14em] text-[#75665d]">من الداخل</p>
          <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">التشطيب مش من برّه بس.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {interiorViews.map(([src, alt]) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-[#eee5da]">
                <ProductImage src={src} alt={alt} categorySlug={product.categorySlug} usage="detail" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = publicProducts.find((item) => item.slug === slug);
  if (!product) return notFound();

  if (product.slug === 'elegant-clutch') {
    return <ElegantClutchPdp product={product} />;
  }

  const evidence = bagEvidence[product.slug];
  const detailImage = getPreferredProductImage(product, 'detail');
  const related = publicProducts
    .filter((item) => item.slug !== product.slug && item.categorySlug === product.categorySlug)
    .slice(0, 3);

  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:px-12 lg:pb-32">
        <ProductBreadcrumb product={product} />

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {evidence ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eee5da] sm:col-span-2 sm:aspect-[5/4]">
                  <ProductImage
                    src={product.image}
                    alt={product.arabicTitle}
                    categorySlug={product.categorySlug}
                    usage="detail"
                  />
                </div>

                <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
                  <ProductImage
                    src={evidence.angle}
                    alt={`${product.arabicTitle} من زاوية إضافية`}
                    categorySlug={product.categorySlug}
                    usage="detail"
                  />
                </div>

                <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
                  <ProductImage
                    src={detailImage}
                    alt={`${product.arabicTitle} — العرض الأساسي`}
                    categorySlug={product.categorySlug}
                    usage="detail"
                  />
                </div>

                <figure>
                  <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
                    <ProductImage
                      src={evidence.texture}
                      alt={`ملمس خيط ${product.arabicTitle}`}
                      categorySlug={product.categorySlug}
                      usage="detail"
                    />
                  </div>
                  <figcaption className="pt-3 text-xs text-[#75665d]">الخيط والملمس</figcaption>
                </figure>

                <figure>
                  <div className="relative aspect-square overflow-hidden bg-[#eee5da]">
                    <ProductImage
                      src={evidence.hardware}
                      alt={`تفاصيل السلسلة والتشطيب في ${product.arabicTitle}`}
                      categorySlug={product.categorySlug}
                      usage="detail"
                    />
                  </div>
                  <figcaption className="pt-3 text-xs text-[#75665d]">السلسلة والتشطيب</figcaption>
                </figure>
              </div>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eee5da] sm:aspect-[5/4] lg:aspect-[4/5]">
                <ProductImage
                  src={detailImage}
                  alt={product.arabicTitle}
                  categorySlug={product.categorySlug}
                  usage="detail"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <CommercePanel product={product} />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-[#241d19]/12">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div>
                <p className="text-xs tracking-[0.14em] text-[#75665d]">من نفس العالم</p>
                <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">قطع ممكن تعجبك كمان</h2>
              </div>
              <Link href="/shop" className="hidden border-b border-[#241d19] pb-1 text-sm sm:inline">الرجوع للمتجر</Link>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
              {related.map((item) => (
                <ShopProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
