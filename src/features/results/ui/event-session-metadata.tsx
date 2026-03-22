import Link from "next/link";

import type { ResultSessionDetailDto } from "../domain";

type EventSessionMetadataProps = {
  session: ResultSessionDetailDto;
};

function formatSessionDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(value);
}

export function EventSessionMetadata({ session }: EventSessionMetadataProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs text-[var(--text-muted)]">
        {session.tournament.game} • {session.tournament.status}
      </p>
      <h1 className="mt-1 text-2xl font-semibold">{session.eventName}</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Session: {session.sessionType}
      </p>

      <div className="mt-4 grid gap-2 text-sm text-[var(--text-muted)] md:grid-cols-2">
        <p>Date: {formatSessionDate(session.date)}</p>
        <p>Organizer: {session.tournament.organizer}</p>
      </div>

      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Tournament:{" "}
        <Link
          className="text-[var(--text-primary)] hover:text-[var(--accent)]"
          href={`/tournaments/${session.tournament.slug}`}
        >
          {session.tournament.name}
        </Link>
      </p>

      {session.notes ? (
        <p className="mt-3 rounded border border-[var(--border)] bg-[var(--surface-2)] p-3 text-sm text-[var(--text-muted)]">
          {session.notes}
        </p>
      ) : null}
    </section>
  );
}
