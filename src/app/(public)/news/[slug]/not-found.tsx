import Link from "next/link";

export default function NewsArticleNotFound() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h1 className="text-lg font-semibold">Article not found</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        The requested article does not exist or is not published.
      </p>
      <Link className="mt-4 inline-block text-sm text-[var(--accent)]" href="/news">
        Back to news
      </Link>
    </section>
  );
}
