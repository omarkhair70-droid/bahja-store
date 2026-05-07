'use client';

import { useMemo, useState } from 'react';
import ProductImage from '@/components/ProductImage';

type Props = {
  detailImage: string;
  gallery?: string[];
  alt: string;
  categorySlug: string;
  isCanvas: boolean;
};

export default function ProductDetailGallery({ detailImage, gallery, alt, categorySlug, isCanvas }: Props) {
  const images = useMemo(() => {
    const ordered = [detailImage, ...(gallery ?? [])].filter(Boolean);
    return Array.from(new Set(ordered));
  }, [detailImage, gallery]);

  const [activeImage, setActiveImage] = useState(detailImage);

  return (
    <div className="space-y-3">
      <div className={`relative overflow-hidden rounded-3xl bg-bahja-cream ${isCanvas ? 'h-[300px] p-3 sm:h-[380px] sm:p-4' : 'h-[330px] sm:h-[460px]'}`}>
        <ProductImage src={activeImage} alt={alt} categorySlug={categorySlug} usage="detail" className="object-contain p-3 sm:p-4" />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-20 overflow-hidden rounded-2xl bg-bahja-cream ${activeImage === img ? 'ring-2 ring-bahja-brown/40' : 'ring-1 ring-black/5'}`}
              aria-label="Switch product image"
            >
              <ProductImage src={img} alt={alt} categorySlug={categorySlug} usage="thumb" className="object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
