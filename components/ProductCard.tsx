import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import AddToBagButton from './AddToBagButton';
import { isBagProduct } from '@/lib/order-bag';
import { formatBilingualPriceGuide, getCollectionEnglish, getProductArabicTitle } from '@/lib/utils';
import ProductImage from './ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  const bag = isBagProduct(product.categorySlug);
  return (
    <article className="bahja-card flex h-full flex-col border-bahja-beige/60">
      <div className="relative h-[220px] bg-bahja-cream"><ProductImage src={product.image} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" /></div>
      <div className="space-y-2.5 p-3">
        <p className="text-xs text-bahja-taupe">{product.collection} <span className="text-[11px]">· {getCollectionEnglish(product.collectionSlug)}</span></p>
        <h3 className="font-semibold">{getProductArabicTitle(product.arabicTitle, product.title)}</h3>
        <p className="text-[11px] text-bahja-taupe">{product.title}</p>
        <p className="rounded-xl bg-bahja-cream/70 px-3 py-2 text-xs leading-6 sm:text-sm">{formatBilingualPriceGuide(product.priceGuide)}</p>
        <div className="mt-auto grid gap-2">
          <AddToBagButton item={{ productSlug: product.slug,title: product.title,arabicTitle: product.arabicTitle,image: product.image,collection: product.collection,priceGuide: formatBilingualPriceGuide(product.priceGuide)}} selectedSize={bag ? 'Medium' : undefined} className="bahja-btn-primary w-full" label="أضيفي إلى السلة" />
          <div className="flex items-center justify-between gap-2 px-1 text-xs sm:text-sm">
            <Link href={`/shop/${product.slug}`} className="text-bahja-brown underline-offset-2 hover:underline">التفاصيل</Link>
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(getProductArabicTitle(product.arabicTitle, product.title)))} className="px-3 py-1.5 text-xs sm:text-sm">واتساب</WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
