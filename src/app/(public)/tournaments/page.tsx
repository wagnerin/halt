import type { Metadata } from "next";

import { getTournamentsList } from "@/features/tournaments/domain";
import { TournamentCard } from "@/features/tournaments/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tournaments",
  description:
    "Upcoming, live, and completed sim racing tournaments with participants and session results.",
};

export default async function TournamentsListPage() {
  const tournaments = await getTournamentsList();

  return (
    <section className="space-y-5">
      <header className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h1 className="text-xl font-semibold">Tournaments</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track active events, participant lineups, and official sessions.
        </p>
      </header>

      {tournaments.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--text-muted)]">
          No tournaments found. Run the Prisma seed script in development.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      )}
    </section>
  );
}
