import Link from "next/link";

import { SafeCoverImage } from "@/components/cards";

import type { NewsListItem } from "../domain";

type ArticleCardProps = {
  article: NewsListItem;
};

function formatPublishedDate(value: Date | null): string {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(value);
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded border border-[#324155] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#4e6380] hover:shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
      <div className="relative border-b border-[var(--border)]">
        <SafeCoverImage
          src={article.coverImage}
          alt={article.title}
          className="h-32 w-full object-cover"
          placeholderClassName="relative h-32 w-full overflow-hidden bg-gradient-to-br from-[#1f2a38] via-[#141b25] to-[#0d1117]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="space-y-2 p-3">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
          <span>{formatPublishedDate(article.publishedAt)}</span>
          {article.authorName ? <span>• {article.authorName}</span> : null}
        </div>

        <h2 className="text-[15px] font-semibold leading-snug text-[#ecf3fb]">
          <Link className="group-hover:text-[var(--accent)]" href={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h2>

        <p className="text-[12px] leading-relaxed text-[var(--text-muted)]">{article.excerpt}</p>

        {article.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-2">
            {article.tags.map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full border border-[#3a4a5d] bg-[#1a2330] px-2 py-0.5 text-[10px] text-[#b4c5d9]"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
