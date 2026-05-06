import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import AddToBagButton from './AddToBagButton';
import { isBagProduct } from '@/lib/order-bag';
import { getProductArabicTitle } from '@/lib/utils';
import ProductImage from './ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  const bag = isBagProduct(product.categorySlug);
  const bagItem = {
    productSlug: product.slug,
    title: product.title,
    arabicTitle: product.arabicTitle,
    image: product.image,
    collection: product.collection,
    priceGuide: product.priceGuide
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-bahja-beige/70 bg-white/85 shadow-soft">
      <div className="relative aspect-[4/5] bg-bahja-cream">
        <ProductImage src={product.image} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" />
      </div>
      <div className="space-y-3 p-4">
        <p className="text-xs text-bahja-taupe">{product.collection}</p>
        <h3 className="text-lg font-semibold text-bahja-brown">{getProductArabicTitle(product.arabicTitle, product.title)}</h3>
        <p className="text-xs text-bahja-taupe">{product.title}</p>
        <p className="rounded-2xl bg-bahja-cream/80 px-3 py-2 text-sm text-bahja-brown">{product.priceGuide}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <AddToBagButton item={bagItem} selectedSize={bag ? 'Medium' : undefined} className="rounded-full bg-bahja-brown px-3 py-2 text-xs text-white sm:text-sm" label="أضف إلى السلة" />
          <Link href={`/shop/${product.slug}`} className="rounded-full border border-bahja-taupe px-3 py-2 text-center text-xs text-bahja-brown sm:text-sm">عرض التفاصيل</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(getProductArabicTitle(product.arabicTitle, product.title)))} className="px-3 py-2 text-xs sm:text-sm">استفسار واتساب</WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
