import Link from "next/link";

import type { TournamentDetail } from "../domain";

type ResultsWidgetProps = {
  tournamentSlug: string;
  results: TournamentDetail["raceResults"];
};

function formatSessionDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function standingName(
  standing: TournamentDetail["raceResults"][number]["standings"][number]
): string {
  if (standing.driver) {
    return standing.driver.nickname;
  }

  if (standing.team) {
    return standing.team.name;
  }

  return "Unknown competitor";
}

export function ResultsWidget({ tournamentSlug, results }: ResultsWidgetProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Results</h2>
        <Link className="text-xs text-[var(--accent)]" href="/results">
          View all results
        </Link>
      </div>

      {results.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          No sessions/results available for this tournament yet.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {results.map((result) => (
            <article
              key={result.id}
              className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  {result.eventName} - {result.sessionType.toLowerCase()}
                </h3>
                <span className="text-xs text-[var(--text-muted)]">
                  {formatSessionDate(result.date)}
                </span>
              </div>

              {result.standings.length > 0 ? (
                <ol className="space-y-1 text-sm">
                  {result.standings.slice(0, 3).map((standing) => (
                    <li key={`${result.id}-${standing.position}`} className="text-[var(--text-muted)]">
                      <span className="mr-2 font-medium text-[var(--text-primary)]">
                        P{standing.position}
                      </span>
                      {standingName(standing)}
                      {standing.points !== null ? (
                        <span className="ml-2 text-xs">({standing.points} pts)</span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">
                  Standings not available for this session.
                </p>
              )}

              <Link
                className="mt-2 inline-block text-xs text-[var(--accent)]"
                href={`/results/${tournamentSlug}/${result.id}`}
              >
                Open session details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
