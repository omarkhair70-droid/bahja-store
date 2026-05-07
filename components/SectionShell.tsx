export default function SectionShell({ title, subtitle, label, className = '', children }: { title: string; subtitle?: string; label?: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 section-space sm:px-6 lg:px-8 ${className}`}>
      <div className="mb-6 space-y-2 sm:mb-8">
        {label ? <p className="text-xs tracking-[0.14em] text-bahja-taupe">{label}</p> : null}
        <h2 className="section-heading">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-bahja-taupe sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
