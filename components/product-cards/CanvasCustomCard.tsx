import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { getProductArabicTitle } from '@/lib/utils';

export default function CanvasCustomCard({ product }: { product: Product }) {
  const src = getPreferredProductImage(product, 'card');
  return <article className="bahja-card flex h-full flex-col"><div className="rounded-2xl bg-bahja-cream/90 p-3"><div className="relative mx-auto aspect-[16/10] w-full max-w-[96%] overflow-hidden rounded-xl border border-bahja-beige/70 bg-[#f5eee6]"><ProductImage src={src} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" className="p-1" /></div></div><div className="space-y-2.5 p-3"><h3 className="font-semibold">{getProductArabicTitle(product.arabicTitle, product.title)}</h3><p className="text-xs text-bahja-taupe">Made to order · متاح حسب الطلب</p><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry('اطلبي لوحة حسب الطلب'))} className="w-full justify-center px-3 py-1.5">اطلبي لوحة حسب الطلب</WhatsAppButton><Link href={`/shop/${product.slug}`} className="inline-flex w-full items-center justify-center rounded-full border border-bahja-beige/70 bg-white/70 px-3 py-1.5 text-center text-bahja-brown">التفاصيل</Link></div></div></article>;
}
