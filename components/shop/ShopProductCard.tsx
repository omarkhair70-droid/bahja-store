import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function ShopProductCard({ product }: { product: Product }) {
  const src = getPreferredProductImage(product, 'card');
  const title = product.arabicTitle ?? product.title;
  const isBag = product.categorySlug === 'handmade-bags';

  return (
    <article className="group min-w-0">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#eee6dc]">
          <ProductImage
            src={src}
            alt={title}
            categorySlug={product.categorySlug}
            usage="card"
            className="motion-safe:transition motion-safe:duration-700 group-hover:scale-[1.012]"
          />
        </div>
      </Link>

      <div className="pt-3 sm:pt-4">
        <p className="text-[10px] leading-4 tracking-[0.08em] text-[#817067] sm:text-[11px]">
          {product.collectionAr}
        </p>

        <Link href={`/shop/${product.slug}`} className="mt-1 block">
          <h2 className="text-sm font-medium leading-5 text-[#241d19] sm:text-base sm:leading-6">
            {title}
          </h2>
        </Link>

        <p className="mt-1.5 min-h-[2.5rem] text-[11px] leading-5 text-[#75665d] sm:text-xs">
          {product.priceGuide}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-[#241d19]/10 pt-3 text-[11px] sm:text-xs">
          <Link href={`/shop/${product.slug}`} className="border-b border-[#241d19] pb-0.5">
            {isBag ? 'اختاري المقاس والتفاصيل' : 'عرض التفاصيل'}
          </Link>
          <WhatsAppButton
            href={getWhatsAppUrl(product.whatsappInquiryText ?? whatsappMessages.productInquiry(title))}
            className="!rounded-none !bg-transparent !px-0 !py-0 !text-[#75665d] !shadow-none hover:!opacity-100"
          >
            استفسار ↙
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
