export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function displaySizeAr(size?: string) {
  if (size === 'Small') return 'صغير';
  if (size === 'Medium') return 'متوسط';
  if (size === 'Large') return 'كبير';
  return size ?? '';
}

export function formatArabicPriceGuide(text: string) {
  return text
    .replace('Small:', 'صغير:')
    .replace('Medium:', 'متوسط:')
    .replace('Large:', 'كبير:')
    .replace('Available by request', 'متاح حسب الطلب')
    .replaceAll('EGP', 'جنيه');
}

export function getProductArabicTitle(arabicTitle: string | undefined, englishTitle: string) {
  return arabicTitle ?? englishTitle;
}
