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
    <section className="space-y-5">
      <header className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h1 className="text-xl font-semibold">Latest News</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Daily sim racing coverage, editorial analysis, and roster movement updates.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--text-muted)]">
          No published articles found. Run the Prisma seed script in development.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
