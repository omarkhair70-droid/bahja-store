import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getMediaPolicy, shouldContainImage, type MediaUsage } from '@/content/bahja-media';

export default function ProductImage({ src, alt, categorySlug, usage, className }: { src: string; alt: string; categorySlug: string; usage: MediaUsage; className?: string; }) {
  const policy = getMediaPolicy(src);
  const contain = shouldContainImage(src, categorySlug, usage);
  const avoidLarge = policy.roles.includes('avoidLarge');
  const usageClass = contain ? 'object-contain p-3' : 'object-cover object-center';
  const detailSafe = usage === 'detail' && avoidLarge ? 'object-contain p-4 sm:p-6' : '';

  return <Image src={src} alt={alt} fill className={cn('bg-bahja-cream', usageClass, detailSafe, className)} />;
}
