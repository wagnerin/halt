import Link from "next/link";

import { SafeCoverImage } from "./safe-cover-image";

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
    <article className="overflow-hidden rounded border border-[var(--border)] bg-[var(--surface-2)] transition-colors hover:border-[#3a4a5d]">
      <div className="border-b border-[var(--border)] bg-black/20">
        <SafeCoverImage
          src={coverImage}
          alt={title}
          className="h-64 w-full object-cover"
          placeholderClassName="flex h-64 w-full items-center justify-center bg-gradient-to-br from-[#1d2530] to-[#0f1318] text-xs text-[var(--text-muted)]"
          placeholderLabel="No cover image"
        />
      </div>

      <div className="space-y-2 p-3">
        <p className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
          {publishedLabel}
          {authorName ? ` • ${authorName}` : ""}
        </p>
        <h3 className="text-xl font-semibold leading-tight tracking-tight">
          <Link className="hover:text-[var(--accent)]" href={`/news/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">{excerpt}</p>
        <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-2">
          {tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
