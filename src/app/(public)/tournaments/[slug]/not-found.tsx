import Link from "next/link";

export default function TournamentNotFound() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h1 className="text-lg font-semibold">Tournament not found</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        The requested tournament does not exist.
      </p>
      <Link
        className="mt-4 inline-block text-sm text-[var(--accent)]"
        href="/tournaments"
      >
        Back to tournaments
      </Link>
    </section>
  );
}
