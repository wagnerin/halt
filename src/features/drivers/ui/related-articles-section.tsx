import { ArticleCard } from "@/features/news/ui";

import type { DriverRelatedArticle } from "../domain";

type RelatedArticlesSectionProps = {
  articles: DriverRelatedArticle[];
};

export function RelatedArticlesSection({ articles }: RelatedArticlesSectionProps) {
  return (
    <section className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-base font-semibold">Related articles</h2>

      {articles.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">
          No published related articles yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
