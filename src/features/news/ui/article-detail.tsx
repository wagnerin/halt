import Link from "next/link";

import type { NewsDetail, RelatedNewsItem } from "../domain";
import { ArticleCard } from "./article-card";
import { RelatedContentPlaceholder } from "./related-content-placeholder";

type ArticleDetailProps = {
  article: NewsDetail;
  relatedNews: RelatedNewsItem[];
};

function formatPublishedDate(value: Date | null): string {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(value);
}

export function ArticleDetail({ article, relatedNews }: ArticleDetailProps) {
  return (
    <div className="space-y-4">
      <article className="rounded border border-[var(--border)] bg-[var(--surface)] p-4">
        <header className="mb-3 space-y-1">
          <p className="text-[11px] text-[var(--text-muted)]">
            {formatPublishedDate(article.publishedAt)}
            {article.authorName ? ` • ${article.authorName}` : ""}
          </p>
          <h1 className="text-xl font-semibold leading-tight">{article.title}</h1>
          <p className="text-xs text-[var(--text-muted)]">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag.slug}
                className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </header>

        {article.coverImage ? (
          <div className="mb-3 overflow-hidden rounded border border-[var(--border)]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-56 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          Related coverage
        </h2>
        {relatedNews.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)]">
            No related published articles yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {relatedNews.map((newsItem) => (
              <ArticleCard
                key={newsItem.id}
                article={{
                  ...newsItem,
                  authorName: null,
                  tags: [],
                }}
              />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <RelatedContentPlaceholder
          title="Related drivers"
          itemCount={article.relatedDrivers.length}
          description="Driver profile cards will appear here after the Drivers module UI is implemented."
        />
        <RelatedContentPlaceholder
          title="Related teams"
          itemCount={article.relatedTeams.length}
          description="Team profile cards will appear here after the Teams module UI is implemented."
        />
        <RelatedContentPlaceholder
          title="Related tournaments"
          itemCount={article.relatedTournaments.length}
          description="Tournament widgets will appear here after the Tournaments module UI is implemented."
        />
      </section>

      <Link className="inline-block text-xs text-[var(--accent)]" href="/news">
        ← Back to all news
      </Link>
    </div>
  );
}
