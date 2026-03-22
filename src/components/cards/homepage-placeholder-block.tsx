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
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface-2)] p-2.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h3>
      <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">{description}</p>
      {items.length > 0 ? (
        <ul className="space-y-1 border-t border-[var(--border)] pt-1.5">
          {items.map((item) => (
            <li key={item} className="text-[11px]">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
