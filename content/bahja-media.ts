import type { Product } from './bahja-products';

export type MediaRole =
  | 'heroSafe'
  | 'featureSafe'
  | 'productCardSafe'
  | 'detailSafe'
  | 'thumbnailSafe'
  | 'containOnly'
  | 'cardOnly'
  | 'avoidLarge'
  | 'avoidFirst'
  | 'customOnly';

export type MediaUsage = 'hero' | 'feature' | 'card' | 'detail' | 'thumb' | 'category';

type MediaPolicy = { roles: MediaRole[] };

const mediaPolicies: Record<string, MediaPolicy> = {
  '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp': { roles: ['productCardSafe', 'cardOnly', 'avoidFirst', 'avoidLarge'] },
  '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp': { roles: ['containOnly', 'customOnly', 'avoidLarge', 'avoidFirst'] },
  '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp': { roles: ['heroSafe', 'featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp': { roles: ['heroSafe', 'featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/bags-chain-thread/chain-thread-bag-silver-grey-closeup-02.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/hair-accessories/satin-hair-accessories-ice-blue-03.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] },
  '/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp': { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] }
};

const usageRole: Record<MediaUsage, MediaRole> = {
  hero: 'heroSafe', feature: 'featureSafe', card: 'productCardSafe', detail: 'detailSafe', thumb: 'thumbnailSafe', category: 'featureSafe'
};

export function getMediaPolicy(src: string): MediaPolicy {
  return mediaPolicies[src] ?? { roles: ['featureSafe', 'productCardSafe', 'detailSafe', 'thumbnailSafe'] };
}

export function isAvoidFirstImage(src: string) { return getMediaPolicy(src).roles.includes('avoidFirst'); }
export function isLargePlacementSafe(src: string) { return !getMediaPolicy(src).roles.includes('avoidLarge'); }

export function shouldContainImage(src: string, categorySlug: string, usage: MediaUsage) {
  const roles = getMediaPolicy(src).roles;
  if (categorySlug === 'canvas-art') return true;
  if (roles.includes('containOnly')) return true;
  if (roles.includes('cardOnly') && usage === 'detail') return true;
  return false;
}

export function getPreferredProductImage(product: Product, usage: MediaUsage) {
  if (usage === 'detail') return product.detailImage ?? product.displayImage ?? product.image;
  const preferred = product.displayImage ?? product.image;
  const roles = getMediaPolicy(preferred).roles;
  if (!roles.includes(usageRole[usage]) && product.gallery?.length) {
    const match = product.gallery.find((img) => getMediaPolicy(img).roles.includes(usageRole[usage]) && !isAvoidFirstImage(img));
    if (match) return match;
  }
  return preferred;
}
