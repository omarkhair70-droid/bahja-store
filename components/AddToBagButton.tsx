'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useOrderBag } from './OrderBagProvider';
import { BagSize } from '@/lib/order-bag';

type Props = {
  item: {
    productSlug: string;
    title: string;
    arabicTitle?: string;
    image: string;
    collection: string;
    priceGuide: string;
  };
  selectedSize?: BagSize;
  quantity?: number;
  customNote?: string;
  className?: string;
  label?: string;
};

export default function AddToBagButton({ item, selectedSize, quantity = 1, customNote, className, label = 'أضف إلى السلة' }: Props) {
  const { addItem } = useOrderBag();
  const [added, setAdded] = useState(false);
  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          addItem({ ...item, selectedSize, quantity, customNote });
          setAdded(true);
          setTimeout(() => setAdded(false), 2200);
        }}
        className={className ?? 'rounded-full bg-bahja-brown px-5 py-3 text-sm font-medium text-white'}
      >
        {label}
      </button>
      {added && <p className="text-xs text-bahja-brown">تمت إضافة القطعة إلى السلة — <Link href="/cart" className="underline">عرض السلة</Link></p>}
    </div>
  );
}
