export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function displaySizeAr(size?: string) {
  if (size === 'Small') return 'صغير';
  if (size === 'Medium') return 'متوسط';
  if (size === 'Large') return 'كبير';
  return size ?? '';
}

export function displaySizeBilingual(size?: string) {
  if (!size) return '';
  return `${size} / ${displaySizeAr(size)}`;
}

export function formatBilingualPriceGuide(text: string) {
  return text
    .replaceAll('صغير:', 'Small —')
    .replaceAll('متوسط:', 'Medium —')
    .replaceAll('كبير:', 'Large —')
    .replaceAll('جنيه', 'EGP')
    .replace('متاح حسب الطلب', 'Made to order');
}

export function getCollectionLabel(collectionSlug: string) {
  if (collectionSlug === 'himalayan-thread-bags') return 'شنط خيط الهيمالايا';
  if (collectionSlug === 'chain-thread-bags') return 'شنط خيوط السلسلة';
  if (collectionSlug === 'elegant-clutch') return 'إليجانت كلاتش';
  if (collectionSlug === 'hair-accessories') return 'إكسسوارات شعر يدوية';
  if (collectionSlug === 'canvas-art') return 'لوحات كانفس';
  return '';
}

export function getCollectionEnglish(collectionSlug: string) {
  if (collectionSlug === 'himalayan-thread-bags') return 'Himalayan Thread Bags';
  if (collectionSlug === 'chain-thread-bags') return 'Chain Thread Bags';
  if (collectionSlug === 'elegant-clutch') return 'Elegant Clutch';
  if (collectionSlug === 'hair-accessories') return 'Hair Accessories';
  if (collectionSlug === 'canvas-art') return 'Canvas Art';
  return '';
}

export function getProductArabicTitle(arabicTitle: string | undefined, englishTitle: string) {
  return arabicTitle ?? englishTitle;
}
