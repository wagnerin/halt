import Link from "next/link";

import type { TournamentDetail } from "../domain";
import { ParticipantsSection } from "./participants-section";
import { RelatedNewsPlaceholder } from "./related-news-placeholder";
import { ResultsWidget } from "./results-widget";
import { StatusBadge } from "./status-badge";

type TournamentDetailViewProps = {
  tournament: TournamentDetail;
};

function formatDateRange(startDate: Date, endDate: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

function formatPrizePool(value: number | null): string {
  if (!value) {
    return "TBA";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function TournamentDetailView({ tournament }: TournamentDetailViewProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-[var(--text-muted)]">{tournament.game}</p>
            <h1 className="mt-1 text-2xl font-semibold">{tournament.name}</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Organizer: {tournament.organizer}
            </p>
          </div>
          <StatusBadge status={tournament.status} />
        </div>

        <div className="mt-4 grid gap-2 text-sm text-[var(--text-muted)] md:grid-cols-3">
          <p>{formatDateRange(tournament.startDate, tournament.endDate)}</p>
          <p>Prize pool: {formatPrizePool(tournament.prizePool)}</p>
          <p>
            Participants: {tournament.participantsTeams.length} teams /{" "}
            {tournament.participantsDrivers.length} drivers
          </p>
        </div>
      </section>

      <ParticipantsSection
        teams={tournament.participantsTeams}
        drivers={tournament.participantsDrivers}
      />

      <ResultsWidget tournamentSlug={tournament.slug} results={tournament.raceResults} />

      <RelatedNewsPlaceholder relatedCount={tournament.relatedPublishedArticlesCount} />

      <Link className="inline-block text-sm text-[var(--accent)]" href="/tournaments">
        ← Back to all tournaments
      </Link>
    </div>
  );
}
