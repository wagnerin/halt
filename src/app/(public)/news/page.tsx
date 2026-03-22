import type { Metadata } from "next";

import { getNewsList } from "@/features/news/domain";
import { ArticleCard } from "@/features/news/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Latest sim racing news, analysis, and roster updates.",
};

export default async function NewsListPage() {
  const articles = await getNewsList();

  return (
    <section className="space-y-4">
      <header className="rounded border border-[var(--border)] bg-[var(--surface)] p-4">
        <h1 className="text-lg font-semibold uppercase tracking-wide">Latest News</h1>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Dense editorial feed for daily sim racing coverage, analysis, and roster movement.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--text-muted)]">
          No mock articles available.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
