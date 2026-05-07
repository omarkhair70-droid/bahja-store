import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import ProductImage from '@/components/ProductImage';
import AddToBagButton from '@/components/AddToBagButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPreferredProductImage } from '@/content/bahja-media';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { getCollectionEnglish, getProductArabicTitle } from '@/lib/utils';

export default function BagProductCard({ product }: { product: Product }) {
  const src = getPreferredProductImage(product, 'card');
  return <article className="bahja-card flex h-full flex-col border-bahja-beige/60"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bahja-cream"><ProductImage src={src} alt={getProductArabicTitle(product.arabicTitle, product.title)} categorySlug={product.categorySlug} usage="card" /></div><div className="flex h-full flex-col space-y-2.5 p-3"><p className="text-xs text-bahja-taupe">{product.collection} <span className="text-[11px]">· {getCollectionEnglish(product.collectionSlug)}</span></p><h3 className="font-semibold">{getProductArabicTitle(product.arabicTitle, product.title)}</h3><p className="text-[11px] text-bahja-taupe">{product.title}</p><p className="min-h-[66px] rounded-xl bg-bahja-cream/70 px-3 py-2 text-xs leading-6 sm:text-sm">Small — 300 EGP<br />Medium — 400 EGP<br />Large — 470 EGP</p><div className="mt-auto grid gap-2"><AddToBagButton item={{ productSlug: product.slug,title: product.title,arabicTitle: product.arabicTitle,image: src,collection: product.collection,priceGuide: product.priceGuide}} selectedSize={'Medium'} className="bahja-btn-primary w-full" label="أضيفي إلى السلة" /><div className="grid grid-cols-2 gap-2 text-xs sm:text-sm"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(getProductArabicTitle(product.arabicTitle, product.title)))} className="w-full justify-center px-3 py-1.5 text-xs sm:text-sm">واتساب</WhatsAppButton><Link href={`/shop/${product.slug}`} className="inline-flex w-full items-center justify-center rounded-full border border-bahja-beige/70 bg-white/70 px-3 py-1.5 text-center text-bahja-brown">التفاصيل</Link></div></div></div></article>;
}
