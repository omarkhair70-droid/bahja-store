import Image from 'next/image';
import Link from 'next/link';

export default function CollectionCard({ title, arabicTitle, href, description, image }: { title: string; arabicTitle: string; href: string; description: string; image: string }) {
  return (
    <Link href={href} className="overflow-hidden rounded-3xl border border-bahja-beige bg-bahja-cream/70 shadow-soft transition hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] bg-bahja-cream">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <p className="text-sm text-bahja-taupe">{arabicTitle}</p>
        <h3 className="mt-1 text-xl font-semibold text-bahja-brown">{title}</h3>
        <p className="mt-2 text-sm text-bahja-taupe">{description}</p>
      </div>
    </Link>
  );
}
