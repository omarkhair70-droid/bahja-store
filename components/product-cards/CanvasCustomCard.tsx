import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function CanvasCustomCard({ product }: { product: Product }) {
  const src = getPreferredProductImage(product, 'card');
  return <article className="bahja-card flex h-full flex-col"><div className="rounded-2xl bg-[#f6efe6] p-2.5"><div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl border border-bahja-beige/70 bg-[#fbf6ef]"><ProductImage src={src} alt={product.arabicTitle ?? product.title} categorySlug={product.categorySlug} usage="card" className="p-0.5 sm:p-1" /></div></div><div className="space-y-2.5 p-3"><h3 className="font-semibold">لوحات كانفس حسب الطلب</h3><p className="text-xs text-bahja-taupe">Canvas Art</p><p className="text-xs text-bahja-taupe">حسب الطلب · Made to order</p><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry('اطلبي لوحة كانفس'))} className="w-full justify-center px-3 py-1.5">واتساب</WhatsAppButton><Link href={`/shop/${product.slug}`} className="inline-flex w-full items-center justify-center rounded-full border border-bahja-beige/70 bg-white/70 px-3 py-1.5 text-center text-bahja-brown">التفاصيل</Link></div></div></article>;
}
