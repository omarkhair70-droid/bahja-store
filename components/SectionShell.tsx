export default function SectionShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 section-space sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2 sm:mb-8">
        <h2 className="section-heading">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-bahja-taupe sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
