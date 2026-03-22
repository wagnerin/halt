type RelatedNewsPlaceholderProps = {
  relatedCount: number;
};

export function RelatedNewsPlaceholder({ relatedCount }: RelatedNewsPlaceholderProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-base font-semibold">Related news</h2>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Tournament-linked article cards will be rendered here after cross-module related
        news UI integration.
      </p>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        Related published articles connected in data: {relatedCount}
      </p>
    </section>
  );
}
