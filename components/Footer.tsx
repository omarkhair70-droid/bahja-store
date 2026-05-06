import { site } from '@/content/site';

export default function Footer() {
  return <footer className="mt-16 border-t border-bahja-beige/70 bg-gradient-to-b from-[#f9ede6] to-[#f3dfd6]"><div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 text-sm text-bahja-brown sm:px-6 md:grid-cols-2 lg:px-8"><div className="space-y-2"><p className="text-lg">{site.name} / {site.arabicName}</p><p className="text-bahja-taupe">{site.tagline}</p><p className="text-bahja-taupe">{site.arabicTagline}</p><p className="text-xs text-bahja-taupe">Tell us your mood, color, and story — we stitch the rest.</p></div><div className="space-y-2 md:text-right"><p>WhatsApp: {site.phone}</p><p className="text-bahja-taupe">{site.locationEn} • {site.locationAr}</p><p className="text-xs text-bahja-taupe">Warm handmade atelier pieces, made to order with care.</p></div></div></footer>;
}
