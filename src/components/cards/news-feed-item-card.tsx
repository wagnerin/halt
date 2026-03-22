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
    <article className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-2.5 transition-colors hover:border-[#3a4a5d] hover:bg-[#1e2631]">
      <p className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        {publishedLabel}
      </p>
      <h3 className="mt-1 text-[13px] font-semibold leading-snug">
        <Link className="hover:text-[var(--accent)]" href={`/news/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">{excerpt}</p>
    </article>
  );
}
