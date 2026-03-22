import Link from "next/link";

export default function DriverNotFound() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h1 className="text-lg font-semibold">Driver not found</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        The requested driver profile does not exist.
      </p>
      <Link className="mt-4 inline-block text-sm text-[var(--accent)]" href="/drivers">
        Back to drivers
      </Link>
    </section>
  );
}
