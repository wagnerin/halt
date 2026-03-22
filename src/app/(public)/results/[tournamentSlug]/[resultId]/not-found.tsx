import Link from "next/link";

export default function ResultSessionNotFound() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h1 className="text-lg font-semibold">Result session not found</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        The requested race session could not be found for this tournament.
      </p>
      <Link className="mt-4 inline-block text-sm text-[var(--accent)]" href="/results">
        Back to results
      </Link>
    </section>
  );
}
