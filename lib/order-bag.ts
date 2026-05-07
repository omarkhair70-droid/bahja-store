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

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabicNumber = (value: number) => String(value).replace(/\d/g, (d) => arabicDigits[Number(d)]);

export function buildOrderWhatsAppMessage(items: OrderBagItem[], customer?: { customerName?: string; customerPhone?: string; customerAddress?: string; extraNotes?: string; }) {
  const lines = ['طلب جديد من بهجة ستور', ''];
  items.forEach((item, index) => {
    lines.push(`${toArabicNumber(index + 1)}. ${item.arabicTitle ?? item.title}`);
    lines.push(`Product: ${item.title}`);
    if (item.selectedSize) lines.push(`Size: ${item.selectedSize}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Price guide: ${item.priceGuide}`);
    lines.push(`Notes: ${item.customNote?.trim() || '-'}`);
    lines.push('');
  });
  lines.push('Customer:');
  lines.push(`Name: ${customer?.customerName ?? ''}`);
  lines.push(`Phone: ${customer?.customerPhone ?? ''}`);
  lines.push(`Location: ${customer?.customerAddress ?? ''}`);
  lines.push(`Extra notes: ${customer?.extraNotes ?? ''}`);
  return lines.join('\n');
}
