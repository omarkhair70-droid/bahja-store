import type { Product } from '@/content/bahja-products';
import BagProductCard from './product-cards/BagProductCard';
import AccessoryProductCard from './product-cards/AccessoryProductCard';
import CanvasCustomCard from './product-cards/CanvasCustomCard';

export default function ProductCard({ product }: { product: Product }) {
  const variant = product.cardVariant ?? 'bag';
  if (variant === 'accessory') return <AccessoryProductCard product={product} />;
  if (variant === 'canvas-custom') return <CanvasCustomCard product={product} />;
  return <BagProductCard product={product} />;
}
