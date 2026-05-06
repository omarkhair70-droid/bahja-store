export default function SectionShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-bahja-brown sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-3xl text-bahja-taupe">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
