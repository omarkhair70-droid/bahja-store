export type Product = {
  slug: string;
  title: string;
  arabicTitle?: string;
  collection: string;
  category: string;
  description: string;
  image: string;
  priceGuide: string;
};

export const collections = [
  { slug: 'himalayan-thread-bags', title: 'Himalayan Thread Bags', arabicTitle: 'شنط خيط الهيمالايا' },
  { slug: 'chain-thread-bags', title: 'Chain Thread Bags', arabicTitle: 'شنط خيوط السلسلة' },
  { slug: 'canvas-art', title: 'Canvas Art', arabicTitle: 'فن الكانفس' },
  { slug: 'hair-accessories', title: 'Hair Accessories', arabicTitle: 'اكسسوارات الشعر' }
];

export const products: Product[] = [
  { slug: 'arabic-calligraphy-floral-canvas', title: 'Arabic Calligraphy Floral Canvas', category: 'Canvas Art', collection: 'Canvas Art', description: 'A poetic canvas piece blending floral softness and Arabic calligraphy accents for warm, artistic spaces.', image: '/images/bahja/canvas-art/canvas-arabic-calligraphy-floral-01.webp', priceGuide: 'Available by request' },
  { slug: 'teal-himalayan-thread-bag', title: 'Teal Himalayan Thread Bag', category: 'Himalayan Thread Bags', collection: 'Himalayan Thread Bags', description: 'Handcrafted with rich thread texture, balanced chain finishing, and elegant everyday structure.', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-teal-gold-chain-01.webp', priceGuide: 'Small: 300 EGP • Medium: 400 EGP • Large: 470 EGP' },
  { slug: 'navy-himalayan-thread-bag', title: 'Navy Himalayan Thread Bag', category: 'Himalayan Thread Bags', collection: 'Himalayan Thread Bags', description: 'A deep navy handmade bag designed for refined styling and soft statement looks.', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-navy-lifestyle-02.webp', priceGuide: 'Small: 300 EGP • Medium: 400 EGP • Large: 470 EGP' },
  { slug: 'light-grey-himalayan-thread-bag', title: 'Light Grey Himalayan Thread Bag', category: 'Himalayan Thread Bags', collection: 'Himalayan Thread Bags', description: 'Understated and polished, with artisanal threadwork and thoughtful finishing touches.', image: '/images/bahja/bags-himalayan-thread/himalayan-thread-bag-light-grey-gold-chain-03.webp', priceGuide: 'Small: 300 EGP • Medium: 400 EGP • Large: 470 EGP' },
  { slug: 'soft-sage-chain-thread-bag', title: 'Soft Sage Chain Thread Bag', category: 'Chain Thread Bags', collection: 'Chain Thread Bags', description: 'A feminine sage-toned piece with layered thread detail and a modern chain silhouette.', image: '/images/bahja/bags-chain-thread/chain-thread-bag-soft-sage-lifestyle-01.webp', priceGuide: 'Small: 340 EGP • Medium: 450 EGP • Large: 590 EGP' },
  { slug: 'silver-grey-chain-thread-bag', title: 'Silver Grey Chain Thread Bag', category: 'Chain Thread Bags', collection: 'Chain Thread Bags', description: 'Soft shine and textured craftsmanship come together in this delicate statement bag.', image: '/images/bahja/bags-chain-thread/chain-thread-bag-silver-grey-closeup-02.webp', priceGuide: 'Small: 340 EGP • Medium: 450 EGP • Large: 590 EGP' },
  { slug: 'black-gold-chain-thread-bag', title: 'Black Gold Chain Thread Bag', category: 'Chain Thread Bags', collection: 'Chain Thread Bags', description: 'A bold handcrafted piece with golden accents and elevated boutique character.', image: '/images/bahja/bags-chain-thread/chain-thread-bag-black-gold-chain-03.webp', priceGuide: 'Small: 340 EGP • Medium: 450 EGP • Large: 590 EGP' },
  { slug: 'dusty-pink-satin-hair-accessories', title: 'Dusty Pink Satin Hair Accessories', category: 'Hair Accessories', collection: 'Hair Accessories', description: 'Delicate satin touches made to add softness and charm to everyday styling.', image: '/images/bahja/hair-accessories/satin-hair-accessories-dusty-pink-01.webp', priceGuide: 'Available by request' },
  { slug: 'ice-blue-satin-hair-accessories', title: 'Ice Blue Satin Hair Accessories', category: 'Hair Accessories', collection: 'Hair Accessories', description: 'Light and graceful handmade satin accents with an airy, polished finish.', image: '/images/bahja/hair-accessories/satin-hair-accessories-ice-blue-03.webp', priceGuide: 'Available by request' },
  { slug: 'royal-blue-satin-hair-accessories', title: 'Royal Blue Satin Hair Accessories', category: 'Hair Accessories', collection: 'Hair Accessories', description: 'A rich-toned accessory set that blends elegance with playful feminine detail.', image: '/images/bahja/hair-accessories/satin-hair-accessories-royal-blue-02.webp', priceGuide: 'Available by request' }
];
