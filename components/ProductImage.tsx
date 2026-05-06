import Image from 'next/image';
import { cn } from '@/lib/utils';

type Usage = 'card' | 'hero' | 'detail' | 'feature' | 'thumb' | 'category';

export default function ProductImage({ src, alt, categorySlug, usage, className }: { src: string; alt: string; categorySlug: string; usage: Usage; className?: string; }) {
  const isCanvas = categorySlug === 'canvas-art';
  const byUsage = usage === 'hero' ? 'object-cover object-center' : usage === 'thumb' ? 'object-cover object-center' : isCanvas ? 'object-contain p-3' : 'object-cover object-center';
  return <Image src={src} alt={alt} fill className={cn('bg-bahja-cream', byUsage, className)} />;
}
