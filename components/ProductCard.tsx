import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import AddToBagButton from './AddToBagButton';
import { isBagProduct } from '@/lib/order-bag';
import { formatArabicPriceGuide, getProductArabicTitle } from '@/lib/utils';
import ProductImage from './ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  const bag = isBagProduct(product.categorySlug);
  return (
    <article className="bahja-card flex h-full flex-col">
      <div className="relative h-[205px] sm:h-[220px] bg-bahja-cream"><ProductImage src={product.image} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" /></div>
      <div className="space-y-2 p-3">
        <p className="text-xs text-bahja-taupe">{product.collection}</p>
        <h3 className="font-semibold">{getProductArabicTitle(product.arabicTitle, product.title)}</h3>
        <p className="hidden text-[11px] text-bahja-taupe sm:block">{product.title}</p>
        <p className="rounded-xl bg-bahja-cream/80 px-3 py-1.5 text-sm">{formatArabicPriceGuide(product.priceGuide)}</p>
        <div className="mt-auto grid gap-2">
          <AddToBagButton item={{ productSlug: product.slug,title: product.title,arabicTitle: product.arabicTitle,image: product.image,collection: product.collection,priceGuide: formatArabicPriceGuide(product.priceGuide)}} selectedSize={bag ? 'Medium' : undefined} className="bahja-btn-primary w-full" label="أضف إلى السلة" />
          <div className="flex items-center justify-between gap-2 px-1 text-xs sm:text-sm">
            <Link href={`/shop/${product.slug}`} className="text-bahja-brown underline-offset-2 hover:underline">عرض التفاصيل</Link>
            <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(getProductArabicTitle(product.arabicTitle, product.title)))} className="px-3 py-1.5 text-xs sm:text-sm">واتساب</WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
