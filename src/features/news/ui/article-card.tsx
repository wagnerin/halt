import Link from "next/link";

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
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>{formatPublishedDate(article.publishedAt)}</span>
        {article.authorName ? <span>• {article.authorName}</span> : null}
      </div>

      <h2 className="mb-2 text-base font-semibold leading-snug">
        <Link className="hover:text-[var(--accent)]" href={`/news/${article.slug}`}>
          {article.title}
        </Link>
      </h2>

      <p className="mb-3 text-sm text-[var(--text-muted)]">{article.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag.slug}
            className="rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}
