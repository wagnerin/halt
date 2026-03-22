import Link from "next/link";

type NewsFeedItemCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  publishedLabel: string;
};

export function NewsFeedItemCard({
  slug,
  title,
  excerpt,
  publishedLabel,
}: NewsFeedItemCardProps) {
  return (
    <article className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <p className="text-[11px] text-[var(--text-muted)]">{publishedLabel}</p>
      <h3 className="mt-1 text-sm font-semibold leading-snug">
        <Link className="hover:text-[var(--accent)]" href={`/news/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{excerpt}</p>
    </article>
  );
}
