import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import AddToBagButton from './AddToBagButton';
import { isBagProduct } from '@/lib/order-bag';

export default function ProductCard({ product }: { product: Product }) {
  const bagItem = { productSlug: product.slug, title: product.title, arabicTitle: product.arabicTitle, image: product.image, collection: product.collection, priceGuide: product.priceGuide };
  const bag = isBagProduct(product.categorySlug);

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-bahja-beige/70 bg-gradient-to-b from-white/90 to-bahja-cream/40 shadow-soft transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] bg-bahja-cream">
        <Image src={product.image} alt={product.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-bahja-taupe">{product.collection} <span className="ml-2 rounded-full bg-bahja-blush/40 px-2 py-0.5">Made to order</span></p>
        <h3 className="text-xl font-semibold leading-snug text-bahja-brown">{product.title}</h3>
        {product.arabicTitle && <p className="text-sm text-bahja-taupe">{product.arabicTitle}</p>}
        <p className="rounded-2xl bg-bahja-cream/80 px-3 py-2 text-sm text-bahja-brown">{product.priceGuide}</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <AddToBagButton item={bagItem} selectedSize={bag ? 'Medium' : undefined} className="flex-1 rounded-full bg-bahja-brown px-4 py-2 text-sm text-white sm:flex-none" label="أضف إلى السلة" />
          <Link href={`/shop/${product.slug}`} className="flex-1 rounded-full border border-bahja-taupe px-4 py-2 text-center text-sm text-bahja-brown sm:flex-none">عرض التفاصيل</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(product.title))} className="flex-1 px-4 py-2 text-sm sm:flex-none">استفسار واتساب</WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
