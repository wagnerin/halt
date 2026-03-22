import Link from "next/link";

import { SafeCoverImage } from "@/components/cards";

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
    <div className="space-y-3">
      <article className="rounded border border-[#334255] bg-[var(--surface)] shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
        <div className="relative border-b border-[var(--border)]">
          <SafeCoverImage
            src={article.coverImage}
            alt={article.title}
            className="h-72 w-full object-cover"
            placeholderClassName="relative h-72 w-full overflow-hidden bg-gradient-to-br from-[#1f2a38] via-[#151d28] to-[#0d1117]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090d]/95 via-[#07090d]/45 to-transparent" />
          <header className="absolute inset-x-0 bottom-0 space-y-2 p-4">
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#b7c7d9]">
              {formatPublishedDate(article.publishedAt)}
              {article.authorName ? ` • ${article.authorName}` : ""}
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white">
              {article.title}
            </h1>
            <p className="max-w-3xl text-[13px] leading-relaxed text-[#d3deea]">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full border border-[#4a5d75] bg-[#1c2633] px-2 py-0.5 text-[10px] text-[#bdd0e3]"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </header>
        </div>

        <div className="border-t border-[var(--border)] px-4 py-5">
          <div className="prose prose-invert mx-auto max-w-3xl text-[15px] leading-7">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="space-y-2 rounded border border-[#324155] bg-[var(--surface)] p-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b8c8da]">
          Related coverage
        </h2>
        {relatedNews.length === 0 ? (
          <p className="text-[11px] text-[var(--text-muted)]">
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

      <Link className="inline-block text-[11px] font-medium text-[var(--accent)]" href="/news">
        ← Back to all news
      </Link>
    </div>
  );
}
