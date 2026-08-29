import Link from 'next/link';
import type { Metadata } from 'next';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { publicProducts } from '@/content/bahja-products';

type ShopSearchParams = { category?: string | string[]; collection?: string | string[] };

const FILTERS = [
  { label: 'كل القطع', href: '/shop', type: 'all', value: '' },
  { label: 'الشنط', href: '/shop?category=handmade-bags', type: 'category', value: 'handmade-bags' },
  { label: 'خيط الهيمالايا', href: '/shop?collection=himalayan-thread-bags', type: 'collection', value: 'himalayan-thread-bags' },
  { label: 'خيوط السلسلة', href: '/shop?collection=chain-thread-bags', type: 'collection', value: 'chain-thread-bags' },
  { label: 'إليجانت كلاتش', href: '/shop?collection=elegant-clutch', type: 'collection', value: 'elegant-clutch' },
  { label: 'الإكسسوارات', href: '/shop?category=hair-accessories', type: 'category', value: 'hair-accessories' },
  { label: 'الكانفس', href: '/shop?category=canvas-art', type: 'category', value: 'canvas-art' }
] as const;

const COLLECTION_COPY: Record<string, { eyebrow: string; title: string; description: string }> = {
  'himalayan-thread-bags': {
    eyebrow: 'خيط الهيمالايا',
    title: 'شنط بخامة أهدأ وحضور يومي',
    description: 'اختاري اللون والحجم المناسبين، والتفاصيل النهائية تتأكد حسب المتاح قبل التنفيذ.'
  },
  'chain-thread-bags': {
    eyebrow: 'خيوط السلسلة',
    title: 'تفاصيل أوضح ولمعة محسوبة',
    description: 'مجموعة بخيوط السلسلة وتفاصيل معدنية مختلفة، مع مقاسات وخيارات تُراجع قبل الطلب.'
  },
  'elegant-clutch': {
    eyebrow: 'Elegant Clutch',
    title: 'أربع درجات، قطعة واحدة بحضور واضح',
    description: 'شاهدي الألوان الحقيقية للكلاتش ثم افتحي صفحة القطعة للتفاصيل والصور الداخلية وطريقة الإمساك.'
  },
  'hair-accessories': {
    eyebrow: 'تفاصيل أصغر',
    title: 'إكسسوارات شعر يدوية',
    description: 'قطع ساتان خفيفة تُعرض بالألوان المتاحة ويُؤكد الطلب عبر واتساب.'
  },
  'canvas-art': {
    eyebrow: 'حسب الطلب',
    title: 'لوحات كانفس',
    description: 'الأعمال المتاحة للمراجعة تظهر هنا فقط عندما تكون جاهزة للعرض العام.'
  }
};

