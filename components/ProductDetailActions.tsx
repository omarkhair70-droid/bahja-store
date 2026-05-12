'use client';

import { useState } from 'react';
import { Product } from '@/content/bahja-products';
import { isBagProduct } from '@/lib/order-bag';
import ProductOptions from './ProductOptions';
import AddToBagButton from './AddToBagButton';
import WhatsAppButton from './WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function ProductDetailActions({ product }: { product: Product }) {
  const bag = isBagProduct(product.categorySlug) && product.cardVariant !== 'canvas-custom';
  const isCanvas = product.cardVariant === 'canvas-custom';
  const [size, setSize] = useState<'Small'|'Medium'|'Large'>('Medium');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  return (
    <div className="space-y-3">
      <ProductOptions isBag={bag} size={size} setSize={setSize} quantity={quantity} setQuantity={setQuantity} note={note} setNote={setNote} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {!isCanvas ? <AddToBagButton item={{ productSlug: product.slug, title: product.title, arabicTitle: product.arabicTitle, image: product.displayImage ?? product.image, collection: product.collection, priceGuide: product.priceGuide }} selectedSize={bag ? size : undefined} quantity={quantity} customNote={note} className="w-full rounded-full bg-bahja-brown px-5 py-3 text-sm text-white" label={bag ? 'أضيفي إلى السلة' : 'أضيفي الطلب'} /> : null}
        <WhatsAppButton href={getWhatsAppUrl(product.whatsappInquiryText ?? whatsappMessages.productInquiry(isCanvas ? 'اطلبي لوحة حسب الطلب' : (product.arabicTitle ?? product.title)))} className="w-full justify-center px-5 py-3">{isCanvas ? 'اطلبي عبر واتساب' : 'واتساب'}</WhatsAppButton>
      </div>
    </div>
  );
}
