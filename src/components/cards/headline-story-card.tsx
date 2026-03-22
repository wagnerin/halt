import Link from "next/link";

type HeadlineStoryCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  publishedLabel: string;
  authorName?: string | null;
  tags: Array<{ slug: string; name: string }>;
};

export function HeadlineStoryCard({
  slug,
  title,
  excerpt,
  coverImage,
  publishedLabel,
  authorName,
  tags,
}: HeadlineStoryCardProps) {
  return (
    <article className="overflow-hidden rounded border border-[var(--border)] bg-[var(--surface-2)]">
      {coverImage ? (
        <div className="border-b border-[var(--border)]">
          <img src={coverImage} alt={title} className="h-56 w-full object-cover" />
        </div>
      ) : null}

      <div className="space-y-2 p-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          {publishedLabel}
          {authorName ? ` • ${authorName}` : ""}
        </p>
        <h3 className="text-lg font-semibold leading-tight">
          <Link className="hover:text-[var(--accent)]" href={`/news/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">{excerpt}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
