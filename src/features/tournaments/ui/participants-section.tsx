import Link from "next/link";

import type { TournamentDetail } from "../domain";

type ParticipantsSectionProps = {
  teams: TournamentDetail["participantsTeams"];
  drivers: TournamentDetail["participantsDrivers"];
};

export function ParticipantsSection({ teams, drivers }: ParticipantsSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="text-base font-semibold">Teams</h2>
        {teams.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--text-muted)]">No teams added yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {teams.map((team) => (
              <li key={team.slug}>
                <Link
                  className="text-sm hover:text-[var(--accent)]"
                  href={`/teams/${team.slug}`}
                >
                  {team.name}
                  <span className="ml-2 text-xs text-[var(--text-muted)]">
                    ({team.country})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="text-base font-semibold">Drivers</h2>
        {drivers.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--text-muted)]">No drivers added yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {drivers.map((driver) => (
              <li key={driver.slug}>
                <Link
                  className="text-sm hover:text-[var(--accent)]"
                  href={`/drivers/${driver.slug}`}
                >
                  {driver.nickname}
                  <span className="ml-2 text-xs text-[var(--text-muted)]">
                    ({driver.country})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
