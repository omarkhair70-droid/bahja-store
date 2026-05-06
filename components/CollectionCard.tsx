import Link from 'next/link';
import ProductImage from './ProductImage';

export default function CollectionCard({ title, arabicTitle, href, description, image, categorySlug }: { title: string; arabicTitle: string; href: string; description: string; image: string; categorySlug: string }) {
  const isCanvas = categorySlug === 'canvas-art';

  return (
    <Link href={href} className="overflow-hidden rounded-3xl border border-bahja-beige bg-bahja-cream/70 shadow-soft transition hover:-translate-y-0.5">
      <div className={`relative bg-bahja-cream ${isCanvas ? 'h-[220px] p-3 sm:h-[250px]' : 'h-[210px] sm:h-[240px]'}`}>
        <ProductImage src={image} alt={title} categorySlug={categorySlug} usage="feature" className={isCanvas ? 'object-contain p-2' : ''} />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-bahja-brown sm:text-xl">{arabicTitle || title}</h3>
        <p className="text-sm text-bahja-taupe">{description}</p>
        <p className="text-sm font-medium text-bahja-brown">تصفحي المجموعة</p>
      </div>
    </Link>
  );
}
