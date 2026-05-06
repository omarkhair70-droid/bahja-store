export default function Footer() {
  return (
    <footer className="mt-16 border-t border-bahja-beige/70 bg-bahja-cream/70">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 text-sm text-bahja-brown sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-2">
          <p className="text-lg font-semibold">بهجة ستور</p>
          <p className="text-bahja-taupe">للغُرز حكايا… وهنا لكل غرزة حكاية</p>
        </div>
        <div className="space-y-2 md:text-right">
          <p>واتساب</p>
          <p className="text-bahja-taupe">المقطم – الهضبة الوسطى، القاهرة، مصر</p>
        </div>
      </div>
    </footer>
  );
}
