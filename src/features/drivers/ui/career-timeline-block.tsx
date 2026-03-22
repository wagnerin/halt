import type { DriverTimelineEntry } from "../domain";

type CareerTimelineBlockProps = {
  entries: DriverTimelineEntry[];
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(value);
}

export function CareerTimelineBlock({ entries }: CareerTimelineBlockProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-base font-semibold">Career timeline</h2>

      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          No timeline entries available.
        </p>
      ) : (
        <ol className="mt-3 space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3"
            >
              <p className="text-xs text-[var(--text-muted)]">
                {formatDate(entry.periodStart)} -{" "}
                {entry.periodEnd ? formatDate(entry.periodEnd) : "Present"}
              </p>
              <p className="mt-1 text-sm font-medium">{entry.label}</p>
              {entry.description ? (
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {entry.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
