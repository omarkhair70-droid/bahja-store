import Link from 'next/link';
import ProductImage from './ProductImage';

export default function CollectionCard({ title, arabicTitle, href, description, image, categorySlug }: { title: string; arabicTitle: string; href: string; description: string; image: string; categorySlug: string }) {
  return (
    <Link href={href} className="overflow-hidden rounded-3xl border border-bahja-beige bg-bahja-cream/70 shadow-soft transition hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] bg-bahja-cream">
        <ProductImage src={image} alt={title} categorySlug={categorySlug} usage="feature" />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-xl font-semibold text-bahja-brown">{arabicTitle || title}</h3>
        <p className="text-sm text-bahja-taupe">{description}</p>
        <p className="text-sm font-medium text-bahja-brown">تصفحي المجموعة</p>
      </div>
    </Link>
  );
}
