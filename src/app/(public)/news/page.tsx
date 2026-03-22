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
    <section className="space-y-3">
      <header className="rounded border border-[#334255] bg-gradient-to-b from-[var(--surface)] to-[#11161d] p-3 shadow-[0_8px_22px_rgba(0,0,0,0.22)]">
        <h1 className="text-xl font-extrabold uppercase tracking-[0.08em]">Latest News</h1>
        <p className="mt-1 text-[11px] text-[var(--text-muted)]">
          Dense editorial feed for daily sim racing coverage, analysis, and roster movement.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-3 text-[11px] text-[var(--text-muted)]">
          No mock articles available.
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
