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
    <article className="group rounded border border-[#334255] bg-[var(--surface-2)] p-2.5 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#4b5f78] hover:bg-[#202a36]">
      <p className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        {publishedLabel}
      </p>
      <h3 className="mt-1 text-[13px] font-semibold leading-snug text-[#eaf2fb]">
        <Link className="group-hover:text-[var(--accent)]" href={`/news/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">{excerpt}</p>
    </article>
  );
}
