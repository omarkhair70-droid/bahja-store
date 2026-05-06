import Link from 'next/link';

export default function CollectionCard({ title, arabicTitle, href, description }: { title: string; arabicTitle: string; href: string; description: string }) {
  return (
    <Link href={href} className="rounded-3xl border border-bahja-beige bg-bahja-cream/70 p-6 shadow-soft transition hover:-translate-y-0.5">
      <p className="text-sm text-bahja-taupe">{arabicTitle}</p>
      <h3 className="mt-1 text-xl font-semibold text-bahja-brown">{title}</h3>
      <p className="mt-2 text-sm text-bahja-taupe">{description}</p>
    </Link>
  );
}
