import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-bahja-beige/70 bg-bahja-cream/70">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 text-sm text-bahja-brown sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-2">
          <p className="font-medium">{site.arabicName} / {site.name}</p>
          <p className="text-bahja-taupe">بهجة ستور</p>
          <p className="text-bahja-taupe">{site.arabicTagline}</p>
        </div>
        <div className="space-y-2 md:text-right">
          <p>{site.phone}</p>
          <p className="text-bahja-taupe">{site.locationAr}</p>
          <p className="text-xs text-bahja-taupe">متجر هاند ميد بطلبات عبر واتساب ولمسة فنية دافئة.</p>
        </div>
      </div>
    </footer>
  );
}
