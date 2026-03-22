import Link from "next/link";

import type { DriverListItem } from "../domain";

type DriverCardProps = {
  driver: DriverListItem;
};

function shortBio(bio: string): string {
  if (bio.length <= 140) {
    return bio;
  }

  return `${bio.slice(0, 137)}...`;
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs text-[var(--text-muted)]">{driver.country}</p>
      <h2 className="mt-1 text-base font-semibold">
        <Link className="hover:text-[var(--accent)]" href={`/drivers/${driver.slug}`}>
          {driver.nickname}
        </Link>
      </h2>

      {driver.realName ? (
        <p className="mt-1 text-sm text-[var(--text-muted)]">{driver.realName}</p>
      ) : null}

      <p className="mt-3 text-sm text-[var(--text-muted)]">{shortBio(driver.bio)}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--text-muted)]">Team:</span>
        {driver.team ? (
          <Link
            href={`/teams/${driver.team.slug}`}
            className="rounded border border-[var(--border)] px-2 py-1 text-[var(--text-primary)] hover:text-[var(--accent)]"
          >
            {driver.team.name}
          </Link>
        ) : (
          <span className="rounded border border-[var(--border)] px-2 py-1 text-[var(--text-muted)]">
            Free Agent
          </span>
        )}
      </div>
    </article>
  );
}
