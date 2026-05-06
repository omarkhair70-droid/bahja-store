import Image from 'next/image';
import { cn } from '@/lib/utils';

type Usage = 'card' | 'hero' | 'detail' | 'feature' | 'thumb';

export default function ProductImage({
  src,
  alt,
  categorySlug,
  usage,
  className
}: {
  src: string;
  alt: string;
  categorySlug: string;
  usage: Usage;
  className?: string;
}) {
  const isCanvas = categorySlug === 'canvas-art';

  const fitClass = isCanvas
    ? 'object-contain p-3 bg-bahja-cream'
    : 'object-cover object-center';

  const sizingClass = usage === 'thumb' ? 'p-1' : '';

  return <Image src={src} alt={alt} fill className={cn(fitClass, sizingClass, className)} />;
}
