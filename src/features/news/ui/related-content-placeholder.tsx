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
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Related records connected in data: {itemCount}
      </p>
    </section>
  );
}
