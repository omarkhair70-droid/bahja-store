'use client';

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

export default function AddToBagButton({ item, selectedSize, quantity = 1, customNote, className, label = 'Add to Order Bag' }: Props) {
  const { addItem } = useOrderBag();
  return (
    <button
      onClick={() => addItem({ ...item, selectedSize, quantity, customNote })}
      className={className ?? 'rounded-full bg-bahja-brown px-5 py-3 text-sm font-medium text-white'}
    >
      {label}
    </button>
  );
}
