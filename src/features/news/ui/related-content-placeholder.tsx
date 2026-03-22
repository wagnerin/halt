type RelatedContentPlaceholderProps = {
  title: string;
  itemCount: number;
  description: string;
};

export function RelatedContentPlaceholder({
  title,
  itemCount,
  description,
}: RelatedContentPlaceholderProps) {
  return (
    <section className="rounded border border-[#324155] bg-[var(--surface)] p-2.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#b8c8da]">
        {title}
      </h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--text-muted)]">
        {description}
      </p>
      <p className="mt-1 border-t border-[var(--border)] pt-1.5 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        Related records connected in data: {itemCount}
      </p>
    </section>
  );
}
