import type { ResultSessionDetailDto } from "../domain";

type SummaryStatsBlockProps = {
  summary: ResultSessionDetailDto["summary"];
};

export function SummaryStatsBlock({ summary }: SummaryStatsBlockProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-base font-semibold">Summary stats</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
          <p className="text-xs text-[var(--text-muted)]">Entries</p>
          <p className="mt-1 text-lg font-semibold">{summary.entries}</p>
        </div>
        <div className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
          <p className="text-xs text-[var(--text-muted)]">Winner</p>
          <p className="mt-1 text-sm font-semibold">{summary.winner ?? "TBA"}</p>
        </div>
        <div className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
          <p className="text-xs text-[var(--text-muted)]">Total points awarded</p>
          <p className="mt-1 text-lg font-semibold">{summary.totalPointsAwarded}</p>
        </div>
        <div className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
          <p className="text-xs text-[var(--text-muted)]">Average points</p>
          <p className="mt-1 text-lg font-semibold">
            {summary.averagePoints !== null ? summary.averagePoints : "-"}
          </p>
        </div>
      </div>
    </section>
  );
}
