import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/content/bahja-products';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-bahja-beige bg-white/70 shadow-soft">
      <div className="relative aspect-[4/5] bg-bahja-cream">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-wide text-bahja-taupe">{product.collection}</p>
        <h3 className="text-xl font-semibold text-bahja-brown">{product.title}</h3>
        {product.arabicTitle && <p className="text-sm text-bahja-taupe">{product.arabicTitle}</p>}
        <p className="text-sm text-bahja-taupe">{product.priceGuide}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/shop/${product.slug}`} className="rounded-full border border-bahja-taupe px-4 py-2 text-sm text-bahja-brown">View Details</Link>
          <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(product.title))} className="px-4 py-2 text-sm">Ask on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