export const metadata: Metadata = {
  title: 'المتجر | بهجة ستور',
  description: 'تصفحي شنط بهجة الهاند ميد، Elegant Clutch، الإكسسوارات والقطع المتاحة للطلب.'
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedCollection = Array.isArray(params.collection) ? params.collection[0] : params.collection;

  const filteredProducts = publicProducts.filter((product) =>
    selectedCollection
      ? product.collectionSlug === selectedCollection
      : selectedCategory
        ? product.categorySlug === selectedCategory
        : true
  );

  const active = FILTERS.find((filter) =>
    selectedCollection
      ? filter.type === 'collection' && filter.value === selectedCollection
      : selectedCategory
        ? filter.type === 'category' && filter.value === selectedCategory
        : filter.type === 'all'
  );

  const categoryCopy = selectedCategory === 'handmade-bags'
    ? {
        eyebrow: 'الشنط',
        title: 'كل شنط بهجة في مكان واحد',
        description: 'قارني بين الخامات والألوان، وبعد اختيار القطعة افتحي التفاصيل لتحديد المقاس والطلب.'
      }
    : selectedCategory
      ? COLLECTION_COPY[selectedCategory]
      : undefined;

  const currentCopy = selectedCollection
    ? COLLECTION_COPY[selectedCollection]
    : categoryCopy;

  const elegantClutchVariants = [
    { colorAr: 'كحلي', colorEn: 'Navy', image: '/images/bahja/elegant-clutch/01-elegant-clutch-navy-front.webp', message: 'مرحبًا، أريد الاستفسار عن Elegant Clutch باللون الكحلي.' },
    { colorAr: 'أسود', colorEn: 'Black', image: '/images/bahja/elegant-clutch/02-elegant-clutch-black-front.webp', message: 'مرحبًا، أريد الاستفسار عن Elegant Clutch باللون الأسود.' },
    { colorAr: 'نبيتي', colorEn: 'Wine', image: '/images/bahja/elegant-clutch/03-elegant-clutch-wine-front.webp', message: 'مرحبًا، أريد الاستفسار عن Elegant Clutch باللون النبيتي.' },
    { colorAr: 'تركواز', colorEn: 'Teal', image: '/images/bahja/elegant-clutch/13-elegant-clutch-teal-front.webp', message: 'مرحبًا، أريد الاستفسار عن Elegant Clutch باللون التركواز.' }
  ] as const;

  const isElegantClutchCollection = selectedCollection === 'elegant-clutch';

  return (
    <main className="bg-[#f8f4ed] text-[#241d19]">
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid gap-8 border-b border-[#241d19]/15 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">
              {currentCopy?.eyebrow ?? 'اختاري حكايتك'}
            </p>
            <h1 className="mt-3 max-w-[12ch] text-5xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              {currentCopy?.title ?? 'المتجر'}
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-md text-sm leading-7 text-[#75665d]">
              {currentCopy?.description ?? 'قطع هاند ميد وصور حقيقية للمنتجات. اختاري المجموعة المناسبة ثم افتحي القطعة للتفاصيل والمقاسات والطلب.'}
            </p>
            <p className="mt-4 text-xs text-[#8a786d]">
              {isElegantClutchCollection ? elegantClutchVariants.length : filteredProducts.length} قطع معروضة
            </p>
          </div>
        </div>

        <nav
          aria-label="فلترة المتجر"
          className="-mx-1 flex gap-6 overflow-x-auto border-b border-[#241d19]/15 px-1 py-5 text-sm whitespace-nowrap [direction:rtl] [&::-webkit-scrollbar]:hidden sm:gap-8"
        >
          {FILTERS.map((filter) => {
            const isActive = active?.label === filter.label;
            return (
              <Link
                key={filter.label}
                href={filter.href}
                className={`shrink-0 border-b pb-1 transition ${isActive ? 'border-[#241d19] font-medium text-[#241d19]' : 'border-transparent text-[#7b6a60] hover:border-[#7b6a60]'}`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-36">
        {isElegantClutchCollection ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
            {elegantClutchVariants.map((variant) => (
              <article key={variant.colorEn} className="group min-w-0">
                <Link href="/shop/elegant-clutch" className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#eee6dc]">
                    <ProductImage
                      src={variant.image}
                      alt={`إليجانت كلاتش باللون ${variant.colorAr}`}
                      categorySlug="clutch-wallet-pieces"
                      usage="card"
                      className="motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.012]"
                    />
                  </div>
                </Link>

                <div className="pt-3 sm:pt-4">
                  <p className="text-[10px] tracking-[0.08em] text-[#817067] sm:text-[11px]">Elegant Clutch</p>
                  <Link href="/shop/elegant-clutch" className="mt-1 block">
                    <h2 className="text-sm font-medium sm:text-base">إليجانت كلاتش · {variant.colorAr}</h2>
                  </Link>
                  <p className="mt-1.5 text-[11px] leading-5 text-[#75665d] sm:text-xs">{variant.colorEn} · استفسري عن السعر عبر واتساب</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#241d19]/10 pt-3 text-[11px] sm:text-xs">
                    <Link href="/shop/elegant-clutch" className="border-b border-[#241d19] pb-0.5">عرض التفاصيل</Link>
                    <WhatsAppButton
                      href={getWhatsAppUrl(variant.message)}
                      className="!rounded-none !bg-transparent !px-0 !py-0 !text-[#75665d] !shadow-none hover:!opacity-100"
                    >
                      استفسار ↙
                    </WhatsAppButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16">
            {filteredProducts.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="border-y border-[#241d19]/15 py-20 text-center">
            <p className="text-sm text-[#75665d]">لا توجد قطع عامة في هذا القسم حاليًا.</p>
            <Link href="/shop" className="mt-5 inline-block border-b border-[#241d19] pb-1 text-sm">ارجعي لكل القطع</Link>
          </div>
        )}

        <div className="mt-20 grid gap-8 border-t border-[#241d19]/15 pt-10 sm:mt-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] text-[#75665d]">مش لاقية اللون أو المقاس؟</p>
            <h2 className="mt-2 max-w-[13ch] text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
              خلي القطعة أقرب لتفاصيلك.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-sm leading-7 text-[#75665d]">
              ابدئي طلبًا خاصًا ونراجع معكِ المقاس واللون والخيط والسلسلة أو التفاصيل المتاحة قبل تأكيد الطلب.
            </p>
            <Link href="/custom-orders" className="mt-5 inline-block border-b border-[#241d19] pb-1 text-sm font-medium">
              ابدئي طلبًا خاصًا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
