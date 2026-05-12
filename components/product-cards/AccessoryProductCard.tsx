import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import ProductImage from '@/components/ProductImage';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { getProductArabicTitle } from '@/lib/utils';

export default function AccessoryProductCard({ product }: { product: Product }) {
  const src = getPreferredProductImage(product, 'card');
  const supportText = product.slug === 'elegant-clutch'
    ? 'بوك يد / كلاتش أنيق بطابع محفظة صغيرة'
    : 'حسب الطلب · قطعة مصنوعة بعناية';
  return <article className="bahja-card flex h-full flex-col border-bahja-beige/50 bg-white/80"><div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-bahja-cream/60"><ProductImage src={src} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" /></div><div className="space-y-2 p-3"><h3 className="font-medium">{getProductArabicTitle(product.arabicTitle, product.title)}</h3><p className="text-[11px] text-bahja-taupe">{product.title}</p><p className="text-xs text-bahja-taupe">{supportText}</p><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><WhatsAppButton href={getWhatsAppUrl(product.whatsappInquiryText ?? whatsappMessages.productInquiry(getProductArabicTitle(product.arabicTitle, product.title)))} className="w-full justify-center px-3 py-1.5">واتساب</WhatsAppButton><Link href={`/shop/${product.slug}`} className="inline-flex w-full items-center justify-center rounded-full border border-bahja-beige/70 bg-white/70 px-3 py-1.5 text-center text-bahja-brown">التفاصيل</Link></div></div></article>;
}
