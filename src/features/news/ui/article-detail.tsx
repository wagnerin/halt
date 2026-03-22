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
    <div className="space-y-6">
      <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <header className="mb-4 space-y-2">
          <p className="text-xs text-[var(--text-muted)]">
            {formatPublishedDate(article.publishedAt)}
            {article.authorName ? ` • ${article.authorName}` : ""}
          </p>
          <h1 className="text-2xl font-semibold">{article.title}</h1>
          <p className="text-sm text-[var(--text-muted)]">{article.excerpt}</p>
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
        </header>

        {article.coverImage ? (
          <div className="mb-4 overflow-hidden rounded border border-[var(--border)]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-64 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="prose prose-invert max-w-none text-sm">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Related coverage</h2>
        {relatedNews.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No related published articles yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="grid gap-4 md:grid-cols-3">
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

      <Link className="inline-block text-sm text-[var(--accent)]" href="/news">
        ← Back to all news
      </Link>
    </div>
  );
}
