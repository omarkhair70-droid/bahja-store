import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-bahja-beige bg-bahja-cream/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-bahja-brown sm:px-6 lg:px-8">
        <p className="font-medium">{site.name} / {site.arabicName}</p>
        <p>{site.tagline}</p>
        <p>{site.phone} • {site.locationEn}</p>
      </div>
    </footer>
  );
}
