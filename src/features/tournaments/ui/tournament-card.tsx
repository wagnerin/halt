import Link from "next/link";

import type { TournamentListItem } from "../domain";
import { StatusBadge } from "./status-badge";

type TournamentCardProps = {
  tournament: TournamentListItem;
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

export function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--text-muted)]">{tournament.game}</p>
        <StatusBadge status={tournament.status} />
      </div>

      <h2 className="text-base font-semibold">
        <Link className="hover:text-[var(--accent)]" href={`/tournaments/${tournament.slug}`}>
          {tournament.name}
        </Link>
      </h2>

      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Organizer: {tournament.organizer}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
        <p className="col-span-2">{formatDateRange(tournament.startDate, tournament.endDate)}</p>
        <p>Prize: {formatPrizePool(tournament.prizePool)}</p>
        <p>
          Participants: {tournament.teamsCount} teams / {tournament.driversCount} drivers
        </p>
      </div>
    </article>
  );
}
