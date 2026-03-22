type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
    </section>
  );
}
