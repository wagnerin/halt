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
    <article className="overflow-hidden rounded border border-[#334255] bg-[var(--surface-2)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#4b5f78]">
      <div className="relative border-b border-[var(--border)] bg-black/20">
        <SafeCoverImage
          src={coverImage}
          alt={title}
          className="h-72 w-full object-cover"
          placeholderClassName="relative h-72 w-full overflow-hidden bg-gradient-to-br from-[#202a38] via-[#141d27] to-[#0d1117]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d]/95 via-[#07090d]/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] uppercase tracking-[0.09em] text-[#b5c4d5]">
            {publishedLabel}
            {authorName ? ` • ${authorName}` : ""}
          </p>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-white">
            <Link className="hover:text-[var(--accent)]" href={`/news/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#ced8e2]">{excerpt}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] bg-[#10151c] px-4 py-2.5">
        <span className="mr-2 text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
          Tags
        </span>
        {tags.length === 0
          ? (
            <span className="text-[11px] text-[var(--text-muted)]">No tags</span>
            )
          : tags.map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full border border-[#3c4b60] bg-[#1a2330] px-2 py-0.5 text-[10px] text-[#b2c3d6]"
              >
                #{tag.name}
              </span>
            ))}
      </div>
    </article>
  );
}
