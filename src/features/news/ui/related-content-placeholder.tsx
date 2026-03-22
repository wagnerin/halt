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
    <section className="rounded border border-[var(--border)] bg-[var(--surface)] p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h3>
      <p className="mt-2 text-xs text-[var(--text-muted)]">{description}</p>
      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
        Related records connected in data: {itemCount}
      </p>
    </section>
  );
}
