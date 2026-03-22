type HomepagePlaceholderBlockProps = {
  title: string;
  description: string;
  items?: string[];
};

export function HomepagePlaceholderBlock({
  title,
  description,
  items = [],
}: HomepagePlaceholderBlockProps) {
  return (
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h3>
      <p className="text-xs text-[var(--text-muted)]">{description}</p>
      {items.length > 0 ? (
        <ul className="space-y-1 border-t border-[var(--border)] pt-2">
          {items.map((item) => (
            <li key={item} className="text-xs">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
