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
    <section className="space-y-2 rounded border border-[#334255] bg-[var(--surface-2)] p-2.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#b6c7da]">
        {title}
      </h3>
      <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">{description}</p>
      {items.length > 0 ? (
        <ul className="space-y-1 border-t border-[#334255] pt-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-[11px] text-[#d5e0ec]">
              <span className="mt-1 h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
