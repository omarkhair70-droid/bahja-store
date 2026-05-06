'use client';

import { useState } from 'react';
import { Product } from '@/content/bahja-products';
import { isBagProduct } from '@/lib/order-bag';
import ProductOptions from './ProductOptions';
import AddToBagButton from './AddToBagButton';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function ProductDetailActions({ product }: { product: Product }) {
  const bag = isBagProduct(product.categorySlug);
  const [size, setSize] = useState<'Small'|'Medium'|'Large'>('Medium');
  const [quantity, setالكمية] = useState(1);
  const [note, setNote] = useState('');

  return (
    <div className="space-y-4">
      <ProductOptions isBag={bag} size={size} setSize={setSize} quantity={quantity} setالكمية={setالكمية} note={note} setNote={setNote} />
      <div className="flex flex-wrap gap-3">
        <AddToBagButton item={{ productSlug: product.slug, title: product.title, arabicTitle: product.arabicTitle, image: product.image, collection: product.collection, priceGuide: product.priceGuide }} selectedSize={bag ? size : undefined} quantity={quantity} customNote={note} className="rounded-full bg-bahja-brown px-5 py-3 text-sm text-white" />
        <WhatsAppButton href={getWhatsAppUrl(whatsappMessages.productInquiry(product.title))} className="px-5 py-3">استفسار عبر واتساب</WhatsAppButton>
      </div>
    </div>
  );
}
