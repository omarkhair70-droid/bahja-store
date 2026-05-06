import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getImageTier } from '@/lib/image-policy';

type Usage = 'card' | 'hero' | 'detail' | 'feature' | 'thumb' | 'category';

export default function ProductImage({ src, alt, categorySlug, usage, className }: { src: string; alt: string; categorySlug: string; usage: Usage; className?: string; }) {
  const isCanvas = categorySlug === 'canvas-art';
  const tier = getImageTier(src);
  const shouldContain = isCanvas || tier === 'containOnly';
  const shouldPad = tier === 'cardOnly' || shouldContain;

  const byUsage = usage === 'hero'
    ? (shouldContain ? 'object-contain p-6' : 'object-cover object-center')
    : usage === 'thumb'
      ? 'object-cover object-center'
      : shouldContain
        ? 'object-contain p-4'
        : usage === 'detail'
          ? 'object-cover object-center'
          : 'object-cover object-center';

  return <Image src={src} alt={alt} fill className={cn('bg-bahja-cream', byUsage, shouldPad && usage !== 'hero' ? 'p-2' : '', className)} />;
}
