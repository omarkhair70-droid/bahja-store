export type BagSize = 'Small' | 'Medium' | 'Large';

export type OrderBagItem = {
  productSlug: string;
  title: string;
  arabicTitle?: string;
  image: string;
  collection: string;
  priceGuide: string;
  selectedSize?: BagSize;
  quantity: number;
  customNote?: string;
};

export const ORDER_BAG_STORAGE_KEY = 'bahja-order-bag-v1';

export const isBagProduct = (categorySlug: string) => categorySlug === 'handmade-bags';

export function makeItemKey(item: Pick<OrderBagItem, 'productSlug' | 'selectedSize'>) {
  return `${item.productSlug}::${item.selectedSize ?? 'nosize'}`;
}

export function buildOrderWhatsAppMessage(items: OrderBagItem[]) {
  const lines = [
    'Hello Bahja Store, I would like to order:',
    ''
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title}`);
    if (item.selectedSize) lines.push(`Size: ${item.selectedSize}`);
    lines.push(`Quantity: ${item.quantity}`);
    if (item.customNote?.trim()) lines.push(`Notes: ${item.customNote.trim()}`);
    lines.push('');
  });

  lines.push('Could you confirm availability, customization options, final price, and delivery details?');
  return lines.join('\n');
}
