export type ImageTier = 'heroSafe' | 'featureSafe' | 'cardOnly' | 'containOnly';

const policyMap: Record<string, ImageTier> = {
  '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp': 'heroSafe',
  '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp': 'heroSafe',
  '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp': 'heroSafe',
  '/images/bahja/bags-chain-thread/chain-thread-bag-silver-grey-closeup-02.webp': 'featureSafe',
  '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp': 'featureSafe',
  '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp': 'cardOnly',
  '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp': 'containOnly'
};

export function getImageTier(src: string): ImageTier {
  return policyMap[src] ?? 'featureSafe';
}
